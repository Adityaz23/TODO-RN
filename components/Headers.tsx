import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Headers = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;
  const progressPercent =
    totalCount > 0 ? (completedTodos / totalCount) * 100 : 0;
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <MaterialIcons name="task" size={28} color="white" />
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today's Mission 🚀</Text>
          <Text style={homeStyles.subtitle}>
            {completedTodos} of {totalCount} completed
          </Text>
        </View>
      </View>
     {totalCount >0 && (
        <View style={homeStyles.progressContainer}>
            <View style={homeStyles.progressBarContainer}>
                <View style={homeStyles.progressBar}>
                    <LinearGradient colors={colors.gradients.success} style={[homeStyles.progressFill, {width: `${progressPercent}%`}]}/>
                </View>
                <Text style={homeStyles.progressText}>
                  {Math.round(progressPercent)}%
                </Text>
            </View>
        </View>
     )}
    </View>
  );
};

export default Headers;
