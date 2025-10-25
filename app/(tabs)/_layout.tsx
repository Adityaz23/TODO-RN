import {Ionicons }from "@expo/vector-icons";
import React from "react";
import { Tabs } from "expo-router";

const Tabslayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="Index"
        options={{
          title: "Todos",
          tabBarIcon: ({color,size}) => (
           <Ionicons name="flash" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Tabslayout;
