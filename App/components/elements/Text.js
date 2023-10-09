import { Text as DefaultText, StyleSheet } from "react-native";

import { colors } from "../../styles/colors";

const FONT_SIZE_BASE = 16;

const Typography = ({ style, rem, ...props }) => {
  const styles = StyleSheet.create({
    root: {
      fontSize: rem ? rem * FONT_SIZE_BASE : FONT_SIZE_BASE,
      color: colors.WHITE[0],
    },
  });

  return <DefaultText style={[styles.root, style]} {...props} />;
};

export default Typography;
