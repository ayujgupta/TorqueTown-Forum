/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid2";
import { Stack, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import "./index.css";

function Article({ article }) {
  // console.log(article);
  return (
    <>
      <div className="article">
        <Grid container spacing={2}>
          <Grid size={4}>
            <Link to={`/article/${article.id}`}>
              <img
                className="article-list-image"
                loading="lazy"
                src={article.thumbnail}
                alt=""
              />
            </Link>
          </Grid>
          <Grid size={8}>
            <Stack spacing={3}>
              {/* Title */}
              <div>
                <Typography
                  className="article-list-title"
                  variant="h5"
                  component="h2"
                >
                  <Link className="my-link" to={`/article/${article.id}`}>
                    {article.title}
                  </Link>
                </Typography>
              </div>

              {/* Introduction */}
              <div>
                <Typography className="article-list-subtitle" variant="body1">
                  {article.summary}
                </Typography>
              </div>

              {/* 作者信息与文章信息 */}
              <div className="article-list-info-div">
                <Typography
                  className="article-list-info"
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <Link to={`/user/${article.create_by}`}>
                      <Avatar
                        sx={{ width: 24, height: 24, marginRight: 1 }}
                        alt=""
                        src={article.avatar}
                      />
                    </Link>
                    {article.username}
                  </span>{" "}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span> {article.create_time}</span> &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span>Read By: {article.view_count}</span>
                </Typography>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </div>
      {/* <Divider sx={{ borderColor: "#2e3553 " }}></Divider> */}
    </>
  );
}

export default Article;
