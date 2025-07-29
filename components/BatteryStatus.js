import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Battery from "expo-battery";
import { Ionicons } from "@expo/vector-icons";

export default function BatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const fetchBatteryInfo = async () => {
      const level = await Battery.getBatteryLevelAsync();
      const charging = await Battery.isChargingAsync();
      setBatteryLevel(Math.round(level * 100));
      setIsCharging(charging);
    };

    fetchBatteryInfo();

    const levelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(Math.round(batteryLevel * 100));
    });

    const chargingSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
      // batteryState es un número, comparamos con constantes
      setIsCharging(
        batteryState === Battery.BatteryState.CHARGING ||
        batteryState === Battery.BatteryState.FULL
      );
    });

    return () => {
      levelSubscription.remove();
      chargingSubscription.remove();
    };
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
