import { changePassword } from "@/services/ChangePasswordService";
import { useState } from "react";
import showIcon from "@/assets/icons/password-show.svg";
import hideIcon from "@/assets/icons/password-hide.svg";
import { useNavigate } from "react-router";
import axios from "axios";
import Notification from "@/components/Notification";
import { ArrowLeft } from "lucide-react";

export default function ChangePassword() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
    const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();

    function validateCurrentPassword(password: string) {
        if (!password) return "A senha atual é obrigatória.";
        return null;
    }

    function validateNewPassword(password: string) {
        if (!password) return "A nova senha é obrigatória.";
        if (password.length < 8) return "A nova senha deve ter no mínimo 8 caracteres.";
        return null;
    }

    function validateConfirmPassword(password: string, newPass: string) {
        if (!password) return "A confirmação da senha é obrigatória.";
        if (password !== newPass) return "As senhas não conferem.";
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const currentErr = validateCurrentPassword(currentPassword);
        const newErr = validateNewPassword(newPassword);
        const confirmErr = validateConfirmPassword(confirmPassword, newPassword);
        
        setCurrentPasswordError(currentErr);
        setNewPasswordError(newErr);
        setConfirmPasswordError(confirmErr);

        if (currentErr || newErr || confirmErr) return;

        try {
            await changePassword({
                currentPassword,
                newPassword,
                newPasswordConfirmation: confirmPassword
            });
            
            setSuccess("Senha alterada com sucesso! Você será redirecionado para fazer login novamente.");
            
            // Limpa o token e redireciona após 2 segundos
            setTimeout(() => {
                localStorage.removeItem("auth_token");
                navigate("/login");
            }, 2000);
            
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setError(error.response?.data?.message || "A senha atual está incorreta.");
                } else {
                    setError("Erro ao alterar senha. Tente novamente.");
                }
            } else {
                setError(`Um erro inesperado ocorreu: ${error.message}`);
                console.log('erro: ', error);
            }
        }
        
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            {error && <Notification type="error" message={error} onClose={() => setError(null)} />}
            {success && <Notification type="success" message={success} onClose={() => setSuccess(null)} />}
            <div className="w-full min-h-screen flex flex-col bg-white p-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-8 p-2 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2 w-fit"
                    title="Voltar"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">Voltar</span>
                </button>

                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Alterar Senha
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Senha Atual */}
                        <div className="relative">
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Senha Atual
                            </label>
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                id="currentPassword"
                                className={`block w-full border rounded-md p-2 pr-10 transition-all
                                    ${currentPasswordError ? "border-red-500 ring-2 ring-red-400" : "border-gray-300"}
                                `}
                                required
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                onBlur={e => setCurrentPasswordError(validateCurrentPassword(e.target.value))}
                            />
                            <span
                                className="absolute right-3 top-9 cursor-pointer select-none text-gray-500"
                                onClick={() => setShowCurrentPassword(v => !v)}
                                title={showCurrentPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <img
                                    src={showCurrentPassword ? hideIcon : showIcon}
                                    alt={showCurrentPassword ? "Ocultar senha" : "Mostrar senha"}
                                    width={20}
                                    height={20}
                                />
                            </span>
                            {currentPasswordError && (
                                <span className="text-red-600 text-sm mt-1 block animate-pulse">{currentPasswordError}</span>
                            )}
                        </div>

                        {/* Nova Senha */}
                        <div className="relative">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Nova Senha
                            </label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                className={`block w-full border rounded-md p-2 pr-10 transition-all
                                    ${newPasswordError ? "border-red-500 ring-2 ring-red-400" : "border-gray-300"}
                                `}
                                required
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                onBlur={e => setNewPasswordError(validateNewPassword(e.target.value))}
                            />
                            <span
                                className="absolute right-3 top-9 cursor-pointer select-none text-gray-500"
                                onClick={() => setShowNewPassword(v => !v)}
                                title={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <img
                                    src={showNewPassword ? hideIcon : showIcon}
                                    alt={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
                                    width={20}
                                    height={20}
                                />
                            </span>
                            {newPasswordError && (
                                <span className="text-red-600 text-sm mt-1 block animate-pulse">{newPasswordError}</span>
                            )}
                        </div>

                        {/* Confirmar Nova Senha */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Nova Senha
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className={`block w-full border rounded-md p-2 pr-10 transition-all
                                    ${confirmPasswordError ? "border-red-500 ring-2 ring-red-400" : "border-gray-300"}
                                `}
                                required
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                onBlur={e => setConfirmPasswordError(validateConfirmPassword(e.target.value, newPassword))}
                            />
                            <span
                                className="absolute right-3 top-9 cursor-pointer select-none text-gray-500"
                                onClick={() => setShowConfirmPassword(v => !v)}
                                title={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                <img
                                    src={showConfirmPassword ? hideIcon : showIcon}
                                    alt={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                                    width={20}
                                    height={20}
                                />
                            </span>
                            {confirmPasswordError && (
                                <span className="text-red-600 text-sm mt-1 block animate-pulse">{confirmPasswordError}</span>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="w-full
                                bg-gradient-to-r from-purple-600 to-pink-600
                                rounded-lg
                                text-white
                                cursor-pointer
                                hover:from-purple-700 hover:to-pink-700
                                transition
                                duration-300
                                p-3
                                font-medium"
                        >
                            Alterar Senha
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
