import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ParallaxImage } from "./parallax-image";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "../data/projects";
import { Respiracao, Rmp, Grounding } from "./aquora-exercises";
import { useLanguage } from "../contexts/language-context";
import { ASSETS } from "../data/assets";

interface AquoraProjectProps {
  project: Project;
  onClose: () => void;
}

export function AquoraProject({ project, onClose }: AquoraProjectProps) {
  const { language } = useLanguage();
  const [activeExercise, setActiveExercise] = useState<'resp' | 'rmp' | 'grounding' | null>(null);

  const loc = {
    pt: {
      title: "Projeto Aquora",
      subtitle: "App wellness",
      desc: "Um projeto de Design Digital focado em presença e equilíbrio interior, unindo a fluidez da água com a força do agora.",
      anxietyTitle: "Tempos de Ansiedade",
      anxietyP1: "O homem contemporâneo lida com as consequências de uma vida acelerada, contraditória e agitada. O enfraquecimento de todas as metanarrativas perpetua sensações de",
      anxietyStrong: "vazio existencial",
      anxietyP1_2: ", onde o hiperespaço supera a capacidade humana de se localizar e a hipervalorização da imagem fortalece estados melancólicos.",
      quote: `"O imenso poder do mercado na vida interior do homem moderno (...) que busca respostas não apenas econômicas mas metafísicas."`,
      quoteAuthor: "— Marshall Berman",
      anxietyP2: "O uso excessivo das",
      anxietyStrong2: "mídias sociais",
      anxietyP2_2: "também se mostra como fator agravante, potencializando insônia, inquietação e quadros clínicos como transtorno de ansiedade generalizada. Diante disso, a medicalização tornou-se uma saída crescente:",
      stat1: "caixas de calmantes vendidos diariamente no Brasil (Anvisa, 2022)",
      stat2: "aumento na venda de antidepressivos (Anvisa, 2022)",
      targetTitle: "Para quem é o Aquora?",
      target1: "Jovens Adultos (25-35 anos)",
      target2: "Pessoas em Terapia",
      target3: "Estudantes sob alta pressão",
      targetDesc: "Perfil que busca um refúgio digital e estruturação de hábitos saudáveis perante rotinas exigentes.",
      identityTitle: "Identidade Visual e Fluidez",
      paletteTitle: "Paleta de Cores",
      nunitoDesc: "Usada em títulos e chamadas, transmitindo proximidade e suavidade.",
      sansDesc: "Para corpos de texto longos. Alta legibilidade em telas pequenas de forma clara e amigável.",
      appsTitle: "Aplicações e Fundos",
      mindfulnessTitle: "Práticas de Mindfulness",
      mindfulnessDesc: "Estes são 3 exercícios disponíveis no modo SOS do aplicativo, desenvolvidos para momentos de crise. Práticas rápidas que ajudam a restabelecer o equilíbrio e aliviar sintomas de ansiedade instantaneamente.",
      sos: "SOS",
      ex1Title: "1 - Respiração em 4 tempos",
      ex1Desc: "Técnicas 4-4-4 e 4-7-8 para acentuar o foco.",
      openEx: "Abrir Exercício",
      ex2Title: "2 - RMP",
      ex2Desc: "Relaxamento Muscular Progressivo.",
      ex3Title: "3 - Grounding",
      ex3Desc: "Sinta o momento presente.",
      mvpTitle: "Nosso APP e MVP",
      mvpDesc: "Telas da nossa aplicação, projetadas com base no Design System para garantir fluidez, facilidade de uso e uma experiência focada na saúde mental, sem táticas de retenção abusiva.",
      homeLogin: "Home e Login",
      homeQuick: "Home & Acesso Rápido",
      sleepConfig: "Configuração do Sono",
      routineMon: "Monitoramento de Rotina",
      emergency: "Contatos de Emergência",
      dsAlt: "Design System Aquora",
      mockupTitle: "Mockups e Aplicações",
      mockupDesc: "Aplicações práticas da nova identidade visual em produtos físicos e espaços corporativos.",
      variousApps: "Aplicações Diversas",
      supportMat: "Material de Apoio e Produtos",
      officeRec: "Recepção do Escritório",
      interactiveTitle: "Projeto Interativo Aquora",
      prototypeTitle: "Protótipo e Frames do Processo",
      footerTitle: "Projeto de Conclusão de Curso",
      footerUni: "Universidade Anhembi Morumbi (2025)",
      footerGrade: "Aprovado com Nota Máxima!",
      footerGradeDesc: "Apresentação, Projeto e Relatório avaliados com excelência pela banca.",
      members: "Integrantes: Vanessa Piaui, Maria Luiza, André Yuzo, Beatriz Wapf, Adria Manoela, Pedro Oliveira, e Mateus Pimentel."
    },
    en: {
      title: "Aquora Project",
      subtitle: "Wellness App",
      desc: "A Digital Design project focused on presence and inner balance, uniting the fluidity of water with the strength of now.",
      anxietyTitle: "Times of Anxiety",
      anxietyP1: "Contemporary man deals with the consequences of an accelerated, contradictory, and agitated life. The weakening of all metanarratives perpetuates feelings of",
      anxietyStrong: "existential emptiness",
      anxietyP1_2: ", where hyperspace exceeds the human capacity to locate oneself, and the hypervaluation of image strengthens melancholic states.",
      quote: `"The immense power of the market in the inner life of modern man (...) who seeks not only economic but metaphysical answers."`,
      quoteAuthor: "— Marshall Berman",
      anxietyP2: "The excessive use of",
      anxietyStrong2: "social media",
      anxietyP2_2: "also proves to be an aggravating factor, enhancing insomnia, restlessness, and clinical conditions such as generalized anxiety disorder. Given this, medicalization has become a growing way out:",
      stat1: "boxes of tranquilizers sold daily in Brazil (Anvisa, 2022)",
      stat2: "increase in antidepressant sales (Anvisa, 2022)",
      targetTitle: "Who is Aquora for?",
      target1: "Young Adults (25-35 years)",
      target2: "People in Therapy",
      target3: "Students under high pressure",
      targetDesc: "Profile seeking a digital refuge and structured healthy habits against demanding routines.",
      identityTitle: "Visual Identity and Fluidity",
      paletteTitle: "Color Palette",
      nunitoDesc: "Used in titles and headings, conveying closeness and softness.",
      sansDesc: "For long body texts. High readability on small screens in a clear and friendly way.",
      appsTitle: "Applications and Backgrounds",
      mindfulnessTitle: "Mindfulness Practices",
      mindfulnessDesc: "These are 3 exercises available in the app's SOS mode, developed for moments of crisis. Quick practices that help restore balance and relieve anxiety symptoms instantly.",
      sos: "SOS",
      ex1Title: "1 - 4-step Breathing",
      ex1Desc: "4-4-4 and 4-7-8 techniques to enhance focus.",
      openEx: "Open Exercise",
      ex2Title: "2 - PMR",
      ex2Desc: "Progressive Muscle Relaxation.",
      ex3Title: "3 - Grounding",
      ex3Desc: "Feel the present moment.",
      mvpTitle: "Our APP and MVP",
      mvpDesc: "Screens of our application, designed based on the Design System to ensure fluidity, ease of use, and an experience focused on mental health, without abusive retention tactics.",
      homeLogin: "Home and Login",
      homeQuick: "Home & Quick Access",
      sleepConfig: "Sleep Configuration",
      routineMon: "Routine Monitoring",
      emergency: "Emergency Contacts",
      dsAlt: "Aquora Design System",
      mockupTitle: "Mockups and Applications",
      mockupDesc: "Practical applications of the new visual identity in physical products and corporate spaces.",
      variousApps: "Various Applications",
      supportMat: "Support Material and Products",
      officeRec: "Office Reception",
      interactiveTitle: "Aquora Interactive Project",
      prototypeTitle: "Prototype and Process Frames",
      footerTitle: "Final Graduation Project",
      footerUni: "Anhembi Morumbi University (2025)",
      footerGrade: "Approved with Maximum Grade!",
      footerGradeDesc: "Presentation, Project, and Report evaluated with excellence by the board.",
      members: "Members: Vanessa Piaui, Maria Luiza, André Yuzo, Beatriz Wapf, Adria Manoela, Pedro Oliveira, and Mateus Pimentel."
    }
  };
  const tLoc = loc[language];

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { 
      if (e.key === "Escape") {
        if (activeExercise) {
          setActiveExercise(null);
        } else {
          onClose(); 
        }
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, activeExercise]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] overflow-y-auto bg-[#f0f4f8] text-[#2d4059] font-['Open_Sans']"
    >
      {/* Background Spheroid */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#a2d2ff] via-[#bde0fe] to-[#ffafcc] opacity-[0.85] blur-[80px] rounded-full animate-[spin_20s_linear_infinite] pointer-events-none mix-blend-multiply" />
      
      {/* Pearlescent Overlay */}
      <div className="fixed inset-0 bg-white/40 backdrop-blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-6 bg-white/20 backdrop-blur-md border-b border-white/40">
        <button className="font-['Nunito'] font-bold text-lg text-[#2d4059]" onClick={onClose}>
          Shoosh.inc
        </button>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/30 border border-white/50 text-[#2d4059] hover:scale-110 hover:bg-gradient-to-r hover:from-teal-400 hover:to-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col gap-24">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-10 relative">
          <div className="relative flex justify-center items-center h-64 w-full">
            {/* Logo Blur Blob */}
            <motion.div 
              animate={{ 
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "70% 30% 50% 50% / 30% 60% 40% 70%", "40% 60% 70% 30% / 40% 50% 60% 50%"] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
            />
            {/* Spinning Stars */}
            <div className="absolute w-[350px] h-[350px] animate-[spin_30s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-teal-400 rounded-full blur-[2px]" />
              <div className="absolute bottom-4 right-10 w-6 h-6 bg-cyan-400 rounded-full blur-[3px]" />
              <div className="absolute top-1/4 left-4 w-5 h-5 bg-purple-300 rounded-sm blur-[2px] rotate-45" />
            </div>
            
            <ImageWithFallback src={ASSETS.aquoraLogo} alt="Aquora Logo" loading="lazy" decoding="async" className="relative z-10 w-48 h-48 object-contain drop-shadow-xl p-2" />
          </div>

          <motion.div 
            className="relative z-20 mt-12 bg-white/10 backdrop-blur-md px-10 py-6 rounded-[2rem] border border-white/20 shadow-2xl"
          >
            <h1 className="font-['Nunito'] text-5xl md:text-7xl font-bold whitespace-nowrap bg-gradient-to-r from-teal-600 via-cyan-500 to-purple-500 bg-[length:200%_auto] animate-[gradient_15s_ease-in-out_infinite] bg-clip-text text-transparent pb-2">
              {tLoc.title}
            </h1>
            <h2 className="font-['Nunito'] text-2xl md:text-3xl font-semibold text-[#5f7a94] mt-2">
              {tLoc.subtitle}
            </h2>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-[#2d4059] font-light">
              {tLoc.desc}
            </p>
          </motion.div>
        </section>

        {/* The Context (Crisis) */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-6 border-b border-teal-200/50 pb-4">
            {tLoc.anxietyTitle}
          </h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <p className="text-[#2d4059] text-lg font-light leading-relaxed">
                {tLoc.anxietyP1} <strong>{tLoc.anxietyStrong}</strong>{tLoc.anxietyP1_2}
              </p>
              <div className="bg-teal-900/5 p-6 rounded-2xl border border-teal-900/10 relative overflow-hidden group hover:bg-teal-900/10 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                <blockquote className="italic text-[#2d4059]/80 pl-4">
                  {tLoc.quote}
                </blockquote>
                <p className="text-sm font-bold text-teal-800 mt-3 pl-4">{tLoc.quoteAuthor}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <p className="text-[#2d4059] text-lg font-light leading-relaxed">
                {tLoc.anxietyP2} <strong>{tLoc.anxietyStrong2}</strong> {tLoc.anxietyP2_2}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm hover:scale-105 transition-transform">
                  <h4 className="font-bold text-2xl text-teal-600">123 mil</h4>
                  <p className="text-xs text-[#2d4059]/80 mt-1 leading-tight">{tLoc.stat1}</p>
                </div>
                <div className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm hover:scale-105 transition-transform">
                  <h4 className="font-bold text-2xl text-[#2b4961]">34%</h4>
                  <p className="text-xs text-[#2d4059]/80 mt-1 leading-tight">{tLoc.stat2}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-8 border-b border-teal-200/50 pb-4">
            {tLoc.targetTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[tLoc.target1, tLoc.target2, tLoc.target3].map((audience, i) => (
              <div key={i} className="bg-white/40 p-8 rounded-3xl border border-white/60 hover:scale-105 hover:bg-white/60 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-lg text-teal-800">{audience}</h4>
                <p className="text-sm mt-3 opacity-80">{tLoc.targetDesc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Identity and Design System (Bento Grid) */}
        <section className="flex flex-col gap-8">
          <h3 className="font-['Nunito'] text-4xl font-bold text-center text-teal-800 drop-shadow-sm">
            {tLoc.identityTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[800px]">
            {/* Logo Section */}
            <div className="md:col-span-2 md:row-span-2 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 p-8 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10" />
              <ImageWithFallback src={ASSETS.aquoraLogo} alt="Aquora Logo" loading="lazy" decoding="async" className="relative z-10 w-full h-full object-contain p-12 drop-shadow-2xl" />
            </div>

            {/* Colors Section */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 p-8 flex flex-col items-center justify-center group overflow-hidden">
               <h4 className="font-bold text-lg text-teal-800 mb-6 z-10 relative">{tLoc.paletteTitle}</h4>
               
               <div className="w-full flex flex-1 h-full min-h-[250px] rounded-2xl overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                 {[
                   { hex: '#006595', cmyk: '100, 32, 0, 41' },
                   { hex: '#20B2FF', cmyk: '87, 30, 0, 0' },
                   { hex: '#00D3B5', cmyk: '100, 0, 14, 17' },
                   { hex: '#9AA0FF', cmyk: '39, 37, 0, 0' },
                   { hex: '#E585FF', cmyk: '10, 47, 0, 0' },
                   { hex: '#A700C2', cmyk: '13, 100, 0, 23' },
                   { hex: '#FF6D20', cmyk: '0, 57, 87, 0' },
                   { hex: '#42FF20', cmyk: '74, 0, 87, 0' }
                 ].map((c, i) => (
                   <div 
                     key={i} 
                     className="flex-1 h-full hover:flex-[2] transition-all duration-300 relative group/color flex items-end justify-center pb-4 cursor-pointer"
                     style={{ backgroundColor: c.hex }}
                   >
                     <div className="opacity-0 group-hover/color:opacity-100 transition-opacity absolute bottom-4 text-center px-2 flex flex-col items-center">
                       <span className="text-white text-xs font-bold drop-shadow-md">{c.hex}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Typography Section */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 p-10 flex flex-col justify-center overflow-hidden relative group">
               <div className="absolute -top-4 -right-4 opacity-[0.03] font-['Nunito'] font-black text-[12rem] pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">Aa</div>
               <h4 className="font-['Nunito'] font-black text-6xl text-teal-800 tracking-tight mb-8">Aa</h4>
               <div className="space-y-6 relative z-10">
                 <div>
                   <p className="font-['Nunito'] font-bold text-2xl text-teal-700">Nunito</p>
                   <p className="font-['Nunito'] text-teal-700/60 text-sm mt-1 leading-relaxed">{tLoc.nunitoDesc}</p>
                 </div>
                 <div className="h-px w-full bg-teal-800/10" />
                 <div>
                   <p className="font-['Open_Sans'] font-semibold text-xl text-[#3b5973]">Open Sans</p>
                   <p className="font-['Open_Sans'] text-[#5f7a94] text-sm mt-1 leading-relaxed">{tLoc.sansDesc}</p>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* Aplicações e Imagens */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mt-12 mb-12">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-8 border-b border-teal-200/50 pb-4">
            {tLoc.appsTitle}
          </h3>
          <div className="relative w-full overflow-hidden bg-gray-50/50 rounded-2xl p-6 md:p-12 flex justify-center items-center h-auto min-h-[400px]">
            {/* Background overlapping circles (to mimic the image's background shapes) */}
            <div className="absolute top-1/2 left-[20%] w-48 h-48 bg-[#9aa0ff]/40 rounded-full blur-xl -translate-y-1/2" />
            <div className="absolute top-[60%] left-1/2 w-56 h-56 bg-[#ffb78c]/40 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-[40%] right-[20%] w-48 h-48 bg-[#e585ff]/40 rounded-full blur-xl -translate-y-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-4 w-full max-w-5xl justify-center items-stretch h-full">
              {/* Left Grid (4x2 squares) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                {/* Row 1 */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[#12c2e9] to-[#c471ed]" style={{ background: 'linear-gradient(135deg, #1bd3cf 0%, #17cbb8 100%)' }} />
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[#6a11cb] to-[#2575fc]" style={{ background: 'linear-gradient(135deg, #5956d7 0%, #7d3ac1 100%)' }} />
                <div className="aspect-square rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #df649f 0%, #eb8485 100%)' }}>
                   <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full opacity-60" />
                   <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full opacity-40" />
                   <div className="absolute bottom-0 right-0 w-[120%] h-[60%] bg-white/10 rounded-t-full rounded-r-none translate-x-[20%] translate-y-[20%] blur-[1px]" />
                </div>
                <div className="aspect-square rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #11cd58 0%, #0abf45 100%)' }}>
                   <div className="absolute top-6 left-6 w-1 h-1 bg-white rounded-full opacity-60" />
                   <div className="absolute bottom-0 right-0 w-[150%] h-[70%] bg-white/15 rounded-tl-[100%] translate-x-[20%] translate-y-[30%] blur-[2px]" />
                </div>

                {/* Row 2 */}
                <div className="aspect-square rounded-xl relative overflow-hidden flex items-end" style={{ background: 'linear-gradient(180deg, #d3957f 0%, #7db18c 100%)' }}>
                  <svg className="absolute w-full h-[150%] inset-0 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,40 Q25,60 50,40 T100,50 L100,100 L0,100 Z" fill="#fff" />
                    <path d="M0,60 Q30,80 60,50 T100,70 L100,100 L0,100 Z" fill="#fff" opacity="0.8" />
                  </svg>
                </div>
                <div className="aspect-square rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #4dc4d4 0%, #209995 100%)' }}>
                  <svg className="absolute w-full h-full inset-0 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,30 Q30,50 60,30 T100,40 L100,100 L0,100 Z" fill="#fff" />
                    <path d="M0,60 Q40,80 70,50 T100,70 L100,100 L0,100 Z" fill="#135a58" opacity="0.6" />
                  </svg>
                </div>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[#c389f9] to-[#b375f4] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ce8ffb 0%, #aa71f8 100%)' }}>
                   <div className="absolute w-[200%] h-full bg-white/10 opacity-50 -rotate-[20deg] scale-150 blur-sm translate-y-1/2" />
                </div>
                <div className="aspect-square rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #155f86 0%, #2b4961 100%)' }}>
                   <div className="absolute -bottom-[20%] -right-[20%] w-[120%] h-[120%] border-[20px] border-white/5 rounded-full" />
                   <div className="absolute -bottom-[50%] -right-[50%] w-[150%] h-[150%] border-[30px] border-white/5 rounded-full" />
                </div>
              </div>

              {/* Right Vertical Cards (2 columns) */}
              <div className="grid grid-cols-2 gap-4 flex-[0.5] min-w-[150px] md:min-w-[200px]">
                {/* Light Vertical */}
                <div className="h-full min-h-[250px] rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #d3eaf9 0%, #6ab2f2 100%)' }}>
                   <svg className="absolute top-0 w-full h-1/2 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,20 Q25,40 50,20 T100,30 L100,0 L0,0 Z" fill="#fff" />
                      <path d="M0,35 Q30,50 60,35 T100,45 L100,0 L0,0 Z" fill="#fff" opacity="0.6" />
                   </svg>
                   <svg className="absolute bottom-0 w-full h-1/2 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,100 L100,100 L100,60 Q75,40 50,60 T0,70 Z" fill="#46d467" />
                      <path d="M-20,100 L120,100 L120,75 Q50,45 10,75 Z" fill="#28ad45" />
                   </svg>
                </div>
                {/* Dark Vertical */}
                <div className="h-full min-h-[250px] rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #095079 0%, #10314a 100%)' }}>
                   <div className="absolute top-6 left-4 w-1 h-1 bg-white rounded-full opacity-80" />
                   <div className="absolute top-12 left-10 w-1 h-1 bg-white rounded-full opacity-60" />
                   <div className="absolute top-16 left-3 w-1 h-1 bg-white rounded-full opacity-50" />
                   <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                   <div className="absolute top-20 right-4 w-1 h-1 bg-white rounded-full opacity-70" />
                   
                   {/* Crescent Moon */}
                   <div className="absolute top-12 right-6 w-10 h-10 rounded-full shadow-[inset_-8px_-4px_0_0_#91bde4] bg-transparent transform -rotate-[20deg]" />
                   
                   <svg className="absolute bottom-0 w-full h-1/3 opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,100 L100,100 L100,50 Q75,30 50,50 T0,40 Z" fill="#051f30" />
                   </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mindfulness Exercises */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-4 border-b border-teal-200/50 pb-4">
            {tLoc.mindfulnessTitle}
          </h3>
          <p className="text-teal-800/80 text-lg mb-8 max-w-3xl">
            {tLoc.mindfulnessDesc.split('SOS')[0]}<strong className="font-bold text-teal-900">{tLoc.sos}</strong>{tLoc.mindfulnessDesc.split('SOS')[1]}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              onClick={() => setActiveExercise('resp')}
              className="group relative bg-[#0a4874] p-8 rounded-3xl overflow-hidden h-[180px] hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-xl border border-white/10"
            >
               <h4 className="font-bold text-xl text-white mb-2">{tLoc.ex1Title}</h4>
               <p className="text-white/70 text-sm mb-4 transition-all duration-500 group-hover:text-white/95 group-hover:animate-[pulse_3s_ease-in-out_infinite]">{tLoc.ex1Desc}</p>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-md transition-opacity whitespace-nowrap text-white text-xs font-bold animate-pulse group-hover:bg-white/20">
                 {tLoc.openEx}
               </div>
            </div>
            
            <div 
              onClick={() => setActiveExercise('rmp')}
              className="group relative bg-[#1c5541] p-8 rounded-3xl overflow-hidden h-[180px] hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-xl border border-white/10"
            >
               <h4 className="font-bold text-xl text-white mb-2">{tLoc.ex2Title}</h4>
               <p className="text-white/70 text-sm mb-4 transition-all duration-500 group-hover:text-white/95 group-hover:animate-[pulse_3s_ease-in-out_infinite]">{tLoc.ex2Desc}</p>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-md transition-opacity whitespace-nowrap text-white text-xs font-bold animate-pulse group-hover:bg-white/20">
                 {tLoc.openEx}
               </div>
            </div>

            <div 
              onClick={() => setActiveExercise('grounding')}
              className="group relative bg-[#2a1b4d] p-8 rounded-3xl overflow-hidden h-[180px] hover:-translate-y-2 transition-all duration-500 cursor-pointer shadow-xl border border-white/10"
            >
               <h4 className="font-bold text-xl text-white mb-2">{tLoc.ex3Title}</h4>
               <p className="text-white/70 text-sm mb-4 transition-all duration-500 group-hover:text-white/95 group-hover:animate-[pulse_3s_ease-in-out_infinite]">{tLoc.ex3Desc}</p>
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-md transition-opacity whitespace-nowrap text-white text-xs font-bold animate-pulse group-hover:bg-white/20">
                 {tLoc.openEx}
               </div>
            </div>
          </div>
        </section>

        {/* Nosso APP / MVP */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mt-12 mb-12">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-6 border-b border-teal-200/50 pb-4">
            {tLoc.mvpTitle}
          </h3>
          <p className="text-teal-800/80 text-lg mb-8 max-w-3xl">
            {tLoc.mvpDesc}
          </p>
          
          {/* Screens / MVP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative items-start">
            
            {/* Screen 1 */}
            <div className="flex flex-col gap-2">
              <div className="group relative w-full aspect-[9/16] bg-gradient-to-b from-gray-100 to-gray-200/50 rounded-[1.5rem] border border-white mx-auto shadow-md overflow-hidden flex items-center justify-center p-4">
                <ParallaxImage src={ASSETS.aquoraHomeLogin} alt="image" className="w-full h-full object-contain rounded-md transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-center font-bold text-teal-800 text-sm mt-2">{tLoc.homeQuick}</p>
            </div>

            {/* Screen 2 */}
            <div className="flex flex-col gap-2 mt-6 md:mt-0">
              <div className="group relative w-full aspect-[9/16] bg-gradient-to-b from-gray-100 to-gray-200/50 rounded-[1.5rem] border border-white mx-auto shadow-md overflow-hidden flex items-center justify-center p-4">
                <ParallaxImage src={ASSETS.aquoraSleepConfig} alt="image" className="w-full h-full object-contain rounded-md transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-center font-bold text-teal-800 text-sm mt-2">{tLoc.sleepConfig}</p>
            </div>

            {/* Screen 3 */}
            <div className="flex flex-col gap-2">
              <div className="group relative w-full aspect-[9/16] bg-gradient-to-b from-gray-100 to-gray-200/50 rounded-[1.5rem] border border-white mx-auto shadow-md overflow-hidden flex items-center justify-center p-4">
                <ParallaxImage src={ASSETS.aquoraRoutineMon} alt="image" className="w-full h-full object-contain rounded-md transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-center font-bold text-teal-800 text-sm mt-2">{tLoc.routineMon}</p>
            </div>

            {/* Screen 4 */}
            <div className="flex flex-col gap-2 mt-6 md:mt-0">
              <div className="group relative w-full aspect-[9/16] bg-gradient-to-b from-gray-100 to-gray-200/50 rounded-[1.5rem] border border-white mx-auto shadow-md overflow-hidden flex items-center justify-center p-4">
                <ParallaxImage src={ASSETS.aquoraEmergency} alt="image" className="w-full h-full object-contain rounded-md transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-center font-bold text-teal-800 text-sm mt-2">{tLoc.emergency}</p>
            </div>

          </div>

          {/* Large Wide Space */}
          <div className="grid grid-cols-1 gap-6 relative mt-12">
            <div className="group relative w-full h-auto bg-gradient-to-b from-gray-100 to-gray-200/50 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-sm overflow-hidden flex items-center justify-center">
              <img 
                src={ASSETS.aquoraDesignSystem} 
                alt={tLoc.dsAlt} 
                loading="lazy" 
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>
        </section>

        {/* Mockups de Marca */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mt-12 mb-12">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-8 border-b border-teal-200/50 pb-4">
            {tLoc.mockupTitle}
          </h3>
          <p className="text-teal-800/80 text-lg mb-8 max-w-3xl">
            {tLoc.mockupDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="group overflow-hidden rounded-3xl relative h-[400px] shadow-sm hover:shadow-xl transition-all duration-500">
                <ParallaxImage src={ASSETS.aquoraVariousApps} alt="image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <span className="text-white font-bold text-lg">{tLoc.variousApps}</span>
                </div>
             </div>
             
             <div className="group overflow-hidden rounded-3xl relative h-[400px] shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                <ImageWithFallback src={ASSETS.aquoraSupportMat} alt={tLoc.supportMat} loading="lazy" decoding="async" className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                   <span className="text-white font-bold text-lg">{tLoc.supportMat}</span>
                </div>
             </div>
             
             <div className="md:col-span-2 group overflow-hidden rounded-3xl relative h-[500px] shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50">
                <ParallaxImage src={ASSETS.aquoraOfficeRec} alt="image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                   <span className="text-white font-bold text-xl">{tLoc.officeRec}</span>
                </div>
             </div>
          </div>
        </section>

        {/* Figma Interactive Prototype */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mt-12 flex flex-col items-center">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-8 border-b border-teal-200/50 pb-4 w-full text-left">
            {tLoc.interactiveTitle}
          </h3>
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white">
            <iframe 
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              width="100%" 
              height="800" 
              src="https://embed.figma.com/proto/RuZJ4nGpx4dCZhUilLsiUC/App---MPV--Aquora-?node-id=18074-2780&p=f&viewport=264%2C54%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=18074%3A2780&show-proto-sidebar=1&page-id=18073%3A2776&embed-host=share" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Figma Preview */}
        <section className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mt-12 mb-12 flex flex-col items-center">
          <h3 className="font-['Nunito'] text-3xl font-bold text-teal-700 mb-8 border-b border-teal-200/50 pb-4 w-full text-left">
            {tLoc.prototypeTitle}
          </h3>
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white">
            <iframe 
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              width="100%" 
              height="600" 
              src="https://embed.figma.com/design/RuZJ4nGpx4dCZhUilLsiUC/App---MPV--Aquora-?node-id=14001-34230&embed-host=share" 
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Footer / Credits */}
        <section className="bg-gradient-to-br from-teal-800 to-blue-900 text-white p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <h3 className="font-['Nunito'] text-2xl font-bold mb-4 relative z-10">{tLoc.footerTitle}</h3>
          <p className="text-teal-200 mb-8 relative z-10">{tLoc.footerUni}</p>
          <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 inline-block mb-8">
            <p className="font-bold text-lg text-yellow-300">{tLoc.footerGrade}</p>
            <p className="text-sm mt-2 opacity-80">{tLoc.footerGradeDesc}</p>
          </div>
          <p className="text-sm opacity-60 relative z-10">{tLoc.members}</p>
        </section>

      </div>

      <AnimatePresence>
        {activeExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="relative w-full max-w-[400px]">
              <button 
                onClick={() => setActiveExercise(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              {activeExercise === 'resp' && <Respiracao />}
              {activeExercise === 'rmp' && <Rmp />}
              {activeExercise === 'grounding' && <Grounding />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
