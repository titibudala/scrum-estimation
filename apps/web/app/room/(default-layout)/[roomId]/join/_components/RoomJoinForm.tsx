"use client";

import { useParams } from "next/navigation";
import { useActionState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";

import { joinRoom } from "../_actions/joinRoom";
import useRoomJoinSocket from "../_hooks/useRoomJoinSocket";
import {
  JoinRoomSchema,
  JoinRoomSchemaTypes,
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/_components/shadcn/ui/radio-group";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/shadcn/ui/alert";

type RoomJoinFormProps = {
  roomConfig: any;
};

export default function RoomJoinForm({ roomConfig }: RoomJoinFormProps) {
  useRoomJoinSocket();
  const { roomId } = useParams();

  const [formState, formAction, isFormPending] = useActionState(joinRoom, {
    success: false,
    message: "",
  });

  const form = useForm<JoinRoomSchemaTypes>({
    resolver: zodResolver(JoinRoomSchema),
    defaultValues: {
      roomId: roomId as string,
      playerName: "",
    },
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h3>Configure your persona</h3>
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent>
          <Form {...form}>
            <form
              id="join-room-form"
              onSubmit={form.handleSubmit((data) =>
                startTransition(() => formAction(data))
              )}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="playerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name:</FormLabel>

                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>

                    <FormDescription>
                      This is the name of your persona
                    </FormDescription>

                    <FormMessage>
                      {formState?.errors?.fieldErrors?.playerName}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="playerExpertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your expertise:</FormLabel>

                    <FormControl>
                      <RadioGroup onValueChange={field.onChange}>
                        {roomConfig?.expertise?.map((expertise: string) => (
                          <FormItem
                            key={expertise}
                            className="flex items-center gap-3"
                          >
                            <FormControl>
                              <RadioGroupItem value={expertise} />
                            </FormControl>

                            <FormLabel>{expertise}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    <FormDescription>
                      This represets the expertise that you will estimate the
                      tickets with
                    </FormDescription>

                    <FormMessage>
                      {formState?.errors?.fieldErrors?.playerExpertise}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <Separator />

        <CardFooter className="flex flex-col items-end gap-6">
          <Button
            type="submit"
            form="join-room-form"
            size="lg"
            disabled={isFormPending}
          >
            Join room
          </Button>

          {formState?.success && (
            <Alert>
              <CheckCircle2Icon />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                You&apos;ve requested to join - wait for the any online player
                or admin to verify you and let you in...
                <Loader2Icon className="animate-spin" />
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
