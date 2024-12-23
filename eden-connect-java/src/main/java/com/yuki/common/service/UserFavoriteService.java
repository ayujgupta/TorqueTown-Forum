package com.yuki.common.service;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.ArticleDto;

public interface UserFavoriteService {
    ResponseResult addFavorite(Long articleId);

    ResponseResult removeFavorite(Long articleId);

    PageInfo<ArticleDto> findAll(int pageNum, int pageSize);
}
