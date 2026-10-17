import { useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  TbExternalLink,
  TbX,
  TbCpu,
  TbCheck,
  TbSparkles,
  TbLayersSubtract,
} from "react-icons/tb";
import {
  getStackIcon,
  getToolMeta,
} from "@/components/organism/aboutTeam.utils";

const WAVEM_PURPLE = "#7C3AED";
const WAVEM_PURPLE_LIGHT = "#A78BFA";

function getProjectCoverBackground(project) {
  const coverImage = project?.coverImage?.trim();

  if (coverImage) {
    return `url("${coverImage}")`;
  }

  return (
    project?.cover ||
    "linear-gradient(145deg, rgba(124,58,237,0.35) 0%, rgba(12,10,22,0.85) 60%, rgba(8,8,10,0.98) 100%)"
  );
}

const KNOWN_SECTION_LABELS =
  "(Contexto|Desafio|Problema|Solu[çc][ãa]o|Decis[õo]es\\s+T[ée]cnicas|Decis[õo]es|Arquitetura|Funcionalidades|Destaques|Resultados|Impacto|Conclus[ãa]o|Objetivo|Vis[ãa]o\\s+Geral)";

/**
 * Converte o texto bruto do Admin/Firebase em blocos estruturados:
 * - Parágrafos comuns
 * - Seções tituladas (ex: "Contexto: ...", "Decisões Técnicas:", "Resultados: ...")
 * - Listas de tópicos (bullets com •, -, *)
 */
function parseProjectDetails(rawDetails) {
  if (!rawDetails || typeof rawDetails !== "string") {
    return [];
  }

  // 1. Normaliza quebras de linha e separa marcadores inline (• e rótulos conhecidos)
  const normalized = rawDetails
    .replace(/\r\n/g, "\n")
    .replace(
      new RegExp(`([.!?:])\\s+${KNOWN_SECTION_LABELS}\\s*:`, "gi"),
      "$1\n$2:"
    )
    .replace(/\s*•\s*/g, "\n• ")
    .replace(/\n{3,}/g, "\n\n");

  const rawLines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  const sectionLabelRegex = new RegExp(`^${KNOWN_SECTION_LABELS}\\s*:(.*)$`, "i");
  const genericHeadingRegex = /^([A-ZÀ-Ú][A-Za-zÀ-ú0-9\s/&-]{2,28}):\s*(.*)$/;

  for (const line of rawLines) {
    // Caso 1: Item de lista (•, -, *)
    if (/^(•|-|\*)\s+/.test(line)) {
      const itemText = line.replace(/^(•|-|\*)\s+/, "").trim();
      if (!itemText) continue;

      if (!currentList) {
        currentList = { type: "list", items: [] };
      }

      // Verifica se o item de lista possui um prefixo de destaque antes de ":"
      const colonIdx = itemText.indexOf(":");
      if (colonIdx > 2 && colonIdx < 68) {
        currentList.items.push({
          lead: itemText.slice(0, colonIdx).trim(),
          body: itemText.slice(colonIdx + 1).trim(),
        });
      } else {
        currentList.items.push({
          lead: null,
          body: itemText,
        });
      }
      continue;
    }

    flushList();

    // Caso 2: Rótulo de seção conhecido ou cabeçalho curto terminado em ":"
    const matchKnown = line.match(sectionLabelRegex);
    const matchGeneric = !matchKnown ? line.match(genericHeadingRegex) : null;
    const matchedHeading = matchKnown || matchGeneric;

    if (matchedHeading) {
      const label = matchedHeading[1].trim();
      const rest = (matchedHeading[2] || "").trim();

      if (!rest) {
        blocks.push({
          type: "heading",
          label,
        });
      } else {
        blocks.push({
          type: "section_card",
          label,
          content: rest,
        });
      }
      continue;
    }

    // Caso 3: Parágrafo normal
    blocks.push({
      type: "paragraph",
      content: line,
    });
  }

  flushList();
  return blocks;
}

