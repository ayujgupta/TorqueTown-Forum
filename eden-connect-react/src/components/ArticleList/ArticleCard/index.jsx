/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";

function ArticleCard({ article }) {
  const navigate = useNavigate();

  // 根据获取到的内容渲染元素

  function goArticle(id) {
    navigate(`/article/${id}`);
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        {/* 文章封面 */}
        <CardMedia
          className={style.articleCover}
          component="img"
          height="140"
          onClick={() => goArticle(article.id)}
          image={article.thumbnail}
          alt="Article Cover"
        />

        <CardContent>
          {/* Title */}
          <Typography
            variant="h6"
            style={{ fontSize: "16px" }}
            component="div"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // 最多两行
            }}
          >
            <Link className="my-link" to={`/article/${article.id}`}>
              {article.title}
            </Link>
          </Typography>
        </CardContent>

        {/* 底部信息区域 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            pt: 0,
          }}
        >
          {/* 发布人信息 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={
                article
                  ? article.avatar
                  : "https://example.com/author-avatar.jpg"
              }
              alt="Author Avatar"
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            <Typography variant="body2">{article.username}</Typography>
          </Box>

          {/* 阅读量 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RemoveRedEyeIcon
              sx={{ width: 24, height: 24, mr: 1 }}
            ></RemoveRedEyeIcon>
            <Typography variant="body2" color="textSecondary">
              {article.view_count}
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default ArticleCard;
