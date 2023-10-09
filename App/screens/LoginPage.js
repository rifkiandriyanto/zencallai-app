import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";
import tw from "../tw";
import ViewContainer from "../components/ViewContainer";
import Input from "../components/elements/Input";
import Typography from "../components/elements/Text";
import LogoComponent from "../components/LogoComponent";
import SafeAreaContainer from "../components/SafeAreaContainer";
import { ButtonText } from "../components/elements/Button";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser, isLoading, setIsLoading } = useContext(AuthContext);

  const login = () => {
    if (!phoneNumber) {
      return setErrors({ phone: "The phone field is required." });
    }
    if (!password) {
      return setErrors({ password: "The password field is required." });
    }
    setIsLoading(true);
    api
      .post("/auth/login/", { phone: phoneNumber, password: password })
      .then((res) => res.data)
      .then((data) => {
        AsyncStorage.setItem("auth_token", data.token);
        setUser(data.user);
      })
      .catch((error) => {
        const err = {};
        const errorRes = error?.response?.data;
        if (error?.response?.status === 400) {
          err["phone"] = errorRes?.errors?.phone?.[0];
        } else if (error?.response?.status === 401) {
          err["password"] = errorRes?.message;
        } else {
          err["strgMessage"] = "Something went wrong...!";
        }
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (args = {}) => {
    setErrors({ ...errors, ...args, strgMessage: "" });
  };

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("pt-16 pb-5 px-5") }} isJustifyBetween>
        <LogoComponent />
        <View style={styles.inputWrap}>
          <Input
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Your existing mobile phone number"
            inputMode="tel"
            error={errors.phone}
            onChange={() => handleInputChange({ phone: null, message: null })}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            error={errors.password || errors.message}
            onChange={() =>
              handleInputChange({ password: null, message: null })
            }
          />
          <ButtonText
            textSize={16}
            text="Forgot password?"
            styleContainer={{ alignSelf: "flex-end" }}
            isOnlyText
            onPress={() => navigation.navigate("ForgotPassword")}
          />
          <View>
            {errors.strgMessage && (
              <Typography style={{ ...tw("text-red") }}>
                {errors.strgMessage}
              </Typography>
            )}
            <ButtonText
              text="LOG IN"
              styleContainer={{ ...tw("mt-2") }}
              onPress={login}
              isTextBold
              isLoading={isLoading}
            />
          </View>
        </View>
        <View style={styles.bottomTextWrap}>
          <Text style={styles.bottomText}>No account? </Text>
          <ButtonText
            onPress={() => navigation.navigate("Signup")}
            styleText={styles.bottomText}
            text="Sign up"
            isOnlyText
          />
        </View>
      </ViewContainer>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    gap: 20,
  },
  bottomTextWrap: {
    ...tw("flex flex-row items-center justify-center"),
  },
  bottomText: {
    ...tw("font-bold text-white text-xl"),
  },
});

export default LoginPage;
