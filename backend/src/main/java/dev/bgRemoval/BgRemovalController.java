package src.main.java.dev.bgRemoval;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import src.main.java.dev.bgRemoval.BgRemoval;

@RestController
@RequestMapping("/api/bg-remove")
public class BgRemovalController {

    private static final Logger logger = LoggerFactory.getLogger(src.main.java.dev.bgRemoval.BgRemovalController.class);
    private final BgRemoval bgRemoval = new BgRemoval();

    @PostMapping("/process")
    public ResponseEntity<byte[]> process(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            logger.warn("Plik jest pusty!");
            return ResponseEntity.badRequest().build();
        }

        byte[] imageBytes = bgRemoval.processedImage(file);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return ResponseEntity.ok().headers(headers).body(imageBytes);
    }
}