DROP TABLE IF EXISTS carrito CASCADE;
DROP TABLE IF EXISTS inventario CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  mail VARCHAR(100) UNIQUE NOT NULL,
  pass TEXT NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT
);

CREATE TABLE inventario (
  id_product SERIAL PRIMARY KEY,
  product VARCHAR(100) NOT NULL,
  description text,
  price INTEGER NOT NULL,
  image TEXT,
  stock INTEGER NOT NULL,
  type VARCHAR(50),
  is_favorite BOOLEAN DEFAULT false,
  userid INTEGER
);

ALTER TABLE inventario
ADD CONSTRAINT fk_usuario
FOREIGN KEY (userid)
REFERENCES usuario(id)
ON DELETE SET NULL;

CREATE TABLE carrito (
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
  productid INTEGER REFERENCES inventario(id_product) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pendiente'
);

INSERT INTO usuario (nombre, apellido, mail, pass, telefono, direccion) VALUES
('Admin', 'Principal', 'admin@example.com', '$2a$10$Q7eY/j.fQW/g1zC7sA4zIe/zC7sA4zIe/zC7sA4zIe/zC7sA4zIe', '912345678', 'Calle Falsa 123')
ON CONFLICT (mail) DO NOTHING;

INSERT INTO inventario (product, description, price, image, stock, type, is_favorite, userid) VALUES
('Camiseta Casual', 'Camiseta de algodon suave, varios colores.', 25, 'url_camiseta.jpg', 100, 'ropa', false, NULL),
('Pantalon Vaquero', 'Vaquero clasico, slim fit.', 60, 'url_pantalon.jpg', 50, 'ropa', true, NULL),
('Zapatillas Urbanas', 'Zapatillas comodas para el dia a dia.', 85, 'url_zapatillas.jpg', 30, 'calzado', false, NULL),
('Sudadera con Capucha', 'Sudadera abrigada para invierno.', 45, 'url_sudadera.jpg', 70, 'ropa', false, NULL)
ON CONFLICT (product) DO NOTHING;