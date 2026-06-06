import type { Metadata } from "next";
import ProMotionCatalog from "@/components/catalog/ProMotionCatalog";

export const metadata: Metadata = {
  title: "上級モーションカタログ｜Archeon",
  description:
    "WebGL／シェーダー・リアルタイム3D・物理・ベクター素材・高度トランジション。基礎の一段上のモーションを、触れるライブ実演とラボの実物、そして「指示で言う言葉」付きでまとめた上級カタログ。",
  alternates: { canonical: "/catalog/pro" },
};

export default function CatalogProPage() {
  return <ProMotionCatalog />;
}
