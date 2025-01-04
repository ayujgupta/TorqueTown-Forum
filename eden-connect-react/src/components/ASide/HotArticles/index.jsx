import { Typography, IconButton, Avatar, Divider } from "@mui/material";
import { Chat, ThumbUpAlt, LocalFireDepartment } from "@mui/icons-material";

import "./index.css";

function HotArticles() {
  return (
    <div id="hot-articles">
      {/*  */}
      <div className="articles-icon">
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
        >
          <Chat style={{ marginRight: 8 }}></Chat>Popular Articles
        </Typography>
      </div>
      <div className="hot-article">
        <img
          className="hot-article-image"
          src="https://s2.loli.net/2024/10/26/liPEYFeRDrm5uTM.jpg"
          alt=""
        />
        <div>
          <IconButton className="avatar-icon">
            <Avatar
              alt="User"
              src="https://s2.loli.net/2023/09/11/XRI6tAPH7TxQKJr.jpg"
            />
          </IconButton>
          {/* Title */}
          <span>About this site</span>
          {/* 文章数据 */}
          <div style={{ display: "flex", alignItems: "center" }}>
            &nbsp;&nbsp;
            <ThumbUpAlt></ThumbUpAlt>
            &nbsp;&nbsp;
            <span style={{ color: "#ddd", fontSize: 14 }}> 1 Like</span>
            &nbsp;&nbsp;
            <LocalFireDepartment></LocalFireDepartment>
            &nbsp;&nbsp;
            <span style={{ color: "#ddd", fontSize: 14 }}> 1 Read</span>
          </div>
        </div>
      </div>

      <Divider
        sx={{ borderColor: "#2e3553 ", marginBottom: 1, marginTop: 1 }}
      ></Divider>
    </div>
  );
}

export default HotArticles;
