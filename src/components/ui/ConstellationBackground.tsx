import { useEffect, useState } from 'react'
import { Shield, Sword, Scale, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ConstellationVariant = 'landing' | 'ambient' | 'results'

interface ConstellationBackgroundProps {
  variant?: ConstellationVariant
  /** On the results page, trigger the constellation reveal animation */
  revealed?: boolean
}

// ── D20 geometry (viewBox 1440×900, D20 centered at 720,450) ──────────
const CX = 720
const CY = 450

function pentagonRing(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
): { x: number; y: number }[] {
  return Array.from({ length: 5 }, (_, i) => {
    const a = startAngle + (2 * Math.PI * i) / 5
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  })
}

// Outer pentagon pointing up; inner pentagon rotated 36°
const OUTER = pentagonRing(CX, CY, 200, -Math.PI / 2)
const INNER = pentagonRing(CX, CY, 112, -Math.PI / 2 + Math.PI / 5)

const D20_SEGS: [number, number, number, number][] = [
  // Outer pentagon edges
  ...OUTER.map(
    (p, i) =>
      [p.x, p.y, OUTER[(i + 1) % 5].x, OUTER[(i + 1) % 5].y] as [
        number,
        number,
        number,
        number,
      ],
  ),
  // Inner pentagon edges
  ...INNER.map(
    (p, i) =>
      [p.x, p.y, INNER[(i + 1) % 5].x, INNER[(i + 1) % 5].y] as [
        number,
        number,
        number,
        number,
      ],
  ),
  // Outer → adjacent inner spokes
  ...OUTER.flatMap((p, i) => [
    [p.x, p.y, INNER[i].x, INNER[i].y] as [number, number, number, number],
    [p.x, p.y, INNER[(i + 4) % 5].x, INNER[(i + 4) % 5].y] as [
      number,
      number,
      number,
      number,
    ],
  ]),
  // Inner → center spokes
  ...INNER.map(
    p => [p.x, p.y, CX, CY] as [number, number, number, number],
  ),
]

// ── Category anchor positions ─────────────────────────────────────────
// SVG units match percentage of 1440×900 viewport
const ANCHORS: {
  id: string
  icon: LucideIcon
  label: string
  x: number
  y: number
}[] = [
  { id: 'race',       icon: Shield,   label: 'Race',       x: 144,  y: 135 },
  { id: 'class',      icon: Sword,    label: 'Class',      x: 1296, y: 135 },
  { id: 'alignment',  icon: Scale,    label: 'Alignment',  x: 144,  y: 765 },
  { id: 'background', icon: BookOpen, label: 'Background', x: 1296, y: 765 },
]

// ── Constellation dot-star field ──────────────────────────────────────
const DOTS: { id: string; x: number; y: number; r: number; cls: string }[] = [
  // Race cluster (top-left)
  { id: 'r1', x: 76,  y: 86,  r: 2,   cls: 'twinkle-a' },
  { id: 'r2', x: 208, y: 74,  r: 1.5, cls: 'twinkle-c' },
  { id: 'r3', x: 62,  y: 196, r: 1,   cls: 'twinkle-b' },
  { id: 'r4', x: 242, y: 230, r: 2,   cls: 'twinkle-d' },
  { id: 'r5', x: 318, y: 150, r: 1.5, cls: 'twinkle-e' },
  // Class cluster (top-right)
  { id: 'c1', x: 1364, y: 86,  r: 2,   cls: 'twinkle-b' },
  { id: 'c2', x: 1232, y: 74,  r: 1.5, cls: 'twinkle-a' },
  { id: 'c3', x: 1378, y: 196, r: 1,   cls: 'twinkle-d' },
  { id: 'c4', x: 1198, y: 230, r: 2,   cls: 'twinkle-c' },
  { id: 'c5', x: 1122, y: 150, r: 1.5, cls: 'twinkle-e' },
  // Alignment cluster (bottom-left)
  { id: 'a1', x: 76,  y: 814, r: 2,   cls: 'twinkle-c' },
  { id: 'a2', x: 208, y: 826, r: 1.5, cls: 'twinkle-e' },
  { id: 'a3', x: 62,  y: 704, r: 1,   cls: 'twinkle-a' },
  { id: 'a4', x: 242, y: 670, r: 2,   cls: 'twinkle-b' },
  { id: 'a5', x: 318, y: 750, r: 1.5, cls: 'twinkle-d' },
  // Background cluster (bottom-right)
  { id: 'b1', x: 1364, y: 814, r: 2,   cls: 'twinkle-d' },
  { id: 'b2', x: 1232, y: 826, r: 1.5, cls: 'twinkle-b' },
  { id: 'b3', x: 1378, y: 704, r: 1,   cls: 'twinkle-c' },
  { id: 'b4', x: 1198, y: 670, r: 2,   cls: 'twinkle-a' },
  { id: 'b5', x: 1122, y: 750, r: 1.5, cls: 'twinkle-e' },
  // Middle scatter
  { id: 'm1',  x: 432,  y: 184, r: 1.5, cls: 'twinkle-b' },
  { id: 'm2',  x: 528,  y: 116, r: 2,   cls: 'twinkle-d' },
  { id: 'm3',  x: 636,  y: 158, r: 1,   cls: 'twinkle-a' },
  { id: 'm4',  x: 804,  y: 116, r: 1.5, cls: 'twinkle-e' },
  { id: 'm5',  x: 912,  y: 158, r: 1,   cls: 'twinkle-c' },
  { id: 'm6',  x: 1008, y: 184, r: 2,   cls: 'twinkle-b' },
  { id: 'm7',  x: 432,  y: 716, r: 1.5, cls: 'twinkle-a' },
  { id: 'm8',  x: 528,  y: 784, r: 1,   cls: 'twinkle-d' },
  { id: 'm9',  x: 636,  y: 742, r: 2,   cls: 'twinkle-e' },
  { id: 'm10', x: 804,  y: 784, r: 1,   cls: 'twinkle-c' },
  { id: 'm11', x: 912,  y: 742, r: 1.5, cls: 'twinkle-b' },
  { id: 'm12', x: 1008, y: 716, r: 2,   cls: 'twinkle-a' },
  { id: 's1',  x: 352,  y: 360, r: 1.5, cls: 'twinkle-d' },
  { id: 's2',  x: 382,  y: 254, r: 1,   cls: 'twinkle-c' },
  { id: 's3',  x: 352,  y: 540, r: 1,   cls: 'twinkle-e' },
  { id: 's4',  x: 382,  y: 646, r: 1.5, cls: 'twinkle-a' },
  { id: 's5',  x: 1088, y: 360, r: 1,   cls: 'twinkle-b' },
  { id: 's6',  x: 1058, y: 254, r: 1.5, cls: 'twinkle-d' },
  { id: 's7',  x: 1088, y: 540, r: 1.5, cls: 'twinkle-c' },
  { id: 's8',  x: 1058, y: 646, r: 1,   cls: 'twinkle-e' },
]

// ── Constellation line network ────────────────────────────────────────
const CONST_LINES: [number, number, number, number][] = [
  // Race cluster
  [144, 135,  76,  86], [144, 135, 208,  74], [144, 135, 242, 230],
  [76,   86, 208,  74], [242, 230, 318, 150], [318, 150, 208,  74],
  // Class cluster
  [1296, 135, 1364,  86], [1296, 135, 1232,  74], [1296, 135, 1198, 230],
  [1364,  86, 1232,  74], [1198, 230, 1122, 150], [1122, 150, 1232,  74],
  // Alignment cluster
  [144, 765,  76, 814], [144, 765, 208, 826], [144, 765, 242, 670],
  [76,  814, 208, 826], [242, 670, 318, 750], [318, 750, 208, 826],
  // Background cluster
  [1296, 765, 1364, 814], [1296, 765, 1232, 826], [1296, 765, 1198, 670],
  [1364, 814, 1232, 826], [1198, 670, 1122, 750], [1122, 750, 1232, 826],
  // Middle bridge — top
  [432, 184,  528, 116], [ 528, 116,  636, 158],
  [804, 116,  912, 158], [ 912, 158, 1008, 184],
  // Middle bridge — bottom
  [432, 716,  528, 784], [ 528, 784,  636, 742],
  [804, 784,  912, 742], [ 912, 742, 1008, 716],
  // Side connectors
  [352, 360, 382, 254], [382, 254, 432, 184],
  [352, 540, 382, 646], [382, 646, 432, 716],
  [1088, 360, 1058, 254], [1058, 254, 1008, 184],
  [1088, 540, 1058, 646], [1058, 646, 1008, 716],
  // Anchor → side node bridges
  [144, 135, 352, 360], [144, 765, 352, 540],
  [1296, 135, 1088, 360], [1296, 765, 1088, 540],
]

// Profile quadrilateral perimeter ≈ 2*(1152) + 2*(630) = 3564
const PROFILE_PERIM = 3564

export function ConstellationBackground({
  variant = 'ambient',
  revealed = false,
}: ConstellationBackgroundProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setAnimated(true), 900)
      return () => clearTimeout(t)
    } else {
      setAnimated(false)
    }
  }, [revealed])

  const isLanding = variant === 'landing'
  const isResults = variant === 'results'

  // Derived opacity levels
  const d20Opacity   = isLanding ? 0.09 : 0.05
  const lineOpacity  = animated ? 0.04 : isLanding ? 0.22 : 0.10
  const dotOpacity   = animated ? 0.08 : isLanding ? 0.75 : 0.38
  const profileOpacity = animated ? 0.5 : 0
  const anchorRingOpacity = animated ? 0.9 : isLanding ? 0.45 : 0.2

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep purple radial vignette at center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(70,45,130,0.14) 0%, transparent 72%)',
        }}
      />

      {/* SVG layer: D20 + stars + constellation lines */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* D20 icosahedron geometry */}
        <g
          stroke="var(--color-primary)"
          strokeWidth="0.75"
          fill="none"
          opacity={d20Opacity}
          style={{ transition: 'opacity 2s ease' }}
        >
          <circle cx={CX} cy={CY} r={214} />
          {D20_SEGS.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>

        {/* Constellation lines */}
        <g
          stroke="var(--color-accent)"
          strokeWidth="0.55"
          fill="none"
          opacity={lineOpacity}
          style={{ transition: 'opacity 2.5s ease' }}
        >
          {CONST_LINES.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>

        {/* Star field dots */}
        <g style={{ transition: 'opacity 2.5s ease' }} opacity={dotOpacity}>
          {DOTS.map(dot => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill="var(--color-foreground)"
              className={dot.cls}
            />
          ))}
        </g>

        {/* Anchor ring indicators */}
        {ANCHORS.map(anchor => (
          <g key={`ring-${anchor.id}`}>
            <circle
              cx={anchor.x}
              cy={anchor.y}
              r={16}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="0.8"
              opacity={anchorRingOpacity}
              style={{ transition: 'opacity 1.4s ease' }}
            />
            {animated && (
              <circle
                cx={anchor.x}
                cy={anchor.y}
                r={16}
                fill="url(#goldGlow)"
                opacity={0.3}
              />
            )}
          </g>
        ))}

        {/* Profile quadrilateral — draws in during results reveal */}
        {isResults && (
          <path
            d="M 144 135 L 1296 135 L 1296 765 L 144 765 Z"
            stroke="var(--color-primary)"
            strokeWidth="0.7"
            fill="none"
            opacity={profileOpacity}
            strokeDasharray={PROFILE_PERIM}
            strokeDashoffset={animated ? 0 : PROFILE_PERIM}
            style={{
              transition: `stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1) 0.4s, opacity 0.6s ease`,
            }}
          />
        )}

        {/* Ripple rings that fire once on each anchor when revealed */}
        {animated &&
          ANCHORS.map((anchor, i) => (
            <circle
              key={`ripple-${anchor.id}`}
              cx={anchor.x}
              cy={anchor.y}
              r={18}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1"
              style={{
                animation: `ripple 1.8s ease-out ${i * 0.22}s 2`,
                transformOrigin: `${anchor.x}px ${anchor.y}px`,
              }}
            />
          ))}
      </svg>

      {/* React icon overlay — category anchors */}
      <div className="absolute inset-0">
        {ANCHORS.map((anchor, i) => {
          const Icon = anchor.icon
          // Convert SVG coordinate to % of 1440×900 viewport
          const left = (anchor.x / 1440) * 100
          const top  = (anchor.y / 900) * 100

          return (
            <div
              key={anchor.id}
              className="absolute"
              aria-label={anchor.label}
              style={{
                left: `${left}%`,
                top:  `${top}%`,
                // Pre-reveal: inline opacity controlled by variant
                ...(animated ? {} : { opacity: isLanding ? 0.55 : 0.22 }),
                // Post-reveal: animation takes over (fill-mode both)
                animation: animated
                  ? `anchor-reveal 0.85s cubic-bezier(0.16,1,0.3,1) ${i * 0.2}s both,
                     anchor-pulse  3.2s ease-in-out ${i * 0.2 + 0.85}s infinite`
                  : 'none',
                transition: animated ? 'none' : 'opacity 1.4s ease',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Icon
                size={18}
                color="var(--color-primary)"
                strokeWidth={1.5}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
