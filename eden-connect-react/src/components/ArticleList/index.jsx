import { Typography, Pagination } from "@mui/material";
import Article from "./Article";
import style from "./index.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { request } from "../../utils";

function ArticleList() {
  let [params] = useSearchParams();
  const key = params.get("key");
  const [searchKey, setSearchKey] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    request.get(`/article?pageNum=${currentPage}`).then((res) => {
      // console.log(res.data);
      setTotalPage(res.data.data.pages);
      setArticleList(res.data.data.list);
      setIsLoading(false);
    });
  }

  /**
   * 通过关键字搜索文章
   */
  function getArticleByKeyWord() {
    console.log(currentPage);

    request
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
      <Typography variant="h6">最新文章</Typography>
      <div className={style.articleList}>
        {!isLoading
          ? articleList.map((item) => (
              <Article key={item.id} article={item}></Article>
            ))
          : null}
      </div>
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
