import React, { useState, useEffect,useRef } from "react";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

import { getToken, request } from "../../utils";
import "./index.css";


function ArticleEditor() {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      // ['link', 'image'],
      ['blockquote', 'code-block'],
      [{ align: [] }],
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize'],
    },
  };
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [loadingAnime, setLoadingAnime] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const editorRef = useRef(null); 
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoadingAnime(true);
      setErrorMessage("User not logged in. Redirecting to homepage...");
      setOpenErr(true);
      setTimeout(() => navigate("/"), 2000);
      setLoadingAnime(false);
    }
  }, [navigate]);
  
  useEffect(() => {
    if (id) {
      setLoadingAnime(true);
      request
      .get(`/article/${id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setTitle(res.data.data.title);
          setContent(JSON.parse(res.data.data.content));
          setThumbnail(res.data.data.thumbnail);
          setSummary(res.data.data.summary);
        } else {
          setErrorMessage(res.data.msg);
          setOpenErr(true);
        }
        setLoadingAnime(false);
      })
      .catch(() => {
        setErrorMessage("Failed to fetch article details.");
        setOpenErr(true);
        setLoadingAnime(false);
      });
    }
  }, [id]);

  // const getModifiedContentBody-()
  
  const handleContentChange = (value) => {
    setContent(value);
    // const deltaContent = editorRef.current.getEditor().getContents();
    // console.log("Delta Content: ", JSON.stringify(delta, null, 2));
  };
  
  const handleImageUpload = async (e) => {
    try {
      console.log("inside image upload");
      const imgUrl= await uploadImageToBackend(e);
      
      if(imgUrl!==""){
        setContent((c) => `${c}<img src="${imgUrl}" alt="Uploaded Image" />\n`);
        
      }
    } catch (err) {
      setErrorMessage("Image upload failed. Ensure size is below 5MB.");
      setOpenErr(true);
    } 
  };
  const handleThumbnailUpload = async (e) => {
    try {
      // console.log("inside thumbnail upload");
      const imgUrl= await uploadImageToBackend(e);
      if(imgUrl!==""){
        setOpenInfo(true);
        // console.log(imgUrl);
        setThumbnail(imgUrl);
        setInfoMessage("Thumbnail Added - "+e.target.files[0].name);
        // console.log(openInfo+" "+infoMessage);
        // alert("Thumbnail Added");
      }
    } catch (err) {
      setErrorMessage("Thumbnail upload failed. Ensure size is below 5MB.");
      setOpenErr(true);
    } 
  };
  const uploadImageToBackend = async (e) =>{
    let imgUrl="";
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await request.post("/article/upload/img", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.code === 200) {
        imgUrl = res.data.data;
        
      } else {
        setErrorMessage(res.data.msg);
        setOpenErr(true);
      }
      return imgUrl;
    } catch (err) {
      console.log(err);
      // setErrorMessage("Image upload failed. Ensure size is below 5MB.");
      // setOpenErr(true);
    } finally {
      setIsUploading(false);
    }
    
  };


const handleSubmit = async () => {
  setIsSubmitLoading(true);
  console.log(isSubmitLoading);
  try {
    // Make sure the editor is ready before calling getEditor()
    // if (editorRef.current) {
    // Get the Delta format from the ReactQuill editor
    const deltaContent = editorRef.current.getEditor().getContents();
    // console.log("DeltaContent: ", deltaContent);
    // console.log("Delta Content: ", JSON.stringify(deltaContent, null, 2));
    // }
    // throw "Too big"; 
    const res = await request.post("/article/save", {
      id,
      title,
      content: JSON.stringify(deltaContent, null, 2),
      summary,
      thumbnail,
    });
    
    if (res.data.code === 200) {
      setOpenInfo(true);
      setInfoMessage(res.data.msg);
      setTitle("");
      setSummary("");
      setContent("");
      setTimeout(() => navigate("/"), 1000);
    } else {
      setOpenErr(true);
      setErrorMessage(res.data.msg);
    }
  } catch (err) {
    setOpenErr(true);
    setErrorMessage("Failed to save the article."+err);
  } finally {
    setIsSubmitLoading(false);
  }
};

return (
  <Container maxWidth="md">
  <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
  <Typography variant="h5" gutterBottom>
  Create or Edit Article
  </Typography>
  
  <TextField
  label="Title"
  variant="outlined"
  fullWidth
  margin="normal"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  />
  
  <TextField
  label="Summary"
  variant="outlined"
  fullWidth
  margin="normal"
  value={summary}
  onChange={(e) => setSummary(e.target.value)}
  />
  
  <Typography variant="h6" style={{ marginTop: "20px" }}>
  Content
  </Typography>
  <ReactQuill
  ref={editorRef} 
  theme="snow"
  value={content}
  onChange={handleContentChange}
  modules={modules}
  style={{ height: "400px", marginBottom: "20px" }}
  />
  <label htmlFor="content-upload-button">
  <input
    id="content-upload-button"
    type="file"
    style={{ display: "none" }}
    onChange={handleImageUpload}
  />
  <LoadingButton
    variant="contained"
    color="primary"
    component="span"
    startIcon={<CloudUpload />}
    loading={isUploading}
  >
    Upload Content Image
  </LoadingButton>
</label>

{/* Thumbnail Upload */}
<label htmlFor="thumbnail-upload-button">
  <input
    id="thumbnail-upload-button"
    type="file"
    style={{ display: "none" }}
    onChange={handleThumbnailUpload}
  />
  <LoadingButton
    variant="contained"
    color="primary"
    component="span"
    startIcon={<CloudUpload />}
    loading={isUploading}
  >
    Upload Thumbnail
  </LoadingButton>
</label>
  
  <LoadingButton
  loading={isSubmitLoading}
  loadingPosition="center"
  onClick={handleSubmit}
  variant="contained"
  color="primary"
  fullWidth
  style={{ marginTop: "20px" }}
  >
  Submit Article
  </LoadingButton>
  </Paper>
  
  <Snackbar
  open={openErr}
  autoHideDuration={3000}
  onClose={() => setOpenErr(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
  <Alert severity="error" onClose={() => setOpenErr(false)}>
  {errorMessage}
  </Alert>
  </Snackbar>
  
  <Snackbar
  open={openInfo}
  autoHideDuration={3000}
  onClose={() => setOpenInfo(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
  <Alert severity="success" onClose={() => setOpenInfo(false)}>
  {infoMessage}
  </Alert>
  </Snackbar>
  
  <Backdrop
  open={loadingAnime}
  style={{ color: "#fff", zIndex: 9999 }}
  >
  <CircularProgress color="inherit" />
  </Backdrop>
  </Container>
);

}

export default ArticleEditor;
