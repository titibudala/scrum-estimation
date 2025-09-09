import { z } from "zod";

const MeasurementType = z.enum(["FIBONACCI"], {
  error: "Invalid value selected",
});
const SecurityType = z.enum(["WAITING_ROOM"], {
  error: "Invalid value selected",
});
const PlayerExpertise = z.enum(["FE_DEV", "BE_DEV"], {
  error: "Invalid value selected",
});

export const CreateRoomSchema = z.object({
  roomName: z
    .string()
    .min(3, "The room name needs to be at least 3 characters long"),
  measurementType: MeasurementType,
  securityType: SecurityType,
});

export const JoinRoomSchema = z.object({
  roomId: z.uuid({ version: "v4" }),
  playerName: z
    .string()
    .min(3, "The player name needs to be at least 3 characters long"),
  playerExpertise: PlayerExpertise,
});

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
