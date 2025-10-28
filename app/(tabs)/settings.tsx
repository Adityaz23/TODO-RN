import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressStatus from "@/components/ProgressStatus";
import Prefernces from "@/components/Prefernces";
import DangerArea from "@/components/DangerArea";

const SettingScreen = () => {
  
  const {colors} = useTheme();
  const settingStyles = createSettingsStyles(colors)
  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
             <Ionicons name="settings-outline" size={28} color="#fff" />
            </LinearGradient>
            <Text style={settingStyles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView style={settingStyles.scrollView} contentContainerStyle={settingStyles.content} showsVerticalScrollIndicator={false}>
          <ProgressStatus />
          <Prefernces />
          <DangerArea />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SettingScreen;
