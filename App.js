import React from 'react';
import HomeScreen from "./src/home/screens/index"
import { Provider } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Color } from './src/utilities/theme';
import { extendTheme, NativeBaseProvider } from "native-base";
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import store from './src/redux/store';
import WalletNav from './src/wallet/navigation';
import HistoryNav from './src/history/navigation';
import AccountNav from './src/account/navigation';
import AuthStack from './src/auth/navigation';
const headerColor = '#fffdfb'
const navTheme = DefaultTheme;

const Colors = Color()
navTheme.colors.background = Colors.light;

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });


const Stack = createStackNavigator()


function App() {
  return (
    <>
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <NavigationContainer theme={navTheme}  >
            <NativeBaseProvider theme={theme}>

              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                  headerStyle: {
                    backgroundColor: headerColor,
                  },
                })}
              >
                <Stack.Screen name="Auth" component={AuthStack} options={{ header: () => null, }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null, }} />
                <Stack.Screen name="Wallet" component={WalletNav} options={{ header: () => null, }} />
                <Stack.Screen name="History" component={HistoryNav} options={{ header: () => null, }} />
                <Stack.Screen name="Account" component={AccountNav} options={{ header: () => null }} />

              </Stack.Navigator>
            </NativeBaseProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider >
    </>
  );
}



export default App;
