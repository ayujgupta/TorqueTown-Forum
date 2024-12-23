package com.yuki.common.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article implements Serializable {
    private Long id;
    private String title;
    private String content;
    private String summary;
    private String category_tags;
    private String thumbnail;
    private String is_top;
    private String status;
    private Long view_count;
    private Long like_count;
    private Long create_by;
    private String avatar;
    private String username;
    private String nickname;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime create_time;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime update_time;
    private Integer del_flag;
    private Integer isFavorite;
    private Integer isLike;
}

