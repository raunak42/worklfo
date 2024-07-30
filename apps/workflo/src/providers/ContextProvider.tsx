"use client";

import React, { createContext, useState } from "react";

interface AppState {
  count: number;
  theme: "light" | "dark";
}

const initialState: AppState = {
  count: 0,
  theme: "light",
};

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const ContextProvier = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
