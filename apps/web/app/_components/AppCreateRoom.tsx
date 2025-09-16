"use client";

import Link from "next/link";
import { AlertCircleIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/shadcn/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/shadcn/ui/alert";
import { Separator } from "@/app/_components/shadcn/ui/separator";
import { Button } from "@/app/_components/shadcn/ui/button";

export default function AppCreateRoom() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h3>Create a new estimation room</h3>
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="text-sm">
          <p>You&apos;ll be able to choose:</p>

          <ul className="list-inside list-disc marker:text-xl">
            <li>a name for for the estimation room</li>
            <li>how the room will be secured</li>
            <li>the type of voting mechanism</li>
            <li>and many other options</li>
          </ul>
        </CardContent>

        <Separator />

        <CardFooter className="flex-col items-end gap-6">
          <Alert variant="destructive">
            <AlertCircleIcon />

            <AlertTitle>
              <p>Important to know!</p>
            </AlertTitle>

            <AlertDescription>
              <p>
                It is recommended to login to be sure your created rooms are not
                lost. Without an account, your history depends on the cookies
                that this website sets.
              </p>

              <Button
                size="lg"
                disabled
                className="line-through mt-2"
                variant="secondary"
              >
                Login
              </Button>
            </AlertDescription>
          </Alert>

          <Button asChild size="lg">
            <Link href="/room/create">Create room</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
