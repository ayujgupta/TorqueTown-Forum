package com.yuki.common.service.impl.security;

import com.alibaba.fastjson.JSON;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.utils.WebUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@SuppressWarnings("rawtypes")
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    
    
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        System.out.println(response.toString()+ " authException"+ authException.getMessage());
        ResponseResult result = new ResponseResult(HttpStatus.UNAUTHORIZED.value(),authException.getMessage());
//        ResponseResult result = new ResponseResult(HttpStatus.UNAUTHORIZED.value(), "认证失败请重新登录");
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response,json);
    }
}