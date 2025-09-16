"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  RoomIdentifierSchema,
  RoomIdentifierSchemaTypes,
} from "@workspace/shared/validator";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/shadcn/ui/card";
import { Separator } from "@/app/_components/shadcn/ui/separator";
import { Button } from "@/app/_components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/shadcn/ui/form";
import { Input } from "@/app/_components/shadcn/ui/input";

export default function AppJoinRoom() {
  const router = useRouter();

  const form = useForm<RoomIdentifierSchemaTypes>({
    resolver: zodResolver(RoomIdentifierSchema),
    defaultValues: {
      roomId: "",
    },
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h3>Join an existing estimation room</h3>
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent>
          <Form {...form}>
            <form
              id="join-room-form"
              onSubmit={form.handleSubmit(({ roomId }) =>
                router.push(`/room/${roomId}/join`)
              )}
            >
              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room identifier:</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="5c79b55c-c723-420b-bbd0-9879f2861fd7"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      This is the ID found in URL after the room is created
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-end">
          <Button type="submit" form="join-room-form" size="lg">
            Join room
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
