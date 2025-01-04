package com.yuki.common.handler;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class CustomException extends RuntimeException{
    int status;
    String msg;
    public CustomException (int status, String msg){
        super(msg);
        this.status=status;
        // this.msg=msg;
    }

}
