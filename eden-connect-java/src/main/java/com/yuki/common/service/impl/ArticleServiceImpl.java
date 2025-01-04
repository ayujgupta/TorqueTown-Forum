package com.yuki.common.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Article;
import com.yuki.common.domain.entity.Articlelike;
import com.yuki.common.domain.entity.User;
import com.yuki.common.domain.entity.Dto.ArticleDto;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.mapper.ArticleMapper;
import com.yuki.common.mapper.UserMapper;
import com.yuki.common.repository.ArticleRepository;
import com.yuki.common.repository.UserFavoriteRepository;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.service.ArticleService;
import com.yuki.common.utils.FileUtil;
import com.yuki.common.utils.UserUtil;

@Service
@SuppressWarnings("rawtypes")
public class ArticleServiceImpl implements ArticleService {
    
    @Value("${upload.img-path}")
    private String uploadDir;
    
    @Autowired
    ArticleMapper articleMapper;
    @Autowired
    ArticleRepository articleRepository;
    @Autowired
    UserMapper userMapper;
    @Autowired
    UserFavoriteRepository userFavoriteRepository;
    @Autowired
    UserRepository userRepository;
    
    @Override
    public Article findOneByArticleId(Long articleId) {
        boolean existFavorite = false;
        boolean existLike = false;
        if (articleRepository.isExist(articleId)) {
            try {
                //if article exists checking if the current user has liked the article or added to favourites
                String currentEmail = UserUtil.getCurrentEmail();
                User oneByEmail = userMapper.findOneByEmail(currentEmail);
                userRepository.setLastLogin(oneByEmail.getId(),LocalDateTime.now());
                existFavorite = userFavoriteRepository.isExist(oneByEmail.getId(), articleId);
                existLike = articleRepository.isLike(oneByEmail.getId(), articleId);
            } catch (Exception e) {
                System.out.println("用户未登录");
            }
            Article article = articleRepository.findOneByArticleId(articleId);
            if (existFavorite) {
                // 用户收藏过了
                article.setIsFavorite(1);
            }
            if (existLike) {
                article.setIsLike(1);
            }
            return article;
        } else {
            return null;
        }
    }
    
    @Override
    public PageInfo<ArticleDto> getArticles(int pageNum, int pageSize) {
        // 设置分页参数
        PageHelper.startPage(pageNum, pageSize);
        // 查询数据
        List<ArticleDto> articles = articleMapper.findAll();
        // 使用PageInfo 包装 查询结果
        return new PageInfo<>(articles);
    }
    
    @Override
    public PageInfo<ArticleDto> getArticlesByUserId(int pageNum, int pageSize, Long UserId) {
        PageHelper.startPage(pageNum, pageSize);
        List<ArticleDto> articles = articleMapper.findAllByUserId(UserId);
        return new PageInfo<>(articles);
    }
    
    @Override
    public ResponseResult saveArticle(Article article) {
        if (ObjectUtils.isEmpty(article)) {
            return ResponseResult.errorResult(500, "Please fill in the required fields");
        }
        if (!StringUtils.hasText(article.getTitle())) {
            return ResponseResult.errorResult(500, "Title cannot be Empty");
        }
        if (!StringUtils.hasText(article.getSummary())) {
            return ResponseResult.errorResult(500, "Summary cannot be Empty");
        }
        if (!StringUtils.hasText(article.getContent())) {
            return ResponseResult.errorResult(500, "Content cannot be Empty");
        }
        //        if (!StringUtils.hasText(article.getCategory_tags())) {
        //            return ResponseResult.errorResult(500, "请填写分类");
        //        }
        // System.out.println(article.getSummary());
        article.setCreate_time(LocalDateTime.now());
        String currentEmail = UserUtil.getCurrentEmail();
        
        //ayuj-- logic to be improved for thumbnail user should not be shown the markeddown string
        // article.setThumbnail(extractFirstImageUrl(article.getContent()));
        
        User user = userMapper.findOneByEmail(currentEmail);
        article.setCreate_by(user.getId());
        boolean b = false;
        if (ObjectUtils.isEmpty(article.getId())) {
            b = articleRepository.saveArticle(article);
        } else {
            if (articleRepository.isExist(article.getId())) {
                article.setUpdate_time(LocalDateTime.now());
                b = articleRepository.updateArticle(article);
                userRepository.setLastLogin(user.getId(),LocalDateTime.now());
            } else {
                return ResponseResult.errorResult(500, "article is not exist");
            }
        }
        if (b) {
            return ResponseResult.okResult(200, "success");
        } else {
            return ResponseResult.errorResult(400, "fail");
        }
    }
    
    @Override
    public ResponseResult deleteArticle(Long articleId) {
        System.out.println("Deleting Article: "+articleId);
        Long userId = UserUtil.getUserID();
        // User user = userMapper.findOneById(userId);
        if(articleRepository.findUserIdByArticleId(articleId)==userId){
            boolean exist = articleRepository.isExist(articleId);
            if (!exist) {
                return ResponseResult.errorResult(400, "article does not exist");
            }
            boolean b = articleRepository.deleteArticle(articleId);
            if (b) {
                System.out.println(" Article Deleted: "+articleId);
                return ResponseResult.okResult(200, "success");
            } else {
                return ResponseResult.errorResult(400, "fail");
            }
        }
        else{
            System.out.println(" User does not have rights to delete the article: "+articleId);
            return ResponseResult.errorResult(403,"User does not have rights to delete the article");
        }
    }
    
