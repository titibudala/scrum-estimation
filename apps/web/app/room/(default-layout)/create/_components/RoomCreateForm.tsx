"use client";

import { useActionState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateRoomSchema,
  CreateRoomSchemaTypes,
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
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/app/_components/shadcn/ui/multi-select";

import {
  ExpertiseCategory,
  ExpertiseCategoryKeys,
  SecurityMechanism,
  SecurityMechanismKeys,
  VoteMechanism,
  VoteMechanismKeys,
} from "@workspace/shared/data";
import { createRoom } from "../_actions/createRoom";

export default function RoomCreateForm() {
  const [formState, formAction, isFormPending] = useActionState(createRoom, {
    success: false,
    message: "",
  });

  const form = useForm<CreateRoomSchemaTypes>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      roomName: "",
      roomSecurity: undefined,
      roomVote: undefined,
      roomExpertise: [],
    },
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h3>Configure your estimation room</h3>
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent>
          <Form {...form}>
            <form
              id="create-room-form"
              onSubmit={form.handleSubmit((data) =>
                startTransition(() => formAction(data))
              )}
              className="flex flex-col gap-12"
            >
              <FormField
                control={form.control}
                name="roomName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room name:</FormLabel>

                    <FormControl>
                      <Input placeholder="Sprint 33 - Feature X" {...field} />
                    </FormControl>

                    <FormDescription>
                      This is the name of the room that will be visible to every
                      player
                    </FormDescription>

                    <FormMessage>
                      {formState?.errors?.fieldErrors?.roomName}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomSecurity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security type:</FormLabel>

                    <FormControl>
                      <RadioGroup onValueChange={field.onChange}>
                        {SecurityMechanismKeys.map((securityKey) => (
                          <FormItem
                            key={securityKey}
                            className="flex items-center gap-3"
                          >
                            <FormControl>
                              <RadioGroupItem value={securityKey} />
                            </FormControl>

                            <FormLabel>
                              {SecurityMechanism[securityKey].name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    <FormDescription>
                      This represets the security of the room, it can either be
                      open for everyone or manually give access to players
                      whenever they want to join by using a waiting room
                    </FormDescription>

                    <FormMessage>
                      {formState?.errors?.fieldErrors?.roomSecurity}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomVote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voting mechanism:</FormLabel>

                    <FormControl>
                      <RadioGroup onValueChange={field.onChange}>
                        {VoteMechanismKeys.map((voteKey) => (
                          <FormItem
                            key={voteKey}
                            className="flex items-center gap-3"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={JSON.stringify(
                                  VoteMechanism[voteKey].value
                                )}
                              />
                            </FormControl>

                            <FormLabel className="flex flex-col items-start">
                              {VoteMechanism[voteKey].name}

                              <span className="flex gap-3 mt-1">
                                {VoteMechanism[voteKey].value.map(
                                  (voteValue) => (
                                    <span
                                      key={voteValue}
                                      className="w-12 aspect-square flex justify-center items-center border-1 rounded-md"
                                    >
                                      {voteValue}
                                    </span>
                                  )
                                )}
                              </span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    <FormDescription>
                      This represets the way the room&apos;s tickets will be
                      evaluated by the players and how the estimations are
                      calculated
                    </FormDescription>

                    <FormMessage>
                      {formState?.errors?.fieldErrors?.roomVote}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomExpertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Needed expertise:</FormLabel>

                    <MultiSelect
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <FormControl>
                        <MultiSelectTrigger className="w-full">
                          <MultiSelectValue placeholder="Select expertises..." />
                        </MultiSelectTrigger>
                      </FormControl>

                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {ExpertiseCategoryKeys.map((expertiseKey) => (
                            <MultiSelectItem
                              key={expertiseKey}
                              value={expertiseKey}
                            >
                              {ExpertiseCategory[expertiseKey].name}
                            </MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>

                    <FormDescription>
                      This represents the expertises that are needed to estimate
                      the room&apos;s tickets and it will be selectable by the
                      players when they join
                    </FormDescription>

                    <FormMessage>
                      {formState?.errors?.fieldErrors?.roomExpertise}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form="create-room-form"
            size="lg"
            disabled={isFormPending}
          >
            Create room
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
