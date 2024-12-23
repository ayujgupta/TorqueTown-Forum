package com.yuki.common.mapper;

import com.yuki.common.domain.entity.Article;
import com.yuki.common.domain.entity.Articlelike;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface ArticleMapper {
    Article findOne(@Param("ArticleId") Long ArticleId);
    List<ArticleDto> findAll();
    List<ArticleDto> findAllByUserId(Long userId);
    boolean saveOne(Article article);
    boolean updateOne(Article article);
    boolean deleteOne(Long articleId);
    boolean updateViewCount(Long articleId);

    boolean increaseLikeCount(Long articleId);
    boolean reduceLikeCount(Long articleId);

    Articlelike findLikeOne(@Param("userId") Long userId,@Param("articleId") Long articleId);

    boolean saveLikeOne(Articlelike articlelike);

    boolean removeLikeOne(@Param("userId") Long id,@Param("articleId") Long articleId);

    List<ArticleDto> findAllByKeyWord(@Param("keyword") String key);

    ArticleDto findTopOne();

    boolean updateOneSetTop(@Param("articleId") Long articleId,@Param("time") LocalDateTime time);
}
