import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useState } from "react";
import { match } from "ts-pattern";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [safeMode, setSafeMode] = useState<"top" | "bottom" | "all" | "none">(
    "all"
  );
  const [topBackground, setTopBackground] = useState("#F1F1E7");
  const [bottomBackground, setBottomBackground] = useState("#FFFFFF");

  const handleMessage = (event: WebViewMessageEvent) => {
    const { type, payload } = JSON.parse(event.nativeEvent.data);
    switch (type) {
      case "setSafeMode":
        setSafeMode(payload);
        match(payload as "top" | "bottom" | "all")
          .with("all", () => {
            setTopBackground("#F1F1E7");
            setBottomBackground("#FFFFFF");
          })
          .with("top", () => {
            setTopBackground("#F1F1E7");
          })
          .with("bottom", () => {
            setBottomBackground("#FFFFFF");
          });
        break;
      case "setTopBackground":
        setTopBackground(payload);
        break;
      case "setBottomBackground":
        setBottomBackground(payload);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaProvider>
      {match(safeMode)
        .with("all", "top", () => (
          <SafeAreaView
            edges={["top"]}
            accessibilityIgnoresInvertColors={true}
            style={{ backgroundColor: topBackground }}
          />
        ))
        .otherwise(() => null)}

      <WebView
        source={{
          uri: "https://refri-webview.vercel.app",
        }}
        textZoom={100}
        onMessage={handleMessage}
        decelerationRate="normal"
        allowsBackForwardNavigationGestures
      />

      {match(safeMode)
        .with("all", "bottom", () => (
          <SafeAreaView
            edges={["bottom"]}
            style={{ backgroundColor: bottomBackground }}
          />
        ))
        .otherwise(() => null)}
    </SafeAreaProvider>
  );
}
