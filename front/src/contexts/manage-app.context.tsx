import React, { createContext, useContext } from "react";
import { AppInterface } from "../interfaces/app";

interface Props {
    children: React.ReactNode;
    app: AppInterface;
    reload: () => void;
}

type AppContextType = {
    app: AppInterface;
    reload: () => void;
};

const AppContext = createContext<AppContextType>({
    app: {} as AppInterface,
    reload: () => {},
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

export const AppContextProvider: React.FC<Props> = ({
    children,
    app,
    reload,
}) => {
    return (
        <AppContext.Provider value={{ app, reload }}>
            {children}
        </AppContext.Provider>
    );
};
