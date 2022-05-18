import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { RegionMapPluginSetup } from '../../../src/plugins/region_map/public';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DashboardsMapsPluginSetup {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DashboardsMapsPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart; 
}

export interface AppPluginSetupDependencies {
  regionMap: RegionMapPluginSetup; 
}