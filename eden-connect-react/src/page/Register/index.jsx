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
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confError, setConfError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

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
          setInfoMessage("Registration successful, please log in");
          // navigate("/");
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
        setIsLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
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

  const handleSubmit = () => {
    if (
      validateEmail() &&
      validatePass(password) &&
      validateConfPass(confirm)
    ) {
      console.log("Validated for register");
      registerUser();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear the error when the user types
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePass = (password) => {
    if (!password.match(passRegex)) {
      setPassError(
        "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    } else {
      setPassError("");
      // return tru;
    }
    return true;
  };

  const validateConfPass = (confirm) => {
    if (confirm !== password) {
      setConfError("Passwords do not match");
      return false;
    } else {
      setConfError("");
    }
    return true;
  };

  return (
    <>
      <Container maxWidth="xs">
        <Box className="login-box" sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          {/* existing */}
          {/* <TextField
      label="Username/Email"
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
      /> */}
          {/* ayuj change */}
          <TextField
            label="Username/Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError} // Set error state to true if there is an error
            helperText={emailError} // Display the error message below the input field
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
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePass(e.target.value); // Validate password on change
            }}
            error={Boolean(passError)}
            helperText={passError}
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
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              validateConfPass(e.target.value); // Validate confirm password
            }}
            error={Boolean(confError)}
            helperText={confError}
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

          {/* <TextField
        label="Password"
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
        label="Confirm Password"
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
        /> */}
          <LoadingButton
            loading={isLoading}
            // onClick={registerUser}
            onClick={handleSubmit}
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
