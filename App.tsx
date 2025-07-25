import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts, Barlow_400Regular, Barlow_700Bold } from '@expo-google-fonts/barlow';
import { Text, View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
// Custom global Text component to apply Barlow font
const AppText = (props: any) => <Text {...props} style={[{ fontFamily: 'Barlow_400Regular' }, props.style]} />;

export default function App() {
  const [fontsLoaded] = useFonts({
    Barlow_400Regular,
    Barlow_700Bold,
  });



  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.style = { fontFamily: 'Barlow_400Regular' };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <AppNavigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
} 