import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import CustomMapView, {useMapRef} from './CustomMapView';

function App(): React.JSX.Element {
  const ref = useMapRef();

  const handlePress = () => {
    // ref.current.nativeMethod();
    ref.current?.logMessage('Olá mundo!');
  };

  const handleFocusRegion = () => {
    ref.current?.focusRegion({
      latitude: -27.637429,
      longitude: -48.687876,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004,
    });
  };

  return (
    <View style={styles.container}>
      <CustomMapView
        ref={ref}
        zoomEnabled={true}
        style={{flex: 1}}
        region={{
          latitude: -27.637429,
          longitude: -48.687876,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      />
      <Button title="Log Message" onPress={handlePress} />
      <Button title="Focus region" onPress={handleFocusRegion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
