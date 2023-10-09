import { ActivityIndicator } from "react-native";

import tw from "../tw";
import SafeAreaContainer from "../components/SafeAreaContainer";
import ViewContainer from "../components/ViewContainer";

const SpinLoading = () => {
  return (
    <SafeAreaContainer>
      <ViewContainer style={{ ...tw("items-center justify-center") }}>
        <ActivityIndicator
          size="large"
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
      </ViewContainer>
    </SafeAreaContainer>
  );
};

export default SpinLoading;
