import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import StyleSheet from "react-native-media-query";
import { Ionicons } from "@expo/vector-icons";

import tw from "../tw";
import { api } from "../services/api";
import { colors } from "../styles/colors";
import {
  compareTimeNowAndCreatedAt,
  makeDotDotDotWhenMessageIsTooLong,
} from "../utlis";
import ViewContainer from "../components/ViewContainer";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ArrowIcon from "../components/svg/ArrowIcon";
import Typography from "../components/elements/Text";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  async function handleOnEndReached() {
    if (isLoading || isRefresh) {
      return;
    }

    setIsLoading(true);
    api
      .get(`/api/get-conversations/?page=${page}`)
      .then((res) => res.data)
      .then((apiData) => {
        setData([...data, ...apiData.results]);
        setPage((previous) => previous + 1);
      })
      .catch((error) => {
        return;
      })
      .finally(() => setIsLoading(false));
  }

  async function handleOnRefresh() {
    if (isLoading || isRefresh) {
      return;
    }
    setIsRefresh(true);
    api
      .get("/api/get-conversations/?page=1")
      .then((res) => res.data)
      .then((apiData) => {
        setData([...apiData.results]);
        setPage(2);
      })
      .catch((error) => {
        return;
      })
      .finally(() => setIsRefresh(false));
  }

  useEffect(() => {
    handleOnEndReached();
  }, []);

  const renderConversationsCard = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.conversationsCardContainer}
        onPress={() =>
          navigation.navigate("Chat", {
            createdAt: item.created_at,
            fromPhone: item.from_phone,
            messageSet: item.message_set,
          })
        }
      >
        <View style={styles.conversationsCardHeaderWrap}>
          <Typography style={styles.textBold}>{item.from_phone}</Typography>
          <View style={styles.timeAndArrowWrap}>
            <Typography style={[styles.textBold, { ...tw("self-center") }]}>
              {compareTimeNowAndCreatedAt(item.created_at)}
            </Typography>
            <ArrowIcon />
          </View>
        </View>
        <Typography style={{ ...tw("pt-2.5") }}>
          {makeDotDotDotWhenMessageIsTooLong(
            item.message_set.slice(-1)[0].content
          )}
        </Typography>
      </TouchableOpacity>
    );
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.emptyConversationContainer}>
        <Ionicons
          name="ios-chatbox-outline"
          size={60}
          color={colors.WHITE[0]}
        />
        <Typography style={{ ...tw("mt-2") }}>Empty conversation</Typography>
      </View>
    );
  };

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("pt-4 px-7") }}>
        <View style={styles.conversationsTextAndIndicatorContainer}>
          <Typography rem={1.75} style={styles.conversationsText}>
            Conversations
          </Typography>
          {isLoading && <ActivityIndicator />}
        </View>
        <FlatList
          keyExtractor={({ id }) => id}
          data={data}
          renderItem={renderConversationsCard}
          onEndReachedThreshold={0.0001}
          onEndReached={handleOnEndReached}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={handleOnRefresh}
              refreshing={isRefresh}
              tintColor={colors.WHITE[0]}
            />
          }
          ListEmptyComponent={renderListEmptyComponent}
        />
      </ViewContainer>
    </SafeAreaContainer>
  );
};

const { ids, styles } = StyleSheet.create({
  conversationsTextAndIndicatorContainer: {
    gap: 7,
    ...tw("flex-row items-center mb-5"),
  },
  conversationsText: {
    ...tw("font-bold"),
  },
  conversationsCardContainer: {
    borderBottomWidth: 0.3,
    borderBottomColor: colors.WHITE[0],
    ...tw("pb-5 mb-3"),
  },
  conversationsCardHeaderWrap: {
    ...tw("flex-row justify-between items-center"),
  },
  timeAndArrowWrap: {
    columnGap: 1,
    ...tw("flex-row"),
  },
  textBold: {
    ...tw("font-bold"),
  },
  emptyConversationContainer: {
    height: hp("80%"),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