    @Override
    public ResponseResult viewArticle(Long articleId) {
        boolean b = articleRepository.viewArticle(articleId);
        if (b) {
            return ResponseResult.okResult(200, "viewed");
        } else {
            return ResponseResult.okResult(200, "unknown error");
        }
    }
    
    @Override
    public ResponseResult likeOrUnlikeArticle(Long articleId) {
        // 获取当前用户
        String currentEmail = UserUtil.getCurrentEmail();
        User user = userMapper.findOneByEmail(currentEmail);
        // 查看当前用户是有没有给这个文章点赞
        boolean b = articleRepository.isLike(user.getId(), articleId);
        boolean result = false;
        if (b) {
            // 如果点赞了,  取消点赞(delete)
            result = articleRepository.removeLike(user.getId(), articleId);
            if (result) {
                return ResponseResult.okResult(200, "取消点赞成功");
            } else {
                return ResponseResult.errorResult(500, "取消点赞失败");
            }
        } else {
            // 如果还没点赞了, 那就点赞(insert)
            Articlelike articlelike = new Articlelike();
            articlelike.setArticleId(articleId);
            articlelike.setUserId(user.getId());
            articlelike.setCreateTime(LocalDateTime.now());
            result = articleRepository.addLike(articlelike);
            if (result) {
                return ResponseResult.okResult(200, "点赞成功!");
            } else {
                return ResponseResult.okResult(500, "点赞失败!");
            }
        }
    }
    
    @Override
    public PageInfo<ArticleDto> search(String key, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<ArticleDto> articleList = articleMapper.findAllByKeyWord(key);
        return new PageInfo<>(articleList);
    }
    
    @Override
    public ResponseResult getTopArticle() {
        // 不需要验证用户是否登录
        // 直接查询返回就行了
        ArticleDto articleDto = articleRepository.findTopOne();
        if (ObjectUtils.isEmpty(articleDto)) {
            return ResponseResult.okResult(200, "获取置顶文章成功", "无置顶文章");
        } else {
            return ResponseResult.okResult(200, "获取置顶文章成功", articleDto);
        }
    }
    
    @Override
    public ResponseResult setTopArticle(Long articleId) {
        LocalDateTime now = LocalDateTime.now();
        boolean b = articleRepository.setTopArticle(articleId, now);
        if (b) {
            return ResponseResult.okResult(200, "置顶成功");
        } else {
            return ResponseResult.errorResult(500, "置顶失败");
        }
    }
    
    @Override
    public ResponseResult getAdminInfo() {
        User oneById = userMapper.findAdmin();
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(oneById, userDto);
        Long count = userMapper.findCountByUserId(userDto.getId());
        HashMap<String, Object> map = new HashMap<>();
        map.put("info", userDto);
        map.put("count", count);
        return ResponseResult.okResult(200, "获取管理员基本信息成功", map);
    }
    
    
    // 只是上传图片，并没有操作数据库
    @Override
    public ResponseResult uploadImage(MultipartFile file) {
        // 获取当前用户，验证是否登录
        User oneByEmail = userMapper.findOneByEmail(UserUtil.getCurrentEmail());
        if (ObjectUtils.isEmpty(oneByEmail)) {
            ResponseResult.errorResult(500, "请登录后重试");
        }
        // 判断上传的文件是否合法
        boolean imageFile = FileUtil.isImageFile(file);
        if (!imageFile) {
            return ResponseResult.errorResult(500, "请上传图片格式，如:jpg, jpeg, png, gif, bmp");
        }
        // 拼接要保存的路径
        String[] split = file.getOriginalFilename().split("\\.");
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date now = new Date();
        
        String fileName = oneByEmail.getId() + "_" + sdf.format(now) + "." + split[split.length - 1];
        String savePath = uploadDir + fileName;
        // 把拼接的字符串返回给前端
        // 保存
        try {
            File destFile = new File(savePath);
            destFile.getParentFile().mkdirs();
            file.transferTo(destFile);
            return ResponseResult.okResult(200, "保存成功", FileUtil.getFullImagePath(fileName));
        } catch (Exception e) {
            return ResponseResult.errorResult(500, "发生未知错误");
        }
    }
    
    public static String extractFirstImageUrl(String text) {
        // 定义正则表达式来匹配 Markdown 格式的图片地址
        String regex = "!\\[.*?\\]\\((http[^\\s]+)\\)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        
        // 查找第一个匹配的图片地址并返回
        if (matcher.find()) {
            return matcher.group(1);  // group(1) 返回第一个括号内匹配的内容
        }
        
        return null;  // 如果没有找到符合条件的图片 URL，则返回 null
    }
    
    public static void main(String[] args) {
        String sttr="wfeejepvwf![1_20241215153637.jpg](http://localhost:7777/upload/img/1_20241215153637.jpg)";
        System.out.println(extractFirstImageUrl(sttr));
    }
    
}

