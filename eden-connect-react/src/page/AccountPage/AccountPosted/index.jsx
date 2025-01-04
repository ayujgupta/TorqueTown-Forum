import { Typography, useMediaQuery, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArticleCard from "../../../components/ArticleList/ArticleCard";

import style from "./index.module.css";
import { useEffect, useState } from "react";
import { request } from "../../../utils";
import { useStore } from "../../../store";

function AccountPosted() {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const { userStore } = useStore();
  const userInfo = userStore.getUser();

  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    request
      .get(`/article/byUserId?pageNum=${currentPage}&userId=${userInfo.id}`)
      .then((res) => {
        setArticle(res.data.data.list);
        setTotalPage(res.data.data.pages);
      })
      .catch((err) => {
        // 获取文章列表错误
      });
  }, [currentPage, userInfo]);

  function pageChange(event, value) {
    setCurrentPage((e) => value);
  }

  return (
    <div id={style.accountPosted}>
      <div className="account-posted-title">
        <Typography variant="h5" className="title">
          My Articles
        </Typography>
      </div>
      <div className={style.postedList}>
        {/* todo 当小屏幕时，让size 3 变成 6 */}
        <Grid container spacing={2}>
          {!isLoading
            ? article.map((item) => (
                <Grid key={item.id} size={isSmallScreen ? 6 : 3}>
                  <ArticleCard key={item.id} article={item}></ArticleCard>
                </Grid>
              ))
            : null}
        </Grid>

        {article.length === 0 && (
          <div className={style.nullDiv}>No Favourite Articles</div>
        )}

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

export default AccountPosted;
