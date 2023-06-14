import React, { createContext, useContext } from "react";
import { AppInterface } from "../interfaces/app";

interface Props {
    children: React.ReactNode;
    app: AppInterface;
}

type AppContextType = {
    app: AppInterface;
};

const AppContext = createContext<AppContextType>({
    app: {} as AppInterface,
});

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useManageAppContext must be used within an AuthContextProvider"
        );
    }

    return context;
};

export const AppContextProvider: React.FC<Props> = ({ children, app }) => {
    return (
        <AppContext.Provider value={{ app }}>{children}</AppContext.Provider>
    );
};
