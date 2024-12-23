package com.yuki.common.service.impl;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Comment;
import com.yuki.common.domain.entity.Commentlike;
import com.yuki.common.domain.entity.Dto.CommentDto;
import com.yuki.common.domain.entity.User;
import com.yuki.common.mapper.CommentMapper;
import com.yuki.common.mapper.UserMapper;
import com.yuki.common.repository.ArticleRepository;
import com.yuki.common.repository.CommentRepository;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.CommentService;
import com.yuki.common.utils.UserUtil;
import lombok.experimental.Helper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserMapper userMapper;

    @Autowired
    ArticleRepository articleRepository;


    @Override
    public ResponseResult AddComment(Comment comment) {
        // 检查评论的文章id存不存在
        boolean exist = articleRepository.isExist(comment.getArticle_id());
        // 如果不存在报错
        if (!exist) {
            return ResponseResult.errorResult(500, "您要评论的文章不存在");
        }
        // 如果存在新增
        String currentEmail = UserUtil.getCurrentEmail();
        User user = userMapper.findOneByEmail(currentEmail);
        if(!StringUtils.hasText(comment.getContent())){
            return ResponseResult.okResult(400,"评论不能空");
        }
        comment.setUser_id(user.getId());
        comment.setCreate_time(LocalDateTime.now());
        boolean b = commentRepository.save(comment);
        if (b) {
            return ResponseResult.okResult(200, "评论成功!");
        } else {
            return ResponseResult.okResult(200, "评论失败!发生未知错误");
        }
    }

    @Override
    public ResponseResult deleteComment(Long id) {
        // 查看这个评论在不在
        Comment comment = commentRepository.findOne(id);
        // 如果不在，报错
        if (ObjectUtils.isEmpty(comment)) {
            return ResponseResult.errorResult(500, "评论不存在");
        }
        // 如果在,判断id是不是本人,或者是管理员
        String currentEmail = UserUtil.getCurrentEmail();
        User currentUser = userMapper.findOneByEmail(currentEmail);
        boolean action = false;
        if (Objects.equals(currentUser.getId(), comment.getUser_id())) {
            // 是本人，可以删除
            action = true;
        } else if (currentUser.getRole_id() == 1) {
            // 超级管理员，可以删除
            action = true;
        } else {
            Long authorId = articleRepository.findUserIdByArticleId(comment.getArticle_id());
            if (Objects.equals(authorId, currentUser.getId())) {
                // 文章作者，可以删除
                action = true;
            }
        }
        if (action) {
            boolean b = commentRepository.deleteOne(id);
            if (b) {
                return ResponseResult.okResult(200, "删除成功");
            } else {
                return ResponseResult.errorResult(500, "删除失败");
            }
        } else {
            return ResponseResult.errorResult(500, "权限不足，无法删除");
        }
    }

    @Override
    public ResponseResult relayComment(Comment comment) {
        User currentUser = userMapper.findOneByEmail(UserUtil.getCurrentEmail());
        if (ObjectUtils.isEmpty(currentUser)) {
            return ResponseResult.errorResult(403, "请登录");
        }

        System.out.println(comment.getArticle_id());

        // 判断文章存不存在
        Long articleId = comment.getArticle_id();
        boolean exist_article = articleRepository.isExist(articleId);
        if (!exist_article) {
            return ResponseResult.errorResult(500, "文章不存在");
        }
        // 判断要回复的评论存不存在
        Long parentId = comment.getParent_id();
        boolean exist_comment = commentRepository.isExist(parentId);
        if (!exist_comment) {
            return ResponseResult.errorResult(500, "评论不存在");
        }
        // 判断有没有少填内容
        if (!StringUtils.hasText(comment.getContent())) {
            return ResponseResult.errorResult(500, "请输入回复内容");
        }
        // 保存
        comment.setCreate_time(LocalDateTime.now());
        comment.setUser_id(currentUser.getId());
        boolean save = commentRepository.save(comment);
        if (save) {
            return ResponseResult.okResult(200, "回复成功！");
        } else {
            return ResponseResult.errorResult(500, "回复失败！");
        }
    }

    // todo 判断每个评论用户有没有点赞
    @Override
    public PageInfo<CommentDto> findAll(Long articleId, int pageNum, int pageSize) {
        // 判断文章是否存在
        boolean exist = articleRepository.isExist(articleId);
        if (!exist) {
            throw new RuntimeException("文章不存在");
        }
        // 获取分页(只获取pageSize数量的内容)
        List<CommentDto> commentList = commentMapper.findAll(articleId);
        // 遍历每个分页数据,获取每一个分页数据中的评论
        for (CommentDto commentDto : commentList) {
            try {
                User currentUser = userMapper.findOneByEmail(UserUtil.getCurrentEmail());
                boolean like = commentRepository.isLike(currentUser.getId(), commentDto.getId());
                commentDto.setLike(like);
            }catch (Exception e){
                //
            }

            List<CommentDto> replies = findReplies(commentDto.getId());
            commentDto.setReplies(replies);
        }
        // 返回数据
        return new PageInfo<>(commentList);
    }

    @Override
    public ResponseResult likeOrUnlikeComment(Long commentId) {
        // 获取当前用户信息
        String currentEmail = UserUtil.getCurrentEmail();
        User user = userRepository.GetUserByEmail(currentEmail);
        if (ObjectUtils.isEmpty(user)) {
            return ResponseResult.errorResult(500, "用户尚未登录");
        }
        // 判断表中是否存在记录，如果不存在就是还没点赞
        boolean isLike = commentRepository.isLike(user.getId(), commentId);
        if (isLike) {
            // 取消点赞
            boolean remove = commentRepository.removeLike(user.getId(), commentId);
            if (remove) {
                Comment one = commentRepository.findOne(commentId);
                return ResponseResult.okResult(200, "取消点赞成功",one);
            } else {
                return ResponseResult.errorResult(500, "取消点赞失败");
            }
        } else {
            // 点赞
            Commentlike commentlike = new Commentlike();
            commentlike.setUser_id(user.getId());
            commentlike.setComment_id(commentId);
            commentlike.setCreate_time(LocalDateTime.now());
            boolean add = commentRepository.addLike(commentlike);
            if (add) {
                Comment one = commentRepository.findOne(commentId);
                return ResponseResult.okResult(200, "点赞成功",one);
            } else {
                return ResponseResult.okResult(500, "点赞失败");
            }
        }
    }

    private List<CommentDto> findReplies(Long parentId) {
        List<CommentDto> replies = commentMapper.findReplies(parentId);
        // 递归每一个子项中的子项
        for (CommentDto reply : replies) {
            try {
                User currentUser = userMapper.findOneByEmail(UserUtil.getCurrentEmail());
                boolean like = commentRepository.isLike(currentUser.getId(), reply.getId());
                reply.setLike(like);
            }catch (Exception e){

            }
            List<CommentDto> child = findReplies(reply.getId());
            reply.setReplies(child);
        }
        return replies;
    }
}
