import { useMemo } from 'react';

interface Props {
  calcId: string;
  params: Record<string, number>;
}

const Viz2D = ({ calcId, params }: Props) => {
  const content = useMemo(() => {
    const blue = 'hsl(217,72%,48%)';
    const blueFill = 'hsl(217,72%,48%)';
    const blueLabel = 'hsl(217,60%,35%)';
    const sw = 0.4;
    const fs = 2.8;
    const PI = Math.PI;

    switch (calcId) {
      // ─── GEOMETRY 2D ───
      case 'triunghi': {
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
            <polygon points={p.map(pt => pt.join(',')).join(' ')} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} />
            <text x={(p[0][0]+p[1][0])/2} y={p[0][1]+5} textAnchor="middle" fill={blueLabel} fontSize={fs}>c={c}</text>
            <text x={(p[1][0]+p[2][0])/2+3} y={(p[1][1]+p[2][1])/2} textAnchor="start" fill={blueLabel} fontSize={fs}>a={a}</text>
            <text x={(p[0][0]+p[2][0])/2-3} y={(p[0][1]+p[2][1])/2} textAnchor="end" fill={blueLabel} fontSize={fs}>b={b}</text>
          </>
        );
      }
      case 'dreptunghi': {
        const L = params.L || 8, l = params.l || 5;
        const sc = 70 / Math.max(L, l);
        const w = L * sc, h = l * sc;
        const x0 = 50 - w/2, y0 = 50 - h/2;
        return (
          <>
            <rect x={x0} y={y0} width={w} height={h} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={sw} rx={1} />
            <text x={50} y={y0-2} textAnchor="middle" fill={blueLabel} fontSize={fs}>L={L}</text>
            <text x={x0+w+2} y={50} textAnchor="start" fill={blueLabel} fontSize={fs} dominantBaseline="middle">l={l}</text>
          </>
        );
      }
      case 'cerc': {
        const r = params.r || 5;
        const sr = 32;
        return (
          <>
            <circle cx={50} cy={50} r={sr} fill={blueFill} fillOpacity={0.08} stroke={blue} strokeWidth={sw} />
            <line x1={50} y1={50} x2={50+sr} y2={50} stroke={blue} strokeWidth={0.3} />
            <text x={50+sr/2} y={48} textAnchor="middle" fill={blueLabel} fontSize={fs}>r={r}</text>
            <circle cx={50} cy={50} r={0.6} fill={blue} />
          </>
        );
      }
      case 'trapez': {
        const B = params.B || 10, b = params.b || 6, h = params.h || 4;
        const sc = 70 / Math.max(B, h * 1.5);
        const bw = B*sc, sw2 = b*sc, sh = h*sc;
        const y1 = 50+sh/2, y2 = 50-sh/2;
        const off = (bw-sw2)/2;
        const pts: [number,number][] = [[50-bw/2,y1],[50+bw/2,y1],[50-bw/2+off+sw2,y2],[50-bw/2+off,y2]];
        return (
          <>
            <polygon points={pts.map(p=>p.join(',')).join(' ')} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={0.4} />
            <text x={50} y={y1+4} textAnchor="middle" fill={blueLabel} fontSize={fs}>B={B}</text>
            <text x={50} y={y2-2} textAnchor="middle" fill={blueLabel} fontSize={fs}>b={b}</text>
          </>
        );
      }
      case 'paralelogram': {
        const a = params.a||6, h = params.h||3;
        const sc = 60/Math.max(a, h);
        const aw=a*sc, sh=h*sc, skew=sh*0.3;
        const pts: [number,number][] = [[50-aw/2,50+sh/2],[50+aw/2,50+sh/2],[50+aw/2+skew,50-sh/2],[50-aw/2+skew,50-sh/2]];
        return (
          <>
            <polygon points={pts.map(p=>p.join(',')).join(' ')} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={0.4} />
            <text x={50} y={pts[0][1]+4} textAnchor="middle" fill={blueLabel} fontSize={fs}>a={a}</text>
          </>
        );
      }
      case 'romb': {
        const d1=params.d1||6, d2=params.d2||4;
        const sc=60/Math.max(d1,d2);
        const w=d1*sc/2, h=d2*sc/2;
        return (
          <>
            <polygon points={`50,${50-h} ${50+w},50 50,${50+h} ${50-w},50`} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={0.4} />
            <text x={50+w/2+2} y={50-h/2} fill={blueLabel} fontSize={fs}>d₁={d1}</text>
          </>
        );
      }
      case 'poligon_reg': {
        const n=Math.max(3, Math.round(params.n||6)), r=30;
        const pts = Array.from({length:n},(_,i)=>{const a=2*PI*i/n-PI/2; return `${50+r*Math.cos(a)},${50+r*Math.sin(a)}`}).join(' ');
        return <polygon points={pts} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={0.4} />;
      }

      // ─── ALGEBRA GRAPHS ───
      case 'ec_grad1': {
        const a=params.a||1, b=params.b||0;
        const x0 = a ? -b/a : 0;
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={50} y1={10} x2={50} y2={90} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={10} y1={50-(a*(-4)+b)*5} x2={90} y2={50-(a*4+b)*5} stroke={blue} strokeWidth={0.5} />
            {a && <circle cx={50+x0*10} cy={50} r={1.2} fill="hsl(0,72%,51%)" />}
          </>
        );
      }
      case 'ec_grad2': {
        const a=params.a||1, b=params.b||0, c=params.c||0;
        const xv=-b/(2*a||1);
        const pts = Array.from({length:40},(_, i)=>{const x=(i-20)*0.4; return `${50+x*8},${50-(a*(x+xv)**2+b*(x+xv)+c)*3}`}).join(' ');
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={50} y1={10} x2={50} y2={90} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
          </>
        );
      }
      case 'ec_grad3':
      case 'polinom_eval': {
        const a=params.a||1, b=params.b||0, c=params.c||0, d=params.d||0;
        const pts = Array.from({length:50},(_, i)=>{const x=(i-25)*0.3; const y=a*x**3+b*x**2+c*x+d; return `${50+x*5},${Math.max(5,Math.min(95,50-y*2))}`}).join(' ');
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={50} y1={10} x2={50} y2={90} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
          </>
        );
      }
      case 'inecuatie_g1':
      case 'valoare_abs': {
        const a=params.a||2, b=params.b||-3;
        const x0=a?-b/a:0;
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <circle cx={50+x0*8} cy={50} r={1.2} fill="hsl(0,72%,51%)" />
            <rect x={a>0?50+x0*8:10} y={44} width={a>0?90-(50+x0*8):50+x0*8-10} height={12} fill={blue} fillOpacity={0.1} />
          </>
        );
      }
      case 'inecuatie_g2': {
        const a=params.a||1, b=params.b||0, c=params.c||0;
        const d=b**2-4*a*c;
        const pts = Array.from({length:40},(_, i)=>{const x=(i-20)*0.4; return `${50+x*8},${Math.max(5,Math.min(95,50-(a*x**2+b*x+c)*3))}`}).join(' ');
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
            {d>=0 && <>
              <circle cx={50+(-b-Math.sqrt(d))/(2*a)*8} cy={50} r={1} fill="hsl(0,72%,51%)" />
              <circle cx={50+(-b+Math.sqrt(d))/(2*a)*8} cy={50} r={1} fill="hsl(0,72%,51%)" />
            </>}
          </>
        );
      }
      case 'ec_exponentiala': {
        const a=params.a||2;
        const pts = Array.from({length:40},(_,i)=>{const x=(i-20)*0.3; return `${50+x*6},${Math.max(5,Math.min(95,50-Math.pow(a,x)*3))}`}).join(' ');
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={50} y1={10} x2={50} y2={90} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
          </>
        );
      }
      case 'progresie_a': {
        const a1=params.a1||2, r=params.r||3, n=Math.min(params.n||10, 15);
        const pts = Array.from({length:n},(_,i)=>{const v=a1+i*r; return {x:15+i*(70/Math.max(n-1,1)), y:v}});
        const maxV=Math.max(...pts.map(p=>Math.abs(p.y)), 1);
        return (
          <>
            <line x1={10} y1={80} x2={90} y2={80} stroke={blueLabel} strokeWidth={0.15} />
            {pts.map((p,i)=><rect key={i} x={p.x-2} y={80-Math.abs(p.y)/maxV*60} width={3} height={Math.abs(p.y)/maxV*60} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.2} rx={0.5} />)}
          </>
        );
      }
      case 'progresie_g': {
        const a1=params.a1||2, q=params.q||2, n=Math.min(params.n||5, 10);
        const vals = Array.from({length:n},(_,i)=>a1*Math.pow(q,i));
        const maxV=Math.max(...vals.map(Math.abs), 1);
        return (
          <>
            <line x1={10} y1={80} x2={90} y2={80} stroke={blueLabel} strokeWidth={0.15} />
            {vals.map((v,i)=><rect key={i} x={15+i*(70/Math.max(n-1,1))-2} y={80-Math.abs(v)/maxV*60} width={3} height={Math.abs(v)/maxV*60} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.2} rx={0.5} />)}
          </>
        );
      }
      case 'dobanda_compusa': {
        const P=params.P||10000, r=params.r||0.05, n=params.n||12, t=Math.min(params.t||10, 30);
        const pts = Array.from({length:t+1},(_,i)=>{const v=P*Math.pow(1+r/n,n*i); return `${15+i*(70/t)},${Math.max(5,85-v/P*30)}`}).join(' ');
        return (
          <>
            <line x1={10} y1={85} x2={90} y2={85} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
          </>
        );
      }

      // ─── TRIGONOMETRY ───
      case 'functii_trig':
      case 'identitati_trig':
      case 'ec_trig': {
        const deg = params.deg || params.a || 45;
        const rad = deg*PI/180;
        const r = 30;
        return (
          <>
            <circle cx={50} cy={50} r={r} fill="none" stroke={blueLabel} strokeWidth={0.2} />
            <line x1={50} y1={50} x2={50+r*Math.cos(-rad)} y2={50+r*Math.sin(-rad)} stroke={blue} strokeWidth={0.5} />
            <line x1={50+r*Math.cos(-rad)} y1={50+r*Math.sin(-rad)} x2={50+r*Math.cos(-rad)} y2={50} stroke="hsl(0,72%,51%)" strokeWidth={0.3} strokeDasharray="1" />
            <text x={50+r*Math.cos(-rad)+3} y={50+r*Math.sin(-rad)/2} fill={blueLabel} fontSize={2.2}>sin</text>
            <circle cx={50} cy={50} r={0.5} fill={blue} />
          </>
        );
      }
      case 'grade_rad':
      case 'formule_adunare':
      case 'formule_duplicare':
      case 'arc_functii': {
        const r = 30;
        const a = (params.deg || params.a || 45)*PI/180;
        const b = (params.b || 0)*PI/180;
        return (
          <>
            <circle cx={50} cy={50} r={r} fill="none" stroke={blueLabel} strokeWidth={0.2} />
            <line x1={50} y1={50} x2={50+r*Math.cos(-a)} y2={50+r*Math.sin(-a)} stroke={blue} strokeWidth={0.5} />
            {b ? <line x1={50} y1={50} x2={50+r*Math.cos(-b)} y2={50+r*Math.sin(-b)} stroke="hsl(200,80%,46%)" strokeWidth={0.4} /> : null}
            <circle cx={50} cy={50} r={0.5} fill={blue} />
          </>
        );
      }
      case 'triunghi_oarecare': {
        const a=params.a||5, A=(params.A||30)*PI/180, B=(params.B||60)*PI/180;
        const sc=5;
        const pts: [number,number][] = [[20,70],[20+a*sc,70],[20+params.a*sc*Math.cos(PI-B), 70-a*sc*Math.sin(PI-B)]];
        return <polygon points={pts.map(p=>p.join(',')).join(' ')} fill={blueFill} fillOpacity={0.1} stroke={blue} strokeWidth={0.4} />;
      }

      // ─── ANALYSIS ───
      case 'derivata_xn':
      case 'ec_tangentei':
      case 'monotonie': {
        const a=params.a||1, n=params.n||2, x0=params.x0||params.x||2;
        const pts = Array.from({length:40},(_,i)=>{const x=(i-20)*0.3; return `${50+x*6},${Math.max(5,Math.min(95,50-a*Math.pow(x,n)*2))}`}).join(' ');
        const fx0=a*Math.pow(x0,n), fp=n*a*Math.pow(x0,n-1);
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={50} y1={10} x2={50} y2={90} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
            <line x1={50+(x0-3)*6} y1={50-(fx0+fp*(-3))*2} x2={50+(x0+3)*6} y2={50-(fx0+fp*3)*2} stroke="hsl(0,72%,51%)" strokeWidth={0.3} strokeDasharray="1.5" />
            <circle cx={50+x0*6} cy={50-fx0*2} r={1} fill="hsl(0,72%,51%)" />
          </>
        );
      }
      case 'integrala_xn':
      case 'arie_curba': {
        const a=params.a||1, n=params.n||2, x1=params.x1||0, x2=params.x2||3;
        const pts: string[] = [];
        const fill: string[] = [`${50+x1*8},50`];
        for(let i=0;i<40;i++){const x=(i-10)*0.4; const y=a*Math.pow(x,n); pts.push(`${50+x*8},${Math.max(5,Math.min(95,50-y*2))}`);}
        for(let i=0;i<=20;i++){const x=x1+(x2-x1)*i/20; fill.push(`${50+x*8},${Math.max(5,Math.min(95,50-a*Math.pow(x,n)*2))}`);}
        fill.push(`${50+x2*8},50`);
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <polygon points={fill.join(' ')} fill={blue} fillOpacity={0.12} />
            <polyline points={pts.join(' ')} fill="none" stroke={blue} strokeWidth={0.5} />
          </>
        );
      }
      case 'limita':
      case 'rata_variatie': {
        const a=params.a||3, c=params.c||2;
        const pts = Array.from({length:40},(_,i)=>{const x=(i-5)*0.5; const d=c*x+(params.d||-1); return `${50+x*6},${d?Math.max(5,Math.min(95,50-(a*x+(params.b||5))/d*8)):50}`}).join(' ');
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.5} />
            <line x1={10} y1={50-a/c*8} x2={90} y2={50-a/c*8} stroke="hsl(0,72%,51%)" strokeWidth={0.2} strokeDasharray="1.5" />
          </>
        );
      }
      case 'serie_taylor': {
        const x=params.x||1;
        const pts = Array.from({length:40},(_,i)=>{const t=(i-20)*0.25; return `${50+t*6},${Math.max(5,Math.min(95,50-Math.sin(t)*20))}`}).join(' ');
        return (
          <>
            <line x1={10} y1={50} x2={90} y2={50} stroke={blueLabel} strokeWidth={0.15} />
            <polyline points={pts} fill="none" stroke={blue} strokeWidth={0.4} />
            <circle cx={50+x*6} cy={50-Math.sin(x)*20} r={1} fill="hsl(0,72%,51%)" />
          </>
        );
      }

      // ─── STATISTICS ───
      case 'varianta_dev':
      case 'mediana_mod': {
        const vals = [params.a||2, params.b||4, params.c||4, params.d||4, params.e||5].sort((a,b)=>a-b);
        const maxV = Math.max(...vals, 1);
        return (
          <>
            <line x1={10} y1={80} x2={90} y2={80} stroke={blueLabel} strokeWidth={0.15} />
            {vals.map((v,i)=><rect key={i} x={15+i*15} y={80-v/maxV*55} width={10} height={v/maxV*55} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.2} rx={1} />)}
          </>
        );
      }
      case 'regresie': {
        const x1=params.x1||1, y1=params.y1||3, x2=params.x2||5, y2=params.y2||11;
        return (
          <>
            <line x1={10} y1={80} x2={90} y2={80} stroke={blueLabel} strokeWidth={0.15} />
            <line x1={50} y1={10} x2={50} y2={90} stroke={blueLabel} strokeWidth={0.15} />
            <circle cx={50+x1*6} cy={80-y1*5} r={1.5} fill={blue} fillOpacity={0.5} />
            <circle cx={50+x2*6} cy={80-y2*5} r={1.5} fill={blue} fillOpacity={0.5} />
            <line x1={50+x1*6} y1={80-y1*5} x2={50+x2*6} y2={80-y2*5} stroke={blue} strokeWidth={0.4} />
          </>
        );
      }
      case 'distributie_binomiala': {
        const n=Math.min(Math.round(params.n||10), 15), p=params.p||0.5;
        const fact=(x:number):number=>{let r=1;for(let i=2;i<=x;i++)r*=i;return r};
        const vals = Array.from({length:n+1},(_,k)=>fact(n)/(fact(k)*fact(n-k))*Math.pow(p,k)*Math.pow(1-p,n-k));
        const maxV=Math.max(...vals,0.01);
        return (
          <>
            <line x1={10} y1={85} x2={90} y2={85} stroke={blueLabel} strokeWidth={0.15} />
            {vals.map((v,i)=><rect key={i} x={12+i*(76/(n+1))} y={85-v/maxV*65} width={Math.max(1,70/(n+1))} height={v/maxV*65} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.15} rx={0.5} />)}
          </>
        );
      }

      // ─── ARITHMETIC ───
      case 'procente': {
        const v=params.v||200, p=params.p||15;
        const part=v*p/100;
        return (
          <>
            <rect x={15} y={35} width={70} height={12} fill={blueLabel} fillOpacity={0.1} stroke={blueLabel} strokeWidth={0.2} rx={2} />
            <rect x={15} y={35} width={70*p/100} height={12} fill={blue} fillOpacity={0.25} rx={2} />
            <text x={15+70*p/200} y={43} textAnchor="middle" fill={blueLabel} fontSize={fs}>{p}%</text>
            <text x={50} y={60} textAnchor="middle" fill={blueLabel} fontSize={2.2}>{part.toFixed(1)} / {v}</text>
          </>
        );
      }
      case 'fractii': {
        const a=params.a||1, b=params.b||3;
        const frac=Math.abs(b)?Math.abs(a/b):0;
        return (
          <>
            <rect x={15} y={40} width={70} height={8} fill={blueLabel} fillOpacity={0.08} stroke={blueLabel} strokeWidth={0.15} rx={1.5} />
            <rect x={15} y={40} width={Math.min(70,70*frac)} height={8} fill={blue} fillOpacity={0.25} rx={1.5} />
            <text x={50} y={56} textAnchor="middle" fill={blueLabel} fontSize={fs}>{a}/{b}</text>
          </>
        );
      }
      case 'puteri': {
        const a=params.a||2, n=Math.min(params.n||5, 10);
        const vals = Array.from({length:n},(_,i)=>Math.pow(a,i+1));
        const maxV=Math.max(...vals.map(Math.abs),1);
        return (
          <>
            <line x1={10} y1={80} x2={90} y2={80} stroke={blueLabel} strokeWidth={0.15} />
            {vals.map((v,i)=><rect key={i} x={12+i*(76/n)} y={80-Math.abs(v)/maxV*60} width={Math.max(2,70/n)} height={Math.abs(v)/maxV*60} fill={blue} fillOpacity={0.3} stroke={blue} strokeWidth={0.15} rx={0.5} />)}
          </>
        );
      }
      case 'factorizare':
      case 'medii':
      case 'operatii_baza':
      case 'suma_cifre':
      case 'fibonacci':
      case 'conv_baze':
      case 'nr_aur':
      case 'permutari':
      case 'aranjamente':
      case 'combinari':
      case 'binom_newton':
      case 'probabilitate':
      case 'det_2x2':
      case 'inversa_2x2':
      case 'inmultire_mat':
      case 'temperatura':
      case 'lungime':
      case 'greutate':
      case 'viteza':
      case 'distanta_2p':
      case 'ec_dreapta':
      case 'ec_cerc': {
        // Generic minimal viz
        return (
          <>
            <circle cx={50} cy={50} r={25} fill={blueFill} fillOpacity={0.06} stroke={blue} strokeWidth={0.3} />
            <line x1={25} y1={50} x2={75} y2={50} stroke={blue} strokeWidth={0.2} />
            <line x1={50} y1={25} x2={50} y2={75} stroke={blue} strokeWidth={0.2} />
            <circle cx={50} cy={50} r={0.8} fill={blue} />
            <text x={50} y={82} textAnchor="middle" fill={blueLabel} fontSize={2}>{calcId}</text>
          </>
        );
      }

      default:
        return null;
    }
  }, [calcId, JSON.stringify(params)]);

  if (!content) return null;

  return (
    <div className="w-full h-[100px] rounded-[5px] overflow-hidden bg-muted/20 border border-border/30">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {content}
      </svg>
    </div>
  );
};

export default Viz2D;
