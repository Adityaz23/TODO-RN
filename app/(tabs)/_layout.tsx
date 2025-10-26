import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Tabs } from "expo-router";

const Tabslayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // this will not show the header which is like home/setting page so it will not show the HOME which is header.
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#708090",
          borderTopWidth: 3,
          borderTopColor: "#db7093",
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="tasklist" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Tabslayout;
