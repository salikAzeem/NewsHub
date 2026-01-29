import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";
import SavedScreen from "./src/screens/SavedScreen"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1e90ff", 
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* Home */}
        <Stack.Screen
          name="NewsHub"
          component={HomeScreen}
          options={{ title: "NewsHub" }}
        />

        {/* News Details */}
        <Stack.Screen
          name="Details"
          component={NewsDetailScreen}
          options={{ title: "News Details" }}
        />

        {/* Saved Articles */}
        <Stack.Screen
          name="Saved"
          component={SavedScreen}
          options={{ title: "Saved Articles ⭐" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
