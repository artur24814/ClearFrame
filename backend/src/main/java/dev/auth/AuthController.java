package src.main.java.dev.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
            String token = jwtUtil.generateToken(email);

            Map<String, String> response = new HashMap<>();
            response.put("user", email);
            response.put("token", token);
            return ResponseEntity.ok(response);
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
}