package com.yuki.community.Controller;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import com.yuki.common.service.UserFavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favorites")
public class UserFavoriteController {

    @Autowired
    UserFavoriteService userFavoriteService;

    /**
     * 添加收藏
     * @param articleId
     * @return
     */
    @PostMapping("/add/{id}")
    public ResponseResult addFavorite(@PathVariable("id") Long articleId){
        return userFavoriteService.addFavorite(articleId);
    }

    /**
     * 移除收藏
     * @param articleId
     * @return
     */
    @PostMapping("/remove/{id}")
    public ResponseResult removeFavorite(@PathVariable("id") Long articleId){
        return userFavoriteService.removeFavorite(articleId);
    }

    /**
     * 获取某个用户的收藏列表
     * @param pageNum
     * @param pageSize
     * @return
     */
    @GetMapping("/list")
    public ResponseResult getFavoriteList(@RequestParam(defaultValue = "1") int pageNum,
                                          @RequestParam(defaultValue = "10") int pageSize){

        PageInfo<ArticleDto> articlesByUserId = userFavoriteService.findAll(pageNum,pageSize);
        return ResponseResult.okResult(200,"success",articlesByUserId);
    }

}
