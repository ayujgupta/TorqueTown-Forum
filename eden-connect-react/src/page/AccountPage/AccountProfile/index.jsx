import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { useStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../utils";

import "./index.css";

function AccountProfile() {
  const axiosInstance = useAxios();
  const { userStore } = useStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false); // 测试的时候用true
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [isDefaultAvatar, setIsDefaultAvatar] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    // 获取用户信息
    getUserInfo();
    setIsLoading(false);
  }, []);

  /**
   * 获取用户信息
   */
  function getUserInfo() {
    axiosInstance
      .get("/account")
      .then((res) => {
        if (res.data.code === 200) {
          setUserInfo((e) => res.data.data);
          userStore.setUser(res.data.data);
          setNewAvatar(res.data.data.avatar);
          if (res.data.data.avatar.includes("default_avatar")) {
            setIsDefaultAvatar(true);
          } else {
            setIsDefaultAvatar(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function usernameChange(e) {
    setUserInfo((userInfo) => ({
      ...userInfo,
      username: e.target.value,
    }));
  }

  function signatureChange(e) {
    setUserInfo((userInfo) => ({
      ...userInfo,
      signature: e.target.value,
    }));
  }

  /**
   * 上传用户头像
   * @param {} e
   */
  function uploadAvatar(e) {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axiosInstance
      .post(`/account/upload/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setNewAvatar(res.data.data);
      })
      .catch((err) => {
        setErrorMessage("上传失败，请重试！");
        setOpen(true);
      });
  }

  /**
   * 关闭错误信息框
   */
  function closeErrAlert() {
    setOpen(false);
  }

  /**
   * 打开上传
   */
  function handleAvatarClick() {
    document.getElementById("avatar-upload").click();
  }

  /**
   * 修改用户信息
   * @returns
   */
  function updateInfo() {
    setIsUploading(true);
    console.log(userInfo);
    if (userInfo.username.trim() === "" || userInfo.username === null) {
      setOpen(true);
      setErrorMessage("用户名不能为空");
      return;
    }
    userInfo.avatar = isDefaultAvatar ? "" : newAvatar;

    axiosInstance
      .post(`/account/updateInfo`, userInfo)
      .then((res) => {
        if (res.data.code === 200) {
          getUserInfo();
          navigator("/account");
        }
        setIsUploading(false);
      })
      .catch((err) => {
        setOpen(true);
        setErrorMessage("修改用户信息失败");
        setIsUploading(false);
      });
  }

  return (
    <Container className="profile-container">
      <Typography variant="h5" className="title">
      Personal Info
      </Typography>

      {userInfo ? (
        <>
          <Box mb={2}>
            <label>Nickname</label>
            <TextField
              value={userInfo.username}
              onChange={usernameChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Box>

          <Box mb={2}>
            <label>UserID</label>
            <TextField
              fullWidth
              // label="UserID"
              variant="outlined"
              size="small"
              defaultValue={userInfo.id}
              disabled
            />
          </Box>

          <Box mb={2} className="avatar-section">
            <label>Avatar</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={isDefaultAvatar ? "default" : "custom"}
            >
              <input
                id="avatar-upload"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => uploadAvatar(e)}
              />
              <Avatar
                src={newAvatar}
                className="custom-avatar"
                onClick={handleAvatarClick}
              />
              <FormControlLabel
                onClick={() => setIsDefaultAvatar(false)}
                value="custom"
                control={<Radio />}
                label="Customize"
              />
              <Avatar
                className="default-avatar"
                src="https://s2.loli.net/2024/10/27/kvHKXamdrsPCZ6h.jpg"
              ></Avatar>
              <FormControlLabel
                onClick={() => setIsDefaultAvatar(true)}
                value="default"
                control={<Radio />}
                label="Default"
              />
            </RadioGroup>

            {/* 上传错误后显示 */}
            <Snackbar
              onClose={closeErrAlert}
              open={open}
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
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              label="Signature"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              value={userInfo.signature}
              onChange={signatureChange}
            />
          </Box>
        </>
      ) : null}

      <LoadingButton
        onClick={updateInfo}
        loading={isUploading}
        variant="contained"
        className="account-profile-summit"
        fullWidth
        sx={{
          "& .MuiLoadingButton-loadingIndicator": {
            color: "white", // 修改加载图标的颜色
          },
        }}
      >
        Save
      </LoadingButton>
    </Container>
  );
}

export default AccountProfile;
