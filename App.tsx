import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function App() {
  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F1F1E7" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: "https://refri-webview.vercel.app/" }}
        />
      </SafeAreaView>
    </Fragment>
  );
}
