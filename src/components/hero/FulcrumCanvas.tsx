"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/**
 * THE FULCRUM — 一点で均衡する天秤。
 * 石灰岩の三角支点に真鍮の梁が一点で乗り、左に重い御影石（顧客の課題）、
 * 右に小さなティールの分銅（Archeon）。スクロールという「小さな入力」で
 * てこ比が効き、重い塊が持ち上がって最後に水平＝均衡へ到達する。
 *
 * 物理はフル物理を使わず、支点回りの単一自由度（梁角θ）を eased 補間で駆動。
 * Movement.tsx の Prog ref + ScrollTrigger scrub / eased 積分を踏襲。
 * このコンポーネントは「動きOK かつ WebGL対応」時のみ親からマウントされる。
 */

type Drive = {
  scroll: { t: number; e: number };
  mx: { t: number; e: number };
  my: { t: number; e: number };
};

const BASE_TILT = 0.17; // 初期の傾き（左＝御影が下がった未解決状態）

function brass() {
  return (
    <meshPhysicalMaterial
      color="#c2974e"
      metalness={1}
      roughness={0.34}
      clearcoat={0.7}
      clearcoatRoughness={0.28}
      envMapIntensity={1.15}
    />
  );
}

function Scene({ drive }: { drive: React.RefObject<Drive> }) {
  const pivot = useRef<THREE.Group>(null);
  const rig = useRef<THREE.Group>(null);
  const tealRef = useRef<THREE.Mesh>(null);

  // 御影石（重い塊）— 面が出るよう低ディテール＋flatShading
  const graniteGeo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(0.62, 1);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = Math.sin(v.x * 7.0) * Math.cos(v.y * 6.0) * Math.sin(v.z * 5.0);
      v.multiplyScalar(1 + n * 0.06);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  // 三角支点（石灰岩）の押し出しジオメトリ：頂点を原点(0,0)に置く。
  // 奥行きだけ中心化し、apex は y=0 のまま（梁の回転中心＝apex に一致させる）。
  const fulcrumGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0); // apex（原点）
    s.lineTo(-1.0, -1.5);
    s.lineTo(1.0, -1.5);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
      steps: 1,
    });
    g.translate(0, 0, -0.35); // 奥行きのみ中心化（apex は (0,0) を維持）
    return g;
  }, []);

  useFrame((_, dtRaw) => {
    const d = drive.current;
    if (!d) return;
    const dt = Math.min(dtRaw, 1 / 30);
    // 追従を速く（即応性アップ）
    const k = Math.min(1, dt * 11);
    d.scroll.e += (d.scroll.t - d.scroll.e) * k;
    d.mx.e += (d.mx.t - d.mx.e) * Math.min(1, dt * 8);
    d.my.e += (d.my.t - d.my.e) * Math.min(1, dt * 8);

    const p = d.scroll.e; // 0..1
    const pp = p * p * (3 - 2 * p); // smoothstep
    const settle = 1 - pp; // 均衡へ近づくほど入力の影響を減衰
    const t = performance.now() * 0.001;
    // アイドルの揺れを速く・大きく（背後オブジェクトが生きて見える）
    const idle = Math.sin(t * 1.6) * 0.05 + Math.sin(t * 0.9) * 0.02;

    // 梁角θ：初期傾き + マウス/アイドルの小入力（均衡到達で 0 に収束）
    const theta = BASE_TILT * settle + (d.my.e * 0.1 + idle) * settle;

    if (pivot.current) pivot.current.rotation.z = theta;

    // 全体の視差（マウス）— 反応を少し強めに
    if (rig.current) {
      rig.current.rotation.y = d.mx.e * 0.2;
      rig.current.rotation.x = -0.04 + d.my.e * 0.05;
    }

    // 出力点（ティール分銅）の発光を均衡到達の一瞬だけ強める
    if (tealRef.current) {
      const m = tealRef.current.material as THREE.MeshPhysicalMaterial;
      m.emissiveIntensity = 0.18 + pp * 0.5;
    }
  });

  return (
    <group ref={rig} rotation={[-0.04, 0, 0]} position={[0, -0.15, 0]}>
      {/* 三角支点（石灰岩）— 静止 */}
      <mesh geometry={fulcrumGeo} castShadow receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial color="#e7e1d4" roughness={0.94} metalness={0.02} />
      </mesh>

      {/* 梁と荷重（支点＝原点(apex)回りに回転）。梁の底面が apex(y=0) に接する */}
      <group ref={pivot} rotation={[0, 0, BASE_TILT]}>
        {/* 真鍮の梁 */}
        <RoundedBox args={[6.0, 0.2, 0.52]} radius={0.06} smoothness={4} position={[0, 0.1, 0]} castShadow receiveShadow>
          {brass()}
        </RoundedBox>

        {/* 左端：御影石の重い塊（顧客の課題）— 梁の上に乗る */}
        <mesh geometry={graniteGeo} position={[-2.45, 0.78, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#34373d" roughness={0.82} metalness={0.18} flatShading />
        </mesh>

        {/* 右端：ティールの小分銅（Archeon＝唯一の彩色＝出力点）— 梁の上に乗る */}
        <mesh ref={tealRef} position={[2.5, 0.37, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.3, 0.34, 40]} />
          <meshPhysicalMaterial
            color="#14b8a6"
            metalness={0.55}
            roughness={0.26}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
            emissive="#0b6157"
            emissiveIntensity={0.18}
            envMapIntensity={1.1}
          />
        </mesh>
        {/* 分銅のつまみ */}
        <mesh position={[2.5, 0.61, 0]} castShadow>
          <torusGeometry args={[0.1, 0.03, 12, 28]} />
          <meshStandardMaterial color="#0e7a6f" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* 接地影 */}
      <ContactShadows position={[0, -1.62, 0]} opacity={0.4} scale={14} blur={2.6} far={5} resolution={512} color="#3a3526" />
    </group>
  );
}

