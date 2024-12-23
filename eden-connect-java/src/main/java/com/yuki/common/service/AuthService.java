package com.yuki.common.service;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.User;
import com.yuki.common.domain.entity.Dto.UserRegisterDto;
@SuppressWarnings("rawtypes")
public interface AuthService {
    ResponseResult login(User user);

    ResponseResult logout();

    ResponseResult register(UserRegisterDto user);
}
