import { Typography, Pagination, Snackbar,Alert } from "@mui/material";
import Article from "./Article";
import style from "./index.module.css";
import { useEffect, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import { useAxios } from "../../utils";

function ArticleList() {
  const axiosInstance = useAxios();
  let [params] = useSearchParams();
  const key = params.get("key");
  const [searchKey, setSearchKey] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoading(true);
    if (!searchKey) {
      getArticle();
    } else {
      getArticleByKeyWord();
    }
  }, [currentPage, searchKey]);
  
  useEffect(() => {
    if (key !== searchKey) {
      setCurrentPage(1);
    }
    setSearchKey(key || "");
  }, [key]);
  
  /**
  * 分页按钮按下之后
  * @param {*} event
  * @param {*} value
  */
  function pageChange(event, value) {
    setCurrentPage((e) => value);
  }
  
  /**
  * 获取主页的文章
  */
  function getArticle() {
    axiosInstance.get(`/article?pageNum=${currentPage}`).then((res) => {
      const tokenError = res.headers['token-error'];
      // console.log(res);
      // if(!tokenError){
      // console.log(res.data);
      setTotalPage(res.data.data.pages);
      setArticleList(res.data.data.list);
      setIsLoading(false);
      if(tokenError){
        setOpenErr(true);
        setErrorMessage(tokenError+" Reauthenticate to use all features");

      }
    }).catch((err)=>{
      console.log(err);
    });
  }
  
  /**
  * 通过关键字搜索文章
  */
  function getArticleByKeyWord() {
    console.log(currentPage);
    
    axiosInstance
    .get(`/article/search?pageNum=${currentPage}&key=${searchKey}`)
    .then((res) => {
      setTotalPage(res.data.data.pages);
      setArticleList(res.data.data.list);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <>
    <Typography variant="h6">Latest Articles</Typography>
    <div className={style.articleList}>
    {!isLoading
      ? articleList.map((item) => (
        <Article key={item.id} article={item}></Article>
      ))
      : null}
      </div>
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
      <div className={style.Pagination}>
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
      </>
    );
  }
  
  export default ArticleList;
  