import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class BackCommand extends Command {
  message = "Сцены не запущены, мы в главном меню";

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(ctx: IBotContext): Promise<void> {
    await ctx.reply(this.message);
    //something else earlier
  }
}
