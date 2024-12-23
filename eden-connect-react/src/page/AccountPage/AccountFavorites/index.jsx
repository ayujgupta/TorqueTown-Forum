/* eslint-disable no-unused-vars */
import { Typography, useMediaQuery, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArticleCard from "../../../components/ArticleList/ArticleCard";
import { useState, useEffect } from "react";
import { request } from "../../../utils";

import style from "./index.module.css";

// todo 获取用户收藏的文章

function AccountFavorites() {
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    request
      .get(`/favorites/list?pageNum=${currentPage}`)
      .then((res) => {
        setArticle((e) => res.data.data.list);
        setTotalPage((e) => res.data.data.pages);
      })
      .catch((err) => {
        // 获取失败
      });
  }, [currentPage]);

  function pageChange(event, value) {
    setCurrentPage((e) => value);
  }

  return (
    <div id={style.accountFavorites}>
      <div className="account-favorites-title">
        <Typography variant="h5" className="title">
          我的收藏
        </Typography>
      </div>
      <div className={style.favoritesList}>
        <Grid container spacing={2}>
          {!isLoading
            ? article.map((item) => (
                <Grid size={isSmallScreen ? 6 : 3} key={item.id}>
                  {" "}
                  {/* 使用xs属性替代size */}
                  <ArticleCard article={item}></ArticleCard>
                </Grid>
              ))
            : null}
        </Grid>

        {article.length === 0 && (
          <div className={style.nullDiv}>未收藏任何文章</div>
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

export default AccountFavorites;
