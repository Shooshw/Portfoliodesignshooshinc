import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Header
    "header.faq": "FAQ",
    "header.contact": "Contato",
    "header.meeting": "Agendar Reunião",
    "header.cv": "Currículo",

    // Sidebar
    "sidebar.about": "Sobre Mim",
    "sidebar.projects": "Projetos",
    "sidebar.experience": "Experiência",
    "sidebar.education": "Formação",
    "sidebar.contact": "Contato",
    "sidebar.cv": "Currículo",
    "sidebar.faq": "FAQ",
    "sidebar.quote": "O design não é apenas o que parece e o que se sente. Design é como funciona.",
    "sidebar.quoteAuthor": "— Steve Jobs",

    // Hero
    "hero.creative": "Designer",
    "hero.designer": "Criativo",
    "hero.subtitle": "Criando soluções elegantes através do design, onde forma encontra função",
    "hero.cta": "Explore Meu Trabalho",
    "hero.sendEmail": "Enviar Mensagem",

    // About Me
    "about.title": "Sobre Mim",
    "about.subtitle": "Um designer apaixonado com 5+ anos de experiência criando experiências digitais impactantes",
    "about.description": "Sou Pedro de Oliveira, conhecido como shoosh. Trabalho com design digital há mais de 5 anos, criando soluções visuais que conectam marcas com pessoas. Minha abordagem combina criatividade com funcionalidade, sempre buscando deixar as pessoas perplexas com resultados únicos e impactantes.",
    "about.yearsExperience": "Anos de Experiência",
    "about.projectsCompleted": "Projetos Concluídos",
    "about.academicGrade": "Média Acadêmica",
    "about.technicalSkills": "Habilidades Técnicas",
    "about.softSkills": "Soft Skills",

    // Soft Skills
    "softSkill.prototyping": "Prototipagem",
    "softSkill.webDesign": "Web Design",
    "softSkill.communication": "Comunicação",
    "softSkill.graphicDesign": "Design Gráfico",

    // Projects
    "projects.main.title": "Projetos em Destaque",
    "projects.main.subtitle": "Apresentando meus melhores trabalhos em várias disciplinas de design",
    "projects.secondary.title": "Outros Projetos",
    "projects.secondary.subtitle": "Portfolio de trabalhos adicionais e experimentações",

    // Experience
    "experience.title": "Experiência Profissional",
    "experience.subtitle": "Histórico de trabalhos freelance e colaborações",
    "experience.present": "Presente",

    // Education
    "education.title": "Formação e Cursos",
    "education.subtitle": "Educação formal e certificações profissionais",
    "education.certifications": "Certificações",

    // CV Page
    "cv.title": "Currículo",
    "cv.subtitle": "Histórico profissional e acadêmico completo",
    "cv.download": "Baixar PDF",
    "cv.academic": "Formação Acadêmica",
    "cv.professional": "Experiência Profissional",
    "cv.certifications": "Certificações e Cursos",
    "cv.languages": "Idiomas",
    "cv.skills": "Habilidades",
    "cv.summary": "Resumo Profissional",
    "cv.summaryText": "Designer Digital formado pela Universidade Anhembi Morumbi, com foco em UI/UX, ilustração e identidade visual. Atuo como freelancer desde 2021, desenvolvendo soluções visuais, protótipos e materiais digitais. Domínio avançado do pacote Adobe e Figma. Inglês fluente certificado pela Cambridge.",
    "cv.mainProjects": "Projetos Principais",
    "cv.tools": "Ferramentas",

    // Academic
    "academic.degree1.period": "em andamento",
    "academic.degree1.title": "Imersão Front-End",
    "academic.degree1.institution": "Alura",
    "academic.degree2.period": "2021 - 2025",
    "academic.degree2.title": "Bacharelado em Design Digital",
    "academic.degree2.institution": "Universidade Anhembi Morumbi (UAM)",
    "academic.degree3.period": "2015 - 2021",
    "academic.degree3.title": "Curso de Inglês",
    "academic.degree3.institution": "Smart Choice / Oxford (2015-2018) • Wizard (2018-2021)",

    // Experience jobs
    "experience.job1.period": "22/05/2024 – 15/08/2024",
    "experience.job1.title": "Designer Gráfico — Freelancer",
    "experience.job1.company": "C2 Cutelaria Artesanal",
    "experience.job1.description": "Identidade visual completa (logo, paleta, tipografia) • Materiais digitais e impressos • Layouts conforme briefing • Edição de imagens e composição visual • Coerência estética e padronização",
    "experience.job2.period": "16/04/2024 - 28/06/2024",
    "experience.job2.title": "Designer Digital — Freelancer",
    "experience.job2.company": "Ana Beatriz Fereira",
    "experience.job2.description": "Identidade visual (logo, paleta, tipografia) • Materiais digitais • Tratamento de imagens • Documentação visual",
    "experience.job3.period": "Setembro de 2025",
    "experience.job3.title": "Designer Gráfico — Freelancer",
    "experience.job3.company": "Cartografia Negra",
    "experience.job3.description": "Vetorização do mapa histórico da zona central de São Paulo (1800–1874) • Arquivo vetorial fiel para pesquisa e curadoria • Projeto de memória e valorização da história negra",

    // Certifications
    "cert.1": "Capacitação Cultural — Lumina UFRGS (2025)",
    "cert.2": "Interfaces Criativas — Semana Ânima (2024)",
    "cert.3": "Indústria de Games — Semana Ânima (2024)",

    // Languages
    "lang.english": "Inglês",
    "lang.spanish": "Espanhol",
    "lang.french": "Francês",
    "lang.portuguese": "Português",
    "lang.native": "Nativo",
    "lang.fluent": "Fluente (Cambridge C1 – Score 185)",
    "lang.professional": "Profissional",
    "lang.intermediate": "Intermediário",

    // Skills with descriptions
    "skill.uiux": "UI/UX Design",
    "skill.uiux.desc": "Design de interfaces centrado no usuário, wireframing, prototipação interativa e pesquisa de experiência. Foco em criar experiências digitais intuitivas e acessíveis.",
    "skill.branding": "Identidade Visual",
    "skill.branding.desc": "Desenvolvimento de marcas completas incluindo logo, paleta de cores, tipografia e guidelines. Criação de sistemas visuais coerentes e memoráveis.",
    "skill.illustration": "Ilustração",
    "skill.illustration.desc": "Criação de ilustrações vetoriais e digitais para diversos fins. Domínio de técnicas tradicionais e contemporâneas de ilustração.",
    "skill.prototyping": "Prototipação",
    "skill.prototyping.desc": "Desenvolvimento de protótipos interativos de alta fidelidade usando Figma e outras ferramentas. Validação de conceitos através de testes de usabilidade.",
    "skill.imageEditing": "Edição de Imagens",
    "skill.imageEditing.desc": "Tratamento profissional de imagens, composições visuais, retoque e manipulação digital usando Photoshop e ferramentas especializadas.",
    "skill.motion": "Motion Básico",
    "skill.motion.desc": "Animações e motion graphics para interfaces e conteúdo digital usando After Effects e Premiere. Criação de microinterações e transições.",

    // Tools categories
    "tools.design": "Design",
    "tools.motion": "Motion/Vídeo",
    "tools.illustration": "Ilustração",
    "tools.3d": "3D",
    "tools.other": "Outros",

    // Projects Display
    "project.role": "Papel",
    "project.year": "Ano",
    "project.about": "Sobre o projeto",
    "project.stack": "Stack Tecnológica",
    "project.gallery": "Documentação Visual",
    "project.rights": "Direitos Autorais e Uso",
    "project.rights.desc": "Esta obra está protegida por direitos autorais. É estritamente proibido o uso desta imagem para:",
    "project.rights.li1": "Treinamento ou alimentação de inteligências artificiais",
    "project.rights.li2": "Uso comercial sem autorização prévia",
    "project.rights.li3": "Reprodução, distribuição ou modificação não autorizada",
    "project.rights.footer": "Para aquisição ou licenciamento, utilize os canais oficiais de contato.",
    "project.deliverables": "Entregáveis",

    // Main projects
    "mainProject.1.title": "Aquora — Aplicativo de Bem-Estar",
    "mainProject.1.desc": "TCC com nota máxima e aprovação unânime • UI/UX, prototipação e identidade visual",
    "mainProject.2.title": "Redesign UI/UX — League of Legends",
    "mainProject.2.desc": "Redesign conceitual • Foco em navegação e clareza visual",
    "mainProject.3.title": "Music Jam — Capas Musicais",
    "mainProject.3.desc": "Projeto autoral • Exploração estética e narrativa visual",

    // Contact Section (home)
    "contactSection.title1": "Siga-me em",
    "contactSection.title2": "outras redes",
    "contactSection.subtitle": "Vamos colaborar e dar vida às suas ideias. Estou sempre aberto a discutir novos projetos e oportunidades.",
    "contactSection.cv": "Currículo",
    "contactSection.linkedin": "LinkedIn",
    "contactSection.email": "E-mail",
    "contactSection.whatsapp": "WhatsApp",
    "contactSection.instagram": "Instagram",
    "contactSection.behance": "Behance",
    "contactSection.downloadCV": "Baixar CV",
    "contactSection.connectLinkedIn": "Conectar no LinkedIn",
    "contactSection.sendMessage": "Enviar Mensagem",
    "contactSection.viewBehance": "Ver no Behance",
    "contactSection.ctaTitle": "Pronto para Iniciar um Projeto?",
    "contactSection.ctaDescription": "Se você precisa de uma reformulação completa da marca ou uma presença web impressionante, estou aqui para ajudar a transformar sua visão em realidade.",
    "contactSection.ctaButton": "Agendar uma Reunião",
    "contactSection.footer": "© 2026 Pedro de Oliveira. Todos os direitos reservados.",

    // FAQ Page
    "faq.title": "Perguntas Frequentes",
    "faq.subtitle": "Encontre respostas para perguntas comuns sobre meus serviços, processo e como podemos trabalhar juntos.",
    "faq.stillQuestions": "Ainda Tem Dúvidas?",
    "faq.stillQuestionsDesc": "Adoraria ouvir de você! Sinta-se à vontade para entrar em contato, e responderei o mais breve possível.",
    "faq.contactMe": "Entre em Contato",
    "faq.q1": "Qual é o seu processo de design?",
    "faq.a1": "Meu processo de design começa entendendo seus objetivos e público-alvo. Conduzo pesquisas, crio mood boards e wireframes, desenvolvo conceitos iniciais, reúno feedback e refino o design até que esteja perfeitamente alinhado com sua visão. Durante todo o processo, mantenho comunicação aberta e envolvo você nas decisões importantes.",
    "faq.q2": "Quanto tempo leva um projeto típico?",
    "faq.a2": "Os prazos dos projetos variam dependendo do escopo e complexidade. Um design de logo simples pode levar 1-2 semanas, enquanto uma identidade de marca completa ou design de website pode levar 4-8 semanas. Sempre forneço um cronograma detalhado durante nossa consulta inicial e mantenho você atualizado sobre o progresso durante todo o projeto.",
    "faq.q3": "Quais formatos de arquivo vou receber?",
    "faq.a3": "Você receberá todos os formatos de arquivo necessários para seu projeto específico. Para branding, isso normalmente inclui arquivos AI, EPS, PDF, PNG e SVG. Para web design, você receberá arquivos Figma, assets exportados e especificações de design. Garanto que você tenha tudo necessário para aplicações digitais e impressas.",
    "faq.q4": "Você oferece revisões?",
    "faq.a4": "Sim! Incluo um número específico de rodadas de revisão em cada pacote de projeto (tipicamente 2-3 rodadas). Isso garante que o design final atenda suas expectativas. Revisões adicionais além do pacote podem ser organizadas se necessário. Acredito em refinamento colaborativo para alcançar o resultado perfeito.",
    "faq.q5": "Você pode trabalhar com minhas diretrizes de marca existentes?",
    "faq.a5": "Absolutamente! Tenho experiência em trabalhar dentro de diretrizes de marca estabelecidas e posso integrar perfeitamente novos designs com sua identidade visual existente. Garanto consistência em todos os pontos de contato enquanto trago soluções criativas e frescas para seus projetos.",
    "faq.q6": "Quais são suas tarifas?",
    "faq.a6": "Minhas tarifas variam dependendo do escopo, complexidade e prazo do projeto. Ofereço tanto tarifas por hora quanto pacotes de preço fixo. Após discutir suas necessidades, fornecerei uma cotação detalhada descrevendo todos os entregáveis e custos. Acredito em preços transparentes sem taxas ocultas.",
    "faq.q7": "Você trabalha remotamente?",
    "faq.a7": "Sim, trabalho remotamente e colaborei com sucesso com clientes em todo o mundo. Uso ferramentas de comunicação modernas para garantir colaboração suave, atualizações regulares e compartilhamento de arquivos sem problemas. O trabalho remoto me permite atender clientes globalmente mantendo resultados de alta qualidade.",
    "faq.q8": "Quais softwares você usa?",
    "faq.a8": "Sou proficiente em ferramentas padrão da indústria incluindo Adobe Creative Suite (Illustrator, Photoshop, InDesign, After Effects), Figma, software de modelagem 3D e várias outras aplicações especializadas. Escolho as ferramentas certas para cada projeto para entregar os melhores resultados possíveis.",

    // Contact Page
    "contact.title1": "Entre em",
    "contact.title2": "Contato",
    "contact.subtitle": "Vamos discutir seu projeto e como posso ajudar a dar vida à sua visão.",
    "contact.getInTouch": "Entre em Contato",
    "contact.email": "E-mail",
    "contact.linkedin": "LinkedIn",
    "contact.whatsapp": "WhatsApp",
    "contact.cv": "Currículo",
    "contact.downloadCV": "Baixar CV",
    "contact.backToTop": "Voltar ao Topo",
    "contact.viewCV": "Ver Currículo Completo",
    "contact.copyEmail": "Copiar e-mail",
    "contact.copied": "E-mail copiado!",
    "contact.schedule": "Agendar reunião",
    "contact.scheduleMeeting": "Agendar uma Reunião",
    "contact.scheduleTitle": "Prefere Conversar ao Vivo?",
    "contact.scheduleDesc": "Agende uma reunião de 30 minutos comigo via Cal.com. É uma forma rápida e prática de discutirmos seu projeto, tirar dúvidas e alinharmos expectativas.",
    "contact.scheduleButton": "Agendar Reunião no Cal.com",
    "contact.availability": "Disponibilidade",
    "contact.responseTime": "Tempo de Resposta",
    "contact.within24h": "Em até 24 horas",
    "contact.location": "Localização",
    "contact.remote": "Remoto / Mundial",
    "contact.sendMessage": "Enviar uma Mensagem",
    "contact.fullName": "Nome Completo",
    "contact.emailAddress": "Endereço de E-mail",
    "contact.subject": "Assunto",
    "contact.message": "Mensagem",
    "contact.namePlaceholder": "João Silva",
    "contact.emailPlaceholder": "joao@exemplo.com",
    "contact.subjectPlaceholder": "Sobre o que é?",
    "contact.messagePlaceholder": "Conte-me sobre seu projeto...",
    "contact.submitButton": "Enviar Mensagem",
    "contact.orSchedule": "Ou agende uma reunião diretamente usando",
    "contact.successMessage": "Mensagem enviada com sucesso! Entrarei em contato em breve.",
    "contact.sending": "Enviando...",
    "contact.contactPage": "Formulário de contato",
    "contact.calcom": "Agendar reunião",
  },
  en: {
    // Header
    "header.faq": "FAQ",
    "header.contact": "Contact",
    "header.meeting": "Book Meeting",
    "header.cv": "Resume",

    // Sidebar
    "sidebar.about": "About Me",
    "sidebar.projects": "Projects",
    "sidebar.experience": "Experience",
    "sidebar.education": "Education",
    "sidebar.contact": "Contact",
    "sidebar.cv": "Resume",
    "sidebar.faq": "FAQ",
    "sidebar.quote": "Design is not just what it looks like and feels like. Design is how it works.",
    "sidebar.quoteAuthor": "— Steve Jobs",

    // Hero
    "hero.creative": "Designer",
    "hero.designer": "Creative",
    "hero.subtitle": "Crafting elegant solutions through design, where form meets function",
    "hero.cta": "Explore My Work",
    "hero.sendEmail": "Send Message",

    // About Me
    "about.title": "About Me",
    "about.subtitle": "A passionate designer with 5+ years of experience creating impactful digital experiences",
    "about.description": "I'm Pedro de Oliveira, known as shoosh. I've been working with digital design for over 5 years, creating visual solutions that connect brands with people. My approach combines creativity with functionality, always seeking to leave people amazed with unique and impactful results.",
    "about.yearsExperience": "Years of Experience",
    "about.projectsCompleted": "Projects Completed",
    "about.academicGrade": "Academic Average",
    "about.technicalSkills": "Technical Skills",
    "about.softSkills": "Soft Skills",

    // Soft Skills
    "softSkill.prototyping": "Prototyping",
    "softSkill.webDesign": "Web Design",
    "softSkill.communication": "Communication",
    "softSkill.graphicDesign": "Graphic Design",

    // Projects
    "projects.main.title": "Featured Projects",
    "projects.main.subtitle": "Showcasing my best work across various design disciplines",
    "projects.secondary.title": "Other Projects",
    "projects.secondary.subtitle": "Additional work portfolio and experimentations",

    // Experience
    "experience.title": "Professional Experience",
    "experience.subtitle": "Freelance work history and collaborations",
    "experience.present": "Present",

    // Education
    "education.title": "Education & Courses",
    "education.subtitle": "Formal education and professional certifications",
    "education.certifications": "Certifications",

    // CV Page
    "cv.title": "Curriculum Vitae",
    "cv.subtitle": "Complete professional and academic history",
    "cv.download": "Download PDF",
    "cv.academic": "Academic Background",
    "cv.professional": "Professional Experience",
    "cv.certifications": "Certifications & Courses",
    "cv.languages": "Languages",
    "cv.skills": "Skills",
    "cv.summary": "Professional Summary",
    "cv.summaryText": "Digital Designer graduated from the University Anhembi Morumbi, with a focus on UI/UX, illustration, and visual identity. Acting as a freelancer since 2021, developing visual solutions, prototypes, and digital materials. Advanced mastery of the Adobe suite and Figma. Fluent English certified by Cambridge.",
    "cv.mainProjects": "Main Projects",
    "cv.tools": "Tools",

    // Academic
    "academic.degree1.period": "ongoing",
    "academic.degree1.title": "Front-End Immersion",
    "academic.degree1.institution": "Alura",
    "academic.degree2.period": "2021 - 2025",
    "academic.degree2.title": "Bachelor of Arts in Digital Design",
    "academic.degree2.institution": "University Anhembi Morumbi (UAM)",
    "academic.degree3.period": "2015 - 2021",
    "academic.degree3.title": "English Course",
    "academic.degree3.institution": "Smart Choice / Oxford (2015-2018) • Wizard (2018-2021)",

    // Experience jobs
    "experience.job1.period": "05/22/2024 – 08/15/2024",
    "experience.job1.title": "Graphic Designer — Freelancer",
    "experience.job1.company": "C2 Cutelaria Artesanal",
    "experience.job1.description": "Complete visual identity (logo, palette, typography) • Digital and printed materials • Layouts according to briefing • Image editing and visual composition • Aesthetic coherence and standardization",
    "experience.job2.period": "04/16/2024 - 06/28/2024",
    "experience.job2.title": "Digital Designer — Freelancer",
    "experience.job2.company": "Ana Beatriz Fereira",
    "experience.job2.description": "Visual identity (logo, palette, typography) • Digital materials • Image treatment • Visual documentation",
    "experience.job3.period": "September 2025",
    "experience.job3.title": "Graphic Designer — Freelancer",
    "experience.job3.company": "Cartografia Negra",
    "experience.job3.description": "Vectorization of the historical map of the central zone of São Paulo (1800–1874) • Fidelity vector file for research and curation • Project for memory and valorization of black history",

    // Certifications
    "cert.1": "Cultural Capacity — Lumina UFRGS (2025)",
    "cert.2": "Creative Interfaces — Ânima Week (2024)",
    "cert.3": "Game Industry — Ânima Week (2024)",

    // Languages
    "lang.english": "English",
    "lang.spanish": "Spanish",
    "lang.french": "French",
    "lang.portuguese": "Portuguese",
    "lang.native": "Native",
    "lang.fluent": "Fluent (Cambridge C1 – Score 185)",
    "lang.professional": "Professional",
    "lang.intermediate": "Intermediate",

    // Skills with descriptions
    "skill.uiux": "UI/UX Design",
    "skill.uiux.desc": "User-centered interface design, wireframing, interactive prototyping, and experience research. Focus on creating intuitive and accessible digital experiences.",
    "skill.branding": "Visual Identity",
    "skill.branding.desc": "Development of complete brands including logo, color palette, typography, and guidelines. Creation of consistent and memorable visual systems.",
    "skill.illustration": "Illustration",
    "skill.illustration.desc": "Creation of vector and digital illustrations for various purposes. Mastery of traditional and contemporary illustration techniques.",
    "skill.prototyping": "Prototyping",
    "skill.prototyping.desc": "Development of high-fidelity interactive prototypes using Figma and other tools. Concept validation through usability testing.",
    "skill.imageEditing": "Image Editing",
    "skill.imageEditing.desc": "Professional image treatment, visual compositions, retouching, and digital manipulation using Photoshop and specialized tools.",
    "skill.motion": "Basic Motion",
    "skill.motion.desc": "Animations and motion graphics for interfaces and digital content using After Effects and Premiere. Creation of microinteractions and transitions.",

    // Tools categories
    "tools.design": "Design",
    "tools.motion": "Motion/Video",
    "tools.illustration": "Illustration",
    "tools.3d": "3D",
    "tools.other": "Others",

    // Projects Display
    "project.role": "Role",
    "project.year": "Year",
    "project.about": "About the project",
    "project.stack": "Tech Stack",
    "project.gallery": "Visual Documentation",
    "project.rights": "Copyright and Usage",
    "project.rights.desc": "This work is protected by copyright. It is strictly forbidden to use this image for:",
    "project.rights.li1": "Training or feeding artificial intelligences",
    "project.rights.li2": "Commercial use without prior authorization",
    "project.rights.li3": "Unauthorized reproduction, distribution, or modification",
    "project.rights.footer": "For acquisition or licensing, please use official contact channels.",
    "project.deliverables": "Deliverables",

    // Main projects
    "mainProject.1.title": "Aquora — Wellness App",
    "mainProject.1.desc": "TCC with maximum grade and unanimous approval • UI/UX, prototyping, and visual identity",
    "mainProject.2.title": "UI/UX Redesign — League of Legends",
    "mainProject.2.desc": "Conceptual redesign • Focus on navigation and visual clarity",
    "mainProject.3.title": "Music Jam — Music Covers",
    "mainProject.3.desc": "Personal project • Aesthetic and visual narrative exploration",

    // Contact Section (home)
    "contactSection.title1": "Get In",
    "contactSection.title2": "Touch",
    "contactSection.subtitle": "Let's collaborate and bring your ideas to life. I'm always open to discussing new projects and opportunities.",
    "contactSection.cv": "Curriculum Vitae",
    "contactSection.linkedin": "LinkedIn",
    "contactSection.email": "Email",
    "contactSection.whatsapp": "WhatsApp",
    "contactSection.instagram": "Instagram",
    "contactSection.behance": "Behance",
    "contactSection.downloadCV": "Download CV",
    "contactSection.connectLinkedIn": "Connect on LinkedIn",
    "contactSection.sendMessage": "Send a Message",
    "contactSection.viewBehance": "View on Behance",
    "contactSection.ctaTitle": "Ready to Start a Project?",
    "contactSection.ctaDescription": "Whether you need a complete brand overhaul or a stunning web presence, I'm here to help transform your vision into reality.",
    "contactSection.ctaButton": "Schedule a Meeting",
    "contactSection.footer": "© 2026 Pedro de Oliveira. All rights reserved.",

    // FAQ Page
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about my services, process, and how we can work together.",
    "faq.stillQuestions": "Still Have Questions?",
    "faq.stillQuestionsDesc": "I'd love to hear from you! Feel free to reach out, and I'll get back to you as soon as possible.",
    "faq.contactMe": "Contact Me",
    "faq.q1": "What is your design process?",
    "faq.a1": "My design process begins with understanding your goals and target audience. I conduct research, create mood boards and wireframes, develop initial concepts, gather feedback, and refine the design until it perfectly aligns with your vision. Throughout the process, I maintain open communication and involve you in key decisions.",
    "faq.q2": "How long does a typical project take?",
    "faq.a2": "Project timelines vary depending on scope and complexity. A simple logo design might take 1-2 weeks, while a complete brand identity or website design can take 4-8 weeks. I always provide a detailed timeline during our initial consultation and keep you updated on progress throughout the project.",
    "faq.q3": "What file formats will I receive?",
    "faq.a3": "You'll receive all necessary file formats for your specific project. For branding, this typically includes AI, EPS, PDF, PNG, and SVG files. For web design, you'll get Figma files, exported assets, and design specifications. I ensure you have everything needed for both digital and print applications.",
    "faq.q4": "Do you offer revisions?",
    "faq.a4": "Yes! I include a specific number of revision rounds in each project package (typically 2-3 rounds). This ensures the final design meets your expectations. Additional revisions beyond the package can be arranged if needed. I believe in collaborative refinement to achieve the perfect result.",
    "faq.q5": "Can you work with my existing brand guidelines?",
    "faq.a5": "Absolutely! I'm experienced in working within established brand guidelines and can seamlessly integrate new designs with your existing visual identity. I ensure consistency across all touchpoints while bringing fresh, creative solutions to your projects.",
    "faq.q6": "What are your rates?",
    "faq.a6": "My rates vary depending on project scope, complexity, and timeline. I offer both hourly rates and fixed-price packages. After discussing your needs, I'll provide a detailed quote outlining all deliverables and costs. I believe in transparent pricing with no hidden fees.",
    "faq.q7": "Do you work remotely?",
    "faq.a7": "Yes, I work remotely and have successfully collaborated with clients worldwide. I use modern communication tools to ensure smooth collaboration, regular updates, and seamless file sharing. Remote work allows me to serve clients globally while maintaining high-quality results.",
    "faq.q8": "What software do you use?",
    "faq.a8": "I'm proficient in industry-standard tools including Adobe Creative Suite (Illustrator, Photoshop, InDesign, After Effects), Figma, 3D modeling software, and various other specialized applications. I choose the right tools for each project to deliver the best possible results.",

    // Contact Page
    "contact.title1": "Contact",
    "contact.title2": "Me",
    "contact.subtitle": "Let's discuss your project and how I can help bring your vision to life.",
    "contact.getInTouch": "Get In Touch",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.whatsapp": "WhatsApp",
    "contact.cv": "Curriculum Vitae",
    "contact.downloadCV": "Download CV",
    "contact.backToTop": "Back to Top",
    "contact.viewCV": "View Full Resume",
    "contact.copyEmail": "Copy email",
    "contact.copied": "Email copied!",
    "contact.schedule": "Schedule meeting",
    "contact.scheduleMeeting": "Schedule a Meeting",
    "contact.scheduleTitle": "Prefer to Talk Live?",
    "contact.scheduleDesc": "Schedule a 30-minute meeting with me via Cal.com. It's a quick and practical way to discuss your project, clear up any doubts, and align expectations.",
    "contact.scheduleButton": "Schedule Meeting on Cal.com",
    "contact.availability": "Availability",
    "contact.responseTime": "Response Time",
    "contact.within24h": "Within 24 hours",
    "contact.location": "Location",
    "contact.remote": "Remote / Worldwide",
    "contact.sendMessage": "Send a Message",
    "contact.fullName": "Full Name",
    "contact.emailAddress": "Email Address",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.namePlaceholder": "John Doe",
    "contact.emailPlaceholder": "john@example.com",
    "contact.subjectPlaceholder": "What is this about?",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.submitButton": "Send Message",
    "contact.orSchedule": "Or schedule a meeting directly using",
    "contact.successMessage": "Message sent successfully! I will get back to you soon.",
    "contact.sending": "Sending...",
    "contact.contactPage": "Contact Form",
    "contact.calcom": "Schedule meeting",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}