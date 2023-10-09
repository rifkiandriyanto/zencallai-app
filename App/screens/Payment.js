import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import tw from "tailwind-rn";
import { colors } from "../styles/colors";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ViewContainer from "../components/ViewContainer";
import LogoComponent from "../components/LogoComponent";
import Typography from "../components/elements/Text";
import Input from "../components/elements/Input";
import { ButtonText } from "../components/elements/Button";

const visaLogo = "../../assets/images/visaLogo.png";
const masterCardLogo = "../../assets/images/masterCardLogo.png";
const americanExpressLogo = "../../assets/images/americanExpressLogo.png";

const styles = StyleSheet.create({
  topText: {
    alignSelf: "center",
    textAlign: "center",
    maxWidth: 190,
    ...tw("font-bold mt-7"),
  },
  inputWrapContainer: {
    gap: 20,
  },
  rowInputWrap: {
    flexDirection: "row",
    gap: 15,
  },
  logoImage: {
    width: 64,
    height: 40,
  },
});

const Payment = ({ navigation }) => {
  const [creditNumber, setCreditNumber] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [cvv, setCVV] = useState("");

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("pt-7 px-5") }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="return-up-back" size={26} color={colors.WHITE[0]} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ gap: 40, ...tw("pb-5") }}>
            <LogoComponent />
            <Typography style={styles.topText} rem={1.2}>
              14 days free trial, then 29€ / month
            </Typography>
            <View style={{ ...tw("flex-row self-center"), gap: 7 }}>
              <Image style={styles.logoImage} source={require(visaLogo)} />
              <Image
                style={styles.logoImage}
                source={require(masterCardLogo)}
              />
              <Image
                style={styles.logoImage}
                source={require(americanExpressLogo)}
              />
            </View>
            <View style={styles.inputWrapContainer}>
              <Input
                value={creditNumber}
                placeholder="Credit card number"
                onChangeText={setCreditNumber}
              />
              <Input
                value={nameCard}
                placeholder="Name on card"
                onChangeText={setNameCard}
              />
              <View style={styles.rowInputWrap}>
                <Input
                  style={{ maxWidth: 93 }}
                  value={expiredDate}
                  placeholder="MM / YY"
                  onChangeText={setExpiredDate}
                />
                <Input
                  style={{ maxWidth: 60 }}
                  value={cvv}
                  placeholder="CVV"
                  onChangeText={setCVV}
                />
              </View>
            </View>
            <ButtonText
              text="SAVE"
              styleContainer={{ ...tw("p-1") }}
              isTextBold
            />
          </View>
        </ScrollView>
      </ViewContainer>
    </SafeAreaContainer>
  );
};

export default Payment;
