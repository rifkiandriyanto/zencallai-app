import { TextInput, StyleSheet, Text, View } from "react-native";

import tw from "../../tw";
import { colors } from "../../styles/colors";
import { styles as globalStyles } from "../../styles/globalStyles";

const styles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    ...tw("text-red mt-1"),
  },
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        {...props}
        style={[globalStyles.defaultInput, props.style]}
        placeholderTextColor={colors.BLUE[1]}
        onChangeText={(inputValue) => props.onChangeText(inputValue)}
      />
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

export default Input;
