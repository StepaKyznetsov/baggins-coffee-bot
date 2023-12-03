import { Telegraf, Markup } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Context } from "vm";

export class ReportsCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(ctx: Context): void {
    ctx.reply(
      "Выберите одну из команд",
      Markup.inlineKeyboard([
        Markup.button.callback("Информация об отчётах", "get_reports"),
        Markup.button.callback("Отправить отчёт", "send_report"),
      ])
    );

    this.bot.action("get_reports", (ctx) => {
      ctx.reply("Пусто")
    });

    this.bot.action("send_report", (ctx) => {
      ctx.reply("И здесь")
    });
  }
}
