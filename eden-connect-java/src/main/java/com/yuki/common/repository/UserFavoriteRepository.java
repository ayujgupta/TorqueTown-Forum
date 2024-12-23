package com.yuki.common.repository;

import com.yuki.common.domain.entity.UserFavorite;
import com.yuki.common.mapper.ArticleMapper;
import com.yuki.common.mapper.UserFavoriteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;


@Repository
@Transactional
public class UserFavoriteRepository {

    @Autowired
    UserFavoriteMapper userFavoriteMapper;

    @Autowired
    ArticleMapper articleMapper;

    public boolean isExist(Long userId, Long articleId) {
        UserFavorite userFavorite = userFavoriteMapper.findOne(userId,articleId);
        return !ObjectUtils.isEmpty(userFavorite);
    }

    public boolean save(UserFavorite userFavorite) {
        return userFavoriteMapper.save(userFavorite);
    }

    public boolean remove(Long userId, Long articleId) {
        return userFavoriteMapper.remove(userId,articleId);
    }

}
