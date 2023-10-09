import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";
import tw from "../tw";
import ViewContainer from "../components/ViewContainer";
import Input from "../components/elements/Input";
import Typography from "../components/elements/Text";
import LogoComponent from "../components/LogoComponent";
import SafeAreaContainer from "../components/SafeAreaContainer";
import { ButtonText } from "../components/elements/Button";

function SignUp({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(AuthContext);

  const register = () => {
    if (!phoneNumber) {
      return setErrors({ phone: "The phone field is required." });
    }
    if (!password) {
      return setErrors({ password: "The password field is required." });
    }
    if (rePassword !== password) {
      return setErrors({
        rePassword: "The password confirmation does not match.",
      });
    }
    setIsLoading(true);
    api
      .post("/auth/register/", { phone: phoneNumber, password: password })
      .then((res) => res.data)
      .then((data) => {
        setSuccessMessage("Registered successfully");
        setPhoneNumber("");
        setPassword("");
        setRePassword("");
      })
      .catch((error) => {
        const err = {};
        const errorRes = error?.response?.data;
        if (error?.response?.status === 400) {
          err["phone"] = errorRes?.errors?.phone?.[0];
          err["password"] = errorRes?.errors?.password?.[0];
        } else {
          err["strgMessage"] = "Something went wrong...!";
        }
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (args) => {
    setErrors({ ...errors, ...args, strgMessage: "" });
    setSuccessMessage("");
  };

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("pt-16 pb-5 px-5") }} isJustifyBetween>
        <LogoComponent />
        <View>
          <View style={styles.inputWrap}>
            <Input
              inputMode="tel"
              value={phoneNumber}
              onChange={() => handleInputChange({ phone: null })}
              onChangeText={setPhoneNumber}
              placeholder="Your existing mobile phone number"
              error={errors.phone}
            />
            <Input
              value={password}
              onChangeText={setPassword}
              onChange={() => handleInputChange({ password: null })}
              placeholder="Password"
              secureTextEntry
              error={errors.password}
            />
            <Input
              value={rePassword}
              onChangeText={setRePassword}
              placeholder="Repeat password"
              secureTextEntry
              onChange={() => handleInputChange({ rePassword: null })}
              error={errors.rePassword}
            />
          </View>
          <View style={{ ...tw("mt-4") }}>
            {successMessage || errors.strgMessage ? (
              <Typography
                style={{
                  ...tw(
                    `text-center mb-4 ${
                      successMessage ? "text-green" : "text-red"
                    }`
                  ),
                }}
              >
                {successMessage || errors.strgMessage}
              </Typography>
            ) : null}
            <ButtonText
              onPress={register}
              text="SIGN UP"
              isLoading={isLoading}
              isTextBold
            />
          </View>
        </View>
        <View style={styles.bottomTextWrap}>
          <Text style={styles.bottomText}>Have an account? </Text>
          <ButtonText
            onPress={() => navigation.navigate("Login")}
            styleText={styles.bottomText}
            text="Log in"
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
    ...tw("flex-row items-center justify-center"),
  },
  bottomText: {
    ...tw("font-bold text-white text-xl"),
  },
});

export default SignUp;
