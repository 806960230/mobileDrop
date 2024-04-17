import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider, setDefaultConfig } from 'antd-mobile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import zh_CN from 'antd-mobile/es/locales/zh-CN';
import en_US from 'antd-mobile/es/locales/en-US';
import { DataContext } from './context';
import Login from './containers/Login';
import Register from './containers/Register';
import { client } from './utils/apollo';
import StudentInfo from './components/StudentInfo';
import { routes } from './routes/menus';
import { ROUTE_COMPONENT } from './routes';
import App from './App';
import './theme.css';
import './utils/i18n';

const Root = () => {
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    setDefaultConfig({
      locale: locale === 'en' ? en_US : zh_CN,
    });
    localStorage.setItem('i18nextLng', locale);
  }, [locale]);

  return (
    <DataContext.Provider value={{ locale, setLocale }}>
      <ConfigProvider locale={localStorage.getItem('i18nextLng') === 'en' ? en_US : zh_CN}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <StudentInfo>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<App />}>
                  {routes.map((item) => {
                    const Component = ROUTE_COMPONENT[item.key];
                    return (
                      <Route
                        path={item.path}
                        key={item.key}
                        element={<Component />}
                      />
                    );
                  })}
                </Route>
              </Routes>
            </StudentInfo>
          </BrowserRouter>
        </ApolloProvider>
      </ConfigProvider>
    </DataContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
