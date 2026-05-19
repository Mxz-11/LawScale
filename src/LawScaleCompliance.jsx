/**
 * LawScale Compliance — Premium Cinematic Web Experience
 * Faithful animated adaptation of the LawScale Compliance PDF
 * Stack: React · Framer Motion · Lucide React · Google Fonts
 */

import React, { useState, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────── */
const T = {
  navy:      '#1C2B4A',
  navyDeep:  '#13203C',
  navyLight: '#243557',
  gold:      '#D4A843',
  goldLight: '#E8C46A',
  white:     '#FFFFFF',
  offWhite:  '#F0EFE9',
  muted:     '#8899BB',
  text:      '#374A6E',
  borderW:   'rgba(255,255,255,0.15)',
  borderD:   'rgba(28,43,74,0.12)',
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 48, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
}

/* ─────────────────────────────────────────────────────────────
   CUSTOM HOOK
───────────────────────────────────────────────────────────── */
function useReveal(margin = '-8%') {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: `${margin} 0px` })
  return [ref, inView]
}

/* ─────────────────────────────────────────────────────────────
   LAWSCALE LOGO  — golden dot-diamond grid + wordmark
───────────────────────────────────────────────────────────── */
const DOTS = [
  [14,  3, 2.9],
  [ 8,  8, 2.6], [20,  8, 2.6],
  [ 2, 13, 2.3], [14, 13, 3.3], [26, 13, 2.3],
  [ 8, 18, 2.6], [20, 18, 2.6],
  [ 2, 22, 2.0], [26, 22, 2.0],
  [14, 23, 2.6],
  [ 8, 28, 2.1], [20, 28, 2.1],
  [14, 32, 1.7],
]

function LogoDots({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 36" fill="none">
      {DOTS.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={T.gold} />
      ))}
    </svg>
  )
}

function LawScaleLogo({ light = true, scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale }}>
      <LogoDots size={38 * scale} />
      <span style={{
        fontFamily: "'Barlow', sans-serif",
        fontWeight: 700,
        fontSize: 22 * scale,
        color: light ? T.white : T.navy,
        letterSpacing: '-0.01em',
        lineHeight: 1,
      }}>LawScale</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   CINEMATIC IMAGE PLACEHOLDER
   Grayscale editorial feel with geometric composition guides
