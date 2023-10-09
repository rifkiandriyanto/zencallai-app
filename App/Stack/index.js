import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainTab } from "../Tab";
import ForgotPassword from "../screens/ForgotPassword";
import LoginPage from "../screens/LoginPage";
import SignUp from "../screens/SignUp";
import Chat from "../screens/Chat";
import Payment from "../screens/Payment";

const Stack = createNativeStackNavigator();

export const UnAuthenticationStacks = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTab" component={MainTab} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};
