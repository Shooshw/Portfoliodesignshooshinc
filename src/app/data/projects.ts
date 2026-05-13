export interface ProjectFile {
  name: string;
  type: "pdf" | "figma" | "zip" | "link";
  url: string;
}

export interface ProjectTranslation {
  title?: string;
  category?: string;
  role?: string;
  description?: string;
  longDescription?: string;
}

export interface Project {
  id: number;
  type: "main" | "secondary";
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  longDescription: string;
  tools: string[];
  files: ProjectFile[];
  color: string;
  image?: string;
  gallery?: string[];
  translations?: {
    en?: ProjectTranslation;
    pt?: ProjectTranslation;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    type: "main",
    title: "Aquora",
    category: "App Design / UI/UX",
    year: "2024",
    role: "Designer UI/UX",
    description: "Aplicativo de Bem-Estar focado em equilíbrio e saúde mental.",
    longDescription:
      "O Aquora foi desenvolvido como um projeto de conclusão de curso (TCC), recebendo nota máxima e aprovação unânime da banca. O foco do projeto foi criar uma interface calmante e funcional que auxiliasse usuários na gestão do estresse e promoção do bem-estar diário. Realizei todo o processo de design: desde a pesquisa de usuários e wireframing até a prototipação de alta fidelidade e criação da identidade visual da marca.",
    tools: ["Figma", "Adobe Illustrator", "Prototipagem"],
    files: [
      { name: "Apresentação TCC", type: "pdf", url: "#" },
      { name: "Arquivo Figma", type: "figma", url: "#" },
    ],
    color: "from-blue-600 to-cyan-500",
    translations: {
      pt: {
        title: "Aquora",
        category: "Design de App / UI/UX",
        role: "Designer UI/UX",
        description: "Aplicativo de Bem-Estar focado em equilíbrio e saúde mental.",
        longDescription: "O Aquora foi desenvolvido como um projeto de conclusão de curso (TCC), recebendo nota máxima e aprovação unânime da banca. O foco do projeto foi criar uma interface calmante e funcional que auxiliasse usuários na gestão do estresse e promoção do bem-estar diário. Realizei todo o processo de design: desde a pesquisa de usuários e wireframing até a prototipação de alta fidelidade e criação da identidade visual da marca.",
      },
      en: {
        title: "Aquora",
        category: "App Design / UI/UX",
        role: "UI/UX Designer",
        description: "Wellness App focused on balance and mental health.",
        longDescription: "Aquora was developed as a final graduation project (TCC), receiving top grades and unanimous approval from the board. The project's focus was to create a calming and functional interface that helps users manage stress and promote daily wellness. I carried out the entire design process: from user research and wireframing to high-fidelity prototyping and visual brand identity creation.",
      }
    }
  },
  {
    id: 2,
    type: "main",
    title: "League of Legends",
    category: "Redesign UI/UX",
    year: "2024",
    role: "Designer Digital",
    description: "Redesign conceitual da interface do cliente de League of Legends.",
    longDescription:
      "Este projeto explorou novas possibilidades visuais e funcionais para o cliente de League of Legends. O objetivo foi melhorar a clareza da navegação, unificar a linguagem visual entre as diferentes abas e modernizar a experiência do jogador sem perder a essência épica do jogo. Foquei especialmente na reformulação da página de perfil e na lista de amigos.",
    tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "LoL Database"],
    files: [
      { name: "Case Study", type: "pdf", url: "#" },
      { name: "Protótipo", type: "figma", url: "#" },
    ],
    color: "from-amber-600 to-yellow-500",
    translations: {
      pt: {
        title: "League of Legends",
        category: "Redesign UI/UX",
        role: "Designer Digital",
        description: "Redesign conceitual da interface do cliente de League of Legends.",
        longDescription: "Este projeto explorou novas possibilidades visuais e funcionais para o cliente de League of Legends. O objetivo foi melhorar a clareza da navegação, unificar a linguagem visual entre as diferentes abas e modernizar a experiência do jogador sem perder a essência épica do jogo. Foquei especialmente na reformulação da página de perfil e na lista de amigos.",
      },
      en: {
        title: "League of Legends",
        category: "UI/UX Redesign",
        role: "Digital Designer",
        description: "Conceptual UI/UX redesign of the League of Legends client interface.",
        longDescription: "This project explored new visual and functional possibilities for the League of Legends client. The goal was to improve navigation clarity, unify the visual language across different tabs, and modernize the player experience without losing the game's epic essence. I focused especially on revamping the profile page and the friends list.",
      }
    }
  },
  {
    id: 10,
    type: "secondary",
    title: "Mirror - ADO",
    category: "Album Cover Design",
    year: "2025",
    role: "Designer Gráfico / Produtor",
    description: "Design de capa para o álbum Zanmu",
    longDescription:
      "Criação de arte de capa para a música 'Mirror' da cantora ADO, do álbum Zanmu. O projeto incorpora elementos de design cyberpunk com paleta neon vibrante, explorando temas futuristas e urbanos. A composição visual combina fotografia, elementos 3D e tipografia customizada para criar uma identidade visual marcante e contemporânea que reflete a essência da música.",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Blender"],
    files: [],
    color: "from-purple-800 to-pink-600",
    image: "/images/Poster-ADO-MIRRORweb.jpg",
    translations: {
      en: {
        title: "Mirror - ADO",
        category: "Album Cover Design",
        role: "Graphic Designer / Producer",
        description: "Cover design for the album Zanmu",
        longDescription: "Cover art creation for the song 'Mirror' by singer ADO, from the Zanmu album. The project incorporates cyberpunk design elements with a vibrant neon palette, exploring futuristic and urban themes. The visual composition combines photography, 3D elements, and customized typography to create a striking and contemporary visual identity that reflects the song's essence.",
      }
    }
  },
  {
    id: 11,
    type: "secondary",
    title: "24k magic - Bruno Mars Fan cover",
    category: "Album Cover Design",
    year: "2025",
    role: "Designer Gráfico",
    description: "Fan cover da música 24k Magic",
    longDescription:
      "Criação de fan cover para a música '24k Magic' de Bruno Mars. O projeto incorpora elementos vintage dos anos 80, combinando fotografia, design gráfico e tipografia retrô para criar uma homenagem visual que captura a energia e o estilo da música. A estética foi inspirada na era dourada do funk e R&B, com paleta de cores quentes e acabamento nostálgico.",
    tools: ["Adobe Photoshop", "Adobe InDesign", "Lightroom"],
    files: [],
    color: "from-orange-700 to-red-600",
    image: "/images/bruno-mars-album cover, finesse para web.jpg",
    gallery: [
      "/images/bruno-mars-album cover, finesse para web.jpg",
      "/images/Free_Vinyl_Mockup_2.jpg",
      "/images/VInil-1-bruno-mars.jpg",
      "/images/VInil-2-bruno-mars.jpg",
    ],
    translations: {
      en: {
        title: "24k Magic - Bruno Mars Fan cover",
        category: "Album Cover Design",
        role: "Graphic Designer",
        description: "Fan cover for the song 24k Magic",
        longDescription: "Creation of a fan cover for Bruno Mars' song '24k Magic'. The project incorporates vintage 80s elements, combining photography, graphic design, and retro typography to create a visual tribute that captures the energy and style of the song. The aesthetics were inspired by the golden era of funk and R&B, featuring a warm color palette and a nostalgic finish.",
      }
    }
  },
  {
    id: 12,
    type: "secondary",
    title: "Virtual Insanity - Jamiroquai",
    category: "Music Jam Project / Poster Design",
    year: "2024",
    role: "Designer Gráfico",
    description: "Poster experimental inspirado no álbum 'Travelling without moving'.",
    longDescription: "Poster experimental inspirado no álbum 'Travelling without moving', explorando estética glitch e tipografia dinâmica.",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
    files: [],
    color: "from-blue-700 to-cyan-600",
    image: "/images/Virtual-INsanity.jpg",
    gallery: [
      "/images/Virtual-INsanity.jpg",
      "/images/Poster_Glued_To_Wall_Mockup_1.jpg",
      "/images/Free_Citylight_Poster_Mockup_1.png",
      "/images/Free_Citylight_Poster_Mockup_VI.png",
    ],
    translations: {
      en: {
        title: "Virtual Insanity - Jamiroquai",
        category: "Music Jam Project / Poster Design",
        role: "Graphic Designer",
        description: "Experimental poster inspired by the 'Travelling without moving' album.",
        longDescription: "Experimental poster inspired by the 'Travelling without moving' album, exploring glitch aesthetics and dynamic typography.",
      }
    }
  },
  {
    id: 13,
    type: "secondary",
    title: "Revista Indiesynth",
    category: "Branding",
    year: "2024",
    role: "Designer Gráfico",
    description: "Produção de uma marca sobre jogos.",
    longDescription: "Produção de uma marca sobre jogos. Uma edição especial nostálgica aos antigos consoles portáteis. Feito um conteúdo exclusivo com poster especial na temática CyberCity. O projeto segue métricas rigorosas de diagramação editorial para revista impressa, em formato padrão de 20,5 x 27,5 cm (fechado) com lombada quadrada, sangria de 5mm, utilizando grids modulares e baseline para garantir harmonia e legibilidade nas páginas multiplas.",
    tools: ["Adobe Photoshop", "Adobe InDesign"],
    files: [],
    color: "from-fuchsia-700 to-rose-600",
    image: "/images/chapeuzinho-project.jpg",
    gallery: [
      "/images/chapeuzinho-project.jpg",
      "/images/chapeuzinho-project-2.png",
      "/images/chapeuzinho-project-3.jpg",
      "/images/chapeuzinho-project-4.png",
      "/images/chapeuzinho-project-5.jpg",
    ],
    translations: {
      en: {
        title: "Indiesynth Magazine",
        category: "Branding",
        role: "Graphic Designer",
        description: "Production of a gaming brand.",
        longDescription: "Production of a gaming brand. A nostalgic special edition dedicated to vintage portable consoles. Features exclusive content with a special CyberCity-themed poster. The project follows rigorous editorial grid metrics for printed magazines, in a standard 20.5 x 27.5 cm (closed) format with a square spine, 5mm bleed, using modular grids and a baseline to ensure harmony and readability across multiple pages.",
      }
    }
  },
];

export const mainProjects = projects.filter((p) => p.type === "main");
export const secondaryProjects = projects.filter((p) => p.type === "secondary");
