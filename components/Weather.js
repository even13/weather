import React from 'react';
import { View, Text, Stylesheet } from 'react-native';

const Weather = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} />
      <View style={styles.bodyContainer} />
    </View>
  );
};

const styles = StyleSheet({
  container: {
    flex: 1
  },
  headerContainer: {},
  bodyContainer: {}
});

export default Weather;
