package com.yuki.common.repository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import com.yuki.common.domain.entity.Article;
import com.yuki.common.domain.entity.Articlelike;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import com.yuki.common.mapper.ArticleMapper;

@Repository
@Transactional

public class ArticleRepository {
    @Autowired
    ArticleMapper articleMapper;

    public Article findOneByArticleId(Long ArticleId){
        return articleMapper.findOne(ArticleId);
    }

    public boolean saveArticle(Article article){
        return articleMapper.saveOne(article);
    }

    public boolean updateArticle(Article article){
        return articleMapper.updateOne(article);
    }


    public boolean deleteArticle(Long articleId) {
        return articleMapper.deleteOne(articleId);
    }

    public boolean viewArticle(Long articleId) {
        return articleMapper.updateViewCount(articleId);
    }

    public boolean isExist(Long articleId){
        Article oneByArticleId = findOneByArticleId(articleId);
        return !ObjectUtils.isEmpty(oneByArticleId);
    }

    public boolean isLike(Long userId, Long articleId) {
        Articlelike articlelike = articleMapper.findLikeOne(userId,articleId);
        return !ObjectUtils.isEmpty(articlelike);
    }

    public boolean removeLike(Long id, Long articleId) {
        articleMapper.reduceLikeCount(articleId);
        return articleMapper.removeLikeOne(id,articleId);
    }

    public boolean addLike(Articlelike articlelike) {
        articleMapper.increaseLikeCount(articlelike.getArticleId());
        return articleMapper.saveLikeOne(articlelike);
    }

    public Long findUserIdByArticleId(Long articleId) {
        Article one = articleMapper.findOne(articleId);
        return one.getCreate_by();
    }

    public ArticleDto findTopOne() {
        return articleMapper.findTopOne();
    }

    public boolean setTopArticle(Long articleId,LocalDateTime now) {

        return articleMapper.updateOneSetTop(articleId,now);
    }
}
