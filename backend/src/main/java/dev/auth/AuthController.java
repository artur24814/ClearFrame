package src.main.java.dev.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import src.main.java.dev.users.UserService;
import src.main.java.dev.users.UserProfile;
import src.main.java.dev.auth.jwt.JwtUtil;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final long ACCESS_TOKEN_EXPIRED_TIME = 1000 * 60 * 15L;
    private static final long REFRESH_TOKEN_EXPIRED_TIME = 1000 * 60 * 60 * 24 * 30L;

    private final UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (isAuthenticated) {
            String email = loginRequest.getEmail();
            String accessToken = jwtUtil.generateToken(email, ACCESS_TOKEN_EXPIRED_TIME);
            String refreshToken = jwtUtil.generateToken(email, REFRESH_TOKEN_EXPIRED_TIME);

            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                //.secure(true)
                .path("/")
                .maxAge(30 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

            Map<String, String> response = new HashMap<>();
            response.put("user", email);
            response.put("token", accessToken);
            return new ResponseEntity<>(response, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody UserProfile user) {
        try {
            userService.createUser(
                user.getFirstName(), user.getSecondName(), user.getEmail(), user.getPassword(), user.getPermissions()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(@CookieValue(value = "refreshToken", required = false) String refreshToken){
        String email;
        Map<String, String>response = new HashMap<>();

        try {
            email = jwtUtil.extractEmail(refreshToken);

            if (!jwtUtil.validateToken(refreshToken, email)){
                response.put("error", "Invalid refresh token");
                throw new Exception();
            };

            String accessToken = jwtUtil.generateToken(email, ACCESS_TOKEN_EXPIRED_TIME);
            response.put("token", accessToken);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }
}