package com.yuki.common.mapper;

import com.yuki.common.domain.entity.Dto.ArticleDto;
import com.yuki.common.domain.entity.UserFavorite;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserFavoriteMapper {

    UserFavorite findOne(@Param("userId") Long userId,@Param("articleId") Long articleId);

    boolean save(UserFavorite userFavorite);

    boolean remove(@Param("userId") Long userId,@Param("articleId") Long articleId);

    List<ArticleDto> findAllByUserId(Long userId);
}
