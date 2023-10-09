import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

import { handleCallAiPhone } from "../utlis/ui";
import tw from "../tw";
import { colors } from "../styles/colors";
import { convertDateStringToDateAndTime } from "../utlis";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ViewContainer from "../components/ViewContainer";
import Typography from "../components/elements/Text";

const styles = StyleSheet.create({
  headerWrap: {
    ...tw("flex-row justify-between items-center mb-1"),
  },
  fontBold: {
    ...tw("font-bold"),
  },
  message: {
    maxWidth: wp("70%"),
    backgroundColor: colors.BLUE[2],
    borderRadius: 10,
    overflow: "hidden",
    ...tw("px-2.5 py-1.5 mb-3.5 self-end"),
  },
  messageFromClient: {
    backgroundColor: colors.WHITE[0],
    ...tw("self-start text-black"),
  },
});

const renderMessage = ({ item }) => {
  return (
    <Typography
      rem={1.15}
      key={item.id}
      style={[
        styles.message,
        item.side === "CUSTOMER" && styles.messageFromClient,
      ]}
    >
      {item.content}
    </Typography>
  );
};

const Chat = ({ route, navigation }) => {
  const { createdAt, fromPhone, messageSet } = route.params;

  return (
    <>
      <SafeAreaContainer>
        <ViewContainer style={{ ...tw("pt-2 px-4") }}>
          <View style={styles.headerWrap}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="return-up-back"
                size={26}
                color={colors.WHITE[0]}
              />
            </TouchableOpacity>
            <Typography rem={1.45} style={styles.fontBold}>
              {fromPhone}
            </Typography>
            <TouchableOpacity onPress={() => handleCallAiPhone(fromPhone)}>
              <Ionicons name="call-outline" size={26} color={colors.WHITE[0]} />
            </TouchableOpacity>
          </View>
          <Typography
            rem={1.15}
            style={[styles.fontBold, { ...tw("text-center mb-3") }]}
          >
            {convertDateStringToDateAndTime(createdAt)}
          </Typography>
          <FlatList
            keyExtractor={({ id }) => id}
            data={messageSet}
            showsVerticalScrollIndicator={false}
            renderItem={renderMessage}
          />
        </ViewContainer>
      </SafeAreaContainer>
    </>
  );
};

export default Chat;
