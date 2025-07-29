import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Battery from "expo-battery";
import { Ionicons } from "@expo/vector-icons";

export default function BatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
  const fetchBatteryInfo = async () => {
    try {
      const level = await Battery.getBatteryLevelAsync();
      const batteryState = await Battery.getBatteryStateAsync();
      const charging = batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL;

      setBatteryLevel(Math.round(level * 100));
      setIsCharging(charging);
    } catch (error) {
      console.error("Error obteniendo info de batería:", error);
    }
  };

  // Llamada inicial
  fetchBatteryInfo();

  // ⏱ Intervalo cada segundo
  const intervalId = setInterval(fetchBatteryInfo, 1000);

}, []);

  const batteryColor = batteryLevel > 50 ? "#4CAF50" : "#C8102E"; // verde o rojo

  return (
    <View style={styles.batteryContainer}>
      <Ionicons
        name={isCharging ? "battery-charging" : "battery-full"}
        size={20}
        color={batteryColor}
      />
      <Text style={[styles.batteryText, { color: batteryColor }]}>
        {batteryLevel !== null ? `${batteryLevel}%` : "--"}
      </Text>
      {isCharging && (
        <Ionicons
          name="flash"
          size={16}
          color={batteryColor}
          style={{ marginLeft: 4 }}
          accessibilityLabel="Cargando"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  batteryContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  batteryText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
});
