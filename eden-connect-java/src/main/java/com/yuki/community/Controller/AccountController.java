package com.yuki.community.Controller;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.UserChangePwdDto;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.AccountService;
import org.springframework.amqp.rabbit.connection.PublisherCallbackChannel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    /**
     * 修改密码
     * @param userDto
     * @return
     */
    @PostMapping("/changePwd")
    public ResponseResult changePassword(@RequestBody UserChangePwdDto userDto){
        return accountService.changePassword(userDto);
    }

    /**
     * 获取用户基本信息Profile
     * @return
     */
    @GetMapping()
    public ResponseResult getUserInfo(){
        return accountService.getUserInfo();
    }

    @GetMapping("/public/{id}")
    public ResponseResult getUserInfoPublic(@PathVariable("id") Long userId){
        return accountService.getUserInfoPublic(userId);
    }

    /**
     * 修改用户基本信息Profile
     * @param userDto
     * @return
     */
    @PostMapping("/updateInfo")
    public ResponseResult updateUserInfo(@RequestBody UserDto userDto){
        return accountService.updateUserInfo(userDto);
    }

    /**
     * 上传头像并保存到数据库
     * @param file
     * @return
     */
    @PostMapping("/upload/avatar")
    public ResponseResult updateAvatar(@RequestParam("file") MultipartFile file){
        return accountService.uploadAvatar(file);
    }

}
