import React, { useEffect, useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useStore } from "../../store";
import { useAuth } from "../../utils/TokenContext";
import {
  TextField,
  InputAdornment,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, Home } from "@mui/icons-material";
import { replace, useNavigate } from "react-router-dom";
// import { getToken, removeToken, removeUser, setUser } from "../../utils";
import { useAxios } from "../../utils";
// import Container from "@mui/material";

import "./index.css";

function Header() {
  const axiosInstance = useAxios();
  const logoURL = "http://localhost:7777/upload/img/logo.png";
  const { userStore } = useStore();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token} = useAuth();

  const debounceTimer = useRef(null); // 定时器引用
  const navigator = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   setIsLoading(true);
  //   // 获取用户信息
  //   setUserInfo(userStore.getUser());
  //   setIsLoading(false);
  // });

  useEffect(()=>{
    console.log("inside header useeffect")
    setIsLoading(true);
    if(token==null){
      setUserInfo(null);
    }
    else{
      setUserInfo(userStore.getUser());
    }
    setIsLoading(false);
  },[token]);

  function goHome() {
    navigator("/");
  }

  function goProfile() {
    navigator("/account/profile");
    setAnchorEl(null);
  }

  function goFavorites() {
    navigator("/account/favorites");
    setAnchorEl(null);
  }

  function goPosted() {
    navigator("/account/posted");
    setAnchorEl(null);
  }

  function goSecurity() {
    navigator("/account/security");
    setAnchorEl(null);
  }

  function goLogin() {
    navigator("/login", replace);
    setAnchorEl(null);
  }

  function goEditor() {
    navigator("/edit");
  }

  /**
   * 搜索文章
   * @param {} e
   */
  const inputChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      navigator("/");
    }
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value !== "" && value === e.target.value.trim()) {
        navigator(`/search?key=${e.target.value.trim()}`);
      } else if (value === "") {
        navigator("/");
      }
    }, 1000);
  };

  // 用户登出
  function logout() {
    axiosInstance.post("/auth/logout").then((res) => {
      console.log("退出成功");
    });
    userStore.clearUser();
    // removeToken();
    // removeUser();
    navigator("/");
    setAnchorEl(null);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleOpenMenu(event) {
    // console.log(event);
    setAnchorEl(event.currentTarget);
  }

  // 登录后显示的
  const userDiv = (
    <>
      <IconButton onClick={handleOpenMenu}>
        <Avatar alt="User" src={userInfo?.avatar} />
      </IconButton>
      {open && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* MenuItem 选项 */}
          <MenuItem onClick={goProfile}>Personal Info</MenuItem>
          <MenuItem onClick={goFavorites}>My Collection</MenuItem>
          <MenuItem onClick={goPosted}>My Articles</MenuItem>
          <MenuItem onClick={goSecurity}>Account security</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      )}
    </>
  );

  // 访客
  const guestDiv = (
    <>
      <IconButton onClick={handleOpenMenu}>
        <Avatar alt="User" />
      </IconButton>
      {open && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {/* MenuItem 选项 */}
          <MenuItem onClick={goLogin}>Login</MenuItem>
        </Menu>
      )}
    </>
  );

  return (
    <div className="header-top">
      <AppBar position="fixed" className="header-app-bar">
        <Container className="header">
          {/* 上层：Logo与搜索框 */}
          <Toolbar className="logo-and-search">
            {/* 左边的 Logo */}
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, paddingLeft: 1 }}
            >
              {/* <img src={logoURL} alt="Logo" style={{ height: '40px' }} /> */}
              LOGO
            </Typography>

            {/* 搜索框 */}
            <TextField
              size="small"
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={inputChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Toolbar>

          {/* 下层：导航和用户信息 */}
          <Toolbar variant="dense">
            {/* 导航和功能按钮 */}
            <Button
              onClick={() => goHome()}
              color="inherit"
              startIcon={<Home></Home>}
            >
              Home
            </Button>
            {/* <Button color="inherit">源码分享</Button>
            <Button color="inherit">教程工具</Button> */}

            {/* 空白填充 */}
            <Box sx={{ flexGrow: 1 }} />

            {/* <IconButton color="inherit" onClick={() => themeStore.toggleTheme()}>
          {themeStore.isDarkMode ? (
            <DarkMode></DarkMode>
          ) : (
            <LightMode></LightMode>
          )}
        </IconButton> */}

            <Button
              onClick={() => goEditor()}
              color="inherit"
              startIcon={<PostAddIcon></PostAddIcon>}
            >
              Post an Article
            </Button>

            {token? userDiv : guestDiv}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
