package com.yuki.common.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import com.yuki.common.domain.entity.User;
import com.yuki.common.domain.entity.UserFavorite;
import com.yuki.common.mapper.UserFavoriteMapper;
import com.yuki.common.repository.ArticleRepository;
import com.yuki.common.repository.UserFavoriteRepository;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.UserFavoriteService;
import com.yuki.common.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserFavoriteServiceImpl implements UserFavoriteService {

    @Autowired
    UserFavoriteRepository userFavoriteRepository;
    @Autowired
    UserFavoriteMapper userFavoriteMapper;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseResult addFavorite(Long articleId) {
        // 判断 文章存不存在
        boolean exist_article = articleRepository.isExist(articleId);
        if(!exist_article){
            return ResponseResult.errorResult(500,"article is not exist");
        }
        // 获取当前用户
        String currentEmail = UserUtil.getCurrentEmail();
        User user = userRepository.GetUserByEmail(currentEmail);
        // 判断当前用户是否已经收藏了文章
        boolean exist_user_favorite = userFavoriteRepository.isExist(user.getId(),articleId);

        if(exist_user_favorite){
            return ResponseResult.errorResult(500,"您已经收藏该文章了,无需再次收藏");
        }
        UserFavorite userFavorite = new UserFavorite();
        userFavorite.setUserId(user.getId());
        userFavorite.setArticleId(articleId);
        userFavorite.setCreateTime(LocalDateTime.now());
        // 收藏文章
        boolean b = userFavoriteRepository.save(userFavorite);
        if(b){
            return ResponseResult.okResult(200,"收藏成功");
        }else{
            return ResponseResult.okResult(500,"unknown error");
        }
    }

    @Override
    public ResponseResult removeFavorite(Long articleId) {
        boolean exist_article = articleRepository.isExist(articleId);
        if(!exist_article){
            return ResponseResult.errorResult(500,"article is not exist");
        }
        // 获取当前用户
        String currentEmail = UserUtil.getCurrentEmail();
        User user = userRepository.GetUserByEmail(currentEmail);
        boolean exist_user_favorite = userFavoriteRepository.isExist(user.getId(),articleId);
        // 判断当前用户是否已经收藏了文章
        if(!exist_user_favorite){
            return ResponseResult.errorResult(500,"您还没有收藏这篇文章呢");
        }
        // 移除文章
        boolean b = userFavoriteRepository.remove(user.getId(),articleId);
        if(b){
            return ResponseResult.okResult(200,"success");
        }else{
            return ResponseResult.errorResult(500,"unknown error");
        }
    }

    @Override
    public PageInfo<ArticleDto> findAll(int pageNum, int pageSize) {
        String currentEmail = UserUtil.getCurrentEmail();
        User user = userRepository.GetUserByEmail(currentEmail);
        PageHelper.startPage(pageNum,pageSize);
        List<ArticleDto> articleList = userFavoriteMapper.findAllByUserId(user.getId());
        return new PageInfo<>(articleList);
    }
}