───────────────────────────────────────────────────────────── */
function CinematicPlaceholder({ style = {}, label = '' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(148deg, #263655 0%, #192C48 45%, #0E1C32 100%)`,
        ...style,
      }}
    >
      {/* Composition guide SVG — barely visible */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.09 }}
        preserveAspectRatio="none"
        viewBox="0 0 4 3"
      >
        <line x1="0" y1="1.5" x2="4" y2="1.5" stroke="white" strokeWidth="0.018" />
        <line x1="2" y1="0" x2="2" y2="3" stroke="white" strokeWidth="0.018" />
        <rect x="1.05" y="0.72" width="1.9" height="1.56" stroke="white" strokeWidth="0.018" fill="none" />
        <circle cx="2" cy="1.5" r="0.55" stroke="white" strokeWidth="0.015" fill="none" />
      </svg>

      {/* Person silhouette ghost */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.055 }}
        viewBox="0 0 100 130"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="50" cy="30" r="21" fill="white" />
        <path d="M 8 130 Q 8 70 50 70 Q 92 70 92 130 Z" fill="white" />
      </svg>

      {/* Shimmer sweep on hover */}
      <motion.div
        animate={{ x: hovered ? '220%' : '-220%' }}
        transition={{ duration: 0.95, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
      />

      {/* Gold tint on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.55 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(212,168,67,0.11) 0%, transparent 68%)',
        }}
      />

      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
        background: 'linear-gradient(to top, rgba(13,26,46,0.55), transparent)',
      }} />

      {label && (
        <span style={{
          position: 'absolute', bottom: 10, left: 14,
          fontFamily: 'Inter, sans-serif',
          fontSize: 9, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
        }}>{label}</span>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   DIGITAL LAW WAVE DIAGRAM
   Animated SVG timeline of EU digital regulations
───────────────────────────────────────────────────────────── */
const MILESTONES = [
  { yr: '2012', law: 'GDPR\nProposal',    x: 48,  y: 198 },
  { yr: '2015', law: 'NIS\nDir.',          x: 118, y: 174 },
  { yr: '2018', law: 'GDPR\nEnforced',    x: 195, y: 145 },
  { yr: '2019', law: 'Cyber Act\nOpen Data', x: 262, y: 116 },
  { yr: '2021', law: 'Cyber\nAct',         x: 338, y: 90  },
  { yr: '2022', law: 'DORA\nNIS 2',        x: 390, y: 108 },
  { yr: '2023', law: 'AI Act\nDraft',      x: 438, y: 132 },
  { yr: '2024', law: 'AI Act',             x: 482, y: 155 },
  { yr: '2025', law: 'AI Act\n2025',       x: 530, y: 175 },
  { yr: '2027', law: 'AI Act\nFull',       x: 594, y: 196 },
]

const WAVE = 'M 22 222 C 65 212 95 192 122 172 C 158 148 180 130 212 112 C 248 92 292 74 340 88 C 384 102 418 120 448 140 C 480 162 510 178 545 192 C 570 202 592 210 618 218'

function DigitalLawWave() {
  const [ref, inView] = useReveal()

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 9, letterSpacing: '0.26em',
        textTransform: 'uppercase', color: T.muted,
        marginBottom: 10,
      }}>THE LAW</p>

      <svg viewBox="0 0 650 260" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Wave fill */}
        <path d={`${WAVE} L 618 252 L 22 252 Z`} fill="rgba(28,43,74,0.05)" />

        {/* AI Act era highlight */}
        <rect x="370" y="58" width="224" height="168" rx="2"
          fill="rgba(212,168,67,0.04)"
          stroke="rgba(212,168,67,0.2)"
          strokeWidth="0.8" />
        <text x="384" y="53" fontSize="8" fill={T.gold}
          fontFamily="Inter" fontWeight="700" letterSpacing="2">AI ACT ERA</text>

        {/* Cyber Act era highlight */}
        <rect x="246" y="58" width="124" height="104" rx="2"
          fill="rgba(28,43,74,0.04)"
          stroke="rgba(28,43,74,0.14)"
          strokeWidth="0.8" />
        <text x="256" y="53" fontSize="7.5" fill={T.navy}
          fontFamily="Inter" fontWeight="600" letterSpacing="1.5">CYBER ACT</text>

        {/* Animated wave line */}
        <motion.path
          d={WAVE}
          fill="none"
          stroke={T.navy}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeDasharray="1300"
          strokeDashoffset="1300"
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* Milestone nodes + labels */}
        {MILESTONES.map((m, i) => {
          const isRecent = m.yr >= '2024'
          return (
            <g key={i}>
              <motion.circle
                cx={m.x} cy={m.y} r={5}
                fill={isRecent ? T.gold : T.navy}
                stroke={isRecent ? T.goldLight : 'rgba(255,255,255,0.8)'}
                strokeWidth="1.2"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.17, duration: 0.45, ease: 'backOut' }}
              />
              {/* Year */}
              <motion.text
                x={m.x} y={m.y + 20}
                textAnchor="middle" fontSize="7.5"
                fill={T.muted} fontFamily="Inter"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.75 + i * 0.17 }}
              >{m.yr}</motion.text>
              {/* Law label (multi-line) */}
              {m.law.split('\n').map((line, j) => (
                <motion.text
                  key={j}
                  x={m.x} y={m.y - 14 + j * 9}
                  textAnchor="middle" fontSize="7.5"
                  fill={isRecent ? T.gold : T.navy}
                  fontFamily="Inter" fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.75 + i * 0.17 }}
                >{line}</motion.text>
              ))}
            </g>
          )
        })}

        {/* Baseline axis */}
        <line x1="18" y1="234" x2="632" y2="234"
          stroke="rgba(28,43,74,0.1)" strokeWidth="1" />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   §1  HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -55])

  return (
    <section style={{
      minHeight: '100dvh',
      background: T.navyDeep,
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
    }}>
      {/* Ambient gold glow — breathes */}
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 65% 55% at 72% 44%, rgba(212,168,67,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Corner grain texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6,
      }} />

      {/* ── LEFT PANEL ── logo zone */}
      <div className="hero-left" style={{
        width: '38%',
        flexShrink: 0,
        padding: '44px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease }}
        >
          <LawScaleLogo light={true} />
        </motion.div>
      </div>

      {/* ── VERTICAL DIVIDER ── */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.15, delay: 0.45, ease }}
        style={{
          width: 1,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, transparent 100%)',
          transformOrigin: 'top',
          alignSelf: 'stretch',
          flexShrink: 0,
        }}
      />

      {/* ── RIGHT PANEL ── hero frame */}
      <motion.div
        className="hero-right"
        style={{
          flex: 1,
          padding: '44px 56px',
          display: 'flex',
          y: contentY,
        }}
      >
        {/* Thin white border frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{
            border: `1px solid ${T.borderW}`,
            padding: '48px 52px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Corner accents — architectural detail */}
          {[
            { top: -1, left: -1, borderTop: `2px solid ${T.gold}`, borderLeft: `2px solid ${T.gold}` },
            { top: -1, right: -1, borderTop: `2px solid ${T.gold}`, borderRight: `2px solid ${T.gold}` },
            { bottom: -1, left: -1, borderBottom: `2px solid ${T.gold}`, borderLeft: `2px solid ${T.gold}` },
            { bottom: -1, right: -1, borderBottom: `2px solid ${T.gold}`, borderRight: `2px solid ${T.gold}` },
          ].map((style, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.06 }}
              style={{
                position: 'absolute',
                width: 20, height: 20,
                ...style,
              }}
            />
          ))}

          {/* Top content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11, letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 30,
              }}
            >Wave of Digital Law</motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.15, delay: 1.1, ease }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(3.6rem, 7.5vw, 8.5rem)',
                lineHeight: 0.9,
                color: T.white,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              LawScale<br />Compliance
            </motion.h1>
          </div>

          {/* Bottom: label + arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.55 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: 48,
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11, letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
            }}>Portfolio</span>

            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              <ArrowDown size={22} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   §2  STEP INTO LAW
───────────────────────────────────────────────────────────── */
function StepIntoLaw() {
  const [ref, inView] = useReveal()

  return (
    <section
      ref={ref}
      className="step-grid"
      style={{
        background: T.offWhite,
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        overflow: 'hidden',
      }}
    >
      {/* ── LEFT ── */}
      <div style={{
        padding: '96px 64px 96px 80px',
        borderRight: `1px solid ${T.borderD}`,
      }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Giant decorative letter */}
          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(5rem, 14vw, 12rem)',
              lineHeight: 0.82,
              color: T.navy,
              opacity: 0.055,
              letterSpacing: '-0.06em',
              marginBottom: -22,
              userSelect: 'none',
            }}
          >N</motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 4.8vw, 4.5rem)',
              color: T.navy,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 0 36px',
            }}
          >
            STEP INTO<br />LAW
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              borderTop: `2.5px solid ${T.navy}`,
              paddingTop: 30,
            }}
          >
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, lineHeight: 1.82,
              color: T.text, marginBottom: 20,
            }}>
              Se han adoptado más de <strong>101 leyes de la UE</strong> relacionadas
              con la digitalización, y 24 más estaban en tramitación para 2029.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, lineHeight: 1.82,
              color: T.text,
            }}>
              Con estas nuevas regulaciones, las organizaciones deben priorizar
              cómo implementar los distintos requisitos, comprender cómo se
              relacionan entre sí y gestionar su solapamiento con leyes anteriores.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT ── wave diagram */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.05, delay: 0.2, ease }}
        style={{
          padding: '80px 52px 80px 48px',
          background: T.white,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <DigitalLawWave />
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   §3  SERVICES
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: 'FORMACIÓN Y CONCIENCIACIÓN',
    sub: 'TALLERES DE COMPLIANCE',
    body: 'Transformamos la normativa en conocimiento práctico para tu organización.',
  },
  {
    title: 'IDENTIFICACIÓN BRECHAS',
    sub: 'CONOCIMIENTO APLICADO',
    body: 'Antes de actuar, es necesario saber dónde estamos. El ecosistema legal europeo es vasto, pero no todos los reglamentos impactan de la misma forma en tu negocio.',
  },
  {
    title: 'APOYO IMPLANTACIÓN CONTROLES',
    sub: 'SISTEMAS DE GESTIÓN INTEGRADOS',
    body: 'Una vez identificados los requisitos, el desafío es integrarlos en el día a día sin que la operativa se detenga.',
  },
  {
    title: 'SEGUIMIENTO Y MEJORA',
    sub: 'CONSTANTE ADAPTACIÓN',
    body: 'El servicio de Seguimiento y Mejora LawScale garantiza que el cumplimiento digital de tu organización evoluciona de forma continua.',
  },
  {
    title: 'PROTECCIÓN ANTE TERCEROS',
    sub: 'REDACCIÓN DE CLÁUSULAS CONTRACTUALES',
    body: 'Blindaje jurídico en la contratación relacionada con la tecnología y los datos.',
  },
  {
    title: 'SEGURIDAD DE PRODUCTOS',
    sub: 'EVALUACIÓN Y CERTIFICACIÓN',
    body: 'Apoyo en la evaluación de la seguridad de los productos digitales.',
  },
]

