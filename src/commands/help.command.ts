import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Context } from "vm";

export class HelpCommand extends Command {
  message = "По вопросам и предложениям писать @braindeadprincess";

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(ctx: Context): Promise<void> {
    await ctx.reply(this.message);
    //something else earlier
  }
}
