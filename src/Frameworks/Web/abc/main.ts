import AbcApplication from "./Application.ts";
import AbcConfig from "./Config.ts";

const abcConfig = new AbcConfig();

const oakApplication = new AbcApplication(abcConfig);

await oakApplication.run();
