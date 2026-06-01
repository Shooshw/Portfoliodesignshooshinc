import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "../contexts/language-context";
import { useTheme } from "../contexts/theme-context";
import { HelpCircle, ChevronRight, MessageSquare } from "lucide-react";

export function FAQ() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const bg = isDark ? "bg-black" : "bg-[#FAF9F6]";
  const textPrimary = isDark ? "text-white" : "text-[#0D0D0D]";
  const textMuted = isDark ? "text-white/40" : "text-black/40";
  const surface = isDark ? "bg-[#0A0A0A]" : "bg-white/95 backdrop-blur-md shadow-sm";
  const border = isDark ? "border-white/10" : "border-black/[0.06]";

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
    { question: t("faq.q7"), answer: t("faq.a7") },
    { question: t("faq.q8"), answer: t("faq.a8") },
  ];

  return (
    <div className={`py-32 relative transition-colors duration-700 ${bg}`}>
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle size={32} className="text-[#C8392B]" />
          </div>
          <h2 className={`font-display font-semibold italic text-[clamp(2.8rem,6vw,4.5rem)] tracking-tighter leading-[0.9] mb-8 ${textPrimary}`}>
            {t("faq.title")}
          </h2>
          <p className={`font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed ${textMuted}`}>
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-24"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className={`border rounded-[2rem] overflow-hidden px-8 transition-colors ${surface} ${border}`}
              >
                <AccordionTrigger className={`font-display text-xl py-7 hover:no-underline text-left group transition-colors ${textPrimary} hover:text-[#C8392B]`}>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[0.65rem] font-bold opacity-20 group-hover:opacity-100 transition-opacity">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`font-sans text-base leading-relaxed pb-8 opacity-60 pl-10 whitespace-pre-line ${textPrimary}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`relative p-12 md:p-20 rounded-[3rem] text-center overflow-hidden border ${isDark ? "bg-[#0A0A0A]/50 border-white/10" : "bg-white border-black/5 shadow-sm"}`}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className={`font-display font-semibold italic text-3xl mb-4 ${textPrimary}`}>
              {t("faq.stillQuestions")}
            </h3>
            <p className={`font-sans text-sm md:text-base mb-12 max-w-md mx-auto opacity-60 ${textPrimary}`}>
              {t("faq.stillQuestionsDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:pedroolip13@gmail.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8392B] text-white px-10 py-5 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-xl"
              >
                <MessageSquare size={14} />
                {t("faq.contactMe")}
              </a>
              <a
                href="https://cal.com/shoosh"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-sans font-bold text-xs uppercase tracking-widest border transition-colors ${textPrimary} ${border} hover:bg-current/5`}
              >
                Schedule call
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}