import { Application, Context } from "https://deno.land/x/abc@v1.0.3/mod.ts";
import RestConfig from "../../../../config/rest-config.ts";
import UserRoutes from "./routes/user-route.ts";
export default class AbcApplication {
  constructor(
    private readonly restConfig: RestConfig,
  ) {
  }
  public async run() {
    const app = new Application();

    new UserRoutes(this.restConfig, app.group("/api/v1/users"));

    await app.start({ port: 8081 });
  }
}
