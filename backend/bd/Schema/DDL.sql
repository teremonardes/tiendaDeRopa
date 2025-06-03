CREATE DATABASE mitienda
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;





CREATE TABLE public.carrito
(
    id_carrito serial NOT NULL,
    usuario integer,
    producto integer,
    cantidad integer,
    total integer,
    PRIMARY KEY (id_carrito)
);

ALTER TABLE IF EXISTS public.carrito
    OWNER to postgres;

ALTER TABLE IF EXISTS public.carrito
    ADD CONSTRAINT "FK_usuario" FOREIGN KEY (usuario)
    REFERENCES public.usuario (id_usuario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.carrito
    ADD CONSTRAINT "FK_producto" FOREIGN KEY (producto)
    REFERENCES public.inventario (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;



CREATE TABLE public.inventario
(
    id_producto serial NOT NULL,
    producto integer ,
    descripcion_producto character varying(50),
    imagen_producto text,
    precio integer,
    stock integer,
    talla character varying(5),
    PRIMARY KEY (id_producto)
);

ALTER TABLE IF EXISTS public.inventario
    OWNER to postgres;



CREATE TABLE public.usuario
(
    id_usuario serial NOT NULL,
    nombre character varying(50),
    apellidos character varying(50),
    direccion character varying(60),
    email character varying(20),
    password character varying(25),
    telefono integer,
    PRIMARY KEY (id_usuario)
);

ALTER TABLE IF EXISTS public.usuario
    OWNER to postgres;

CREATE TABLE public.publicacion
(
    id_publicacion serial NOT NULL,
    usuario integer,
    productos integer,
    estrellas integer,
    PRIMARY KEY (id_publicacion)
);

ALTER TABLE IF EXISTS public.publicacion
    OWNER to postgres;

ALTER TABLE IF EXISTS public.publicacion
    ADD CONSTRAINT fk_usuario FOREIGN KEY (usuario)
    REFERENCES public.usuario (id_usuario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.publicacion
    ADD CONSTRAINT fk_producto FOREIGN KEY (productos)
    REFERENCES public.inventario (id_producto) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
