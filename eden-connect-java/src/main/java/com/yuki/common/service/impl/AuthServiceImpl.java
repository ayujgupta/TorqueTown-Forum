package com.yuki.common.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Objects;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.LoginUser;
import com.yuki.common.domain.entity.User;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.domain.entity.Dto.UserRegisterDto;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.AuthService;
import com.yuki.common.utils.JwtUtil;
import com.yuki.common.utils.RedisCache;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;

    @Autowired
    private RedisCache redisCache;

    @SuppressWarnings("rawtypes")
    @Override
    public ResponseResult login(User user) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());

        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        if(ObjectUtils.isEmpty(authenticate)){
            throw new RuntimeException("Wrong username or password");
        }
        // 使用userId生成token
        LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
        String userId = loginUser.getUser().getId().toString();
        String jwt = JwtUtil.createJWT(userId);
        // authenticate 存入 redis
        redisCache.setCacheObject("loginUser:"+userId,loginUser);

        // 修改用户的最后一次登录时间
        userRepository.setLastLogin(loginUser.getUser().getId(),LocalDateTime.now());
        User userById = userRepository.getUserById(loginUser.getUser().getId());
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userById,userDto);
        userDto.setEmail("");
        userDto.setBirthday(null);
        userDto.setSex("");


        // 把token响应给前端
        HashMap<String,Object> map = new HashMap<>();
        map.put("token",jwt);
        map.put("userInfo",userDto);
        return ResponseResult.okResult(200,"login success",map);

    }

    @SuppressWarnings("rawtypes")
    @Override
    public ResponseResult logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        Long userid = loginUser.getUser().getId();
        redisCache.deleteObject("loginUser:"+userid);
        return new ResponseResult(200,"退出成功");
    }

    @Override
    @SuppressWarnings("rawtypes")
    public ResponseResult register(UserRegisterDto user) {
        //Determine email format, password, confirm password format
        ResponseResult responseResult = verifyUserRegisterDto(user);
        if(responseResult != null){
            return responseResult;
        }
        // Determine whether the email is already in use
        //ayuj-- add a check for username
        User user1 = userRepository.GetUserByEmail(user.getEmail());
        if(!ObjectUtils.isEmpty(user1)){
            return ResponseResult.errorResult(500,"This email address has already been registered");
        }
        // Use the user's email address as the user's name
        User registerUser = new User();
        registerUser.setEmail(user.getEmail());
        //ayuj--have username seperately inputed by client and use that
        registerUser.setUsername(user.getEmail().split("@")[0]);
        registerUser.setCreateDate(LocalDateTime.now());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(user.getPassword());
        registerUser.setPassword(password);
        // Save to database
        boolean b = userRepository.save(registerUser);
        if(b){
            return ResponseResult.okResult(200,"Registration successful, welcome to use");
        }else{
            return ResponseResult.errorResult(500,"Registration failed");
        }
    }

    @SuppressWarnings("rawtypes")
    private ResponseResult verifyUserRegisterDto(UserRegisterDto user){
        //ayuj-- regex to handled in react as well
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
        if(!user.getEmail().matches(emailRegex)){
            return ResponseResult.errorResult(500,"Enter Valid Email");
        }
        System.out.println(user.getPassword());
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$";
        if(!user.getPassword().matches(passwordRegex)){
            return ResponseResult.errorResult(500,"The password can only contain numbers, underscores, letters, and the length is greater than or equal to 6 characters");
        }

        // System.out.println(user.getPassword());
        // System.out.println(user.getConfirm());
        if(!Objects.equals(user.getPassword(), user.getConfirm())){
            // System.out.println(1111111);
            return ResponseResult.errorResult(500,"两次密码不一致");
        }
        return null;
    }


}
