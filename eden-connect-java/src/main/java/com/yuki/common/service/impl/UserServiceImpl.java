package com.yuki.common.service.impl;

import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.domain.entity.User;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDto getUserById(Long id) {
        User userById = userRepository.getUserById(id);
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userById,userDto);
        return userDto;
    }

    @Override
    public List<String> selectPermsByUserId(Long id) {
        return userRepository.getUserPermissionsById(id);
    }
}
