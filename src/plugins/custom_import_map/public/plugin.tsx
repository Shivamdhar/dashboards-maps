import React from 'react';
import { i18n } from '@osd/i18n';
import { CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  DashboardsMapsPluginSetup,
  DashboardsMapsPluginStart,
  AppPluginSetupDependencies
} from './types';
import { CustomVectorUpload } from './components/custom_vector_upload';
import { RegionMapVisualizationDependencies } from '../../../src/plugins/region_map/public';

export class DashboardsMapsPlugin
  implements Plugin<DashboardsMapsPluginSetup, DashboardsMapsPluginStart> {
  public setup(core: CoreSetup, { regionMap }: AppPluginSetupDependencies): DashboardsMapsPluginSetup {

    regionMap.addOptionsTab({
      name: 'controls',
      title: i18n.translate(
        'regionMap.mapVis.regionMapEditorConfig.controlTabs.controlsTitle',
        {
          defaultMessage: 'Import Vector Map',
        }
      ),
      editor: (props : RegionMapVisualizationDependencies) => (
        <CustomVectorUpload {...props} />
      ),
    })
    
    // Return methods that should be available to other plugins
    return {};
  }

  public start(core: CoreStart): DashboardsMapsPluginStart {
    return {};
  }

  public stop() {}
}
