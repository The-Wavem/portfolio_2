import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { TbArrowUpRight } from "react-icons/tb";
import { editorConfigByPageSection, pageLabelByKey } from "./editors";
import { useAdminUnsavedChanges } from "./adminUnsavedChanges.context";
import Hero from "@/section/landing/Hero";
import Portfolio from "@/section/landing/Portfolio";
import Process from "@/section/landing/Process";
import { processIconMap } from "@/section/landing/ElasticTimeline";
import ServicesHeroSection from "@/section/services/ServicesHeroSection";

import ElasticTimeline from "@/section/landing/ElasticTimeline";

function getNestedValue(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const clone = structuredClone(obj);
  let current = clone;

  for (let index = 0; index < keys.length - 1; index += 1) {
    const key = keys[index];
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return clone;
}

function normalizePreviewList(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(Boolean).slice(0, 4);
}

function getProjectsArray(draft, path) {
  const items = getNestedValue(draft, path);
  return Array.isArray(items) ? items : [];
}

function updateProjectField(draft, path, index, key, rawValue) {
  const items = getProjectsArray(draft, path);
  const nextItems = items.map((item, itemIndex) => {
    if (itemIndex !== index) {
      return item;
    }

    const nextValue =
      key === "stack"
        ? rawValue
            .split(";")
            .map((part) => part.trim())
            .filter(Boolean)
        : rawValue;

    return {
      ...item,
      [key]: nextValue,
    };
  });

  return setNestedValue(draft, path, nextItems);
}

function createEmptyProject(nextId) {
  return {
    id: nextId,
    tag: "Novo Projeto",
    title: "Título do projeto",
    summary: "Resumo rápido do projeto.",
    details: "Detalhes do contexto, decisões e resultados esperados.",
    stack: ["React"],
    href: "https://example.com",
    coverImage: "",
    accent: "#7C3AED",
    cover:
      "linear-gradient(145deg, rgba(124,58,237,0.35) 0%, rgba(8,8,8,0.35) 45%, rgba(8,8,8,0.9) 100%)",
    grid: { xs: "1 / -1", md: "1 / span 6" },
    minHeight: { xs: 300, md: 320 },
  };
}

function getMembersArray(draft, path) {
  const items = getNestedValue(draft, path);
  return Array.isArray(items) ? items : [];
}

function createEmptyMember(nextId) {
  return {
    id: nextId,
    name: "Novo colaborador",
    role: "Função",
    headline: "Resumo profissional",
    bio: "Descreva aqui a bio do colaborador.",
    accent: "#7C3AED",
    photo: "",
    specialties: ["Nova skill"],
    focuses: ["Novo aprendizado"],
  };
}

function getFaqArray(draft, path) {
  const items = getNestedValue(draft, path);
  return Array.isArray(items) ? items : [];
}

function createEmptyFaq(nextId) {
  return {
    id: `faq-${nextId}`,
    question: "Nova pergunta frequente",
    answer: "Insira a resposta aqui",
  };
}

function getStepsArray(draft, path) {
  const items = getNestedValue(draft, path);
  return Array.isArray(items) ? items : [];
}

function createEmptyStep(nextId) {
  return {
    id: nextId,
    title: "Novo Passo",
    subtitle: "Subtítulo",
    description: "Descrição do passo.",
    iconKey: "coffee",
    color: "#7C3AED"
  };
}

function createContentSnapshot(data) {
  try {
    return JSON.stringify(data);
  } catch {
    return "";
  }
}

function ProjectCoverSurface({ project, height = 120 }) {
  const [imageFailed, setImageFailed] = useState(false);
  const coverImage = project?.coverImage?.trim();

  useEffect(() => {
    setImageFailed(false);
  }, [coverImage]);

  return (
    <Box
      sx={{
        height,
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.12)",
        backgroundColor: "#0A0A0A",
        backgroundImage: project?.cover || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {coverImage && !imageFailed ? (
        <Box
          component="img"
          src={coverImage}
          alt={project?.title || "Capa do projeto"}
          onError={() => setImageFailed(true)}
          onLoad={() => setImageFailed(false)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.66) 72%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {coverImage && imageFailed ? (
        <Chip
          label="Imagem indisponível"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(220,38,38,0.2)",
            border: "1px solid rgba(220,38,38,0.45)",
            color: "#FECACA",
            fontWeight: 700,
          }}
        />
      ) : null}
    </Box>
  );
}

function CompactProjectPreviewCard({ project }) {
  return (
    <Box
      sx={{
        minHeight: 206,
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: project?.accent || "rgba(124,58,237,0.48)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <ProjectCoverSurface project={project} height={206} />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1.1,
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.88)",
            letterSpacing: 1.4,
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "0.62rem",
          }}
        >
          {project?.tag || "Projeto"}
        </Typography>

        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontSize: "0.9rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project?.title || "Título do projeto"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "rgba(228,228,231,0.8)",
              fontSize: "0.72rem",
              lineHeight: 1.45,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project?.summary || "Resumo do projeto."}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ mt: 0.8 }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 700, fontSize: "0.74rem" }}
            >
              Ver detalhes
            </Typography>
            <TbArrowUpRight color="#fff" size={14} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function SectionPreview({ config, draft }) {
  if (config.previewType === "aboutHero") {
    return (
      <Box
        sx={{
          p: 1.3,
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.14)",
          bgcolor: "rgba(255,255,255,0.02)",
        }}
      >
        <Typography
          sx={{
            color: draft.accent || "#38BDF8",
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
          }}
        >
          {draft.eyebrow || "EYEBROW"}
        </Typography>
        <Typography
          sx={{
            mt: 0.55,
            color: "#fff",
            fontWeight: 800,
            lineHeight: 1.24,
            fontSize: "0.96rem",
          }}
        >
          {draft.titleStart}{" "}
          <span style={{ color: draft.accent || "#38BDF8" }}>
            {draft.titleHighlight}
          </span>
        </Typography>
        <Typography
          sx={{
            mt: 0.7,
            color: "rgba(228,228,231,0.78)",
            fontSize: "0.82rem",
            lineHeight: 1.55,
          }}
        >
          {draft.description}
        </Typography>
      </Box>
    );
  }

  if (config.previewType === "aboutStory") {
    return (
      <Stack spacing={1.1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "#67E8F9",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.24,
              fontSize: "0.92rem",
            }}
          >
            {draft.title}
          </Typography>
          <Stack spacing={0.55} sx={{ mt: 0.8 }}>
            {normalizePreviewList(draft.paragraphs).map((item, index) => (
              <Typography
                key={`${item}-${index}`}
                sx={{ color: "rgba(228,228,231,0.78)", fontSize: "0.8rem" }}
              >
                • {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  }

  if (config.previewType === "aboutTeam") {
    return (
      <Stack spacing={1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: draft.accent || "#38BDF8",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {draft.description}
          </Typography>
          <Typography
            sx={{
              mt: 0.9,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.78rem",
            }}
          >
            Colaboradores: {(draft.members || []).length}
          </Typography>
        </Box>

        {(draft.members || []).slice(0, 4).map((member) => (
          <Box
            key={member.id || member.name}
            sx={{
              p: 1,
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.14)",
              bgcolor: "rgba(255,255,255,0.02)",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}
            >
              {member.name}
            </Typography>
            <Typography
              sx={{
                color: "rgba(228,228,231,0.7)",
                fontSize: "0.76rem",
                mt: 0.2,
              }}
            >
              {member.role}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  }

  if (config.previewType === "projectsHero") {
    return (
      <Box
        sx={{
          p: 1.3,
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.14)",
          bgcolor: "rgba(255,255,255,0.02)",
        }}
      >
        <Typography
          sx={{
            color: draft.accent || "#4ADE80",
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
          }}
        >
          {draft.eyebrow || "EYEBROW"}
        </Typography>
        <Typography
          sx={{
            mt: 0.55,
            color: "#fff",
            fontWeight: 800,
            lineHeight: 1.24,
            fontSize: "0.96rem",
          }}
        >
          {draft.titleStart}{" "}
          <span style={{ color: draft.accent || "#4ADE80" }}>
            {draft.titleHighlight}
          </span>
        </Typography>
        <Typography
          sx={{
            mt: 0.7,
            color: "rgba(228,228,231,0.78)",
            fontSize: "0.82rem",
            lineHeight: 1.55,
          }}
        >
          {draft.description}
        </Typography>
      </Box>
    );
  }

  if (config.previewType === "projectsCatalog") {
    return (
      <Stack spacing={1.1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: draft.accent || "#4ADE80",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {draft.description}
          </Typography>
        </Box>
        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>
          Projetos no catálogo: {(draft.projects || []).length}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 0.9,
          }}
        >
          {normalizePreviewList(draft.projects || []).map((item, index) => (
            <CompactProjectPreviewCard key={item.id || index} project={item} />
          ))}
        </Box>
      </Stack>
    );
  }

  if (config.previewType === "homeHero") {
    return (
      <Stack spacing={1.1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "rgba(228,228,231,0.72)",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.24,
              fontSize: "0.96rem",
            }}
          >
            {draft.titleStart}{" "}
            <span style={{ color: "#C4B5FD" }}>{draft.titleHighlight}</span>
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {draft.description}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
          {normalizePreviewList(draft.trustPills).map((item, index) => (
            <Chip
              key={`${item}-${index}`}
              label={item}
              sx={{
                bgcolor: "rgba(124,58,237,0.22)",
                color: "#EDE9FE",
                border: "1px solid rgba(124,58,237,0.45)",
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "#DDD6FE",
              fontWeight: 800,
              fontSize: "0.72rem",
              letterSpacing: "0.07em",
            }}
          >
            {draft.executionContext?.eyebrow || "CONTEXTO"}
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.84rem",
            }}
          >
            {draft.executionContext?.title}
          </Typography>
          <Stack spacing={0.55} sx={{ mt: 0.8 }}>
            {(draft.executionContext?.steps || []).map((step) => (
              <Typography
                key={step.id || step.text}
                sx={{ color: "rgba(228,228,231,0.78)", fontSize: "0.8rem" }}
              >
                {step.id ? `${step.id}. ` : ""}
                {step.text}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  }

  if (config.previewType === "homeProcess") {
    // Moved to LivePreviewWrapper
    return null;
  }

  if (config.previewType === "homePortfolio") {
    return (
      <Stack spacing={1.1}>
        <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
          {normalizePreviewList(draft.topTags).map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              label={tag}
              sx={{
                bgcolor: "rgba(251,191,36,0.14)",
                color: "#FDE68A",
                border: "1px solid rgba(251,191,36,0.35)",
              }}
            />
          ))}
        </Stack>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "rgba(228,228,231,0.72)",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.24,
              fontSize: "0.96rem",
            }}
          >
            {draft.titleStart}{" "}
            <span style={{ color: "#FCD34D" }}>{draft.titleHighlight}</span>
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {draft.description}
          </Typography>
          <Chip
            label={`${draft.cta?.label || "CTA"} → ${draft.cta?.to || "/rota"}`}
            sx={{
              mt: 1,
              bgcolor: "rgba(251,191,36,0.14)",
              color: "#FDE68A",
              border: "1px solid rgba(251,191,36,0.35)",
            }}
          />
        </Box>
      </Stack>
    );
  }

  if (config.previewType === "homeContact") {
    return (
      <Stack spacing={1.1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "rgba(228,228,231,0.72)",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.24,
              fontSize: "0.96rem",
            }}
          >
            {draft.titleStart}{" "}
            <span style={{ color: "#F9A8D4" }}>{draft.titleHighlight}</span>
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {draft.description}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{ color: "#FCE7F3", fontWeight: 700, fontSize: "0.8rem" }}
          >
            {draft.email}
          </Typography>
          <Typography
            sx={{
              mt: 0.6,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.8rem",
              lineHeight: 1.55,
            }}
          >
            {draft.quickMessage}
          </Typography>
        </Box>
      </Stack>
    );
  }

  if (config.previewType === "homeFaq") {
    return (
      <Stack spacing={1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "rgba(228,228,231,0.72)",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.24,
              fontSize: "0.96rem",
            }}
          >
            {draft.titleStart}{" "}
            <span style={{ color: "#A5B4FC" }}>{draft.titleHighlight}</span>
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              color: "rgba(228,228,231,0.78)",
              fontSize: "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {draft.description}
          </Typography>
        </Box>

        {(draft.faqs || []).slice(0, 3).map((item, index) => (
          <Box
            key={item.id || index}
            sx={{
              p: 1,
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.14)",
              bgcolor: "rgba(255,255,255,0.02)",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}
            >
              {item.question}
            </Typography>
            <Typography
              sx={{
                color: "rgba(228,228,231,0.72)",
                fontSize: "0.76rem",
                mt: 0.4,
              }}
            >
              {item.answer}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  }

  if (config.previewType === "servicesHero") {
    return (
      <Stack spacing={1.1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}
          >
            Paleta
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.9 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                bgcolor: draft.accent?.start || "#5E1624",
              }}
            />
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
                bgcolor: draft.accent?.end || "#8C2438",
              }}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{
              color: "rgba(228,228,231,0.72)",
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
            }}
          >
            {draft.eyebrow || "EYEBROW"}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              color: "#fff",
              fontWeight: 800,
              lineHeight: 1.24,
              fontSize: "0.96rem",
            }}
          >
            {draft.title}
          </Typography>
          <Stack spacing={0.45} sx={{ mt: 0.9 }}>
            {normalizePreviewList(draft.contextLines).map((line) => (
              <Typography
                key={line}
                sx={{ color: "rgba(228,228,231,0.76)", fontSize: "0.82rem" }}
              >
                {line}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
          {(draft.impactStats || []).map((item) => (
            <Chip
              key={item.id || item.label}
              label={`${item.value || "-"} ${item.label || ""}`.trim()}
              sx={{
                bgcolor: "rgba(124,58,237,0.22)",
                color: "#EDE9FE",
                border: "1px solid rgba(124,58,237,0.45)",
              }}
            />
          ))}
        </Stack>
      </Stack>
    );
  }

  if (config.previewType === "servicesHighlights") {
    return (
      <Stack spacing={1.1}>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}
          >
            Primeira semana
          </Typography>
          <Stack spacing={0.6} sx={{ mt: 0.8 }}>
            {normalizePreviewList(draft.firstWeekExpectations).map(
              (item, index) => (
                <Typography
                  key={`${item}-${index}`}
                  sx={{ color: "rgba(228,228,231,0.78)", fontSize: "0.82rem" }}
                >
                  • {item}
                </Typography>
              ),
            )}
          </Stack>
        </Box>
        <Box
          sx={{
            p: 1.3,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography
            sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}
          >
            Métricas de sucesso
          </Typography>
          <Stack spacing={0.6} sx={{ mt: 0.8 }}>
            {normalizePreviewList(draft.successMetrics).map((item, index) => (
              <Typography
                key={`${item}-${index}`}
                sx={{ color: "rgba(228,228,231,0.78)", fontSize: "0.82rem" }}
              >
                • {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    );
  }

  if (config.previewType === "servicesProcess") {
    return (
      <Stack spacing={0.9}>
        {(draft.processTimeline || []).map((step, index) => (
          <Box
            key={step.id || index}
            sx={{
              p: 1.1,
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.14)",
              bgcolor: "rgba(255,255,255,0.02)",
            }}
          >
            <Typography
              sx={{
                color: "#C4B5FD",
                fontWeight: 800,
                fontSize: "0.68rem",
                letterSpacing: "0.07em",
              }}
            >
              ETAPA {step.stage || String(index + 1).padStart(2, "0")}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.88rem",
                mt: 0.4,
              }}
            >
              {step.title}
            </Typography>
            <Typography
              sx={{ color: "rgba(228,228,231,0.72)", fontSize: "0.78rem" }}
            >
              {step.subtitle}
            </Typography>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        p: 1.3,
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.14)",
        bgcolor: "rgba(255,255,255,0.02)",
      }}
    >
      <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>
        Preview rápido
      </Typography>
      <Typography
        sx={{ mt: 0.8, color: "rgba(228,228,231,0.78)", fontSize: "0.82rem" }}
      >
        Conteúdo carregado para edição local.
      </Typography>
    </Box>
  );
}

const componentMap = {
  homeHero: Hero,
  homePortfolio: Portfolio,
  servicesHero: ServicesHeroSection,
};

function LivePreviewWrapper({ config, draft, selectableOptions }) {
  if (config.previewType === "homeProcess") {
    const steps = getStepsArray(draft, config.dynamicStepsPath);

    return (
      <Box sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        p: { xs: 2, md: 4 },
        bgcolor: "#000",
        borderRadius: "16px"
      }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            sx={{
              color: "#7C3AED",
              textTransform: "uppercase",
              fontWeight: 800,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              mb: 1
            }}
          >
            {draft.eyebrow || "METODOLOGIA"}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "2rem", md: "2.8rem" },
              lineHeight: 1.1,
            }}
          >
            {draft.titlePrefix}{" "}
            <span style={{ color: "#67E8F9" }}>{draft.titleHighlight}</span>
          </Typography>
        </Box>

        <Box sx={{ position: "relative", px: { xs: 0, md: 2 } }}>
          <ElasticTimeline steps={steps} />
        </Box>
      </Box>
    );
  }

  const Component = componentMap[config.previewType];

  if (!Component) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          bgcolor: "rgba(255,255,255,0.02)",
          borderRadius: "16px",
        }}
      >
        <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
          Preview indisponível para {config.previewType}
        </Typography>
      </Box>
    );
  }

  let previewContent = draft;

  if (config.previewType === 'homePortfolio' && selectableOptions && selectableOptions.length > 0) {
      const allProjects = selectableOptions;
      const selectedIds = Array.isArray(draft.selectedProjectIds) ? draft.selectedProjectIds : [];
      const computedProjects = selectedIds
          .map(id => allProjects.find(p => String(p.id) === String(id)))
          .filter(Boolean);
      
      previewContent = {
          ...draft,
          projects: computedProjects
      };
  }

  return (
    <Box sx={{ width: "100%", pointerEvents: "none" }}>
      <Component content={previewContent} accent={previewContent.accent || "#7C3AED"} />
    </Box>
  );
}

