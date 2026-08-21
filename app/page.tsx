'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  TrendingUp, 
  BarChart3,
  Sun,
  Moon
} from 'lucide-react'

// Dados fake estruturados
const MOCK_DATA = {
  weekly: {
    caixaAtual: 18450.20,
    entradasDia: 3420.00,
    saidasDia: 980.50,
    lucroEstimado: 2439.50,
    chartLabels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    chartValues: [3100, 2800, 4200, 3900, 6500, 8400, 7100],
    maxVal: 9000,
  },
  monthly: {
    caixaAtual: 18450.20,
    entradasDia: 3420.00,
    saidasDia: 980.50,
    lucroEstimado: 38200.00,
    chartLabels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    chartValues: [24500, 29800, 31200, 35400],
    maxVal: 40000,
  }
}

export default function FinanceDashboard() {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const data = MOCK_DATA[viewMode]

  // Sincroniza o estado do botão com a classe .dark do documento
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      setIsDarkMode(false)
    } else {
      html.classList.add('dark')
      setIsDarkMode(true)
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto bg-background min-h-screen text-foreground transition-colors duration-300">
      
      {/* Cabeçalho da Página com Filtro de Período e Botão de Tema */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Visão Geral Financeira</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Painel consolidado de entradas, saídas e saúde de caixa do bar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Botões de Alternância: Semanal / Mensal */}
          <div className="flex items-center bg-muted/60 p-1 rounded-2xl border border-border w-fit">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                viewMode === 'weekly' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Visão Semanal
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                viewMode === 'monthly' 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Visão Mensal
            </button>
          </div>

          {/* Botão de Alternar Tema (Dark/Light) */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-muted/60 border border-border text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center"
            title="Alternar tema"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Grid de KPIs Modernos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Caixa Atual */}
        <div className="relative overflow-hidden p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs hover:border-primary/50 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Caixa Atual</p>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black tracking-tight mt-4">
            R$ {data.caixaAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <span className="text-emerald-500 font-medium">Conta principal</span> consolidada
          </p>
        </div>

        {/* Entradas do Dia */}
        <div className="relative overflow-hidden p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Entradas (Hoje)</p>
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black tracking-tight mt-4 text-emerald-600 dark:text-emerald-400">
            + R$ {data.entradasDia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            Comandas e PDV fechados
          </p>
        </div>

        {/* Saídas do Dia */}
        <div className="relative overflow-hidden p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs hover:border-rose-500/50 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Saídas (Hoje)</p>
            <div className="h-10 w-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <ArrowDownLeft className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black tracking-tight mt-4 text-rose-600 dark:text-rose-400">
            - R$ {data.saidasDia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            Despesas e contas pagas
          </p>
        </div>

        {/* Resultado Operacional */}
        <div className="relative overflow-hidden p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs hover:border-primary/50 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Resultado ({viewMode === 'weekly' ? 'Semana' : 'Mês'})</p>
            <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-3xl font-black tracking-tight mt-4 text-primary">
            R$ {data.lucroEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-muted-foreground mt-2">
            Balanço de faturamento líquido
          </p>
        </div>

      </div>

      {/* Gráfico de Evolução Dinâmico */}
      <div className="p-6 lg:p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold">Evolução do Faturamento ({viewMode === 'weekly' ? 'Por Dia da Semana' : 'Por Semana do Mês'})</h2>
            <p className="text-xs text-muted-foreground">Análise de desempenho financeiro consolidado</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-primary/10 text-primary w-fit">
            <BarChart3 className="h-3.5 w-3.5" /> Atualizado em tempo real
          </span>
        </div>

        {/* Container das Barras do Gráfico */}
        <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2 border-b border-border pb-2">
          {data.chartValues.map((val, idx) => {
            const heightPercentage = Math.round((val / data.maxVal) * 100)
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {/* Tooltip com formatação pt-BR segura para SSR */}
                <span className="text-[10px] font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  R$ {val.toLocaleString('pt-BR')}
                </span>
                
                {/* Barra */}
                <div className="w-full max-w-[48px] bg-muted/60 rounded-2xl overflow-hidden h-full flex items-end">
                  <div 
                    style={{ height: `${heightPercentage}%` }}
                    className="w-full bg-primary rounded-2xl transition-all duration-500 ease-out group-hover:opacity-90"
                  />
                </div>
                
                {/* Legenda do Eixo X */}
                <span className="text-xs font-medium text-muted-foreground mt-1">
                  {data.chartLabels[idx]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Seção Inferior: Tabelas de Movimentação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Entradas Recentes */}
        <div className="p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Entradas Recentes
            </h2>
            <span className="text-xs text-muted-foreground">Últimas transações</span>
          </div>

          <div className="divide-y divide-border">
            <div className="py-3.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">Fechamento Comanda #1084</p>
                <p className="text-xs text-muted-foreground">Cartão de Crédito (Visa) • Há 4 min</p>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+ R$ 240,00</span>
            </div>
            <div className="py-3.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">Fechamento Comanda #1083</p>
                <p className="text-xs text-muted-foreground">Pix • Há 15 min</p>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+ R$ 115,50</span>
            </div>
            <div className="py-3.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">Venda Balcão PDV</p>
                <p className="text-xs text-muted-foreground">Dinheiro • Há 28 min</p>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">+ R$ 68,00</span>
            </div>
          </div>
        </div>

        {/* Saídas Recentes */}
        <div className="p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Saídas Recentes
            </h2>
            <span className="text-xs text-muted-foreground">Últimas despesas</span>
          </div>

          <div className="divide-y divide-border">
            <div className="py-3.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">Reposição de Insumos (Bebidas)</p>
                <p className="text-xs text-muted-foreground">Boleto Bancário • Hoje, 11:20</p>
              </div>
              <span className="font-bold text-rose-600 dark:text-rose-400">- R$ 950,00</span>
            </div>
            <div className="py-3.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">Taxa de Maquininha (Antecipação)</p>
                <p className="text-xs text-muted-foreground">Débito Automático • Hoje, 04:00</p>
              </div>
              <span className="font-bold text-rose-600 dark:text-rose-400">- R$ 180,00</span>
            </div>
            <div className="py-3.5 flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold">Manutenção Equipamento Frio</p>
                <p className="text-xs text-muted-foreground">Pix • Ontem</p>
              </div>
              <span className="font-bold text-rose-600 dark:text-rose-400">- R$ 350,00</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}