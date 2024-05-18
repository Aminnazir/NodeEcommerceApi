-- Users table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL
);

-- Products table
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          price NUMERIC NOT NULL,
                          category VARCHAR(255)
);

-- Carts table
CREATE TABLE carts (
                       id SERIAL PRIMARY KEY,
                       user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Cart items table
CREATE TABLE cart_items (
                            id SERIAL PRIMARY KEY,
                            cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
                            product_id INT REFERENCES products(id) ON DELETE CASCADE,
                            quantity INT NOT NULL
);

-- Orders table
CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        user_id INT REFERENCES users(id) ON DELETE CASCADE,
                        total_cost NUMERIC NOT NULL
);

-- Order items table
CREATE TABLE order_items (
                             id SERIAL PRIMARY KEY,
                             order_id INT REFERENCES orders(id) ON DELETE CASCADE,
                             product_id INT REFERENCES products(id) ON DELETE CASCADE,
                             quantity INT NOT NULL
);
