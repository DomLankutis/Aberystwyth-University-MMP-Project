import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import MainCanvas from "./components/MainCanvas";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <MainCanvas arrSize={50}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
