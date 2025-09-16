import { z } from "zod";

import { ExpertiseCategory, SecurityMechanism } from "./data.js";

const SecurityType = z.enum(Object.keys(SecurityMechanism), {
  error: "Invalid value selected",
});
const PlayerExpertise = z.enum(Object.keys(ExpertiseCategory), {
  error: "Invalid value selected",
});

const parseJsonPreprocessor = (value: any, ctx: z.RefinementCtx) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      ctx.addIssue({
        code: "custom",
        error: "Invalid value selected",
      });
    }
  }

  return value;
};

export const CreateRoomSchema = z.object({
  roomName: z
    .string()
    .min(3, "The room name needs to be at least 3 characters long"),
  roomSecurity: SecurityType,
  roomVote: z.preprocess(
    parseJsonPreprocessor,
    z.array(
      z
        .string("Invalid value selected")
        .max(3, "Each vote should have maximum 3 characters"),
      "Invalid value selected"
    )
  ),
  roomExpertise: z
    .array(PlayerExpertise)
    .nonempty({ error: "Invalid values selected" }),
});
export type CreateRoomSchemaTypes = z.infer<typeof CreateRoomSchema>;

export const JoinRoomSchema = z.object({
  roomId: z.uuid({ version: "v4" }),
  playerName: z
    .string()
    .min(3, "The player name needs to be at least 3 characters long"),
  playerExpertise: PlayerExpertise,
});
export type JoinRoomSchemaTypes = z.infer<typeof JoinRoomSchema>;

export const AcceptPlayerSchema = z.object({
  roomId: z.uuid({ version: "v4" }),
  playerToAcceptId: z.uuid(),
});

export const CreateTicketSchema = z.object({
  roomId: z.uuid({ version: "v4" }),
  ticketTitle: z
    .string()
    .min(3, "The ticket title needs to be at least 3 characters long"),
});

export const SelectTicketSchema = z.object({
  roomId: z.uuid({ version: "v4" }),
  ticketId: z.uuid({ version: "v4" }),
});

export const RevealVotesSchema = z.object({
  roomId: z.uuid({ version: "v4" }),
});

export const RoomIdentifierSchema = z.object({
  roomId: z.uuid({ version: "v4", error: "The room identifier is invalid" }),
});
export type RoomIdentifierSchemaTypes = z.infer<typeof RoomIdentifierSchema>;
