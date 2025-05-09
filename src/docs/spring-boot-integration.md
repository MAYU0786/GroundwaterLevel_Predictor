# Spring Boot Backend Integration Guide

This document provides instructions for integrating the Spring Boot backend with the React frontend for authentication.

## Backend Requirements

Your Spring Boot backend should provide the following REST API endpoints:

### Authentication Endpoints

1. **Login**
   - URL: `/api/auth/login`
   - Method: `POST`
   - Request Body: `{ "email": "user@example.com", "password": "password123" }`
   - Response: `{ "token": "jwt_token_here", "user": { "id": 1, "name": "User Name", "email": "user@example.com" } }`

2. **Register**
   - URL: `/api/auth/register`
   - Method: `POST`
   - Request Body: `{ "name": "User Name", "email": "user@example.com", "password": "password123" }`
   - Response: `{ "token": "jwt_token_here", "user": { "id": 1, "name": "User Name", "email": "user@example.com" } }`

3. **Logout**
   - URL: `/api/auth/logout`
   - Method: `POST`
   - Headers: `Authorization: Bearer jwt_token_here`
   - Response: `{ "message": "Logged out successfully" }`

4. **Forgot Password**
   - URL: `/api/auth/forgot-password`
   - Method: `POST`
   - Request Body: `{ "email": "user@example.com" }`
   - Response: `{ "message": "Password reset email sent" }`

5. **Validate Token**
   - URL: `/api/auth/validate-token`
   - Method: `GET`
   - Headers: `Authorization: Bearer jwt_token_here`
   - Response: `{ "valid": true, "user": { "id": 1, "name": "User Name", "email": "user@example.com" } }`

## Spring Boot Implementation

Here's a simple implementation of the required controllers and services:

### User Entity

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    // Getters and setters
}