function ContentEditor({ config }) {
  const { setHasUnsavedChanges, registerSaveAction, setIsSaving } =
    useAdminUnsavedChanges();
  const [draft, setDraft] = useState(() =>
    structuredClone(config.getContent()),
  );
  const [savedSnapshot, setSavedSnapshot] = useState(() =>
    createContentSnapshot(config.getContent()),
  );
  const [selectableOptions, setSelectableOptions] = useState([]);
  const [savedMessage, setSavedMessage] = useState(null);
  const [saveErrorMessage, setSaveErrorMessage] = useState("");
  const [isLoadingRemote, setIsLoadingRemote] = useState(false);
  const [isSavingRemote, setIsSavingRemote] = useState(false);
  const [dataMode, setDataMode] = useState(
    config.loadRemote ? "firebase" : "local",
  );
  const [memberModalIndex, setMemberModalIndex] = useState(null);
  const [projectModalIndex, setProjectModalIndex] = useState(null);
  const [faqModalIndex, setFaqModalIndex] = useState(null);
  const [stepModalIndex, setStepModalIndex] = useState(null);
  const [draggedProjectId, setDraggedProjectId] = useState(null);

  const savedContent = useMemo(() => {
    try {
      return JSON.parse(savedSnapshot);
    } catch {
      return {};
    }
  }, [savedSnapshot]);

  const savedSteps = useMemo(() => {
    if (!config.dynamicStepsPath) return [];
    return getStepsArray(savedContent, config.dynamicStepsPath);
  }, [savedContent, config.dynamicStepsPath]);

  useEffect(() => {
    let isMounted = true;
    const initialData = structuredClone(config.getContent());
    setDraft(initialData);
    setSavedSnapshot(createContentSnapshot(initialData));
    setSavedMessage(null);
    setSaveErrorMessage("");
    setDataMode(config.loadRemote ? "firebase" : "local");
    setMemberModalIndex(null);
    setProjectModalIndex(null);
    setFaqModalIndex(null);
    setStepModalIndex(null);

    async function loadRemoteContent() {
      if (!config.loadRemote) {
        return;
      }

      setIsLoadingRemote(true);

      try {
        const remoteData = await config.loadRemote();
        if (!isMounted) {
          return;
        }

        if (remoteData) {
          setDraft(structuredClone(remoteData));
          setSavedSnapshot(createContentSnapshot(remoteData));
          setDataMode("firebase");
        } else {
          setDataMode("local");
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setDataMode("local");
      } finally {
        if (isMounted) {
          setIsLoadingRemote(false);
        }
      }
    }

    loadRemoteContent();

    let isSourceMounted = true;
    if (config.selectableProjectsSource) {
      const source = config.selectableProjectsSource();
      if (source instanceof Promise) {
        source.then(data => {
            if (isSourceMounted) setSelectableOptions(data || []);
        });
      } else {
        setSelectableOptions(source || []);
      }
    } else {
      setSelectableOptions([]);
    }

    return () => {
      isMounted = false;
      isSourceMounted = false;
    };
  }, [config]);

  const currentSnapshot = useMemo(() => createContentSnapshot(draft), [draft]);
  const hasUnsavedChanges = currentSnapshot !== savedSnapshot;

  useEffect(() => {
    setHasUnsavedChanges(hasUnsavedChanges);

    return () => {
      setHasUnsavedChanges(false);
    };
  }, [hasUnsavedChanges, setHasUnsavedChanges]);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return undefined;
    }

    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  function handleChange(field, rawValue) {
    const value = field.arraySeparator
      ? rawValue.split(field.arraySeparator)
      : rawValue;

    setDraft((current) => setNestedValue(current, field.path, value));
  }

  function displayValue(field) {
    const value = getNestedValue(draft, field.path);
    if (Array.isArray(value)) {
      return value.join(field.arraySeparator || ";");
    }

    return value ?? "";
  }

  const handleSave = useCallback(async () => {
    setSavedMessage(null);
    setSaveErrorMessage("");

    if (!config.saveRemote) {
      setSavedSnapshot(currentSnapshot);
      setSavedMessage("local");
      return;
    }

    setIsSavingRemote(true);
    setIsSaving(true);

    try {
      const draftToSave = structuredClone(draft);
      config.fields?.forEach(field => {
        if (field.arraySeparator) {
          const val = getNestedValue(draftToSave, field.path);
          if (Array.isArray(val)) {
            setNestedValue(draftToSave, field.path, val.map(v => v.trim()).filter(Boolean));
          }
        }
      });
      const response = await config.saveRemote(draftToSave);
      if (response?.ok) {
        setSavedSnapshot(currentSnapshot);
        setSavedMessage("firebase");
        setDataMode("firebase");
        return;
      }

      setSavedMessage("local");
      setDataMode("local");
      setSaveErrorMessage(
        "Não foi possível salvar no Firebase agora. O rascunho continua local.",
      );
    } catch {
      setSavedMessage("local");
      setDataMode("local");
      setSaveErrorMessage(
        "Falha ao conectar com o Firebase. O rascunho continua local.",
      );
    } finally {
      setIsSavingRemote(false);
      setIsSaving(false);
    }
  }, [config, draft, currentSnapshot, setIsSaving]);

  useEffect(() => {
    registerSaveAction(handleSave);
  }, [registerSaveAction, handleSave]);

  function handleProjectChange(index, key, value) {
    if (!config.dynamicProjectsPath) {
      return;
    }

    setDraft((current) =>
      updateProjectField(
        current,
        config.dynamicProjectsPath,
        index,
        key,
        value,
      ),
    );
  }

  function handleAddProject() {
    if (!config.dynamicProjectsPath) {
      return;
    }

    setDraft((current) => {
      const projects = getProjectsArray(current, config.dynamicProjectsPath);
      const nextId = projects.length
        ? Math.max(...projects.map((item) => Number(item.id) || 0)) + 1
        : 1;
      const nextProjects = [...projects, createEmptyProject(nextId)];
      return setNestedValue(current, config.dynamicProjectsPath, nextProjects);
    });
  }

  function handleRemoveProject(index) {
    if (!config.dynamicProjectsPath) {
      return;
    }

    setDraft((current) => {
      const projects = getProjectsArray(current, config.dynamicProjectsPath);
      const nextProjects = projects.filter(
        (_, itemIndex) => itemIndex !== index,
      );
      return setNestedValue(current, config.dynamicProjectsPath, nextProjects);
    });
    setProjectModalIndex(null);
  }

  function handleAddMember() {
    if (!config.dynamicMembersPath) {
      return;
    }

    setDraft((current) => {
      const members = getMembersArray(current, config.dynamicMembersPath);
      const nextId = members.length
        ? Math.max(...members.map((item) => Number(item.id) || 0)) + 1
        : 1;
      const nextMembers = [...members, createEmptyMember(nextId)];
      return setNestedValue(current, config.dynamicMembersPath, nextMembers);
    });
  }

  function handleRemoveMember(index) {
    if (!config.dynamicMembersPath) {
      return;
    }

    setDraft((current) => {
      const members = getMembersArray(current, config.dynamicMembersPath);
      const nextMembers = members.filter((_, itemIndex) => itemIndex !== index);
      return setNestedValue(current, config.dynamicMembersPath, nextMembers);
    });
    setMemberModalIndex(null);
  }

  function handleMemberFieldChange(index, key, rawValue) {
    if (!config.dynamicMembersPath) {
      return;
    }

    setDraft((current) => {
      const members = getMembersArray(current, config.dynamicMembersPath);
      const nextMembers = members.map((member, memberIndex) => {
        if (memberIndex !== index) {
          return member;
        }

        const nextValue =
          key === "specialties" || key === "focuses"
            ? rawValue
                .split(";")
                .map((part) => part.trim())
                .filter(Boolean)
            : rawValue;

        return {
          ...member,
          [key]: nextValue,
        };
      });

      return setNestedValue(current, config.dynamicMembersPath, nextMembers);
    });
  }

  function handleAddFaq() {
    if (!config.dynamicFaqPath) {
      return;
    }

    setDraft((current) => {
      const faqs = getFaqArray(current, config.dynamicFaqPath);
      const nextId = faqs.length + 1;
      const nextFaqs = [...faqs, createEmptyFaq(nextId)];
      return setNestedValue(current, config.dynamicFaqPath, nextFaqs);
    });
  }

  function handleRemoveFaq(index) {
    if (!config.dynamicFaqPath) {
      return;
    }

    setDraft((current) => {
      const faqs = getFaqArray(current, config.dynamicFaqPath);
      const nextFaqs = faqs.filter((_, itemIndex) => itemIndex !== index);
      return setNestedValue(current, config.dynamicFaqPath, nextFaqs);
    });
    setFaqModalIndex(null);
  }

  function handleFaqFieldChange(index, key, rawValue) {
    if (!config.dynamicFaqPath) {
      return;
    }

    setDraft((current) => {
      const faqs = getFaqArray(current, config.dynamicFaqPath);
      const nextFaqs = faqs.map((faq, faqIndex) => {
        if (faqIndex !== index) {
          return faq;
        }

        return {
          ...faq,
          [key]: rawValue,
        };
      });

      return setNestedValue(current, config.dynamicFaqPath, nextFaqs);
    });
  }

  function handleAddStep() {
    if (!config.dynamicStepsPath) {
      return;
    }

    setDraft((current) => {
      const steps = getStepsArray(current, config.dynamicStepsPath);
      const nextId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1;
      const nextSteps = [...steps, createEmptyStep(nextId)];
      return setNestedValue(current, config.dynamicStepsPath, nextSteps);
    });
  }

  function handleRemoveStep(index) {
    if (!config.dynamicStepsPath) {
      return;
    }

    setDraft((current) => {
      const steps = getStepsArray(current, config.dynamicStepsPath);
      const nextSteps = steps.filter((_, itemIndex) => itemIndex !== index);
      return setNestedValue(current, config.dynamicStepsPath, nextSteps);
    });
    setStepModalIndex(null);
  }

  function handleStepFieldChange(index, key, rawValue) {
    if (!config.dynamicStepsPath) {
      return;
    }

    setDraft((current) => {
      const steps = getStepsArray(current, config.dynamicStepsPath);
      const nextSteps = steps.map((step, stepIndex) => {
        if (stepIndex !== index) {
          return step;
        }

        return {
          ...step,
          [key]: rawValue,
        };
      });

      return setNestedValue(current, config.dynamicStepsPath, nextSteps);
    });
  }

  function handleToggleSelectedProject(projectId) {
    if (!config.selectableProjectsPath) {
      return;
    }

    setDraft((current) => {
      const currentIds = getNestedValue(current, config.selectableProjectsPath);
      const normalizedIds = Array.isArray(currentIds)
        ? currentIds.map((id) => Number(id)).filter(Number.isFinite)
        : [];
      const numericProjectId = Number(projectId);
      const hasId = normalizedIds.includes(numericProjectId);
      const nextIds = hasId
        ? normalizedIds.filter((id) => id !== numericProjectId)
        : [...normalizedIds, numericProjectId];

      return setNestedValue(current, config.selectableProjectsPath, nextIds);
    });
  }

  function handleDropSelectedProject(targetProjectId) {
    if (!config.selectableProjectsPath || draggedProjectId === null) {
      return;
    }

    const draggedId = String(draggedProjectId);
    const targetId = String(targetProjectId);

    if (draggedId === targetId) {
      return;
    }

    setDraft((current) => {
      const currentIds = getNestedValue(current, config.selectableProjectsPath);
      const normalizedIds = Array.isArray(currentIds)
        ? currentIds.map((id) => String(id))
        : [];

      const draggedIndex = normalizedIds.indexOf(draggedId);
      const targetIndex = normalizedIds.indexOf(targetId);

      if (draggedIndex === -1 || targetIndex === -1) {
        return current;
      }

      const reordered = [...normalizedIds];
      reordered.splice(draggedIndex, 1);
      reordered.splice(targetIndex, 0, draggedId);

      return setNestedValue(current, config.selectableProjectsPath, reordered);
    });
  }

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          p: { xs: 2.4, md: 3.2 },
          borderRadius: "18px",
          border: hasUnsavedChanges
            ? "1px solid rgba(251,191,36,0.48)"
            : "1px solid rgba(255,255,255,0.08)",
          background: hasUnsavedChanges
            ? "linear-gradient(160deg, rgba(251,191,36,0.08), rgba(25,25,28,0.98) 28%, rgba(10,10,12,0.98) 100%)"
            : "linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))",
          boxShadow: hasUnsavedChanges
            ? "0 12px 28px rgba(251,191,36,0.08)"
            : "none",
          transition:
            "border-color 180ms ease, background 180ms ease, box-shadow 180ms ease",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1.2}
        >
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 900,
                fontSize: { xs: "1.35rem", md: "1.6rem" },
                letterSpacing: "-0.02em",
              }}
            >
              {config.title}
            </Typography>
            <Typography
              sx={{ mt: 0.6, color: "rgba(228,228,231,0.74)", maxWidth: 760 }}
            >
              {config.description}
            </Typography>
          </Box>
          <Chip
            label={
              isLoadingRemote
                ? "Carregando Firebase..."
                : dataMode === "firebase"
                  ? "Modo Firebase (ativo)"
                  : "Modo local (fallback)"
            }
            sx={{
              alignSelf: "flex-start",
              bgcolor:
                dataMode === "firebase"
                  ? "rgba(16,185,129,0.18)"
                  : "rgba(124,58,237,0.22)",
              border:
                dataMode === "firebase"
                  ? "1px solid rgba(16,185,129,0.45)"
                  : "1px solid rgba(124,58,237,0.45)",
              color: dataMode === "firebase" ? "#D1FAE5" : "#DDD6FE",
              fontWeight: 700,
            }}
          />
        </Stack>

        {hasUnsavedChanges ? (
          <Alert
            severity="warning"
            sx={{
              mt: 1.2,
              borderRadius: "12px",
              bgcolor: "rgba(251,191,36,0.14)",
              color: "#FDE68A",
              border: "1px solid rgba(251,191,36,0.35)",
            }}
          >
            Você tem alterações não salvas nesta seção.
          </Alert>
        ) : null}

        <Box
          sx={{
            mt: 2.2,
        display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              xl: "minmax(0, 1.55fr) minmax(280px, 0.75fr)",
            },
            gap: 1.6,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.4,
            }}
          >
            {config.fields.map((field, index) => {
              if (field.type === "heading") {
                return (
                  <Box
                    key={`${field.label}-${index}`}
                    sx={{
                      gridColumn: "1 / -1",
                      mt: index === 0 ? 0 : 0.8,
                      px: 1.1,
                      py: 0.75,
                      borderRadius: "10px",
                      border: "1px solid rgba(124,58,237,0.3)",
                      bgcolor: "rgba(124,58,237,0.12)",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#DDD6FE",
                        fontWeight: 800,
                        fontSize: "0.84rem",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {field.label}
                    </Typography>
                  </Box>
                );
              }

              return (
                <Box
                  key={field.path}
                  sx={{ gridColumn: field.fullWidth ? "1 / -1" : "auto" }}
                >
                  <TextField
                    label={field.label}
                    fullWidth
                    multiline={field.multiline}
                    rows={field.rows}
                    value={displayValue(field)}
                    onChange={(event) =>
                      handleChange(field, event.target.value)
                    }
                    sx={{
                      "& .MuiInputBase-root": {
                        bgcolor: "rgba(7,7,8,0.86)",
                        borderRadius: "14px",
                        color: "#F5F5F5",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.16)",
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(228,228,231,0.74)",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#C4B5FD",
                      },
                    }}
                  />
                </Box>
              );
            })}

            {config.dynamicProjectsPath ? (
              <Box sx={{ gridColumn: "1 / -1", mt: 0.6 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.1 }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 800, fontSize: "0.96rem" }}
                  >
                    Projetos do catálogo
                  </Typography>
                  <Button
                    onClick={handleAddProject}
                    variant="outlined"
                    sx={{
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#EDE9FE",
                      borderColor: "rgba(124,58,237,0.48)",
                    }}
                  >
                    Adicionar projeto
                  </Button>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.2,
                  }}
                >
                  {getProjectsArray(draft, config.dynamicProjectsPath).map(
                    (project, index) => (
                      <Box
                        key={project.id || index}
                        sx={{
                          p: 1.2,
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.14)",
                          bgcolor: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "0.86rem",
                              }}
                            >
                              {project.title || `Projeto ${index + 1}`}
                            </Typography>
                            <Typography
                              sx={{
                                color: "rgba(228,228,231,0.72)",
                                fontSize: "0.78rem",
                                mt: 0.2,
                              }}
                            >
                              {project.tag || "Sem tag"}
                            </Typography>
                          </Box>
                          <Button
                            onClick={() => setProjectModalIndex(index)}
                            sx={{
                              borderRadius: "999px",
                              textTransform: "none",
                              fontWeight: 700,
                              color: "#DDD6FE",
                              border: "1px solid rgba(124,58,237,0.4)",
                              px: 1.2,
                              minWidth: 0,
                            }}
                          >
                            Editar
                          </Button>
                        </Stack>

                        <Typography
                          sx={{
                            mt: 0.8,
                            color: "rgba(228,228,231,0.68)",
                            fontSize: "0.78rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {project.summary || "Sem resumo ainda."}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            ) : null}

            {config.dynamicMembersPath ? (
              <Box sx={{ gridColumn: "1 / -1", mt: 0.6 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.1 }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 800, fontSize: "0.96rem" }}
                  >
                    Cards dos colaboradores
                  </Typography>
                  <Button
                    onClick={handleAddMember}
                    variant="outlined"
                    sx={{
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#E0F2FE",
                      borderColor: "rgba(56,189,248,0.48)",
                    }}
                  >
                    Adicionar colaborador
                  </Button>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.2,
                  }}
                >
                  {getMembersArray(draft, config.dynamicMembersPath).map(
                    (member, index) => (
                      <Box
                        key={member.id || index}
                        sx={{
                          p: 1.2,
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.14)",
                          bgcolor: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "0.86rem",
                              }}
                            >
                              {member.name || `Colaborador ${index + 1}`}
                            </Typography>
                            <Typography
                              sx={{
                                color: "rgba(228,228,231,0.72)",
                                fontSize: "0.78rem",
                                mt: 0.2,
                              }}
                            >
                              {member.role || "Função não definida"}
                            </Typography>
                          </Box>
                          <Button
                            onClick={() => setMemberModalIndex(index)}
                            sx={{
                              borderRadius: "999px",
                              textTransform: "none",
                              fontWeight: 700,
                              color: "#DDD6FE",
                              border: "1px solid rgba(124,58,237,0.4)",
                              px: 1.2,
                              minWidth: 0,
                            }}
                          >
                            Editar
                          </Button>
                        </Stack>

                        <Typography
                          sx={{
                            mt: 0.8,
                            color: "rgba(228,228,231,0.68)",
                            fontSize: "0.78rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {member.headline || "Sem headline ainda."}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            ) : null}

            {config.dynamicFaqPath ? (
              <Box sx={{ gridColumn: "1 / -1", mt: 0.6 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.1 }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 800, fontSize: "0.96rem" }}
                  >
                    Perguntas do FAQ
                  </Typography>
                  <Button
                    onClick={handleAddFaq}
                    variant="outlined"
                    sx={{
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#C7D2FE",
                      borderColor: "rgba(99,102,241,0.45)",
                    }}
                  >
                    Adicionar FAQ
                  </Button>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.2,
                  }}
                >
                  {getFaqArray(draft, config.dynamicFaqPath).map(
                    (faq, index) => (
                      <Box
                        key={faq.id || index}
                        sx={{
                          p: 1.2,
                          borderRadius: "12px",
                          border: "1px solid rgba(255,255,255,0.14)",
                          bgcolor: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                        >
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 800,
                              fontSize: "0.84rem",
                            }}
                          >
                            {faq.question || `FAQ ${index + 1}`}
                          </Typography>
                          <Button
                            onClick={() => setFaqModalIndex(index)}
                            sx={{
                              borderRadius: "999px",
                              textTransform: "none",
                              fontWeight: 700,
                              color: "#DDD6FE",
                              border: "1px solid rgba(124,58,237,0.4)",
                              px: 1.2,
                              minWidth: 0,
                            }}
                          >
                            Editar
                          </Button>
                        </Stack>

                        <Typography
                          sx={{
                            mt: 0.8,
                            color: "rgba(228,228,231,0.68)",
                            fontSize: "0.78rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {faq.answer || "Sem resposta ainda."}
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            ) : null}

            {config.dynamicStepsPath ? (
              <Box sx={{ gridColumn: "1 / -1", mt: 0.6 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.1 }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 800, fontSize: "0.96rem" }}
                  >
                    Passos do Processo
                  </Typography>
                  <Button
                    onClick={handleAddStep}
                    variant="outlined"
                    sx={{
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#C7D2FE",
                      borderColor: "rgba(99,102,241,0.45)",
                    }}
                  >
                    Adicionar Passo
                  </Button>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.2,
                  }}
                >
                  {getStepsArray(draft, config.dynamicStepsPath).map((step, index) => {
                    const IconComponent = processIconMap[step.iconKey] || processIconMap.coffee;
                    const isMoved = savedSteps[index]?.id !== step.id;

                    return (
                      <Box
                        key={step.id || index}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", index);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                          const toIndex = index;
                          
                          if (fromIndex === toIndex || isNaN(fromIndex)) return;
                          
                          const newSteps = [...getStepsArray(draft, config.dynamicStepsPath)];
                          const [movedStep] = newSteps.splice(fromIndex, 1);
                          newSteps.splice(toIndex, 0, movedStep);
                          
                          setDraft(setNestedValue(draft, config.dynamicStepsPath, newSteps));
                        }}
                        sx={{
                          p: 2.5,
                          bgcolor: "rgba(255,255,255,0.02)",
                          border: isMoved ? `1px solid ${step.color || "#7C3AED"}` : "1px solid rgba(255,255,255,0.1)",
                          boxShadow: isMoved ? `0 0 20px -5px ${step.color || "#7C3AED"}40` : "none",
                          borderRadius: "12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          cursor: "grab",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:active": {
                            cursor: "grabbing",
                            transform: "scale(0.98)"
                          },
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.04)",
                            borderColor: isMoved ? (step.color || "#7C3AED") : "rgba(255,255,255,0.2)"
                          }
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                          
                          {/* Position Indicator Badge */}
                          <Typography
                            sx={{
                              position: "absolute",
                              top: -34,
                              right: -10,
                              fontWeight: 900,
                              fontSize: "3rem",
                              color: "rgba(255,255,255,0.03)",
                              pointerEvents: "none",
                              userSelect: "none",
                              zIndex: 0
                            }}
                          >
                            #{index + 1}
                          </Typography>

                          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ zIndex: 1 }}>
                            <Box sx={{
                              p: 1,
                              borderRadius: "8px",
                              background: "rgba(255,255,255,0.05)",
                              color: step.color || "#7C3AED",
                              border: "1px solid rgba(255,255,255,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <IconComponent size={20} />
                            </Box>
                            <Box>
                              <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                                {step.title || "Novo Passo"}
                              </Typography>
                              <Typography sx={{ color: step.color || "#7C3AED", fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                                {step.subtitle || "Subtítulo"}
                              </Typography>
                            </Box>
                          </Stack>
                          <Button
                            size="small"
                            onClick={() => setStepModalIndex(index)}
                            sx={{
                              color: "#fff",
                              textTransform: "none",
                              fontWeight: 600,
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: "8px",
                              px: 2,
                            }}
                          >
                            Editar
                          </Button>
                        </Box>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.85rem",
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {step.description || "Descrição do passo"}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ) : null}

            {config.selectableProjectsPath &&
            config.selectableProjectsSource ? (
              <Box sx={{ gridColumn: "1 / -1", mt: 0.6 }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.96rem",
                    mb: 1.1,
                  }}
                >
                  Projetos exibidos na Home
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(228,228,231,0.68)",
                    fontSize: "0.8rem",
                    mb: 1.6,
                  }}
                >
                  Selecione e ordene os projetos exibidos. A ordem das tags reflete a tela.
                </Typography>

                <Autocomplete
                  multiple
                  options={selectableOptions}
                  getOptionLabel={(option) => option.title}
                  value={
                    (Array.isArray(getNestedValue(draft, config.selectableProjectsPath)) ? getNestedValue(draft, config.selectableProjectsPath) : [])
                      .map(id => selectableOptions.find(p => String(p.id) === String(id)))
                      .filter(Boolean)
                  }
                  onChange={(event, newValue) => {
                    const newIds = newValue.map(project => String(project.id));
                    handleChange({ path: config.selectableProjectsPath, arraySeparator: null }, newIds);
                  }}
                  isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Buscar e selecionar..."
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#F5F5F5",
                          borderRadius: "14px",
                          bgcolor: "rgba(255,255,255,0.03)",
                        }
                      }}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const tagProps = getTagProps({ index });
                      return (
                        <Chip
                          {...tagProps}
                          key={option.id}
                          label={option.title}
                          sx={{ bgcolor: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                      );
                    })
                  }
                />

                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.84rem",
                    mb: 1,
                    mt: 3,
                  }}
                >
                  Ordem de Exibição (Arraste horizontalmente)
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    overflowX: "auto",
                    pb: 2,
                    "&::-webkit-scrollbar": { height: "6px" },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: "3px" }
                  }}
                >
                  {(() => {
                    const selectedIds = getNestedValue(
                      draft,
                      config.selectableProjectsPath,
                    );
                    const normalizedSelectedIds = Array.isArray(selectedIds)
                      ? selectedIds.map(String)
                      : [];
                    
                    return normalizedSelectedIds.map((projectId, index) => {
                      const project = selectableOptions.find(p => String(p.id) === projectId);

                      if (!project) return null;

                      return (
                        <Box
                          key={`drag-card-${project.id}`}
                          draggable
                          onDragStart={(event) => {
                            setDraggedProjectId(project.id);
                            event.dataTransfer.effectAllowed = "move";
                          }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={(event) => {
                            event.preventDefault();
                            handleDropSelectedProject(project.id);
                            setDraggedProjectId(null);
                          }}
                          onDragEnd={() => setDraggedProjectId(null)}
                          sx={{
                            flex: "0 0 auto",
                            width: "220px",
                            p: 1.5,
                            borderRadius: "12px",
                            bgcolor: draggedProjectId === project.id ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)",
                            border: draggedProjectId === project.id ? "1px dashed rgba(124,58,237,0.8)" : "1px solid rgba(255,255,255,0.1)",
                            cursor: "grab",
                            "&:active": { cursor: "grabbing" },
                            transition: "all 0.2s"
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Box sx={{ width: 24, height: 24, borderRadius: "50%", bgcolor: "rgba(124,58,237,0.2)", color: "#A78BFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 }}>
                              {index + 1}
                            </Box>
                            <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>
                              Arrastar
                            </Typography>
                          </Stack>
                          <Typography sx={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {project.title}
                          </Typography>
                        </Box>
                      );
                    });
                  })()}
                </Box>

              </Box>
            ) : null}
          </Box>
        </Box>

        {savedMessage ? (
          <Alert
            severity={savedMessage === "firebase" ? "success" : "info"}
            onClose={() => setSavedMessage(null)}
            sx={{
              mt: 1.6,
              borderRadius: "12px",
              bgcolor:
                savedMessage === "firebase"
                  ? "rgba(16,185,129,0.16)"
                  : "rgba(124,58,237,0.14)",
              color: savedMessage === "firebase" ? "#D1FAE5" : "#DDD6FE",
              border:
                savedMessage === "firebase"
                  ? "1px solid rgba(16,185,129,0.38)"
                  : "1px solid rgba(124,58,237,0.35)",
            }}
          >
            {savedMessage === "firebase"
              ? "Conteúdo salvo no Firebase com sucesso."
              : "Rascunho salvo localmente (fallback)."}
          </Alert>
        ) : null}

        {saveErrorMessage ? (
          <Alert
            severity="warning"
            onClose={() => setSaveErrorMessage("")}
            sx={{
              mt: 1.1,
              borderRadius: "12px",
              bgcolor: "rgba(245,158,11,0.12)",
              color: "#FDE68A",
              border: "1px solid rgba(245,158,11,0.35)",
            }}
          >
            {saveErrorMessage}
          </Alert>
        ) : null}

        {config.dynamicMembersPath ? (
          <Dialog
            open={memberModalIndex !== null}
            onClose={() => setMemberModalIndex(null)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "18px",
                bgcolor: "rgba(12,12,14,0.98)",
                border: "1px solid rgba(255,255,255,0.12)",
              },
            }}
          >
            <DialogTitle sx={{ color: "#fff", fontWeight: 800 }}>
              Editar colaborador
            </DialogTitle>
            <DialogContent>
              {(() => {
                const members = getMembersArray(
                  draft,
                  config.dynamicMembersPath,
                );
                const member =
                  memberModalIndex !== null ? members[memberModalIndex] : null;

                if (!member) {
                  return null;
                }

                return (
                  <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 1.1,
                      }}
                    >
                      <TextField
                        label="ID"
                        value={member.id ?? ""}
                        onChange={(event) =>
                          handleMemberFieldChange(
                            memberModalIndex,
                            "id",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <TextField
                        label="Accent (hex)"
                        value={member.accent ?? ""}
                        onChange={(event) =>
                          handleMemberFieldChange(
                            memberModalIndex,
                            "accent",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <TextField
                        label="Nome"
                        value={member.name ?? ""}
                        onChange={(event) =>
                          handleMemberFieldChange(
                            memberModalIndex,
                            "name",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <TextField
                        label="Função"
                        value={member.role ?? ""}
                        onChange={(event) =>
                          handleMemberFieldChange(
                            memberModalIndex,
                            "role",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Headline"
                          fullWidth
                          value={member.headline ?? ""}
                          onChange={(event) =>
                            handleMemberFieldChange(
                              memberModalIndex,
                              "headline",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Bio"
                          fullWidth
                          multiline
                          rows={4}
                          value={member.bio ?? ""}
                          onChange={(event) =>
                            handleMemberFieldChange(
                              memberModalIndex,
                              "bio",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Especialidades (separadas por ;)"
                          fullWidth
                          value={
                            Array.isArray(member.specialties)
                              ? member.specialties.join("; ")
                              : ""
                          }
                          onChange={(event) =>
                            handleMemberFieldChange(
                              memberModalIndex,
                              "specialties",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Focos / Aprendizados (separados por ;)"
                          fullWidth
                          value={
                            Array.isArray(member.focuses)
                              ? member.focuses.join("; ")
                              : ""
                          }
                          onChange={(event) =>
                            handleMemberFieldChange(
                              memberModalIndex,
                              "focuses",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ pt: 0.4 }}
                    >
                      <Button
                        onClick={() => handleRemoveMember(memberModalIndex)}
                        sx={{
                          color: "#FCA5A5",
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        Remover colaborador
                      </Button>
                      <Button
                        onClick={() => setMemberModalIndex(null)}
                        variant="contained"
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 700,
                          bgcolor: "#7C3AED",
                          "&:hover": { bgcolor: "#6D28D9" },
                        }}
                      >
                        Fechar
                      </Button>
                    </Stack>
                  </Stack>
                );
              })()}
            </DialogContent>
          </Dialog>
        ) : null}

        {config.dynamicProjectsPath ? (
          <Dialog
            open={projectModalIndex !== null}
            onClose={() => setProjectModalIndex(null)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "18px",
                bgcolor: "rgba(12,12,14,0.98)",
                border: "1px solid rgba(255,255,255,0.12)",
              },
            }}
          >
            <DialogTitle sx={{ color: "#fff", fontWeight: 800 }}>
              Editar projeto
            </DialogTitle>
            <DialogContent>
              {(() => {
                const projects = getProjectsArray(
                  draft,
                  config.dynamicProjectsPath,
                );
                const project =
                  projectModalIndex !== null
                    ? projects[projectModalIndex]
                    : null;

                if (!project) {
                  return null;
                }

                return (
                  <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 1.1,
                      }}
                    >
                      <TextField
                        label="ID"
                        value={project.id ?? ""}
                        onChange={(event) =>
                          handleProjectChange(
                            projectModalIndex,
                            "id",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <TextField
                        label="Tag"
                        value={project.tag ?? ""}
                        onChange={(event) =>
                          handleProjectChange(
                            projectModalIndex,
                            "tag",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Título"
                          fullWidth
                          value={project.title ?? ""}
                          onChange={(event) =>
                            handleProjectChange(
                              projectModalIndex,
                              "title",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Resumo"
                          fullWidth
                          multiline
                          rows={2}
                          value={project.summary ?? ""}
                          onChange={(event) =>
                            handleProjectChange(
                              projectModalIndex,
                              "summary",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Detalhes"
                          fullWidth
                          multiline
                          rows={3}
                          value={project.details ?? ""}
                          onChange={(event) =>
                            handleProjectChange(
                              projectModalIndex,
                              "details",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <TextField
                        label="Stack (separada por ;)"
                        value={
                          Array.isArray(project.stack)
                            ? project.stack.join("; ")
                            : ""
                        }
                        onChange={(event) =>
                          handleProjectChange(
                            projectModalIndex,
                            "stack",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <TextField
                        label="Accent (hex)"
                        value={project.accent ?? ""}
                        onChange={(event) =>
                          handleProjectChange(
                            projectModalIndex,
                            "accent",
                            event.target.value,
                          )
                        }
                        sx={{
                          "& .MuiInputBase-root": {
                            bgcolor: "rgba(7,7,8,0.86)",
                            borderRadius: "12px",
                            color: "#F5F5F5",
                          },
                        }}
                      />
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Link do projeto"
                          fullWidth
                          value={project.href ?? ""}
                          onChange={(event) =>
                            handleProjectChange(
                              projectModalIndex,
                              "href",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <TextField
                          label="Imagem de capa (URL)"
                          fullWidth
                          value={project.coverImage ?? ""}
                          onChange={(event) =>
                            handleProjectChange(
                              projectModalIndex,
                              "coverImage",
                              event.target.value,
                            )
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              bgcolor: "rgba(7,7,8,0.86)",
                              borderRadius: "12px",
                              color: "#F5F5F5",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ gridColumn: "1 / -1" }}>
                        <Typography
                          sx={{
                            color: "rgba(228,228,231,0.76)",
                            fontSize: "0.78rem",
                            mb: 0.7,
                          }}
                        >
                          Pré-visualização da capa
                        </Typography>
                        <Box sx={{ position: "relative" }}>
                          <ProjectCoverSurface project={project} height={150} />
                          <Box
                            sx={{
                              position: "absolute",
                              left: 10,
                              right: 10,
                              bottom: 10,
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                lineHeight: 1.2,
                              }}
                            >
                              {project.title || "Título do projeto"}
                            </Typography>
                            <Typography
                              sx={{
                                color: "rgba(228,228,231,0.78)",
                                fontSize: "0.72rem",
                                mt: 0.25,
                              }}
                            >
                              {project.coverImage?.trim()
                                ? "Imagem via URL"
                                : "Fallback: gradiente configurado"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ pt: 0.4 }}
                    >
                      <Button
                        onClick={() => handleRemoveProject(projectModalIndex)}
                        sx={{
                          color: "#FCA5A5",
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        Remover projeto
                      </Button>
                      <Button
                        onClick={() => setProjectModalIndex(null)}
                        variant="contained"
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 700,
                          bgcolor: "#7C3AED",
                          "&:hover": { bgcolor: "#6D28D9" },
                        }}
                      >
                        Fechar
                      </Button>
                    </Stack>
                  </Stack>
                );
              })()}
            </DialogContent>
          </Dialog>
        ) : null}

        {config.dynamicFaqPath ? (
          <Dialog
            open={faqModalIndex !== null}
            onClose={() => setFaqModalIndex(null)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "18px",
                bgcolor: "rgba(12,12,14,0.98)",
                border: "1px solid rgba(255,255,255,0.12)",
              },
            }}
          >
            <DialogTitle sx={{ color: "#fff", fontWeight: 800 }}>
              Editar pergunta do FAQ
            </DialogTitle>
            <DialogContent>
              {(() => {
                const faqs = getFaqArray(draft, config.dynamicFaqPath);
                const faq = faqModalIndex !== null ? faqs[faqModalIndex] : null;

                if (!faq) {
                  return null;
                }

                return (
                  <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                    <TextField
                      label="ID"
                      value={faq.id ?? ""}
                      onChange={(event) =>
                        handleFaqFieldChange(
                          faqModalIndex,
                          "id",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />
                    <TextField
                      label="Pergunta"
                      fullWidth
                      value={faq.question ?? ""}
                      onChange={(event) =>
                        handleFaqFieldChange(
                          faqModalIndex,
                          "question",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />
                    <TextField
                      label="Resposta"
                      fullWidth
                      multiline
                      rows={4}
                      value={faq.answer ?? ""}
                      onChange={(event) =>
                        handleFaqFieldChange(
                          faqModalIndex,
                          "answer",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />
                    <TextField
                      label="Categoria (opcional)"
                      fullWidth
                      value={faq.category ?? ""}
                      onChange={(event) =>
                        handleFaqFieldChange(
                          faqModalIndex,
                          "category",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ pt: 0.4 }}
                    >
                      <Button
                        onClick={() => handleRemoveFaq(faqModalIndex)}
                        sx={{
                          color: "#FCA5A5",
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        Remover FAQ
                      </Button>
                      <Button
                        onClick={() => setFaqModalIndex(null)}
                        variant="contained"
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 700,
                          bgcolor: "#7C3AED",
                          "&:hover": { bgcolor: "#6D28D9" },
                        }}
                      >
                        Concluído
                      </Button>
                    </Stack>
                  </Stack>
                );
              })()}
            </DialogContent>
          </Dialog>
        ) : null}

        {config.dynamicStepsPath ? (
          <Dialog
            open={stepModalIndex !== null}
            onClose={() => setStepModalIndex(null)}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "18px",
                bgcolor: "rgba(12,12,14,0.98)",
                border: "1px solid rgba(255,255,255,0.12)",
              },
            }}
          >
            <DialogTitle sx={{ color: "#fff", fontWeight: 800 }}>
              Editar Passo do Processo
            </DialogTitle>
            <DialogContent>
              {(() => {
                const steps = getStepsArray(draft, config.dynamicStepsPath);
                const step = stepModalIndex !== null ? steps[stepModalIndex] : null;

                if (!step) {
                  return null;
                }

                return (
                  <Stack spacing={1.2} sx={{ mt: 0.4 }}>
                    <TextField
                      label="Título"
                      fullWidth
                      value={step.title ?? ""}
                      onChange={(event) =>
                        handleStepFieldChange(
                          stepModalIndex,
                          "title",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />
                    <TextField
                      label="Subtítulo"
                      fullWidth
                      value={step.subtitle ?? ""}
                      onChange={(event) =>
                        handleStepFieldChange(
                          stepModalIndex,
                          "subtitle",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />
                    <TextField
                      label="Descrição"
                      fullWidth
                      multiline
                      rows={3}
                      value={step.description ?? ""}
                      onChange={(event) =>
                        handleStepFieldChange(
                          stepModalIndex,
                          "description",
                          event.target.value,
                        )
                      }
                      sx={getTextFieldStyles()}
                    />
                      <Box>
                        <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", mb: 1, fontWeight: 600 }}>
                          Ícone
                        </Typography>
                        <Box sx={{ 
                          display: "flex", 
                          flexWrap: "wrap", 
                          gap: 1, 
                          p: 1.5, 
                          borderRadius: "12px", 
                          bgcolor: "rgba(7,7,8,0.86)",
                          border: "1px solid rgba(255,255,255,0.05)"
                        }}>
                          {Object.entries(processIconMap).map(([key, IconComponent]) => (
                            <Box
                              key={key}
                              onClick={() => handleStepFieldChange(stepModalIndex, "iconKey", key)}
                              sx={{
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "10px",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                bgcolor: step.iconKey === key ? "rgba(124,58,237,0.2)" : "transparent",
                                border: step.iconKey === key ? "1px solid #7C3AED" : "1px solid transparent",
                                color: step.iconKey === key ? "#C4B5FD" : "rgba(255,255,255,0.5)",
                                "&:hover": {
                                  bgcolor: step.iconKey === key ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
                                  color: step.iconKey === key ? "#DDD6FE" : "#FFF"
                                }
                              }}
                            >
                              <IconComponent size={24} />
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", mb: 1, fontWeight: 600 }}>
                          Cor do Ícone
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(255,255,255,0.1)",
                              position: "relative",
                              flexShrink: 0,
                            }}
                          >
                            <input
                              type="color"
                              value={step.color || "#7C3AED"}
                              onChange={(e) => handleStepFieldChange(stepModalIndex, "color", e.target.value)}
                              style={{
                                position: "absolute",
                                top: -10,
                                left: -10,
                                width: 100,
                                height: 100,
                                cursor: "pointer",
                                border: "none",
                                padding: 0,
                              }}
                            />
                          </Box>
                          <TextField
                            fullWidth
                            value={step.color || ""}
                            onChange={(e) =>
                              handleStepFieldChange(
                                stepModalIndex,
                                "color",
                                e.target.value,
                              )
                            }
                            sx={getTextFieldStyles()}
                          />
                        </Stack>
                      </Box>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ pt: 0.4 }}
                    >
                      <Button
                        onClick={() => handleRemoveStep(stepModalIndex)}
                        sx={{
                          color: "#FCA5A5",
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        Remover Passo
                      </Button>
                      <Button
                        onClick={() => setStepModalIndex(null)}
                        variant="contained"
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          fontWeight: 700,
                          bgcolor: "#7C3AED",
                          "&:hover": { bgcolor: "#6D28D9" },
                        }}
                      >
                        Concluído
                      </Button>
                    </Stack>
                  </Stack>
                );
              })()}
            </DialogContent>
          </Dialog>
        ) : null}
      </Box>
      <Box
        sx={{
          p: 2,
          pt: 6,
          borderRadius: "24px",
          border: "1px dashed rgba(255,255,255,0.15)",
          bgcolor: "rgba(0,0,0,0.2)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 16, left: 24, zIndex: 10 }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontWeight: 800,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Live Preview
          </Typography>
        </Box>
        <LivePreviewWrapper config={config} draft={draft} selectableOptions={selectableOptions} />
      </Box>
    </Stack>
  );
}

const getTextFieldStyles = () => ({
  "& .MuiInputBase-root": {
    bgcolor: "rgba(7,7,8,0.86)",
    borderRadius: "12px",
    color: "#F5F5F5",
  },
});

export default function AdminSectionPlaceholder() {
  const { requestNavigation } = useAdminUnsavedChanges();
  const { page, section } = useParams();
  const pageLabel = pageLabelByKey[page] ?? "Página";
  const pageConfig = editorConfigByPageSection[page] ?? {};
  const editorConfig = section ? pageConfig[section] : null;
  const sectionsList = Object.entries(pageConfig);

  const isEditable = Boolean(editorConfig?.getContent && editorConfig?.fields);

  return (
    <Container
      maxWidth={false}
      sx={{ px: { xs: 2.2, md: 3.2 }, py: { xs: 2.4, md: 3.2 } }}
    >
      {isEditable ? (
        <ContentEditor config={editorConfig} />
      ) : section && editorConfig ? (
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "1.75rem", md: "2rem" },
              letterSpacing: "-0.02em",
            }}
          >
            {editorConfig.title}
          </Typography>
          <Typography
            sx={{ mt: 1, color: "rgba(228,228,231,0.74)", fontSize: "1rem" }}
          >
            Estrutura pronta. Nesta próxima fase conectamos os campos reais
            desta seção.
          </Typography>
        </Box>
      ) : page ? (
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "1.75rem", md: "2rem" },
              letterSpacing: "-0.02em",
            }}
          >
            {pageLabel}
          </Typography>
          <Typography
            sx={{ mt: 1, color: "rgba(228,228,231,0.74)", fontSize: "1rem" }}
          >
            Selecione uma sub-seção para editar os dados desta página.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mt: 2 }}
          >
            {sectionsList.map(([sectionKey, config]) => (
              <Button
                key={sectionKey}
                onClick={() =>
                  requestNavigation(`/admin/${page}/${sectionKey}`)
                }
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 700,
                  color: "rgba(244,244,245,0.9)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                }}
              >
                {config.navLabel ?? sectionKey}
              </Button>
            ))}
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(160deg, rgba(25,25,28,0.98), rgba(10,10,12,0.98))",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: "1.75rem", md: "2rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Seção Admin
          </Typography>
          <Typography
            sx={{ mt: 1, color: "rgba(228,228,231,0.74)", fontSize: "1rem" }}
          >
            Selecione uma página no menu lateral para começar a edição por
            sessões.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
