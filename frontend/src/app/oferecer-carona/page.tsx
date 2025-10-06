"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  MapPin, 
  Car, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  ArrowLeft,
  User,
  Phone,
  CheckCircle,
  Snowflake
} from "lucide-react"

type FormData = {
  motorista: string
  telefone: string
  origem: string
  destino: string
  assentos: number
  preco: string
  veiculo: string
  placa: string
  data: string
  horario: string
  observacoes: string
  arCondicionado: boolean
  tipo: 'geral' | 'ilha' | 'evento' | 'rural' | 'grupo'
}

export default function OferecerCaronaPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tipoCarona, setTipoCarona] = useState<'geral' | 'grupo'>('geral')
  
  const [formData, setFormData] = useState<FormData>({
    motorista: "",
    telefone: "",
    origem: "",
    destino: "",
    assentos: 4,
    preco: "",
    veiculo: "",
    placa: "",
    data: "",
    horario: "",
    observacoes: "",
    arCondicionado: false,
    tipo: 'geral'
  })

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Formatar o preço para incluir "R$"
      const precoFormatado = formData.preco.includes('R$') 
        ? formData.preco 
        : `R$ ${formData.preco}`
      
      // Criar nova corrida no formato CORRETO para grupos
      const novaCorrida = {
        id: Date.now(),
        origem: formData.origem,
        destino: formData.destino,
        assentos: formData.assentos,
        preco: precoFormatado,
        motorista: formData.motorista,
        avaliacao: 5.0, // Nova corrida começa com avaliação máxima
        tempoEstimado: "15 min",
        veiculo: `${formData.veiculo} - ${formData.placa}`,
        tipo: tipoCarona, // Usa o tipo selecionado
        arCondicionado: formData.arCondicionado,
        horario: formData.horario,
        data: formData.data,
        observacoes: formData.observacoes,
        // Campos específicos para grupos
        ...(tipoCarona === 'grupo' && {
          pessoas: Math.floor(Math.random() * 3) + 2, // 2-4 pessoas no grupo
          economia: `R$ ${(Math.random() * 15 + 5).toFixed(2).replace('.', ',')}` // Economia de R$ 5-20
        })
      }
      
      // Salvar no localStorage
      const corridasExistentes = JSON.parse(localStorage.getItem('corridasOferecidas') || '[]')
      localStorage.setItem('corridasOferecidas', JSON.stringify([...corridasExistentes, novaCorrida]))
      
      setIsSuccess(true)
      
      setTimeout(() => {
        // Redirecionar para a página de corridas na aba correta
        if (tipoCarona === 'grupo') {
          router.push('/corridas?group=true')
        } else {
          router.push('/corridas')
        }
      }, 3000)
      
    } catch (error) {
      console.error('Erro ao cadastrar carona:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-900 mb-4">Carona Oferecida!</h1>
          <p className="text-green-700 mb-6">
            Sua carona {tipoCarona === 'grupo' ? 'para o grupo' : ''} foi cadastrada com sucesso e já está disponível.
          </p>
          <div className="animate-pulse text-sm text-green-600">
            Redirecionando para a página de corridas...
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-green-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-green-900" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-green-900">Oferecer Carona</h1>
            <p className="text-green-700">Compartilhe sua viagem e ajude outras pessoas</p>
          </div>
        </div>

        {/* Seletor de Tipo de Carona */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">Tipo de Carona</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTipoCarona('geral')}
              className={`p-4 rounded-xl border-2 transition-all ${
                tipoCarona === 'geral'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-green-200 text-green-600 hover:border-green-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🚗</div>
                <div className="font-semibold">Carona Geral</div>
                <div className="text-sm mt-1">Para qualquer pessoa</div>
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setTipoCarona('grupo')}
              className={`p-4 rounded-xl border-2 transition-all ${
                tipoCarona === 'grupo'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-blue-200 text-blue-600 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-semibold">Carona em Grupo</div>
                <div className="text-sm mt-1">Para grupos específicos</div>
              </div>
            </button>
          </div>
        </div>

        {/* Resto do código permanece igual... */}
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                  step >= stepNumber 
                    ? 'bg-green-600 border-green-600 text-white' 
                    : 'border-green-300 text-green-300'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step > stepNumber ? 'bg-green-600' : 'bg-green-100'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-green-900 mb-2">
              {step === 1 && 'Informações Pessoais'}
              {step === 2 && 'Detalhes da Viagem'}
              {step === 3 && 'Veículo e Preço'}
            </h2>
            <p className="text-green-700">
              {step === 1 && 'Preencha seus dados de contato'}
              {step === 2 && 'Defina origem, destino e horários'}
              {step === 3 && 'Informações do veículo e valor'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
          {/* Step 1: Informações Pessoais */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                  <User className="w-4 h-4" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.motorista}
                  onChange={(e) => handleInputChange('motorista', e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                  <Phone className="w-4 h-4" />
                  Telefone/WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="(98) 99999-9999"
                />
              </div>

              {tipoCarona === 'grupo' && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">👥 Carona em Grupo</h3>
                  <p className="text-sm text-blue-700">
                    Esta carona será destinada para grupos específicos. Você poderá definir os grupos 
                    após o cadastro inicial.
                  </p>
                </div>
              )}

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">📞 Seus contatos</h3>
                <p className="text-sm text-green-700">
                  Essas informações serão visíveis apenas para passageiros que confirmarem a carona, 
                  garantindo sua privacidade e segurança.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Detalhes da Viagem */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                    <MapPin className="w-4 h-4" />
                    Origem
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.origem}
                    onChange={(e) => handleInputChange('origem', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="De onde você sai?"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                    <MapPin className="w-4 h-4" />
                    Destino
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destino}
                    onChange={(e) => handleInputChange('destino', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Para onde você vai?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                    <Calendar className="w-4 h-4" />
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.data}
                    onChange={(e) => handleInputChange('data', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                    <Clock className="w-4 h-4" />
                    Horário
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.horario}
                    onChange={(e) => handleInputChange('horario', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                  <Users className="w-4 h-4" />
                  Assentos Disponíveis
                </label>
                <select
                  value={formData.assentos}
                  onChange={(e) => handleInputChange('assentos', parseInt(e.target.value))}
                  className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>
                      {num} assento{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Veículo e Preço */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                    <Car className="w-4 h-4" />
                    Modelo do Veículo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.veiculo}
                    onChange={(e) => handleInputChange('veiculo', e.target.value)}
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: HB20 Prata"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                    <Car className="w-4 h-4" />
                    Placa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.placa}
                    onChange={(e) => handleInputChange('placa', e.target.value.toUpperCase())}
                    className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="ABC1D23"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* Opção de Ar-Condicionado */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-4">
                  <Snowflake className="w-4 h-4" />
                  Ar-Condicionado
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('arCondicionado', true)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.arCondicionado
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-green-200 text-green-600 hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">✅ Sim</div>
                      <div className="text-sm mt-1">Com ar-condicionado</div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleInputChange('arCondicionado', false)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      !formData.arCondicionado
                        ? 'border-gray-400 bg-gray-50 text-gray-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">❌ Não</div>
                      <div className="text-sm mt-1">Sem ar-condicionado</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Preço por Pessoa
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-green-700">R$</span>
                  <input
                    type="text"
                    required
                    value={formData.preco}
                    onChange={(e) => handleInputChange('preco', e.target.value)}
                    className="w-full p-3 pl-10 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="8,50"
                  />
                </div>
                <p className="text-sm text-green-600 mt-1">
                  💡 Sugerimos valores entre R$ 5,00 e R$ 20,00 para corridas urbanas
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-900 mb-2">
                  Observações (Opcional)
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange('observacoes', e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Alguma informação adicional? Ex: Aceito bagagens, ponto de encontro específico..."
                />
              </div>

              <div className={`p-4 rounded-xl border ${
                tipoCarona === 'grupo' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  tipoCarona === 'grupo' ? 'text-blue-900' : 'text-green-900'
                }`}>
                  {tipoCarona === 'grupo' ? '👥 Sua carona em grupo será publicada em:' : '✅ Sua carona será publicada em:'}
                </h3>
                <p className={`text-sm mb-2 font-medium ${
                  tipoCarona === 'grupo' ? 'text-blue-700' : 'text-green-700'
                }`}>
                  {tipoCarona === 'grupo' ? (
                    <>
                      🟢 <span className="text-blue-900">Corridas em Grupo</span>
                    </>
                  ) : (
                    <>
                      🟢 <span className="text-green-900">Corridas Gerais</span>
                    </>
                  )}
                </p>
                <p className={`text-xs ${
                  tipoCarona === 'grupo' ? 'text-blue-600' : 'text-green-600'
                }`}>
                  {tipoCarona === 'grupo' 
                    ? 'Sua oferta aparecerá para membros de grupos específicos que você selecionar.'
                    : 'Sua oferta aparecerá para todos os usuários procurando caronas na mesma rota e horário.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-green-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors"
              >
                Voltar
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Continuar
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Oferecer Carona {tipoCarona === 'grupo' ? 'para Grupo' : ''}
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Informações Adicionais */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6 border border-green-200">
          <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
            <span className="text-lg">💡</span>
            Dicas para uma boa oferta
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
            <div className="space-y-2">
              <p><strong>📍 Seja específico:</strong> Defina pontos de encontro claros</p>
              <p><strong>⏰ Horário realista:</strong> Considere o trânsito na sua cidade</p>
              <p><strong>💰 Preço justo:</strong> Calcule custos de combustível e pedágio</p>
            </div>
            <div className="space-y-2">
              <p><strong>🚗 Veículo em dia:</strong> Documentação e manutenção em ordem</p>
              <p><strong>📞 Comunicação:</strong> Responda rapidamente aos passageiros</p>
              <p><strong>🤝 Segurança:</strong> Só aceite pagamentos pelo app</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}