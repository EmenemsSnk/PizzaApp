INSERT INTO pizza (name, description, price, image_url)
SELECT 'Margherita', 'Classic tomato sauce, fresh mozzarella, and basil', 11.99, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Margherita');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'Pepperoni', 'Tomato sauce, mozzarella, and loads of pepperoni', 13.99, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Pepperoni');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'BBQ Chicken', 'BBQ sauce, grilled chicken, red onions, and cilantro', 14.99, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'BBQ Chicken');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'Veggie Supreme', 'Tomato sauce, mozzarella, bell peppers, mushrooms, olives, and onions', 12.99, 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Veggie Supreme');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'Hawaiian', 'Tomato sauce, mozzarella, ham, and pineapple', 13.49, 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Hawaiian');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'Four Cheese', 'Tomato sauce, mozzarella, gorgonzola, parmesan, and ricotta', 15.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Four Cheese');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'Meat Lovers', 'Tomato sauce, mozzarella, pepperoni, sausage, bacon, and ham', 16.99, 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Meat Lovers');

INSERT INTO pizza (name, description, price, image_url)
SELECT 'Buffalo Chicken', 'Buffalo sauce, mozzarella, grilled chicken, and ranch drizzle', 14.49, 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400'
WHERE NOT EXISTS (SELECT 1 FROM pizza WHERE name = 'Buffalo Chicken');
