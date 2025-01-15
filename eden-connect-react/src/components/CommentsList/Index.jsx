/* eslint-disable react/prop-types */
import Comment from "./Comment";
import {
  Typography,
  Avatar,
  TextField,
  Button,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useAxios } from "../../utils";
import { useStore } from "../../store";

import "./index.css";

function CommentsList({ articleId }) {
  const axiosInstance = useAxios();
  const { userStore } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentUpdate, setCommentUpdate] = useState(false);
  const userInfo = userStore.getUser();

  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  function pageChange(event, value) {
    setCurrentPage(value);
  }

  useEffect(() => {
    setIsLoading(true);
    getArticleComment(articleId, currentPage);
    setIsLoading(false);
  }, [articleId, currentPage, commentUpdate]);

  function getArticleComment(articleId, currentPage) {
    axiosInstance
      .get(`/Comment/article/${articleId}?pageNum=${currentPage}`)
      .then((res) => {
        if (res.data.code === 200) {
          // console.log(res.data.data);
          setCurrentPage(res.data.data.pageNum);
          setTotalPage(res.data.data.pages);
          setCommentList(res.data.data.list);
        }
      });
  }

  function sendComment() {
    axiosInstance
      .post("/Comment/add", { article_id: articleId, content: comment.trim() })
      .then((res) => {
        if (res.data.code === 200) {
          setOpenInfo(true);
          setInfoMessage(res.data.msg);
          setCommentUpdate(!commentUpdate);
          setComment("");
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage("发送评论失败");
      });
  }

  function closeErrAlert() {
    setOpenErr(false);
  }

  function closeInfoAlert() {
    setOpenInfo(false);
  }

  return (
    <div id="comment-list">
      {/* // todo 发表评论 */}
      <div className="post-comment-div">
        <Typography
          className="post-comment-info"
          variant="caption"
          color="textSecondary"
        >
          <span>
            <Avatar
              sx={{ width: 30, height: 30, marginRight: 1 }}
              alt=""
              src={userInfo?.avatar}
            />
            {userInfo?.username}
          </span>
        </Typography>
        <div className="input-div">
          <TextField
            id="outlined-multiline-static"
            label="Please enter a comment.."
            multiline
            fullWidth
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <div className="post-commend-div">
          <Button
            onClick={sendComment}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Leave a Comment
          </Button>
        </div>
      </div>
      <div>
        {!isLoading
          ? commentList.map((item) => (
              <Comment
                key={item.id}
                comment={item}
                articleId={articleId}
                currentPage={currentPage}
                getComment={getArticleComment}
              ></Comment>
            ))
          : null}
      </div>
      <div className="Pagination">
        {/* 使用分页 */}
        <Pagination
          count={totalPage}
          page={currentPage}
          color="secondary"
          showFirstButton
          showLastButton
          onChange={pageChange}
        />
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
      {/* 信息消息栏 */}
      <Snackbar
        onClose={closeInfoAlert}
        open={openInfo}
        autoHideDuration={3000}
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
    </div>
  );
}

export default CommentsList;
