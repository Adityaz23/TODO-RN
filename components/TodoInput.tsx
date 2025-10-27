import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TodoInput = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  // keeping the track of the user input in the Todo fields.
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if(newTodo.trim()){
        try{
            await addTodo({text: newTodo.trim()})
            setNewTodo("")
        }
        catch(error){
            console.log("Error handling the todo", error);
            Alert.alert("Error", "Failed to add Todo")
        }
    }
  };
  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="Your Mission 🎯"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            style={[
              homeStyles.addButton,
              !newTodo.trim() && homeStyles.addButtonDisabled,
            ]}
            colors={
              newTodo.trim() ? colors.gradients.primary : ['#e0e0e0', '#ac2c2cff']}
          >
            <MaterialIcons name="add-task" size={24} color="#9016bcff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TodoInput;
