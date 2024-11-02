package src.main.java.dev.bgRemoval;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

@RestController
@RequestMapping("/api/bg-remove")
public class bgRemovalController {

    private static final Logger logger = LoggerFactory.getLogger(bgRemovalController.class);

    @PostMapping("/process")
    public ResponseEntity<byte[]> process(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            logger.warn("Plik jest pusty!");
            return ResponseEntity.badRequest().build();
        }
        BufferedImage inputImage = ImageIO.read(file.getInputStream());

        if (inputImage == null) {
            logger.warn("Nie udało się wczytać obrazu z pliku!");
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(inputImage, "png", baos);
        byte[] imageBytes = baos.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return ResponseEntity.ok().headers(headers).body(imageBytes);
    }
}