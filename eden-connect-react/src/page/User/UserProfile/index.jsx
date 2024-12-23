import { Container, Typography, TextField, Box } from "@mui/material";

import "./index.css";

function UserProfile({ userinfo }) {
  return (
    <Container className="profile-container">
      {userinfo ? (
        <>
          <Typography variant="h5" className="title">
            个人资料
          </Typography>

          <Box mb={2}>
            <label className="profile-label">昵称</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.username}
            </Typography>
          </Box>

          <Box mb={2}>
            <label className="profile-label">签名</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.signature}
            </Typography>
          </Box>

          <Box mb={2}>
            <label className="profile-label">注册时间</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.createDate}
            </Typography>
          </Box>

          <Box mb={2}>
            <label className="profile-label">最后登录</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.updateDate}
            </Typography>
          </Box>
        </>
      ) : null}
    </Container>
  );
}

export default UserProfile;
