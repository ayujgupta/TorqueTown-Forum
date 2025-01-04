import { Container, Typography, TextField, Box } from "@mui/material";

import "./index.css";

function UserProfile({ userinfo }) {
  return (
    <Container className="profile-container">
      {userinfo ? (
        <>
          <Typography variant="h5" className="title">
          Personal Info
          </Typography>

          <Box mb={2}>
            <label className="profile-label">Nickname</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.username}
            </Typography>
          </Box>

          <Box mb={2}>
            <label className="profile-label">Sign</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.signature}
            </Typography>
          </Box>

          <Box mb={2}>
            <label className="profile-label">Member Since</label>
            <Typography className="profile-info-typography" variant="body2">
              {userinfo.createDate}
            </Typography>
          </Box>

          <Box mb={2}>
            <label className="profile-label">Last Active on</label>
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
