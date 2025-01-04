import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { request } from "../../../utils";

import "./index.css";
import { useState } from "react";

function AccountSecurity() {
  function sendConfirmCode() {
    alert("尚未实现");
  }

  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  function closeErrAlert() {
    setOpenErr(false);
    // setErrorMessage("");
  }

  function closeInfoAlert() {
    setOpenInfo(false);
  }

  function updatePassword() {
    if (passwordOld.trim() === "") {
      setOpenErr(true);
      setErrorMessage("The current password cannot be empty");
    }
    if (passwordNew.trim() === "") {
      setOpenErr(true);
      setErrorMessage("The new password cannot be empty");
    }
    if (passwordConfirm.trim() !== passwordNew.trim()) {
      setOpenErr(true);
      setErrorMessage("两次密码不一致");
    }
    request
      .post(`/account/changePwd`, {
        password_old: passwordOld,
        password_new: passwordNew,
        confirm: passwordConfirm,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setOpenInfo(true);
          setInfoMessage(res.data.msg);
          setPasswordConfirm("");
          setPasswordNew("");
          setPasswordOld("");
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage(err);
      });
  }

  return (
    <Container id="account-security">
      <Typography variant="h5" className="title">
      Account security
      </Typography>

      {/* 修改密码 */}
      <Typography variant="h6" style={{ marginTop: 2, marginBottom: 2 }}>
      Change password
      </Typography>

      <Box mb={2}>
        <label>Current Password</label>
        <TextField
          value={passwordOld}
          onChange={(e) => setPasswordOld(e.target.value)}
          type="password"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Box>

      <Box mb={2}>
        <label>New Password</label>
        <TextField
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
          type="password"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Box>

      <Box mb={2}>
        <label>Confirm Password</label>
        <TextField
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          fullWidth
          variant="outlined"
          size="small"
        />
      </Box>

      <div className="post-commend-div">
        <Button
          onClick={updatePassword}
          variant="contained"
          endIcon={<LockIcon />}
        >
          Change password
        </Button>
      </div>

      {/* 绑定邮箱 */}
      <Typography variant="h6" style={{ borderTop: "2px solid #2e3553" }}>
        Update Email
      </Typography>
      <Box mb={2}>
        <label>Username/Email</label>
        <TextField type="email" fullWidth variant="outlined" size="small" />
      </Box>
      <div className="post-commend-div">
        <Button
          onClick={sendConfirmCode}
          variant="contained"
          endIcon={<MailOutlineIcon />}
        >
          Send verification code
        </Button>
      </div>
      <Typography
        variant="h6"
        style={{ borderBottom: "2px solid #2e3553" }}
      ></Typography>

      {/* 错误消息栏 */}
      <Snackbar
        onClose={closeErrAlert}
        open={openErr}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeErrAlert} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      {/* 信息消息栏 */}
      <Snackbar
        onClose={closeInfoAlert}
        open={openInfo}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeInfoAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {infoMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AccountSecurity;
