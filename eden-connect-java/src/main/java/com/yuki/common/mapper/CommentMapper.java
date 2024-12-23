package com.yuki.common.mapper;

import com.yuki.common.domain.entity.Comment;
import com.yuki.common.domain.entity.Commentlike;
import com.yuki.common.domain.entity.Dto.CommentDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    boolean save(Comment comment);

    Comment findOne(Long id);

    List<CommentDto> findAll(@Param("articleId") Long ArticleId);

    boolean removeOne(Long id);

    List<CommentDto> findReplies(@Param("parentId")Long id);

    Commentlike findLikeOne(@Param("userId") Long userId,@Param("commentId") Long commentId);

    boolean removeLikeOne(@Param("userId") Long userId,@Param("commentId") Long commentId);

    boolean addLikeOne(Commentlike commentlike);

    void IncreaseLikeCount(@Param("commentId") Long comment_id);

    void reduceLikeCount(@Param("commentId")Long commentId);
}
