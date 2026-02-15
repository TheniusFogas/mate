import { useMemo, useState } from 'react';

const VIZ_2D_MAP: Record<string, string> = {
  triunghi: 'triangle', dreptunghi: 'rectangle', cerc: 'circle',
  trapez: 'trapezoid', paralelogram: 'parallelogram', romb: 'rhombus',
  poligon_reg: 'polygon',
};

export const hasViz2D = (id: string) => id in VIZ_2D_MAP;

interface Props {
  calcId: string;
  params: Record<string, number>;
}

const Viz2D = ({ calcId, params }: Props) => {
  const type = VIZ_2D_MAP[calcId];
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);

  const content = useMemo(() => {
    if (!type) return null;
    const blue = 'hsl(220,75%,50%)';
    const blueFill = 'hsl(220,75%,50%)';
    const blueLabel = 'hsl(220,60%,35%)';
    const sw = 0.4;
    const fs = 2.8;

    switch (type) {
      case 'triangle': {
        const a = params.a || 3, b = params.b || 4, c = params.c || 5;
        const cosA = Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)));
        const sinA = Math.sqrt(1 - cosA * cosA);
        const pts: [number, number][] = [[0, 50], [c * 5, 50], [b * cosA * 5, 50 - b * sinA * 5]];
        const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
        const cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
        const ox = 50 - cx, oy = 50 - cy;
        const p = pts.map(([x, y]) => [x + ox, y + oy] as [number, number]);
        return (
          <>
            <polygon
              points={p.map(pt => pt.join(',')).join(' ')}
              fill={blueFill} fillOpacity={0.12}
              stroke={blue} strokeWidth={sw}
            />
            <text x={(p[0][0] + p[1][0]) / 2} y={p[0][1] + 5} textAnchor="middle" fill={blueLabel} fontSize={fs} fontFamily="Inter">c={c}</text>
            <text x={(p[1][0] + p[2][0]) / 2 + 3} y={(p[1][1] + p[2][1]) / 2} textAnchor="start" fill={blueLabel} fontSize={fs} fontFamily="Inter">a={a}</text>
            <text x={(p[0][0] + p[2][0]) / 2 - 3} y={(p[0][1] + p[2][1]) / 2} textAnchor="end" fill={blueLabel} fontSize={fs} fontFamily="Inter">b={b}</text>
          </>
        );
      }
      case 'rectangle': {
        const L = params.L || 8, l = params.l || 5;
        const scale = 70 / Math.max(L, l);
        const w = L * scale, h = l * scale;
        const x0 = 50 - w / 2, y0 = 50 - h / 2;
        return (
          <>
            <rect x={x0} y={y0} width={w} height={h} fill={blueFill} fillOpacity={0.12} stroke={blue} strokeWidth={sw} />
            <text x={50} y={y0 - 2} textAnchor="middle" fill={blueLabel} fontSize={fs} fontFamily="Inter">L={L}</text>
            <text x={x0 + w + 2} y={50} textAnchor="start" fill={blueLabel} fontSize={fs} fontFamily="Inter" dominantBaseline="middle">l={l}</text>
            {/* diagonal */}
            <line x1={x0} y1={y0} x2={x0 + w} y2={y0 + h} stroke={blue} strokeWidth={0.2} strokeDasharray="1.5" opacity={0.4} />
          </>
        );
      }
      case 'circle': {
        const r = params.r || 5;
        const sr = 35;
        return (
          <>
            <circle cx={50} cy={50} r={sr} fill={blueFill} fillOpacity={0.12} stroke={blue} strokeWidth={sw} />
            <line x1={50} y1={50} x2={50 + sr} y2={50} stroke={blue} strokeWidth={0.3} />
            <text x={50 + sr / 2} y={48} textAnchor="middle" fill={blueLabel} fontSize={fs} fontFamily="Inter">r={r}</text>
            <circle cx={50} cy={50} r={0.8} fill={blue} />
            {/* sector line if alpha exists */}
            {params.alpha && (() => {
              const ar = (params.alpha * Math.PI) / 180;
              return (
                <>
                  <line x1={50} y1={50} x2={50 + sr * Math.cos(-ar)} y2={50 + sr * Math.sin(-ar)} stroke={blue} strokeWidth={0.3} />
                  <text x={50 + (sr + 5) * Math.cos(-ar / 2)} y={50 + (sr + 5) * Math.sin(-ar / 2)} textAnchor="middle" fill={blueLabel} fontSize={2.2} fontFamily="Inter">{params.alpha}°</text>
                </>
              );
            })()}
          </>
        );
      }
      case 'trapezoid': {
        const B = params.B || 10, b = params.b || 6, h = params.h || 4;
        const scale = 70 / Math.max(B, h * 1.5);
        const bw = B * scale, sw2 = b * scale, sh = h * scale;
        const y1 = 50 + sh / 2, y2 = 50 - sh / 2;
        const offset = (bw - sw2) / 2;
        const pts: [number, number][] = [
          [50 - bw / 2, y1], [50 + bw / 2, y1],
          [50 - bw / 2 + offset + sw2, y2], [50 - bw / 2 + offset, y2],
        ];
        return (
          <>
            <polygon points={pts.map(p => p.join(',')).join(' ')} fill={blueFill} fillOpacity={0.12} stroke={blue} strokeWidth={0.4} />
            <text x={50} y={y1 + 4} textAnchor="middle" fill={blueLabel} fontSize={fs} fontFamily="Inter">B={B}</text>
            <text x={50} y={y2 - 2} textAnchor="middle" fill={blueLabel} fontSize={fs} fontFamily="Inter">b={b}</text>
            <line x1={50 + bw / 2 + 2} y1={y1} x2={50 + bw / 2 + 2} y2={y2} stroke={blueLabel} strokeWidth={0.2} strokeDasharray="1" />
            <text x={50 + bw / 2 + 5} y={50} textAnchor="start" fill={blueLabel} fontSize={fs} fontFamily="Inter" dominantBaseline="middle">h={h}</text>
          </>
        );
      }
      case 'parallelogram': {
        const a = params.a || 6, b = params.b || 4, h = params.h || 3;
        const scale = 60 / Math.max(a + b * 0.3, b);
        const aw = a * scale, bw = b * scale, sh = h * scale;
        const skew = bw * 0.3;
        const pts: [number, number][] = [
          [50 - aw / 2, 50 + sh / 2],
          [50 + aw / 2, 50 + sh / 2],
          [50 + aw / 2 + skew, 50 - sh / 2],
          [50 - aw / 2 + skew, 50 - sh / 2],
        ];
        return (
          <>
            <polygon points={pts.map(p => p.join(',')).join(' ')} fill={blueFill} fillOpacity={0.12} stroke={blue} strokeWidth={0.4} />
            <text x={50} y={pts[0][1] + 4} textAnchor="middle" fill={blueLabel} fontSize={fs} fontFamily="Inter">a={a}</text>
          </>
        );
      }
      default:
        return null;
    }
  }, [type, JSON.stringify(params)]);

  if (!type || !content) return null;

  return (
    <div className="w-full h-[120px] rounded-[4px] overflow-hidden bg-muted/30 border border-border/50">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {content}
      </svg>
    </div>
  );
};

export default Viz2D;
