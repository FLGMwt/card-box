import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import CardListProto from './CardList';
import PropertiesEditor from './PropertiesEditor';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const { store, persistor } = configureStore();

const AppRoot = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <PropertiesEditor />
          <View style={[styles.container, { flex: 3 }]}>
            <CardListProto />
          </View>
        </View>
      </ApplicationProvider>
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
