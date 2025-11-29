CREATE DATABASE IF NOT EXISTS theater_app;
USE theater_app;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS seats;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS users;



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE venues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(300),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review_count INT,
    review_rating FLOAT(3,1)
);



CREATE TABLE shows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venue_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    poster_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venue_id INT NOT NULL,
    section VARCHAR(50),
    seat_row VARCHAR(50),
    number VARCHAR(50),
    grade VARCHAR(50),
    FOREIGN KEY (venue_id) REFERENCES venues(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    venue_id INT NOT NULL,
    seat_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    content TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(id)
        ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
        ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id)
        ON DELETE CASCADE
);

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT,
    venue_id INT,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(id)
        ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(id)
        ON DELETE CASCADE
);
