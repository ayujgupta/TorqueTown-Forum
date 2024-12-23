package com.yuki.common.service;

import com.yuki.common.domain.entity.Dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getUserById(Long id);

    List<String> selectPermsByUserId(Long id);

}
