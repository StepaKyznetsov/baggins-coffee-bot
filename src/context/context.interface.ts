import { Context, Scenes } from "telegraf";

export interface SessionData {}

export interface IBotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>;
  wizard: Scenes.WizardContextWizard<IBotContext>;
}
