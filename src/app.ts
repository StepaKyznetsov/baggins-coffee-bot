import { Scenes, Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { ReportsCommand } from "./commands/reports.command";
import LocalSession from "telegraf-session-local";
import { StartCommand } from "./commands/start.command";
import { HelpCommand } from "./commands/help.command";
import { sendReportScene } from "./scenes/send-report.scene";

class Bot {
  bot: Telegraf<IBotContext>;

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    const stage = new Scenes.Stage<Scenes.WizardContext>([sendReportScene]);

    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
    this.bot.use(stage.middleware());
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

    this.bot.command("menu", async (ctx) => {
      const reports = new ReportsCommand(this.bot);
      await reports.handle(ctx);
    });

    this.bot.on("text", (ctx) => {
      ctx.reply("Выберите одну из предложенных команд");
    });

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
