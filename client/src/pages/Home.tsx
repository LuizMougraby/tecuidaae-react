import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

/**
 * TeCuidaAÊ - Home Page
 * Design: Healthcare Modern - Teal + Cyan accent colors
 * Layout: Hero section with asymmetric design, feature cards grid
 */

export default function Home() {
  const [, navigate] = useLocation();

  const features = [
    {
      icon: "🤖",
      title: "Chatbot Especializado",
      description: "Tire dúvidas sobre sífilis, transmissão, sintomas e prevenção com nosso assistente virtual disponível 24h.",
      href: "/chatbot",
    },
    {
      icon: "📍",
      title: "Encontre UBSs",
      description: "Localize unidades de saúde em Manaus que realizam atendimento para ISTs com informações atualizadas.",
      href: "/mapa",
    },
    {
      icon: "📚",
      title: "Informações Validadas",
      description: "Artigos revisados por infectologistas sobre sífilis, tratamento e cuidados durante a gravidez.",
      href: "/informacoes",
    },
    {
      icon: "✅",
      title: "Triagem Rápida",
      description: "Avalie seu risco em minutos com nosso questionário interativo e receba orientações personalizadas.",
      href: "/triagem",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-[#14919b] text-white shadow-lg">
        <nav className="container flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold text-lg">
              🏥
            </div>
            <span className="text-xl font-bold">TeCuidaAÊ</span>
          </div>
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li><a href="#inicio" className="hover:text-secondary transition">Início</a></li>
            <li><a href="#features" className="hover:text-secondary transition">Serviços</a></li>
            <li><a href="#contato" className="hover:text-secondary transition">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-[#14919b] text-white py-16 md:py-24 overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary opacity-10 rounded-full -mr-48 -mt-48"></div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Cuidando da sua saúde em Manaus
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed">
              Informações confiáveis sobre sífilis, localização de UBSs e triagem de sintomas com base nos protocolos do Ministério da Saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/triagem")}
                className="bg-secondary text-primary hover:bg-opacity-90 font-semibold px-8 py-6 text-base"
              >
                🩺 Fazer Triagem
              </Button>
              <Button
                onClick={() => navigate("/chatbot")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-base"
              >
                💬 Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gradient-to-r from-destructive to-[#ee5a5a] text-white py-6">
        <div className="container flex items-center justify-center gap-4 text-center md:text-left">
          <span className="text-3xl">🚨</span>
          <div>
            <strong className="block">Em caso de emergência:</strong>
            <p>Procure imediatamente a UBS mais próxima ou ligue 192 (SAMU)</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24 flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Como podemos te ajudar?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Acesse nossos serviços para obter informações confiáveis e orientação profissional
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => navigate(feature.href)}
              className="bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl p-8 text-left border border-border group"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-[#14919b] rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-[#323232] text-white py-12 mt-auto">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-secondary font-bold mb-4">TeCuidaAÊ</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Plataforma de apoio à saúde pública de Manaus focada na prevenção e tratamento da sífilis.
              </p>
            </div>
            <div>
              <h4 className="text-secondary font-bold mb-4">Links Úteis</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="https://www.gov.br/saude/pt-br" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">Ministério da Saúde</a></li>
                <li><a href="https://www.fvs.am.gov.br/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">FVS-AM</a></li>
                <li><a href="https://www.who.int/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition">OMS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-secondary font-bold mb-4">Contato</h4>
              <p className="text-gray-400 text-sm">
                Suporte técnico 24/7
                <br />
                <a href="mailto:contato@tecuidaae.manaus.am.gov.br" className="hover:text-secondary transition">
                  contato@tecuidaae.manaus.am.gov.br
                </a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TeCuidaAÊ - Prefeitura de Manaus. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">Fontes: Protocolo Clínico MS 2022 | Diretrizes OMS 2021 | FVS-AM</p>
          </div>
        </div>
      </footer>

      {/* Accessibility Bar */}
      <div className="fixed bottom-6 right-6 flex gap-2 z-40">
        <button
          onClick={() => {
            const root = document.documentElement;
            const current = parseInt(root.style.fontSize || '16');
            root.style.fontSize = Math.min(24, current + 2) + 'px';
          }}
          className="w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform font-bold"
          title="Aumentar fonte"
        >
          A+
        </button>
        <button
          onClick={() => {
            const root = document.documentElement;
            const current = parseInt(root.style.fontSize || '16');
            root.style.fontSize = Math.max(12, current - 2) + 'px';
          }}
          className="w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform font-bold"
          title="Diminuir fonte"
        >
          A-
        </button>
      </div>
    </div>
  );
}
