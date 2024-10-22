package dev.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserProfile> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserProfile> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserProfile createUser(String firstName, String secondName, String email, String password, String permissions) {
        UserProfile user = new UserProfile(null, firstName, secondName, email, password, permissions); // Hasło zostanie haszowane w konstruktorze
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean authenticate(String email, String password) {
        UserProfile user = userRepository.findByEmail(email);
        if (user == null) {
            return false;
        }
        return user.checkPassword(password);
    }
}
