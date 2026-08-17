import { useEffect, useState, type ReactElement } from 'react'

export type ConstellationVariant = 'landing' | 'ambient' | 'results'

interface ConstellationBackgroundProps {
  variant?: ConstellationVariant
  revealed?: boolean
}

// ── D20 icosahedron geometry (viewBox 1440×900, center 720,450) ───────
const CX = 720
const CY = 450

function pentagonRing(cx: number, cy: number, r: number, startAngle: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const a = startAngle + (2 * Math.PI * i) / 5
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  })
}

const OUTER = pentagonRing(CX, CY, 200, -Math.PI / 2)
const INNER = pentagonRing(CX, CY, 112, -Math.PI / 2 + Math.PI / 5)

const D20_SEGS: [number, number, number, number][] = [
  ...OUTER.map((p, i) => [p.x, p.y, OUTER[(i + 1) % 5].x, OUTER[(i + 1) % 5].y] as [number, number, number, number]),
  ...INNER.map((p, i) => [p.x, p.y, INNER[(i + 1) % 5].x, INNER[(i + 1) % 5].y] as [number, number, number, number]),
  ...OUTER.flatMap((p, i) => [
    [p.x, p.y, INNER[i].x, INNER[i].y] as [number, number, number, number],
    [p.x, p.y, INNER[(i + 4) % 5].x, INNER[(i + 4) % 5].y] as [number, number, number, number],
  ]),
  ...INNER.map(p => [p.x, p.y, CX, CY] as [number, number, number, number]),
]

// ── Star field dots ───────────────────────────────────────────────────
const DOTS: { id: string; x: number; y: number; r: number; cls: string }[] = [
  { id: 'r1', x: 76,   y: 86,  r: 2,   cls: 'twinkle-a' },
  { id: 'r2', x: 208,  y: 74,  r: 1.5, cls: 'twinkle-c' },
  { id: 'r3', x: 62,   y: 196, r: 1,   cls: 'twinkle-b' },
  { id: 'r4', x: 242,  y: 230, r: 2,   cls: 'twinkle-d' },
  { id: 'r5', x: 318,  y: 150, r: 1.5, cls: 'twinkle-e' },
  { id: 'c1', x: 1364, y: 86,  r: 2,   cls: 'twinkle-b' },
  { id: 'c2', x: 1232, y: 74,  r: 1.5, cls: 'twinkle-a' },
  { id: 'c3', x: 1378, y: 196, r: 1,   cls: 'twinkle-d' },
  { id: 'c4', x: 1198, y: 230, r: 2,   cls: 'twinkle-c' },
  { id: 'c5', x: 1122, y: 150, r: 1.5, cls: 'twinkle-e' },
  { id: 'a1', x: 76,   y: 814, r: 2,   cls: 'twinkle-c' },
  { id: 'a2', x: 208,  y: 826, r: 1.5, cls: 'twinkle-e' },
  { id: 'a3', x: 62,   y: 704, r: 1,   cls: 'twinkle-a' },
  { id: 'a4', x: 242,  y: 670, r: 2,   cls: 'twinkle-b' },
  { id: 'a5', x: 318,  y: 750, r: 1.5, cls: 'twinkle-d' },
  { id: 'b1', x: 1364, y: 814, r: 2,   cls: 'twinkle-d' },
  { id: 'b2', x: 1232, y: 826, r: 1.5, cls: 'twinkle-b' },
  { id: 'b3', x: 1378, y: 704, r: 1,   cls: 'twinkle-c' },
  { id: 'b4', x: 1198, y: 670, r: 2,   cls: 'twinkle-a' },
  { id: 'b5', x: 1122, y: 750, r: 1.5, cls: 'twinkle-e' },
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
  [144, 135,  76,  86], [144, 135, 208,  74], [144, 135, 242, 230],
  [76,   86, 208,  74], [242, 230, 318, 150], [318, 150, 208,  74],
  [1296, 135, 1364,  86], [1296, 135, 1232,  74], [1296, 135, 1198, 230],
  [1364,  86, 1232,  74], [1198, 230, 1122, 150], [1122, 150, 1232,  74],
  [144, 765,  76, 814], [144, 765, 208, 826], [144, 765, 242, 670],
  [76,  814, 208, 826], [242, 670, 318, 750], [318, 750, 208, 826],
  [1296, 765, 1364, 814], [1296, 765, 1232, 826], [1296, 765, 1198, 670],
  [1364, 814, 1232, 826], [1198, 670, 1122, 750], [1122, 750, 1232, 826],
  [432, 184,  528, 116], [ 528, 116,  636, 158],
  [804, 116,  912, 158], [ 912, 158, 1008, 184],
  [432, 716,  528, 784], [ 528, 784,  636, 742],
  [804, 784,  912, 742], [ 912, 742, 1008, 716],
  [352, 360, 382, 254], [382, 254, 432, 184],
  [352, 540, 382, 646], [382, 646, 432, 716],
  [1088, 360, 1058, 254], [1058, 254, 1008, 184],
  [1088, 540, 1058, 646], [1058, 646, 1008, 716],
  [144, 135, 352, 360], [144, 765, 352, 540],
  [1296, 135, 1088, 360], [1296, 765, 1088, 540],
]

