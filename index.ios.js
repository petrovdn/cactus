import { AppRegistry } from 'react-native';

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];

import cactus from './cactus';

AppRegistry.registerComponent('cactus', () => cactus);