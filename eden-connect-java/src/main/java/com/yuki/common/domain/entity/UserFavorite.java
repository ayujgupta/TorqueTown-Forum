package com.yuki.common.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFavorite {
    private Long id;
    private Long userId;
    private Long articleId;
    private LocalDateTime createTime;
}
