import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import tw from "../../tw";
import { colors } from "../../styles/colors";

const styles = StyleSheet.create({
  bottomBarActionContainer: {
    backgroundColor: colors.BLUE[1],
    paddingTop: 10,
    ...tw("flex-row justify-center px-10"),
  },
});

const BottomBarActionIcon = ({ iconName, onPress, color, w }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={iconName}
        size={w ? w : 30}
        color={color ? color : colors.WHITE[0]}
      />
    </TouchableOpacity>
  );
};

const BottomTab = ({ navigation }) => {
  return (
    <View style={styles.bottomBarActionContainer}>
      <BottomBarActionIcon
        iconName="chatbubbles-outline"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default BottomTab;
