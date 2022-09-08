import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import router from './config/routes/index';
import Loading from "./Loading";
import { AuthenticationPathUrl } from "./utils/GeneralFunctions";
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          {router.map((routers) => {
            return routers.map((route, index) => {
              return (
                <Route path={route.path} element={route.element} key={index}>
                  //if (route.index ? index : 0)
                  {route.index ? <Route index element={route.index} /> : null}
                  //children route(admin/children)
                  {route.children ? route.children.map(({ path, Component }, index) => {
                    return <Route path={path} element={<Component />} key={index} />
                  }) : null}
                </Route>
              )
            })
          })}
        </Routes>
        <AuthenticationPathUrl />
      </Router>
      <Loading />
      <ToastContainer />
    </>
  );
}

export default App;
