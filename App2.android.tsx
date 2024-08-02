import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CustomWebview, {useCustomWebviewRef} from './CustomWebview';

function App(): React.JSX.Element {
  const ref = useCustomWebviewRef();
  const handleOpenFleyeWebsite = () => {
    console.log('Opening fleye website');
    ref.current?.loadUrl('https://fleye.com.br');
  };

  const handleSetZoom50 = () => {
    ref.current?.setZoom(50);
  };

  return (
    <View style={styles.container}>
      <CustomWebview ref={ref} url="https://jpsul.com.br" />
      <Button title="Load fleye website" onPress={handleOpenFleyeWebsite} />
      <Button title="Set zoom 50%" onPress={handleSetZoom50} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
