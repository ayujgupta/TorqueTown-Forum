package com.yuki.common.service.impl;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.UserChangePwdDto;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.domain.entity.Dto.UserRegisterDto;
import com.yuki.common.domain.entity.User;
import com.yuki.common.repository.AccountRepository;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.AccountService;
import com.yuki.common.utils.FileUtil;
import com.yuki.common.utils.UserUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Service
public class AccountServiceImpl implements AccountService {

    @Value("${upload.avatar-path}")
    private String uploadDir;

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseResult getUserInfo() {
        User user = userRepository.GetUserByEmail(UserUtil.getCurrentEmail());
        if(ObjectUtils.isEmpty(user)){
            return ResponseResult.errorResult(500,"用户未登录");
        }
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user,userDto);
        return ResponseResult.okResult(200,"获取用户信息成功",userDto);
    }

    @Override
    public ResponseResult changePassword(UserChangePwdDto userDto) {
        User user = userRepository.GetUserByEmail(UserUtil.getCurrentEmail());
        if(ObjectUtils.isEmpty(user)){
            return ResponseResult.errorResult(500,"用户未登录");
        }
        // 验证旧密码是否正确
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean matches = passwordEncoder.matches(userDto.getPassword_old(), user.getPassword());
        if(!matches){
            return ResponseResult.errorResult(500,"旧密码错误");
        }
        // 判断密码格式
        ResponseResult responseResult = verifyUserChangePwdDto(userDto);
        if(responseResult != null){
            return responseResult;
        }
        // 使用update
        userDto.setUserId(user.getId());
        userDto.setUpdateTime(LocalDateTime.now());
        userDto.setPassword_new(passwordEncoder.encode(userDto.getPassword_new()));
        boolean b = accountRepository.updatePassword(userDto);
        if(b){
            return ResponseResult.okResult(200,"修改成功");
        }else{
            return ResponseResult.okResult(500,"修改失败");
        }
    }

    @Override
    public ResponseResult updateUserInfo(UserDto user) {
        User user1 = userRepository.GetUserByEmail(UserUtil.getCurrentEmail());
        if(ObjectUtils.isEmpty(user1)){
            return ResponseResult.errorResult(500,"用户尚未登录");
        }
        if(!StringUtils.hasText(user.getUsername())){
            return ResponseResult.errorResult(500,"用户名不能为空");
        }
        System.out.println("用户头像:");
        System.out.println(user.getAvatar());
        // 设置头像
        if(Objects.equals(user.getAvatar(), "")){
            String defaultAvatar = FileUtil.getCurrentHost() + "default_avatar.jpg";
            // 设置默认头像
            System.out.println("设置默认头像");
            user.setAvatar(defaultAvatar);
        }

        user.setUpdateDate(LocalDateTime.now());
        user.setId(user1.getId());
        boolean b = accountRepository.updateProfile(user);
        if(b){
            return ResponseResult.okResult(200,"修改成功");
        }else{
            return ResponseResult.errorResult(500,"修改失败");
        }
    }

    @Override
    public ResponseResult uploadAvatar(MultipartFile file) {
        // 判断是否登录
        User user = userRepository.GetUserByEmail(UserUtil.getCurrentEmail());
        if(ObjectUtils.isEmpty(user)){
            return ResponseResult.errorResult(500,"用户未登录");
        }
        // 判断上传的文件是否合法
        boolean imageFile = FileUtil.isImageFile(file);
        if(!imageFile){
            return ResponseResult.errorResult(500,"请上传图片格式，如:jpg, jpeg, png, gif, bmp");
        }
        // 拼接要保存的路径
        String[] split = file.getOriginalFilename().split("\\.");

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date now = new Date();

        String fileName = user.getId() +"_"+ sdf.format(now) + "." + split[split.length - 1];
        String savePath = uploadDir + fileName;
        // 保存
        try {
            File destFile = new File(savePath);
            destFile.getParentFile().mkdirs();
            file.transferTo(destFile);
            // 保存到数据库
            boolean b = accountRepository.updateAvatar(FileUtil.getFullFilePath(fileName),user.getId());
            if(b){
                return ResponseResult.okResult(200,"保存成功",FileUtil.getFullFilePath(fileName));
            }else{
                return ResponseResult.errorResult(500,"保存失败");
            }

        }catch (Exception e){
            return ResponseResult.errorResult(500,"发生未知错误");
        }

    }

    @Override
    public ResponseResult getUserInfoPublic(Long userId) {
        User userById = userRepository.getUserById(userId);
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userById,userDto);
        userDto.setEmail("");
        userDto.setBirthday(null);
        userDto.setSex("");
        return ResponseResult.okResult(200,"获取用户信息成功",userDto);
    }

    private ResponseResult verifyUserChangePwdDto(UserChangePwdDto user){
        String passwordRegex = "^[A-Za-z0-9_]{6,}$";
        if(!user.getPassword_new().matches(passwordRegex)){
            return ResponseResult.errorResult(500,"密码只能包含数字,下划线,字母,长度大于等于6位");
        }

        System.out.println(user.getConfirm());
        if(!Objects.equals(user.getPassword_new(), user.getConfirm())){
            return ResponseResult.errorResult(500,"两次密码不一致");
        }
        return null;
    }
}
