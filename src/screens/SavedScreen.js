import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewsCard from "../../components/NewsCard";

export default function SavedScreen({ navigation }) {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    loadSaved();
  }, []);

  const loadSaved = async () => {
    const data = await AsyncStorage.getItem("savedNews");
    if (data) {
      setSavedNews(JSON.parse(data));
    }
  };

  if (savedNews.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No saved articles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={savedNews}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <NewsCard
          item={item}
          onPress={() => navigation.navigate("Details", { item })}
        />
      )}
    />
  );
}
