#Hola!

#CREATE DATABASE PW2_MOON_V1;
#USE PW2_MOON_V1;
DROP DATABASE pw2_moon_v1;

-- Users Table
-- Users Table
CREATE TABLE Users (
    user_id CHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Polls Table
CREATE TABLE Polls (
    poll_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    poll_title VARCHAR(255),
    description TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Poll_Images Table
CREATE TABLE Poll_Images (
    image_id CHAR(36) PRIMARY KEY,
    poll_id CHAR(36),
    image_url VARCHAR(255),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (poll_id) REFERENCES Polls(poll_id)
);

-- Poll_Comments Table
CREATE TABLE Poll_Comments (
    comment_id CHAR(36) PRIMARY KEY,
    poll_id CHAR(36),
    user_id CHAR(36),
    comment_text TEXT,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (poll_id) REFERENCES Polls(poll_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Options Table (Antes Questions)
CREATE TABLE Options (
    option_id CHAR(36) PRIMARY KEY,
    poll_id CHAR(36),
    option_text TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (poll_id) REFERENCES Polls(poll_id)
);

-- Response Options Table
CREATE TABLE ResponseOptions (
    option_id CHAR(36) PRIMARY KEY,
    question_id CHAR(36),
    option_text TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (question_id) REFERENCES Options(option_id)
);

-- User Responses Table
CREATE TABLE UserResponses (
    response_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    poll_id CHAR(36),
    question_id CHAR(36),
    option_id CHAR(36),
    open_response TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (poll_id) REFERENCES Polls(poll_id),
    FOREIGN KEY (question_id) REFERENCES Options(option_id),
    FOREIGN KEY (option_id) REFERENCES ResponseOptions(option_id)
);

-- Comments Table
CREATE TABLE Comments (
    comment_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    poll_id CHAR(36),
    comment_text TEXT,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (poll_id) REFERENCES Polls(poll_id)
);

-- Votes Table
CREATE TABLE Votes (
    vote_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    poll_id CHAR(36),
    is_like BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (poll_id) REFERENCES Polls(poll_id)
);

-- Notifications Table
CREATE TABLE Notifications (
    notification_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    notification_text TEXT,
    notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- User_Notifications Table (Junction Table)
CREATE TABLE User_Notifications (
    user_notification_id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    notification_id CHAR(36),
    is_read BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (notification_id) REFERENCES Notifications(notification_id)
);
