import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Routes} from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Routes />
    </SafeAreaProvider>
  );
}
