import { Platform } from "react-native";
import StyleSheet from "react-native-media-query";

import tw from "../tw";
import { colors } from "./colors";

export const { ids, styles } = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: colors.BLUE[0],
    paddingTop: Platform.OS === "android" ? 25 : 0,
    "@media (min-width: 750px)": {
      alignItems: "center",
    },
  },
  defaultInput: {
    color: colors.BLUE[1],
    fontSize: 18,
    ...tw("rounded-md font-bold bg-white px-2.5 py-1.5"),
  },
});
