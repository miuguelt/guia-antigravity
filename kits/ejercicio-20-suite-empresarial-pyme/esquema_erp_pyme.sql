-- Esquema ERP Simplificado — Proyecto Cumbre Antigravity
CREATE TABLE productos (
  sku VARCHAR(16) PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('Producto', 'Servicio')),
  stock_actual INT,
  costo_unitario_cop NUMERIC(14,2) NOT NULL,
  precio_venta_cop NUMERIC(14,2) NOT NULL
);

CREATE TABLE pedidos (
  id_pedido VARCHAR(16) PRIMARY KEY,
  sku VARCHAR(16) NOT NULL REFERENCES productos(sku),
  cliente VARCHAR(120) NOT NULL,
  cantidad INT NOT NULL CHECK (cantidad > 0),
  total_cop NUMERIC(14,2) NOT NULL,
  estado_cobro VARCHAR(12) NOT NULL CHECK (estado_cobro IN ('Cobrado', 'Por cobrar'))
);

CREATE TABLE egresos (
  id_egreso SERIAL PRIMARY KEY,
  periodo VARCHAR(7) NOT NULL,
  concepto VARCHAR(120) NOT NULL,
  valor_cop NUMERIC(14,2) NOT NULL CHECK (valor_cop >= 0)
);
