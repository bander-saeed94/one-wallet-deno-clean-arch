import { Application } from "https://deno.land/x/oak/mod.ts";
import RestConfig from "../../../../config/rest-config.ts";
import UserRoutes from "./routes/user-route.ts";
import OakConfig from "./Config.ts";
export default class OakApplication {
  constructor(
    private readonly oakConfig: OakConfig,
  ) {
  }
  public async run() {
    const app = new Application();

    const userRoutes = new UserRoutes(this.oakConfig);
    app.use(userRoutes.router.routes());
    app.use(userRoutes.router.allowedMethods());

    app.use((ctx) => {
      ctx.response.body = "Hello World!";
    });

    await app.listen({ port: 8080 });
    console.log("Finished.");
  }
}
