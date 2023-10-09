import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import tw from "../tw";
import { AuthContext } from "../contexts/AuthContext";
import { ButtonText } from "../components/elements/Button";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ViewContainer from "../components/ViewContainer";
import Typography from "../components/elements/Text";

const styles = StyleSheet.create({
  container: {
    gap: 13,
  },
});

const Logout = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);

  const logout = () => {
    AsyncStorage.clear();
    setUser(null);
  };

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("items-center justify-center px-2") }}>
        <View style={styles.container}>
          <Typography rem={1.5} style={{ ...tw("font-bold") }}>
            You want to log out?
          </Typography>
          <ButtonText
            onPress={logout}
            text="Sure"
            styleContainer={{ ...tw("py-0.5") }}
          />
          <ButtonText
            onPress={() => navigation.navigate("Home")}
            text="Return"
            styleContainer={{ ...tw("py-0.5") }}
          />
        </View>
      </ViewContainer>
    </SafeAreaContainer>
  );
};

export default Logout;
