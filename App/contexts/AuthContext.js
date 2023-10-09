import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
        setCheckLoading(true);
        api
          .get("/auth/me/")
          .then((res) => res.data)
          .then((data) => {
            setUser(data);
          })
          .catch(() => {
            AsyncStorage.removeItem("auth_token");
          })
          .finally(() => setCheckLoading(false));
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, checkLoading, setUser, setIsLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
