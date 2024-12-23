/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid2";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./index.css";

function UserMenu({ userinfo }) {
  const navigator = useNavigate();

  const { action } = useParams();

  const currentAction = action || "profile";

  function goProfile() {
    navigator(`/user/${userinfo.id}/profile`);
  }

  function goPosted() {
    navigator(`/user/${userinfo.id}/posted`);
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
              src={userinfo.avatar}
            />
          </Grid>
          <Grid className="account-menu-list">
            {/* {/* <div className="aside-placeholder"></div> */}
            <div className="aside-placeholder"></div>
            <Grid size={12}>
              <Button
                sx={currentAction === "profile" ? { bgcolor: "#2f3964" } : null}
                onClick={goProfile}
                className="account-menu-list-button"
              >
                个人资料
              </Button>
            </Grid>
            <Grid size={12}>
              <Button
                sx={currentAction === "posted" ? { bgcolor: "#2f3964" } : null}
                onClick={goPosted}
                className="account-menu-list-button"
              >
                用户文章
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default UserMenu;
