package com.yuki.common.service;

import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Comment;
import com.yuki.common.domain.entity.Dto.CommentDto;

public interface CommentService {
    ResponseResult AddComment(Comment comment);

    ResponseResult deleteComment(Long id);

    ResponseResult relayComment(Comment comment);

    PageInfo<CommentDto> findAll(Long articleId, int pageNum, int pageSize);

    ResponseResult likeOrUnlikeComment(Long commentId);
}
