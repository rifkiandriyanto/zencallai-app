import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import tw from "../tw";
import { api } from "../services/api";
import { colors } from "../styles/colors";
import { ButtonText } from "../components/elements/Button";
import LogoComponent from "../components/LogoComponent";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ViewContainer from "../components/ViewContainer";
import Input from "../components/elements/Input";
import Typography from "../components/elements/Text";

const styles = StyleSheet.create({
  bottomTextWrap: {
    ...tw("flex flex-row items-center justify-center"),
  },
  bottomText: {
    ...tw("font-bold text-white text-xl"),
  },
  successText: {
    textAlign: "center",
  },
});

const PhoneNumberComponent = ({
  phoneNumber,
  setPhoneNumber,
  handlePhoneNumberConfirm,
  handleInputChange,
  isLoading,
  error,
}) => {
  return (
    <>
      <View style={{ gap: 12 }}>
        <Input
          value={phoneNumber}
          placeholder="Enter your phone number"
          onChangeText={setPhoneNumber}
          onChange={() => handleInputChange({ phone: null })}
          inputMode="tel"
          error={error.phone || error.strgMessage}
        />
        <ButtonText
          text="CONTINUE"
          styleContainer={{ ...tw("mt-2") }}
          isTextBold
          onPress={handlePhoneNumberConfirm}
          isLoading={isLoading}
        />
      </View>
    </>
  );
};

const ConfirmOTPComponent = ({
  phoneNumber,
  data,
  handleResetPassword,
  error,
  isLoading,
  handleInputChange,
}) => {
  return (
    <View style={{ gap: 12 }}>
      <Input value={phoneNumber} editable={false} style={{ color: "grey" }} />
      <Input
        value={data.otp}
        placeholder="Enter OTP"
        onChangeText={data.setOTP}
        error={error.otp}
        onChange={() => handleInputChange({ otp: null })}
      />
      <Input
        value={data.password}
        placeholder="Enter new password"
        onChangeText={data.setPassword}
        secureTextEntry
        error={error.password}
        onChange={() => handleInputChange({ password: null })}
      />
      <Input
        value={data.rePassword}
        placeholder="Repeat password"
        onChangeText={data.setRePassword}
        secureTextEntry
        onChange={() => handleInputChange({ rePassword: null })}
        error={error.rePassword || error.strgMessage}
      />
      <ButtonText
        text="CONFIRM"
        styleContainer={{ ...tw("mt-2") }}
        isTextBold
        onPress={handleResetPassword}
        isLoading={isLoading}
      />
    </View>
  );
};

const SuccessComponent = () => {
  return (
    <View style={{ alignSelf: "center", gap: 11 }}>
      <AntDesign
        style={styles.successText}
        name="checkcircleo"
        size={60}
        color="green"
      />
      <Typography style={styles.successText} rem={1.5}>
        Password Changed!
      </Typography>
      <Typography style={styles.successText} rem={1.125}>
        Your password has been changed successfully
      </Typography>
    </View>
  );
};

const ForgotPassword = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isTruePhoneNumber, setIsTruePhoneNumber] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (args) => {
    setErrors({ ...errors, ...args, strgMessage: "" });
  };

  const handlePhoneNumberConfirm = () => {
    if (!phoneNumber) {
      return setErrors({ phone: "The phone field is required." });
    }
    if (isLoading) return;
    setIsLoading(true);
    api
      .post("/auth/forgot-password/", { phone: phoneNumber })
      .then((res) => res.data)
      .then(() => {
        setIsTruePhoneNumber(true);
        setErrors({});
      })
      .catch((error) => {
        const err = {};
        const errorRes = error?.response?.data;
        if (error?.response?.status === 400) {
          err["phone"] = errorRes?.errors?.phone?.[0];
        } else {
          err["strgMessage"] = "Something went wrong...!";
        }
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResetPassword = () => {
    if (!otp) {
      return setErrors({ otp: "The OTP field is required." });
    }
    if (!password) {
      return setErrors({ password: "The password field is required." });
    }
    if (rePassword !== password) {
      return setErrors({
        rePassword: "The password confirmation does not match.",
      });
    }
    if (isLoading) return;
    setIsLoading(true);
    api
      .post("/auth/reset-password/", {
        phone: phoneNumber,
        otp: otp,
        password: password,
      })
      .then((res) => res.data)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        const err = {};
        const errorRes = error?.response?.data;
        if (error?.response?.status === 400) {
          err["otp"] = errorRes?.errors?.otp;
          err["password"] = errorRes?.errors?.password?.[0];
        } else {
          err["strgMessage"] = "Something went wrong...!";
        }
        setErrors(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("pt-16 pb-5 px-5") }} isJustifyBetween>
        <LogoComponent />
        {isTruePhoneNumber ? (
          isSuccess ? (
            <SuccessComponent />
          ) : (
            <ConfirmOTPComponent
              data={{
                otp,
                phoneNumber,
                password,
                setOTP,
                setPassword,
                setRePassword,
              }}
              isLoading={isLoading}
              error={errors}
              phoneNumber={phoneNumber}
              handleResetPassword={handleResetPassword}
              handleInputChange={handleInputChange}
            />
          )
        ) : (
          <PhoneNumberComponent
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handlePhoneNumberConfirm={handlePhoneNumberConfirm}
            setIsTruePhoneNumber={setIsTruePhoneNumber}
            isLoading={isLoading}
            error={errors}
            handleInputChange={handleInputChange}
          />
        )}
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
};

export default ForgotPassword;
