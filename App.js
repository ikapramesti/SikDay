import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { TransactionProvider } from "./src/context/TransactionContext";
import RootNavigator from "./src/navigation/RootNavigator";
import colors from "./src/constants/colors";
import { registerRootComponent } from "expo";

export default function App() {
  return (
    <SafeAreaProvider>
      <TransactionProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor={colors.headerBg} />
          <RootNavigator />
        </NavigationContainer>
      </TransactionProvider>
    </SafeAreaProvider>
  );
}
registerRootComponent(App);
