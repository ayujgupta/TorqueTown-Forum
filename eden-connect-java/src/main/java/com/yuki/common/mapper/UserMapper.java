package com.yuki.common.mapper;

import com.yuki.common.domain.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface UserMapper {
    User findOneById(Long id);

    User findOneByUsername(String username);

    User findOneByEmail(String email);

    List<String> selectPermsByUserId(Long id);

    boolean save(User registerUser);

    User findAdmin();

    Long findCountByUserId(@Param("userId") Long id);

    void updateUpdateTime(@Param("userId")Long userId,@Param("now") LocalDateTime now);
}
