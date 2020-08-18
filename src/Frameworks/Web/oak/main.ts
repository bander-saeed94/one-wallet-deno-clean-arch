import OakApplication from "./Application.ts";
import OakConfig from "./Config.ts";

const oakConfig = new OakConfig();

const oakApplication = new OakApplication(oakConfig);

await oakApplication.run();
