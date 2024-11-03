package src.main.java.dev.bgRemoval;

import org.bytedeco.opencv.opencv_core.Mat;
import org.bytedeco.opencv.opencv_core.MatVector;
import org.bytedeco.opencv.opencv_core.Rect;
import org.bytedeco.opencv.opencv_core.Scalar;
import org.bytedeco.opencv.global.opencv_core;
import org.bytedeco.opencv.global.opencv_imgcodecs;
import org.bytedeco.opencv.global.opencv_imgproc;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BgRemoval {
    private static final Logger logger = LoggerFactory.getLogger(src.main.java.dev.bgRemoval.BgRemoval.class);

    public byte[] processedImage(MultipartFile file) throws IOException {
        Mat processedImage = extractLargeObjects(file);
        return matToByteArray(processedImage);
    }

    private Mat extractLargeObjects(MultipartFile file) throws IOException {
        Mat image = multipartFileToMat(file);

        // Krok 1: Konwersja do skali szarości
        Mat gray = new Mat();
        opencv_imgproc.cvtColor(image, gray, opencv_imgproc.COLOR_BGR2GRAY);

        // Krok 2: Rozmycie Gaussa dla usunięcia szumów
        opencv_imgproc.GaussianBlur(gray, gray, new org.bytedeco.opencv.opencv_core.Size(5, 5), 0);

        // Krok 3: Progowanie binarne
        Mat binary = new Mat();
        opencv_imgproc.threshold(gray, binary, 100, 255, opencv_imgproc.THRESH_BINARY);

        // Krok 4: Wyszukiwanie konturów
        MatVector contours = new MatVector();
        Mat hierarchy = new Mat();
        opencv_imgproc.findContours(binary, contours, hierarchy, opencv_imgproc.RETR_EXTERNAL, opencv_imgproc.CHAIN_APPROX_SIMPLE);

        // Krok 5: Utworzenie nowego obrazu z tymi dużymi obiektami
        Mat result = Mat.zeros(image.size(), image.type()).asMat();

        for (int i = 0; i < contours.size(); i++) {
            Mat contour = contours.get(i);
            double area = opencv_imgproc.contourArea(contour);
            if (area > 5000 && area < 50_000) {
                Rect boundingBox = opencv_imgproc.boundingRect(contour);
                Mat roi = new Mat(image, boundingBox);
                roi.copyTo(new Mat(result, boundingBox));
            }
        }

        return result;
    }

    private Mat multipartFileToMat(MultipartFile file) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(file.getBytes()));
        return bufferedImageToMat(bufferedImage);
    }

    private Mat bufferedImageToMat(BufferedImage image) {
        Mat mat = new Mat(image.getHeight(), image.getWidth(), opencv_core.CV_8UC3);
        for (int y = 0; y < image.getHeight(); y++) {
            for (int x = 0; x < image.getWidth(); x++) {
                int rgb = image.getRGB(x, y);
                int blue = rgb & 0xFF;
                int green = (rgb >> 8) & 0xFF;
                int red = (rgb >> 16) & 0xFF;
                mat.ptr(y, x).put((byte) blue, (byte) green, (byte) red);
            }
        }
        return mat;
    }

    private byte[] matToByteArray(Mat mat) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BufferedImage bufferedImage = matToBufferedImage(mat);
            ImageIO.write(bufferedImage, "png", baos);
            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private BufferedImage matToBufferedImage(Mat mat) {
        int type = BufferedImage.TYPE_BYTE_GRAY;
        if (mat.channels() > 1) {
            type = BufferedImage.TYPE_3BYTE_BGR;
        }
        BufferedImage image = new BufferedImage(mat.cols(), mat.rows(), type);
        byte[] data = new byte[mat.cols() * mat.rows() * (int) mat.elemSize()];
        mat.data().get(data);
        image.getRaster().setDataElements(0, 0, mat.cols(), mat.rows(), data);
        return image;
    }
}
