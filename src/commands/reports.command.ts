import { Telegraf, Markup } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Context } from "vm";

export class ReportsCommand extends Command {
  message = "Выберите одну из команд";

  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  async handle(ctx: Context): Promise<void> {
    await ctx.reply(
      this.message,
      Markup.inlineKeyboard([
        Markup.button.callback("Информация об отчётах", "get_reports"),
        Markup.button.callback("Отправить отчёт", "send_report"),
      ])
    );

    this.bot.action("get_reports", async (ctx) => {
      await ctx.reply("Пусто");
    });

    this.bot.action("send_report", async (ctx) => {
      ctx.scene.enter('send-report');
    });
  }
}
