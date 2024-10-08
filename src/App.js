import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { publicRouter, privateRouter } from './config/routes/index';
import Loading from './components/shared/Loading';
import { getUserById } from './store/slices/main/user/userSlice';
import './config/i18n/i18n';
import { useTranslation } from 'react-i18next';
// import { Helmet } from "react-helmet";

function App() {
  // const { t } = useTranslation('title');
  // Nếu nguơời dùng lưu phiên đăng nhập vào localStorage. App.js sẽ dispatch lấy thông tin
  const { role } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const dispatchUserIfSave = useCallback(() => {
    const user =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    if (user && !role) return dispatch(getUserById(user));
  }, [dispatch, role]);
  useEffect(() => {
    dispatchUserIfSave();
  }, [dispatchUserIfSave]);
  return (
    <>
      <Router>
        <Routes>
          {publicRouter.map((routers) => {
            return routers.map((route, index) => {
              return (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children
                    ? route.children.map(({ path, Component }, index) => {
                        return (
                          <Route
                            path={path}
                            element={<Component />}
                            key={index}
                          />
                        );
                      })
                    : null}
                </Route>
              );
            });
          })}
          {privateRouter.map((routers) => {
            return routers.map((route, index) => {
              return route.role === role || route.role === 'Role_Admin' ? (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children
                    ? route.children.map(({ path, Component }, index) => {
                        return (
                          <Route
                            path={path}
                            element={<Component />}
                            key={index}
                          />
                        );
                      })
                    : null}
                </Route>
              ) : null;
            });
          })}
        </Routes>
      </Router>
      <Loading />
      <ToastContainer />
    </>
  );
}

export default App;
