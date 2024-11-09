package auth;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import src.main.java.dev.users.UserProfile;
import src.main.java.dev.users.UserRepository;
import src.main.java.dev.users.UserService;
import src.main.java.dev.auth.jwt.JwtUtil;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import src.main.java.dev.App;
import testConf.factories.UserFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(classes = App.class)
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private UserRepository userRepository;

    private UserProfile userRegular;

    @BeforeEach
    public void setUp() {
        userRegular = UserFactory.createRegularUser();
    }

    @Test
    public void testLogin_SuccessfulAuthentication() throws Exception {
        when(userService.authenticate(userRegular.getEmail(), userRegular.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken(any(String.class), eq(1000 * 60 * 15L))).thenReturn("mocked.jwt.token");
        when(jwtUtil.generateToken(any(String.class), eq(1000 * 60 * 60 * 24 * 30L))).thenReturn("mocked.jwt.refresh.token");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + userRegular.getEmail() + "\", \"password\":\"" + userRegular.getPassword() + "\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.user").value(userRegular.getEmail()))
            .andExpect(jsonPath("$.token").isNotEmpty())
            .andExpect(header().exists("Set-Cookie"))
            .andExpect(header().string("Set-Cookie", containsString("refreshToken=mocked.jwt.refresh.token")))
            .andExpect(header().string("Set-Cookie", containsString("HttpOnly")))
            .andExpect(header().string("Set-Cookie", containsString("Path=/")))
            .andExpect(header().string("Set-Cookie", containsString("Max-Age=2592000")));
    }

    @Test
    public void testLogin_FailedAuthentication() throws Exception {
        String password = "BadPassword";

        when(userService.authenticate(eq(userRegular.getEmail()), eq(password))).thenReturn(false);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + userRegular.getEmail() + "\", \"password\":\"" + password + "\"}"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    public void testCreateUser_SuccessfulRegistration() throws Exception {
        UserProfile newAdminUser = UserFactory.createAdminUser();
        String registerJson = objectMapper.writeValueAsString(newAdminUser);

        when(userService.createUser(
            any(String.class),
            any(String.class),
            any(String.class),
            any(String.class),
            any(String.class)
        )).thenReturn(newAdminUser);

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerJson))
            .andExpect(status().isCreated())
            .andExpect(content().string("User registered successfully"));
    }

    @Test
    public void testCreateUser_WithExistingEmail() throws Exception {
        String registerJson = objectMapper.writeValueAsString(userRegular);

        when(userService.createUser(
            any(String.class),
            any(String.class),
            eq(userRegular.getEmail()),
            any(String.class), any()
        )).thenThrow(new IllegalArgumentException("User already exists"));

        mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(registerJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("User already exists"));
    }
}
