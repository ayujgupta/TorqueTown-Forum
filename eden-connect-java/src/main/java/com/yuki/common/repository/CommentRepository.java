package com.yuki.common.repository;

import com.yuki.common.domain.entity.Comment;
import com.yuki.common.domain.entity.Commentlike;
import com.yuki.common.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

@Transactional
@Repository
public class CommentRepository {

    @Autowired
    CommentMapper commentMapper;

    public boolean save(Comment comment) {
        return commentMapper.save(comment);
    }

    public boolean isExist(Long id){
        Comment one = commentMapper.findOne(id);
        return !ObjectUtils.isEmpty(one);
    }

    public Comment findOne(Long id){
        return commentMapper.findOne(id);
    }

    public boolean deleteOne(Long id) {
        return commentMapper.removeOne(id);
    }

    public boolean isLike(Long userId, Long commentId) {
        Commentlike commentlike = commentMapper.findLikeOne(userId,commentId);
        return !ObjectUtils.isEmpty(commentlike);
    }

    public boolean removeLike(Long userId,Long commentId) {
        commentMapper.reduceLikeCount(commentId);
        return commentMapper.removeLikeOne(userId,commentId);
    }

    public boolean addLike(Commentlike commentlike) {
        commentMapper.IncreaseLikeCount(commentlike.getComment_id());
        return commentMapper.addLikeOne(commentlike);
    }
}
