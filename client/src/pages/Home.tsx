import { Button } from "@/components/ui/button";
import { useLocation } from "wouter"; //navegar entre o app

/**
 * TeCuidaAÊ - Home Page
 */

export default function Home() {
  const [, navigate] = useLocation();

  const features = [
    {
      title: "Encontre UBSs\npróximas a você!"
    },
    {
      title: "Ache informações\nreais sobre a Sifílis!"
    }
  ];

  {/*<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
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
*/}
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-headerHome text-headerText shadow-lg">
        <nav className="container flex justify-center items-center py-7 gap-10">
          <div className="flex items-center gap-2">
            {/* Colocar a logo do projeto aqui*/}
          </div>
          <ul className="hidden md:flex gap-10 text-medium font-medium">
            <li><a href="#home" className="hover:text-foreground transition">Início</a></li>
            <li><a href="#chatbot" className="hover:text-foreground transition">Chatbot</a></li>
            <li><a href="#maps" className="hover:text-foreground transition">Mapa</a></li>
            <li><a href="#informations" className="hover:text-foreground transition">Informações</a></li>
            {/*Deixar esse screening com cara de botão*/}
            <li><a href="#screening" className="text-foregroundTriagem">Triagem</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-backgroundSectionHome text-white py-16 md:py-19 overflow-hidden flex items-center justify-center">
        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto pl-7">
            <h1 className="text-4xl font-semibold mb-6 text-center">
              Cuidando da sua saúde em Manaus
            </h1>
            <p className="text-lg font-light md:text-xl mb-8">
              Informações confiáveis sobre sífilis, localização de UBSs e triagem de sintomas com base nos protocolos do Ministério da Saúde
            </p>
            {/* Emergency Banner */}
            <section className="bg-backgroundAlert text-white py-5 font-medium text-lg rounded-lg mt-13">
              <div className="flex items-center justify-center gap-10 text-center">
                <div>
                  <p>Em caso de emergência: procure uma UBS ou disque 192</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {features.map((feature, index) => (
            <h1
              key={index}
              className="whitespace-pre-line bg-backgroundInformativos text-3xl text-white font-semibold text-center rounded-lg px-6 py-60 opacity-65"
            >
              {feature.title}
            </h1>
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
