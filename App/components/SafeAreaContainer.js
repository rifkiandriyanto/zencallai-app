import { SafeAreaView } from "react-native";

import { styles } from "../styles/globalStyles";

const SafeAreaContainer = (props) => {
  return (
    <SafeAreaView style={styles.androidSafeArea} {...props}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeAreaContainer;
