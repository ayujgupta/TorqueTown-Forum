import "./index.css";
import { Typography, IconButton, Avatar } from "@mui/material";
import {
  Assessment,
  ThumbUpAlt,
  LocalFireDepartment,
} from "@mui/icons-material";
import { request } from "../../../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PinTop() {
  // todo 找不到article
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  // 获取置顶文章
  useEffect(() => {
    request.get("/article/top").then((res) => {
      if (res.data.code === 200) {
        setArticle(res.data.data);
      } else {
        console.log("获取置顶文章失败");
      }
    });
  }, []);

  function goUser(id) {
    navigate(`/user/${id}`);
  }

  function goArticle() {
    navigate(`/article/${article.id}`);
  }

  return (
    <div id="pin-top-div">
      <div className="pin-top-icon">
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
        >
          <Assessment style={{ marginRight: 8 }}></Assessment>
          置顶文章
        </Typography>
      </div>

      {article ? (
        <>
          <div className="pin-top-article">
            <img
              onClick={() => goArticle()}
              className="pin-top-article-image"
              src={article.thumbnail}
              alt=""
            />
            <div>
              <IconButton
                onClick={() => goUser(article.create_by)}
                className="avatar-icon"
              >
                <Avatar alt="User" src={article.avatar} />
              </IconButton>
              {/* 文章标题 */}
              <span>{article.title}</span>
              {/* 文章数据 */}
              <div style={{ display: "flex", alignItems: "center" }}>
                &nbsp;&nbsp;
                <ThumbUpAlt></ThumbUpAlt>
                &nbsp;&nbsp;
                <span style={{ color: "#ddd", fontSize: 14 }}>
                  {" "}
                  {article.like_count} 赞
                </span>
                &nbsp;&nbsp;
                <LocalFireDepartment></LocalFireDepartment>
                &nbsp;&nbsp;
                <span style={{ color: "#ddd", fontSize: 14 }}>
                  {" "}
                  {article.view_count} 阅读量
                </span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PinTop;
