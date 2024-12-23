import Grid from "@mui/material/Grid2";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUser, removeToken, removeUser, request } from "../../../utils";
import { useStore } from "../../../store";

import "./index.css";

function AccountMenu() {
  const { userStore } = useStore();
  const navigator = useNavigate();
  const userInfo = userStore.getUser();

  const { action } = useParams();

  function goProfile() {
    navigator("/account/profile");
  }

  function goFavorites() {
    navigator("/account/favorites");
  }

  function goSecurity() {
    navigator("/account/security");
  }

  function goPosted() {
    navigator("/account/posted");
  }

  // 用户登出
  function logout() {
    request.post("/auth/logout").then((res) => {
      console.log("退出成功");
    });
    removeToken();
    removeUser();
    navigator("/", { replace: true });
    console.log("登出");
  }

  return (
    <>
      {/* 用户菜单 */}
      <Grid container>
        <div id="account-menu">
          <Grid className="account-avatar">
            <Avatar
              sx={{ width: 96, height: 96 }}
              alt="User"
              src={userInfo.avatar}
            />
          </Grid>
          <Grid className="account-menu-list">
            {/* {/* <div className="aside-placeholder"></div> */}
            <div className="aside-placeholder"></div>
            <Grid size={12}>
              <Button
                sx={action === "profile" ? { bgcolor: "#2f3964" } : null}
                onClick={goProfile}
                className="account-menu-list-button"
              >
                个人资料
              </Button>
            </Grid>
            <Grid size={12}>
              <Button
                sx={action === "favorites" ? { bgcolor: "#2f3964" } : null}
                onClick={goFavorites}
                className="account-menu-list-button"
              >
                我的收藏
              </Button>
            </Grid>
            <Grid size={12}>
              <Button
                sx={action === "posted" ? { bgcolor: "#2f3964" } : null}
                onClick={goPosted}
                className="account-menu-list-button"
              >
                用户文章
              </Button>
            </Grid>
            <Grid size={12}>
              <Button
                sx={action === "security" ? { bgcolor: "#2f3964" } : null}
                onClick={goSecurity}
                className="account-menu-list-button"
              >
                账号安全
              </Button>
            </Grid>
            <div className="aside-placeholder"></div>
            <Grid size={12}>
              <Button onClick={logout} className="account-menu-list-logout">
                安全退出
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default AccountMenu;
