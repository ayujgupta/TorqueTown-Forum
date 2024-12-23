/*
 Navicat Premium Data Transfer

 Source Server         : 本机mysql
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : eden_connect

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 09/11/2024 17:03:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
  `summary` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章摘要(子标题)',
  `category_tags` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '所属分类id(可以多个，使用\",\"分割)',
  `thumbnail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '缩略图',
  `is_top` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '是否置顶（0否，1是）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '1' COMMENT '状态（0已发布，1草稿）',
  `view_count` bigint NULL DEFAULT 0 COMMENT '访问量',
  `like_count` bigint NULL DEFAULT 0 COMMENT '点赞量',
  `create_by` bigint NOT NULL COMMENT '文章创建者id',
  `create_time` datetime(0) NOT NULL COMMENT '创建文章的时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改文章的时间',
  `del_flag` int NULL DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  `is_top_update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文章表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '关于本站', '# 关于本站\n\nHello\nこんにちは！\n你好\n\n该项目创建的目的是为了学习日语！大家可以在这里分享讨论学习中出现的问题，也可以作为学习日语的小工具！\n\n项目依赖（包括但不限于）：\n## 前端\n- Vue\n- Vue-router\n- Bootstrap\n- i18n\n- Vuex\n- axios\n\n## 后端\n- SpringBoot\n- Spring Security\n- Mybatis\n- jwt\n- redis\n', NULL, '其他', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '1', '1', 9, 1, 1, '2024-08-16 21:57:12', NULL, 0, '2024-11-04 10:26:15');
INSERT INTO `article` VALUES (16, 'post测试修改', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 3, '2024-10-30 17:19:50', NULL, 0, NULL);
INSERT INTO `article` VALUES (19, 'post测试1', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:04', NULL, 0, NULL);
INSERT INTO `article` VALUES (20, 'post测试2', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:06', NULL, 0, NULL);
INSERT INTO `article` VALUES (21, 'post测试3', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:08', NULL, 0, NULL);
INSERT INTO `article` VALUES (22, 'post测试4', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:11', NULL, 0, NULL);
INSERT INTO `article` VALUES (23, 'post测试5', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:14', NULL, 0, NULL);
INSERT INTO `article` VALUES (24, 'post测试6', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:16', NULL, 0, NULL);
INSERT INTO `article` VALUES (25, 'post测试7', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:19', NULL, 0, NULL);
INSERT INTO `article` VALUES (26, 'post测试8', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:21', NULL, 0, NULL);
INSERT INTO `article` VALUES (27, 'post测试9', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:24', NULL, 0, NULL);
INSERT INTO `article` VALUES (28, 'post测试10', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:28', NULL, 0, NULL);
INSERT INTO `article` VALUES (29, 'post测试11', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:31', NULL, 0, NULL);
INSERT INTO `article` VALUES (30, 'post测试12', '正文', '文章简述', '测试', 'http://localhost:7777/upload/img/1_20241104200159.jpg', '0', '1', 0, 0, 1, '2024-11-04 23:10:34', NULL, 0, NULL);
INSERT INTO `article` VALUES (31, '图片上传测试', '# 会赢吗？\n![1_20241108231541.jpg](http://localhost:7777/upload/img/1_20241108231541.jpg)\n', '文章简述', NULL, 'http://localhost:7777/upload/img/1_20241108231541.jpg', '0', '1', 4, 0, 1, '2024-11-08 23:15:45', NULL, 0, NULL);
INSERT INTO `article` VALUES (33, '上传图片测试2', '图片\n![1_20241108233937.jpg](http://localhost:7777/upload/img/1_20241108233937.jpg)\n我再来上传个图片——\n![1_20241109153712.png](http://localhost:7777/upload/img/1_20241109153712.png)\n', '文章简介啦啦啦啦', NULL, 'http://localhost:7777/upload/img/1_20241108233937.jpg', '0', '1', 23, 0, 1, '2024-11-09 15:37:29', NULL, 0, NULL);

-- ----------------------------
-- Table structure for articlelike
-- ----------------------------
DROP TABLE IF EXISTS `articlelike`;
CREATE TABLE `articlelike`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `article_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `create_time` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `state` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `article_id`(`article_id`, `user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articlelike
-- ----------------------------
INSERT INTO `articlelike` VALUES (66, 1, 1, '2024-11-07 14:52:18', '1');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `article_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `parent_id` bigint NULL DEFAULT NULL,
  `state` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  `like_count` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 1, 1, '这是顶级评论1', '2024-11-07 20:12:02', NULL, '1', 0);
INSERT INTO `comment` VALUES (29, 1, 1, '我要回复你这个 \"我要回复你这个\" 评论测试! \"！\"！', '2024-11-07 20:12:01', 1, '1', 0);
INSERT INTO `comment` VALUES (34, 1, 1, '啦啦啦啦啦', '2024-11-07 15:44:58', NULL, '1', 0);
INSERT INTO `comment` VALUES (35, 1, 1, '啦啦啦啦啦', '2024-11-07 16:18:18', NULL, '0', 0);
INSERT INTO `comment` VALUES (36, 1, 1, '啦啦啦啦', '2024-11-07 16:15:57', NULL, '0', 0);
INSERT INTO `comment` VALUES (40, 33, 1, '有人吗', '2024-11-09 15:37:43', NULL, '0', 0);
INSERT INTO `comment` VALUES (41, 33, 1, '有人吗', '2024-11-09 15:37:46', NULL, '1', 0);

-- ----------------------------
-- Table structure for commentlike
-- ----------------------------
DROP TABLE IF EXISTS `commentlike`;
CREATE TABLE `commentlike`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `create_time` datetime(0) NOT NULL,
  `state` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `comment_id`(`comment_id`, `user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commentlike
-- ----------------------------

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `perm` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sys_menu_id_uindex`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '查看', 'sys:view');
INSERT INTO `sys_menu` VALUES (2, '发表', 'sys:posted');
INSERT INTO `sys_menu` VALUES (3, '点赞', 'sys:like');
INSERT INTO `sys_menu` VALUES (5, '删除', 'sys:delete');
INSERT INTO `sys_menu` VALUES (6, '超级管理员', 'sys:root');

-- ----------------------------
-- Table structure for sys_menu_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_role`;
CREATE TABLE `sys_menu_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sys_menu_role_id_uindex`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu_role
-- ----------------------------
INSERT INTO `sys_menu_role` VALUES (1, 1, 1);
INSERT INTO `sys_menu_role` VALUES (2, 1, 2);
INSERT INTO `sys_menu_role` VALUES (3, 1, 3);
INSERT INTO `sys_menu_role` VALUES (5, 1, 5);
INSERT INTO `sys_menu_role` VALUES (6, 1, 6);
INSERT INTO `sys_menu_role` VALUES (7, 2, 1);
INSERT INTO `sys_menu_role` VALUES (8, 2, 2);
INSERT INTO `sys_menu_role` VALUES (9, 2, 3);
INSERT INTO `sys_menu_role` VALUES (11, 2, 5);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色的标识符',
  `remark` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '说明该身份可以做什么事情',
  `createDate` date NOT NULL,
  `updated` date NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sys_role_id_uindex`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', '拥有管理该网站的一切权限', '2022-11-14', '2022-11-14', 1);
INSERT INTO `sys_role` VALUES (2, '普通用户', 'normal', '普通用户', '2022-11-14', '2022-11-14', 1);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'http://localhost:7777/upload/avatar/default_avatar.jpg',
  `role_id` int UNSIGNED NOT NULL DEFAULT 2,
  `state` int NOT NULL DEFAULT 1,
  `createDate` datetime(0) NOT NULL,
  `updateDate` datetime(0) NULL DEFAULT NULL,
  `signature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sys_user_id_uindex`(`id`) USING BTREE,
  UNIQUE INDEX `unique_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'ゆき', 'ゆき', '$2a$10$DF6dnLTcT6eKKlcD.Nfqj./ilK4QQhIbnBUxzMTcnKvWpyO2H5OIS', '2004-03-25', '男', '1@qq.com', 'http://localhost:7777/upload/avatar/default_avatar.jpg', 1, 1, '2024-11-06 22:49:01', '2024-11-08 16:46:49', '这个人很懒，没写个人签名');
INSERT INTO `sys_user` VALUES (3, 'user', NULL, '$2a$10$Mwpvk2k2dU/8gxt2Et7Yn.4n70G76TYJ.ijzjU0xGDk17wa1kMayC', '2022-11-13', NULL, 'user@163.com', 'http://localhost:7777/upload/avatar/default_avatar.jpg', 2, 1, '2022-11-14 00:00:00', NULL, NULL);
INSERT INTO `sys_user` VALUES (21, '2', NULL, '$2a$10$4WaE6tQZC01Bvr675GMHz.oepav.OKZb3DZxyHF9gJumbP52QXDAW', NULL, NULL, '2@qq.com', 'http://localhost:7777/upload/avatar/default_avatar.jpg', 2, 1, '2024-11-07 23:03:14', NULL, NULL);
INSERT INTO `sys_user` VALUES (22, '3', NULL, '$2a$10$3iCc2YloT2eCim2tQK.N9O1wQgg2B23Dssa2g0Q637aAE62ClmQ9S', NULL, NULL, '3@qq.com', 'http://localhost:7777/upload/avatar/default_avatar.jpg', 2, 1, '2024-11-07 23:03:21', NULL, NULL);
INSERT INTO `sys_user` VALUES (23, '34', NULL, '$2a$10$HLtGrzJ0WFltX/c51XZjxezfJdgbJ5Ajrb9Bf3vfSCRdWTqXqsX8S', NULL, NULL, '34@qq.com', 'http://localhost:7777/upload/avatar/default_avatar.jpg', 2, 1, '2024-11-07 23:04:44', NULL, NULL);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `sys_user_role_id_uindex`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, 1);
INSERT INTO `sys_user_role` VALUES (2, 3, 2);
INSERT INTO `sys_user_role` VALUES (6, 13, 2);
INSERT INTO `sys_user_role` VALUES (7, 14, 2);
INSERT INTO `sys_user_role` VALUES (8, 15, 2);
INSERT INTO `sys_user_role` VALUES (9, 16, 2);
INSERT INTO `sys_user_role` VALUES (10, 17, 2);
INSERT INTO `sys_user_role` VALUES (11, 18, 2);
INSERT INTO `sys_user_role` VALUES (12, 19, 2);
INSERT INTO `sys_user_role` VALUES (13, 20, 2);
INSERT INTO `sys_user_role` VALUES (14, 21, 2);
INSERT INTO `sys_user_role` VALUES (15, 22, 2);
INSERT INTO `sys_user_role` VALUES (16, 23, 2);

-- ----------------------------
-- Table structure for userfavorite
-- ----------------------------
DROP TABLE IF EXISTS `userfavorite`;
CREATE TABLE `userfavorite`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `article_id` bigint NOT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`, `article_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userfavorite
-- ----------------------------
INSERT INTO `userfavorite` VALUES (32, 1, 16, '2024-10-31 17:01:14');
INSERT INTO `userfavorite` VALUES (34, 1, 1, '2024-11-07 14:52:15');

-- ----------------------------
-- Triggers structure for table sys_user
-- ----------------------------
DROP TRIGGER IF EXISTS `after_user_insert`;
delimiter ;;
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `sys_user` FOR EACH ROW BEGIN
    DECLARE userId INT;
    DECLARE roleId INT;
    
    SET userId = NEW.id;
    SET roleId = NEW.role_id;
    
    INSERT INTO sys_user_role (user_id, role_id) VALUES (userId, roleId);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
