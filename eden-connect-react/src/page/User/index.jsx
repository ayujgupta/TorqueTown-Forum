import { Container, Typography } from "@mui/material";
import UserMenu from "./UserMenu";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserPosted from "./UserPosted";
import { useEffect, useState } from "react";
import { useAxios } from "../../utils";

import "./index.css";

function User() {
  const axiosInstance = useAxios();
  const { id, action } = useParams();
  const currentAction = action || "profile";
  if (id === undefined || id === null) {
    // 报错
  }

  const [info, setInfo] = useState();

  // 通过用户id获取当前基本信息
  useEffect(() => {
    axiosInstance.get(`/account/public/${id}`).then((res) => {
      // console.log(res.data);

      if (res.data.code === 200) {
        setInfo(res.data.data);
      } else {
        console.log("获取用户信息错误-公共");
      }
    });
  }, [id]);

  return (
    <Container id="user-page">
      <Grid container spacing={2}>
        {info ? (
          <>
            <Grid size={3}>
              <UserMenu userinfo={info}></UserMenu>
            </Grid>
            <Grid size={9}>
            <div style={{margin:"10px"}}>
                <Typography variant="h5">{info.username}</Typography>
                <Typography variant="h7" sx={{ fontStyle: 'italic' }}>
                {info.signature}</Typography>
              </div>
              {currentAction === "profile" ? (
                <UserProfile userinfo={info}></UserProfile>
              ) : null}
              {currentAction === "posted" ? (
                <UserPosted userId={id}></UserPosted>
              ) : null}
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
}

export default User;
