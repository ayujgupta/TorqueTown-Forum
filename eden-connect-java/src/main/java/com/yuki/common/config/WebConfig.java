package com.yuki.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {



    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // todo 集中管理绝对路径
        registry.addResourceHandler("/upload/**")
                .addResourceLocations("file:/Users/ayujgupta/Documents/project/EdenConnect/eden-connect-java/src/main/resources/upload/img");
    }
}
