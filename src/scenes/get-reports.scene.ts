import { Scene } from "./scene.class";
import { IBotContext } from "../context/context.interface";
import { Markup, Scenes } from "telegraf";
import { dates, months } from "../constants";

export class GetReportsScene extends Scene {
  // eslint-disable-next-line
  enter(): Scenes.BaseScene<any> {
    const scene = new Scenes.BaseScene<Scenes.SceneContext>("get_reports");

    scene.enter(async (ctx) => {
      await ctx.reply("Выберите необходимый месяц",
        Markup.keyboard( 
           months.map(e => e)
        ).resize());
    });

    scene.command("back", async (ctx) => {
      await ctx.reply('Выход из сцены get_reports', Markup.removeKeyboard())
      await ctx.scene.leave()
    });

    scene.on('text', async (ctx) => {
      const selectedMonth = ctx.message.text;
      if (months.flat().indexOf(selectedMonth) !== -1) {
        await ctx.reply(`Выбран месяц: ${selectedMonth}`);
        ctx.reply('Выберите дату:', Markup.keyboard( 
          dates.map(e => e)
       ).resize());
      } else {
        await ctx.reply('На данном этапе нужно выбрать месяц')
      }
    })

    return scene;

    // enter(): Scenes.BaseScene<any> {
    //   const scene = new Scenes.BaseScene<Scenes.SceneContext>(
    //     "get_reports",
    //     await ctx.reply("Укажите месяц, в который проводилась проверка",
    //     Markup.keyboard( 
    //        months.map(e => e)
    //     ).resize());
    //       return ctx.wizard.next();
    //     },
    //     async (ctx) => {
    //       const selectedMonth = ctx.message.text;
    //       if (months.flat().indexOf(selectedMonth) !== -1) {
    //         await ctx.reply(`Выбран месяц: ${selectedMonth}`);
    //         ctx.reply('Выберите дату:', Markup.keyboard( 
    //           dates.map(e => e)
    //        ).resize());
    //       } else {
    //         return ctx.wizard.next();
    //       }
    //     },
    //     async (ctx) => {
    //       const message = ctx.message as Message.PhotoMessage;
    //       if (message.photo && message.photo.length > 0) {
    //         await ctx.reply("Спасибо!", Markup.removeKeyboard());
    //         return ctx.scene.leave();
    //       } else {
    //         await ctx.reply("Пожалуйста, пришлите фотографию кофемашины.");
    //       }
    //     }
    //   );
  
    //   scene.command("back", async (ctx) => {
    //     await ctx.reply("Выход из сцены send_reports");
    //     await ctx.scene.leave();
    //   });
  
    //   return scene;
  }

  async leave(ctx: IBotContext): Promise<void> {
    await ctx.reply("Выход из сцены get_reports");
    await ctx.scene.leave();
  }
}
