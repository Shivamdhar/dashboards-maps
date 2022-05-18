import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { DashboardsMapsPluginSetup, DashboardsMapsPluginStart } from './types';
import { first } from 'rxjs/operators';
import { createGeospatialCluster } from './clusters';
import { GeospatialService, OpensearchService } from './services';
import { geospatial, opensearch } from '../server/routes';

export class DashboardsMapsPlugin
  implements Plugin<DashboardsMapsPluginSetup, DashboardsMapsPluginStart> {
  private readonly logger: Logger;
  private readonly globalConfig$;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
    this.globalConfig$ = initializerContext.config.legacy.globalConfig$;
  }

  public async setup(core: CoreSetup) {
    this.logger.debug('dashboardsMaps: Setup');
    const globalConfig = await this.globalConfig$.pipe(first()).toPromise();

    const geospatialClient = createGeospatialCluster(core, globalConfig);
    // Initialize services
    const geospatialService = new GeospatialService(geospatialClient);
    const opensearchService = new OpensearchService(geospatialClient);

    const router = core.http.createRouter();
    // Register server side APIs
    geospatial(geospatialService, router);
    opensearch(opensearchService, router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('dashboardsMaps: Started');
    return {};
  }

  public stop() {}
}
