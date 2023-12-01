import {StyleSheet, View, Text, ActivityIndicator} from "react-native";
import {COLORS} from "../colors";

export const PreloaderPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} animating={true} color={COLORS.secondary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
