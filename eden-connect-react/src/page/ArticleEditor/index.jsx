import React, { useState, useEffect } from "react";
import {
  Backdrop,
  TextField,
  Typography,
  Container,
  Paper,
  Input,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CloudUpload } from "@mui/icons-material";
import { marked } from "marked";
import axios from "axios";

import { LoadingButton } from "@mui/lab";
import { getToken, request } from "../../utils";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";

function ArticleEditor() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loadingAnime, setLoadingAnime] = useState(false);

  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  function closeErrAlert() {
    setOpenErr(false);
  }

  function closeInfoAlert() {
    setOpenInfo(false);
  }

  /**
   * 提交文章
   */
  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    request
      .post("/article/save", {
        id: id,
        title: title,
        content: content,
        summary: summary,
      })
      .then((res) => {
        if (res.data.code === 200) {
          setOpenInfo(true);
          setInfoMessage(res.data.msg);
          setContent("");
          setTitle("");
          setSummary("");
        } else {
          setOpenErr(true);
          setErrorMessage(res.data.msg);
        }
        setIsSubmitLoading(false);
      })
      .catch((err) => {
        setOpenErr(true);
        setErrorMessage(err);
        setIsSubmitLoading(false);
      });
  };

  // 生成Markdown预览
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    // setPreview(marked(newContent)); // 转换为 HTML
  };

  // 图片上传 , 如果上传成功后,把图片url返回给content
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    request
      .post("/article/upload/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          // 把返回的 图片链接 组成 markdown格式，添加到 Content里面
          const imgUrl = res.data.data;
          const markdownImage = `![${imgUrl.split("/").pop()}](${imgUrl})\n`;
          setContent((c) => c + markdownImage);
        } else {
          setErrorMessage(res.data.msg);
          setOpenErr(true);
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage(err.message);
        setErrorMessage("图片大小必须小于5MB");
        setOpenErr(true);
      });

    setIsUploading(false);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoadingAnime(true);
      // 提示未登录
      setErrorMessage("用户尚未登录,2秒后返回主页...");
      setOpenErr(true);
      // 返回 /
      setTimeout(() => {
        navigate("/"); // 延时跳转到根目录
        setLoadingAnime(false);
      }, 2000); // 2秒后跳转
    }
  });

  useEffect(() => {
    if (content !== undefined && content !== null) {
      setPreview(marked(content)); // 假设预览直接渲染content内容
    }
  }, [content]);

  useEffect(() => {
    // 控制加载动画
    setLoadingAnime(true);
    if (id !== undefined && id !== null) {
      // 获取文章内容
      request
        .get(`/article/${id}`)
        .then((res) => {
          if (res.data.code === 200) {
            setTitle(res.data.data.title);
            setContent(res.data.data.content);
            setSummary(res.data.data.summary);
          } else {
            setErrorMessage(res.data.msg);
            setOpenErr(true);
          }
          setLoadingAnime(false);
        })
        .catch((err) => {
          setErrorMessage("获取文章信息失败");
          setOpenErr(true);
          setLoadingAnime(false);
        });
    } else {
      setLoadingAnime(false);
      return;
    }
  }, [id]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          发表文章
        </Typography>

        {/* 标题 */}
        <TextField
          label="文章标题"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 简介 */}
        <TextField
          label="文章简介"
          variant="outlined"
          fullWidth
          margin="normal"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        {/* Markdown 编辑 */}
        <TextField
          label="文章内容（支持Markdown格式）"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          margin="normal"
          value={content}
          onChange={handleContentChange}
        />

        {/* 图片上传 */}
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <Input
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <LoadingButton
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUpload />}
                loading={isUploading}
                sx={{
                  ".MuiLoadingButton-loadingIndicator": {
                    color: "white",
                  },
                }}
              >
                上传图片
              </LoadingButton>
            </label>
          </Grid>
          <Grid>
            {isUploading ? (
              <CircularProgress size={24} />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="上传的图片"
                style={{ width: "100px", height: "100px", borderRadius: "4px" }}
              />
            ) : null}
          </Grid>
        </Grid>

        {/* 预览 */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          预览
        </Typography>
        <Paper
          variant="outlined"
          style={{
            padding: "2px",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div
            className="preview-div"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </Paper>

        {/* 提交按钮 */}
        <LoadingButton
          loading={isSubmitLoading}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          sx={{
            ".MuiLoadingButton-loadingIndicator": {
              color: "white",
            },
          }}
        >
          提交文章
        </LoadingButton>
      </Paper>
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
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loadingAnime}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default ArticleEditor;
