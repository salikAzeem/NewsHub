import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Linking,
  Share,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewsDetailScreen({ route }) {
  const { item } = route.params;

  const openArticle = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

  const shareArticle = async () => {
    try {
      await Share.share({
        message: `${item.title}\n\nRead more: ${item.url}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ⭐ Save article
  const saveArticle = async () => {
    try {
      const existing = await AsyncStorage.getItem("savedNews");
      const saved = existing ? JSON.parse(existing) : [];

      const alreadySaved = saved.find((n) => n.url === item.url);

      if (!alreadySaved) {
        saved.push(item);
        await AsyncStorage.setItem("savedNews", JSON.stringify(saved));
        alert("Article saved ⭐");
      } else {
        alert("Already saved!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 15 }}
    >
      {/* Image */}
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/400x200",
        }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 12,
        }}
      />

      {/* Source */}
      <Text
        style={{
          color: "gray",
          marginTop: 10,
          fontSize: 12,
        }}
      >
        {item.source?.name || "GNews"}
      </Text>

      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 8,
        }}
      >
        {item.title}
      </Text>

      {/* Description */}
      <Text
        style={{
          fontSize: 16,
          color: "#444",
          marginTop: 10,
          lineHeight: 24,
        }}
      >
        {item.description}
      </Text>

      {/* Content */}
      <Text
        style={{
          fontSize: 16,
          marginTop: 15,
          lineHeight: 24,
        }}
      >
        {item.content || item.description}
      </Text>

      {/* Buttons */}
      <View style={{ marginTop: 20 }}>
        <Button title="Read Full Article" onPress={openArticle} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Share This News" onPress={shareArticle} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Save Article ⭐" onPress={saveArticle} />
      </View>

      {/* Footer */}
      <Text
        style={{
          marginTop: 20,
          textAlign: "center",
          color: "gray",
          fontSize: 12,
        }}
      >
        Saved articles are stored on your device
      </Text>
    </ScrollView>
  );
}
