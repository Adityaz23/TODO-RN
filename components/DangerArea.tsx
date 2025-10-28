import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { useTheme } from "@/hooks/useTheme";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

const DangerArea = () => {
  const { colors } = useTheme();
  const settingStyles = createSettingsStyles(colors);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  const handleResetApp = async () => {
    Alert.alert(
      "Reset App",
      "This action will delete all your missions, Are you sure about that?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const reset = await clearAllTodos();
              Alert.alert(
                "App resset",
                `Successfully deleted ${reset.deleteCount} todo${reset.deleteCount === 1 ? "" : "s"}. Your app has been reset.`
              );
            } catch (error) {
              console.log("Error deleting all todos!", error);
              Alert.alert("Error", "Failed to resest app!");
            }
          },
        },
      ]
    );
  };
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyles.section}
    >
      <Text style={settingStyles.sectionTitleDanger}>Restricted Area !!</Text>
      <TouchableOpacity
        style={[settingStyles.actionButton, { borderBottomWidth: 0 }]}
        onPress={handleResetApp}
        activeOpacity={0.7}
      >
        <View style={settingStyles.actionLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingStyles.actionIcon}
          >
            <FontAwesome6 name="trash-can" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingStyles.actionTextDanger}>Reset App !</Text>
        </View>
        <Ionicons name="chevron-forward-circle-outline" size={24} color="red" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerArea;
