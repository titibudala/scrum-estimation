"use client";

import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/app/_components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/shadcn/ui/card";
import { Input } from "@/app/_components/shadcn/ui/input";
import { Label } from "@/app/_components/shadcn/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/shadcn/ui/tabs";

export default function RoomSidebar() {
  return (
    <div className="flex-2">
      <div className="flex w-full flex-col gap-6 h-[calc(100dvh-1rem)] sticky top-2">
        <Tabs defaultValue="tickets" className="h-full">
          <TabsList className="w-full">
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card className="h-full overflow-y-scroll">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Username</Label>
                  <Input id="tabs-demo-username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Configigigigiig</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
