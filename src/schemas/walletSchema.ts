
import { z } from "zod";

export const walletSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),
  network: z.object({
    name: z.string().min(1, "Network name is required"),
    chainId: z.number().positive("Chain ID must be positive"),
  }),
  balance: z.string().regex(/^\d+(\.\d+)?$/, "Invalid balance format"),
});

export const connectionStatusSchema = z.enum([
  "disconnected",
  "connecting", 
  "connected",
  "error"
]);

export type WalletData = z.infer<typeof walletSchema>;
export type ConnectionStatus = z.infer<typeof connectionStatusSchema>;
