import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import CardListProto from './CardList';

const { store, persistor } = configureStore();

const AppRoot = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <View style={styles.container}>
        <CardListProto />
      </View>
    </PersistGate>
  </Provider>
);

export default AppRoot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
