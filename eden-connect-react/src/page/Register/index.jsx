import {
  TextField,
  Snackbar,
  Alert,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { request } from "../../utils";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  function registerUser() {
    setIsLoading(true);
    request
      .post(`/auth/register`, {
        email: email,
        password: password,
        confirm: confirm,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setEmail("");
          setPassword("");
          setConfirm("");
          setOpenInfo(true);
          setInfoMessage("注册成功,请登录");
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage("注册失败");
        setIsLoading(false);
      });
  }

  /**
   * 关闭错误弹窗
   */
  function closeErrAlert() {
    setOpenErr(false);
  }

  /**
   * 关闭消息弹窗
   */
  function closeInfoAlert() {
    setOpenInfo(false);
  }

  return (
    <>
      <Container maxWidth="xs">
        <Box className="login-box" sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          <TextField
            label="邮箱"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <span role="img" aria-label="user icon">
                    📧
                  </span>
                ),
              },
            }}
          />
          <TextField
            label="密码"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <span role="img" aria-label="lock icon">
                    🔒
                  </span>
                ),
              },
            }}
          />
          <TextField
            label="确认密码"
            type="password"
            fullWidth
            margin="normal"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <span role="img" aria-label="lock icon">
                    🔒
                  </span>
                ),
              },
            }}
          />
          <LoadingButton
            loading={isLoading}
            onClick={registerUser}
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </LoadingButton>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link to="/login" className="signup-link">
              Sign In
            </Link>
          </Typography>
        </Box>
        {/* 错误消息栏 */}
        <Snackbar
          onClose={closeErrAlert}
          open={openErr}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={closeErrAlert}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        {/* 信息消息栏 */}
        <Snackbar
          onClose={closeInfoAlert}
          open={openInfo}
          autoHideDuration={10000}
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
    </>
  );
}

export default Login;
