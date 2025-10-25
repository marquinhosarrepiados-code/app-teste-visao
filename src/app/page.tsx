'use client'

import { useState, useEffect } from 'react'
import { Eye, User, BarChart3, Settings, Moon, Sun, Share2, AlertTriangle, Palette, Download, TrendingUp } from 'lucide-react'
import { ColorTest, EnhancedAcuityTest } from '@/components/VisualTests'

// Tipos de dados
interface UserProfile {
  id?: string
  name: string
  age: number
  gender: 'masculino' | 'feminino' | 'outro'
  usesGlasses: boolean
  lensType?: 'miopia' | 'hipermetropia' | 'astigmatismo' | 'presbiopia' | 'multifocal'
  visualDifficulties: string[]
  createdAt?: Date
}

interface TestResult {
  id?: string
  userId: string
  testType: 'acuidade' | 'contraste' | 'cores'
  score: number
  level: number
  duration: number
  date: Date
  details: any
}

// Componente de Cadastro
function UserRegistration({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    gender: 'masculino',
    usesGlasses: false,
    visualDifficulties: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (profile.name && profile.age > 0) {
      onComplete(profile)
    }
  }

  const toggleDifficulty = (difficulty: string) => {
    setProfile(prev => ({
      ...prev,
      visualDifficulties: prev.visualDifficulties.includes(difficulty)
        ? prev.visualDifficulties.filter(d => d !== difficulty)
        : [...prev.visualDifficulties, difficulty]
    }))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Perfil do Usuário</h2>
        <p className="text-gray-600 dark:text-gray-300">Preencha seus dados para testes personalizados</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Idade
            </label>
            <input
              type="number"
              value={profile.age || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Sua idade"
              min="1"
              max="120"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gênero
            </label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={profile.usesGlasses}
              onChange={(e) => setProfile(prev => ({ ...prev, usesGlasses: e.target.checked }))}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Uso óculos ou lentes de contato
            </span>
          </label>
        </div>

        {profile.usesGlasses && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Correção
            </label>
            <select
              value={profile.lensType || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, lensType: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecione o tipo</option>
              <option value="miopia">Miopia</option>
              <option value="hipermetropia">Hipermetropia</option>
              <option value="astigmatismo">Astigmatismo</option>
              <option value="presbiopia">Presbiopia</option>
              <option value="multifocal">Multifocal</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Dificuldades Visuais (selecione todas que se aplicam)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Visão noturna',
              'Leitura de perto',
              'Leitura de longe',
              'Distinção de cores',
              'Sensibilidade à luz',
              'Visão periférica'
            ].map((difficulty) => (
              <label key={difficulty} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profile.visualDifficulties.includes(difficulty)}
                  onChange={() => toggleDifficulty(difficulty)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Continuar para os Testes
        </button>
      </form>
    </div>
  )
}

// Componente de Teste de Contraste
function ContrastTest({ onComplete }: { onComplete: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void }) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [currentPattern, setCurrentPattern] = useState<'left' | 'right'>('left')
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    generateNewPattern()
  }, [level])

  const generateNewPattern = () => {
    setCurrentPattern(Math.random() > 0.5 ? 'left' : 'right')
  }

  const handleAnswer = (answer: 'left' | 'right') => {
    if (answer === currentPattern) {
      setScore(prev => prev + 1)
      if (level < 10) {
        setLevel(prev => prev + 1)
        generateNewPattern()
      } else {
        completeTest()
      }
    } else {
      completeTest()
    }
  }

  const completeTest = () => {
    const duration = Date.now() - startTime
    const result = {
      testType: 'contraste' as const,
      score,
      level,
      duration,
      details: { maxLevel: level, correctAnswers: score }
    }
    setShowResult(true)
    setTimeout(() => onComplete(result), 2000)
  }

  if (showResult) {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Teste Concluído!</h3>
        <p className="text-gray-600 dark:text-gray-300">Pontuação: {score}/10</p>
        <p className="text-gray-600 dark:text-gray-300">Nível alcançado: {level}</p>
      </div>
    )
  }

  const contrastLevel = Math.max(0.9 - (level * 0.08), 0.1)

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Teste de Contraste</h2>
        <p className="text-gray-600 dark:text-gray-300">Nível {level}/10 - Identifique onde estão as listras</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(level / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <div 
            className="w-32 h-32 flex items-center justify-center"
            style={{ 
              background: currentPattern === 'left' 
                ? `repeating-linear-gradient(90deg, rgba(0,0,0,${contrastLevel}) 0px, rgba(0,0,0,${contrastLevel}) 4px, transparent 4px, transparent 8px)`
                : '#f5f5f5'
            }}
          >
          </div>
          <div 
            className="w-32 h-32 flex items-center justify-center"
            style={{ 
              background: currentPattern === 'right' 
                ? `repeating-linear-gradient(90deg, rgba(0,0,0,${contrastLevel}) 0px, rgba(0,0,0,${contrastLevel}) 4px, transparent 4px, transparent 8px)`
                : '#f5f5f5'
            }}
          >
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAnswer('left')}
          className="p-4 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg border-2 border-blue-200 dark:border-blue-700 transition-colors duration-200"
        >
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Esquerda
          </span>
        </button>
        <button
          onClick={() => handleAnswer('right')}
          className="p-4 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg border-2 border-blue-200 dark:border-blue-700 transition-colors duration-200"
        >
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Direita
          </span>
        </button>
      </div>
    </div>
  )
}

