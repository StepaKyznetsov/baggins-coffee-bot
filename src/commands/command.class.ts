import { Context, Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

export abstract class Command {
  abstract readonly message: string;

  constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(ctx: Context): Promise<void>;
}