function ServiceCard({ svc, idx }) {
  const [ref, inView] = useReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 52, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.88, delay: (idx % 3) * 0.1, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Image wrapper */}
      <div style={{ marginBottom: 22, overflow: 'hidden', aspectRatio: '4/3' }}>
        <motion.div
          animate={{ scale: hovered ? 1.045 : 1 }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <CinematicPlaceholder style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>

      {/* Service name */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 10.5, fontWeight: 500,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.88)', marginBottom: 10,
      }}>{svc.title}</p>

      {/* Subtitle — gold */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 9.5, fontWeight: 700,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: T.gold, marginBottom: 18,
      }}>{svc.sub}</p>

      {/* Thin separator */}
      <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, marginBottom: 18 }} />

      {/* Body */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 13, lineHeight: 1.78,
        color: 'rgba(255,255,255,0.48)',
        marginBottom: 24, flex: 1,
      }}>{svc.body}</p>

      {/* CTA button — outlined minimal */}
      <motion.button
        whileHover={{
          backgroundColor: 'rgba(255,255,255,0.09)',
          borderColor: 'rgba(255,255,255,0.5)',
          color: 'rgba(255,255,255,0.95)',
        }}
        style={{
          alignSelf: 'flex-start',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.24)',
          color: 'rgba(255,255,255,0.65)',
          padding: '10px 24px',
          fontFamily: 'Inter, sans-serif',
          fontSize: 11, letterSpacing: '0.1em',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none',
        }}
      >Read more</motion.button>
    </motion.article>
  )
}

