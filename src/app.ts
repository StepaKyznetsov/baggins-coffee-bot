import { MiddlewareObj, Scenes, Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { ReportsCommand } from "./commands/reports.command";
import LocalSession from "telegraf-session-local";
import { StartCommand } from "./commands/start.command";
import { HelpCommand } from "./commands/help.command";
import { BackCommand } from "./commands/back.command";
import { GetReportsScene } from "./scenes/get-reports.scene";
import { SendReportScene } from "./scenes/send-report.scene";

class Bot {
  bot: Telegraf<IBotContext>;

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));

    const sendReportScene = new SendReportScene().enter();
    const getReportsScene = new GetReportsScene().enter();

    const wizardStage = new Scenes.Stage<Scenes.WizardContext>([
      sendReportScene,
    ]);
    const baseStage = new Scenes.Stage<Scenes.SceneContext>([getReportsScene]);

    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
    this.bot.use(wizardStage.middleware());
    this.bot.use(
      (baseStage as unknown as MiddlewareObj<IBotContext>).middleware()
    );
  }

  init(): void {
    this.bot.start(async (ctx) => {
      const startCommand = new StartCommand(this.bot);
      await startCommand.handle(ctx);
    });

    this.bot.help(async (ctx) => {
      const startCommand = new HelpCommand(this.bot);
      await startCommand.handle(ctx);
    });

    this.bot.command("reports", async (ctx) => {
      const reports = new ReportsCommand(this.bot);
      await reports.handle(ctx);
    });

    this.bot.command("back", async (ctx) => {
      const back = new BackCommand(this.bot);
      await back.handle(ctx);
    });

    this.bot.on("text", async (ctx) => {
      await ctx.reply("Выберите одну из предложенных команд");
    });

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
