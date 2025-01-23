package com.yuki.community.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Comment;
import com.yuki.common.domain.entity.Dto.CommentDto;
import com.yuki.common.service.CommentService;

@RestController
@RequestMapping("/Comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    /**
     * 添加评论
     * @param comment
     * @return
     */
    @PostMapping("/add")
    public ResponseResult addComment(@RequestBody Comment comment){
        return commentService.AddComment(comment);
    }

    /**
     * 删除评论
     * @param id
     * @return
     */
    @DeleteMapping("/del/{id}")
    public ResponseResult deleteComment(@PathVariable("id")Long id){
        return commentService.deleteComment(id);
    }

    /**
     * 回复评论
     * @param comment
     * @return
     */
    @PostMapping("/reply")
    public ResponseResult relayComment(@RequestBody Comment comment){
        return commentService.relayComment(comment);
    }


    /**
     * 获取某篇文章下的置顶评论(分页)
     * @param articleId
     * @param pageNum
     * @param pageSize
     * @return
     */
    @GetMapping("/article/{id}")
    public ResponseResult findAll(@PathVariable("id") Long articleId,
                                  @RequestParam(defaultValue = "1") int pageNum,
                                  @RequestParam(defaultValue = "10") int pageSize){
        PageInfo<CommentDto> dtoPageInfo = commentService.findAll(articleId,pageNum,pageSize);
        return ResponseResult.okResult(200,"success",dtoPageInfo);
    }


    /**
     *  点赞评论 或 取消点赞评论
      * @param commentId
     * @return
     */
    @PostMapping("/like/{id}")
    public ResponseResult likeOrUnlikeComment(@PathVariable("id") Long commentId){
        return commentService.likeOrUnlikeComment(commentId);
    }




}
