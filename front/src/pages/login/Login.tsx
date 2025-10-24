import { login } from "@/services/LoginService";
import { useState } from "react";
import showIcon from "@/assets/icons/password-show.svg";
import hideIcon from "@/assets/icons/password-hide.svg";
import ifCodes from "@/assets/icons/if-codes.png";
import { useNavigate } from "react-router";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await login({ email, password });
            navigate("/home");
        }catch(error){
            console.error("Login failed", error);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-center mb-2">
                    <img src={ifCodes} alt="IF Codes" width={200} height={200} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="mt-1
                    block
                    w-full
                    border
                    border-gray-300
                    rounded-md
                    p-2" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span
                        className="absolute right-3 top-9 cursor-pointer select-none text-gray-500"
                        onClick={() => setShowPassword(v => !v)}
                        title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                        <img
                            src={showPassword ? hideIcon : showIcon}
                            alt={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            width={20}
                            height={20}
                        />
                    </span>
                </div>
                <div className="mb-4 text-right">
                    <a href="#" className="text-sm text-purple-600 hover:underline">Esqueceu sua senha?</a>
                </div>
                <button type="submit" className="w-full
                    bg-gradient-to-r from-purple-600 to-pink-600
                    rounded-lg
                    text-white
                    cursor-pointer
                    hover:from-purple-700 hover:to-pink-700
                    transition
                    duration-300
                    p-2"
                    >Login</button>
            </form>
        </div>
    )
}