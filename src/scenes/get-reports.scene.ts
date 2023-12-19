import { Scene } from "./scene.class";
import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import { dates, months } from "../constants";
import { WizardScene } from "telegraf/typings/scenes";
import { Message } from "telegraf/typings/core/types/typegram";
import { createMonthArray, isStringInTwoDimensionalArray } from "../helpers/dates";
import { Month } from "../types";

export class GetReportsScene extends Scene {
  enter(): WizardScene<Scenes.WizardContext> {
    const scene = new Scenes.WizardScene<Scenes.WizardContext>(
      "get_reports",
      async (ctx) => {
        await ctx.reply(
          "Укажите месяц, в который проводилась проверка (представлены данные только за 2024 год)",
          Markup.keyboard(months.map((e) => e)).resize(),
        );
        return ctx.wizard.next();
      },
      async (ctx) => {
        const selectedMonth = (ctx.message as Message.TextMessage).text as Month;
        if (isStringInTwoDimensionalArray(selectedMonth, months)) {
          await ctx.reply(`Выбран месяц: ${selectedMonth}`);
          const dates = createMonthArray(selectedMonth);
          ctx.reply(
            "Выберите дату:",
            Markup.keyboard(dates.map((e) => e)).resize()
          );
          return ctx.wizard.next();
        } else {
          await ctx.reply("Пожалуйста, выберите месяц")
        }
      },
      async (ctx) => {
        const selectedDay = (ctx.message as Message.TextMessage).text;
        if (isStringInTwoDimensionalArray(selectedDay, dates)) {
          return await this.leave(ctx);
        } else {
          await ctx.reply("Пожалуйста, выберите нужную дату.");
        }
      }
    );

    scene.command("back", async (ctx) => {
      await this.leave(ctx)
    });

    return scene;
  }

  async leave(ctx: IBotContext): Promise<void> {
    Markup.removeKeyboard()
    await ctx.reply("Выход из сцены get_reports");
    await ctx.scene.leave();
  }
}
