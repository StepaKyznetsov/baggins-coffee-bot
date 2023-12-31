import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class HelpCommand extends Command {
  message = "По вопросам и предложениям писать @braindeadprincess";

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(ctx: IBotContext): Promise<void> {
    await ctx.reply(this.message);
    //something else earlier
  }
}
