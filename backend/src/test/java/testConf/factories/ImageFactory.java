package testConf.factories;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ImageFactory {
    public static byte[] getFakeImageBytes (int width, int height, String format, int type) throws IOException {
        BufferedImage bufferedImage = new BufferedImage(width, height, type);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, format, baos);

        byte[] imageBytes = baos.toByteArray();

        return imageBytes;
    }
}
