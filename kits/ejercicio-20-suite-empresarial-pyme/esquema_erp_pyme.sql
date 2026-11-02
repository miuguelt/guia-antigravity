-- Esquema ERP Simplificado — Proyecto Cumbre Antigravity
CREATE TABLE resumen_tesoreria (
  periodo VARCHAR(10) PRIMARY KEY,
  ingresos_cobrados_cop NUMERIC(14,2) NOT NULL,
  egresos_operativos_cop NUMERIC(14,2) NOT NULL,
  reserva_impositiva_pct NUMERIC(5,2) DEFAULT 15.00
);
