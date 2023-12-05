import { Markup, Scenes } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { Scene } from "./scene.class";
import { WizardScene } from "telegraf/typings/scenes";

export class SendReportScene extends Scene {
  enter(): WizardScene<Scenes.WizardContext> {
    const scene = new Scenes.WizardScene<Scenes.WizardContext>(
      "send_report",
      async (ctx) => {
        await ctx.reply("Пришлите фотографию пола");
        return ctx.wizard.next();
      },
      async (ctx) => {
        const message = ctx.message as Message.PhotoMessage;
        if (message.photo && message.photo.length > 0) {
          await ctx.reply(
            "Фотография пола принята. Пришлите фотографию кофемашины"
          );
          return ctx.wizard.next();
        } else {
          await ctx.reply("Пожалуйста, пришлите фотографию.");
        }
      },
      async (ctx) => {
        const message = ctx.message as Message.PhotoMessage;
        if (message.photo && message.photo.length > 0) {
          await ctx.reply("Спасибо!", Markup.removeKeyboard());
          return ctx.scene.leave();
        } else {
          await ctx.reply("Пожалуйста, пришлите фотографию кофемашины.");
        }
      }
    );

    scene.command("back", async (ctx) => {
      await ctx.reply('Выход из сцены send_reports')
      await ctx.scene.leave();
    });

    return scene;
  }
}
