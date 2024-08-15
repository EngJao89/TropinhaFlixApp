import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home} from './src/screens/Home';

export default function App() {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Home />
    </SafeAreaProvider>
  );
}
