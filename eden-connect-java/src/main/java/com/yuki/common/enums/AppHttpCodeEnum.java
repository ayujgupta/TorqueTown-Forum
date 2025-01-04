package com.yuki.common.enums;

public enum AppHttpCodeEnum {
    // 成功
    SUCCESS(200,"Success"),
    // 登录
    NEED_LOGIN(401,"Unauthorized"),
    NO_OPERATOR_AUTH(403,"Permission Denied"),
    SYSTEM_ERROR(500,"An Error Occured"),
    USERNAME_EXIST(501,"Username already exists"),
    PHONENUMBER_EXIST(502,"Mobile Number already registered"),
     EMAIL_EXIST(503, "Emaail already registered"),
    REQUIRE_USERNAME(504, "Username is required"),
    CONTENT_NOT_NULL(506,"Comment Cannot be Empty"),
    LOGIN_ERROR(505,"用户名或密码错误"),
    TOKEN_EXPIRED(409,"Token Expired. Login Again.");

    int code;
    String msg;

    AppHttpCodeEnum(int code, String errorMessage){
        this.code = code;
        this.msg = errorMessage;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