function Lights() {
  return (
    <>
      {/* 紙地で金属を“商品撮影級”に見せるための明るめスタジオリグ（紙地に合わせ再調律） */}
      <Environment resolution={256}>
        <Lightformer intensity={2.4} position={[0, 5, -4]} scale={[12, 7, 1]} color="#ffffff" />
        <Lightformer intensity={1.4} position={[-6, 2, 4]} scale={[4, 9, 1]} color="#cfe0ff" />
        <Lightformer intensity={1.25} position={[6, 1, 4]} scale={[4, 9, 1]} color="#ffe6c4" />
        <Lightformer intensity={1.0} form="ring" position={[0, 2.5, 6]} scale={5} color="#ffffff" />
      </Environment>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.45}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
    </>
  );
}

export default function FulcrumCanvas() {
  const drive = useRef<Drive>({ scroll: { t: 0, e: 0 }, mx: { t: 0, e: 0 }, my: { t: 0, e: 0 } });
  const [active, setActive] = useState(true);

  // スクロール → 梁角 / 可視判定 / ポインタ
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ".fulcrum-scroll",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (drive.current) drive.current.scroll.t = self.progress;
      },
    });

    const onPointer = (e: PointerEvent) => {
      const d = drive.current;
      if (!d) return;
      d.mx.t = (e.clientX / window.innerWidth) * 2 - 1;
      d.my.t = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // 可視（ヒーローが画面内）かつタブ表示中のときだけ描画する
    let onScreen = true;
    const recompute = () => setActive(onScreen && document.visibilityState === "visible");

    const onVis = () => recompute();
    document.addEventListener("visibilitychange", onVis);

    const heroEl = document.querySelector(".fulcrum-scroll");
    let io: IntersectionObserver | null = null;
    if (heroEl) {
      io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? true;
          recompute();
        },
        { threshold: 0 }
      );
      io.observe(heroEl);
    }

    return () => {
      st.kill();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.5, 9.5], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        scene.background = new THREE.Color("#faf9f6");
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Lights />
      <Scene drive={drive} />
    </Canvas>
  );
}