function Services() {
  const [ref, inView] = useReveal()

  return (
    <section style={{ background: T.navy, padding: '100px 80px 120px' }}>
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 44, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.05, ease }}
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 3.8vw, 3.6rem)',
          color: T.white, lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: '64%',
          marginBottom: 68,
        }}
      >
        Soluciones para garantizar la resiliencia y el cumplimiento normativo
      </motion.h2>

      <div
        className="services-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '60px 40px',
        }}
      >
        {SERVICES.map((svc, i) => (
          <ServiceCard key={i} svc={svc} idx={i} />
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   §4  TEAM / BIO
───────────────────────────────────────────────────────────── */
const TEAM = [
  {
    bio: `Ingeniera de Organización Industrial con más de 30 años de experiencia liderando el gobierno y la gestión de la tecnología. PMP® ITIL Expert®

Mi misión en LawScale es traducir la complejidad regulatoria en tareas concretas y accionables, integradas en la estructura organizativa. Ayudo a las empresas a identificar los diferentes pasos que apoyan su innovación, logrando que el cumplimiento sea un proceso eficiente y no una barrera.`,
  },
  {
    bio: `Abogada especializada en Compliance y entorno regulatorio.
Certificada Compliance · Socia profesional ENATIC

Mi enfoque se centra en dotar a las empresas de la seguridad jurídica necesaria para operar en el mercado europeo, garantizando que el cumplimiento normativo sea el escudo que proteja tanto su ética como su crecimiento.`,
  },
]

function Team() {
  const [ref, inView] = useReveal()

  return (
    <section
      ref={ref}
      className="team-section"
      style={{
        background: T.navyDeep,
        display: 'grid',
        gridTemplateColumns: '40% 60%',
      }}
    >
      {/* ── LEFT: stacked portraits ── */}
      <div>
        {TEAM.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, filter: 'blur(16px)' }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.45, delay: i * 0.28, ease }}
            style={{ height: '50vh', position: 'relative', overflow: 'hidden' }}
          >
            <CinematicPlaceholder
              style={{ width: '100%', height: '100%' }}
              label={`Perfil ${i + 1}`}
            />
            {/* Blend edge into bio panel */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: '28%',
              background: `linear-gradient(to right, transparent, ${T.navyDeep})`,
            }} />
            {/* Bottom separator line */}
            {i === 0 && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 1,
                background: 'rgba(255,255,255,0.08)',
              }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* ── RIGHT: bio content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          padding: '72px 60px 72px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Top hairline */}
        <motion.div variants={fadeIn} style={{
          height: 1,
          background: 'rgba(255,255,255,0.12)',
          marginBottom: 44,
        }} />

        {TEAM.map((member, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            style={{
              paddingBottom: i < TEAM.length - 1 ? 44 : 0,
              marginBottom: i < TEAM.length - 1 ? 44 : 0,
              borderBottom: i < TEAM.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: 24,
            }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.26)',
                paddingTop: 3,
              }}>BIO</span>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13.5, lineHeight: 1.85,
                color: 'rgba(255,255,255,0.72)',
                margin: 0, whiteSpace: 'pre-line',
              }}>{member.bio}</p>
            </div>
          </motion.div>
        ))}

        {/* Bottom hairline */}
        <motion.div variants={fadeIn} style={{
          height: 1,
          background: 'rgba(255,255,255,0.12)',
          marginTop: 44,
        }} />
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   §5  TEAM WORKING
───────────────────────────────────────────────────────────── */
const CREDENTIALS = [
  {
    title: 'Masterclass in Psychological Thriller Filmmaking',
    inst: 'Obscura Film Institute, London',
    desc: 'Focused on the psychological aspects of storytelling, delving into the art of suspense, subtext, and building tension.',
  },
  {
    title: 'Short Course in Cinematic Sound Design',
    inst: 'Whisper Studios, San Francisco',
    desc: 'Studied the art of creating immersive soundscapes to enhance the atmospheric quality of thriller films.',
  },
]