// ── Category anchor nodes ─────────────────────────────────────────────
// Each anchor embeds its Lucide icon paths (24×24 viewBox) as JSX.
// Positioning is via SVG translate so icons are perfectly co-located
// with the circle rings and rotate/scale together as one unit.
interface AnchorDef {
  id: string
  label: string
  x: number
  y: number
  paths: ReactElement
}

const ANCHORS: AnchorDef[] = [
  {
    id: 'race',
    label: 'Race',
    x: 144,
    y: 135,
    paths: (
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    ),
  },
  {
    id: 'class',
    label: 'Class',
    x: 1296,
    y: 135,
    paths: (
      <>
        <path d="m11 19-6-6" />
        <path d="m5 21-2-2" />
        <path d="m8 16-4 4" />
        <path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
      </>
    ),
  },
  {
    id: 'alignment',
    label: 'Alignment',
    x: 144,
    y: 765,
    paths: (
      <>
        <path d="M12 3v18" />
        <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
        <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M7 21h10" />
      </>
    ),
  },
  {
    id: 'background',
    label: 'Background',
    x: 1296,
    y: 765,
    paths: (
      <>
        <path d="M12 5v16" />
        <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
      </>
    ),
  },
]

const PROFILE_PATH = 'M 144 135 L 1296 135 L 1296 765 L 144 765 Z'
const PROFILE_PERIM = 3564

// Lucide icon scale: render at 26px within a 24px viewBox, centered at (0,0)
const ICON_SIZE   = 26
const ICON_SCALE  = ICON_SIZE / 24
const ICON_OFFSET = -(ICON_SIZE / 2)

// Gradual rotation: full landscape at ≥2050px, fully rotated at ≤700px
const ROT_START = 2050
const ROT_END   = 700
// Anchors are 315 SVG units above/below CY (|135-450| = |765-450| = 315)
const ANCHOR_DY = 315
// Minimum buffer (in SVG units) between a rotated anchor and the clipped edge
const ANCHOR_EDGE_MARGIN = 38

function getMapTransform(vw: number, vh: number) {
  const t = Math.max(0, Math.min(1, (ROT_START - vw) / (ROT_START - ROT_END)))
  const angle    = t * 90
  const rawScale = 1 - t * 0.35  // 1.0 → 0.65

  // After a CSS rotate(angle) the anchor's screen-x = CX ± ANCHOR_DY * groupScale.
  // We compute the SVG's actual render scale (preserveAspectRatio slice) from both
  // dimensions so we can clamp groupScale to guarantee anchors stay visible.
  const svgRenderScale = Math.max(vw / 1440, vh / 900)
  const visibleHalfX   = vw / svgRenderScale / 2          // SVG units from CX to visible edge
  const maxSafeScale   = (visibleHalfX - ANCHOR_EDGE_MARGIN) / ANCHOR_DY
  // Only apply the clamp when rotation is active; never collapse below 0.38
  const scale = t > 0
    ? Math.min(rawScale, Math.max(0.38, maxSafeScale))
    : 1

  return { angle, scale }
}

