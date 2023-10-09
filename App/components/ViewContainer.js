import { View, KeyboardAvoidingView, Platform } from "react-native";
import StyleSheet from "react-native-media-query";

import tw from "../tw";

const { ids, styles } = StyleSheet.create({
  root: {
    width: 600,
    marginInline: "auto",
    "@media (max-width: 610px)": {
      width: "100%",
    },
  },
  withJustifyBetween: {
    ...tw("h-full flex-col justify-between"),
  },
  noJustifyBetween: {
    ...tw("h-full"),
  },
});

const ViewContainer = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        {...props}
        style={[
          styles.root,
          props.isJustifyBetween
            ? styles.withJustifyBetween
            : styles.noJustifyBetween,
          props.style,
        ]}
        dataSet={{ media: ids.root }}
      >
        {props.children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ViewContainer;
