package com.yuki.common.utils;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

public class FileUtil {

    private static final List<String> image_extensions = Arrays.asList("jpg", "jpeg", "png", "gif", "bmp");

    public static File multipartFileToFile (MultipartFile multipartFile) {

        File uploadFolder = new File("./src/main/resources/uploads/");
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        String path = "./src/main/resources/uploads/"+ UUID.randomUUID() +multipartFile.getOriginalFilename();
        File file = new File(path);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            // 底层也是通过io流写入文件file
            FileCopyUtils.copy(multipartFile.getBytes(), file);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return file;
    }

    public static String getCurrentHost(){
        return "http://localhost:7777/upload/avatar/";
    }

    public static String getCurrentHostImg(){
        return "http://localhost:7777/upload/img/";
    }



    public static String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int lastIndexOfDot = fileName.lastIndexOf(".");
        if (lastIndexOfDot == -1) {
            return ".jpg"; // 默认.jpg
        }
        return fileName.substring(lastIndexOfDot);
    }

    public static boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            return false;
        }

        // 获取文件扩展名
        String fileExtension = getupLoadedFileExtension(fileName).toLowerCase();
        return image_extensions.contains(fileExtension);
    }

    private static String getupLoadedFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex > 0 && lastDotIndex < fileName.length() - 1) {
            return fileName.substring(lastDotIndex + 1);
        }
        return "";
    }


    /**
     * 重新格式化url
     * @param filePath
     * @return
     */
    public static String filePathReset(String filePath){
        if (filePath == null) {
            return "/";
        }else if(!filePath.contains("\\")){
            return filePath;
        }

        // 将所有的\替换为/
        String realPath = filePath.replace("\\", "/");

        // 检查字符串长度，如果大于1，则在开头添加/
        if (realPath.length() > 1) {
            realPath = "/" + realPath;
        }

        // 检测相邻的\\，只保留第一个
        realPath = realPath.replaceAll("/+", "/");

        return realPath;
    }


    public static String getFullFilePath(String fileName){
        return getCurrentHost() + fileName;
    }

    public static String getFullImagePath(String fileName){
        return getCurrentHostImg() + fileName;
    }


}
