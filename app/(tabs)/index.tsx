import { useTheme } from "@/hooks/useTheme";
import { Link, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.container}>This is the test text.</Text>
      <View>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Click Me!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode}><Text>Toggle</Text></TouchableOpacity>
      </View>
      {/* <Link style={styles.link} href={"/about"}> */}
      {/* <TouchableOpacity style={styles.pressableLink} onPress={()=>router.push("/about")}>
        <Text style={styles.font}>Click here to go to the about page.</Text>
      </TouchableOpacity> */}
      {/* </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    fontSize: 30,
    color: "blue",
  },
  btn: {
    backgroundColor: "pink",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "brown",
    padding: 4,
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
  },
});
