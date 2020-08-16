import OakApplication from "./Application.ts";
import RestConfig from "../../../../config/rest-config.ts";

const restConfig = new RestConfig();

const oakApplication = new OakApplication(restConfig);

await oakApplication.run();
