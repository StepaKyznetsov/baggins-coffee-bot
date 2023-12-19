import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
  message = `
Привет! <b>здесь </b><i>можно</i> ввести что <span class="tg-spoiler">угодно</span> и как угодно, но у меня нет <b>идей</b>

/reports - работа с отчётами,
/back - вернуться в самое начало,
/help - помощь с ботом
`;
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(ctx: IBotContext): Promise<void> {
    await ctx.replyWithHTML(this.message);
    await ctx.reply('Предположу, что Вам нужно поработать с отчётами. Для этого воспользуйтесь командой /reports');
    //something else later
  }
}
