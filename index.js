/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// ignorar warning proveniente de node_modules
LogBox.ignoreLogs(['Require cycle: node_modules']);
AppRegistry.registerComponent(appName, () => App);
