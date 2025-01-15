package com.yuki.community.Controller;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Article;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import com.yuki.common.service.ArticleService;
import com.yuki.common.utils.JwtUtil;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@SuppressWarnings("rawtypes")
@RestController
@RequestMapping("/article")
public class ArticleController {
    
    @Autowired
    ArticleService articleService;
    
    /**
    * 获取主页最新文章(分页)
    * @param pageNum
    * @param pageSize
    * @return
    */
    @GetMapping()
    public ResponseResult getArticles(@RequestParam(defaultValue = "1") int pageNum,
    @RequestParam(defaultValue = "10") int pageSize){
        PageInfo<ArticleDto> articles = articleService.getArticles(pageNum, pageSize);
        return ResponseResult.okResult(200,"success",articles);
    }
    
    /**
    * 获取某个文章的详情
    * @param articleId
    * @return
    */
    @GetMapping("view/{id}")
    public ResponseResult getArticleByArticleId(@PathVariable("id") Long articleId){
        Article article = articleService.findOneByArticleId(articleId);
        return ResponseResult.okResult(200,"success",article);
    }

    @GetMapping("edit/{id}")
    public ResponseResult editArticleByArticleId(@PathVariable("id") Long articleId){
        Article article = articleService.findOneByArticleId(articleId);
        return ResponseResult.okResult(200,"success",article);
    }
    
    /**
    * 获取用户发表的全部文章(分页)
    * @param pageNum
    * @param pageSize
    * @param userId
    * @return
    */
    @GetMapping("/byUserId")
    public ResponseResult getArticlesByUserId(@RequestParam(defaultValue = "1") int pageNum,
    @RequestParam(defaultValue = "10") int pageSize,
    @RequestParam Long userId){
        PageInfo<ArticleDto> articlesByUserId = articleService.getArticlesByUserId(pageNum,pageSize,userId);
        return ResponseResult.okResult(200,"success",articlesByUserId);
    }
    
    /**
    * 新增或修改文章
    * 如果里面的id为空，就是新增文章，如果存在id就是修改文章
    * @param article
    * @return
    */
    @PostMapping("/save")
    public ResponseResult saveArticle(@RequestBody Article article,HttpServletRequest request){
        return articleService.saveArticle(article);
    }
    
    // todo 上传文章
    @PostMapping("/upload/img")
    public ResponseResult uploadImage(@RequestParam("file") MultipartFile file){
        return articleService.uploadImage(file);
    }
    
    
    /**
    * 删除文章
    * @param articleId
    * @return
    */
    @DeleteMapping("delete/{id}")
    public ResponseResult deleteArticle(@PathVariable("id") Long articleId){
        return articleService.deleteArticle(articleId);
    }
    
    /**
    * 浏览文章（阅读量+1）
    * @param articleId
    * @return
    */
    @PutMapping("/viewcount/{id}")
    public ResponseResult viewArticle(@PathVariable("id") Long articleId){
        return articleService.viewArticle(articleId);
    }
    
    /**
    * 点赞或取消点赞文章
    * @param articleId
    * @return
    */
    @PostMapping("/like/{id}")
    public ResponseResult likeOrUnlikeArticle(@PathVariable("id") Long articleId){
        return articleService.likeOrUnlikeArticle(articleId);
    }
    
    // todo 获取昨日前3的热门文章
    
    /**
    * 获取置顶文章 根据时间判断，谁时间在最前面谁指定
    * @return
    */
    @GetMapping("/top")
    public ResponseResult getTopArticle(){
        return articleService.getTopArticle();
    }
    
    /**
    * 管理员置顶文章
    * @param articleId
    * @return
    */
    @PreAuthorize("hasAuthority('sys:root')")
    @PostMapping("/setTop/{articleId}")
    public ResponseResult setTopArticle(@PathVariable("articleId") Long articleId){
        return articleService.setTopArticle(articleId);
    }
    
    
    /**
    * 搜索文章
    * @param key
    * @param pageNum
    * @param pageSize
    * @return
    */
    @GetMapping("/search")
    public ResponseResult search(
    @RequestParam(defaultValue = "") String key,
    @RequestParam(defaultValue = "1") int pageNum,
    @RequestParam(defaultValue = "10") int pageSize){
        PageInfo<ArticleDto> articleList = articleService.search(key,pageNum,pageSize);
        return ResponseResult.okResult(200,"success",articleList);
    }
    
    /**
    * 获取管理员信息
    * @return
    */
    @GetMapping("/getAdminInfo")
    public ResponseResult getAdminInfo(){
        return articleService.getAdminInfo();
    }
    
}
