import React, { useState, FunctionComponent } from "react";
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Locale configurations
import en from '../i18n/en';
import zh_CN from '../i18n/zh-CN';

// Components
import Designer from "./designer/designer";
import Main from "./main/main";
import TopBar from './shared/topbar';
import Space from './shared/space';
import Container from "./shared/container";
import MyQuests from "./main/my-quests/myQuests";
import Market from "./main/quest-lib/market";
import MySharings from "./main/quest-lib/mySharings";

// Mockups
import { UserCtx } from "../utils/user";
import { userMockUp } from "./mocks";
import { questListMockUp } from './mocks';

// Interfaces
import { Quest } from "../types";

import './app.scss';

const questFilterRoutes: (Quest['status'] | '/')[] = ['undeployed', 'deployed', 'ended', 'paused', '/'];

const App: FunctionComponent = () => {
    const [locale, setLocale] = useState<string>(navigator.language);
    const [curQuestIdx, setCurQuestIdx] = useState<number>(0);

    let messages = zh_CN;
    // Switch translation configuration when locale changes
    if (locale === 'zh-CN')
        messages = zh_CN;
    else if (locale === 'en')
        messages = en;

    return (
        <IntlProvider
            locale={locale}
            key={locale}
            defaultLocale='zh-CN'
            messages={messages}
        >
            <UserCtx.Provider value={userMockUp}>
                <Container className="app" justify="start">
                    <TopBar showBackBtn showCurQuest
                        quests={questListMockUp}
                        curQuestIdx={curQuestIdx}
                        onLocaleSwitch={() => setLocale(locale === 'en' ? 'zh-CN' : 'en')}
                        onCurQuestChange={(current) => { setCurQuestIdx(current); }}
                    />
                    <Space className="app--space" />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Main />}>
                                {questFilterRoutes.map((status) =>
                                    (<Route key={status} path={status} element={<MyQuests statusFilter={status} />} />))}
                                <Route path="my-sharings" element={<MySharings />} />
                                <Route path='market' element={<Market />} />
                            </Route>
                            <Route path='/designer' element={<Designer />} />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </UserCtx.Provider >
        </IntlProvider >

    );
};


export default App;

