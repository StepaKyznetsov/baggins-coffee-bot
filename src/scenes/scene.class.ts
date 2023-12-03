import { IBotContext } from "../context/context.interface";

export abstract class Scene {

  abstract enter(ctx: IBotContext): void;
  abstract leave(ctx: IBotContext): void;
}