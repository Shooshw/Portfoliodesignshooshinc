import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Play, Square } from 'lucide-react';
import { playChime, BreathPhase } from '../audio';

export function Respiracao() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phaseText, setPhaseText] = useState("Técnica\nrespiração quadrada (4-4-4)");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(soundEnabled);
  
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);
  
  useEffect(() => {
    if (!isBreathing) {
      setPhaseText("Técnica\nrespiração quadrada (4-4-4)");
      return;
    }
    
    const phases = ["Inspire...", "Segure...", "Expire...", "Segure..."];
    const phaseTypes: BreathPhase[] = ['inhale', 'hold1', 'exhale', 'hold2'];
    let step = 0;

    setPhaseText(phases[step]);

    if (soundEnabledRef.current) {
      playChime(phaseTypes[step]);
    }

    const interval = setInterval(() => {
      step = (step + 1) % 4;
      setPhaseText(phases[step]);
      
      if (soundEnabledRef.current) {
        playChime(phaseTypes[step]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <div className="bg-gradient-to-b from-[#0a4874] to-[#121c22] relative w-full h-[600px] mx-auto overflow-hidden font-sans max-w-[400px] shadow-2xl flex flex-col items-center rounded-3xl">
      <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-30 pointer-events-none">
        <video autoPlay className="absolute h-full w-full object-cover" controlsList="nodownload" loop playsInline muted>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-waves-hitting-the-shore-4130-large.mp4" />
        </video>
      </div>

      <div className="w-full flex justify-between px-6 pt-6 z-10">
         <h3 className="text-white font-bold opacity-80">Respiração</h3>
         <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-white/60 hover:text-white">
           {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
         </button>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
        <div className="relative flex items-center justify-center w-64 h-64 mb-16 mt-4">
          <div className="absolute w-[240px] h-[240px] rounded-full bg-white/5 border border-white/10"></div>
          
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full bg-[#187eb4]/60 mix-blend-screen"
            animate={isBreathing ? "breathing" : "idle"}
            variants={{
              idle: { scale: 1, opacity: 0.8 },
              breathing: {
                scale: [1, 1.4, 1.4, 1, 1],
                opacity: [0.6, 0.9, 0.9, 0.6, 0.6],
                transition: {
                  duration: 16, 
                  repeat: Infinity,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: "linear"
                }
              }
            }}
          />
          
          <div className="absolute w-[180px] h-[180px] rounded-full bg-[#1c8bc5] shadow-inner flex items-center justify-center">
             {isBreathing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full rounded-full border-4 border-white/20"
                />
             )}
          </div>
        </div>

        <div className="h-24 flex items-center justify-center px-6">
          <p className="text-white text-center font-medium leading-snug whitespace-pre-line text-[15px] transition-all duration-500">
            {phaseText}
          </p>
        </div>

        <button 
          onClick={() => setIsBreathing(!isBreathing)}
          className="w-[85%] max-w-[320px] bg-[#00d09c] hover:bg-[#00e6ac] text-[#0a2e23] text-[15px] font-semibold py-[14px] rounded-full transition-all active:scale-95 shadow-[0_4px_14px_rgba(0,208,156,0.3)] mt-auto mb-10"
        >
          {isBreathing ? "Parar" : "Começar"}
        </button>
      </div>
    </div>
  );
}

export function Rmp() {
  const [isActive, setIsActive] = useState(false);
  const [phaseText, setPhaseText] = useState("Desenvolvida por Edmund Jacobson, a técnica induz o relaxamento mental por meio da percepção e relaxamento muscular.");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(soundEnabled);
  
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);
  
  useEffect(() => {
    if (!isActive) {
      setPhaseText("Desenvolvida por Edmund Jacobson, a técnica induz o relaxamento mental\npor meio da percepção e\nrelaxamento muscular.");
      return;
    }
    
    const phases = [
      "Contraia os músculos do rosto...\nSinta a tensão.", 
      "Relaxe completamente...\nSolte todo o peso."
    ];
    const phaseTypes: BreathPhase[] = ['tense', 'relax'];
    let step = 0;

    setPhaseText(phases[step]);

    if (soundEnabledRef.current) {
      playChime(phaseTypes[step]);
    }

    let timeoutId: any;
    const runCycle = (currentStep: number) => {
      setPhaseText(phases[currentStep]);
      if (soundEnabledRef.current) {
        playChime(phaseTypes[currentStep]);
      }
      
      const duration = currentStep === 0 ? 4000 : 5000;
      timeoutId = setTimeout(() => {
        runCycle((currentStep + 1) % 2);
      }, duration);
    };

    runCycle(0);

    return () => clearTimeout(timeoutId);
  }, [isActive]);

  return (
    <div className="bg-gradient-to-b from-[#1c5541] to-[#25463f] relative w-full h-[600px] mx-auto overflow-hidden font-sans max-w-[400px] shadow-2xl flex flex-col items-center rounded-3xl">
      <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-60 pointer-events-none">
        <video autoPlay className="absolute h-full w-full object-cover" controlsList="nodownload" loop playsInline muted>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-waves-hitting-the-shore-4130-large.mp4" />
        </video>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[45%] pointer-events-none z-0">
        <svg viewBox="0 0 375 300" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M-50,300 L-50,200 Q80,50 200,220 T400,100 L400,300 Z" fill="rgba(255,255,255,0.06)"/>
          <path d="M120,300 L120,250 Q250,80 400,200 L400,300 Z" fill="rgba(255,255,255,0.08)"/>
        </svg>
      </div>

      <div className="w-full flex justify-between px-6 pt-6 z-10">
         <h3 className="text-white font-bold opacity-80">RMP</h3>
      </div>

      <div className="flex-1 w-full flex flex-col items-center relative z-10 pt-[10%]">
        <div className="flex-1 flex flex-col items-center justify-center px-8 w-full">
          {!isActive ? (
             <p className="text-[#e2e8e5] text-center font-medium leading-[1.6] text-[17px] tracking-wide max-w-[280px]">
               {phaseText}
             </p>
          ) : (
            <div className="relative flex flex-col items-center justify-center w-full h-64 mb-8 mt-4">
              <motion.div
                className="absolute w-[160px] h-[160px] rounded-full bg-[#00d09c] mix-blend-screen"
                animate={phaseText.includes("Contraia") ? "tense" : "relax"}
                variants={{
                  relax: { 
                    scale: 1.5, 
                    opacity: 0.2,
                    filter: "blur(20px)",
                    transition: { duration: 5, ease: "easeOut" }
                  },
                  tense: {
                    scale: 0.8,
                    opacity: 0.8,
                    filter: "blur(5px)",
                    transition: { duration: 4, ease: "easeInOut" }
                  }
                }}
              />
              <p className="text-white text-center font-semibold leading-snug whitespace-pre-line text-[18px] relative z-10 drop-shadow-md">
                {phaseText}
              </p>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col items-center justify-end pb-12 z-20">
          <div className="flex items-center justify-center gap-[60px] mb-8">
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)} 
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              {soundEnabled ? <Volume2 size={32} strokeWidth={1.5} /> : <VolumeX size={32} strokeWidth={1.5} />}
            </button>
            
            <button 
              onClick={() => setIsActive(true)} 
              className={`transition-colors p-2 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              <Play size={32} strokeWidth={1.5} fill={isActive ? "currentColor" : "none"} className={!isActive ? "fill-white/60" : ""} />
            </button>
            
            <button 
              onClick={() => setIsActive(false)} 
              className={`transition-colors p-2 ${!isActive ? 'text-white/60' : 'text-white/60 hover:text-white'}`}
            >
              <Square size={26} strokeWidth={2} fill="currentColor" rx={4} />
            </button>
          </div>

          {!isActive ? (
            <button 
              onClick={() => setIsActive(true)}
              className="w-[85%] max-w-[320px] bg-[#00d09c] hover:bg-[#00e6ac] text-[#0a2e23] text-[16px] font-semibold py-[16px] rounded-full transition-all active:scale-95 shadow-[0_4px_14px_rgba(0,208,156,0.3)]"
            >
              Começar
            </button>
          ) : (
            <div className="h-[56px] w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Grounding() {
  const [isActive, setIsActive] = useState(false);
  const [phaseText, setPhaseText] = useState("Conecte-se com o presente. Ative o som para frequências de base.");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(soundEnabled);
  
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);
  
  useEffect(() => {
    if (!isActive) {
      setPhaseText("Conecte-se com o presente. Ative o som para frequências de base.");
      return;
    }
    
    setPhaseText("Sinta o seu corpo e o momento presente...");

    if (soundEnabledRef.current) {
      playChime('grounding');
    }

    const interval = setInterval(() => {
      if (soundEnabledRef.current) {
        playChime('grounding');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-gradient-to-b from-[#2a1b4d] to-[#120a22] relative w-full h-[600px] mx-auto overflow-hidden font-sans max-w-[400px] shadow-2xl flex flex-col items-center rounded-3xl">
      <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-30 pointer-events-none">
        <video autoPlay className="absolute h-full w-full object-cover" controlsList="nodownload" loop playsInline muted>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-waves-hitting-the-shore-4130-large.mp4" />
        </video>
      </div>

      <div className="w-full flex justify-between px-6 pt-6 z-10">
         <h3 className="text-white font-bold opacity-80">Grounding</h3>
         <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-white/60 hover:text-white">
           {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
         </button>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
        <div className="relative flex items-center justify-center w-64 h-64 mb-16 mt-4">
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full bg-[#8b5cf6]/40 mix-blend-screen blur-xl"
            animate={isActive ? "active" : "idle"}
            variants={{
              idle: { scale: 1, opacity: 0.5 },
              active: {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
                transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }
            }}
          />
        </div>

        <div className="h-24 flex items-center justify-center px-6">
          <p className="text-white text-center font-medium leading-snug whitespace-pre-line text-[15px] transition-all duration-500">
            {phaseText}
          </p>
        </div>

        <button 
          onClick={() => setIsActive(!isActive)}
          className="w-[85%] max-w-[320px] bg-[#a78bfa] hover:bg-[#c4b5fd] text-[#1e103c] text-[15px] font-semibold py-[14px] rounded-full transition-all active:scale-95 shadow-[0_4px_14px_rgba(167,139,250,0.3)] mt-auto mb-10"
        >
          {isActive ? "Parar" : "Começar"}
        </button>
      </div>
    </div>
  );
}
