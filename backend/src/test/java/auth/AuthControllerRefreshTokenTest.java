package auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.servlet.http.Cookie;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import src.main.java.dev.App;
import src.main.java.dev.auth.jwt.JwtUtil;

@SpringBootTest(classes = App.class)
@AutoConfigureMockMvc
public class AuthControllerRefreshTokenTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtUtil jwtUtil;

    private final String validRefreshToken = "validRefreshToken";
    private final String invalidRefreshToken = "invalidRefreshToken";
    private final String email = "user@example.com";
    private final String newAccessToken = "newAccessToken";

    @BeforeEach
    private void setUp () {
        when(jwtUtil.extractEmail(validRefreshToken)).thenReturn(email);
        when(jwtUtil.validateToken(validRefreshToken, email)).thenReturn(true);
        when(jwtUtil.generateToken(email, 1000 * 60 * 15L)).thenReturn(newAccessToken);

        when(jwtUtil.validateToken(invalidRefreshToken, email)).thenReturn(false);
        when(jwtUtil.extractEmail(invalidRefreshToken)).thenThrow(new IllegalArgumentException("Invalid token"));
    }

    @Test
    public void testRefresh_WithValidRefreshToken_ShouldReturnNewAccessToken() throws Exception {
        mockMvc.perform(post("/api/auth/refresh")
                .cookie(new Cookie("refreshToken", validRefreshToken)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value(newAccessToken));
    }

    @Test
    public void testRefresh_WithInvalidRefreshToken_ShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(post("/api/auth/refresh")
                .cookie(new Cookie("refreshToken", invalidRefreshToken)))
            .andExpect(status().isUnauthorized());
    }

    @Test
    public void testRefresh_MissingRefreshToken_ShouldReturnUnauthorized() throws Exception {
        mockMvc.perform(post("/api/auth/refresh"))
            .andExpect(status().isUnauthorized());
    }
}
