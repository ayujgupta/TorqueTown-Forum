package com.yuki.common.service.impl.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.yuki.common.domain.entity.LoginUser;
import com.yuki.common.domain.entity.User;
import com.yuki.common.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 根据邮箱查询用户信息
        User user = userRepository.GetUserByEmail(email);
        if(ObjectUtils.isEmpty(user)){
            throw new RuntimeException("Wrong username or password");
        }
        // Get User Permissions
        List<String> list = userRepository.getUserPermissionsById(user.getId());
        //封装成UserDetails对象返回 
        return new LoginUser(user,list);
    }
}