import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme,Theme} from "@react-navigation/native"
import RootNavigators from './navigators/RootNavigators';
import { useMemo } from 'react';

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
    <View style={styles.container}>
      <NavigationContainer theme={theme}>
        <RootNavigators />
        <StatusBar style='dark'/>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7db149ff'

  },
});
