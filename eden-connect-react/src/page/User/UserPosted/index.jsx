import { Typography, useMediaQuery, Pagination, Snackbar,Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArticleCard from "../../../components/ArticleList/ArticleCard";

import style from "./index.module.css";
import { useEffect, useState } from "react";
import { useAxios } from "../../../utils";

function UserPosted({ userId }) {
  const axiosInstance = useAxios();
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openErr, setOpenErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // 通过userId获取当前用户发布的文章
  
  function pageChange(event, value) {
    setCurrentPage((e) => value);
  }
  
  useEffect(() => {
    setIsLoading(true);
    axiosInstance
    .get(`/article/byUserId?userId=${userId}&pageNum=${currentPage}`)
    .then((res) => {
      const tokenError = res.headers['token-error'];
      if(!tokenError){
        if (res.data.code === 200) {
          setArticleList((e) => res.data.data.list);
          setTotalPage(res.data.data.pages);
          setIsLoading(false);
        } else {
          console.log("获取用户发布的文章时发生错误");
        }
      }else{
        console.log(tokenError);
        setOpenErr(true);
        setErrorMessage(tokenError);
      }
    });
  }, [userId, currentPage]);
  
  return (
    <div id="account-posted">
    <div className="account-posted-title">
    <Typography variant="h5" className="title">
    Articles
    </Typography>
    </div>
    <div className="posted-list">
    {!isLoading ? (
      <>
      {/* todo 当小屏幕时，让size 3 变成 6 */}
      <Grid container spacing={2}>
      {articleList.map((item) => (
        <Grid key={item.id} size={isSmallScreen ? 6 : 3}>
        <ArticleCard article={item}></ArticleCard>
        </Grid>
      ))}
      </Grid>
      </>
    ) : null}
    
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
    </div>
    </div>
  );
}

export default UserPosted;
