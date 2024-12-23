package com.yuki.common.domain.entity.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserChangePwdDto {

    public Long userId;
    public String password_old;
    public String password_new;
    public String confirm;
    public LocalDateTime updateTime;
}
