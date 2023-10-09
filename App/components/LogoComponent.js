import { StyleSheet } from "react-native";

import tw from "../tw";
import Typography from "./elements/Text";

const styles = StyleSheet.create({
  root: {
    ...tw("font-bold text-center"),
  },
});

const LogoComponent = () => {
  return <Typography rem={3.75} style={styles.root}>zencall.ai</Typography>;
};

export default LogoComponent;
