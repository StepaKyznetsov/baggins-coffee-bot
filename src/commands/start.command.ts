import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Context } from "vm";

export class StartCommand extends Command {
  message = `
Привет! <b>здесь </b><i>можно</i> ввести что <span class="tg-spoiler">угодно</span> и как угодно, но у меня нет <b>идей</b>

/menu - главное меню,
/help - помощь с ботом
`;
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(ctx: Context): Promise<void> {
    await ctx.replyWithHTML(this.message);
    //something else earlier
  }
}
