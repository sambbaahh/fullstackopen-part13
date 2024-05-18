CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Maija Mehilainen', 'http://example.com', 'Example 1');
INSERT INTO blogs (author, url, title, likes) VALUES ('Pekka Puupaa', 'http://example.com', 'Example 2', 2);