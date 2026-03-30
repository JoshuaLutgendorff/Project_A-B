CREATE DATABASE IF NOT EXISTS aone_clothing;
USE aone_clothing;

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (name, message) VALUES
('Josh', 'Interested in a Barbour jacket.'),
('Taylor', 'Do you carry Blundstone boots in size 9?'),
('Morgan', 'What are your store hours this weekend?');