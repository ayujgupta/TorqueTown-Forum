package com.yuki.common.domain.entity.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDto {
    private String email;
    private String username;
    private String password;
    private String confirm;
    // private Date birthday;
    // private String sex;
    // private String nickname;
    
}
