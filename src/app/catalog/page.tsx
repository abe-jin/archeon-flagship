import type { Metadata } from "next";
import MotionCatalog from "@/components/catalog/MotionCatalog";

export const metadata: Metadata = {
  title: "動きの辞書 — モーションカタログ | Archeon",
  description:
    "Webを“動かす”手法を、触れるライブ実演と「指示で言う言葉」付きでまとめたモーションカタログ。気に入った演出は言葉をコピーしてそのまま発注に使えます。",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return <MotionCatalog />;
}
