import { Instances, Instance } from '@react-three/drei';

interface SeedProps {
  count: number;
  height: number;
}

export function Seed({ count, height }: SeedProps) {
  return (
    <Instances limit={48} castShadow receiveShadow>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial color="#DAA520" roughness={0.7} />
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i % 8) * 0.8;
        const radius = 0.6 + (i >= 8 ? 0.4 : 0);
        const h = height + (i >= 16 ? 0.5 : 0);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return <Instance key={i} position={[x, h, z]} />;
      })}
    </Instances>
  );
}