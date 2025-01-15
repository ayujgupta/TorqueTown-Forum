package com.yuki.common.utils;

import com.yuki.common.domain.entity.LoginUser;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtil {


    public static String getCurrentEmail(){
        try {
            LoginUser loginUser = (LoginUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return loginUser.getEmail();
        } catch (Exception e) {
            System.out.println(e+"--------- "+SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        }
        return null;
    }

    public static Long getUserID(){
        try {
            LoginUser loginUser = (LoginUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return loginUser.getUserId();
        } catch (Exception e) {
            System.out.println(e+"--------- "+SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        }
        return null;
       
    }

}
