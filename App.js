import { NavigationContainer } from "@react-navigation/native";
import Router from "./App/Router";
import { AuthProvider } from "./App/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AuthProvider>
  );
}