function TeamWorking() {
  const [ref, inView] = useReveal()

  return (
    <section
      ref={ref}
      className="teamworking-grid"
      style={{
        background: T.offWhite,
        display: 'grid',
        gridTemplateColumns: '1fr 1.65fr',
        padding: '96px 80px',
        gap: 0,
      }}
    >
      {/* Left */}
      <div style={{ paddingRight: 64, borderRight: `1px solid ${T.borderD}` }}>
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
            color: T.navy, lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: '0 0 28px',
          }}
        >
          Team<br />Working
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14, color: '#6677AA', lineHeight: 1.75,
          }}
        >
          Equipo multidisciplinar especializado en compliance digital y
          derecho tecnológico europeo.
        </motion.p>
      </div>

      {/* Right: credential list */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{ paddingLeft: 60 }}
      >
        {CREDENTIALS.map((cred, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            style={{
              borderTop: `1px solid ${T.borderD}`,
              padding: '30px 0',
            }}
          >
            <h4 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600, fontSize: 15.5,
              color: T.navy, margin: '0 0 7px',
            }}>{cred.title}</h4>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12, color: T.muted,
              margin: '0 0 12px', letterSpacing: '0.02em',
            }}>{cred.inst}</p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13, color: '#556688',
              lineHeight: 1.68, margin: 0,
            }}>{cred.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   §6  FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  const [ref, inView] = useReveal()

  return (
    <footer ref={ref} style={{ background: T.navyDeep, padding: '80px' }}>
      {/* ── White logo box ── */}
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, ease }}
        style={{
          background: T.white,
          border: `1px solid rgba(28,43,74,0.06)`,
          padding: '76px 60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <LogoDots size={72} />
          <div>
            <div style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 800, fontSize: 56,
              color: T.navy, lineHeight: 1,
              letterSpacing: '-0.03em',
            }}>LawScale</div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700, fontSize: 16,
              color: T.gold, letterSpacing: '0.42em',
              textTransform: 'uppercase',
              marginTop: 4,
            }}>DIGITAL</div>
          </div>
        </div>
      </motion.div>

      {/* ── Thank you box ── */}
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, delay: 0.18, ease }}
        style={{
          border: `1px solid ${T.borderW}`,
          padding: '60px 72px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ambient glow inside */}
        <motion.div
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 50% 70% at 20% 60%, rgba(212,168,67,0.06) 0%, transparent 65%)',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, x: -36, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.1, delay: 0.42, ease }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(4.8rem, 10vw, 9.5rem)',
            color: T.white, lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
            position: 'relative',
          }}
        >Thank you</motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.75 }}
          style={{ textAlign: 'right', position: 'relative' }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.36)', marginBottom: 13,
          }}>Contact</p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 6px',
          }}>LawScale</p>
          <a
            href="mailto:hello@lawscale.es"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, color: T.gold,
              textDecoration: 'none',
              borderBottom: `1px solid rgba(212,168,67,0.3)`,
              paddingBottom: 2,
            }}
          >hello@lawscale.es</a>
        </motion.div>
      </motion.div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
