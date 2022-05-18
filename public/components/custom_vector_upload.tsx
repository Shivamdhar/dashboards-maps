/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { EuiButton } from '@elastic/eui';
import { getPlugins } from '../services';
import EmptyPrompt from './empty_prompt';
import VectorUploadOptions from './vector_upload_options';
import { RegionMapOptionsProps } from '../../../../src/plugins/region_map/public';

function CustomVectorUpload(props: RegionMapOptionsProps) {
  const GEOSPATIAL_PLUGIN = 'opensearch-geospatial';
  const [isGeospatialPluginInstalled, setIsGespatialPluginInstalled] = React.useState(false);

  // Logic for implementing empty state pattern
  // In case geospatial plugin is not installed, an empty prompt with details is shown.
  useEffect(() => {
    const checkIfGeospatialPluginIsInstalled = async () => {
      const result = await getPlugins(props.vis.http);
      const installedPlugins = result.resp.map((plugin) => {
        return plugin.component;
      });
      if (installedPlugins.includes(GEOSPATIAL_PLUGIN)) {
        return true;
      }

      return false;
    };

    async function getPluginInfo() {
      const installedFlag = await Promise.resolve(checkIfGeospatialPluginIsInstalled());
      if (installedFlag) {
        setIsGespatialPluginInstalled(true);
      } else {
        setIsGespatialPluginInstalled(false);
      }
    }
    getPluginInfo();
  }, [props]);

  const emptyPromptProps = {
    iconType: 'popout',
    title: 'Missing geospatial plugin',
    bodyFragment: 'Install the geospatial plugin in order to upload custom vector maps.',
    actions: (
      <EuiButton href="https://opensearch.org/docs/latest/" color="primary" fill>
        Learn more
      </EuiButton>
    ),
  };

  return (
    <div>
      {isGeospatialPluginInstalled ? (
        <VectorUploadOptions {...props} />
      ) : (
        <EmptyPrompt {...emptyPromptProps} />
      )}
    </div>
  );
}

export { CustomVectorUpload };
