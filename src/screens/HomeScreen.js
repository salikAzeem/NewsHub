import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { getNews, searchNews } from "../../services/api";
import NewsCard from "../../components/NewsCard";

export default function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [dark, setDark] = useState(false);

  const categories = ["Top", "Business", "Tech", "Sports"];

  useEffect(() => {
    fetchTopNews();
  }, []);

  const fetchTopNews = () => {
    setLoading(true);
    setQuery("");
    getNews()
      .then((res) => {
        setNews(res.data.articles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleSearch = () => {
    if (!query) {
      fetchTopNews();
      return;
    }

    setLoading(true);
    searchNews(query)
      .then((res) => {
        setNews(res.data.articles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getNews()
      .then((res) => {
        setNews(res.data.articles);
        setRefreshing(false);
      })
      .catch(() => setRefreshing(false));
  };

  // Loading
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: dark ? "#121212" : "#fff",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10, color: dark ? "#fff" : "#000" }}>
          Loading news...
        </Text>
      </View>
    );
  }

  // Empty search result
  if (news.length === 0 && query) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: dark ? "#121212" : "#fff",
        }}
      >
        <Text style={{ color: dark ? "#fff" : "#000", fontSize: 18 }}>
          No results found for "{query}"
        </Text>

        <TouchableOpacity
          onPress={fetchTopNews}
          style={{
            marginTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#1e90ff",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Back to Top News
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: dark ? "#121212" : "#fff" }}>
      {/* Header */}
      <View style={{ padding: 15 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: dark ? "#fff" : "#000",
          }}
        >
          Welcome to NewsHub
        </Text>

        <Text style={{ color: dark ? "#aaa" : "gray", marginTop: 5 }}>
          Your daily source of local and global news.
        </Text>

        {/* Dark Mode */}
        <TouchableOpacity
          onPress={() => setDark(!dark)}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: "#1e90ff", fontWeight: "bold" }}>
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>

        {/* Saved */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Saved")}
          style={{ marginTop: 5 }}
        >
          <Text style={{ color: "#1e90ff", fontWeight: "bold" }}>
            View Saved Articles ⭐
          </Text>
        </TouchableOpacity>

        {/* 🔙 Back button after search (NEW) */}
        {query !== "" && (
          <TouchableOpacity
            onPress={fetchTopNews}
            style={{ marginTop: 5 }}
          >
            <Text style={{ color: "red", fontWeight: "bold" }}>
              ← Back to Top News
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search news..."
        placeholderTextColor={dark ? "#aaa" : "#666"}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={{
          marginHorizontal: 15,
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          color: dark ? "#fff" : "#000",
        }}
      />

      {/* Categories */}
      <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
        {categories.map((cat) => (
          <Text
            key={cat}
            style={{
              marginRight: 12,
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: dark ? "#333" : "#eee",
              borderRadius: 20,
              fontSize: 12,
              color: dark ? "#fff" : "#000",
            }}
          >
            {cat}
          </Text>
        ))}
      </View>

      {/* News List */}
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingBottom: 40, marginTop: 10 }}
        renderItem={({ item }) => (
          <NewsCard
            item={item}
            onPress={() => navigation.navigate("Details", { item, dark })}
          />
        )}
      />

      <Text
        style={{
          textAlign: "center",
          color: dark ? "#aaa" : "gray",
          marginVertical: 10,
          fontSize: 12,
        }}
      >
        Powered by NewsHub
      </Text>
    </View>
  );
}
