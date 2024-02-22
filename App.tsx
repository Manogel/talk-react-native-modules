import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  getDataAsync,
  getDataByCallback,
  RNCustomModuleEvent,
  setData,
} from './custom-module';

function Divider() {
  return <View style={styles.divider} />;
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const unsubscribe = RNCustomModuleEvent.on('onSetData', event => {
      const [key, value] = event;
      Alert.alert('onSetData', `${key}: ${value}`);
    });

    return unsubscribe.remove;
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.main, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text>Olá mundo!</Text>
      <Divider />
      <Button title="setData" onPress={() => setData('exampleKey', 'value')} />
      <Divider />
      <Button
        title="getDataAsync"
        onPress={async () => {
          const value = await getDataAsync('exampleKey');
          Alert.alert('getDataAsync', value);
        }}
      />
      <Divider />
      <Button
        title="getDataAsyncWithError"
        onPress={async () => {
          try {
            await getDataAsync('error');
          } catch (error) {
            Alert.alert('getDataAsyncWithError', (error as Error).message);
          }
        }}
      />
      <Divider />
      <Button
        title="getDataByCallback"
        onPress={() => {
          getDataByCallback('exampleKey', value => {
            Alert.alert('getDataByCallback', value);
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginVertical: 20,
  },
});

export default App;
