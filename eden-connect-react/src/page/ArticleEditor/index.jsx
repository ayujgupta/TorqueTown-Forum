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
import {  setCurrentTheme, useAxios } from "../../utils";
import "./index.css";
import { useAuth } from "../../utils/TokenContext";
import Modal from "react-modal";


function ArticleEditor() {
  const axiosInstance = useAxios();
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
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
  const [thumbnailFile,setThumbnailFile]=useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef(null); 
  const {token }=useAuth();
  
  useEffect(() => {
    
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
      axiosInstance
      .get(`/article/edit/${id}`)
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
      .catch((err) => {
        console.log(err);
        setOpenErr(true);
        if (err instanceof Error) {
          setErrorMessage(err.message)
          setTimeout(() => navigate("/"), 2000);
          
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        setLoadingAnime(false);
      });
    }
  }, [id]);
  
  
  const handleContentChange = (value) => {
    setContent(value);
  };
  
  const handleImageUpload = async (e) => {
    try {
      const imgUrl= await uploadImageToBackend(e);
      if(imgUrl){
        setContent((c) => `${c}<img src="${imgUrl}" alt="Uploaded Image" />\n`);
      }
    } catch (exc) {
      console.log(exc);
      setErrorMessage("Image upload failed. Ensure size is below 5MB.");
      setOpenErr(true);
    } 
  };
  const handleThumbnailUpload = async (e) => {
    try {
      const imgUrl= await uploadImageToBackend(e);
      if(imgUrl){
        setOpenInfo(true);
        
        setThumbnail(imgUrl);
        setThumbnailFile(e.target.files[0].name);
        setInfoMessage("Thumbnail Added - "+e.target.files[0].name);
      }
    } catch (err) {
      console.log(err);
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
      
      const res = await axiosInstance.post("/article/upload/img", formData, {
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
      setOpenErr(true);
      if (err instanceof Error) {
        setErrorMessage(err.message); 
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      return null;
    } finally {
      setIsUploading(false);
    }
    
  };
  
  
  const handleSubmit = async () => {
    setIsSubmitLoading(true);
    // console.log(isSubmitLoading);
    try {
      const deltaContent = editorRef.current.getEditor().getContents();
      
      const res = await axiosInstance.post("/article/save", {
        id,
        title,
        content: JSON.stringify(deltaContent, null, 2),
        summary,
        thumbnail,
      });
      // console.log(res);
      if (res.data.code === 200) {
        // const tokenError = res.headers['token-error'];
        if(token){
          setOpenInfo(true);
          setInfoMessage(res.data.msg);
          setTitle("");
          setSummary("");
          setContent("");
          setTimeout(() => navigate("/"), 3000);
        }
        else{
          // console.log(tokenError);
          setOpenErr(true);
          setErrorMessage(res.headers['token-error']);
        }
      } else {
        console.log(res.data.msg);
        setOpenErr(true);
        setErrorMessage(res.data.msg);
      }
    } catch (err) {
      console.log("Inside catch block"+err);
      setOpenErr(true);
      if (err instanceof Error) {
        setErrorMessage(err.message);
        setTimeout(() => navigate("/"), 3000);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
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
    <div style={{ marginBottom: "20px" }}>
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
    Upload Image
    </LoadingButton>
    </label>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
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
    {thumbnail && (<><span style={{ marginRight: "5px", fontSize: "18px"}}>&#128206;</span><a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true); // Open the modal
          }}
          style={{
            color: "#bf0000",
            textDecoration: "underline",
            cursor: "pointer",
            // marginTop: "10px",
            display: "inline-block",
          }}
        >{thumbnailFile}</a>
    </>)}
   <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Image Preview"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000, // Overlay on top of all components
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%", // Medium box size
            height: "auto",
            padding: "10px",
            background: "#36323285",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "5px",
            }}
          />
        )}
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    
    </div>
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
