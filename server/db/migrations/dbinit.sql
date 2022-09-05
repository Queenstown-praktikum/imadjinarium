create TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255)
);

create TABLE topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  body VARCHAR(255),
  user_id INTEGER NOT NULL,
  created_at timestamp default now(),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
