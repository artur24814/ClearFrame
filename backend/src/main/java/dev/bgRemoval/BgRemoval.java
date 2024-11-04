package src.main.java.dev.bgRemoval;

import org.bytedeco.opencv.opencv_core.*;
import org.bytedeco.opencv.global.opencv_core;
import org.bytedeco.opencv.global.opencv_imgproc;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import javax.imageio.ImageIO;
import java.io.IOException;


public class BgRemoval {
    private static final Logger logger = LoggerFactory.getLogger(src.main.java.dev.bgRemoval.BgRemoval.class);

    public byte[] processedImage(MultipartFile file) throws IOException {
        Mat processedImage = removeBackground(file);
        return matToByteArray(processedImage);
    }

    public Mat removeBackground(MultipartFile file) throws IOException {
        Mat image = multipartFileToMat(file);

        Mat mask = getMaskForGrabCut(image);
        Rect rect = getRectSurroundingObjectInTheCenterImage(image);

        Mat bgdModel = new Mat();
        Mat fgdModel = new Mat();

        // Perform segmentation with GrabCut
        opencv_imgproc.grabCut(image, mask, rect, bgdModel, fgdModel, 5, opencv_imgproc.GC_INIT_WITH_RECT);

        Mat foregroundMask = createForegroundMask(mask);
        Mat foreground = new Mat(image.size(), opencv_core.CV_8UC3, new Scalar(0, 0, 0, 255));

        image.copyTo(foreground, foregroundMask);
        return foreground;
    }

    private Mat getMaskForGrabCut(Mat image) {
        return new Mat(image.size(), opencv_core.CV_8UC1, new Scalar(opencv_imgproc.GC_BGD));
    }

    private Rect getRectSurroundingObjectInTheCenterImage (Mat image) {
        return new Rect(10, 10, image.cols() - 20, image.rows() - 20);
    }

    private Mat createForegroundMask(Mat mask) {
        Mat foregroundMask = new Mat(mask.size(), opencv_core.CV_8UC1);
        for (int y = 0; y < mask.rows(); y++) {
            for (int x = 0; x < mask.cols(); x++) {
                byte value = mask.ptr(y, x).get();
                // We set 255 for foreground pixels (GC_FGD or GC_PR_FGD) and 0 for the rest
                if (value == opencv_imgproc.GC_FGD || value == opencv_imgproc.GC_PR_FGD) {
                    foregroundMask.ptr(y, x).put((byte) 255);
                } else {
                    foregroundMask.ptr(y, x).put((byte) 0);
                }
            }
        }
        return foregroundMask;
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
