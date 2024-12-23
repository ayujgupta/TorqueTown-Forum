package com.yuki.common.handler;

import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.yuki.common.domain.ResponseResult;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseResult handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseResult.errorResult(500, "文件大小超出限制，请上传较小的文件(5MB以内)");
    }

    // 处理其他异常
    @ExceptionHandler(Exception.class)
    public ResponseResult handleException(Exception exc) {
        return ResponseResult.errorResult(500, exc.getMessage());
    }
}
