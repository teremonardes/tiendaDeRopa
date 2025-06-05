 
INSERT INTO usuario (nombre, apellido, mail, pass, telefono, direccion)
VALUES ('Teresita', 'Monardes', 'teresita@mail.com', '123456', '123456789', 'Calle Falsa 123');

-- Asumiendo que el id generado fue 1
INSERT INTO inventario (product, description, price, image, stock, type, is_favorite, userid)
VALUES ('Camisa', 'Camisa blanca', 20.5, 'https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/1920x0/paris/785963/variant/images/e9c2ece7-1df2-4b76-93d1-73caade319d4/785963-0101-001.jpg?text=Polera+Blanca', 10, 'polera', false, 1);

como usar la tabla de carrito
-- INSERT INTO carrito (userid, productid, quantity)
-- VALUES (1, 3, 2);
INSERT INTO carrito (userid, productid, quantity)
VALUES (1, 1, 2);