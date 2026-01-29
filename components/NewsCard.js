import { View, Text, Image, TouchableOpacity } from "react-native";

export default function NewsCard({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        margin: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        elevation: 3, 
      }}
    >
      {/* Image */}
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/400x200",
        }}
        style={{
          width: "100%",
          height: 180,
        }}
      />

      {/* Content */}
      <View style={{ padding: 12 }}>
        {/* Source */}
        <Text style={{ color: "#666", fontSize: 12 }}>
          {item.source?.name || "GNews"}
        </Text>

        {/* Title */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginVertical: 6,
          }}
        >
          {item.title}
        </Text>

        {/* Description */}
        <Text style={{ color: "#444" }} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
