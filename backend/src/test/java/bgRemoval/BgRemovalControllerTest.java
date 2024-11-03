package bgRemoval;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import src.main.java.dev.App;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = App.class)
@AutoConfigureMockMvc
public class BgRemovalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldReturnImage_whenImageIsUploaded() throws Exception {
        BufferedImage bufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        ImageIO.write(bufferedImage, "png", baos);
        byte[] imageBytes = baos.toByteArray();

        MockMultipartFile mockMultipartFile = new MockMultipartFile(
            "file",
            "test.png",
            MediaType.IMAGE_PNG_VALUE,
            imageBytes
        );

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/bg-remove/process")
                .file(mockMultipartFile))
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.header().string("Content-Type", "image/png"))
            .andExpect(content().bytes(imageBytes));
    }

    @Test
    public void shouldReturnError_whenImageIsNull() throws Exception {
        MockMultipartFile emptyFile = new MockMultipartFile(
            "file",
            "empty.png",
            MediaType.IMAGE_PNG_VALUE,
            new byte[0]
        );

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/bg-remove/process")
                .file(emptyFile))
            .andExpect(status().isBadRequest());
    }
}
