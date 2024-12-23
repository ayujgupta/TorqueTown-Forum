package com.yuki.common.repository;

import com.yuki.common.domain.entity.User;
import com.yuki.common.mapper.UserMapper;
import com.yuki.common.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional
public class UserRepository {

    @Autowired
    UserMapper userMapper;

    public User getUserById(Long id){
        User oneById = userMapper.findOneById(id);
        return oneById;
    }

    public User GetUserByUsername(String username){
        User oneByUsername = userMapper.findOneByUsername(username);
        return oneByUsername;
    }

    public User GetUserByEmail(String email){
        User oneByEmail = userMapper.findOneByEmail(email);
        return oneByEmail;
    }

    public List<String> getUserPermissionsById(Long id){
        List<String> strings = userMapper.selectPermsByUserId(id);
        return strings;
    }

    public boolean save(User registerUser) {
        return userMapper.save(registerUser);
    }

    public void setLastLogin(Long userId,LocalDateTime now) {
        userMapper.updateUpdateTime(userId,now);
    }
}
