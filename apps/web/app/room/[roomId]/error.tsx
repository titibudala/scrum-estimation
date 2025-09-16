"use client";

import Link from "next/link";

import AppPageTitle from "@/app/_components/AppPageTitle";
import { Button } from "@/app/_components/shadcn/ui/button";

export default function ErrorPage() {
  return (
    <>
      <AppPageTitle title="Ooops - Room couldn't be found or something went wrong" />

      <main className="app-container pb-16">
        <Button asChild size="lg">
          <Link href="/">Go back home</Link>
        </Button>
      </main>
    </>
  );
}
