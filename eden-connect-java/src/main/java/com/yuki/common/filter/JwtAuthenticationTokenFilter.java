package com.yuki.common.filter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.yuki.common.domain.entity.LoginUser;
import com.yuki.common.handler.CustomException;
import com.yuki.common.repository.UserRepository;
import com.yuki.common.utils.JwtUtil;
import com.yuki.common.utils.RedisCache;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

// @Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    
    @Autowired
    private RedisCache redisCache;
    
    private final RequestMatcher requestMatcher;
    
    @Autowired
    private UserRepository userRepository;
    
    public JwtAuthenticationTokenFilter(RequestMatcher requestMatcher) {
        this.requestMatcher = requestMatcher;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException,CustomException {
        String token = request.getHeader("token");
        if (!StringUtils.hasText(token)) {
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("Request Path: " + request.getRequestURI());
        System.out.println("Matches: " + requestMatcher.matches(request));
        boolean isPublicEndpoint = requestMatcher.matches(request); // Check if it's a public endpoint
        String tokenError = "";
        String userid = null;
        
        if (StringUtils.hasText(token)) {
            // Attempt to validate the token
            try {
                System.out.println();
                Claims claims = JwtUtil.parseJWT(token);
                userid = claims.getSubject();
            } catch (ExpiredJwtException e) {
                tokenError = "Token expired. Please log in again.";
            } catch (Exception e) {
                tokenError = "Invalid token.";
            }
        }
        
        // Token handling for authenticated users
        if (userid != null) {
            
            
            // Retrieve user information from Redis
            String redisKey = "loginUser:" + userid;
            LoginUser loginUser = redisCache.getCacheObject(redisKey);
            
            if (Objects.nonNull(loginUser)) {
                userRepository.setLastLogin(Long.parseLong(userid),LocalDateTime.now());
                // Set the security context for authenticated user
                UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                tokenError = "Session expired or user not logged in.";
            }
        }
        
        // Add token error to response headers for the frontend
        if (!tokenError.isEmpty()) {
            response.setHeader("Token-Error", tokenError);
        }
        
        // For protected endpoints, enforce authentication
        if (!isPublicEndpoint && (userid == null || !tokenError.isEmpty())) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\": \"" + tokenError + "\"}");
            return;
        }
        
        // Proceed with the filter chain for all cases
        filterChain.doFilter(request, response);
    }
}