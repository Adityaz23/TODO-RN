import { View, Text } from "react-native";
import React from "react";
import { createSettingsStyles } from "@/assets/styles/setting.styles";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const ProgressStatus = () => {
  const { colors } = useTheme();
  const settingStyles = createSettingsStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyles.section}
    >
      <Text style={settingStyles.sectionTitle}>Progress Report</Text>
      <View style={settingStyles.statsContainer}>
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={settingStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyles.statIcon}
            >
              <FontAwesome name="list-alt" size={24} color="white" />
            </LinearGradient>
          </View>
          <View style={settingStyles.statInfo}>
            <Text style={settingStyles.statNumber}>{totalTodos}</Text>
            <Text style={settingStyles.statLabel}>Total Mission</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={settingStyles.statIcon}
            >
              <Ionicons name="checkmark-done-sharp" size={24} color="white" />
            </LinearGradient>
          </View>
          <View style={settingStyles.statInfo}>
            <Text style={settingStyles.statNumber}>{completedTodos}</Text>
            <Text style={settingStyles.statLabel}>Completed Mission</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingStyles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingStyles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={settingStyles.statIcon}
            >
              <FontAwesome name="hourglass-1" size={24} color="white" />
            </LinearGradient>
          </View>
          <View style={settingStyles.statInfo}>
            <Text style={settingStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingStyles.statLabel}>Active Mission</Text>
          </View>
        </LinearGradient>
        
      </View>
    </LinearGradient>
  );
};

export default ProgressStatus;
