import { Markup, Scenes } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { IBotContext } from "../context/context.interface";

export const sendReportScene = new Scenes.WizardScene<Scenes.WizardContext>(
  "send-report",
  async (ctx) => {
    await ctx.reply(
      "Пришлите фотографию пола",
      Markup.keyboard(["В главное меню"]).resize()
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    const message = ctx.message as Message;
    //@ts-expect-error message can have photo
    if (message.photo && message.photo.length > 0) {
      await ctx.reply(
        "Фотография пола принята. Пришлите фотографию кофемашины",
        Markup.keyboard(["В главное меню"]).resize()
      );
      return ctx.wizard.next();
    } else {
      await ctx.reply(
        "Пожалуйста, пришлите фотографию.",
        Markup.keyboard(["В главное меню"]).resize()
      );
    }
  },
  async (ctx) => {
    const message = ctx.message as Message;
    //@ts-expect-error message can have photo
    if (message.photo && message.photo.length > 0) {
      await ctx.reply("Спасибо!", Markup.removeKeyboard());
      return ctx.scene.leave();
    } else {
      await ctx.reply(
        "Пожалуйста, пришлите фотографию кофемашины.",
        Markup.keyboard([["В главное меню"]]).resize()
      );
    }
  }
);

sendReportScene.command("leave", async (ctx) => {
  leave(ctx);
});

sendReportScene.hears("В главное меню", async (ctx) => {
  leave(ctx);
});

const leave = async (ctx: IBotContext) => {
  await ctx.reply("Мы снова в главном меню", Markup.removeKeyboard());
  ctx.scene.leave();
}

