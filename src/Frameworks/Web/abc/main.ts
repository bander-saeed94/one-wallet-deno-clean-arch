import RestConfig from "../../../../config/rest-config.ts";
import AbcApplication from './Application.ts';

const restConfig = new RestConfig();

const oakApplication = new AbcApplication(restConfig);

await oakApplication.run();