CREATE TABLE blogs(
  id serial PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, title, url) VALUES ('Dan Abramov', 'On let vs const', 'https://overreacted.io/on-let-vs-const/');
INSERT INTO blogs (author, title, url) VALUES ('Laurenz Albe', 'Gaps in sequences in PostgreSQL', 'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/');