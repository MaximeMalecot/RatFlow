import React, { createContext, useContext } from "react";
import { AppInterface } from "../interfaces/app";
import { Tag } from "../interfaces/tag";
import tagService from "../services/tag.service";
import { displayMsg } from "../utils/toast";

interface Props {
  children: React.ReactNode;
  app: AppInterface;
  reload: () => void;
}

type AppContextType = {
  app: AppInterface;
  tags: Array<Tag>;
  reload: () => void;
};

const AppContext = createContext<AppContextType>({
  app: {} as AppInterface,
  tags: [] as Array<Tag>,
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
  const [tags, setTags] = React.useState<Array<Tag>>([]);

  const fetchTags = async () => {
    try {
      const res = await tagService.getTagsOfApp(app._id);
      setTags(res);
    } catch (e: any) {
      console.error(e.message);
      displayMsg("error", e.message);
    }
  };

  React.useEffect(() => {
    if (app._id) fetchTags();
  }, [app]);

  return (
    <AppContext.Provider value={{ app, tags, reload }}>
      {children}
    </AppContext.Provider>
  );
};
