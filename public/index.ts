import { DashboardsMapsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new DashboardsMapsPlugin();
}
export { DashboardsMapsPluginSetup, DashboardsMapsPluginStart } from './types';
