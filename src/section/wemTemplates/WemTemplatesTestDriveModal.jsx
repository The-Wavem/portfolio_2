import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    TbArrowRight,
    TbDeviceDesktop,
    TbDeviceMobile,
    TbDeviceTablet,
    TbX
} from 'react-icons/tb';

import { trackAction } from '@/service/analytics/tracking.service';
import styles from './WemTemplatesTestDriveModal.module.css';

const VIEWPORT_MODES = [
    { id: 'desktop', label: 'Desktop', icon: TbDeviceDesktop },
    { id: 'tablet', label: 'Tablet', icon: TbDeviceTablet },
    { id: 'mobile', label: 'Mobile', icon: TbDeviceMobile }
];

function buildInteractiveDemoHtml(template) {
    const title = template?.title || 'WEM SYSTEM';
    const badge = template?.badge || 'Arquitetura Proprietária';
    const kpis = Array.isArray(template?.kpis) ? template.kpis : [];

    const isErp = template?.id === 'wem-erp-gestao';
    const isBooking = template?.id === 'wem-agendamento';

    const primaryActionLabel = isErp
        ? 'Emitir Fechamento em 2 Cliques'
        : isBooking
        ? 'Confirmar Lote de Agendamentos'
        : 'Publicar Oferta Relâmpago (2 Cliques)';

    const tableRows = isErp
        ? [
              ['#ERP-904', 'Unidade Matriz — Fluxo Operacional', 'R$ 148.900', 'CONCILIADO'],
              ['#ERP-905', 'Reposição Automática de Estoque', 'R$ 32.400', 'APROVADO'],
              ['#ERP-906', 'Faturamento Contratos Recorrentes', 'R$ 84.120', 'EMITIDO']
          ]
        : isBooking
        ? [
              ['09:00', 'Avaliação Executiva — Sala 01', 'Confirmado via WhatsApp', 'ATIVO'],
              ['10:30', 'Procedimento Especializado — Sala 03', 'Check-in Realizado', 'EM CURSO'],
              ['14:00', 'Consultoria Técnica — Remoto', 'Pagamento Integrado', 'CONFIRMADO']
          ]
        : [
              ['#WEM-4102', 'Checkout Transparente PIX / Cartão', 'R$ 1.290,00', 'APROVADO 0.6s'],
              ['#WEM-4103', 'Assinatura Recorrente Anual', 'R$ 3.480,00', 'SINCRONIZADO'],
              ['#WEM-4104', 'Kit Corporativo Sob Medida', 'R$ 890,00', 'EXPEDIDO']
          ];

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
    background: #07070B;
    color: #F4F4F5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(12,12,18,0.92);
    flex-wrap: wrap;
    gap: 12px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 0.95rem;
    letter-spacing: -0.02em;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FB7185, #E11D48);
    box-shadow: 0 0 12px #E11D48;
  }
  .badge {
    font-family: monospace;
    font-size: 0.7rem;
    color: #FB7185;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(251,113,133,0.35);
    background: rgba(225,29,72,0.12);
    text-transform: uppercase;
  }
  .layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    flex: 1;
  }
  @media (max-width: 720px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { display: flex; overflow-x: auto; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 10px 16px !important; gap: 8px; }
    .nav-btn { white-space: nowrap; margin-bottom: 0 !important; }
  }
  .sidebar {
    padding: 20px 14px;
    border-right: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.015);
  }
  .nav-btn {
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    margin-bottom: 6px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(228,228,231,0.68);
    font-weight: 600;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .nav-btn.active, .nav-btn:hover {
    background: rgba(225,29,72,0.16);
    border-color: rgba(251,113,133,0.35);
    color: #FFFFFF;
  }
  .content {
    padding: 24px;
    max-width: 1060px;
    width: 100%;
    margin: 0 auto;
  }
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 24px;
  }
  .h-title { font-size: 1.35rem; font-weight: 800; }
  .h-sub { font-size: 0.84rem; color: rgba(228,228,231,0.6); margin-top: 4px; }
  .action-btn {
    padding: 11px 20px;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #E11D48, #BE123C);
    color: #fff;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(225,29,72,0.4);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .action-btn:hover { transform: translateY(-1px); box-shadow: 0 0 28px rgba(225,29,72,0.65); }
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }
  .kpi-card {
    padding: 18px;
    border-radius: 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .kpi-label { font-size: 0.75rem; color: rgba(228,228,231,0.58); text-transform: uppercase; letter-spacing: 0.06em; }
  .kpi-val { font-size: 1.65rem; font-weight: 800; margin: 6px 0 4px; color: #fff; }
  .kpi-trend { font-family: monospace; font-size: 0.72rem; color: #FB7185; }
  .panel {
    border-radius: 14px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .panel-head {
    padding: 14px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    font-weight: 700;
  }
  .row {
    display: grid;
    grid-template-columns: 110px 1fr auto auto;
    gap: 12px;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 0.84rem;
  }
  @media (max-width: 600px) {
    .row { grid-template-columns: 1fr auto; }
    .row-id, .row-val { display: none; }
  }
  .row:last-child { border-bottom: none; }
  .row-id { font-family: monospace; color: #FB7185; font-size: 0.78rem; }
  .row-status {
    font-family: monospace;
    font-size: 0.68rem;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(225,29,72,0.18);
    color: #FB7185;
    border: 1px solid rgba(251,113,133,0.35);
  }
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #12121A;
    border: 1px solid #FB7185;
    color: #fff;
    padding: 12px 18px;
    border-radius: 12px;
    font-size: 0.82rem;
    font-weight: 600;
    box-shadow: 0 12px 32px rgba(0,0,0,0.75);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.25s ease;
    pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateY(0); }
</style>
</head>
<body>
  <header class="topbar">
    <div class="brand">
      <span class="dot"></span>
      <span>${title} // AMBIENTE DE TEST DRIVE</span>
    </div>
    <span class="badge">${badge}</span>
  </header>
  <div class="layout">
    <aside class="sidebar">
      <button class="nav-btn active" onclick="switchView(this, 'Painel Operacional')">Visão Consolidada</button>
      <button class="nav-btn" onclick="switchView(this, 'Gestão em 2 Cliques')">CMS & Automação</button>
      <button class="nav-btn" onclick="switchView(this, 'Relatórios em Tempo Real')">Telemetria & Auditoria</button>
    </aside>
    <main class="content">
      <div class="header-row">
        <div>
          <h1 class="h-title" id="viewTitle">Painel Operacional</h1>
          <p class="h-sub">Simulação interativa da regra dos 2 cliques Wavem — clique nos controles para testar.</p>
        </div>
        <button class="action-btn" onclick="triggerQuickAction()">${primaryActionLabel}</button>
      </div>
      <section class="kpi-grid">
        ${kpis
            .map(
                (k) => `
          <div class="kpi-card">
            <div class="kpi-label">${k.label}</div>
            <div class="kpi-val">${k.value}</div>
            <div class="kpi-trend">${k.trend}</div>
          </div>`
            )
            .join('')}
      </section>
      <section class="panel">
        <div class="panel-head">
          <span>REGISTROS SINCRONIZADOS EM TEMPO REAL</span>
          <span id="counterLabel">3 ativos</span>
        </div>
        <div id="rowsContainer">
          ${tableRows
              .map(
                  (r) => `
            <div class="row">
              <span class="row-id">${r[0]}</span>
              <span>${r[1]}</span>
              <strong class="row-val">${r[2]}</strong>
              <span class="row-status">${r[3]}</span>
            </div>`
              )
              .join('')}
        </div>
      </section>
    </main>
  </div>
  <div id="toast" class="toast">Operação concluída em 2 cliques com sucesso.</div>
  <script>
    function showToast(msg) {
      var t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(function() { t.classList.remove('show'); }, 2400);
    }
    function switchView(btn, title) {
      document.querySelectorAll('.nav-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('viewTitle').textContent = title;
      showToast('Módulo alternado instantaneamente: ' + title);
    }
    function triggerQuickAction() {
      var container = document.getElementById('rowsContainer');
      var now = new Date();
      var timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      var newRow = document.createElement('div');
      newRow.className = 'row';
      newRow.innerHTML = '<span class="row-id">#' + timeStr + '</span><span>Execução instantânea via Regra dos 2 Cliques</span><strong class="row-val">100% Online</strong><span class="row-status">SINCRONIZADO</span>';
      container.insertBefore(newRow, container.firstChild);
      document.getElementById('counterLabel').textContent = container.children.length + ' ativos';
      showToast('Ação executada em sub-segundo sem recarregar a página.');
    }
  </script>
</body>
</html>`;
}

export default function WemTemplatesTestDriveModal({ template, onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();
    const [viewportMode, setViewportMode] = useState('desktop');

    const isOpen = Boolean(template);

    // Sincroniza estado React com showModal() nativo do <dialog> + fallback light-dismiss
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return undefined;
        }

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else if (dialog.open) {
            dialog.close();
        }

        const handleNativeClose = () => {
            if (isOpen) {
                onClose();
            }
        };

        const handleBackdropFallbackClick = (event) => {
            if ('closedBy' in HTMLDialogElement.prototype) {
                return;
            }

            if (event.target !== dialog) {
                return;
            }

            const rect = dialog.getBoundingClientRect();
            const isDialogContent =
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width;

            if (!isDialogContent) {
                dialog.close();
            }
        };

        dialog.addEventListener('close', handleNativeClose);
        dialog.addEventListener('click', handleBackdropFallbackClick);

        return () => {
            dialog.removeEventListener('close', handleNativeClose);
            dialog.removeEventListener('click', handleBackdropFallbackClick);
        };
    }, [isOpen, onClose]);

    const useEmbeddedSimulation = useMemo(() => {
        if (!template?.demoUrl) {
            return true;
        }
        return template.demoUrl.includes('.wavem.dev');
    }, [template]);

    const srcDocContent = useMemo(
        () => (template ? buildInteractiveDemoHtml(template) : ''),
        [template]
    );

    const viewportClass =
        viewportMode === 'mobile'
            ? styles.viewportMobile
            : viewportMode === 'tablet'
            ? styles.viewportTablet
            : styles.viewportDesktop;

    return (
        <dialog
            ref={dialogRef}
            {...{ closedby: 'any' }}
            aria-labelledby={titleId}
            className={styles.nativeDialog}
            onClick={(event) => {
                if (event.target === dialogRef.current) {
                    onClose();
                }
            }}
        >
            {template && (
                <div className={styles.modalShell}>
                    {/* Barra Superior de Ferramentas do Test Drive */}
                    <header className={styles.toolbar}>
                        <div className={styles.toolbarLeft}>
                            <span className={styles.liveIndicator}>
                                <span className={styles.livePulseDot} aria-hidden />
                                <span>TEST DRIVE AO VIVO</span>
                            </span>

                            <div className={styles.titleGroup}>
                                <h2 id={titleId} className={styles.modalTitle}>
                                    {template.title}
                                </h2>
                                <span className={styles.demoUrlBar}>
                                    {template.demoUrl}
                                </span>
                            </div>
                        </div>

                        {/* Alternadores de Viewport: Desktop / Tablet / Mobile */}
                        <div
                            className={styles.viewportSwitcher}
                            role="group"
                            aria-label="Alternar visualização por dispositivo"
                        >
                            {VIEWPORT_MODES.map((mode) => {
                                const IconComponent = mode.icon;
                                const isActive = viewportMode === mode.id;

                                return (
                                    <button
                                        key={mode.id}
                                        type="button"
                                        className={`${styles.deviceBtn} ${
                                            isActive ? styles.deviceBtnActive : ''
                                        }`}
                                        onClick={() => {
                                            setViewportMode(mode.id);
                                            trackAction({
                                                page: 'templates_wem',
                                                section: 'test_drive_modal',
                                                action: 'switch_viewport_device',
                                                label: `${template.title} - ${mode.label}`
                                            });
                                        }}
                                    >
                                        <IconComponent size={16} strokeWidth={1.8} />
                                        <span className={styles.deviceLabel}>
                                            {mode.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Ações Rápidas: Implementar Modelo + Fechar */}
                        <div className={styles.toolbarRight}>
                            <RouterLink
                                to="/contato"
                                className={styles.implementCtaLink}
                                onClick={() => {
                                    trackAction({
                                        page: 'templates_wem',
                                        section: 'test_drive_modal',
                                        action: 'click_implement_template_cta',
                                        label: template.title
                                    });
                                    onClose();
                                }}
                            >
                                <span className={styles.implementCtaTextFull}>
                                    Quero implementar este modelo no meu negócio
                                </span>
                                <span className={styles.implementCtaTextShort}>
                                    Implementar modelo
                                </span>
                                <TbArrowRight size={16} strokeWidth={2} />
                            </RouterLink>

                            <button
                                type="button"
                                className={styles.closeModalBtn}
                                onClick={onClose}
                                aria-label="Fechar Test Drive e voltar ao catálogo"
                            >
                                <TbX size={17} strokeWidth={2} />
                                <span>Fechar</span>
                            </button>
                        </div>
                    </header>

                    {/* Área Central com Iframe Responsivo */}
                    <div className={styles.stageArea}>
                        <div className={`${styles.viewportContainer} ${viewportClass}`}>
                            <iframe
                                title={`Demonstração interativa de ${template.title}`}
                                className={styles.liveIframe}
                                src={useEmbeddedSimulation ? undefined : template.demoUrl}
                                srcDoc={useEmbeddedSimulation ? srcDocContent : undefined}
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </div>
                </div>
            )}
        </dialog>
    );
}
