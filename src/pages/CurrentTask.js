import WebView from "react-native-webview";

export const CurrentTask = ({task}) => {
  return <WebView source={{ uri: `${task}` }} />
}
