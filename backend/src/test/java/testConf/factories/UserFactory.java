package testConf.factories;

import src.main.java.dev.users.UserProfile;

public class UserFactory {
    public static UserProfile createAdminUser() {
        UserProfile userProfile = new UserProfile(
            null,
            "Admin",
            "User",
            "admin@example.com",
            "admin123",
            "ADMIN"
        );
        return userProfile;
    }

    public static UserProfile createRegularUser() {
        UserProfile userProfile = new UserProfile(
            null,
            "Regular",
            "User",
            "user@example.com",
            "password123",
            "BASIC"
        );
        return userProfile;
    }
}
