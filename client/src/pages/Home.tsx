import { useState } from "react";
import { useLocation } from "wouter";
import imgEncontreUBS from "@/assets/Encontre UBSs.jpg";
import imgInformacoes from "@/assets/Ache informações reais.jpg";
import logo from "@/assets/Logo.svg"; 

/**
 * TeCuidaAÊ - Home Page
 */

export default function Home() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      title: "Encontre UBSs\npróximas a você!"
    },
    {
      title: "Ache informações\nreais sobre a Sifílis!"
    }
  ];

  const features2 = [
    {
      title: "Conheça nosso chatbot\nespecializado!",
      descricao: "Tire dúvidas sobre sifílis, transmissão, sintomas e prevenção com nosso assistente virtual, disponível 24h!"
    }
  ];

  const features3 = [
    {
      title: "Já conhece nosso sistema\nde triagem?",
      descricao: "Avalie seu risco em minutos, com nosso questionário iterativo, e receba informações personalizadas sobre seu estado de saúde!"
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
    <div className="min-h-screen flex flex-col bg-background overflow-auto">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-headerHome text-headerText shadow-lg">
        <nav className="w-full flex justify-between items-center px-4 sm:px-6 h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="TeCuidaAÊ" className="h-16 sm:h-20" />
          </div>
          {/* Links — desktop */}
          <ul className="hidden md:flex gap-8 lg:gap-14 text-base lg:text-lg font-medium pr-4">
            <li><a href="/" className="hover:text-foreground transition py-2 inline-block">Início</a></li>
            <li><a href="/chatbot" className="hover:text-foreground transition py-2 inline-block">Chatbot</a></li>
            <li><a href="/mapa" className="hover:text-foreground transition py-2 inline-block">Mapa</a></li>
            <li><a href="/informacoes" className="hover:text-foreground transition py-2 inline-block">Informações</a></li>
            <li><a href="/triagem" className="hover:text-foreground transition py-2 inline-block">Triagem</a></li>
          </ul>
          {/* Hambúrguer — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-12 h-12 rounded-lg hover:bg-black/5"
          >
            <span className="block w-6 h-[2px] bg-headerText rounded transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span className="block w-6 h-[2px] bg-headerText rounded transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[2px] bg-headerText rounded transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </nav>
        {/* Menu mobile dropdown */}
        <div className="md:hidden overflow-hidden transition-all duration-300 bg-headerHome"
          style={{ maxHeight: menuOpen ? "400px" : "0px" }}>
          <ul className="flex flex-col border-t border-black/10">
            {[
              { label: "Início", href: "/" },
              { label: "Chatbot", href: "/chatbot" },
              { label: "Mapa", href: "/mapa" },
              { label: "Informações", href: "/informacoes" },
              { label: "Triagem", href: "/triagem" },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}
                  className="flex items-center px-6 text-headerText font-medium hover:bg-black/5 min-h-[48px]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-backgroundSectionHome text-white pt-10 pb-14 md:pt-16 md:pb-32 flex items-center justify-center" style={{borderRadius: "0 0 50% 50% / 0 0 60px 60px"}}>
  <div className="container relative z-10 text-center">
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">
        Cuidando da sua saúde em Manaus
      </h1>
      <p className="text-sm sm:text-base font-light md:text-xl mb-6">
        Informações confiáveis sobre sífilis, localização de UBSs e triagem de sintomas com base nos protocolos do Ministério da Saúde
      </p>
      {/* Emergency Banner */}
      <section className="bg-backgroundAlert text-white py-4 px-4 font-medium text-sm sm:text-base rounded-lg mt-6">
        <p>Em caso de emergência: procure uma UBS ou disque 192</p>
      </section>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section id="features" className="w-full py-8 md:py-2 px-4 sm:px-8 md:px-20 mb-7">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
    {features.map((feature, index) => (
      <div
        key={index}
        onClick={() => navigate(index === 0 ? "/mapa" : "/informacoes")}
        className="relative whitespace-pre-line text-2xl sm:text-3xl md:text-4xl text-white font-semibold text-center rounded-lg py-32 sm:py-44 md:py-60 cursor-pointer hover:opacity-90 transition overflow-hidden"
        style={{
          backgroundImage: `url(${index === 0 ? imgEncontreUBS : imgInformacoes})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
        <span className="relative z-10 px-4">{feature.title}</span>
      </div>
    ))}
  </div>
</section>

      <section className="w-full px-20 mb-13">
        <div className="bg-backgroundSections rounded-3xl p-12 px-15">
          {features2.map((feature, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-10">
              {/* esquerda */}
              <div>
                <h2 className="text-5xl font-bold text-headerText leading-tight">
                  {feature.title}
                </h2>
                <button
  onClick={() => navigate("/chatbot")}
  className="mt-17 bg-blue-600 text-white px-12 py-3 rounded-full text-lg font-semibold cursor-pointer hover:opacity-90 transition"
>
  Conheça!
</button>
              </div>
              {/* direita */}
              <div>
                <p className="text-2xl text-foreground opacity-70 leading-relaxed text-right">
                  {feature.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-20 mb-13">
        <div className="bg-backgroundSections rounded-3xl p-12 px-15">
          {features3.map((feature, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mt-10">
              {/* esquerda */}
              <div>
                <p className="text-2xl text-foreground opacity-70 leading-relaxed text-left">
                  {feature.descricao}
                </p>
              </div>
              {/* direita */}
              <div className="flex flex-col">
                <h2 className="text-5xl font-bold text-foregroundFeatures3 leading-tight text-right">
                  {feature.title}
                </h2>
                <button
  onClick={() => navigate("/triagem")}
  className="self-end mt-17 bg-foregroundFeatures3 text-white px-12 py-3 rounded-full text-lg font-semibold cursor-pointer hover:opacity-90 transition"
>
  Conheça!
</button>
              </div>
            </div>
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
