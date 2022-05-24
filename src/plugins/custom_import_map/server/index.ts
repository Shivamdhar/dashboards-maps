import { PluginInitializerContext } from '../../../src/core/server';
import { DashboardsMapsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new DashboardsMapsPlugin(initializerContext);
}

export { DashboardsMapsPluginSetup, DashboardsMapsPluginStart } from './types';
