import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Logout from "../screens/Logout";

const Tab = createBottomTabNavigator();

export const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: Platform.OS === "android",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.BLUE[1],
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const routerName = route.name;

          switch (routerName) {
            case "Logout":
              return (
                <MaterialIcons
                  name="logout"
                  size={24}
                  color={colors.WHITE[0]}
                />
              );
            case "Home":
              return (
                <Ionicons
                  name={focused ? "chatbubbles" : "chatbubbles-outline"}
                  color={colors.WHITE[0]}
                  size={24}
                />
              );
            case "Setting":
              return (
                <Ionicons
                  name={focused ? "ios-settings" : "ios-settings-outline"}
                  color={colors.WHITE[0]}
                  size={24}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Logout" component={Logout} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};
