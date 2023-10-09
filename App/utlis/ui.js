import { Linking } from "react-native";

export const handleCallAiPhone = (phoneNumber) => {
  if (!phoneNumber) return;
  if (Platform.OS === "android") {
    Linking.openURL(`tel:${phoneNumber}`);
  } else {
    Linking.openURL(`tel://${phoneNumber}`);
  }
};
