import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Headers from "@/components/Headers";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import LoadingSpinner from "@/components/LoadingSpiner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { toggleTodo } from "@/convex/todos";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const [editingId, setEditingId] = useState<Id<"todos">|null>(null);
  const [editText, setEditText] = useState("");
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;
  const handleTodoToggle = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo!", error);
      Alert.alert("Error", "Failed to toggle the todo!");
    }
  };
  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this mission?",[
      {text:"Cancel", style:"cancel"},
      {text:"Delete", style:"destructive", onPress: ()=> deleteTodo({id})}
    ])
  };

  const handleEditTodo = (todo:Todo) =>{
    setEditText(todo.text)
    setEditingId(todo._id)
  }
  const handleSaveEdit= async () =>{
    if(editingId){

      try {
        await updateTodo({id:editingId, text:editText.trim()})
        setEditingId(null)
        setEditText("")
      } catch (error) {
        console.log("Error updating the todo!",error);
        Alert.alert("Error","Cannot update the todo!");
      }
    }
    
  }
  const handleCancelEdit= () =>{
   setEditingId(null)
   setEditText("") 
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleTodoToggle(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark-done" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput 
              style={homeStyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              multiline
              placeholder="Edit your mission..."
              placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButton}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.7}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark-done" size={16} color="pink" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
               <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.7}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" size={16} color="black" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity> 
              </View>
              
            </View>
          ): (
            <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
          </View>
          )}
          <View style={homeStyles.todoActions}>
            <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.7}>
              <LinearGradient
                colors={colors.gradients.warning}
                style={homeStyles.actionButton}
              >
                <FontAwesome5 name="pen-nib" size={18} color="orange" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.7}>
              <LinearGradient
                colors={colors.gradients.danger}
                style={homeStyles.actionButton}
              >
                <FontAwesome6 name="trash-can" size={18} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  };
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
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Headers />
        <TodoInput />
        {/* {todos?.map((todo) => (
          <Text key={todo._id}>{todo.text}</Text>
        ))} */}
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
