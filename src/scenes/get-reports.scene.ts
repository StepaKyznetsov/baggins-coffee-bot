import { Scene } from "./scene.class";
import { IBotContext } from "../context/context.interface";
import { Scenes } from "telegraf";
import { BaseScene } from "telegraf/typings/scenes";

export class GetReports extends Scene {

  enter(): BaseScene<Scenes.SceneContext> {
    const scene = new Scenes.BaseScene<Scenes.SceneContext>("get_reports");

    scene.command('', async (ctx) => {
      await ctx.reply("exited scene");
    //   await this.leave(ctx);
    });

    return scene;
  }

  async leave(ctx: IBotContext): Promise<void> {
    await ctx.reply("Выход из сцены get_reports");
    await ctx.scene.leave();
  }
}
