import { useEffect, useState, useRef } from "react";
import { Alert, Box, Container, Snackbar, useTheme } from "@mui/material";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandWhatsapp,
  TbArrowUpRight,
  TbCopy,
  TbCheck,
} from "react-icons/tb";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  getHomeContactContent,
  getHomeContactContentRemote,
} from "@/service/content";
import { trackAction } from "@/service/analytics/tracking.service";
import styles from "./Contact.module.css";

const OFFICIAL_WHATSAPP_DIGITS = "554188410374";
const OFFICIAL_WHATSAPP_DISPLAY = "+55 41 8841-0374";

const QUICK_INTENTS = [
  {
    id: "system",
    label: "Quero organizar meu negócio com um sistema",
    message:
      "Olá, equipe Wavem! Vim pelo portfólio e quero organizar meu negócio com um sistema sob medida.",
    color: "#34D399",
  },
  {
    id: "store",
    label: "Quero criar uma loja ou vitrine para vender",
    message:
      "Olá, equipe Wavem! Vim pelo portfólio e quero criar uma vitrine ou loja para vender em poucos cliques.",
    color: "#A78BFA",
  },
  {
    id: "coffee",
    label: "Quero tirar uma dúvida e trocar uma ideia",
    message:
      "Olá, equipe Wavem! Vim pelo portfólio e quero bater um papo sobre uma ideia de projeto.",
    color: "#38BDF8",
  },
];

function formatBrazilPhoneDisplay(digits) {
  const clean = String(digits || "").replace(/\D/g, "");
  if (!clean || clean === "5541995424186" || clean === OFFICIAL_WHATSAPP_DIGITS) {
    return OFFICIAL_WHATSAPP_DISPLAY;
  }
  if (clean.length === 12 && clean.startsWith("55")) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(
      4,
      8
    )}-${clean.slice(8)}`;
  }
  if (clean.length === 13 && clean.startsWith("55")) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(
      4,
      9
    )}-${clean.slice(9)}`;
  }
  return OFFICIAL_WHATSAPP_DISPLAY;
}

