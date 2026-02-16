import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useState, useCallback } from 'react';
import * as THREE from 'three';

const VIZ_MAP: Record<string, string> = {
  cub: 'cube', paralelipiped: 'box', sfera: 'sphere', cilindru: 'cylinder',
  con: 'cone', piramida: 'pyramid', tor: 'torus', tetraedru: 'tetrahedron',
  trunchi_con: 'frustum', prisma: 'prism',
};

export const hasViz3D = (id: string) => id in VIZ_MAP;

const Shape = ({ type, p }: { type: string; p: Record<string, number> }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { geometry, edges, scale, dims } = useMemo(() => {
    let geo: THREE.BufferGeometry;
    let maxDim = 1;
    let dims: string[] = [];

    switch (type) {
      case 'cube':
        geo = new THREE.BoxGeometry(p.a || 1, p.a || 1, p.a || 1);
        maxDim = p.a || 1;
        dims = [`a = ${(p.a || 1).toFixed(1)}`];
        break;
      case 'box':
        geo = new THREE.BoxGeometry(p.L || 1, p.h || 1, p.l || 1);
        maxDim = Math.max(p.L || 1, p.l || 1, p.h || 1);
        dims = [`L=${(p.L||1).toFixed(1)}`, `l=${(p.l||1).toFixed(1)}`, `h=${(p.h||1).toFixed(1)}`];
        break;
      case 'sphere':
        geo = new THREE.SphereGeometry(p.r || 1, 32, 24);
        maxDim = (p.r || 1) * 2;
        dims = [`r = ${(p.r || 1).toFixed(1)}`];
        break;
      case 'cylinder':
        geo = new THREE.CylinderGeometry(p.r || 1, p.r || 1, p.h || 1, 32);
        maxDim = Math.max((p.r || 1) * 2, p.h || 1);
        dims = [`r=${(p.r||1).toFixed(1)}`, `h=${(p.h||1).toFixed(1)}`];
        break;
      case 'cone':
        geo = new THREE.ConeGeometry(p.r || 1, p.h || 1, 32);
        maxDim = Math.max((p.r || 1) * 2, p.h || 1);
        dims = [`r=${(p.r||1).toFixed(1)}`, `h=${(p.h||1).toFixed(1)}`];
        break;
      case 'torus':
        geo = new THREE.TorusGeometry(p.R || 3, p.r || 1, 16, 48);
        maxDim = ((p.R || 3) + (p.r || 1)) * 2;
        dims = [`R=${(p.R||3).toFixed(1)}`, `r=${(p.r||1).toFixed(1)}`];
        break;
      case 'tetrahedron':
        geo = new THREE.TetrahedronGeometry((p.a || 1) * 0.65);
        maxDim = p.a || 1;
        dims = [`a = ${(p.a || 1).toFixed(1)}`];
        break;
      case 'pyramid':
        geo = new THREE.ConeGeometry((p.a || 1) * 0.707, p.h || 1, 4);
        maxDim = Math.max(p.a || 1, p.h || 1);
        dims = [`a=${(p.a||1).toFixed(1)}`, `h=${(p.h||1).toFixed(1)}`];
        break;
      case 'frustum':
        geo = new THREE.CylinderGeometry(p.r || 1, p.R || 2, p.h || 1, 32);
        maxDim = Math.max((p.R || 2) * 2, p.h || 1);
        dims = [`R=${(p.R||2).toFixed(1)}`, `r=${(p.r||1).toFixed(1)}`, `h=${(p.h||1).toFixed(1)}`];
        break;
      case 'prism': {
        const shape = new THREE.Shape();
        const b = p.b || 1, ht = p.ht || 1;
        shape.moveTo(-b / 2, 0);
        shape.lineTo(b / 2, 0);
        shape.lineTo(0, ht);
        shape.closePath();
        geo = new THREE.ExtrudeGeometry(shape, { depth: p.H || 1, bevelEnabled: false });
        geo.translate(0, -ht / 3, -(p.H || 1) / 2);
        maxDim = Math.max(b, ht, p.H || 1);
        dims = [`b=${(p.b||1).toFixed(1)}`, `H=${(p.H||1).toFixed(1)}`];
        break;
      }
      default:
        geo = new THREE.BoxGeometry(1, 1, 1);
    }

    const edgeGeo = new THREE.EdgesGeometry(geo);
    const s = 2.2 / Math.max(maxDim, 0.01);
    return { geometry: geo, edges: edgeGeo, scale: Math.min(s, 8), dims };
  }, [type, JSON.stringify(p)]);

  const onOver = useCallback((e: any) => { e.stopPropagation(); setHovered(true); }, []);
  const onOut = useCallback(() => setHovered(false), []);
  const onClick = useCallback((e: any) => { e.stopPropagation(); setClicked(c => !c); }, []);

  return (
    <group scale={scale}>
      <mesh geometry={geometry} onPointerOver={onOver} onPointerOut={onOut} onClick={onClick}>
        <meshStandardMaterial
          color={hovered ? '#60a5fa' : '#3b82f6'}
          transparent
          opacity={hovered ? 0.75 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#1e3a5f" />
      </lineSegments>
    </group>
  );
};

const Viz3D = ({ calcId, params }: { calcId: string; params: Record<string, number> }) => {
  const type = VIZ_MAP[calcId];
  if (!type) return null;

  return (
    <div className="w-full h-[140px] rounded-[5px] overflow-hidden bg-muted/20 border border-border/30 relative">
      <Canvas camera={{ position: [3, 2.5, 3], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <directionalLight position={[-3, -1, -3]} intensity={0.25} />
        <Shape type={type} p={params} />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={15} autoRotate autoRotateSpeed={1.5} />
        <gridHelper args={[8, 8, '#cbd5e1', '#e2e8f0']} position={[0, -1.8, 0]} />
      </Canvas>
      <div className="absolute bottom-1 left-1 text-[8px] text-muted-foreground glass px-1 rounded-[3px]">
        drag: rotire • scroll: zoom
      </div>
    </div>
  );
};

export default Viz3D;
