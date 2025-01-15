/* eslint-disable react/prop-types */
import "./index.css";
import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Avatar,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Slide,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useStore } from "../../../store";
import { useAxios } from "../../../utils";
import { useParams } from "react-router-dom";

function Comment({ comment, currentPage, getComment, articleId }) {
  const axiosInstance = useAxios();
  // console.log(comment);
  const { userStore } = useStore();
  const { article_id } = useParams("id");
  const userInfo = userStore.getUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [commentInfo, setCommentInfo] = useState(comment);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [exist, setExist] = useState(true);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  /**
   * 删除评论
   */
  function delComment() {
    setIsLoading(true);
    axiosInstance
      .delete(`/Comment/del/${commentInfo.id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setExist(false);
        } else {
          setErrorMessage(res.data.msg);
          setOpenErr(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage("删除失败");
        setOpenErr(true);
        setIsLoading(false);
      });
  }

  /**
   * 关闭错误弹窗
   */
  function closeErrAlert() {
    setOpenErr(false);
  }

  /**
   * 关闭消息弹窗
   */
  function closeInfoAlert() {
    setOpenInfo(false);
  }

  /**
   * 切换回复框显示与隐藏
   */
  function toggleAccordion() {
    setIsAccordionOpen(!isAccordionOpen);
  }

  /**
   * 喜欢文章
   */
  function likeComment() {
    setIsLikeLoading(true);
    console.log("like");
    axiosInstance
      .post(`/Comment/like/${commentInfo.id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setCommentInfo((e) => ({
            ...commentInfo,
            like: !commentInfo.like,
            like_count: res.data.data.like_count,
          }));
        } else {
          setErrorMessage(res.data.msg);
          setOpenErr(true);
        }
        setIsLikeLoading(false);
      })
      .catch((err) => {
        setIsLikeLoading(false);
        setErrorMessage("点Like失败");
        setOpenErr(true);
      });
  }

  /**
   * 回复评论
   */
  function replyComment() {
    setIsReplyLoading(true);
    axiosInstance
      .post(`/Comment/reply`, {
        article_id: articleId,
        content: replyText,
        parent_id: commentInfo.id,
      })
      .then((res) => {
        if (res.data.code === 200) {
          getComment(articleId, currentPage);
          setReplyText("");
          setIsAccordionOpen(!isAccordionOpen);
        } else {
          setErrorMessage(res.data.msg);
          setOpenErr(true);
        }
        setIsReplyLoading(false);
      })
      .catch((err) => {
        setErrorMessage("回复失败");
        setOpenErr(true);
        setIsReplyLoading(false);
      });
  }

  return (
    <>
      {exist ? (
        <>
          <div className="comment-div">
            <Grid container spacing={1}>
              {/* 左侧：头像 */}
              <Grid>
                <Avatar alt="User" src={commentInfo.avatar} />
              </Grid>

              {/* 右侧：内容 */}
              <Grid size={10}>
                <Stack spacing={1}>
                  {/* 用户名和发布时间 */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      {commentInfo.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {commentInfo.create_time}
                    </Typography>
                  </Stack>

                  {/* 评论内容 */}
                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {commentInfo.content}
                  </Typography>

                  {/* 底部：点赞和回复按钮 */}
                  <Stack direction="row" spacing={1}>
                    {/* // todo 判断用户是否 like */}
                    <LoadingButton
                      onClick={likeComment}
                      loading={isLikeLoading}
                      startIcon={
                        commentInfo.like ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbUpOffAltIcon />
                        )
                      }
                      size="small"
                    >
                      Like ({commentInfo.like_count})
                    </LoadingButton>
                    <Button
                      onClick={toggleAccordion}
                      startIcon={<ChatIcon />}
                      size="small"
                    >
                      reply
                    </Button>
                    {userInfo?.id === commentInfo.user_id ? (
                      <LoadingButton
                        size="small"
                        onClick={delComment}
                        loading={isLoading}
                        startIcon={<DeleteIcon></DeleteIcon>}
                      >
                        删除
                      </LoadingButton>
                    ) : null}
                  </Stack>
                </Stack>
              </Grid>
              {isAccordionOpen && (
                <Accordion
                  expanded={isAccordionOpen}
                  onChange={toggleAccordion}
                  className="relay-accordion"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="reply-content"
                    id="reply-header"
                  >
                    <Typography>回复:{commentInfo.username}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <TextField
                        label="输入回复内容"
                        fullWidth
                        variant="outlined"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <LoadingButton
                        loading={isReplyLoading}
                        variant="contained"
                        onClick={replyComment}
                      >
                        发送回复
                      </LoadingButton>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>

            {commentInfo.replies
              ? commentInfo.replies.map((item) => (
                  <Comment
                    key={comment.replies.id}
                    articleId={articleId}
                    currentPage={currentPage}
                    getComment={getComment}
                    comment={item}
                  ></Comment>
                ))
              : null}

            {/* 错误消息栏 */}
            <Snackbar
              onClose={closeErrAlert}
              open={openErr}
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
        </>
      ) : null}
    </>
  );
}

export default Comment;
