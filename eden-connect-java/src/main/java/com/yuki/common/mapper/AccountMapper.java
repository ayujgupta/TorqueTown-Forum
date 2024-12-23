package com.yuki.common.mapper;

import com.yuki.common.domain.entity.Dto.UserChangePwdDto;
import com.yuki.common.domain.entity.Dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AccountMapper {
    boolean updatePassword(UserChangePwdDto userDto);

    boolean updateProfile(UserDto user);

    boolean updateAvatar(@Param("avatar") String fileName,@Param("userId") Long userId);
}
