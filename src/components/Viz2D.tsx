import { useMemo } from 'react';

interface Props {
  calcId: string;
  params: Record<string, number>;
}

// Clean SVG visualization components for each calculator type
const Viz2D = ({ calcId, params }: Props) => {
  const content = useMemo(() => {
    const blue   = 'hsl(217,72%,60%)';
    const blue2  = 'hsl(200,80%,55%)';
    const red    = 'hsl(0,72%,60%)';
    const green  = 'hsl(145,60%,50%)';
    const fill   = 'hsl(217,72%,60%)';
    const label  = 'hsl(217,60%,75%)';
    const axis   = 'hsl(217,30%,55%)';
    const sw     = 0.5;
    const PI     = Math.PI;

    // Helper: clamp SVG Y
    const cy = (v: number, min = 5, max = 95) => Math.max(min, Math.min(max, v));

    // Axes helper
    const Axes = ({ x0=50, y0=50 }: { x0?: number; y0?: number }) => (
      <>
        <line x1={8} y1={y0} x2={92} y2={y0} stroke={axis} strokeWidth={0.25} />
        <line x1={x0} y1={8} x2={x0} y2={92} stroke={axis} strokeWidth={0.25} />
        <polygon points={`${x0-1},10 ${x0+1},10 ${x0},7`} fill={axis} />
        <polygon points={`89,${y0-1} 89,${y0+1} 92,${y0}`} fill={axis} />
      </>
    );

    switch (calcId) {

      // ─── GEOMETRY 2D ───────────────────────────────────────────────

      case 'triunghi': {
        const a = params.a || 3, b = params.b || 4, c = params.c || 5;
        // Law of cosines to get vertex C
        const cosA = Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)));
        const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
        const scale = 60 / Math.max(a, b, c, 1);
        const P: [number,number][] = [
          [50 - c * scale / 2, 65],
          [50 + c * scale / 2, 65],
          [50 - c * scale / 2 + b * cosA * scale, 65 - b * sinA * scale],
        ];
        const cx2 = (P[0][0]+P[1][0]+P[2][0])/3;
        const cy2 = (P[0][1]+P[1][1]+P[2][1])/3;
        const off = [50-cx2, 50-cy2];
        const Q = P.map(([x,y]): [number,number] => [x+off[0], y+off[1]]);
        return (
          <>
            <polygon points={Q.map(p=>p.join(',')).join(' ')} fill={fill} fillOpacity={0.12} stroke={blue} strokeWidth={sw} strokeLinejoin="round"/>
            {/* right angle mark if applicable */}
            {Math.abs(a*a - b*b - c*c) < 0.5 && (
              <rect x={Q[0][0]+2} y={Q[0][1]-5} width={4} height={4} fill="none" stroke={blue2} strokeWidth={0.35}/>
            )}
            <text x={(Q[0][0]+Q[1][0])/2} y={Q[0][1]+5} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">c={c}</text>
            <text x={(Q[1][0]+Q[2][0])/2+3} y={(Q[1][1]+Q[2][1])/2} textAnchor="start" fill={label} fontSize={3.5} fontFamily="monospace">a={a}</text>
            <text x={(Q[0][0]+Q[2][0])/2-3} y={(Q[0][1]+Q[2][1])/2} textAnchor="end" fill={label} fontSize={3.5} fontFamily="monospace">b={b}</text>
          </>
        );
      }

      case 'dreptunghi': {
        const L = params.L || 8, l = params.l || 5;
        const scale = 72 / Math.max(L, l, 1);
        const w = L * scale, h = l * scale;
        const x0 = 50 - w/2, y0 = 50 - h/2;
        return (
          <>
            <rect x={x0} y={y0} width={w} height={h} fill={fill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} rx={0.5}/>
            {/* dimension lines */}
            <line x1={x0} y1={y0-3} x2={x0+w} y2={y0-3} stroke={blue2} strokeWidth={0.3} markerEnd="none"/>
            <line x1={x0} y1={y0-4} x2={x0} y2={y0-2} stroke={blue2} strokeWidth={0.3}/>
            <line x1={x0+w} y1={y0-4} x2={x0+w} y2={y0-2} stroke={blue2} strokeWidth={0.3}/>
            <text x={50} y={y0-5} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">L = {L}</text>
            <line x1={x0+w+3} y1={y0} x2={x0+w+3} y2={y0+h} stroke={blue2} strokeWidth={0.3}/>
            <text x={x0+w+6} y={50} textAnchor="start" fill={label} fontSize={3.5} fontFamily="monospace" dominantBaseline="middle">l={l}</text>
            {/* diagonal */}
            <line x1={x0} y1={y0} x2={x0+w} y2={y0+h} stroke={blue2} strokeWidth={0.25} strokeDasharray="2 1" opacity={0.4}/>
          </>
        );
      }

      case 'cerc': {
        const r = params.r || 5;
        const sr = 34;
        return (
          <>
            <circle cx={50} cy={50} r={sr} fill={fill} fillOpacity={0.08} stroke={blue} strokeWidth={sw}/>
            {/* radius line */}
            <line x1={50} y1={50} x2={50+sr} y2={50} stroke={blue2} strokeWidth={0.4}/>
            <circle cx={50} cy={50} r={0.8} fill={blue}/>
            {/* diameter */}
            <line x1={50-sr} y1={50} x2={50+sr} y2={50} stroke={axis} strokeWidth={0.2} strokeDasharray="1 1" opacity={0.4}/>
            <text x={50+sr/2} y={47} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">r={r}</text>
            <text x={50} y={50+sr+5} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">d={2*r}</text>
          </>
        );
      }

      case 'trapez': {
        const B = params.B || 10, b = params.b || 6, h = params.h || 4;
        const scale = 65 / Math.max(B, h*2, 1);
        const bw = B*scale, sw2 = b*scale, sh = h*scale;
        const y1 = 50+sh/2, y2 = 50-sh/2;
        const off = (bw-sw2)/2;
        const pts: [number,number][] = [
          [50-bw/2, y1], [50+bw/2, y1],
          [50-bw/2+off+sw2, y2], [50-bw/2+off, y2]
        ];
        return (
          <>
            <polygon points={pts.map(p=>p.join(',')).join(' ')} fill={fill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} strokeLinejoin="round"/>
            {/* height */}
            <line x1={pts[3][0]} y1={y2} x2={pts[3][0]} y2={y1} stroke={blue2} strokeWidth={0.3} strokeDasharray="1.5 1"/>
            <text x={pts[3][0]-4} y={(y1+y2)/2} textAnchor="end" fill={label} fontSize={3.5} fontFamily="monospace" dominantBaseline="middle">h={h}</text>
            <text x={50} y={y1+5} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">B={B}</text>
            <text x={50} y={y2-3} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">b={b}</text>
          </>
        );
      }

      case 'paralelogram': {
        const a = params.a||6, h = params.h||3;
        const scale = 55/Math.max(a,h,1);
        const aw = a*scale, sh = h*scale, skew = sh*0.5;
        const pts: [number,number][] = [
          [50-aw/2+skew/2, 50+sh/2],
          [50+aw/2+skew/2, 50+sh/2],
          [50+aw/2-skew/2, 50-sh/2],
          [50-aw/2-skew/2, 50-sh/2],
        ];
        return (
          <>
            <polygon points={pts.map(p=>p.join(',')).join(' ')} fill={fill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} strokeLinejoin="round"/>
            {/* height dashed */}
            <line x1={pts[0][0]} y1={pts[0][1]} x2={pts[0][0]} y2={pts[3][1]} stroke={blue2} strokeWidth={0.3} strokeDasharray="1.5 1"/>
            <text x={50} y={pts[0][1]+5} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">a={a}</text>
            <text x={pts[0][0]-4} y={50} textAnchor="end" fill={label} fontSize={3.5} fontFamily="monospace" dominantBaseline="middle">h={h}</text>
          </>
        );
      }

      case 'romb': {
        const d1 = params.d1||8, d2 = params.d2||5;
        const scale = 60/Math.max(d1,d2,1);
        const w = d1*scale/2, hh = d2*scale/2;
        return (
          <>
            <polygon points={`50,${50-hh} ${50+w},50 50,${50+hh} ${50-w},50`} fill={fill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} strokeLinejoin="round"/>
            {/* diagonals */}
            <line x1={50-w} y1={50} x2={50+w} y2={50} stroke={blue2} strokeWidth={0.3} strokeDasharray="2 1"/>
            <line x1={50} y1={50-hh} x2={50} y2={50+hh} stroke={blue2} strokeWidth={0.3} strokeDasharray="2 1"/>
            <circle cx={50} cy={50} r={0.6} fill={blue2}/>
            <text x={50} y={50-hh-3} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">d₂={d2}</text>
            <text x={50+w+3} y={50} textAnchor="start" fill={label} fontSize={3.5} fontFamily="monospace" dominantBaseline="middle">d₁={d1}</text>
          </>
        );
      }

      case 'poligon_reg': {
        const n = Math.max(3, Math.round(params.n||6));
        const r = 35;
        const pts = Array.from({length:n}, (_,i) => {
          const a = 2*PI*i/n - PI/2;
          return `${50+r*Math.cos(a)},${50+r*Math.sin(a)}`;
        }).join(' ');
        const pts2 = Array.from({length:n}, (_,i) => {
          const a = 2*PI*i/n - PI/2;
          return [50+r*Math.cos(a), 50+r*Math.sin(a)] as [number,number];
        });
        return (
          <>
            <circle cx={50} cy={50} r={r} fill="none" stroke={axis} strokeWidth={0.2} strokeDasharray="1 1" opacity={0.4}/>
            <polygon points={pts} fill={fill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} strokeLinejoin="round"/>
            {/* one side label */}
            <line x1={50} y1={50} x2={pts2[0][0]} y2={pts2[0][1]} stroke={blue2} strokeWidth={0.25} strokeDasharray="1.5 1" opacity={0.5}/>
            <text x={50} y={93} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">{n} laturi</text>
          </>
        );
      }

      // ─── ALGEBRA GRAPHS ───────────────────────────────────────────

      case 'ec_grad1': {
        const a = params.a||1, b = params.b||0;
        const x0sol = a ? -b/a : null;
        const toSX = (x: number) => 50 + x * 9;
        const toSY = (y: number) => cy(50 - y * 7);
        const lineX1 = -4, lineX2 = 4;
        const lineY1 = a*lineX1+b, lineY2 = a*lineX2+b;
        return (
          <>
            <Axes/>
            <line x1={toSX(lineX1)} y1={toSY(lineY1)} x2={toSX(lineX2)} y2={toSY(lineY2)} stroke={blue} strokeWidth={0.6}/>
            {x0sol !== null && x0sol >= -5 && x0sol <= 5 && (
              <>
                <circle cx={toSX(x0sol)} cy={50} r={1.5} fill={red} stroke="none"/>
                <text x={toSX(x0sol)} y={50+5} textAnchor="middle" fill={red} fontSize={3} fontFamily="monospace">x={x0sol.toFixed(1)}</text>
              </>
            )}
            <text x={88} y={toSY(a*3.5+b)-2} fill={blue} fontSize={2.8} textAnchor="end" fontFamily="monospace">f(x)</text>
          </>
        );
      }

      case 'ec_grad2': {
        const a = params.a||1, b = params.b||0, c = params.c||0;
        const delta = b*b - 4*a*c;
        const vx = a ? -b/(2*a) : 0;
        const vy = a*(vx**2)+b*vx+c;
        const toSX = (x: number) => 50 + x * 8;
        const toSY = (y: number) => cy(50 - y * 4);
        const pts = Array.from({length:60},(_,i)=>{
          const x = (i-30)*0.2;
          return `${toSX(x)},${toSY(a*x**2+b*x+c)}`;
        }).join(' ');
        const roots: number[] = [];
        if(delta >= 0 && a) { roots.push((-b-Math.sqrt(delta))/(2*a), (-b+Math.sqrt(delta))/(2*a)); }
        return (
          <>
            <Axes/>
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.6}/>
            {/* vertex */}
            <circle cx={toSX(vx)} cy={toSY(vy)} r={1.2} fill={green}/>
            {/* roots */}
            {roots.filter(r2=>r2>=-5&&r2<=5).map((r2,i)=>(
              <circle key={i} cx={toSX(r2)} cy={50} r={1.2} fill={red}/>
            ))}
            <text x={88} y={12} fill={blue} fontSize={2.8} textAnchor="end" fontFamily="monospace">parabola</text>
          </>
        );
      }

      case 'ec_grad3':
      case 'polinom_eval': {
        const a = params.a||1, b = params.b||0, c = params.c||0, d = params.d||0;
        const toSX = (x: number) => 50 + x * 6;
        const toSY = (y: number) => cy(50 - y * 1.5);
        const pts = Array.from({length:60},(_,i)=>{
          const x = (i-30)*0.2;
          const y = a*x**3+b*x**2+c*x+d;
          return `${toSX(x)},${toSY(y)}`;
        }).join(' ');
        return (
          <>
            <Axes/>
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.6}/>
            <text x={88} y={12} fill={blue} fontSize={2.8} textAnchor="end" fontFamily="monospace">grad 3</text>
          </>
        );
      }

      case 'inecuatie_g1':
      case 'valoare_abs': {
        const a = params.a||2, b = params.b||-6;
        const x0 = a ? -b/a : 0;
        const solutionRight = a > 0;
        const toSX = (x: number) => 50 + x * 9;
        return (
          <>
            <line x1={8} y1={50} x2={92} y2={50} stroke={axis} strokeWidth={0.3}/>
            {/* shaded solution region */}
            <rect
              x={solutionRight ? toSX(x0) : 8}
              y={42}
              width={solutionRight ? 92-toSX(x0) : toSX(x0)-8}
              height={16}
              fill={blue} fillOpacity={0.12} rx={1}
            />
            <circle cx={toSX(x0)} cy={50} r={2} fill="none" stroke={red} strokeWidth={0.5}/>
            <line x1={toSX(x0)} y1={44} x2={toSX(x0)} y2={56} stroke={red} strokeWidth={0.4}/>
            <text x={toSX(x0)} y={60} textAnchor="middle" fill={red} fontSize={3.5} fontFamily="monospace">x={x0.toFixed(2)}</text>
            <text x={solutionRight?80:20} y={44} textAnchor="middle" fill={blue} fontSize={3} fontFamily="monospace">soluție</text>
          </>
        );
      }

      case 'inecuatie_g2': {
        const a = params.a||1, b = params.b||0, c = params.c||0;
        const delta = b**2-4*a*c;
        const toSX = (x: number) => 50 + x * 8;
        const toSY = (y: number) => cy(50 - y * 4);
        const pts = Array.from({length:60},(_,i)=>{const x=(i-30)*0.2; return `${toSX(x)},${toSY(a*x**2+b*x+c)}`;}).join(' ');
        const roots: number[] = delta>=0&&a ? [(-b-Math.sqrt(delta))/(2*a), (-b+Math.sqrt(delta))/(2*a)] : [];
        return (
          <>
            <Axes/>
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.6}/>
            {roots.filter(r=>r>=-5&&r<=5).map((r,i)=><circle key={i} cx={toSX(r)} cy={50} r={1.2} fill={red}/>)}
          </>
        );
      }

      case 'ec_exponentiala': {
        const a = params.a||2;
        const toSX = (x: number) => 50 + x * 9;
        const toSY = (y: number) => cy(50 - y * 8);
        const pts = Array.from({length:60},(_,i)=>{const x=(i-30)*0.15; return `${toSX(x)},${toSY(Math.pow(Math.max(0.001,a),x))}`;}).join(' ');
        return (
          <>
            <Axes/>
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.6}/>
            {/* y=1 mark */}
            <circle cx={50} cy={50} r={1.2} fill={red}/>
            <text x={53} y={48} fill={red} fontSize={3} fontFamily="monospace">(0,1)</text>
            <text x={88} y={12} fill={blue} fontSize={2.8} textAnchor="end" fontFamily="monospace">a={a}</text>
          </>
        );
      }

      case 'progresie_a': {
        const a1 = params.a1||2, r = params.r||3, n = Math.min(Math.round(params.n||8), 12);
        const vals = Array.from({length:n}, (_,i)=>a1+i*r);
        const maxV = Math.max(...vals.map(Math.abs), 1);
        const minV = Math.min(...vals, 0);
        const range = Math.max(maxV - minV, 1);
        const barW = 70/(n+1);
        return (
          <>
            <line x1={12} y1={82} x2={88} y2={82} stroke={axis} strokeWidth={0.3}/>
            {vals.map((v,i)=>{
              const bh = Math.abs(v)/range*55;
              const bx = 15+i*(70/Math.max(n-1,1));
              return (
                <g key={i}>
                  <rect x={bx-barW/2} y={82-bh} width={barW} height={bh} fill={blue} fillOpacity={0.35} stroke={blue} strokeWidth={0.2} rx={0.5}/>
                  {n<=8 && <text x={bx} y={82+4} textAnchor="middle" fill={label} fontSize={2.5} fontFamily="monospace">{i+1}</text>}
                </g>
              );
            })}
            <text x={50} y={92} textAnchor="middle" fill={label} fontSize={2.8} fontFamily="monospace">a₁={a1}, r={r}</text>
          </>
        );
      }

      case 'progresie_g': {
        const a1 = params.a1||2, q = params.q||2, n = Math.min(Math.round(params.n||6), 10);
        const vals = Array.from({length:n}, (_,i)=>a1*Math.pow(q,i));
        const maxV = Math.max(...vals.map(Math.abs), 1);
        const barW = 70/(n+1);
        const toSX = (i: number) => 15+i*(70/Math.max(n-1,1));
        const toSY = (v: number) => cy(82 - Math.abs(v)/maxV*60);
        // connect with line to show exponential growth
        const linePoints = vals.map((v,i)=>`${toSX(i)},${toSY(v)}`).join(' ');
        return (
          <>
            <line x1={12} y1={82} x2={88} y2={82} stroke={axis} strokeWidth={0.3}/>
            <polyline points={linePoints} fill="none" stroke={blue2} strokeWidth={0.4} strokeDasharray="1.5 0.5"/>
            {vals.map((v,i)=>(
              <g key={i}>
                <rect x={toSX(i)-barW/2} y={toSY(v)} width={barW} height={82-toSY(v)} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.2} rx={0.5}/>
              </g>
            ))}
            <text x={50} y={92} textAnchor="middle" fill={label} fontSize={2.8} fontFamily="monospace">q={q}</text>
          </>
        );
      }

      case 'dobanda_compusa': {
        const P = params.P||10000, rr = params.r||0.05, n = params.n||12, t = Math.min(params.t||10, 20);
        const vals = Array.from({length:t+1}, (_,i)=>P*Math.pow(1+rr/n,n*i));
        const maxV = Math.max(...vals);
        const toSX = (i: number) => 12 + i*(76/t);
        const toSY = (v: number) => cy(85 - v/maxV*65);
        const pts = vals.map((v,i)=>`${toSX(i)},${toSY(v)}`).join(' ');
        return (
          <>
            <line x1={10} y1={85} x2={90} y2={85} stroke={axis} strokeWidth={0.3}/>
            <line x1={12} y1={15} x2={12} y2={85} stroke={axis} strokeWidth={0.3}/>
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.6}/>
            <polygon points={`12,85 ${pts} ${toSX(t)},85`} fill={blue} fillOpacity={0.08}/>
            <circle cx={toSX(t)} cy={toSY(vals[t])} r={1.5} fill={green}/>
            <text x={50} y={93} textAnchor="middle" fill={label} fontSize={2.8} fontFamily="monospace">t={t} ani, r={(rr*100).toFixed(0)}%</text>
          </>
        );
      }

      // ─── TRIGONOMETRY ──────────────────────────────────────────────

      case 'functii_trig':
      case 'identitati_trig':
      case 'ec_trig': {
        const deg = params.deg || params.a || 45;
        const rad = deg*PI/180;
        const r = 32;
        const px = 50+r*Math.cos(-rad), py = 50+r*Math.sin(-rad);
        return (
          <>
            {/* unit circle */}
            <circle cx={50} cy={50} r={r} fill="none" stroke={axis} strokeWidth={0.3}/>
            <line x1={50-r-4} y1={50} x2={50+r+4} y2={50} stroke={axis} strokeWidth={0.2}/>
            <line x1={50} y1={50-r-4} x2={50} y2={50+r+4} stroke={axis} strokeWidth={0.2}/>
            {/* angle arc */}
            <path d={`M ${50+12},50 A 12,12 0 0,0 ${50+12*Math.cos(-rad)},${50+12*Math.sin(-rad)}`} fill="none" stroke={blue2} strokeWidth={0.4}/>
            {/* radius */}
            <line x1={50} y1={50} x2={px} y2={py} stroke={blue} strokeWidth={0.6}/>
            <circle cx={px} cy={py} r={1.5} fill={blue}/>
            {/* sin line */}
            <line x1={px} y1={py} x2={px} y2={50} stroke={red} strokeWidth={0.4} strokeDasharray="1.5 0.5"/>
            {/* cos line */}
            <line x1={50} y1={50} x2={px} y2={50} stroke={green} strokeWidth={0.4} strokeDasharray="1.5 0.5"/>
            <text x={px+2} y={(py+50)/2} fill={red} fontSize={3} fontFamily="monospace">sin</text>
            <text x={(50+px)/2} y={50+4} textAnchor="middle" fill={green} fontSize={3} fontFamily="monospace">cos</text>
            <text x={50+12+2} y={50-4} fill={blue2} fontSize={3} fontFamily="monospace">{deg}°</text>
            <circle cx={50} cy={50} r={0.7} fill={axis}/>
          </>
        );
      }

      case 'grade_rad':
      case 'formule_adunare':
      case 'formule_duplicare':
      case 'arc_functii': {
        const r = 32;
        const a = (params.deg || params.a || 45)*PI/180;
        const b = (params.b || 30)*PI/180;
        return (
          <>
            <circle cx={50} cy={50} r={r} fill="none" stroke={axis} strokeWidth={0.3}/>
            <line x1={50-r-4} y1={50} x2={50+r+4} y2={50} stroke={axis} strokeWidth={0.2}/>
            <line x1={50} y1={50-r-4} x2={50} y2={50+r+4} stroke={axis} strokeWidth={0.2}/>
            <line x1={50} y1={50} x2={50+r*Math.cos(-a)} y2={50+r*Math.sin(-a)} stroke={blue} strokeWidth={0.6}/>
            <line x1={50} y1={50} x2={50+r*Math.cos(-b)} y2={50+r*Math.sin(-b)} stroke={blue2} strokeWidth={0.5}/>
            <circle cx={50+r*Math.cos(-a)} cy={50+r*Math.sin(-a)} r={1.2} fill={blue}/>
            <circle cx={50+r*Math.cos(-b)} cy={50+r*Math.sin(-b)} r={1.2} fill={blue2}/>
            <text x={50+r*Math.cos(-a)+2} y={50+r*Math.sin(-a)} fill={blue} fontSize={3} fontFamily="monospace">α</text>
            <text x={50+r*Math.cos(-b)+2} y={50+r*Math.sin(-b)} fill={blue2} fontSize={3} fontFamily="monospace">β</text>
            <circle cx={50} cy={50} r={0.7} fill={axis}/>
          </>
        );
      }

      // ─── ANALYSIS ──────────────────────────────────────────────────

      case 'derivata_xn':
      case 'ec_tangentei':
      case 'monotonie': {
        const a = params.a||1, n = params.n||2, x0 = params.x0||params.x||1.5;
        const toSX = (x: number) => 50 + x * 8;
        const toSY = (y: number) => cy(50 - y * 3);
        const pts = Array.from({length:60},(_,i)=>{const x=(i-30)*0.15; return `${toSX(x)},${toSY(a*Math.pow(x,n))}`;}).join(' ');
        const fx0 = a*Math.pow(x0,n);
        const fp = n*a*Math.pow(x0,n-1);
        const tx1=-2, tx2=2;
        return (
          <>
            <Axes/>
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.6}/>
            {/* tangent line */}
            <line
              x1={toSX(x0+tx1)} y1={toSY(fx0+fp*tx1)}
              x2={toSX(x0+tx2)} y2={toSY(fx0+fp*tx2)}
              stroke={red} strokeWidth={0.5} strokeDasharray="2 0.8"/>
            <circle cx={toSX(x0)} cy={toSY(fx0)} r={1.5} fill={red}/>
            <text x={toSX(x0)+2} y={toSY(fx0)-2} fill={red} fontSize={3} fontFamily="monospace">x₀={x0}</text>
          </>
        );
      }

      case 'integrala_xn':
      case 'arie_curba': {
        const a = params.a||1, n = params.n||2;
        const x1 = params.x1||0, x2 = params.x2||3;
        const toSX = (x: number) => 50 + x * 8;
        const toSY = (y: number) => cy(50 - y * 3);
        const curvePts = Array.from({length:60},(_,i)=>{const x=(i-10)*0.2; return `${toSX(x)},${toSY(a*Math.pow(Math.max(0,x),n))}`;}).join(' ');
        // filled area
        const fillPts: string[] = [`${toSX(x1)},${toSY(0)}`];
        for(let i=0;i<=30;i++){const x=x1+(x2-x1)*i/30; fillPts.push(`${toSX(x)},${toSY(a*Math.pow(Math.max(0,x),n))}`);}
        fillPts.push(`${toSX(x2)},${toSY(0)}`);
        return (
          <>
            <Axes/>
            <polygon points={fillPts.join(' ')} fill={blue} fillOpacity={0.18}/>
            <polyline points={curvePts} fill="none" stroke={blue} strokeWidth={0.6}/>
            <line x1={toSX(x1)} y1={toSY(0)} x2={toSX(x1)} y2={toSY(a*Math.pow(Math.max(0,x1),n))} stroke={blue2} strokeWidth={0.3} strokeDasharray="1 0.5"/>
            <line x1={toSX(x2)} y1={toSY(0)} x2={toSX(x2)} y2={toSY(a*Math.pow(Math.max(0,x2),n))} stroke={blue2} strokeWidth={0.3} strokeDasharray="1 0.5"/>
            <text x={toSX((x1+x2)/2)} y={toSY(0)+5} textAnchor="middle" fill={blue2} fontSize={3} fontFamily="monospace">[{x1},{x2}]</text>
          </>
        );
      }

      case 'limita':
      case 'rata_variatie': {
        // Show f(x) = (ax+b)/(cx+d) with asymptote
        const a = params.a||3, b = params.b||5, c = params.c||2, d = params.d||-1;
        const toSX = (x: number) => 50 + x * 7;
        const toSY = (y: number) => cy(50 - y * 5);
        const asymptote = c ? -d/c : null;
        const hAsymptote = c ? a/c : null;
        const leftPts: string[] = [], rightPts: string[] = [];
        for(let i=0;i<60;i++){
          const x=(i-30)*0.15;
          const denom = c*x+d;
          if(Math.abs(denom)<0.3) continue;
          const y=(a*x+b)/denom;
          const pt = `${toSX(x)},${toSY(y)}`;
          if(denom<0) leftPts.push(pt); else rightPts.push(pt);
        }
        return (
          <>
            <Axes/>
            {asymptote !== null && <line x1={toSX(asymptote)} y1={8} x2={toSX(asymptote)} y2={92} stroke={red} strokeWidth={0.3} strokeDasharray="2 1" opacity={0.6}/>}
            {hAsymptote !== null && <line x1={8} y1={toSY(hAsymptote)} x2={92} y2={toSY(hAsymptote)} stroke={green} strokeWidth={0.3} strokeDasharray="2 1" opacity={0.6}/>}
            {leftPts.length>1 && <polyline points={leftPts.join(' ')} fill="none" stroke={blue} strokeWidth={0.6}/>}
            {rightPts.length>1 && <polyline points={rightPts.join(' ')} fill="none" stroke={blue} strokeWidth={0.6}/>}
          </>
        );
      }

      case 'serie_taylor': {
        const toSX = (x: number) => 50 + x * 9;
        const toSY = (y: number) => cy(50 - y * 18);
        const sinPts = Array.from({length:60},(_,i)=>{const x=(i-30)*0.15; return `${toSX(x)},${toSY(Math.sin(x))}`;}).join(' ');
        // Taylor sin approx (degree 5)
        const taylorPts = Array.from({length:60},(_,i)=>{const x=(i-30)*0.15; const y=x-x**3/6+x**5/120; return `${toSX(x)},${toSY(y)}`;}).join(' ');
        return (
          <>
            <Axes/>
            <polyline points={sinPts} fill="none" stroke={blue} strokeWidth={0.6}/>
            <polyline points={taylorPts} fill="none" stroke={red} strokeWidth={0.4} strokeDasharray="2 0.8"/>
            <text x={88} y={12} fill={blue} fontSize={2.5} textAnchor="end" fontFamily="monospace">sin(x)</text>
            <text x={88} y={17} fill={red} fontSize={2.5} textAnchor="end" fontFamily="monospace">Taylor</text>
          </>
        );
      }

      // ─── STATISTICS ────────────────────────────────────────────────

      case 'varianta_dev':
      case 'mediana_mod': {
        const vals = [params.a||2, params.b||4, params.c||4, params.d||4, params.e||5].sort((a,b)=>a-b);
        const mean = vals.reduce((s,v)=>s+v,0)/vals.length;
        const maxV = Math.max(...vals, 1);
        const barW = 10;
        return (
          <>
            <line x1={12} y1={82} x2={88} y2={82} stroke={axis} strokeWidth={0.3}/>
            {vals.map((v,i)=>{
              const bx = 18+i*14;
              return (
                <g key={i}>
                  <rect x={bx-barW/2} y={82-v/maxV*60} width={barW} height={v/maxV*60} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.2} rx={0.8}/>
                  <text x={bx} y={82+4} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">{v}</text>
                </g>
              );
            })}
            {/* mean line */}
            <line x1={12} y1={82-mean/maxV*60} x2={88} y2={82-mean/maxV*60} stroke={red} strokeWidth={0.4} strokeDasharray="2 1"/>
            <text x={90} y={82-mean/maxV*60} fill={red} fontSize={2.8} dominantBaseline="middle" fontFamily="monospace">x̄</text>
          </>
        );
      }

      case 'regresie': {
        const pts2 = [
          {x:params.x1||1, y:params.y1||3},
          {x:params.x2||5, y:params.y2||11},
          {x:params.x3||3, y:params.y3||7},
          {x:params.x4||7, y:params.y4||15},
        ];
        const n2 = pts2.length;
        const mx = pts2.reduce((s,p)=>s+p.x,0)/n2;
        const my = pts2.reduce((s,p)=>s+p.y,0)/n2;
        const slope = pts2.reduce((s,p)=>s+(p.x-mx)*(p.y-my),0) / pts2.reduce((s,p)=>s+(p.x-mx)**2,0.001);
        const inter = my - slope*mx;
        const toSX = (x: number) => 12 + x * 9;
        const toSY = (y: number) => cy(88 - y * 4);
        const rx1=0, rx2=9;
        return (
          <>
            <line x1={10} y1={90} x2={90} y2={90} stroke={axis} strokeWidth={0.3}/>
            <line x1={12} y1={10} x2={12} y2={90} stroke={axis} strokeWidth={0.3}/>
            {pts2.map((p,i)=><circle key={i} cx={toSX(p.x)} cy={toSY(p.y)} r={1.8} fill={blue} fillOpacity={0.7}/>)}
            <line x1={toSX(rx1)} y1={toSY(slope*rx1+inter)} x2={toSX(rx2)} y2={toSY(slope*rx2+inter)} stroke={red} strokeWidth={0.5}/>
            {/* residuals */}
            {pts2.map((p,i)=><line key={i} x1={toSX(p.x)} y1={toSY(p.y)} x2={toSX(p.x)} y2={toSY(slope*p.x+inter)} stroke={red} strokeWidth={0.2} strokeDasharray="1 0.5" opacity={0.5}/>)}
          </>
        );
      }

      case 'distributie_binomiala': {
        const n = Math.min(Math.round(params.n||10), 15), p = Math.max(0.01, Math.min(0.99, params.p||0.5));
        const fact = (x: number): number => { let r=1; for(let i=2;i<=x;i++) r*=i; return r; };
        const vals = Array.from({length:n+1}, (_,k)=>fact(n)/(fact(k)*fact(n-k))*Math.pow(p,k)*Math.pow(1-p,n-k));
        const maxV = Math.max(...vals, 0.01);
        const barW = Math.max(1.5, 70/(n+2));
        return (
          <>
            <line x1={10} y1={85} x2={90} y2={85} stroke={axis} strokeWidth={0.3}/>
            {vals.map((v,i)=>(
              <rect key={i} x={12+i*(72/(n+1))} y={85-v/maxV*65} width={barW} height={v/maxV*65} fill={blue} fillOpacity={0.35} stroke={blue} strokeWidth={0.15} rx={0.5}/>
            ))}
            <text x={50} y={93} textAnchor="middle" fill={label} fontSize={2.8} fontFamily="monospace">p={p}, n={n}</text>
          </>
        );
      }

      // ─── ARITHMETIC ────────────────────────────────────────────────

      case 'procente': {
        const v = params.v||200, p = Math.max(0,Math.min(100,params.p||15));
        const pct = p/100;
        return (
          <>
            {/* bar */}
            <rect x={15} y={38} width={70} height={14} fill="none" stroke={axis} strokeWidth={0.4} rx={2}/>
            <rect x={15} y={38} width={70*pct} height={14} fill={blue} fillOpacity={0.4} rx={2}/>
            {/* tick at pct */}
            <text x={15+70*pct/2} y={46} textAnchor="middle" fill={label} fontSize={4} fontFamily="monospace" dominantBaseline="middle">{p}%</text>
            <text x={85} y={46} textAnchor="end" fill={label} fontSize={3.2} fontFamily="monospace" dominantBaseline="middle">100%</text>
            <text x={50} y={63} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">{(v*pct).toFixed(1)} din {v}</text>
            {/* pie */}
            {(() => {
              const cx2=50, cy2=80, rr=10, startAngle=-PI/2, endAngle=-PI/2+2*PI*pct;
              const x1s=cx2+rr*Math.cos(startAngle), y1s=cy2+rr*Math.sin(startAngle);
              const x2e=cx2+rr*Math.cos(endAngle), y2e=cy2+rr*Math.sin(endAngle);
              const large=pct>0.5?1:0;
              return pct>0 && pct<1 ? (
                <>
                  <circle cx={cx2} cy={cy2} r={rr} fill="none" stroke={axis} strokeWidth={0.3}/>
                  <path d={`M${cx2},${cy2} L${x1s},${y1s} A${rr},${rr},0,${large},1,${x2e},${y2e} Z`} fill={blue} fillOpacity={0.4}/>
                </>
              ) : <circle cx={cx2} cy={cy2} r={rr} fill={blue} fillOpacity={0.4}/>;
            })()}
          </>
        );
      }

      case 'fractii': {
        const a = params.a||1, b = Math.abs(params.b||3)||1;
        const frac = Math.min(1, Math.abs(a/b));
        const n2 = Math.round(Math.abs(b));
        const segW = 70/n2;
        return (
          <>
            {/* segmented bar */}
            {Array.from({length:n2},(_,i)=>(
              <rect key={i} x={15+i*segW} y={38} width={segW-0.5} height={14}
                fill={i < Math.abs(a) ? blue : 'none'} fillOpacity={0.35}
                stroke={blue} strokeWidth={0.3} rx={0.5}/>
            ))}
            <text x={50} y={60} textAnchor="middle" fill={label} fontSize={4.5} fontFamily="monospace">{a}/{b}</text>
            <text x={50} y={70} textAnchor="middle" fill={label} fontSize={3.2} fontFamily="monospace">= {(a/b).toFixed(3)}</text>
          </>
        );
      }

      case 'puteri': {
        const a = params.a||2, n2 = Math.min(Math.round(params.n||5), 8);
        const vals = Array.from({length:n2}, (_,i)=>Math.pow(a,i+1));
        const maxV = Math.max(...vals.map(Math.abs), 1);
        const barW = 60/n2;
        return (
          <>
            <line x1={12} y1={80} x2={88} y2={80} stroke={axis} strokeWidth={0.3}/>
            {vals.map((v,i)=>{
              const bx = 18+i*(60/Math.max(n2-1,1));
              const bh = Math.abs(v)/maxV*55;
              return (
                <g key={i}>
                  <rect x={bx-barW/2} y={80-bh} width={barW} height={bh} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.2} rx={0.5}/>
                  <text x={bx} y={80+4} textAnchor="middle" fill={label} fontSize={2.8} fontFamily="monospace">{a}^{i+1}</text>
                </g>
              );
            })}
          </>
        );
      }

      // ─── FIBONACCI ─────────────────────────────────────────────────
      case 'fibonacci': {
        const n2 = Math.min(Math.round(params.n||10), 15);
        const fibs: number[] = [1,1];
        for(let i=2;i<n2;i++) fibs.push(fibs[i-1]+fibs[i-2]);
        const maxV = Math.max(...fibs, 1);
        const barW = Math.max(2, 68/n2);
        const toSX = (i: number) => 14+i*(70/Math.max(n2-1,1));
        const toSY = (v: number) => cy(82-v/maxV*60);
        const linePoints = fibs.map((v,i)=>`${toSX(i)},${toSY(v)}`).join(' ');
        return (
          <>
            <line x1={12} y1={82} x2={88} y2={82} stroke={axis} strokeWidth={0.3}/>
            <polyline points={linePoints} fill="none" stroke={blue2} strokeWidth={0.4} strokeDasharray="1 0.3"/>
            {fibs.map((v,i)=>(
              <circle key={i} cx={toSX(i)} cy={toSY(v)} r={1.2} fill={blue} fillOpacity={0.8}/>
            ))}
            <text x={50} y={93} textAnchor="middle" fill={label} fontSize={2.8} fontFamily="monospace">F(1)..F({n2})</text>
          </>
        );
      }

      // ─── PROCENTE & COMBINATORICS (simple visual) ──────────────────
      case 'permutari':
      case 'aranjamente':
      case 'combinari':
      case 'binom_newton':
      case 'probabilitate': {
        // Pascal triangle style or probability bar
        const p2 = Math.max(0.01, Math.min(0.99, params.p||0.5));
        return (
          <>
            {/* probability scale */}
            <rect x={15} y={40} width={70} height={10} fill="none" stroke={axis} strokeWidth={0.3} rx={1.5}/>
            <rect x={15} y={40} width={70*p2} height={10} fill={blue} fillOpacity={0.4} rx={1.5}/>
            <line x1={15+70*p2} y1={36} x2={15+70*p2} y2={54} stroke={red} strokeWidth={0.5}/>
            <text x={15+70*p2} y={60} textAnchor="middle" fill={red} fontSize={3.5} fontFamily="monospace">{(p2*100).toFixed(0)}%</text>
            <text x={50} y={74} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">{calcId}</text>
          </>
        );
      }

      // ─── MATRICES ──────────────────────────────────────────────────
      case 'det_2x2':
      case 'inversa_2x2':
      case 'inmultire_mat': {
        const a=params.a||1, b2=params.b||2, c2=params.c||3, d=params.d||4;
        return (
          <>
            {/* draw 2x2 matrix visually */}
            <rect x={25} y={28} width={50} height={44} fill={fill} fillOpacity={0.06} stroke={blue} strokeWidth={0.4} rx={1}/>
            {/* brackets */}
            <path d="M27,27 L24,27 L24,73 L27,73" fill="none" stroke={blue} strokeWidth={0.6}/>
            <path d="M73,27 L76,27 L76,73 L73,73" fill="none" stroke={blue} strokeWidth={0.6}/>
            {/* dividers */}
            <line x1={50} y1={28} x2={50} y2={72} stroke={axis} strokeWidth={0.2} opacity={0.4}/>
            <line x1={25} y1={50} x2={75} y2={50} stroke={axis} strokeWidth={0.2} opacity={0.4}/>
            {/* values */}
            <text x={37} y={42} textAnchor="middle" fill={label} fontSize={5} fontFamily="monospace" dominantBaseline="middle">{a}</text>
            <text x={63} y={42} textAnchor="middle" fill={label} fontSize={5} fontFamily="monospace" dominantBaseline="middle">{b2}</text>
            <text x={37} y={62} textAnchor="middle" fill={label} fontSize={5} fontFamily="monospace" dominantBaseline="middle">{c2}</text>
            <text x={63} y={62} textAnchor="middle" fill={label} fontSize={5} fontFamily="monospace" dominantBaseline="middle">{d}</text>
            {/* determinant */}
            <text x={50} y={83} textAnchor="middle" fill={label} fontSize={3.2} fontFamily="monospace">det={a*d-b2*c2}</text>
          </>
        );
      }

      // ─── CONVERSIONS ───────────────────────────────────────────────
      case 'temperatura': {
        const celsius = params.celsius || params.C || 20;
        const f = celsius*9/5+32;
        const k = celsius+273.15;
        // thermometer visual
        const pct = Math.max(0,Math.min(1,(celsius+20)/120));
        return (
          <>
            {/* thermometer */}
            <rect x={46} y={15} width={8} height={55} fill="none" stroke={blue} strokeWidth={0.4} rx={4}/>
            <rect x={47} y={15+(1-pct)*55} width={6} height={pct*55} fill={red} fillOpacity={0.6} rx={3}/>
            <circle cx={50} cy={73} r={6} fill={red} fillOpacity={0.5} stroke={blue} strokeWidth={0.4}/>
            <text x={62} y={40} fill={label} fontSize={3.5} fontFamily="monospace">{celsius}°C</text>
            <text x={62} y={47} fill={label} fontSize={3.5} fontFamily="monospace">{f.toFixed(1)}°F</text>
            <text x={62} y={54} fill={label} fontSize={3.5} fontFamily="monospace">{k.toFixed(1)}K</text>
            {/* scale ticks */}
            {[-20,0,20,40,60,80,100].map((t,i)=>{
              const ty = 15+(1-(t+20)/120)*55;
              return ty>=15&&ty<=70 ? <line key={i} x1={44} y1={ty} x2={46} y2={ty} stroke={axis} strokeWidth={0.3}/> : null;
            })}
          </>
        );
      }

      case 'lungime':
      case 'greutate':
      case 'viteza': {
        const val = params.val || params.value || params.km || params.m || params.kg || 1;
        // simple scale bar
        const normalized = Math.min(1, val / Math.max(val*1.2, 1));
        return (
          <>
            <rect x={15} y={42} width={70} height={10} fill="none" stroke={axis} strokeWidth={0.3} rx={2}/>
            <rect x={15} y={42} width={70*normalized} height={10} fill={blue} fillOpacity={0.35} rx={2}/>
            <text x={50} y={62} textAnchor="middle" fill={label} fontSize={4} fontFamily="monospace">{val}</text>
            <text x={50} y={72} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">{calcId}</text>
          </>
        );
      }

      // ─── ANALYTIC GEOMETRY ─────────────────────────────────────────
      case 'distanta_2p':
      case 'ec_dreapta': {
        const x1v = params.x1||0, y1v = params.y1||0, x2v = params.x2||4, y2v = params.y2||3;
        const toSX = (x: number) => 50 + x * 8;
        const toSY = (y: number) => cy(50 - y * 8);
        return (
          <>
            <Axes/>
            <line x1={toSX(x1v)} y1={toSY(y1v)} x2={toSX(x2v)} y2={toSY(y2v)} stroke={blue} strokeWidth={0.6}/>
            <circle cx={toSX(x1v)} cy={toSY(y1v)} r={1.5} fill={blue}/>
            <circle cx={toSX(x2v)} cy={toSY(y2v)} r={1.5} fill={blue}/>
            <text x={toSX(x1v)-2} y={toSY(y1v)-3} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">A</text>
            <text x={toSX(x2v)+2} y={toSY(y2v)-3} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">B</text>
            {/* distance */}
            <line x1={toSX(x1v)} y1={toSY(y1v)} x2={toSX(x2v)} y2={toSY(y1v)} stroke={blue2} strokeWidth={0.25} strokeDasharray="1 0.5"/>
            <line x1={toSX(x2v)} y1={toSY(y1v)} x2={toSX(x2v)} y2={toSY(y2v)} stroke={blue2} strokeWidth={0.25} strokeDasharray="1 0.5"/>
          </>
        );
      }

      case 'ec_cerc': {
        const cx2 = params.cx||0, cy3 = params.cy||0, r = params.r||3;
        const toSX = (x: number) => 50 + x * 8;
        const toSY = (y: number) => cy(50 - y * 8);
        const sr = r * 8;
        return (
          <>
            <Axes/>
            <circle cx={toSX(cx2)} cy={toSY(cy3)} r={Math.min(sr,38)} fill={fill} fillOpacity={0.08} stroke={blue} strokeWidth={0.5}/>
            <circle cx={toSX(cx2)} cy={toSY(cy3)} r={0.8} fill={blue}/>
            <line x1={toSX(cx2)} y1={toSY(cy3)} x2={toSX(cx2)+Math.min(sr,38)} y2={toSY(cy3)} stroke={blue2} strokeWidth={0.3}/>
            <text x={toSX(cx2)+Math.min(sr,38)/2} y={toSY(cy3)-2} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">r={r}</text>
          </>
        );
      }

      // ─── NUMBER THEORY (meaningful visuals) ───────────────────────
      case 'conv_baze': {
        const n2 = Math.round(Math.abs(params.n||42));
        const binary = n2.toString(2);
        const bits = binary.split('');
        const bw = Math.min(8, 80/Math.max(bits.length,1));
        return (
          <>
            {bits.map((bit,i)=>(
              <g key={i}>
                <rect x={10+i*bw} y={35} width={bw-0.5} height={bw} fill={bit==='1'?blue:'none'} fillOpacity={0.4} stroke={blue} strokeWidth={0.3} rx={0.3}/>
                <text x={10+i*bw+bw/2} y={35+bw/2} textAnchor="middle" fill={label} fontSize={Math.min(3.5,bw*0.55)} fontFamily="monospace" dominantBaseline="middle">{bit}</text>
              </g>
            ))}
            <text x={50} y={58} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">{n2}₁₀</text>
            <text x={50} y={65} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">{binary}₂</text>
            <text x={50} y={72} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">{n2.toString(16).toUpperCase()}₁₆</text>
          </>
        );
      }

      case 'nr_aur': {
        const phi = (1+Math.sqrt(5))/2;
        // Golden rectangle
        const total = 70, smaller = total/phi;
        return (
          <>
            <rect x={15} y={30} width={total} height={total/phi} fill={fill} fillOpacity={0.08} stroke={blue} strokeWidth={0.4} rx={0.5}/>
            <rect x={15} y={30} width={total-smaller} height={total/phi} fill={fill} fillOpacity={0.1} stroke={blue2} strokeWidth={0.3} rx={0.5}/>
            <line x1={15+total-smaller} y1={30} x2={15+total-smaller} y2={30+total/phi} stroke={blue2} strokeWidth={0.35} strokeDasharray="1.5 0.5"/>
            <text x={50} y={30+total/phi+7} textAnchor="middle" fill={label} fontSize={3.5} fontFamily="monospace">φ = {phi.toFixed(6)}</text>
          </>
        );
      }

      // ─── GENERIC FALLBACK ─────────────────────────────────────────
      case 'factorizare':
      case 'medii':
      case 'operatii_baza':
      case 'suma_cifre': {
        // number line with value marked
        const val = params.n || params.a || params.value || 12;
        const toSX = (x: number) => 15+x*(70/Math.max(val*1.2,1));
        return (
          <>
            <line x1={12} y1={50} x2={88} y2={50} stroke={axis} strokeWidth={0.3}/>
            {Array.from({length:6},(_,i)=>{
              const v = Math.round(val/5*i);
              return <g key={i}>
                <line x1={toSX(v)} y1={47} x2={toSX(v)} y2={53} stroke={axis} strokeWidth={0.3}/>
                <text x={toSX(v)} y={57} textAnchor="middle" fill={label} fontSize={3} fontFamily="monospace">{v}</text>
              </g>;
            })}
            <circle cx={toSX(val)} cy={50} r={2.5} fill={blue} fillOpacity={0.8}/>
            <text x={toSX(val)} y={44} textAnchor="middle" fill={blue} fontSize={3.5} fontFamily="monospace">{val}</text>
          </>
        );
      }

      default:
        return null;
    }
  }, [calcId, JSON.stringify(params)]);

  if (!content) return null;

  return (
    <div className="w-full h-[110px] rounded-[5px] overflow-hidden bg-muted/15 border border-border/25">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {content}
      </svg>
    </div>
  );
};

export default Viz2D;
