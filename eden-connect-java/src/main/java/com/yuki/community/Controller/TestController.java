package com.yuki.community.Controller;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    UserService userService;

    @PreAuthorize("hasAuthority('sys:root')")
    @GetMapping("/hello")
    public ResponseResult Test(){
        UserDto userById = userService.getUserById(1L);
        return ResponseResult.okResult(200,"success",userById);
    }
}
