"use client"

import { MapPin, Users, ArrowRight, Clock, Star, Navigation, Calendar, Trees, Car, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { useState, useEffect } from "react";

type Corrida = {
  id: number;
  origem: string;
  destino: string;
  assentos: number;
  preco: string;
  motorista: string;
  avaliacao: number;
  tempoEstimado: string;
  veiculo: string;
  tipo: 'geral' | 'ilha' | 'evento' | 'rural' | 'grupo';
  horario?: string;
  data?: string;
  economia?: string;
  pessoas?: number;
};

// Função para carregar corridas do localStorage
const getCorridasDoLocalStorage = (): Corrida[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const corridasSalvas = localStorage.getItem('corridasOferecidas');
    return corridasSalvas ? JSON.parse(corridasSalvas) : [];
  } catch (error) {
    console.error('Erro ao carregar corridas do localStorage:', error);
    return [];
  }
};

export default function CorridasPage() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState<'geral' | 'ilha' | 'evento' | 'rural' | 'grupo'>('geral');
  const [destinoEsperado] = useState("UFMA");
  const [corridasLocais, setCorridasLocais] = useState<Corrida[]>([]);

  // Carregar corridas do localStorage quando o componente montar
  useEffect(() => {
    setCorridasLocais(getCorridasDoLocalStorage());
  }, []);

  // Verificar se veio da página rural ou grupo
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const group = urlParams.get('group');
    
    if (tipo === 'rural') {
      setAbaAtiva('rural');
    } else if (group === 'true') {
      setAbaAtiva('grupo');
    }
    
    // Scroll para as corridas
    setTimeout(() => {
      const element = document.getElementById('corridas-list');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, []);

  const corridasPreDefinidas: Corrida[] = [
    {
      id: 1,
      origem: "Terminal Cohama",
      destino: "UFMA",
      assentos: 3,
      preco: "R$ 8,50",
      motorista: "Carlos Silva",
      avaliacao: 4.8,
      tempoEstimado: "15 min",
      veiculo: "HB20 Prata - ABC1D23",
      tipo: 'geral'
    },
    {
      id: 2,
      origem: "Monte Castelo",
      destino: "Shopping da Ilha",
      assentos: 2,
      preco: "R$ 12,00",
      motorista: "Ana Santos",
      avaliacao: 4.9,
      tempoEstimado: "20 min",
      veiculo: "Onix Preto - XYZ4E56",
      tipo: 'geral'
    },
    {
      id: 3,
      origem: "Renascença",
      destino: "Calhau",
      assentos: 1,
      preco: "R$ 15,00",
      motorista: "João Oliveira",
      avaliacao: 4.7,
      tempoEstimado: "25 min",
      veiculo: "Gol Branco - DEF7G89",
      tipo: 'geral'
    },
    {
      id: 4,
      origem: "Centro",
      destino: "Ponte do São Francisco",
      assentos: 4,
      preco: "R$ 6,00",
      motorista: "Maria Santos",
      avaliacao: 4.9,
      tempoEstimado: "10 min",
      veiculo: "Fiesta Preto - GHI0J12",
      tipo: 'ilha',
      horario: "06:00 - 22:00"
    },
    {
      id: 5,
      origem: "Jardim São Cristóvão",
      destino: "Terminal Praia Grande",
      assentos: 2,
      preco: "R$ 7,50",
      motorista: "Pedro Costa",
      avaliacao: 4.6,
      tempoEstimado: "12 min",
      veiculo: "Celta Prata - KLM3N45",
      tipo: 'ilha',
      horario: "05:30 - 23:00"
    },
    {
      id: 6,
      origem: "Vila Palmeira",
      destino: "Apeadouro",
      assentos: 3,
      preco: "R$ 5,50",
      motorista: "Luiza Fernandes",
      avaliacao: 4.8,
      tempoEstimado: "8 min",
      veiculo: "Uno Branco - OPQ6R78",
      tipo: 'ilha',
      horario: "06:00 - 22:30"
    },
    {
      id: 7,
      origem: "Jardim América",
      destino: "Estádio Castelão",
      assentos: 4,
      preco: "R$ 20,00",
      motorista: "Ricardo Almeida",
      avaliacao: 4.9,
      tempoEstimado: "30 min",
      veiculo: "Tracker Azul - STU9V01",
      tipo: 'evento',
      data: "Sábado, 15 Dez",
      horario: "18:00"
    },
    {
      id: 8,
      origem: "Parque do Rangedor",
      destino: "Convento das Mercês",
      assentos: 2,
      preco: "R$ 15,00",
      motorista: "Fernanda Lima",
      avaliacao: 4.7,
      tempoEstimado: "25 min",
      veiculo: "Kwid Vermelho - WXY2Z34",
      tipo: 'evento',
      data: "Domingo, 16 Dez",
      horario: "16:00"
    },
    // CORRIDAS ZONA RURAL
    {
      id: 9,
      origem: "Tirirical",
      destino: "Terminal Cohab",
      assentos: 4,
      preco: "R$ 12,00",
      motorista: "José Ribeiro",
      avaliacao: 4.8,
      tempoEstimado: "45 min",
      veiculo: "S10 Cabine Dupla - RST1U23",
      tipo: 'rural',
      horario: "05:00 - 21:00"
    },
    {
      id: 10,
      origem: "Vila Ariri",
      destino: "Terminal Praia Grande",
      assentos: 3,
      preco: "R$ 10,00",
      motorista: "Antônio Costa",
      avaliacao: 4.9,
      tempoEstimado: "35 min",
      veiculo: "Duster Adventure - VWX4Y56",
      tipo: 'rural',
      horario: "05:30 - 20:30"
    },
    // CORRIDAS EM GRUPO - NOVAS
    {
      id: 11,
      origem: "Shopping da Ilha",
      destino: "Praia do Calhau",
      assentos: 4,
      preco: "R$ 5,00",
      motorista: "Grupo Viagem",
      avaliacao: 4.9,
      tempoEstimado: "18 min",
      veiculo: "Spin Prata - GRP1A23",
      tipo: 'grupo',
      pessoas: 3,
      economia: "R$ 10,00",
      horario: "07:00 - 23:00"
    },
    {
      id: 12,
      origem: "Terminal Cohama",
      destino: "Centro Histórico",
      assentos: 3,
      preco: "R$ 4,00",
      motorista: "Carona Amiga",
      avaliacao: 4.8,
      tempoEstimado: "12 min",
      veiculo: "Cobalt Branco - GRP4B56",
      tipo: 'grupo',
      pessoas: 2,
      economia: "R$ 8,00",
      horario: "06:30 - 22:30"
    },
    {
      id: 13,
      origem: "Renascença",
      destino: "São Francisco",
      assentos: 4,
      preco: "R$ 3,50",
      motorista: "Compartilhe Já",
      avaliacao: 4.7,
      tempoEstimado: "15 min",
      veiculo: "Siena Prata - GRP7C89",
      tipo: 'grupo',
      pessoas: 3,
      economia: "R$ 11,50",
      horario: "07:00 - 23:00"
    },
    {
      id: 14,
      origem: "Jardim América",
      destino: "Tirirical",
      assentos: 4,
      preco: "R$ 6,00",
      motorista: "Rota Compartilhada",
      avaliacao: 4.9,
      tempoEstimado: "25 min",
      veiculo: "Doblo Branca - GRP0D12",
      tipo: 'grupo',
      pessoas: 3,
      economia: "R$ 14,00",
      horario: "06:00 - 22:00"
    },
    {
      id: 15,
      origem: "Vinhais",
      destino: "Litorânea",
      assentos: 3,
      preco: "R$ 4,50",
      motorista: "Amigos do Bairro",
      avaliacao: 4.8,
      tempoEstimado: "20 min",
      veiculo: "Palio Weekend - GRP3E45",
      tipo: 'grupo',
      pessoas: 2,
      economia: "R$ 9,50",
      horario: "07:30 - 23:30"
    }
  ];

  // Combinar corridas pré-definidas com as do localStorage
  const todasCorridas = [...corridasPreDefinidas, ...corridasLocais];
  const corridasFiltradas = todasCorridas.filter(corrida => corrida.tipo === abaAtiva);

  const handleSelectCorrida = (corrida: Corrida) => {
    // Validação do Sentry mantida
    if (corrida.destino !== destinoEsperado) {
      const error = new Error(
        `Destino selecionado (${corrida.destino}) é diferente do destino esperado (${destinoEsperado})`
      );
      Sentry.captureException(error, {
        extra: {
          corridaSelecionada: corrida,
          destinoEsperado,
        },
      });
    }
    
    // Salva a corrida selecionada e vai direto para a página de pagamento
    localStorage.setItem('selectedCorrida', JSON.stringify(corrida));
    router.push('/pagamento');
  };

  const getAbaIcon = (tipo: string) => {
    switch (tipo) {
      case 'ilha':
        return <Navigation className="w-4 h-4" />;
      case 'evento':
        return <Calendar className="w-4 h-4" />;
      case 'rural':
        return <Trees className="w-4 h-4" />;
      case 'grupo':
        return <Share2 className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getAbaTitulo = (tipo: string) => {
    switch (tipo) {
      case 'geral':
        return 'Corridas Gerais';
      case 'ilha':
        return 'Modo Ilha';
      case 'evento':
        return 'Eventos Especiais';
      case 'rural':
        return 'Zona Rural';
      case 'grupo':
        return 'Corrida em Grupo';
      default:
        return 'Corridas';
    }
  };

  const getAbaDescricao = (tipo: string) => {
    switch (tipo) {
      case 'geral':
        return 'Corridas regulares por toda a cidade';
      case 'ilha':
        return 'Rotas especiais para a Ilha de São Luís';
      case 'evento':
        return 'Transporte para eventos e shows';
      case 'rural':
        return 'Conexão entre zona rural e terminais urbanos';
      case 'grupo':
        return 'Compartilhe a viagem e economize até 70%';
      default:
        return 'Encontre a melhor opção para sua viagem';
    }
  };

  const getCorridaColor = (tipo: string) => {
    // AGORA TODOS OS TIPOS USAM COR VERDE
    return {
      bg: 'from-green-800 to-green-600',
      lightBg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-800',
      button: 'bg-green-700 hover:bg-green-800',
      dot: 'bg-green-600'
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex flex-col items-center gap-6 p-4">
      {/* Cabeçalho */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-green-900 mb-2">Encontre Sua Corrida</h1>
        <p className="text-green-700">Escolha o tipo de serviço que melhor atende suas necessidades</p>
      </div>

      {/* Abas de Navegação */}
      <div className="w-full max-w-4xl">
        <div className="flex bg-white rounded-2xl shadow-md p-1 mb-6 overflow-x-auto">
          {(['geral', 'ilha', 'evento', 'rural', 'grupo'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setAbaAtiva(tipo)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap min-w-[120px] ${
                abaAtiva === tipo
                  ? 'bg-green-600 text-white shadow-lg' // TODOS VERDE AGORA
                  : 'text-green-700 hover:bg-green-50'
              }`}
            >
              {getAbaIcon(tipo)}
              <span className="hidden sm:inline">
                {tipo === 'geral' ? 'Geral' : 
                 tipo === 'ilha' ? 'Modo Ilha' : 
                 tipo === 'evento' ? 'Eventos' : 
                 tipo === 'rural' ? 'Zona Rural' :
                 'Em Grupo'}
              </span>
            </button>
          ))}
        </div>

        {/* Informações da Aba Ativa */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-green-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              {getAbaTitulo(abaAtiva)}
            </h2>
            <p className="text-green-700 mb-4">
              {getAbaDescricao(abaAtiva)}
            </p>
            
            {/* Badges informativas */}
            <div className="flex flex-wrap justify-center gap-3">
              {abaAtiva === 'ilha' && (
                <>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🕐 Horários Fixos
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    💰 Preços Especiais
                  </span>
                </>
              )}
              {abaAtiva === 'evento' && (
                <>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    📅 Datas Específicas
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🎫 Ideal para Shows
                  </span>
                </>
              )}
              {abaAtiva === 'rural' && (
                <>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🚜 Veículos Robustos
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    📦 Espaço para Cargas
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🌄 Rotas Rurais
                  </span>
                </>
              )}
              {abaAtiva === 'grupo' && (
                <>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    💰 Economia Compartilhada
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    👥 Até 70% de Desconto
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🤝 Viagem Social
                  </span>
                </>
              )}
              {abaAtiva === 'geral' && (
                <>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    🚗 Disponível 24h
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    📍 Qualquer Destino
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Corridas */}
      <div id="corridas-list" className="w-full max-w-4xl space-y-6">
        {corridasFiltradas.map((corrida) => {
          const colors = getCorridaColor(corrida.tipo);
          
          return (
            <div
              key={corrida.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Cabeçalho com informações do motorista */}
              <div className={`p-4 flex justify-between items-center text-white bg-gradient-to-r ${colors.bg}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.button}`}>
                    {corrida.tipo === 'grupo' ? (
                      <Share2 className="w-5 h-5 text-white" />
                    ) : (
                      <span className="font-bold text-sm">
                        {corrida.motorista.split(' ')[0].charAt(0)}{corrida.motorista.split(' ')[1]?.charAt(0) || ''}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{corrida.motorista}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                      <span>{corrida.avaliacao}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{corrida.preco}</p>
                  <p className="text-sm opacity-90">por pessoa</p>
                  {corrida.tipo === 'grupo' && corrida.economia && (
                    <p className="text-xs opacity-80 line-through">
                      Economia: {corrida.economia}
                    </p>
                  )}
                </div>
              </div>

              {/* Informações específicas por tipo */}
              {(corrida.tipo === 'ilha' || corrida.tipo === 'evento' || corrida.tipo === 'rural' || corrida.tipo === 'grupo') && (
                <div className={`px-5 py-2 border-b ${colors.lightBg} ${colors.border} ${colors.text}`}>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    {corrida.tipo === 'ilha' && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Horário: {corrida.horario}</span>
                      </div>
                    )}
                    {corrida.tipo === 'evento' && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{corrida.data}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{corrida.horario}</span>
                        </div>
                      </>
                    )}
                    {corrida.tipo === 'rural' && (
                      <>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Horário: {corrida.horario}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trees className="w-4 h-4" />
                          <span>Zona Rural</span>
                        </div>
                      </>
                    )}
                    {corrida.tipo === 'grupo' && (
                      <>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{corrida.pessoas} pessoas no grupo</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{corrida.horario}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Rota */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className={`w-3 h-3 rounded-full ${colors.dot} mb-1`}></div>
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Partindo de</p>
                      <p className={`font-semibold ${colors.text}`}>{corrida.origem}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Destino</p>
                      <p className={`font-semibold ${colors.text}`}>{corrida.destino}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{corrida.tempoEstimado}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{corrida.assentos} assento(s)</span>
                    </div>
                    {corrida.tipo === 'grupo' && corrida.economia && (
                      <div className="flex items-center gap-1 text-green-600 font-semibold">
                        <span>💰 {corrida.economia} economia</span>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleSelectCorrida(corrida)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${colors.button} text-white`}
                  >
                    {corrida.tipo === 'grupo' ? 'Entrar no Grupo' : 'Selecionar'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Informações do veículo */}
              <div className={`px-5 py-3 border-t ${colors.lightBg} ${colors.border} ${colors.text}`}>
                <p className="text-sm text-center">{corrida.veiculo}</p>
                {corrida.tipo === 'rural' && (
                  <p className="text-xs text-center mt-1 opacity-75">
                    🚜 Veículo adaptado para estradas rurais
                  </p>
                )}
                {corrida.tipo === 'grupo' && (
                  <p className="text-xs text-center mt-1 opacity-75">
                    👥 Viagem compartilhada com economia garantida
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem quando não há corridas */}
      {corridasFiltradas.length === 0 && (
        <div className="w-full max-w-4xl text-center py-12">
          <div className="bg-white rounded-2xl shadow-md p-8 border border-green-100">
            <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Nenhuma corrida disponível
            </h3>
            <p className="text-green-700">
              Não encontramos corridas {abaAtiva === 'ilha' ? 'do Modo Ilha' : abaAtiva === 'evento' ? 'para eventos' : abaAtiva === 'rural' ? 'da Zona Rural' : abaAtiva === 'grupo' ? 'em grupo' : ''} no momento.
            </p>
          </div>
        </div>
      )}

      {/* Rodapé informativo */}
      <div className="w-full max-w-4xl mt-4 p-4 bg-white rounded-lg border border-green-200">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-green-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>Ponto de partida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Destino</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <span>Avaliação do motorista</span>
          </div>
          {abaAtiva === 'rural' && (
            <div className="flex items-center gap-2">
              <Trees className="w-4 h-4 text-green-600" />
              <span>Zona Rural</span>
            </div>
          )}
          {abaAtiva === 'grupo' && (
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-green-600" />
              <span>Corrida Compartilhada</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}