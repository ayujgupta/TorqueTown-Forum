package com.yuki.common.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Articlelike implements Serializable {
    
    private Long id;
    
    private Long articleId;
    
    private Long userId;
    
    private LocalDateTime createTime;
    
    private String state;
}

