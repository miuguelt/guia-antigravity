-- Contrato SQL para Orquestación Multi-Agente sin Colisiones
CREATE TABLE salones (
  id_salon VARCHAR(16) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  capacidad_sillas INT NOT NULL,
  inscritos_actuales INT NOT NULL
);

CREATE VIEW v_alerta_sobrecupo AS
SELECT id_salon, nombre, capacidad_sillas, inscritos_actuales,
       (inscritos_actuales - capacidad_sillas) AS exceso_aforo
FROM salones
WHERE inscritos_actuales > capacidad_sillas;
