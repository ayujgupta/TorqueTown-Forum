/* eslint-disable no-unused-vars */
import {
  Container,
  useMediaQuery,
  Typography,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import ASide from "../../components/ASide";
import { useParams } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CommentsList from "../../components/CommentsList/Index";
import { useState, useEffect } from "react";
import { request } from "../../utils";
import { marked } from "marked";
import "./index.css";
import { useStore } from "../../store";
import { useNavigate } from "react-router-dom";

function ArticleDetail() {
  const { userStore } = useStore();

  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { id } = useParams("id");
  const [articleInfo, setArticleInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userInfo, setUserInfo] = useState(userStore.getUser());

  function goEditor() {
    navigate(`/edit/${id}`);
  }

  useEffect(() => {
    setIsLoading(true);
    request.get(`/article/${id}`).then((res) => {
      setArticleInfo((e) => res.data.data);
      const html = marked(res.data.data.content);
      setHtmlContent(html);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    request.put(`/article/view/${id}`);
  }, [id]);

  /**
   * 关闭文章
   */
  function closeErrAlert() {
    setOpenErr(false);
  }

  /**
   * 喜欢文章
   */
  function likeArticle() {
    request
      .post(`/article/like/${id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setArticleInfo((e) => ({
            ...articleInfo,
            isLike: !articleInfo.isLike,
          }));
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage("点赞失败请稍后重试");
      });
  }

  /**
   * 添加收藏
   */
  function addFavorite() {
    request
      .post(`/favorites/add/${id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setArticleInfo((e) => ({
            ...articleInfo,
            isFavorite: !articleInfo.isFavorite,
          }));
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage("收藏失败请稍后重试");
      });
  }

  /**
   * 移除收藏
   */
  function removeFavorite() {
    request
      .post(`/favorites/remove/${id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setArticleInfo((e) => ({
            ...articleInfo,
            isFavorite: !articleInfo.isFavorite,
          }));
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage("收藏失败请稍后重试");
      });
  }

  return (
    <Container id="article-detail">
      <div>
        <Grid container spacing={1}>
          <Grid size={isSmallScreen ? 12 : 9}>
            <div className="article-detail-div">
              {!isLoading ? (
                <div className="article-detail-body">
                  {/* 标题 */}
                  <div className="article-detail-title">
                    <Typography variant="h4">{articleInfo.title}</Typography>
                  </div>
                  {/* 文章信息 */}
                  <div className="article-detail-info-div">
                    <Typography
                      className="article-detail-info"
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <span>
                        <Link to={`/user/${articleInfo.create_by}`}>
                          <Avatar
                            sx={{ width: 24, height: 24, marginRight: 1 }}
                            alt=""
                            src={articleInfo.avatar}
                          />
                        </Link>
                        {articleInfo.username}
                      </span>{" "}
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <span>发布日期: {articleInfo.create_time}</span>{" "}
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <span>阅读量: {articleInfo.view_count}</span>
                    </Typography>
                  </div>

                  {/* 文章内容 */}
                  <div
                    className="article-detail-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  ></div>
                </div>
              ) : null}

              {/* // todo  获取文章的Tags */}
              <div className="article-detail-tags-list">Tags显示在这里</div>

              {/* 判断isFavorite和isLike值是不是1 确定当前用户是否点赞或者收藏 */}
              <div className="options-area">
                <div className="option-button">
                  <div>
                    <IconButton onClick={likeArticle} size="large">
                      {!isLoading && articleInfo.isLike ? (
                        <>
                          <ThumbUpAltIcon fontSize="large"></ThumbUpAltIcon>
                        </>
                      ) : (
                        <>
                          <ThumbUpOffAltIcon fontSize="large"></ThumbUpOffAltIcon>
                        </>
                      )}
                    </IconButton>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#ddd",
                    }}
                  >
                    点赞
                  </div>
                </div>

                <div className="option-button">
                  <div>
                    <IconButton size="large">
                      {!isLoading && articleInfo.isFavorite ? (
                        <>
                          <FavoriteIcon
                            onClick={removeFavorite}
                            fontSize="large"
                          ></FavoriteIcon>
                        </>
                      ) : (
                        <>
                          <FavoriteBorderIcon
                            onClick={addFavorite}
                            fontSize="large"
                          ></FavoriteBorderIcon>
                        </>
                      )}
                    </IconButton>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#ddd",
                    }}
                  >
                    收藏
                  </div>
                </div>

                {userInfo?.id === articleInfo?.create_by ? (
                  <>
                    <div className="option-button">
                      <div>
                        <IconButton onClick={goEditor} size="large">
                          <EditNoteIcon fontSize="large"></EditNoteIcon>
                        </IconButton>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: "14px",
                          color: "#ddd",
                        }}
                      >
                        编辑
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            {/* 评论区 */}
            <CommentsList articleId={id}></CommentsList>
          </Grid>
          <Grid size={3}>{isSmallScreen ? null : <ASide></ASide>}</Grid>
        </Grid>
      </div>
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
    </Container>
  );
}

export default ArticleDetail;