export function ConstellationBackground({
  variant = 'ambient',
  revealed = false,
}: ConstellationBackgroundProps) {
  const [animated, setAnimated] = useState(false)

  // Track both width and height — SVG slice scale depends on both dimensions
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth  : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  }))

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (revealed) {
      const t = setTimeout(() => setAnimated(true), 900)
      return () => clearTimeout(t)
    } else {
      setAnimated(false)
    }
  }, [revealed])

  const { angle, scale: mapScale } = getMapTransform(viewport.w, viewport.h)

  const isLanding = variant === 'landing'
  const isResults = variant === 'results'

  const d20Opacity        = isLanding ? 0.09 : 0.05
  const lineOpacity       = animated  ? 0.04 : isLanding ? 0.22 : 0.10
  const dotOpacity        = animated  ? 0.08 : isLanding ? 0.75 : 0.38
  const profileOpacity    = animated  ? 0.5  : 0
  const anchorBaseOpacity = animated  ? undefined : (isLanding ? 0.55 : 0.22)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Central purple radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(70,45,130,0.14) 0%, transparent 72%)',
        }}
      />

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="cg-goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/*
          Single group for all constellation content.
          angle (0–90°) and mapScale (1.0–0.65) are computed from viewport width
          so the layout rotates and scales continuously as the window narrows.
          Icons counter-rotate so they always face upright.
        */}
        <g
          style={{
            transform: angle > 0
              ? `rotate(${angle.toFixed(2)}deg) scale(${mapScale.toFixed(4)})`
              : undefined,
            transformOrigin: `${CX}px ${CY}px`,
            transition: 'transform 0.15s ease-out',
          }}
        >

          {/* D20 icosahedron outline */}
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

          {/* Constellation line network */}
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

          {/* Star field */}
          <g opacity={dotOpacity} style={{ transition: 'opacity 2.5s ease' }}>
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

          {/* Profile quadrilateral — draws in during results reveal */}
          {isResults && (
            <path
              d={PROFILE_PATH}
              stroke="var(--color-primary)"
              strokeWidth="0.7"
              fill="none"
              opacity={profileOpacity}
              strokeDasharray={PROFILE_PERIM}
              strokeDashoffset={animated ? 0 : PROFILE_PERIM}
              style={{
                transition:
                  'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1) 0.4s, opacity 0.6s ease',
              }}
            />
          )}

          {/* Category anchor nodes — circle ring + inline icon, perfectly co-located */}
          {ANCHORS.map((anchor, i) => (
            /*
              Outer <g> positions in SVG user-space so lines terminate exactly here.
              Inner <g> owns the CSS animation; transform-origin 0px 0px = anchor center.
            */
            <g key={anchor.id} transform={`translate(${anchor.x}, ${anchor.y})`}>
              <g
                style={{
                  transformOrigin: '0px 0px',
                  opacity: anchorBaseOpacity,
                  transition: animated ? 'none' : 'opacity 1.4s ease',
                  animation: animated
                    ? `anchor-reveal 0.85s cubic-bezier(0.16,1,0.3,1) ${i * 0.2}s both,
                       anchor-pulse  3.2s ease-in-out ${i * 0.2 + 0.85}s infinite`
                    : 'none',
                }}
              >
                {/* Dark surface so icon reads against the star field */}
                <circle r={20} fill="var(--color-surface)" opacity={0.9} />
                {/* Gold ring that constellation lines connect to */}
                <circle
                  r={22}
                  fill={animated ? 'url(#cg-goldGlow)' : 'none'}
                  stroke="var(--color-primary)"
                  strokeWidth="0.9"
                />
                {/*
                  Icon is translated/scaled to fill the ring.
                  rotate(-angle, 12, 12) counter-rotates within the icon's own
                  24px coordinate space so it stays upright when the parent rotates.
                */}
                <g
                  transform={`translate(${ICON_OFFSET}, ${ICON_OFFSET}) scale(${ICON_SCALE.toFixed(4)}) rotate(${(-angle).toFixed(2)}, 12, 12)`}
                  stroke="var(--color-primary)"
                  fill="none"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {anchor.paths}
                </g>

                {/* Ripple ring that expands on reveal */}
                {animated && (
                  <circle
                    r={26}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    style={{
                      transformOrigin: '0px 0px',
                      animation: `ripple 1.8s ease-out ${i * 0.22}s 2`,
                    }}
                  />
                )}
              </g>
            </g>
          ))}

        </g>
      </svg>
    </div>
  )
}

// ── Anchor icon path data (Lucide 24×24 viewBox) ─────────────────────
// Defined after the component so React JSX is resolved at module scope.
// These literal path elements are embedded in the ANCHORS array above.
