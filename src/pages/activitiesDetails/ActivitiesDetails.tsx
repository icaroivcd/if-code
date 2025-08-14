import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { getAllActivities } from "@/services/ActivitiesService";
import { getProblemById } from "@/services/ProblemsServices";
import { getSubmissionsByActivityId } from "@/services/SubmissionsService";
import type { Activity, Problem, Submission } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Calendar,
  Clock,
  FileText,
  Upload,
  CheckCircle2,
  XCircle,
  PlayCircle,
  ArrowLeft,
  RefreshCw,
  User,
  Target,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { CodeSubmissionComponent } from "../../components/CodeSubmission";

// Configuração dos possíveis status das submissões (exibição e estilização)
const statusConfig = {
  accepted: {
    label: "Aceito",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-800 border-green-200",
    dotColor: "bg-green-500",
  },
  rejected: {
    label: "Rejeitado",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200",
    dotColor: "bg-red-500",
  },
  pending: {
    label: "Pendente",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dotColor: "bg-yellow-500",
  },
  running: {
    label: "Executando",
    icon: PlayCircle,
    className: "bg-blue-100 text-blue-800 border-blue-200",
    dotColor: "bg-blue-500",
  },
} as const;

interface StatusBadgeProps {
  status: keyof typeof statusConfig;
}

// Componente que exibe o badge de status da submissão
function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

// Função utilitária para formatar datas e indicar se está atrasada, hoje, etc
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formatted = date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let relative = "";
  let isOverdue = false;

  if (diffDays < 0) {
    relative = `${Math.abs(diffDays)} dias atrás`;
    isOverdue = true;
  } else if (diffDays === 0) {
    relative = "Hoje";
  } else if (diffDays === 1) {
    relative = "Amanhã";
  } else {
    relative = `Em ${diffDays} dias`;
  }

  return { formatted, relative, isOverdue };
}

// Spinner de loading exibido enquanto carrega os detalhes
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Carregando detalhes da atividade...</p>
      </div>
    </div>
  );
}

export default function ActivitiesDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [selectedProblem, setSelectedProblem] = useState<Problem>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const activityId = params.id;

  // Busca todas as atividades para encontrar a selecionada
  const fetchActivities = async () => {
    const data = await getAllActivities();
    setActivities(data.items);
  };

  // Busca o problema relacionado à atividade
  const fetchProblem = async (activity: Activity) => {
    const data = await getProblemById(activity.problemId);
    setSelectedProblem(data);
  };

  // Busca as submissões da atividade
  const fetchSubmissions = async (activity: Activity) => {
    const data = await getSubmissionsByActivityId(activity.id);
    setSubmissions(data);
  };

  // Carrega a lista de atividades ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchActivities();
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Seleciona a atividade pelo id da rota quando as atividades são carregadas
  useEffect(() => {
    if (activityId) {
      setSelectedActivity(
        activities.find((activity) => activity.id === activityId.toString())
      );
    }
  }, [activityId, activities]);

  // Quando a atividade selecionada muda, busca o problema e as submissões
  useEffect(() => {
    if (selectedActivity) {
      fetchProblem(selectedActivity);
      fetchSubmissions(selectedActivity);
    }
  }, [selectedActivity]);

  // Redireciona para o detalhe da submissão ao clicar na linha da tabela
  function redirectToSubmission(submission: Submission) {
    console.log("Redirecting to submission:", submission);
    navigate(`/submissions/${submission.id}`);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <LoadingSpinner />
      </div>
    );
  }

  // Se não encontrar atividade ou problema, mostra tela em branco
  if (selectedActivity === undefined || selectedProblem === undefined) {
    return <div className="max-w-7xl mx-auto p-6"></div>;
  }

  const dueDate = formatDate(selectedActivity.dueDate);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Botão de voltar */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/activities")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      {/* Header da atividade */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {selectedActivity.title}
            </h1>
            <p className="text-blue-100 text-lg">
              {selectedActivity.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm font-medium">Prazo</div>
              <div className="text-lg font-bold">{dueDate.formatted}</div>
              <div
                className={`text-xs ${
                  dueDate.isOverdue ? "text-red-200" : "text-blue-200"
                }`}
              >
                {dueDate.relative}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <User className="w-5 h-5 mx-auto mb-1" />
              <div className="text-sm font-medium">Submissões</div>
              <div className="text-lg font-bold">{submissions.length}</div>
              <div className="text-xs text-blue-200">tentativas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enunciado do problema */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProblem.title}
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedProblem.statement}
            </p>
          </div>
        </div>
      </div>

      {/* Área de submissão de código */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Nova Submissão</h2>
          </div>
        </div>
        {/* Componente responsável pela caixa de texto e submissão do código*/}
        <CodeSubmissionComponent />
      </div>

      {/* Histórico de submissões */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Histórico de Submissões
              </h2>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                selectedActivity && fetchSubmissions(selectedActivity)
              }
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        <div className="p-6">
          {submissions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma submissão ainda
              </h3>
              <p className="text-gray-500">
                Suas submissões aparecerão aqui após o envio
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Data de Submissão
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Status
                      </div>
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => {
                    const submissionDate = formatDate(submission.dateSubmitted);
                    return (
                      <TableRow
                        key={submission.id}
                        onClick={() => redirectToSubmission(submission)}
                        className="cursor-pointer hover:bg-blue-50 transition-colors duration-200 group"
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-gray-900 font-medium">
                              {submissionDate.formatted}
                            </span>
                            <span className="text-xs text-gray-500">
                              {submissionDate.relative}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge
                            status={
                              submission.status as keyof typeof statusConfig
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
