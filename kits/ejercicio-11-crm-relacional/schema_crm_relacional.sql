-- Esquema Relacional CRM B2B (Práctica SENA ADSO)
CREATE TABLE empresas (
  id_empresa VARCHAR(16) PRIMARY KEY,
  nit VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  ciudad VARCHAR(60) NOT NULL,
  sector VARCHAR(60) NOT NULL
);

CREATE TABLE oportunidades (
  id_negocio VARCHAR(16) PRIMARY KEY,
  id_empresa VARCHAR(16) NOT NULL REFERENCES empresas(id_empresa),
  titulo VARCHAR(160) NOT NULL,
  valor_cop NUMERIC(14, 2) NOT NULL CHECK (valor_cop >= 0),
  probabilidad_pct INT NOT NULL CHECK (probabilidad_pct BETWEEN 0 AND 100),
  etapa VARCHAR(40) NOT NULL,
  proximo_contacto DATE
);

CREATE TABLE actividades (
  id_actividad VARCHAR(16) PRIMARY KEY,
  id_negocio VARCHAR(16) NOT NULL REFERENCES oportunidades(id_negocio),
  fecha_ejecucion DATE NOT NULL,
  tipo VARCHAR(60) NOT NULL,
  responsable VARCHAR(80) NOT NULL,
  resultado TEXT,
  proximo_seguimiento DATE
);
