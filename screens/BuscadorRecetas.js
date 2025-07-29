// VideoSearch.js
import axios from "axios";
import { Video } from "expo-av";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = "BKP3kb42ELmLaGrh00RPhAVPTc113RyEavEToZ1xUXFVDCYsX0t143JG"; // ← reemplaza con tu clave

export default function VideoSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.pexels.com/videos/search", {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query: query,
          per_page: 5,
        },
      });

      setVideos(response.data.videos);
    } catch (error) {
      console.error("Error al buscar videos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar videos</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Ej: cuchillos, sartenes..."
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchVideos}
        />
        <TouchableOpacity style={styles.button} onPress={searchVideos}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C8102E" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Video
              source={{ uri: item.video_files[0].link }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              useNativeControls
              style={styles.video}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#C8102E",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#C8102E",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  video: {
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
});
