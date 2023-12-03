import { Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { ReportsCommand } from "./commands/reports.command";
import LocalSession from "telegraf-session-local";

class Bot {
  bot: Telegraf<IBotContext>;

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware());
  }

  init(): void {
    this.bot.start((ctx) => {
      ctx.reply(`
Привет!

/menu - главное меню,
/help - помощь с ботом
        `);
    });

    this.bot.help((ctx) => {
      ctx.reply("По вопросам и предложениям писать @braindeadprincess");
    });

    this.bot.command("menu", (ctx) => {
      const reports = new ReportsCommand(this.bot);
      reports.handle(ctx);
    });

    this.bot.on("text", (ctx) => {
      ctx.reply("Выберите одну из предложенных команд");
    });

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
