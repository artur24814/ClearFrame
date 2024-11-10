package src.main.java.dev.auth.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

class TokenData {
    String email;
    String jwt;

    TokenData(String email, String jwt) {
        this.email = email;
        this.jwt = jwt;
    }
}

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        try{
            TokenData tokenData = decodeToken(authorizationHeader);
            if (isEmailExistsAndUserIsNotAuthenticated(tokenData)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(tokenData.email);
                if (tokenData.jwt != null && jwtUtil.validateToken(tokenData.jwt, tokenData.email)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthToken);
                }
            }
        } catch (Exception e) {
            logger.error("Error validation token! ...");
        }

        chain.doFilter(request, response);
    }

    private TokenData decodeToken(String authorizationHeader) {
        if (isTokenExistsInHeader(authorizationHeader)) {
            String jwt = authorizationHeader.substring(7);
            String email = jwtUtil.extractEmail(jwt);
            return new TokenData(email, jwt);
        }
        return new TokenData(null, null);
    }

    private boolean isTokenExistsInHeader(String authorizationHeader) {
        return authorizationHeader != null && authorizationHeader.startsWith("Bearer ");
    }

    private boolean isEmailExistsAndUserIsNotAuthenticated(TokenData tokenData) {
        return tokenData.email != null && SecurityContextHolder.getContext().getAuthentication() == null;
    }
}