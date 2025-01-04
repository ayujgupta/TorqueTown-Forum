package com.yuki.common.utils;

import com.yuki.common.domain.entity.LoginUser;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtil {


    public static String getCurrentEmail(){
        LoginUser loginUser = (LoginUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return loginUser.getEmail();
    }

    public static Long getUserID(){
        LoginUser loginUser = (LoginUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return loginUser.getUserId();
    }

}
