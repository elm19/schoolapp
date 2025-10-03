// components/UserProvider.tsx
"use client";
import { createContext, useContext } from "react";

const UserContext = createContext(null);

interface UserProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any ;
  children: React.ReactNode;
}

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
