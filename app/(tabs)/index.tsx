import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";
import {StatusBar, Text,TouchableOpacity,} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Headers from "@/components/Headers";

export default function Index() {
  const { toggleDarkMode,colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text style={styles.container}>This is the test text.</Text>
    //   <View>
    //     <TouchableOpacity style={styles.container} onPress={() => {}}>
    //       <Text style={styles.content}>Click Me!</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={toggleDarkMode}>
    //       <Text>Toggle</Text>
    //     </TouchableOpacity>
    //   </View>
    //   {/* <Link style={styles.link} href={"/about"}> */}
    //   {/* <TouchableOpacity style={styles.pressableLink} onPress={()=>router.push("/about")}>
    //     <Text style={styles.font}>Click here to go to the about page.</Text>
    //   </TouchableOpacity> */}
    //   {/* </Link> */}
    // </View>
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
    <SafeAreaView style={homeStyles.safeArea}>
    <Headers />
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </LinearGradient>
  );
}
