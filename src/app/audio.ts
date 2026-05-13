export let audioCtx: AudioContext | null = null;
export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'tense' | 'relax' | 'grounding';

function createPinkNoise(ctx: AudioContext, duration: number) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11;
    b6 = white * 0.115926;
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  return noiseSource;
}

export const playChime = (phase: BreathPhase) => {
  try {
    const ctx = initAudio();
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    if (phase === 'inhale' || phase === 'exhale' || phase === 'relax') {
      // Breath-like wind sounds
      const duration = phase === 'inhale' ? 4.0 : (phase === 'exhale' ? 4.0 : 5.0);
      const limitDuration = phase === 'exhale' ? 5.0 : duration;
      const noise = createPinkNoise(ctx, limitDuration + 1);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      
      if (phase === 'inhale') {
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.8, ctx.currentTime + duration - 0.5);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      } else {
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + duration);
        gainNode.gain.setValueAtTime(0.8, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      }

      noise.connect(filter);
      filter.connect(gainNode);
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + limitDuration);
      
    } else {
      // Chime or tense/hold tones
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
  
      let duration = 3.5;
      let maxVol = 0.15;
  
      switch(phase) {
        case 'hold1':
        case 'hold2':
          osc1.frequency.value = 432;
          osc2.frequency.value = 436;
          maxVol = 0.08;
          duration = 4.0;
          break;
        case 'tense':
          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(300, ctx.currentTime);
          osc1.frequency.linearRampToValueAtTime(350, ctx.currentTime + 3);
          osc2.frequency.setValueAtTime(310, ctx.currentTime);
          osc2.frequency.linearRampToValueAtTime(365, ctx.currentTime + 3);
          maxVol = 0.1;
          duration = 4.0;
          break;
        case 'grounding':
          osc1.frequency.value = 174; // Solfeggio for grounding/pain relief
          osc2.frequency.value = 178; 
          maxVol = 0.05;
          duration = 10.0;
          break;
      }
  
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
  
      if (phase === 'hold1' || phase === 'hold2') {
        gainNode.gain.linearRampToValueAtTime(maxVol, ctx.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      } else if (phase === 'grounding') {
        gainNode.gain.linearRampToValueAtTime(maxVol, ctx.currentTime + 2.0);
        gainNode.gain.setValueAtTime(maxVol, ctx.currentTime + duration - 2.0);
        gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + duration);
      } else {
        gainNode.gain.linearRampToValueAtTime(maxVol, ctx.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      }
  
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
  
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + duration + 0.1);
      osc2.stop(ctx.currentTime + duration + 0.1);
    }
  } catch (error) {
    console.error("Erro ao tocar o áudio:", error);
  }
};
