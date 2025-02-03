CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATE NOT NULL,
  status ENUM('pending', 'in progress', 'completed') NOT NULL
);