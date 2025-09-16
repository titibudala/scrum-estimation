"use client";

import { Separator } from "@/app/_components/shadcn/ui/separator";

type AppPageTitle = {
  title: string;
  subTitle?: string;
};

export default function AppPageTitle({ title, subTitle }: AppPageTitle) {
  return (
    <div className="app-container flex flex-col py-10">
      <h1 className="app-heading">{title}</h1>

      {subTitle && (
        <h2 className="app-sub-heading text-muted-foreground mt-1">{subTitle}</h2>
      )}

      <Separator className="mt-10" />
    </div>
  );
}
