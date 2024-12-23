import { ThemeProvider } from "@mui/material";
import { useStore } from "./store";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./page/Main";
import Home from "./page/Home";
import ArticleDetail from "./page/ArticleDetail";
import AccountPage from "./page/AccountPage";
import { observer } from "mobx-react-lite";
import User from "./page/User";
import SignInUp from "./page/SignInUp";
import Login from "./page/Login";
import Register from "./page/Register";
import ArticleEditor from "./page/ArticleEditor";
import { getToken } from "./utils";

function App() {
  const { themeStore } = useStore();

  return (
    <>
      <ThemeProvider theme={themeStore.theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* 主界面布局 */}
            <Route element={<Main></Main>}>
              {/* 主页 */}
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/search" element={<Home></Home>}></Route>
              {/* 文章详情 */}
              <Route
                path="/article/:id"
                element={<ArticleDetail></ArticleDetail>}
              ></Route>
              {/* 账号中心 */}
              <Route
                path="/account"
                element={<Navigate to="/account/profile"></Navigate>}
              ></Route>
              <Route
                path="/account/:action"
                element={<AccountPage></AccountPage>}
              ></Route>
              {/* 用户主页 */}
              <Route path="/user/:id" element={<User></User>}></Route>
              <Route path="/user/:id/:action" element={<User></User>}></Route>
              {/* 编辑文章页面 */}
              <Route
                path="/edit"
                element={<ArticleEditor></ArticleEditor>}
              ></Route>
              <Route
                path="/edit/:id"
                element={<ArticleEditor></ArticleEditor>}
              ></Route>
            </Route>
            <Route element={<SignInUp></SignInUp>}>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default observer(App);
