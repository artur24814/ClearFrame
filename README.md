# ClearFrame
### Image Processing Application

This application offers advanced image editing capabilities, specializing in removing backgrounds and enhancing photo elements to create polished, professional images. Ideal for personal, marketing, and e-commerce needs, it combines machine learning techniques with customizable editing tools to streamline image enhancement processes. 

## Features
- **Background Removal**: Seamlessly remove backgrounds from images with precision.
- **Image Enhancement**: Edit image elements like colors, shadows, and contrast.
- **User Authentication**: Secure login and registration using JWT-based authentication.

## Tech Stack
- **Backend**: Java with Spring Boot
  - Dependencies:
    - `spring-boot-starter-data-jpa`
    - `spring-boot-starter-web`
    - `spring-boot-starter-security`
    - `h2database`
    - `openCv`
    - `jjwt-api`, `jjwt-impl`, and `jjwt-jackson` for JWT handling
- **Frontend**: React
  - Main Libraries: `axios`, `react-router-dom`, `react-bootstrap`, `react-hook-form`, `yup`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git

2. Backend Setup:
    - Navigate to the `backend` directory.
    - Build and run the Spring Boot application:
        ```bash
        mvn spring-boot:run 
        ```
3. Frontend Setup:
    - Navigate to the `frontend` directory.
    - Install dependencies and start the application:
        ```bash
        npm install
        npm start
        ```

## API Documentation
<details> <summary>API Endpoints</summary>

### Authentication Endpoints
##### Login
Endpoint: `POST /api/auth/login`

Authenticates a user by email and password, returning a JSON Web Token (JWT) on success.

- Request Body:
    ```json
    {
    "email": "user@example.com",
    "password": "securePassword"
    }
    ```
- Response:
    - 200 OK: Returns a JSON object with the user's email and JWT token:
        ```json
        {
        "user": "user@example.com",
        "token": "jwt-token"
        }
        ```
    - 401 Unauthorized: Authentication failed.

#### Register
Endpoint: `POST /api/auth/register`

Creates a new user profile.

- Request Body:
    ```json
    {
    "firstName": "John",
    "secondName": "Doe",
    "email": "john.doe@example.com",
    "password": "newSecurePassword",
    "permissions": "user"
    }
    ```
- Response:
    - 201 Created: `"User registered successfully"`
    - 400 Bad Request: Returns an error message if registration fails.

### Background Removal
Endpoint: `POST /api/bg-remove/process`

Processes an uploaded image by removing its background and returns the modified image in PNG format.

- Request Parameters:
    `file` (required): An image file in `multipart/form-data` format to be processed.
- Example Request:
    ```bash
    curl -X POST http://localhost:8080/api/bg-remove/process \
        -H "Content-Type: multipart/form-data" \
        -F "file=@/path/to/image.png"
    ```
- Response:
    - 200 OK: Returns the processed image with the background removed in image/png format.
    - 400 Bad Request: Returns if the uploaded file is empty or missing.
</details>

## License
This project is licensed under the MIT License.

## Developers
Contributions are welcome! Please follow the contribution guidelines and open a pull request.