export default function ProjectDetailsModal({
  project,
  open,
  onClose,
  actionLabel = "Acessar projeto",
  coverMinHeight = { xs: 200, md: 255 },
}) {
  const coverBackground = getProjectCoverBackground(project);
  const parsedBlocks = useMemo(
    () => parseProjectDetails(project?.details),
    [project?.details]
  );
  const stackList = Array.isArray(project?.stack) ? project.stack : [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "#08070D",
          border: "1px solid rgba(167, 139, 250, 0.2)",
          borderRadius: { xs: "18px", md: "22px" },
          boxShadow:
            "0 28px 80px rgba(0, 0, 0, 0.82), 0 0 40px rgba(124, 58, 237, 0.16)",
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {project && (
        <>
          {/* Botão Fechar Fixo no Canto Superior Direito */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: 12, md: 16 },
              right: { xs: 12, md: 16 },
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={onClose}
              component={motion.button}
              whileHover={{ scale: 1.06, rotate: 90 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              aria-label="Fechar detalhes do projeto"
              sx={{
                color: "#fff",
                border: "1px solid rgba(167, 139, 250, 0.3)",
                background: "rgba(9, 8, 15, 0.78)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                "&:hover": {
                  background: WAVEM_PURPLE,
                  borderColor: WAVEM_PURPLE_LIGHT,
                },
              }}
            >
              <TbX size={20} />
            </IconButton>
          </Box>

          {/* Área Rolável com Scrollbar Roxo Wavem */}
          <DialogContent
            sx={{
              p: 0,
              overflowY: "auto",
              scrollBehavior: "smooth",
              position: "relative",
              scrollbarWidth: "thin",
              scrollbarColor: `${WAVEM_PURPLE} rgba(255,255,255,0.06)`,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.04)",
              },
              "&::-webkit-scrollbar-thumb": {
                background: `linear-gradient(180deg, ${WAVEM_PURPLE}, ${WAVEM_PURPLE_LIGHT})`,
                borderRadius: "10px",
              },
            }}
          >
            {/* CAPA DO PROJETO COM ENQUADRAMENTO PROPORCIONAL */}
            <Box
              sx={{
                minHeight: coverMinHeight,
                position: "relative",
                backgroundImage: coverBackground,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundColor: "#0C0A14",
                borderBottom: "1px solid rgba(167, 139, 250, 0.12)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(8,7,13,0.22) 0%, rgba(8,7,13,0.68) 58%, #08070D 100%)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 18,
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    px: 1.4,
                    py: 0.5,
                    borderRadius: "9px",
                    bgcolor: "rgba(124, 58, 237, 0.2)",
                    border: "1px solid rgba(167, 139, 250, 0.38)",
                    backdropFilter: "blur(10px)",
                    mb: 1.2,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: WAVEM_PURPLE_LIGHT,
                      boxShadow: `0 0 8px ${WAVEM_PURPLE_LIGHT}`,
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#F3E8FF",
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.68rem",
                      lineHeight: 1,
                    }}
                  >
                    {project.tag || "Projeto"}
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    lineHeight: 1.12,
                    letterSpacing: "-0.025em",
                    fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2.05rem" },
                  }}
                >
                  {project.title}
                </Typography>
              </motion.div>
            </Box>

            {/* CONTEÚDO ESTRUTURADO DO PROJETO */}
            <Box sx={{ p: { xs: 2.4, sm: 3, md: 3.5 } }}>
              {/* Resumo Rápido se existir */}
              {project.summary && (
                <Typography
                  sx={{
                    color: "#DDD6FE",
                    fontSize: { xs: "0.95rem", md: "1.04rem" },
                    fontWeight: 500,
                    lineHeight: 1.6,
                    mb: 2.8,
                    pb: 2.2,
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {project.summary}
                </Typography>
              )}

              {/* Blocos Formatados (Parágrafos, Seções e Bullet Lists) */}
              <Stack spacing={2.2}>
                {parsedBlocks.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <Stack
                        key={`heading-${index}`}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ pt: index > 0 ? 1 : 0 }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 18,
                            borderRadius: 2,
                            bgcolor: WAVEM_PURPLE,
                            boxShadow: `0 0 10px ${WAVEM_PURPLE}`,
                          }}
                        />
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "0.92rem",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {block.label}
                        </Typography>
                      </Stack>
                    );
                  }

                  if (block.type === "section_card") {
                    return (
                      <Box
                        key={`section-${index}`}
                        sx={{
                          p: { xs: 1.8, md: 2.2 },
                          borderRadius: "14px",
                          bgcolor: "rgba(255, 255, 255, 0.025)",
                          border: "1px solid rgba(167, 139, 250, 0.14)",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.8}
                          sx={{ mb: 0.8 }}
                        >
                          <TbSparkles size={14} color={WAVEM_PURPLE_LIGHT} />
                          <Typography
                            sx={{
                              color: WAVEM_PURPLE_LIGHT,
                              fontWeight: 800,
                              fontSize: "0.74rem",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            {block.label}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            color: "rgba(228, 228, 231, 0.88)",
                            lineHeight: 1.72,
                            fontSize: { xs: "0.92rem", md: "0.96rem" },
                          }}
                        >
                          {block.content}
                        </Typography>
                      </Box>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <Stack
                        key={`list-${index}`}
                        component="ul"
                        spacing={1.2}
                        sx={{
                          m: 0,
                          p: 0,
                          listStyle: "none",
                        }}
                      >
                        {block.items.map((item, itemIdx) => (
                          <Box
                            key={`bullet-${itemIdx}`}
                            component="li"
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1.4,
                              p: { xs: 1.3, md: 1.5 },
                              borderRadius: "12px",
                              bgcolor: "rgba(124, 58, 237, 0.05)",
                              border: "1px solid rgba(167, 139, 250, 0.12)",
                            }}
                          >
                            <Box
                              sx={{
                                mt: "3px",
                                width: 20,
                                height: 20,
                                borderRadius: "6px",
                                bgcolor: "rgba(124, 58, 237, 0.22)",
                                border: "1px solid rgba(167, 139, 250, 0.4)",
                                color: "#DDD6FE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <TbCheck size={13} />
                            </Box>
                            <Typography
                              sx={{
                                color: "rgba(228, 228, 231, 0.85)",
                                lineHeight: 1.65,
                                fontSize: { xs: "0.9rem", md: "0.95rem" },
                              }}
                            >
                              {item.lead ? (
                                <>
                                  <Box
                                    component="span"
                                    sx={{
                                      color: "#fff",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {item.lead}:{" "}
                                  </Box>
                                  {item.body}
                                </>
                              ) : (
                                item.body
                              )}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    );
                  }

                  return (
                    <Typography
                      key={`p-${index}`}
                      sx={{
                        color: "rgba(228, 228, 231, 0.84)",
                        lineHeight: 1.76,
                        fontSize: { xs: "0.92rem", md: "0.97rem" },
                      }}
                    >
                      {block.content}
                    </Typography>
                  );
                })}
              </Stack>

              {/* BLOCO DE TECNOLOGIAS E ARQUITETURA */}
              {stackList.length > 0 && (
                <Box
                  sx={{
                    mt: 3.5,
                    pt: 2.8,
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.9}
                    sx={{ mb: 1.6 }}
                  >
                    <TbLayersSubtract size={16} color={WAVEM_PURPLE_LIGHT} />
                    <Typography
                      sx={{
                        color: "rgba(228, 228, 231, 0.7)",
                        fontWeight: 800,
                        fontSize: "0.74rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Tecnologias utilizadas neste projeto
                    </Typography>
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {stackList.map((item, idx) => {
                      const stackMeta = getToolMeta(item);
                      const ResolvedIcon = getStackIcon(stackMeta) || TbCpu;
                      return (
                        <Box
                          key={`${stackMeta.name}-${idx}`}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1.4,
                            py: 0.75,
                            borderRadius: "10px",
                            bgcolor: "rgba(124, 58, 237, 0.09)",
                            border: "1px solid rgba(167, 139, 250, 0.24)",
                            transition:
                              "border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease",
                            "&:hover": {
                              bgcolor: "rgba(124, 58, 237, 0.18)",
                              borderColor: "rgba(167, 139, 250, 0.5)",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              borderRadius: "6px",
                              bgcolor: "rgba(167, 139, 250, 0.16)",
                              color: "#DDD6FE",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <ResolvedIcon size={13} />
                          </Box>
                          <Typography
                            sx={{
                              color: "#F3E8FF",
                              fontWeight: 700,
                              fontSize: "0.78rem",
                              lineHeight: 1.1,
                            }}
                          >
                            {stackMeta.name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              )}
            </Box>
          </DialogContent>

          {/* RODAPÉ FIXO COM AÇÃO PRINCIPAL */}
          <Box
            sx={{
              px: { xs: 2.4, sm: 3, md: 3.5 },
              py: 1.8,
              bgcolor: "rgba(10, 9, 16, 0.96)",
              borderTop: "1px solid rgba(167, 139, 250, 0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                color: "rgba(228, 228, 231, 0.68)",
                fontWeight: 600,
                fontSize: "0.86rem",
                "&:hover": {
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Voltar aos projetos
            </Button>

            {project.href ? (
              <Button
                href={project.href}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                endIcon={<TbExternalLink size={18} />}
                sx={{
                  px: 2.8,
                  py: 1.1,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  borderRadius: "11px",
                  boxShadow: "0 6px 22px rgba(124, 58, 237, 0.4)",
                  "&:hover": {
                    boxShadow: "0 8px 28px rgba(124, 58, 237, 0.6)",
                  },
                }}
              >
                {actionLabel}
              </Button>
            ) : null}
          </Box>
        </>
      )}
    </Dialog>
  );
}
