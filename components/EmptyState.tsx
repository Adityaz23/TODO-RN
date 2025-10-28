import { createHomeStyles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const EmptyState = () => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.emptyContainer}>
      <LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={60} color={colors.textMuted} />
      </LinearGradient>
      <Text style={homeStyles.emptyText}>No Mission Yet!</Text>
      <Text style={homeStyles.emptySubtext}>Add your first mission above to get started</Text>
    </View>
  );
};
export default EmptyState;