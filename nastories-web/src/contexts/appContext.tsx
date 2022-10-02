import React, { useState, createContext, useContext } from 'react';
import { AppSetting } from '../types/type';
import { GlobalKeys } from '../utils/constants';

let appSetting: AppSetting = require('../appSetting.json');

export type AppContextType = {
    locale: string;
    setLocale: (string: string) => void;
    appSetting: AppSetting;
}

export const AppContext = createContext<AppContextType>({
    locale: 'en',
    setLocale: locale => console.warn('No locale provider'),
    appSetting: appSetting
});

export const useAppContext = () => useContext(AppContext);

interface Props {
    children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
    const defaultLocale = window.localStorage.getItem(GlobalKeys.LanguageSelectedKey);
    const [locale, setLocale] = useState<string>(defaultLocale || 'en');

    const provider = {
        locale,
        setLocale,
        appSetting
    };
    return (
        <>
            <AppContext.Provider value={provider}>
                {children}
            </AppContext.Provider>
        </>
    );
};



