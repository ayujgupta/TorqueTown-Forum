/* eslint-disable no-unused-vars */
import {
  Container,
  useMediaQuery,
  Typography,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import ASide from "../../components/ASide";
import { useParams } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentsList from "../../components/CommentsList/Index";
import { useState, useEffect } from "react";
import {  useAxios } from "../../utils";
import { marked } from "marked";
import "./index.css";
import { useStore } from "../../store";
// import { useAuth } from "../../utils/TokenContext";
import { useAuth } from "../../utils/TokenContext";
// import {  } from "react-router-dom";
// import { DeltaToHtmlConverter } from "quill-delta-to-html";
// import ReactQuill, { Quill } from "react-quill";
import Quill from "quill"; // Import Quill directly


function ArticleDetail() {
  const axiosInstance = useAxios();
  const { userStore } = useStore();
  
  const navigate = useNavigate();
  
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { id } = useParams("id");
  const [articleInfo, setArticleInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const { token } = useAuth();

  const [userInfo, setUserInfo] = useState(token?userStore.getUser():null);
  // const { DeltaToHtmlConverter } = require('quill-delta-to-html');
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  function goEditor() {
    navigate(`/edit/${id}`);
  }
  
  useEffect(() => {
    setIsLoading(true);
    // console.log("user "+userStore.getUser());
    // if(!getToken()){
    //   useStore.clearUser;
    // }
    axiosInstance.put(`/article/viewcount/${id}`);
    axiosInstance.get(`/article/view/${id}`).then((res) => {
      const data = res.data.data;
      setArticleInfo(data);
      console.log(userInfo?.id === data?.create_by);
      
      try {
        
        let deltaContent = data.content; // Delta JSON content from backend
        
        // Ensure deltaContent is parsed correctly
        if (typeof deltaContent === 'string') {
          deltaContent = JSON.parse(deltaContent);
        }
        
        // console.log('Delta Content:', deltaContent); // Debugging output
        
        const tempCont = document.createElement('div');
        // if (!window.tempQuill) {
        
        //   window.tempQuill = new Quill(tempCont);
        // }
        
        new Quill(tempCont).setContents(deltaContent);
        
        // Modify the generated HTML to handle image resize properties
        const editorContent = tempCont.querySelector('.ql-editor').innerHTML;
        // console.log(editorContent);
        // Process images to ensure custom attributes like width are applied
        const processedContent = editorContent.replace(/<img([^>]+)>/g, (match, attributes) => {
          const srcMatch = attributes.match(/src="([^"]+)"/);
          const widthMatch = attributes.match(/width="([^"]+)"/);
          const altMatch = attributes.match(/alt="([^"]+)"/);
          
          const src = srcMatch ? srcMatch[1] : '';
          const width = widthMatch ? `width:${widthMatch[1]}px;` : '';
          const alt = altMatch ? altMatch[1] : 'Image';
          
          return `<img src="${src}" alt="${alt}" style="${width}" />`;
        });
        
        setHtmlContent(processedContent);
        
      } catch (err) {
        console.error("Error parsing Delta JSON:", err);
        setHtmlContent("<p>Failed to load content.</p>");
      }
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err);
      setOpenErr(true);
      if (err instanceof Error) {
        setErrorMessage(err.message); // Display the message from the thrown error
        navigate('/');
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    });
  }, [id]);
  
  
  useEffect(() => {
    if(!token){
      setUserInfo(null);
    }
  }, [token]);
  
  /**
  * 关闭文章
  */
  // function closeErrAlert() {
  //   setOpenErr(false);
  // }
  
  /**
  * 喜欢文章
  */
  function likeArticle() {
    axiosInstance
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
      console.error("Error liking article:", err);
      setErrorMessage("Failed to like, please try again later");
    });
  }
  
  function deleteArticle() {
    axiosInstance
    .delete(`/article/delete/${id}`)
    .then((res) => {
      if (res.data.code === 200) {
        setOpenInfo(true); 
        setInfoMessage("Article Deleted! Redirecting to home..");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setOpenErr(true);
        setErrorMessage(res.data.msg);
      }
    })
    .catch((err) => {
      console.error("Error deleting article:", err);
      setOpenErr(true);
      setErrorMessage("Failed to delete, Try again later");
    });
  }
  
  
  /**
  * 添加收藏
  */
  function addFavorite() {
    axiosInstance
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
    axiosInstance
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
      <span>Published On: {articleInfo.create_time}</span>{" "}
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span>Read By: {articleInfo.view_count}</span>
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
    {/* <div className="article-detail-tags-list">Tags显示在这里</div> */}
    
    {/* 判断isFavorite和isLike值是不是1 确定当前用户是否点Like或者收藏 */}
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
    Like
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
    Collection
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
      Edit
      </div>
      </div>
      </>
    ) : null}
    
    
    {/* Delete button */}
    {userInfo?.id === articleInfo?.create_by && (
      <>
      <div className="option-button">
      <div>
      <IconButton onClick={() => setOpenDialog(true)} size="large">
      <DeleteIcon fontSize="large" />
      </IconButton>
      </div>
      <div style={{ textAlign: "center", fontSize: "14px", color: "#ddd" }}>
      Delete
      </div>
      </div>
      </>
    )}
    
    {/* Confirmation Dialog */}
    
    
    
    {userInfo?.id === articleInfo?.create_by ? (
      <>
      <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
      >
      <DialogTitle id="delete-confirmation-title">
      Confirm Deletion
      </DialogTitle>
      <DialogContent>
      <DialogContentText id="delete-confirmation-description">
      Are you sure you want to delete this article? This action cannot be
      undone.
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={() => setOpenDialog(false)} color="primary">
      Cancel
      </Button>
      <Button
      onClick={() => {
        deleteArticle();
        setOpenDialog(false);
      }}
      color="error"
      autoFocus
      >
      Delete
      </Button>
      </DialogActions>
      </Dialog>
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
    onClose={() => setOpenErr(false)}
    open={openErr}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
    <Alert onClose={() => setOpenErr(false)} severity="error" sx={{ width: "100%" }}>
    {errorMessage}
    </Alert>
    </Snackbar>
    
    <Snackbar
    open={openInfo}
    autoHideDuration={2000}
    onClose={() => setOpenInfo(false)}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
    <Alert severity="success" onClose={() => setOpenInfo(false)}  sx={{ width: "100%" }}>
    {infoMessage}
    </Alert>
    </Snackbar>
    
    </Container>
  );
}

export default ArticleDetail;
