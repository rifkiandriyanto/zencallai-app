import { useContext } from "react";

import { UnAuthenticationStacks, AuthenticatedStack } from "./Stack";
import { AuthContext } from "./contexts/AuthContext";
import SpinLoading from "./screens/SpinLoading";

const Router = () => {
  const { user, checkLoading } = useContext(AuthContext);

  return checkLoading ? (
    <SpinLoading />
  ) : user ? (
    <AuthenticatedStack />
  ) : (
    <UnAuthenticationStacks />
  );
};

export default Router;
