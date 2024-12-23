package com.yuki.common.repository;

import com.yuki.common.domain.entity.Dto.UserChangePwdDto;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class AccountRepository {

    @Autowired
    AccountMapper accountMapper;

    public boolean updatePassword(UserChangePwdDto userDto) {
        return accountMapper.updatePassword(userDto);
    }

    public boolean updateProfile(UserDto user) {
        return accountMapper.updateProfile(user);
    }

    public boolean updateAvatar(String fileName,Long userId) {
        return accountMapper.updateAvatar(fileName,userId);
    }
}
