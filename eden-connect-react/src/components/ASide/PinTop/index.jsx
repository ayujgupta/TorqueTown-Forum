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

  // Get pinned articles
  useEffect(() => {
    request.get("/article/top").then((res) => {
      if (res.data.code === 200) {
        setArticle(res.data.data);
      } else {
        console.log("Failed to get the pinned article");
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
          Pinned Article
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
              {/* Title */}
              <span>{article.title}</span>
              {/* 文章数据 */}
              <div style={{ display: "flex", alignItems: "center" }}>
                &nbsp;&nbsp;
                <ThumbUpAlt></ThumbUpAlt>
                &nbsp;&nbsp;
                <span style={{ color: "#ddd", fontSize: 14 }}>
                  {" "}
                  {article.like_count} Like
                </span>
                &nbsp;&nbsp;
                <LocalFireDepartment></LocalFireDepartment>
                &nbsp;&nbsp;
                <span style={{ color: "#ddd", fontSize: 14 }}>
                  {/* {" "} */}
                  {article.view_count} Read
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