const MagneticWrapper = ({ children, strength = 0.25, className }) => {
  const ref = useRef(null);
  const springConfig = { stiffness: 160, damping: 18, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggeredText = ({ text, color, delayOffset = 0 }) => {
  if (!text) return null;
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: delayOffset,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { ease: [0.16, 1, 0.3, 1], duration: 0.65 },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((word, i) => (
        <span key={i} className={styles.wordContainer}>
          <motion.span
            variants={wordVariants}
            className={styles.wordInner}
            style={{ color }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const IconMap = {
  instagram: TbBrandInstagram,
  linkedin: TbBrandLinkedin,
  github: TbBrandGithub,
};

export default function Contact({ content: overrideContent }) {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const [contact, setContact] = useState(
    () => overrideContent || getHomeContactContent()
  );
  const [selectedIntentId, setSelectedIntentId] = useState("system");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (overrideContent) {
      setContact(overrideContent);
    }
  }, [overrideContent]);

  useEffect(() => {
    if (overrideContent) return;
    let isMounted = true;
    async function loadRemoteContact() {
      try {
        const remoteContact = await getHomeContactContentRemote();
        if (isMounted && remoteContact) {
          setContact(remoteContact);
        }
      } catch {
        return;
      }
    }
    loadRemoteContact();
    return () => {
      isMounted = false;
    };
  }, [overrideContent]);

  // Scroll-driven motion para o plano de fundo desfocado
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const watermarkX = useTransform(smoothScroll, [0, 1], ["10%", "-16%"]);
  const signalBeamLength = useTransform(smoothScroll, [0.08, 0.62], [0, 1]);

  const rawDigits = String(contact?.whatsappNumber || "").replace(/\D/g, "");
  const activePhoneDigits =
    !rawDigits || rawDigits === "5541995424186"
      ? OFFICIAL_WHATSAPP_DIGITS
      : rawDigits;
  const displayPhone = formatBrazilPhoneDisplay(activePhoneDigits);

  const selectedIntent =
    QUICK_INTENTS.find((item) => item.id === selectedIntentId) ||
    QUICK_INTENTS[0];

  const buildWhatsappUrl = (customMessage) => {
    const msg = encodeURIComponent(customMessage || selectedIntent.message);
    return `https://wa.me/${activePhoneDigits}?text=${msg}`;
  };

  const primaryWhatsappHref = buildWhatsappUrl(selectedIntent.message);
  const contactEmail = contact?.emailAddress || "contato.thewavem@gmail.com";

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      trackAction({
        page: "home",
        section: "contact",
        action: "copy_email_secondary",
        label: contactEmail,
      });
    } catch {
      setCopied(false);
    }
  };

  const handleQuickIntentClick = (intent) => {
    setSelectedIntentId(intent.id);
    trackAction({
      page: "home",
      section: "contact",
      action: "click_whatsapp_quick_intent",
      label: intent.id,
    });
    window.open(
      buildWhatsappUrl(intent.message),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Box
      ref={sectionRef}
      id="contato"
      component="section"
      className={styles.container}
    >
      {/* 1. MARCA D'ÁGUA MONUMENTAL DESFOCADA NO FUNDO */}
      <motion.div
        aria-hidden
        style={{ x: watermarkX }}
        className={styles.spatialWatermark}
      >
        WHATSAPP OFICIAL · {OFFICIAL_WHATSAPP_DISPLAY} · DO CAFEZINHO AO CÓDIGO
      </motion.div>

      {/* 2. FEIXE DE SINAL DE PONTA A PONTA DESFOCADO NO FUNDO */}
      <div className={styles.bgSignalContainer} aria-hidden>
        <svg
          viewBox="0 0 1600 500"
          preserveAspectRatio="none"
          className={styles.bgSignalSvg}
        >
          <defs>
            <linearGradient
              id="contactSignalBeam"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
              <stop offset="30%" stopColor="#7C3AED" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#34D399" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M -40 380 C 360 360, 680 180, 1060 220 C 1320 245, 1460 140, 1640 120"
            fill="none"
            stroke="url(#contactSignalBeam)"
            strokeWidth="4.5"
            style={{ pathLength: signalBeamLength }}
          />
        </svg>
      </div>

      {/* Luzes Atmosféricas */}
      <div className={styles.ambientGlowPurple} aria-hidden />
      <div className={styles.ambientGlowEmerald} aria-hidden />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <div className={styles.grid}>
          {/* EIXO ESQUERDO: CONVITE HUMANO + ESCOLHA DE ASSUNTO EM 1 CLIQUE */}
          <div className={styles.actionAxis}>
            <span className={styles.eyebrow}>
              {contact?.eyebrow || "CONTATO SEM FRICÇÃO"}
            </span>

            <h2 className={styles.headline}>
              <StaggeredText
                text={contact?.titlePrefix || "Fale com a Wavem com"}
                color="#ffffff"
                delayOffset={0}
              />
              <br />
              <StaggeredText
                text={
                  contact?.titleHighlight || "clareza desde o primeiro clique."
                }
                color={theme.palette.primary.main}
                delayOffset={0.22}
              />
            </h2>

            <p className={styles.description}>
              Sem formulários gigantes e sem robôs de atendimento. Chame a{" "}
              <strong>nossa equipe direto no WhatsApp oficial</strong>, conte a
              sua ideia como se estivesse tomando um café com a gente e já dê o
              primeiro passo.
            </p>

            {/* Gatilhos Diretos: Clicou, já abre o WhatsApp com o assunto pronto */}
            <div className={styles.quickIntentWrapper}>
              <span className={styles.quickIntentTitle}>
                Clique no seu objetivo para já abrir a conversa:
              </span>

              {QUICK_INTENTS.map((intent) => {
                const isSelected = intent.id === selectedIntent.id;
                return (
                  <button
                    key={intent.id}
                    type="button"
                    onMouseEnter={() => setSelectedIntentId(intent.id)}
                    onFocus={() => setSelectedIntentId(intent.id)}
                    onClick={() => handleQuickIntentClick(intent)}
                    className={`${styles.quickIntentBtn} ${
                      isSelected ? styles.quickIntentBtnActive : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className={styles.intentLeftBar}
                      style={{
                        backgroundColor: intent.color,
                        boxShadow: isSelected
                          ? `0 0 12px ${intent.color}`
                          : "none",
                        opacity: isSelected ? 1 : 0.2,
                      }}
                    />

                    <span className={styles.intentLabelGroup}>
                      <TbBrandWhatsapp
                        size={17}
                        color={
                          isSelected
                            ? "#34D399"
                            : "rgba(228, 228, 231, 0.48)"
                        }
                        style={{ flexShrink: 0 }}
                      />
                      <span className={styles.intentLabelText}>
                        {intent.label}
                      </span>
                    </span>

                    <span
                      className={styles.intentActionHint}
                      style={{ opacity: isSelected ? 1 : 0.45 }}
                    >
                      <span>Abrir</span>
                      <TbArrowUpRight size={15} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* EIXO DIREITO: O GRANDE PORTAL DO WHATSAPP OFICIAL (+55 41 8841-0374) */}
          <div className={styles.presenceAxis}>
            <MagneticWrapper strength={0.12}>
              <a
                href={primaryWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackAction({
                    page: "home",
                    section: "contact",
                    action: "open_whatsapp_portal",
                    label: displayPhone,
                  })
                }
                className={styles.whatsappPortalLink}
                aria-label={`Conversar no WhatsApp oficial ${displayPhone}`}
              >
                {/* Radar / Ondas de Sinal Vetoriais atrás do Número */}
                <svg
                  viewBox="0 0 320 220"
                  className={styles.portalRadarSvg}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <circle
                    cx="220"
                    cy="110"
                    r="42"
                    stroke="rgba(52, 211, 153, 0.25)"
                    strokeWidth="1.5"
                    className={styles.radarPulseCircle}
                  />
                  <circle
                    cx="220"
                    cy="110"
                    r="68"
                    stroke="rgba(167, 139, 250, 0.22)"
                    strokeWidth="1.2"
                    className={styles.radarPulseCircleDelay}
                  />
                  <circle
                    cx="220"
                    cy="110"
                    r="92"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeDasharray="3 7"
                  />
                </svg>

                {/* Número Oficial Gigante (Nunca quebra linha) */}
                <div className={styles.whatsappOversizedNumber}>
                  {displayPhone}
                </div>

                {/* Preview da mensagem que será enviada (Altura Travada) */}
                <div className={styles.readyMessageStrip}>
                  <span className={styles.readyMessagePrefix}>
                    Mensagem pronta:
                  </span>
                  <span className={styles.readyMessageText}>
                    &ldquo;{selectedIntent.message}&rdquo;
                  </span>
                </div>

                {/* Botão de Redirecionamento Imediato */}
                <div className={styles.whatsappMainCta}>
                  <TbBrandWhatsapp size={22} />
                  <span>Chamar no WhatsApp agora</span>
                  <TbArrowUpRight size={20} />
                </div>
              </a>
            </MagneticWrapper>

            {/* OPÇÃO SECUNDÁRIA ELEGANTE: E-MAIL PROFISSIONAL + REDES SOCIAIS */}
            <div className={styles.secondaryFooterRow}>
              <div className={styles.secondaryEmailBlock}>
                <span className={styles.secondaryEmailCaption}>
                  Prefere enviar detalhes por e-mail?
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.secondaryEmailBtn}
                  title="Clique para copiar o e-mail"
                >
                  <span>{contactEmail}</span>
                  <span className={styles.copyPillHint}>
                    {copied ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          color: "#34D399",
                        }}
                      >
                        <TbCheck size={12} /> Copiado
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <TbCopy size={12} /> Copiar
                      </span>
                    )}
                  </span>
                </button>
              </div>

              <div className={styles.socialRow}>
                {contact?.socials?.map((social) => {
                  const IconComp = IconMap[social.icon] || TbArrowUpRight;
                  return (
                    <MagneticWrapper key={social.id} strength={0.4}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label={social.label}
                      >
                        <IconComp size={20} />
                      </a>
                    </MagneticWrapper>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setCopied(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", bgcolor: "#10B981", color: "#fff" }}
        >
          {contact?.emailFeedbackMessage ||
            "E-mail copiado para a área de transferência!"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
