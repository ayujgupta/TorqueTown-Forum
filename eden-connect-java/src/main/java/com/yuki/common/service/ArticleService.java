package com.yuki.common.service;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Article;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import org.springframework.web.multipart.MultipartFile;
@SuppressWarnings("rawtypes")
public interface ArticleService {

    public Article findOneByArticleId(Long articleId);

    public PageInfo<ArticleDto> getArticles(int pageNum,int pageSize);
    public PageInfo<ArticleDto> getArticlesByUserId(int pageNum,int pageSize,Long UserId);

    public ResponseResult saveArticle(Article article);

    ResponseResult deleteArticle(Long articleId);

    ResponseResult viewArticle(Long articleId);

    ResponseResult likeOrUnlikeArticle(Long articleId);

    PageInfo<ArticleDto> search(String key, int pageNum, int pageSize);

    ResponseResult getTopArticle();

    ResponseResult setTopArticle(Long articleId);

    ResponseResult getAdminInfo();

    ResponseResult uploadImage(MultipartFile file);
}