export default function LawScaleCompliance() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.navyDeep}; -webkit-font-smoothing: antialiased; }

        /* ── RESPONSIVE ─────────────────────────────── */

        @media (max-width: 768px) {
          /* Hero stacks */
          section.hero-wrap {
            flex-direction: column !important;
          }
          .hero-left {
            width: 100% !important;
            padding: 36px 28px !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .hero-right {
            padding: 28px !important;
          }

          /* Step into law stacks */
          .step-grid {
            grid-template-columns: 1fr !important;
          }

          /* Services 1 col */
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
          }

          /* Team stacks */
          .team-section {
            grid-template-columns: 1fr !important;
          }
          .team-section > div:first-child > div {
            height: 44vw !important;
          }

          /* Team working stacks */
          .teamworking-grid {
            grid-template-columns: 1fr !important;
            padding: 64px 28px !important;
          }
          .teamworking-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(28,43,74,0.12);
            padding-right: 0 !important;
            padding-bottom: 48px;
            margin-bottom: 48px;
          }
          .teamworking-grid > div:last-child {
            padding-left: 0 !important;
          }

          /* Footer */
          footer {
            padding: 40px 24px !important;
          }
          footer > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 36px;
            padding: 40px 36px !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .step-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }

        /* ── REDUCED MOTION ─────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <Hero />
      <StepIntoLaw />
      <Services />
      <Team />
      <TeamWorking />
      <Footer />
    </>
  )
}
