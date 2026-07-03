import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import styles from './ElasticTimelineLine.module.css';

export default function ElasticTimelineLine({ 
    steps = [
        { id: '01', color: '#F59E0B' },
        { id: '02', color: '#EC4899' },
        { id: '03', color: '#8B5CF6' }
    ]
}) {
    const containerRef = useRef(null);
    const [svgHeight, setSvgHeight] = useState(600); // Altura fallback
    
    // Configuração da mola (Física de "Corda de Violão")
    // Alta tensão (stiffness) e baixo atrito (damping) para o efeito elástico prolongado.
    const springConfig = { stiffness: 450, damping: 10, mass: 0.8 };
    
    const ctrlX = useSpring(60, springConfig); // Começa no centro (120px / 2)
    const ctrlY = useSpring(svgHeight / 2, { stiffness: 500, damping: 30 }); 

    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setSvgHeight(entry.contentRect.height);
                ctrlY.set(entry.contentRect.height / 2);
            }
        });
        
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [ctrlY]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Posição do mouse relativa ao container
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Limita o estiramento (tensão) máximo da corda (ex: não sair do SVG visualmente)
        const tensionX = Math.max(-50, Math.min(170, mouseX));
        
        ctrlX.set(tensionX);
        ctrlY.set(mouseY);
    };

    const handleMouseLeave = () => {
        // Solta a corda, disparando a mola de volta pro centro (60px)
        ctrlX.set(60);
        ctrlY.set(svgHeight / 2);
    };

    // Monta o SVG Path (Curva de Bezier Quadrática)
    // P0: Topo Centro (60, 0)
    // P1 (Controle): Onde o mouse está (ctrlX, ctrlY)
    // P2: Base Centro (60, svgHeight)
    const pathD = useMotionTemplate`M 60 0 Q ${ctrlX} ${ctrlY} 60 ${svgHeight}`;

    return (
        <div 
            className={styles.elasticContainer} 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Área invisível extra larga para facilitar a "pegada" do mouse sem precisar mirar exatamente na linha */}
            <div style={{ position: 'absolute', inset: '-30px', zIndex: 0 }} />

            <svg width="100%" height="100%" className={styles.svg}>
                <defs>
                    <linearGradient id="neonGradientLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
                
                {/* A corda vibrante */}
                <motion.path 
                    d={pathD}
                    fill="none"
                    stroke="url(#neonGradientLine)"
                    strokeWidth="3"
                    className={styles.elasticLine}
                />
            </svg>
            
            <div className={styles.nodesWrapper}>
                {steps.map((step, index) => (
                    <div 
                        key={step.id || index} 
                        className={styles.node}
                        style={{ 
                            borderColor: step.color || '#A78BFA',
                            boxShadow: `0 0 16px ${step.color || '#A78BFA'}40`
                        }}
                    >
                        {step.id}
                    </div>
                ))}
            </div>
        </div>
    );
}
