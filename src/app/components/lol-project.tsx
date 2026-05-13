import { motion } from "motion/react";
import {
  X,
  Search,
  Figma,
  PenTool,
  Palette,
  Database,
  MousePointerClick,
  Layers,
  Users,
  ZapOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "../data/projects";
import { useLanguage } from "../contexts/language-context";

interface LolProjectProps {
  project: Project;
  onClose: () => void;
}

export function LolProject({ project, onClose }: LolProjectProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("context");

  const content = {
    pt: {
      title: "League of Legends",
      subtitle: "Redesign Conceitual UI/UX",
      needTitle: "A Necessidade do Rework",
      needDesc:
        'Analisamos o atual Client e encontramos uns bons "bugs" na nossa jornada. Abaixo estão os principais motivos que nos levaram a focar num Rework visual e mecânico digno de um upgrade Hextech!',
      need1Title: "Kiting de Cliques",
      need1Desc:
        "Até 7 cliques espalhados apenas para entrar em Summoner's Rift. Queremos otimizar.",
      need2Title: "Teamfight Visual",
      need2Desc:
        "TFT e LoL juntos poluem e confundem passes e missões no mesmo Client.",
      need3Title: "Troca de Contas",
      need3Desc:
        "Relogar exige fechar o client todo. Falta login simultâneo multi-contas fácil.",
      need4Title: "Lag do Teemo",
      need4Desc:
        "Falta fluidez que pesa na máquina e as telas de erro viram becos sem saída.",
      processTitle: "Etapas do Processo",
      step1Num: "1",
      step1Title: "Problematização",
      step1Sub: "Análise Heurística & Dores do Usuário",
      step1Item1:
        "Falta de Usabilidade: O cliente exige muita iteração para ações simples (ex: iniciar partida leva até 7 cliques).",
      step1Item2:
        "Poluição Visual: O passe de batalha do TFT junto com o do LoL torna confuso quais missões concluir.",
      step1Item3:
        "Distribuição: Telas desnecessárias com pouca ou muita informação, como customizações separadas das próprias skins.",
      step2Num: "2",
      step2Title: "Resolução",
      step2Sub: "Ideias Selecionadas para o Rework",
      step2Item1:
        "Separação de Jogos: Tirar o TFT do launcher principal para despoluir a interface e acelerar o carregamento.",
      step2Item2:
        "Client Built-in: Fim da necessidade de carregar uma página diferente a cada partida. Ajudando drasticamente na velocidade de carregamento, com arquivos de mapa e efeitos sempre prontos — uma tecnologia já consolidada no Valorant.",
      step3Num: "3",
      step3Title: "Prototipagem",
      step3Sub: "Do Wireframe às Telas Finais",
      step3P1:
        "Com as resoluções em mãos, passamos para a criação dos primeiros protótipos de baixa fidelidade para testar os novos fluxos de navegação. Modificamos o layout de escolha de modo de jogo (Normal, Ranqueado, Arcane/Minigames), a seleção de campeões e a árvore de runas.",
      step3P2:
        "Tudo foi planejado para reduzir o carregamento, aproveitando assets e a identidade visual definida (Site Branding LOL) para evoluir a interface para alta fidelidade, garantindo a essência do 'League'.",
      step4Num: "4",
      step4Title: "Finalização",
      step4Sub: "Testes & Refinamentos",
      step4P1:
        "Etapa focada em rodar os protótipos em testes de usabilidade, focando na facilidade do jogador mais focado na experiência. Aplicamos as fontes oficiais Beaufort for LOL Heavy para destaque e Spiegel Regular para informações densas.",
      step4P2:
        "Pequenos detalhes nas cores Hextech e ícones foram ajustados para entregar o resultado mais harmonioso possível. Agora, os jogadores podem aproveitar a jornada desde o primeiro clique no Launcher.",
      briefingTitle: "Briefing: Identidade Hextech",
      briefingDesc:
        "O design utiliza a temática Minimalista e Hextech com foco em modernizar e facilitar a navegação pelo Client, destacando o lado bom do jogo.",
      typoTitle: "Tipografia",
      typoDesc1:
        "Fonte padrão para títulos e exposições (Heavy). Nunca usada em cópias pequenas.",
      typoDesc2:
        "A fonte perfeita para marcações e corpo do texto. Sendo sem serifa, contrasta bem com a Beaufort.",
      colorsTitle: "Paleta de Cores",
      screensTitle: "Protótipo das Telas",
      screensDesc:
        "Interface remodelada seguindo a identidade visual refinada, distribuindo melhor os elementos e trazendo foco para as funcionalidades essenciais.",
      screen1Title: "Lobby & Grupos",
      screen1Desc:
        "Visual imersivo com painel lateral simplificado, destacando os convites e recompensas.",
      screen2Title: "Seleção de Modos",
      screen2Desc:
        "Painel em estilo vitrine, melhorando a escolha entre os modos alternativos e o clássico de Summoner's Rift.",
      screen3Title: "Loja do Cliente",
      screen3Desc:
        "Loja reorganizada para focar em lançamentos e promoções, com visualização imersiva para skins e pacotes.",
      screen4Title: "Perfil & Histórico",
      screen4Desc:
        "Sua jornada orgulhosamente exposta, centralizando atributos do jogador e maestrias num dashboard moderno.",
      heroDesc:
        "Explorando novas possibilidades visuais e funcionais para o cliente de jogo mais jogado do mundo.",
      ctaTitle: "Aproveite sua jornada",
      ctaDesc:
        "Navegue pelo protótipo criado pela dupla no Figma. Escaneie o QR Code ou clique abaixo!",
      ctaButton: "VER PROTÓTIPO NO FIGMA",
    },
    en: {
      title: "League of Legends",
      subtitle: "UI/UX Conceptual Redesign",
      needTitle: "The Need for a Rework",
      needDesc:
        'We analyzed the current Client and found some good "bugs" on our journey. Below are the main reasons that led us to focus on a visual and mechanical Rework worthy of a Hextech upgrade!',
      need1Title: "Click Kiting",
      need1Desc:
        "Up to 7 scattered clicks just to enter Summoner's Rift. We want to optimize this.",
      need2Title: "Visual Teamfight",
      need2Desc:
        "TFT and LoL together pollute and confuse passes and missions in the same Client.",
      need3Title: "Account Switching",
      need3Desc:
        "Relogging requires closing the whole client. Lacks easy multi-account simultaneous login.",
      need4Title: "Teemo's Lag",
      need4Desc:
        "Lacks fluidity which weighs on the machine, and error screens become dead ends.",
      processTitle: "Process Stages",
      step1Num: "1",
      step1Title: "Problematization",
      step1Sub: "Heuristic Analysis & User Pain Points",
      step1Item1:
        "Lack of Usability: The client demands heavy iteration for simple actions (e.g., starting a match takes up to 7 clicks).",
      step1Item2:
        "Visual Pollution: The TFT battle pass alongside LoL's makes it confusing which missions to complete.",
      step1Item3:
        "Distribution: Unnecessary screens with too little or too much information, like customizations separated from skins themselves.",
      step2Num: "2",
      step2Title: "Resolution",
      step2Sub: "Selected Ideas for the Rework",
      step2Item1:
        "Game Separation: Removing TFT from the main launcher to clean up the interface and speed up loading.",
      step2Item2:
        "Built-in Client: Ending the need to load a different page for each match. Drastically aiding load speeds, with map files and effects always ready — a technology already consolidated in Valorant.",
      step3Num: "3",
      step3Title: "Prototyping",
      step3Sub: "From Wireframe to Final Screens",
      step3P1:
        "With the resolutions in hand, we moved on to creating the first low-fidelity prototypes to test the new navigation flows. We modified the game mode selection layout (Normal, Ranked, Arcane/Minigames), champion selection, and rune tree.",
      step3P2:
        "Everything was planned to reduce loading times, utilizing assets and the defined visual identity (LOL Branding Site) to evolve the interface to high fidelity, ensuring the essence of 'League'.",
      step4Num: "4",
      step4Title: "Finalization",
      step4Sub: "Testing & Refinements",
      step4P1:
        "Stage focused on running the prototypes in usability tests, focusing on the ease for the experience-focused player. We applied the official Beaufort for LOL Heavy fonts for highlights and Spiegel Regular for dense information.",
      step4P2:
        "Small details in the Hextech colors and icons were adjusted to deliver the most harmonious result possible. Now, players can enjoy the journey from the first click on the Launcher.",
      briefingTitle: "Briefing: Hextech Identity",
      briefingDesc:
        "The design uses the Minimalist and Hextech theme with a focus on modernizing and easing navigation through the Client, highlighting the good side of the game.",
      typoTitle: "Typography",
      typoDesc1:
        "Default font for titles and displays (Heavy). Never used in small copy.",
      typoDesc2:
        "The perfect font for markups and body text. Being sans-serif, it contrasts well with Beaufort.",
      colorsTitle: "Color Palette",
      screensTitle: "Screen Prototypes",
      screensDesc:
        "Remodeled interface following the refined visual identity, better distributing elements and putting focus on essential functionalities.",
      screen1Title: "Lobby & Groups",
      screen1Desc:
        "Immersive visual with simplified side panel, highlighting invites and rewards.",
      screen2Title: "Mode Selection",
      screen2Desc:
        "Showcase-style panel, improving the choice between alternate modes and classic Summoner's Rift.",
      screen3Title: "Client Store",
      screen3Desc:
        "Store reorganized to focus on new releases and promotions, with immersive viewing for skins and bundles.",
      screen4Title: "Profile & History",
      screen4Desc:
        "Your journey proudly displayed, centralizing player attributes and masteries in a modern dashboard.",
      heroDesc:
        "Exploring new visual and functional possibilities for the most played game client in the world.",
      ctaTitle: "Enjoy your journey",
      ctaDesc:
        "Browse the prototype created by the duo in Figma. Scan the QR Code or click below!",
      ctaButton: "SEE PROTOTYPE ON FIGMA",
    },
  };

  const text = content[language];

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] overflow-y-auto bg-[#010a13] text-[#f0e6d2] font-spiegel"
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[200] p-3 bg-[#010a13] border border-[#c69b3f]/50 text-[#c69b3f] hover:bg-[#c69b3f] hover:text-[#010a13] transition-colors duration-300 transform"
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
        }}
      >
        <X size={20} />
      </button>

      <div className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[100vh] flex flex-col items-center justify-end bg-black">
          <div className="absolute inset-0 overflow-hidden">
            <video
              preload="metadata"
              src="/images/1668457441-1668457441-neeko-the-curious-chameleon-live-wallpaper.mp4"
              autoPlay
              loop
              playsInline
              muted
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010a13] via-[#010a13]/40 to-transparent" />
          </div>

          <div className="relative z-10 text-center px-6 mt-auto pb-16">
            <h1 className="font-beaufort text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#c69b3f] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Redesign Client
            </h1>
            <img
              loading="lazy"
              src="/images/regenerated_image_1778333772812.png"
              alt="League Logo Placeholder"
              className="w-[85%] md:w-[500px] h-auto object-contain mx-auto -mt-2 drop-shadow-xl"
            />
            <p className="mt-2 text-lg max-w-2xl mx-auto text-[#f0e6d2] font-light shadow-black drop-shadow-md">
              {text.heroDesc}
            </p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <span className="flex items-center gap-2 px-4 py-1.5 text-xs border border-[#c69b3f]/40 rounded-full text-[#c69b3f] uppercase tracking-widest bg-[#010a13]/50 backdrop-blur-sm">
                <Figma size={14} /> Figma
              </span>
              <span className="flex items-center gap-2 px-4 py-1.5 text-xs border border-[#c69b3f]/40 rounded-full text-[#c69b3f] uppercase tracking-widest bg-[#010a13]/50 backdrop-blur-sm">
                <PenTool size={14} /> Illustrator
              </span>
              <span className="flex items-center gap-2 px-4 py-1.5 text-xs border border-[#c69b3f]/40 rounded-full text-[#c69b3f] uppercase tracking-widest bg-[#010a13]/50 backdrop-blur-sm">
                <Palette size={14} /> Photoshop
              </span>
              <span className="flex items-center gap-2 px-4 py-1.5 text-xs border border-[#c69b3f]/40 rounded-full text-[#c69b3f] uppercase tracking-widest bg-[#010a13]/50 backdrop-blur-sm">
                <Database size={14} /> LoL Database
              </span>
            </div>
          </div>
        </section>

        {/* Problematization Cards */}
        <section className="max-w-6xl mx-auto px-6 py-24 relative z-10 border-b border-[#c69b3f]/10">
          <div className="text-center mb-16">
            <h2 className="font-beaufort text-4xl text-[#c69b3f] mb-6 uppercase tracking-wider">
              {text.needTitle}
            </h2>
            <p className="text-[#a0aab5] max-w-3xl mx-auto text-lg font-light leading-relaxed">
              {text.needDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#010a13] border border-[#c69b3f]/20 p-5 hover:border-[#0bc6e3]/80 transition-all duration-300 rounded-sm shadow-xl group hover:-translate-y-1"
            >
              <div className="w-10 h-10 mb-4 text-[#c69b3f] bg-[#c69b3f]/5 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform duration-500">
                <MousePointerClick size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-beaufort text-lg text-[#f0e6d2] mb-2 leading-tight">
                {text.need1Title}
              </h3>
              <p className="text-[#a0aab5] text-xs leading-relaxed">
                {text.need1Desc}
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#010a13] border border-[#c69b3f]/20 p-5 hover:border-[#0bc6e3]/80 transition-all duration-300 rounded-sm shadow-xl group hover:-translate-y-1"
            >
              <div className="w-10 h-10 mb-4 text-[#c69b3f] bg-[#c69b3f]/5 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform duration-500">
                <Layers size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-beaufort text-lg text-[#f0e6d2] mb-2 leading-tight">
                {text.need2Title}
              </h3>
              <p className="text-[#a0aab5] text-xs leading-relaxed">
                {text.need2Desc}
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#010a13] border border-[#c69b3f]/20 p-5 hover:border-[#0bc6e3]/80 transition-all duration-300 rounded-sm shadow-xl group hover:-translate-y-1"
            >
              <div className="w-10 h-10 mb-4 text-[#c69b3f] bg-[#c69b3f]/5 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform duration-500">
                <Users size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-beaufort text-lg text-[#f0e6d2] mb-2 leading-tight">
                {text.need3Title}
              </h3>
              <p className="text-[#a0aab5] text-xs leading-relaxed">
                {text.need3Desc}
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#010a13] border border-[#c69b3f]/20 p-5 hover:border-[#0bc6e3]/80 transition-all duration-300 rounded-sm shadow-xl group hover:-translate-y-1"
            >
              <div className="w-10 h-10 mb-4 text-[#c69b3f] bg-[#c69b3f]/5 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform duration-500">
                <ZapOff size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-beaufort text-lg text-[#f0e6d2] mb-2 leading-tight">
                {text.need4Title}
              </h3>
              <p className="text-[#a0aab5] text-xs leading-relaxed">
                {text.need4Desc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Etapas do Processo - Zig Zag */}
        <section className="w-full bg-[#0a1428] py-24 border-y border-[#c69b3f]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#005a82]/10 via-[#010a13]/80 to-[#010a13] pointer-events-none" />

          <div className="absolute top-8 right-8 sm:top-16 sm:right-16 opacity-100 pointer-events-none w-48 h-48 sm:w-64 sm:h-64 mask-radial-fade">
            <video
              preload="metadata"
              src="/images/blitzcrank_goleiro.mp4"
              autoPlay
              loop
              playsInline
              muted
              className="w-full h-full object-cover rounded-full shadow-2xl"
            />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <h2 className="font-beaufort text-4xl text-[#c69b3f] mb-20 uppercase tracking-wider text-center">
              {text.processTitle}
            </h2>

            <div className="flex flex-col gap-24">
              {/* Etapa 1: Problematização */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                <div className="w-full md:w-1/2 order-2 md:order-1 relative h-[300px] md:h-[420px]">
                  <div className="absolute top-0 left-0 w-[70%] z-10 transition-all duration-700 group-hover:-translate-y-4 group-hover:-translate-x-2 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778438287182.jpg"
                      alt="Problematização 1"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[75%] z-20 transition-all duration-700 group-hover:translate-y-4 group-hover:translate-x-2 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778438069903.png"
                      alt="Problematização 2"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#091428] border-2 border-[#c69b3f] rounded-full flex items-center justify-center font-beaufort text-[#c69b3f] text-xl font-bold shrink-0">
                      {text.step1Num}
                    </div>
                    <h3 className="font-beaufort text-3xl text-[#f0e6d2] uppercase tracking-wide">
                      {text.step1Title}
                    </h3>
                  </div>
                  <h4 className="font-beaufort text-xl text-[#0bc6e3] mb-3">
                    {text.step1Sub}
                  </h4>
                  <ul className="text-[#a0aab5] space-y-3 font-light text-base leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c69b3f] mt-1">▪</span>{" "}
                      <strong>{text.step1Item1.split(":")[0]}:</strong>{" "}
                      {text.step1Item1.split(":")[1]}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c69b3f] mt-1">▪</span>{" "}
                      <strong>{text.step1Item2.split(":")[0]}:</strong>{" "}
                      {text.step1Item2.split(":")[1]}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c69b3f] mt-1">▪</span>{" "}
                      <strong>{text.step1Item3.split(":")[0]}:</strong>{" "}
                      {text.step1Item3.split(":")[1]}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Etapa 2: Resolução */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                <div className="w-full md:w-1/2 order-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#091428] border-2 border-[#c69b3f] rounded-full flex items-center justify-center font-beaufort text-[#c69b3f] text-xl font-bold shrink-0">
                      {text.step2Num}
                    </div>
                    <h3 className="font-beaufort text-3xl text-[#f0e6d2] uppercase tracking-wide">
                      {text.step2Title}
                    </h3>
                  </div>
                  <h4 className="font-beaufort text-xl text-[#0bc6e3] mb-3">
                    {text.step2Sub}
                  </h4>
                  <ul className="text-[#a0aab5] space-y-3 font-light text-base leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#c69b3f] mt-1">▪</span>{" "}
                      <strong>{text.step2Item1.split(":")[0]}:</strong>{" "}
                      {text.step2Item1.split(":")[1]}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#c69b3f] mt-1">▪</span>{" "}
                      <strong>{text.step2Item2.split(":")[0]}:</strong>{" "}
                      {text.step2Item2.split(":")[1]}
                    </li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 order-2 relative h-[300px] md:h-[420px]">
                  <div className="absolute top-0 right-0 w-[70%] z-10 transition-all duration-700 group-hover:-translate-y-4 group-hover:translate-x-2 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778438863377.png"
                      alt="Resolução 1"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-[75%] z-20 transition-all duration-700 group-hover:translate-y-4 group-hover:-translate-x-2 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778439392302.png"
                      alt="Resolução 2"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Etapa 3: Prototipagem */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                <div className="w-full md:w-1/2 order-2 md:order-1 relative h-[300px] md:h-[420px] flex items-center justify-center">
                  {/* Stack Image 1 */}
                  <div className="absolute w-[55%] z-10 -rotate-3 translate-x-2 -translate-y-2 transition-all duration-700 group-hover:-translate-x-[120px] group-hover:-translate-y-[120px] group-hover:-rotate-12 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778440331949.png"
                      alt="Prototipagem 1"
                      className="w-full h-auto rounded-sm opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                  {/* Stack Image 3 */}
                  <div className="absolute w-[50%] z-20 rotate-2 -translate-x-2 translate-y-2 transition-all duration-700 group-hover:translate-x-[120px] group-hover:-translate-y-[80px] group-hover:rotate-12 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778441031638.png"
                      alt="Prototipagem 3"
                      className="w-full h-auto rounded-sm opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                  {/* Stack Image 4 */}
                  <div className="absolute w-[50%] z-30 -rotate-1 -translate-x-4 -translate-y-4 transition-all duration-700 group-hover:-translate-x-[100px] group-hover:translate-y-[100px] group-hover:-rotate-6 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778440822469.png"
                      alt="Prototipagem 4"
                      className="w-full h-auto rounded-sm opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                  {/* Stack Image 2 (Top) */}
                  <div className="absolute w-[60%] z-40 rotate-1 translate-x-3 translate-y-3 transition-all duration-700 group-hover:translate-x-[70px] group-hover:translate-y-[110px] group-hover:rotate-6 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778440003813.png"
                      alt="Prototipagem 2"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700 border border-[#0bc6e3]/30"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#091428] border-2 border-[#c69b3f] rounded-full flex items-center justify-center font-beaufort text-[#c69b3f] text-xl font-bold shrink-0">
                      {text.step3Num}
                    </div>
                    <h3 className="font-beaufort text-3xl text-[#f0e6d2] uppercase tracking-wide">
                      {text.step3Title}
                    </h3>
                  </div>
                  <h4 className="font-beaufort text-xl text-[#0bc6e3] mb-3">
                    {text.step3Sub}
                  </h4>
                  <p className="text-[#a0aab5] font-light text-base leading-relaxed mb-4">
                    {text.step3P1}
                  </p>
                  <p className="text-[#a0aab5] font-light text-base leading-relaxed">
                    {text.step3P2}
                  </p>
                </div>
              </div>

              {/* Etapa 4: Finalização */}
              <div className="flex flex-col md:flex-row items-center gap-12 group">
                <div className="w-full md:w-1/2 order-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#091428] border-2 border-[#c69b3f] rounded-full flex items-center justify-center font-beaufort text-[#c69b3f] text-xl font-bold shrink-0">
                      {text.step4Num}
                    </div>
                    <h3 className="font-beaufort text-3xl text-[#f0e6d2] uppercase tracking-wide">
                      {text.step4Title}
                    </h3>
                  </div>
                  <h4 className="font-beaufort text-xl text-[#0bc6e3] mb-3">
                    {text.step4Sub}
                  </h4>
                  <p
                    className="text-[#a0aab5] font-light text-base leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: text.step4P1 }}
                  />
                  <p className="text-[#a0aab5] font-light text-base leading-relaxed">
                    {text.step4P2}
                  </p>
                </div>
                <div className="w-full md:w-1/2 order-2 relative h-[300px] md:h-[420px]">
                  <div className="absolute top-0 right-0 w-[70%] z-10 transition-all duration-700 group-hover:-translate-y-4 group-hover:translate-x-2 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778441202811.png"
                      alt="Finalização 1"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-[75%] z-20 transition-all duration-700 group-hover:translate-y-4 group-hover:-translate-x-2 group-hover:scale-105 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                    <img
                      loading="lazy"
                      src="/images/regenerated_image_1778441201032.png"
                      alt="Finalização 2"
                      className="w-full h-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design System & Paleta de Cores */}
        <section className="max-w-6xl mx-auto px-6 py-24 relative">
          {/* Cho'Gath Floating on Right Edge of Briefing */}
          <div className="absolute right-0 sm:-right-24 top-0 sm:top-10 flex z-30 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <div className="w-[160px] h-[160px] sm:w-[260px] sm:h-[260px] mask-radial-fade mix-blend-screen drop-shadow-2xl">
              <video
                preload="metadata"
                src="/images/cho'gath_cavalheiro.mp4"
                autoPlay
                loop
                playsInline
                muted
                className="w-full h-full object-cover opacity-100 rounded-full"
                title="Cho'Gath Gentleman"
              />
            </div>
          </div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="font-beaufort text-4xl text-[#c69b3f] mb-6 uppercase tracking-wider">
              {text.briefingTitle}
            </h2>
            <p className="text-[#a0aab5] max-w-3xl mx-auto text-lg font-light leading-relaxed">
              {text.briefingDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Tipografia */}
            <div>
              <h3 className="font-beaufort text-3xl text-[#f0e6d2] mb-8 uppercase tracking-wider border-b border-[#c69b3f]/30 pb-4">
                {text.typoTitle}
              </h3>
              <div className="space-y-8">
                <div className="bg-[#091428]/50 p-6 border border-[#0bc6e3]/20 rounded-sm">
                  <h4 className="font-beaufort text-4xl text-[#c69b3f] mb-2 uppercase">
                    Beaufort For LoL
                  </h4>
                  <p className="font-spiegel text-[#a0aab5] text-sm">
                    {text.typoDesc1}
                  </p>
                </div>
                <div className="bg-[#091428]/50 p-6 border border-[#c69b3f]/20 rounded-sm">
                  <h4 className="font-spiegel text-3xl text-[#f0e6d2] mb-2 tracking-wide">
                    Spiegel Regular
                  </h4>
                  <p className="font-spiegel text-[#a0aab5] text-sm">
                    {text.typoDesc2}
                  </p>
                </div>
              </div>
            </div>

            {/* Cores */}
            <div>
              <h3 className="font-beaufort text-3xl text-[#f0e6d2] mb-8 uppercase tracking-wider border-b border-[#c69b3f]/30 pb-4">
                {text.colorsTitle}
              </h3>
              <div className="space-y-6">
                {/* Blue Palette */}
                <div>
                  <h4 className="font-beaufort text-[#005a82] text-xl mb-3 uppercase tracking-wider">
                    Hextech Blue
                  </h4>
                  <div className="grid grid-cols-7 gap-2">
                    <div
                      className="h-12 bg-[#cdfafa] rounded-sm"
                      title="Blue 1"
                    ></div>
                    <div
                      className="h-12 bg-[#0ac8b9] rounded-sm"
                      title="Blue 2"
                    ></div>
                    <div
                      className="h-12 bg-[#0397ab] rounded-sm"
                      title="Blue 3"
                    ></div>
                    <div
                      className="h-12 bg-[#005a82] rounded-sm"
                      title="Blue 4"
                    ></div>
                    <div
                      className="h-12 bg-[#0a323c] rounded-sm"
                      title="Blue 5"
                    ></div>
                    <div
                      className="h-12 bg-[#091428] rounded-sm"
                      title="Blue 6"
                    ></div>
                    <div
                      className="h-12 bg-[#0a1428] rounded-sm"
                      title="Blue 7"
                    ></div>
                  </div>
                </div>

                {/* Gold Palette */}
                <div>
                  <h4 className="font-beaufort text-[#c89b3c] text-xl mb-3 uppercase tracking-wider">
                    Magic Gold
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    <div
                      className="h-12 bg-[#f0e6d2] rounded-sm"
                      title="Gold 1"
                    ></div>
                    <div
                      className="h-12 bg-[#c8aa6e] rounded-sm"
                      title="Gold 2"
                    ></div>
                    <div
                      className="h-12 bg-[#c89b3c] rounded-sm"
                      title="Gold 3"
                    ></div>
                    <div
                      className="h-12 bg-[#785a28] rounded-sm"
                      title="Gold 4"
                    ></div>
                    <div
                      className="h-12 bg-[#463714] rounded-sm"
                      title="Gold 5"
                    ></div>
                    <div
                      className="h-12 bg-[#32281e] rounded-sm"
                      title="Gold 6"
                    ></div>
                  </div>
                </div>

                {/* Gray/Black Palette */}
                <div>
                  <h4 className="font-beaufort text-[#a0aab5] text-xl mb-3 uppercase tracking-wider">
                    Neutral & Dark
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    <div
                      className="h-12 bg-[#a09b8c] rounded-sm"
                      title="Grey 1"
                    ></div>
                    <div
                      className="h-12 bg-[#5b5a56] rounded-sm"
                      title="Grey 1.5"
                    ></div>
                    <div
                      className="h-12 bg-[#3c3c41] rounded-sm"
                      title="Grey 2"
                    ></div>
                    <div
                      className="h-12 bg-[#1e2328] rounded-sm"
                      title="Grey 3"
                    ></div>
                    <div
                      className="h-12 bg-[#1e282d] rounded-sm"
                      title="Grey Cool"
                    ></div>
                    <div
                      className="h-12 bg-[#010a13] rounded-sm border border-gray-800"
                      title="Hextech Black"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Telas Mockups */}
        <section className="w-full bg-[#0a1428] py-24 border-y border-[#c69b3f]/30">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="font-beaufort text-4xl text-[#c69b3f] mb-12 uppercase tracking-wider">
              {text.screensTitle}
            </h2>
            <p className="text-[#a0aab5] max-w-3xl mx-auto text-lg font-light leading-relaxed mb-16">
              {text.screensDesc}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Tela 1 */}
              <div className="group relative overflow-hidden border border-[#c69b3f]/30 rounded-sm">
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#010a13] via-[#010a13]/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-beaufort text-2xl text-[#f0e6d2]">
                    {text.screen1Title}
                  </h3>
                  <p className="font-spiegel text-sm text-[#0bc6e3]">
                    {text.screen1Desc}
                  </p>
                </div>
                <img
                  loading="lazy"
                  src="/images/lol_screen_1.png"
                  alt="Home"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Tela 2 */}
              <div className="group relative overflow-hidden border border-[#c69b3f]/30 rounded-sm">
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#010a13] via-[#010a13]/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-beaufort text-2xl text-[#f0e6d2]">
                    {text.screen3Title}
                  </h3>
                  <p className="font-spiegel text-sm text-[#0bc6e3]">
                    {text.screen3Desc}
                  </p>
                </div>
                <img
                  loading="lazy"
                  src="/images/lol_screen_2 .png"
                  alt="Loja do Cliente"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Tela 3 */}
              <div className="relative">
                {/* Zed Galante Floating on Left Edge */}
                <div className="absolute -left-20 sm:-left-48 top-[75%] sm:top-[85%] -translate-y-1/2 flex z-30 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  <div className="w-[140px] h-[140px] sm:w-[220px] sm:h-[220px] mask-radial-fade mix-blend-screen drop-shadow-2xl">
                    <video
                      preload="metadata"
                      src="/images/zed_galante.mp4"
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover opacity-100 rounded-full"
                      title="Zed Galante"
                    />
                  </div>
                </div>

                <div className="group relative overflow-hidden border border-[#c69b3f]/30 rounded-sm h-full w-full">
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#010a13] via-[#010a13]/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-beaufort text-2xl text-[#f0e6d2]">
                      {text.screen2Title}
                    </h3>
                    <p className="font-spiegel text-sm text-[#0bc6e3]">
                      {text.screen2Desc}
                    </p>
                  </div>
                  <img
                    loading="lazy"
                    src="/images/lol_screen_3.png"
                    alt="Seleção de Modos"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                </div>
              </div>

              {/* Tela 4 */}
              <div className="group relative overflow-hidden border border-[#c69b3f]/30 rounded-sm">
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#010a13] via-[#010a13]/80 to-transparent z-10 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-beaufort text-2xl text-[#f0e6d2]">
                    {text.screen4Title}
                  </h3>
                  <p className="font-spiegel text-sm text-[#0bc6e3]">
                    {text.screen4Desc}
                  </p>
                </div>
                <img
                  loading="lazy"
                  src="/images/lol_screen_4.png"
                  alt="Perfil e Loja"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Prototype */}
        <section className="w-full bg-[#010a13] border-t border-[#c69b3f]/40 p-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-beaufort text-4xl text-[#0bc6e3] mb-4 uppercase tracking-wider drop-shadow-[0_0_15px_rgba(11,198,227,0.4)]">
              {text.ctaTitle}
            </h2>
            <p className="text-[#f0e6d2] mb-8 font-light text-lg">
              {text.ctaDesc}
            </p>

            <div className="bg-white p-4 inline-block rounded-sm mb-8">
              {/* Fixed QR Code size and styling */}
              <img
                loading="lazy"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.figma.com/design/DMkNbptqRDNjTvuKKuXqLf/Redesign-Client-League-of-Legends`}
                alt="QR Code"
                className="w-32 h-32"
              />
            </div>

            <br />
            <a
              href="https://www.figma.com/design/DMkNbptqRDNjTvuKKuXqLf/Redesign-Client-League-of-Legends"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-transparent border-2 border-[#0bc6e3] text-[#0bc6e3] font-beaufort text-xl uppercase tracking-widest hover:bg-[#0bc6e3] hover:text-[#010a13] transition-all duration-300 shadow-[0_0_20px_rgba(11,198,227,0.3)]"
            >
              {text.ctaButton}
            </a>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#0bc6e3]/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 h-64 w-64 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#c69b3f]/10 to-transparent pointer-events-none" />
        </section>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        
        @font-face {
          font-family: 'Beaufort for LOL';
          src: url('https://lolstatic-a.akamaihd.net/fonts/beaufortforlol/BeaufortforLOL-Heavy.ttf') format('truetype');
          font-weight: 800;
        }
        @font-face {
          font-family: 'Beaufort for LOL';
          src: url('https://lolstatic-a.akamaihd.net/fonts/beaufortforlol/BeaufortforLOL-Bold.ttf') format('truetype');
          font-weight: 700;
        }
        @font-face {
          font-family: 'Spiegel';
          src: url('https://lolstatic-a.akamaihd.net/fonts/spiegel/Spiegel-Regular.ttf') format('truetype');
          font-weight: 400;
        }
        
        .font-beaufort { font-family: 'Beaufort for LOL', 'Cinzel', serif; }
        .font-spiegel { font-family: 'Spiegel', 'Lato', sans-serif; }
        .clip-path-diagonal { clip-path: polygon(0 0, 0% 0, 100% 100%, 0 100%); }
        .group:hover .clip-path-full { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
        .mask-radial-fade { mask-image: radial-gradient(circle at center, black 0%, transparent 70%); -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 70%); }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.35; scale: 1.05; } }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}</style>
    </motion.div>
  );
}
