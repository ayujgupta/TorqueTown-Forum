package com.yuki.common.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commentlike implements Serializable {
    private Long id;
    private Long comment_id;
    private Long user_id;
    private LocalDateTime create_time;
    private String state;
}
