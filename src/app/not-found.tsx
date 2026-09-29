"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * No 404 page — any unknown route immediately goes home.
 * The response keeps its 404 status (correct for crawlers) while the
 * client swaps the URL for "/", so the built-in page is never seen.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
