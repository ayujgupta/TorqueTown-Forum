import { Icon, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Avatar, Divider } from "@mui/material";
import { request } from "../../../utils";
import { useNavigate } from "react-router-dom";

import "./index.css";
import { useEffect, useState } from "react";

function AdminASide() {
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    request.get("/article/getAdminInfo").then((res) => {
      // console.log("获取管理员信息:");
      // console.log(res.data);
      if (res.data.code === 200) {
        setInfo(res.data.data);
      } else {
        console.log("获取管理员信息失败");
      }
    });
  }, []);

  function goUser(id) {
    navigate(`/user/${id}`);
  }

  return (
    <>
      {info ? (
        <div id="admin-aside">
          <Typography
            variant="h6"
            style={{ display: "flex", alignItems: "center" }}
          >
            <AccountCircle style={{ marginRight: 8 }}></AccountCircle>
            管理员
          </Typography>

          <div className="admin-info-div">
            <IconButton
              onClick={() => goUser(info.info.id)}
              className="admin-icon"
            >
              <Avatar alt="User" src={info.info.avatar} />
            </IconButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLight: "16px",
              }}
            >
              <span>{info.info.username}</span>
              <span style={{ color: "#aaa" }}>文章 {info.count} 篇</span>
            </div>
          </div>
          <Divider sx={{ borderColor: "#2e3553 ", marginBottom: 1 }}></Divider>
        </div>
      ) : null}
    </>
  );
}

export default AdminASide;
