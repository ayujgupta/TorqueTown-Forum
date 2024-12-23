import { Container, Typography } from "@mui/material";
import AccountMenu from "./AccountMenu";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import AccountProfile from "./AccountProfile";
import AccountFavorites from "./AccountFavorites";
import AccountPosted from "./AccountPosted";
import AccountSecurity from "./AccountSecurity";
import { getUser } from "../../utils";
import { useStore } from "../../store";

import "./index.css";
import { useEffect, useState } from "react";

function AccountPage() {
  const { action } = useParams();
  const { userStore } = useStore();
  const [userInfo, setUserInfo] = useState(userStore.getUser());

  useEffect(() => {
    setUserInfo(userStore.getUser());
  });

  return (
    <Container id="account-page">
      <Grid container spacing={2}>
        <Grid size={3}>
          <AccountMenu></AccountMenu>
        </Grid>
        <Grid size={9}>
          <div>
            <Typography variant="h5">{userInfo.username}</Typography>
            <Typography variant="h6">{userInfo.signature}</Typography>
          </div>
          {action === "profile" ? <AccountProfile></AccountProfile> : null}
          {action === "favorites" ? (
            <AccountFavorites></AccountFavorites>
          ) : null}
          {action === "posted" ? <AccountPosted></AccountPosted> : null}
          {action === "security" ? <AccountSecurity></AccountSecurity> : null}
        </Grid>
      </Grid>
    </Container>
  );
}

export default AccountPage;
