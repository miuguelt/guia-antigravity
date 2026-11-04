/* Catálogo de Kits de Archivos Semilla Reales — Nivel 3 (Ejercicios 11 al 15) */
/* Nota: Todos los documentos y registros de este módulo son materiales de práctica creados para aprender y no contienen datos reales. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const KITS_N3 = {
    11: {
      zipName: 'kit-ej11-crm-relacional-sql.zip',
      folderName: 'ejercicio-11-crm-relacional',
      summary: 'Datos relacionales de cartera (.json), esquema DDL con llaves primarias y foráneas (.sql) y agenda de actividades (.csv).',
      files: [
        {
          filename: 'cartera_crm_relacional.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Empresas y oportunidades comerciales con valor, probabilidad y etapa',
          content: JSON.stringify({
            empresas: [
              { idEmpresa: 'EMP-01', nit: '900.412.880-1', nombre: 'Clínica del Norte S.A.S.', ciudad: 'Bogotá', sector: 'Salud' },
              { idEmpresa: 'EMP-02', nit: '901.205.331-7', nombre: 'Agroexportadora del Oriente S.A.S.', ciudad: 'Bucaramanga', sector: 'Agroindustria' }
            ],
            oportunidades: [
              { idNegocio: 'OP-101', idEmpresa: 'EMP-01', titulo: 'Renovación Equipos Diagnóstico', valorCOP: 10000000, probabilidadPct: 50, etapa: 'Propuesta Enviada', proximoContacto: '2026-11-05' },
              { idNegocio: 'OP-102', idEmpresa: 'EMP-01', titulo: 'Licencia Telemedicina Anual', valorCOP: 4000000, probabilidadPct: 25, etapa: 'Diagnóstico', proximoContacto: '' },
              { idNegocio: 'OP-201', idEmpresa: 'EMP-02', titulo: 'Trazabilidad de Lotes de Exportación', valorCOP: 7500000, probabilidadPct: 0, etapa: 'Cerrado Perdido', proximoContacto: '' }
            ],
            reglaEmbudo: 'Las oportunidades en etapa Cerrado Perdido no suman al embudo ni generan alerta de seguimiento'
          }, null, 2)
        },
        {
          filename: 'schema_crm_relacional.sql', ext: 'sql', mime: 'application/sql;charset=utf-8',
          role: 'Esquema relacional SQL con integridad referencial entre empresas, oportunidades y actividades',
          content: '-- Esquema Relacional CRM B2B (Práctica SENA ADSO)\nCREATE TABLE empresas (\n  id_empresa VARCHAR(16) PRIMARY KEY,\n  nit VARCHAR(20) NOT NULL UNIQUE,\n  nombre VARCHAR(120) NOT NULL,\n  ciudad VARCHAR(60) NOT NULL,\n  sector VARCHAR(60) NOT NULL\n);\n\nCREATE TABLE oportunidades (\n  id_negocio VARCHAR(16) PRIMARY KEY,\n  id_empresa VARCHAR(16) NOT NULL REFERENCES empresas(id_empresa),\n  titulo VARCHAR(160) NOT NULL,\n  valor_cop NUMERIC(14, 2) NOT NULL CHECK (valor_cop >= 0),\n  probabilidad_pct INT NOT NULL CHECK (probabilidad_pct BETWEEN 0 AND 100),\n  etapa VARCHAR(40) NOT NULL,\n  proximo_contacto DATE\n);\n\nCREATE TABLE actividades (\n  id_actividad VARCHAR(16) PRIMARY KEY,\n  id_negocio VARCHAR(16) NOT NULL REFERENCES oportunidades(id_negocio),\n  fecha_ejecucion DATE NOT NULL,\n  tipo VARCHAR(60) NOT NULL,\n  responsable VARCHAR(80) NOT NULL,\n  resultado TEXT,\n  proximo_seguimiento DATE\n);\n'
        },
        {
          filename: 'actividades_seguimiento.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Historial de interacciones y detección de oportunidades huérfanas sin seguimiento',
          content: 'ID_Actividad,ID_Negocio,Fecha_Ejecucion,Tipo,Responsable,Resultado,Proximo_Seguimiento_Programado\nACT-01,OP-101,2026-10-28,Demostracion Tecnica,Camila Rojas,Cliente solicitó ajuste de alcance,2026-11-05\nACT-02,OP-102,2026-10-20,Llamada Exploratoria,Diego Castro,Interés inicial pero sin fecha agendada,\nACT-03,OP-201,2026-10-02,Reunion de Cierre,Camila Rojas,El cliente eligió otro proveedor,\n'
        }
      ]
    },
    12: {
      zipName: 'kit-ej12-skill-auditoria-gastos.zip',
      folderName: 'ejercicio-12-skill-auditoria',
      summary: 'Especificación oficial SKILL.md, relación de gastos con compras fraccionadas (.csv) y factura electrónica XML (.xml).',
      files: [
        {
          filename: 'SKILL.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Habilidad reutilizable para instalar en .agents/skills/auditoria-gastos/SKILL.md',
          content: '---\nname: auditoria-gastos\ndescription: Audita relaciones de gastos detectando excesos de tope individual y compras fraccionadas el mismo día.\n---\n\n# Procedimiento Estándar de Auditoría de Gastos (SOP)\n\n1. Verificar que ningún gasto de alimentación individual supere `$90.000 COP`.\n2. Agrupar recibos por la llave compuesta `(Empleado + Fecha + NIT_Proveedor)`.\n3. Si una agrupación presenta `>= 2` recibos el mismo día y su suma supera `$200.000 COP`, marcar **Alerta Crítica de Fraccionamiento**.\n'
        },
        {
          filename: 'relacion_gastos_viaticos.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Recibos de caja menor de una semana para auditar con la Skill',
          content: 'ID_Recibo,Empleado,Fecha,NIT_Proveedor,Proveedor,Categoria,Valor_COP,Observacion\nREC-801,Julián Mendoza,2026-10-15,900555111-2,Suministros Eléctricos Andinos,Materiales,175000,Compra cableado\nREC-802,Julián Mendoza,2026-10-15,900555111-2,Suministros Eléctricos Andinos,Materiales,175000,Compra conectores\nREC-803,Laura Gómez,2026-10-16,901222333-4,Restaurante El Mirador,Alimentacion,65000,Almuerzo visita cliente\nREC-804,Carlos Ruiz,2026-10-16,901222333-4,Restaurante El Mirador,Alimentacion,115000,Almuerzo visita cliente\nREC-805,Laura Gómez,2026-10-17,900555111-2,Suministros Eléctricos Andinos,Materiales,90000,Cinta aislante\nREC-806,Laura Gómez,2026-10-17,900555111-2,Suministros Eléctricos Andinos,Materiales,80000,Canaleta plástica\nREC-807,Julián Mendoza,2026-10-18,900777222-9,Ferretería La Esquina,Materiales,120000,Tornillería\nREC-808,Julián Mendoza,2026-10-18,900555111-2,Suministros Eléctricos Andinos,Materiales,110000,Breakers\n'
        },
        {
          filename: 'factura_electronica_fraccionada.xml', ext: 'xml', mime: 'application/xml;charset=utf-8',
          role: 'Facturas electrónicas de Suministros Eléctricos Andinos con hora de emisión',
          content: '<?xml version="1.0" encoding="UTF-8"?>\n<InvoiceBatch supplier="Suministros Eléctricos Andinos" supplierNit="900555111-2" buyer="Soluciones Integrales Andinas S.A.S.">\n  <Invoice id="REC-801" date="2026-10-15" time="09:15:00" buyerEmployee="Julián Mendoza" amountCOP="175000"/>\n  <Invoice id="REC-802" date="2026-10-15" time="15:40:00" buyerEmployee="Julián Mendoza" amountCOP="175000"/>\n  <Invoice id="REC-805" date="2026-10-17" time="10:05:00" buyerEmployee="Laura Gómez" amountCOP="90000"/>\n  <Invoice id="REC-806" date="2026-10-17" time="16:20:00" buyerEmployee="Laura Gómez" amountCOP="80000"/>\n  <Invoice id="REC-808" date="2026-10-18" time="11:45:00" buyerEmployee="Julián Mendoza" amountCOP="110000"/>\n</InvoiceBatch>\n'
        }
      ]
    },
    13: {
      zipName: 'kit-ej13-simulador-tesoreria-12m.zip',
      folderName: 'ejercicio-13-simulador-tesoreria',
      summary: 'Proyección de flujo de caja (.csv), calendario de cobros a 60 días (.json) y obligaciones de pago de contado (.yaml).',
      files: [
        {
          filename: 'flujo_tesoreria_base.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Ventas facturadas y pagos de contado de los 12 meses del año',
          content: 'Mes,Ventas_Facturadas_COP,Pagos_Contado_Obligatorios_COP\nEnero,60000000,40000000\nFebrero,60000000,40000000\nMarzo,60000000,40000000\nAbril,65000000,40000000\nMayo,65000000,40000000\nJunio,70000000,52000000\nJulio,70000000,40000000\nAgosto,70000000,40000000\nSeptiembre,75000000,40000000\nOctubre,75000000,40000000\nNoviembre,80000000,40000000\nDiciembre,90000000,52000000\n'
        },
        {
          filename: 'calendario_cartera_60dias.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Saldo inicial, plazo de cartera actual y plazos alternativos para simular',
          content: JSON.stringify({
            saldoInicialEneroCOP: 50000000,
            plazoCarteraActualDias: 60,
            plazosParaSimularDias: [0, 30, 60, 90],
            reglaCobro: 'La venta facturada en un mes se cobra completa N/30 meses después; la empresa inicia operación en enero, sin cartera de años anteriores',
            notaPagos: 'Junio y diciembre incluyen la prima legal de servicios'
          }, null, 2)
        },
        {
          filename: 'obligaciones_fijas_contado.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Desglose de los pagos mensuales que no se pueden aplazar',
          content: 'pagos_mensuales_contado_cop:\n  nomina_y_seguridad_social: 22000000\n  materias_primas_y_empaque: 12000000\n  arriendo_bodega_y_servicios: 4000000\n  impuestos_y_seguros: 2000000\nprima_servicios_junio_y_diciembre_cop: 12000000\n'
        }
      ]
    },
    14: {
      zipName: 'kit-ej14-academia-escenarios-bloom.zip',
      folderName: 'ejercicio-14-academia-competencias',
      summary: 'Banco de 4 escenarios ramificados (.json), rúbrica pedagógica de Bloom (.md) y matriz de evaluación (.csv).',
      files: [
        {
          filename: 'escenarios_competencias.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Banco de 4 dilemas operativos con 3 opciones graduadas y su nivel de Bloom',
          content: JSON.stringify({
            evaluacion: 'Criterio Operativo y Servicio al Cliente',
            umbralCertificacion: 80,
            escenarios: [
              { id: 'ESC-01', nivelBloom: 'Aplicar', titulo: 'Cliente corporativo reclama lote húmedo', optima100: 'Activar garantía inmediata con lote de respaldo y auditar transporte', aceptable60: 'Pedir fotos y esperar 48h al comité de calidad', riesgosa0: 'Negar el reclamo sin verificar trazabilidad' },
              { id: 'ESC-02', nivelBloom: 'Analizar', titulo: 'Caída temporal de facturación electrónica DIAN', optima100: 'Activar contingencia numerada y sincronizar XML al restablecer', aceptable60: 'Detener despachos hasta que vuelva el portal', riesgosa0: 'Entregar mercancía sin soporte documental' },
              { id: 'ESC-03', nivelBloom: 'Evaluar', titulo: 'Solicitud de descuento que rompe margen mínimo', optima100: 'Mantener margen ofreciendo valor agregado o ajuste de volumen', aceptable60: 'Escalar a gerencia retrasando la oferta 2 días', riesgosa0: 'Aprobar descuento a pérdida para cerrar rápido' },
              { id: 'ESC-04', nivelBloom: 'Analizar', titulo: 'Diferencia de inventario en conteo cíclico', optima100: 'Cruzar kárdex de remisiones antes de ajustar', aceptable60: 'Programar reconteo general el fin de semana', riesgosa0: 'Borrar la diferencia manualmente en el sistema' }
            ]
          }, null, 2)
        },
        {
          filename: 'rubrica_competencias_bloom.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Criterios de evaluación formativa y niveles de dominio para certificar al colaborador',
          content: '# Rúbrica de Evaluación Basada en Escenarios (Taxonomía de Bloom)\n\n- **Decisión Óptima (`100 puntos`):** Resuelve el problema del cliente protegiendo el control interno y la rentabilidad.\n- **Decisión Aceptable (`60 puntos`):** Cumple la norma pero introduce fricción o demora operativa.\n- **Decisión Riesgosa (`0 puntos`):** Expone a la empresa a pérdida financiera, sanción legal o pérdida del cliente.\n- **Promedio final:** suma de los 4 escenarios dividida entre 4.\n- **Certificación:** promedio `>= 80` puntos; si un escenario queda en `0`, se exige refuerzo aunque el promedio alcance.\n'
        },
        {
          filename: 'resultados_equipo_piloto.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Respuestas registradas en la prueba piloto para auditar el calificador',
          content: 'Participante,Cargo,Escenario_1,Escenario_2,Escenario_3,Escenario_4\nCoordinador_01,Coordinador Operativo,100,100,100,60\nAuxiliar_02,Auxiliar Bodega,100,60,60,60\nVendedora_03,Asesora Comercial,100,100,0,100\nAnalista_04,Analista de Inventarios,60,100,100,100\n'
        }
      ]
    },
    15: {
      zipName: 'kit-ej15-conciliacion-bancaria-pasarela.zip',
      folderName: 'ejercicio-15-conciliador-bancario',
      summary: 'Cruces de ventas y banco (.csv), extracto bancario detallado (.csv) y parámetros de pasarela de pagos (.json).',
      files: [
        {
          filename: 'conciliacion_ventas_banco.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Libro de ventas de octubre, sin datos del banco',
          content: 'ID_Venta,Fecha_Venta,Cliente,Monto_Bruto_COP,Medio_Pago\nV-101,2026-10-10,Restaurante La Casona,200000,Tarjeta_Credito\nV-102,2026-10-11,Hotel Guantiva Real,500000,Transferencia_PSE\nV-104,2026-10-20,Ferretería El Puente,150000,Tarjeta_Credito\nV-105,2026-10-20,Panadería San José,100000,Tarjeta_Credito\nV-103,2026-10-30,Cafetería Central,350000,Tarjeta_Credito\n'
        },
        {
          filename: 'extracto_bancario_octubre.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Extracto del banco: abonos sin referencia a la venta, un lote agrupado y un cargo no registrado',
          content: 'ID_Movimiento_Banco,Fecha_Efectiva,Descripcion_Extracto,Credito_Abono_COP,Debito_Cargo_COP\nMOV-9001,2026-10-11,ABONO TRANSFERENCIA PSE HOTEL GUANTIVA,500000,0\nMOV-9002,2026-10-12,LIQUIDACION PASARELA TARJETAS LOTE 1012,192000,0\nMOV-9004,2026-10-22,LIQUIDACION PASARELA TARJETAS LOTE 1022,240000,0\nMOV-9003,2026-10-31,COBRO CUOTA MANEJO CUENTA CORRIENTE,0,45000\n'
        },
        {
          filename: 'reglas_pasarela_pagos.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Tolerancias de emparejamiento difuso (1 a 4 días) y tasas de descuento de pasarela',
          content: JSON.stringify({
            ventanaCompensacionDias: 4,
            tasasComision: { Tarjeta_Credito: 0.04, Transferencia_PSE: 0.0 },
            reglaLotes: 'La pasarela puede liquidar en un solo abono todas las ventas con tarjeta de un mismo día'
          }, null, 2)
        }
      ]
    }
  };

  return { KITS_N3: KITS_N3 };
});
