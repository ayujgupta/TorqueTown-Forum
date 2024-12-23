package com.yuki.common.service;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.UserChangePwdDto;
import com.yuki.common.domain.entity.Dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface AccountService {
    ResponseResult getUserInfo();

    ResponseResult changePassword(UserChangePwdDto userDto);

    ResponseResult updateUserInfo(UserDto user);

    ResponseResult uploadAvatar(MultipartFile file);

    ResponseResult getUserInfoPublic(Long userId);

}
