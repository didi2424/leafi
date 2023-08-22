import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme,Theme} from "@react-navigation/native"
import RootNavigators from './navigators/RootNavigators';
import { ThemeProvider } from './Screens/Profile/Settings/Account/ThemeContext';
import { useMemo } from 'react';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  const theme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#eeeeee'
      },
    }),
    []
  )
  return (
    <ThemeProvider>
    <View style={styles.container}>
      <NavigationContainer theme={theme}>
      <GestureHandlerRootView style={{flex:1}}>
        <BottomSheetModalProvider>
          <RootNavigators />
        </BottomSheetModalProvider>
        </GestureHandlerRootView>
        <StatusBar style='dark'/>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
   </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7db149ff'

  },
});
