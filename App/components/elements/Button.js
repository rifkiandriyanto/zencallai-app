import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import tw from "../../tw";
import { colors } from "../../styles/colors";

export const ButtonText = ({
  styleContainer,
  styleText,
  text,
  textSize,
  isTextBold,
  bgColor,
  textColor,
  onPress,
  isOnlyText,
  isLoading,
}) => {
  const styles = StyleSheet.create({
    ButtonTextContainer: {
      backgroundColor: bgColor || colors.BLUE[1],
      borderWidth: 2,
      borderColor: colors.WHITE[0],
      ...tw(`py-${isLoading ? 2 : 1.5} rounded-lg`),
    },
    ButtonTextText: {
      fontSize: textSize ? textSize : 20,
      color: textColor || colors.WHITE[0],
      fontWeight: isTextBold && "bold",
      ...tw("text-center"),
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[!isOnlyText && styles.ButtonTextContainer, styleContainer]}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.ButtonTextText, styleText]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
