import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Checkbox from "expo-checkbox";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import StyleSheet from "react-native-media-query";

import { AuthContext } from "../contexts/AuthContext";
import tw from "../tw";
import { styles as globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { api } from "../services/api";
import { handleCallAiPhone } from "../utlis/ui";
import { ButtonText } from "../components/elements/Button";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ViewContainer from "../components/ViewContainer";
import Typography from "../components/elements/Text";
import Input from "../components/elements/Input";
import { Space } from "../components/elements/Space";
import { Select } from "../components/elements/Select";

const placeholderInputPromps =
  "Your prompt to ChatGPT in the language you want. Explain how you want ChatGPT to present itself to \
  customers when it answers the phone...";

const LANGUAGE_OPTIONS = [
  { label: "English", value: "en-US" },
  { label: "French", value: "fr-FR" },
];

const { ids, styles } = StyleSheet.create({
  headerWrap: {
    ...tw("flex-row items-center justify-between mb-2.5"),
  },
  nameAndLinkContainer: {
    "@media (min-width: 750px)": {
      justifyContent: "space-between",
      gap: 10,
    },
  },
  nameAndLinkLinkInput: {
    width: wp("50%"),
    maxWidth: "100%",
    "@media (min-width: 750px)": {
      width: 250,
    },
  },
  bodyContainer: {
    justifyContent: "space-between",
    rowGap: 10,
    ...tw("flex-col"),
  },
  checkBoxAndTextContainer: {
    gap: 2,
    ...tw("flex-row items-center"),
  },
  inputFieldPrompt: {
    height: hp("33%"),
  },
  addLinkButton: {
    gap: 10,
    backgroundColor: colors.WHITE[0],
    ...tw("flex-row justify-center rounded-lg py-2 items-center"),
  },
  textChangePassword: {
    ...tw("font-bold"),
    "@media (min-width: 750px)": {
      fontSize: 20,
    },
  },
  textButtonSave: {
    "@media (min-width: 750px)": {
      fontSize: 24,
    },
  },
});

const CheckBoxAndTextComponent = ({ value, onValueChange, text, textSize }) => {
  return (
    <View style={styles.checkBoxAndTextContainer}>
      <Checkbox value={value} onValueChange={onValueChange} />
      <Typography rem={textSize ? textSize : 0.875}>{text}</Typography>
    </View>
  );
};

const NameAndLinkComponent = ({
  index,
  data,
  handleChangeLinkComponentInput,
  handleDeleteLinkRow,
  valueKey,
  valuePlacehoder,
}) => {
  const [name, setName] = useState(data.name || "");
  const [value, setValue] = useState(data[valueKey] || "");

  return (
    <View
      style={[
        {
          ...tw("flex-row justify-between items-center"),
        },
        styles.nameAndLinkContainer,
      ]}
    >
      <Input
        value={name}
        onChangeText={setName}
        onChange={(e) =>
          handleChangeLinkComponentInput(index, "name", e.nativeEvent.text)
        }
        placeholder="Name"
        style={{ width: wp("25%") }}
      />
      <Input
        value={value}
        onChangeText={setValue}
        onChange={(e) =>
          handleChangeLinkComponentInput(index, valueKey, e.nativeEvent.text)
        }
        style={styles.nameAndLinkLinkInput}
        placeholder={valuePlacehoder}
        inputMode="url"
      />
      <TouchableOpacity
        onPress={() => handleDeleteLinkRow(index, data.id, name)}
      >
        <AntDesign name="minuscircleo" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const AddLinksComponent = ({ text, handleAddLinkRow }) => {
  return (
    <TouchableOpacity onPress={handleAddLinkRow}>
      <View style={styles.addLinkButton}>
        <Typography style={{ ...tw("text-green font-bold") }}>
          {text}
        </Typography>
        <AntDesign name="pluscircleo" size={24} color="green" />
      </View>
    </TouchableOpacity>
  );
};

const AdditionRecords = ({
  isLoading,
  records,
  setRecords,
  errors,
  setErrors,
  valueKey,
  valuePlacehoder,
  handeInputChangeShared,
  path,
}) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleChangeLinkComponentInput = (index, key, value) => {
    handeInputChangeShared({ [valueKey]: "" });
    setRecords(() => {
      const newLinkData = [...records];
      newLinkData[index][key] = value;
      return newLinkData;
    });
  };

  const handleAddLinkRow = () => {
    setRecords([...records, { id: null, name: "", [valueKey]: "" }]);
  };

  const deleteElementWithIndex = (index) => {
    let newLinkData = [...records];
    newLinkData.splice(index, 1);
    setRecords(newLinkData);
  };

  const handleDeleteLinkRow = (index, id, name) => {
    Alert.alert(
      `Delete Link?`,
      `Are you sure you want to delete "${name || "null"}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sure",
          onPress: async () => {
            setErrors({ ...errors, [valueKey]: null });
            if (id) {
              if (isLoadingDelete) return;
              setIsLoadingDelete(true);
              api
                .delete(`${path}${id}/`)
                .then((res) => {
                  deleteElementWithIndex(index);
                })
                .catch((error) => {
                  const err = {};
                  err["message"] = "Something went wrong...!";
                  setErrors(err);
                })
                .finally(() => {
                  setIsLoadingDelete(false);
                });
            } else {
              deleteElementWithIndex(index);
            }
          },
        },
      ]
    );
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        records.map((data, index) => (
          <NameAndLinkComponent
            key={index}
            index={index}
            data={data}
            handleChangeLinkComponentInput={handleChangeLinkComponentInput}
            handleDeleteLinkRow={handleDeleteLinkRow}
            valueKey={valueKey}
            valuePlacehoder={valuePlacehoder}
          />
        ))
      )}
      {errors[valueKey] && (
        <Typography style={{ ...tw("text-red") }}>
          {errors[valueKey]}
        </Typography>
      )}
      <AddLinksComponent
        text="Add new forward"
        handleAddLinkRow={handleAddLinkRow}
      />
    </>
  );
};

const Setting = ({ navigation }) => {
  const userLinksPath = "/auth/user-link/";
  const userforwardsPath = "/auth/user-forward/";

  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);
  const [email, setEmail] = useState(user.email || "");
  const [prompt, setPrompt] = useState(user.prompt || "");
  const [intro, setIntro] = useState(user.intro_sentence || "");
  const [language, setLanguage] = useState(user.language || "");
  const [linkData, setLinkData] = useState([]);
  const [forwardData, setForwardData] = useState([]);
  const [isTextMessage, setIsTextMessage] = useState(user.push_to_sms);
  const [isEmail, setIsEmail] = useState(user.push_to_email);
  const [successText, setSuccessText] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [isLoadingForwards, setIsLoadingForwards] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  useEffect(() => {
    setIsLoadingLinks(true);
    api
      .get(userLinksPath)
      .then((res) => res.data)
      .then((data) => {
        setLinkData(data);
      })
      .catch((error) => {})
      .finally(() => setIsLoadingLinks(false));

    setIsLoadingForwards(true);
    api
      .get(userforwardsPath)
      .then((res) => res.data)
      .then((data) => {
        setForwardData(data);
      })
      .catch((error) => {})
      .finally(() => setIsLoadingForwards(false));
  }, []);

  const updateUser = async () => {
    setSuccessText("");
    setErrors({});
    setIsLoading(true);

    const postOrPatchRecord = async (path, data, valueKey) => {
      let res;
      if (data.id) {
        res = await api.patch(`${path}${data.id}/`, {
          name: data.name,
          [valueKey]: data[valueKey],
        });
      } else {
        res = await api.post(path, {
          name: data.name,
          [valueKey]: data[valueKey],
        });
      }
      return res.data;
    };

    // Save links
    for (let data of linkData) {
      try {
        const userLink = await postOrPatchRecord(userLinksPath, data, "link");
        data.id = userLink.id;
      } catch (error) {
        const err = {};
        const errorRes = error?.response?.data;
        err["link"] =
          errorRes?.name?.[0] || errorRes?.link?.[0]
            ? "Names or Links may not be blank!"
            : "";
        setErrors(err);
        setIsLoading(false);
        return;
      }
    }

    // Save forwards
    for (let data of forwardData) {
      try {
        const userForward = await postOrPatchRecord(
          userforwardsPath,
          data,
          "forward_phone"
        );
        data.id = userForward.id;
      } catch (error) {
        const err = {};
        const errorRes = error?.response?.data;
        err["forward_phone"] =
          errorRes?.name?.[0] || errorRes?.forward_phone?.[0]
            ? "Names or forward phone number may not be blank!"
            : "";
        setErrors(err);
        setIsLoading(false);
        return;
      }
    }

    api
      .patch(`/auth/me/`, {
        email,
        intro_sentence: intro,
        prompt,
        push_to_email: isEmail,
        push_to_sms: isTextMessage,
        language,
      })
      .then(() => {
        setSuccessText("Successful change!");
      })
      .catch((error) => {
        const err = {};
        const errorRes = error?.response?.data;
        if (error?.response?.status == 400) {
          err["email"] = errorRes?.email;
        } else {
          err["message"] = "Something went wrong...!";
        }
        setErrors(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handeInputChangeShared = (args) => {
    setErrors({ email: "", ...args, message: "" });
    setSuccessText("");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      `Delete Account?`,
      `Are you sure you want to delete current account?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sure",
          onPress: async () => {
            setErrors({ ...errors, deleteAccount: null });
            if (isLoadingDeleteAccount || isLoadingDelete) return;
            setIsLoadingDeleteAccount(true);
            api
              .delete("/auth/me/")
              .then((res) => {
                AsyncStorage.clear();
                setUser(null);
              })
              .catch((error) => {
                const err = {};
                err["message"] = "Something went wrong...!";
                setErrors(err);
              })
              .finally(() => {
                setIsLoadingDeleteAccount(true);
              });
          },
        },
      ]
    );
  };

  const ConversationPushItems = () => (
    <>
      <CheckBoxAndTextComponent
        value={isTextMessage}
        onValueChange={setIsTextMessage}
        text="Text message"
      />
      <CheckBoxAndTextComponent
        value={isEmail}
        onValueChange={setIsEmail}
        text="Email"
      />
    </>
  );

  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("pt-4 px-5") }}>
        <View style={styles.headerWrap}>
          <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
            {/* <FontAwesome name="credit-card" size={26} color={colors.WHITE[0]} /> */}
          </TouchableOpacity>
          <Typography rem={1.45} style={{ ...tw("font-bold") }}>
            {user?.ai_phone}
          </Typography>
          <TouchableOpacity onPress={() => handleCallAiPhone(user.ai_phone)}>
            <Ionicons name="call-outline" size={26} color={colors.WHITE[0]} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bodyContainer}>
            <TextInput
              multiline
              value={prompt}
              textAlignVertical="top"
              placeholder={placeholderInputPromps}
              placeholderTextColor={colors.BLUE[1]}
              style={[globalStyles.defaultInput, styles.inputFieldPrompt]}
              onChangeText={(inputValue) => setPrompt(inputValue)}
              onChange={() => setSuccessText("")}
            />

            <Input
              placeholder="Intro sentence"
              value={intro}
              onChangeText={setIntro}
              onChange={handeInputChangeShared}
              error={errors.intro}
            />

            <Space />
            <AdditionRecords
              isLoading={isLoadingLinks}
              records={linkData}
              setRecords={setLinkData}
              errors={errors}
              setErrors={setErrors}
              valueKey="link"
              valuePlacehoder="https://..."
              handeInputChangeShared={handeInputChangeShared}
              path={userLinksPath}
            />

            <Space />
            <AdditionRecords
              isLoading={isLoadingForwards}
              records={forwardData}
              setRecords={setForwardData}
              errors={errors}
              setErrors={setErrors}
              valueKey="forward_phone"
              valuePlacehoder="Phone"
              handeInputChangeShared={handeInputChangeShared}
              path={userforwardsPath}
            />

            <Space />
            <Input
              value={user.phone}
              editable={false}
              style={{ color: "grey" }}
            />
            <Input
              value={email}
              onChangeText={setEmail}
              onChange={handeInputChangeShared}
              error={errors.email}
              inputMode="email"
            />
            <Select value={language} options={LANGUAGE_OPTIONS} onChange={setLanguage} />
            <View style={{ ...tw("flex-row justify-between") }}>
              <Typography
                style={[
                  { ...tw("font-bold"), fontSize: wp("4%") },
                  styles.textChangePassword,
                ]}
              >
                New conversation push:
              </Typography>
              {wp("100%") > 400 ? (
                <ConversationPushItems />
              ) : (
                <View style={{ rowGap: 8 }}>
                  <ConversationPushItems />
                </View>
              )}
            </View>
            {errors.message || successText ? (
              <Typography
                style={{
                  ...tw(`${errors.message ? "text-red" : "text-green"}`),
                }}
              >
                {successText || errors.message}
              </Typography>
            ) : null}

            <View
              style={{
                ...tw("flex-row items-center justify-between mt-1 mb-5"),
              }}
            >
              <ButtonText
                styleText={[styles.textChangePassword, { ...tw("text-red") }]}
                textSize={wp("5%")}
                text="Delete account"
                isOnlyText
                onPress={handleDeleteAccount}
              />
              <ButtonText
                styleContainer={{ ...tw("px-16 py-1") }}
                text="SAVE"
                textSize={wp("4%")}
                styleText={styles.textButtonSave}
                isLoading={isLoading}
                onPress={updateUser}
              />
            </View>
          </View>
        </ScrollView>
      </ViewContainer>
    </SafeAreaContainer>
  );
};

export default Setting;
