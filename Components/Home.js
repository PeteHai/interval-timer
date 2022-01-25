import { StyleSheet, Text, View } from "react-native";
import Timer from "./Timer";

export default function Home({ navigation }) {
  return (
    <View styles={styles.container}>
      <Text>Interval timer...</Text>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
