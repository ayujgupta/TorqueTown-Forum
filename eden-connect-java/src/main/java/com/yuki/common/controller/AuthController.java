package com.yuki.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.User;
import com.yuki.common.domain.entity.Dto.UserRegisterDto;
import com.yuki.common.service.AuthService;

@RestController
@RequestMapping("/auth")
@SuppressWarnings("rawtypes")
public class AuthController {

    @Autowired
    AuthService authService;

    
    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user){
        return authService.login(user);
    }
    
    @PostMapping("/logout")
    public ResponseResult logout(){
        return authService.logout();
    }
    
    @PostMapping("/register")
    public ResponseResult register(@RequestBody UserRegisterDto user){
        return authService.register(user);
    }

}
