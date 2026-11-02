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
          role: 'Entidades conectadas Empresas y Oportunidades (Valor Ponderado Testigo: $6.000.000 COP)',
          content: JSON.stringify({
            empresas: [
              { idEmpresa: 'EMP-01', nit: '900.412.880-1', nombre: 'Clínica del Norte S.A.S.', ciudad: 'Bogotá', sector: 'Salud' },
              { idEmpresa: 'EMP-02', nit: '901.205.331-7', nombre: 'Agroexportadora del Oriente S.A.S.', ciudad: 'Bucaramanga', sector: 'Agroindustria' }
            ],
            oportunidades: [
              { idNegocio: 'OP-101', idEmpresa: 'EMP-01', titulo: 'Renovación Equipos Diagnóstico', valorCOP: 10000000, probabilidadPct: 50, valorPonderadoCOP: 5000000, etapa: 'Propuesta Enviada', proximoContacto: '2026-11-05' },
              { idNegocio: 'OP-102', idEmpresa: 'EMP-01', titulo: 'Licencia Telemedicina Anual', valorCOP: 4000000, probabilidadPct: 25, valorPonderadoCOP: 1000000, etapa: 'Diagnóstico', proximoContacto: '' }
            ],
            resumenCasoTestigo: {
              valorNominalTotalCOP: 14000000,
              valorPonderadoTotalCOP: 6000000
            }
          }, null, 2)
        },
        {
          filename: 'schema_crm_relacional.sql', ext: 'sql', mime: 'application/sql;charset=utf-8',
          role: 'Esquema relacional SQL con integridad referencial entre empresas, oportunidades y actividades',
          content: '-- Esquema Relacional CRM B2B (Práctica SENA ADSO)\nCREATE TABLE empresas (\n  id_empresa VARCHAR(16) PRIMARY KEY,\n  nit VARCHAR(20) NOT NULL UNIQUE,\n  nombre VARCHAR(120) NOT NULL,\n  ciudad VARCHAR(60) NOT NULL\n);\n\nCREATE TABLE oportunidades (\n  id_negocio VARCHAR(16) PRIMARY KEY,\n  id_empresa VARCHAR(16) NOT NULL REFERENCES empresas(id_empresa),\n  titulo VARCHAR(160) NOT NULL,\n  valor_cop NUMERIC(14, 2) NOT NULL CHECK (valor_cop >= 0),\n  probabilidad_pct INT NOT NULL CHECK (probabilidad_pct BETWEEN 0 AND 100),\n  etapa VARCHAR(40) NOT NULL,\n  proximo_contacto DATE\n);\n'
        },
        {
          filename: 'actividades_seguimiento.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Historial de interacciones y detección de oportunidades huérfanas sin seguimiento',
          content: 'ID_Actividad,ID_Negocio,Fecha_Ejecucion,Tipo,Responsable,Resultado,Proximo_Seguimiento_Programado\nACT-01,OP-101,2026-10-28,Demostracion Tecnica,Camila Rojas,Cliente solicitó ajuste de alcance,2026-11-05\nACT-02,OP-102,2026-10-20,Llamada Exploratoria,Diego Castro,Interés inicial pero sin fecha agendada,SIN_FECHA_ALERTA_ROJA\n'
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
          content: '---\nname: auditoria-gastos\ndescription: Audita relaciones de gastos detectando excesos de tope individual y compras fraccionadas el mismo día.\n---\n\n# Procedimiento Estándar de Auditoría de Gastos (SOP)\n\n1. Verificar que ningún gasto de alimentación individual supere `$90.000 COP`.\n2. Agrupar recibos por la llave compuesta `(Empleado + Fecha + NIT_Proveedor)`.\n3. Si una agrupación presenta `>= 2` recibos el mismo día y su suma supera `$200.000 COP`, marcar **Alerta Crítica de Fraccionamiento** (Caso Testigo: 2 recibos de `$175.000 = $350.000 COP`).\n'
        },
        {
          filename: 'relacion_gastos_viaticos.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Listado de recibos de caja menor con el caso testigo de fraccionamiento ($350.000 COP)',
          content: 'ID_Recibo,Empleado,Fecha,NIT_Proveedor,Proveedor,Categoria,Valor_COP,Observacion\nREC-801,Julián Mendoza,2026-10-15,900555111-2,Suministros Eléctricos Andinos,Materiales,175000,Compra cableado turno mañana\nREC-802,Julián Mendoza,2026-10-15,900555111-2,Suministros Eléctricos Andinos,Materiales,175000,Compra conectores turno tarde (Mismo día y NIT)\nREC-803,Laura Gómez,2026-10-16,901222333-4,Restaurante El Mirador,Alimentacion,65000,Almuerzo visita cliente dentro del tope\nREC-804,Carlos Ruiz,2026-10-16,901222333-4,Restaurante El Mirador,Alimentacion,115000,Excede tope individual de $90.000 COP\n'
        },
        {
          filename: 'factura_electronica_fraccionada.xml', ext: 'xml', mime: 'application/xml;charset=utf-8',
          role: 'Soporte XML de los dos cobros fraccionados el mismo día al mismo NIT proveedor',
          content: '<?xml version="1.0" encoding="UTF-8"?>\n<AuditBatch company="Soluciones Integrales Andinas S.A.S.">\n  <SplitTransactionGroup employee="Julián Mendoza" date="2026-10-15" supplierNit="900555111-2" limitCOP="200000">\n    <Invoice id="REC-801" time="09:15:00" amountCOP="175000"/>\n    <Invoice id="REC-802" time="15:40:00" amountCOP="175000"/>\n    <CombinedTotal amountCOP="350000" status="ALERTA_CRITICA_FRACCIONAMIENTO"/>\n  </SplitTransactionGroup>\n</AuditBatch>\n'
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
          role: 'Serie de tesorería donde el Mes 2 cae a -$30.000.000 COP por vender a crédito de 60 días',
          content: 'Mes,Saldo_Inicial_Banco_COP,Ventas_Facturadas_60Dias_COP,Cobros_Efectivos_Banco_COP,Pagos_Contado_Obligatorios_COP,Saldo_Final_Banco_COP\nEnero,50000000,60000000,0,40000000,10000000\nFebrero,10000000,60000000,0,40000000,-30000000\nMarzo,-30000000,60000000,60000000,40000000,-10000000\nAbril,-10000000,60000000,60000000,40000000,10000000\nMayo,10000000,60000000,60000000,40000000,30000000\nJunio,30000000,60000000,60000000,40000000,50000000\n'
        },
        {
          filename: 'calendario_cartera_60dias.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Comparativa entre utilidad contable en papel y liquidez real en cuenta bancaria',
          content: JSON.stringify({
            saldoInicialEneroCOP: 50000000,
            ventasMensualesFacturadasCOP: 60000000,
            egresosMensualesContadoCOP: 40000000,
            utilidadContableMensualCOP: 20000000,
            plazoCarteraDias: 60,
            brechaLiquidezFebreroCOP: -30000000,
            explicacion: 'En enero y febrero entran $0 de las nuevas ventas pero salen $80.000.000 de contado ($50M - $80M = -$30M).'
          }, null, 2)
        },
        {
          filename: 'obligaciones_fijas_contado.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Desglose de pagos mensuales inaplazables ($40.000.000 COP/mes)',
          content: 'pagos_mensuales_contado_cop:\n  nomina_y_seguridad_social: 22000000\n  materias_primas_y_empaque: 12000000\n  arriendo_bodega_y_servicios: 4000000\n  impuestos_y_seguros: 2000000\ntotal_mensual_contado_cop: 40000000\n'
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
          role: 'Banco de 4 dilemas operativos con puntaje graduado (100, 60 y 0 puntos -> Promedio 90)',
          content: JSON.stringify({
            evaluacion: 'Criterio Operativo y Servicio al Cliente',
            resultadosCasoTestigo: [100, 100, 100, 60],
            promedioEsperado: 90,
            escenarios: [
              { id: 'ESC-01', titulo: 'Cliente corporativo reclama lote húmedo', optima100: 'Activar garantía inmediata con lote de respaldo y auditar transporte', aceptable60: 'Pedir fotos y esperar 48h al comité de calidad', riesgosa0: 'Negar el reclamo sin verificar trazabilidad' },
              { id: 'ESC-02', titulo: 'Caída temporal de facturación electrónica DIAN', optima100: 'Activar contingencia numerada y sincronizar XML al restablecer', aceptable60: 'Detener despachos hasta que vuelva el portal', riesgosa0: 'Entregar mercancía sin soporte documental' },
              { id: 'ESC-03', titulo: 'Solicitud de descuento que rompe margen mínimo', optima100: 'Mantener margen ofreciendo valor agregado o ajuste de volumen', aceptable60: 'Escalar a gerencia retrasando la oferta 2 días', riesgosa0: 'Aprobar descuento a pérdida para cerrar rápido' },
              { id: 'ESC-04', titulo: 'Diferencia de inventario en conteo cíclico', optima100: 'Cruzar kárdex de remisiones antes de ajustar', aceptable60: 'Programar reconteo general el fin de semana', riesgosa0: 'Borrar la diferencia manualmente en el sistema' }
            ]
          }, null, 2)
        },
        {
          filename: 'rubrica_competencias_bloom.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Criterios de evaluación formativa y niveles de dominio para certificar al colaborador',
          content: '# Rúbrica de Evaluación Basada en Escenarios (Taxonomía de Bloom)\n\n- **Decisión Óptima (`100 puntos`):** Resuelve el problema del cliente protegiendo el control interno y la rentabilidad.\n- **Decisión Aceptable (`60 puntos`):** Cumple la norma pero introduce fricción o demora operativa.\n- **Decisión Riesgosa (`0 puntos`):** Expone a la empresa a pérdida financiera, sanción legal o pérdida del cliente.\n- **Cálculo del Caso Testigo:** `(100 + 100 + 100 + 60) / 4 = 360 / 4 = 90 puntos`.\n'
        },
        {
          filename: 'resultados_equipo_piloto.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Respuestas registradas en la prueba piloto para auditar el calificador',
          content: 'Participante,Cargo,Escenario_1,Escenario_2,Escenario_3,Escenario_4,Promedio_Final,Estado_Certificacion\nParticipante_Testigo,Coordinador Operativo,100,100,100,60,90,CERTIFICADO\nAnalista_Junior_02,Auxiliar Bodega,100,60,60,60,70,REQUIERE_REFUERZO\n'
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
          role: 'Tabla base de conciliación (Venta V-101 de $200.000 con 4 % de comisión -> $192.000 neto)',
          content: 'ID_Venta,Fecha_Venta,Cliente,Monto_Bruto_COP,Medio_Pago,Comision_Pasarela_Pct,Fecha_Abono_Banco,Abono_Neto_Banco_COP,Estado_Esperado\nV-101,2026-10-10,Restaurante La Casona,200000,Tarjeta_Credito,4,2026-10-12,192000,Conciliado_Con_Comision\nV-102,2026-10-11,Hotel Guantiva Real,500000,Transferencia_PSE,0,2026-10-11,500000,Conciliado_Exacto\nV-103,2026-10-30,Cafetería Central,350000,Tarjeta_Credito,4,,0,En_Transito_Cierre_Mes\n'
        },
        {
          filename: 'extracto_bancario_octubre.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Movimientos reportados por el banco incluyendo gastos bancarios no registrados en ventas',
          content: 'ID_Movimiento_Banco,Fecha_Efectiva,Descripcion_Extracto,Referencia_Origen,Credito_Abono_COP,Debito_Cargo_COP\nMOV-9001,2026-10-11,ABONO TRANSFERENCIA PSE HOTEL GUANTIVA,V-102,500000,0\nMOV-9002,2026-10-12,LIQUIDACION PASARELA TARJETA CREDITO (DESC 4%),V-101,192000,0\nMOV-9003,2026-10-31,COBRO CUOTA MANEJO CUENTA CORRIENTE,BANCO-FEE,0,45000\n'
        },
        {
          filename: 'reglas_pasarela_pagos.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Tolerancias de emparejamiento difuso (1 a 4 días) y tasas de descuento de pasarela',
          content: JSON.stringify({
            ventanaCompensacionDias: 4,
            tasasComision: { Tarjeta_Credito: 0.04, Transferencia_PSE: 0.0 },
            casoTestigo: {
              idVenta: 'V-101',
              montoBrutoCOP: 200000,
              tasaComision: 0.04,
              comisionDescontadaCOP: 8000,
              abonoNetoEsperadoCOP: 192000
            }
          }, null, 2)
        }
      ]
    }
  };

  return { KITS_N3: KITS_N3 };
});
