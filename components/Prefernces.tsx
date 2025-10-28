import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/setting.styles';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Prefernces = () => {
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotification, setISNotification] = useState(true);
    const {isDarkMode, toggleDarkMode, colors} = useTheme();

    const settingStyles = createSettingsStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
        <Text style={settingStyles.sectionTitle}>Preferences</Text>
        <View style={settingStyles.settingItem}>
            <View style={settingStyles.settingLeft}>
                <LinearGradient colors={colors.gradients.primary} style={settingStyles.settingIcon}>
                <FontAwesome5 name="moon" size={20} color="white" />
                </LinearGradient>
                <Text style={settingStyles.settingText}>Dark Mode</Text>
            </View>
            <Switch value={Boolean(isDarkMode)} onValueChange={toggleDarkMode} thumbColor={"pink"} trackColor={{false:colors.border, true:colors.primary}}
            />
        </View>
    </LinearGradient>
  )
}

export default Prefernces