// Componente de Resultados Melhorado
function Results({ profile, results, onRestart }: { 
  profile: UserProfile
  results: TestResult[]
  onRestart: () => void 
}) {
  const shareResults = () => {
    const text = `Meus resultados do VisioTest+:\n${results.map(r => 
      `${r.testType}: ${r.score}/10 (Nível ${r.level})`
    ).join('\n')}\n\nBaixe o app: [Link do app]`
    
    if (navigator.share) {
      navigator.share({
        title: 'Resultados VisioTest+',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Resultados copiados para a área de transferência!')
    }
  }

  const exportResults = () => {
    const data = {
      usuario: profile.name,
      idade: profile.age,
      data: new Date().toLocaleDateString('pt-BR'),
      resultados: results.map(r => ({
        teste: r.testType,
        pontuacao: `${r.score}/10`,
        nivel: r.level,
        duracao: `${Math.round(r.duration / 1000)}s`
      }))
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `visiotest-${profile.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400'
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excelente'
    if (score >= 6) return 'Bom'
    if (score >= 4) return 'Regular'
    return 'Atenção'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Seus Resultados</h2>
          <p className="text-gray-600 dark:text-gray-300">Olá, {profile.name}! Aqui estão seus resultados personalizados.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {results.map((result, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                {result.testType === 'acuidade' && <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                {result.testType === 'contraste' && <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                {result.testType === 'cores' && <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                {result.testType === 'acuidade' && 'Acuidade Visual'}
                {result.testType === 'contraste' && 'Sensibilidade ao Contraste'}
                {result.testType === 'cores' && 'Percepção de Cores'}
              </h3>
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                {result.score}/10
              </div>
              <p className={`text-sm font-medium mb-2 ${getScoreColor(result.score)}`}>
                {getScoreLabel(result.score)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Nível {result.level} • {Math.round(result.duration / 1000)}s
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(result.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Análise Personalizada */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Análise Personalizada
          </h4>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
            {profile.age > 40 && (
              <p>• Considerando sua idade ({profile.age} anos), é normal haver mudanças na visão de perto.</p>
            )}
            {profile.usesGlasses && (
              <p>• Como você usa {profile.lensType ? profile.lensType : 'correção visual'}, mantenha consultas regulares.</p>
            )}
            {profile.visualDifficulties.includes('Distinção de cores') && results.some(r => r.testType === 'cores' && r.score < 6) && (
              <p>• Seus resultados confirmam dificuldades com cores. Considere avaliação especializada.</p>
            )}
            {results.some(r => r.score < 5) && (
              <p>• Alguns resultados indicam necessidade de avaliação oftalmológica mais detalhada.</p>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                Disclaimer Médico
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Este aplicativo é apenas para fins educacionais e de triagem básica. 
                Os resultados NÃO substituem uma consulta oftalmológica profissional. 
                Para diagnóstico preciso e tratamento, consulte sempre um oftalmologista qualificado.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={shareResults}
            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Share2 className="w-5 h-5" />
            <span>Compartilhar</span>
          </button>
          <button
            onClick={exportResults}
            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Eye className="w-5 h-5" />
            <span>Novos Testes</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente Principal
export default function VisioTestApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState<'welcome' | 'register' | 'test-menu' | 'acuity' | 'contrast' | 'colors' | 'results'>('welcome')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleRegistrationComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setCurrentStep('test-menu')
  }

  const handleTestComplete = (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => {
    const newResult: TestResult = {
      ...result,
      id: Date.now().toString(),
      userId: userProfile?.id || 'temp',
      date: new Date()
    }
    setTestResults(prev => [...prev, newResult])
    setCurrentStep('test-menu')
  }

  const resetApp = () => {
    setCurrentStep('welcome')
    setUserProfile(null)
    setTestResults([])
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  VisioTest+
                </h1>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentStep === 'welcome' && (
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <Eye className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                VisioTest+
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Realize testes rápidos e personalizados de visão com tecnologia avançada. 
                Monitore sua saúde visual de forma prática e profissional.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Teste de Acuidade</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avalie a nitidez da sua visão</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Teste de Contraste</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Meça a sensibilidade ao contraste</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Teste de Cores</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Avalie a percepção de cores</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep('register')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Começar Testes
              </button>
            </div>
          )}

          {currentStep === 'register' && (
            <UserRegistration onComplete={handleRegistrationComplete} />
          )}

          {currentStep === 'test-menu' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Escolha um Teste
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Olá, {userProfile?.name}! Selecione o teste que deseja realizar.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setCurrentStep('acuity')}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={testResults.some(r => r.testType === 'acuidade')}
                >
                  <Eye className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Acuidade Visual
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    Avalie a nitidez e clareza da sua visão
                  </p>
                  {testResults.some(r => r.testType === 'acuidade') && (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      ✓ Concluído
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentStep('contrast')}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={testResults.some(r => r.testType === 'contraste')}
                >
                  <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Sensibilidade ao Contraste
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    Meça sua sensibilidade ao contraste
                  </p>
                  {testResults.some(r => r.testType === 'contraste') && (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      ✓ Concluído
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentStep('colors')}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={testResults.some(r => r.testType === 'cores')}
                >
                  <Palette className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Percepção de Cores
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    Avalie sua capacidade de distinguir cores
                  </p>
                  {testResults.some(r => r.testType === 'cores') && (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      ✓ Concluído
                    </span>
                  )}
                </button>
              </div>

              {testResults.length > 0 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setCurrentStep('results')}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Ver Resultados ({testResults.length} teste{testResults.length > 1 ? 's' : ''} concluído{testResults.length > 1 ? 's' : ''})
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 'acuity' && (
            <EnhancedAcuityTest onComplete={handleTestComplete} />
          )}

          {currentStep === 'contrast' && (
            <ContrastTest onComplete={handleTestComplete} />
          )}

          {currentStep === 'colors' && (
            <ColorTest onComplete={handleTestComplete} />
          )}

          {currentStep === 'results' && userProfile && (
            <Results 
              profile={userProfile} 
              results={testResults} 
              onRestart={resetApp}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                VisioTest+ - Tecnologia para cuidar da sua visão
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Este aplicativo não substitui consulta médica profissional
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}