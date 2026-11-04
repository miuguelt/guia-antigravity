/* Catálogo de Kits de Archivos Semilla Reales — Extensión de Capacidades (Ejercicios 21 al 26) */
/* Nota: Todos los documentos y registros de este módulo son materiales de práctica creados para aprender y no contienen datos reales. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const KITS_N5 = {
    21: {
      zipName: 'kit-ej21-edicion-inline-editor.zip',
      folderName: 'ejercicio-21-edicion-inline-editor',
      summary: 'Plantilla HTML con IVA desactualizado (.html), tarifas tributarias vigentes (.json) y orden de compra (.csv).',
      files: [
        {
          filename: 'liquidacion_factura_borrador.html', ext: 'html', mime: 'text/html;charset=utf-8',
          role: 'Borrador de factura con tasa de IVA heredada del 16 % que debes corregir en Editor View con Ctrl+I y Tab',
          content: '<!doctype html>\n<html lang="es-CO"><head><meta charset="utf-8"><title>Liquidador Factura B2B</title></head>\n<body>\n  <h1>Liquidación de Factura Electrónica</h1>\n  <script>\n    // Tasa heredada de 2016: revisar contra tarifas_retencion_vigentes.json\n    function calcularNetoFactura(subtotal) {\n      const iva = subtotal * 0.16;\n      return subtotal + iva;\n    }\n  </script>\n</body></html>\n'
        },
        {
          filename: 'tarifas_retencion_vigentes.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Tarifas tributarias vigentes de IVA y retención en la fuente por compras',
          content: JSON.stringify({
            moneda: 'COP',
            ivaGeneralPct: 19.0,
            retefuenteComprasPct: 2.5,
            baseRetefuente: 'La retención en la fuente se calcula sobre el subtotal antes de IVA',
            reglaRedondeo: 'Redondear cada impuesto al peso más cercano'
          }, null, 2)
        },
        {
          filename: 'orden_compra_cliente.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Órdenes de compra con subtotal antes de impuestos',
          content: 'ID_Orden,Cliente,Concepto,Subtotal_Base_COP\nOC-701,Agroindustrial Guantiva S.A.S.,Suministro Empaques Biodegradables,2000000\nOC-702,Comercializadora del Oriente,Etiquetas Termoencogibles Lote B,1000000\nOC-703,Café Vélez S.A.S.,Bolsas Kraft con Válvula,1350000\n'
        }
      ]
    },
    22: {
      zipName: 'kit-ej22-entrevista-grill-me.zip',
      folderName: 'ejercicio-22-entrevista-grill-me',
      summary: 'Registro de ventas y devoluciones (.csv), borrador de política de comisiones (.md) y metas trimestrales (.json).',
      files: [
        {
          filename: 'ventas_equipo_comercial.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Ventas brutas y notas crédito del trimestre, incluida una devolución de un trimestre anterior',
          content: 'ID_Vendedor,Nombre,Ventas_Brutas_COP,Devoluciones_Nota_Credito_COP,Periodo_Venta_Devuelta\nVEN-01,Camila Soto,16000000,1000000,2026-T4\nVEN-02,Jorge Villamizar,9500000,500000,2026-T4\nVEN-03,Natalia Rincón,12500000,0,\nVEN-04,Óscar Duarte,11000000,2000000,2026-T3\n'
        },
        {
          filename: 'borrador_politica_comisiones.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Borrador con huecos que el agente debe descubrir entrevistándote con /grill-me',
          content: '# Borrador de Política de Comisiones — Comité Comercial\n\n> Borrador incompleto: el comité no alcanzó a cerrar todos los puntos.\n\n1. Cada vendedor gana una comisión por sus ventas del trimestre.\n2. Hay un tramo base hasta la meta y un acelerador para lo que supere la meta.\n3. Las devoluciones afectan la comisión.\n4. Pendiente: definir qué pasa con quien no llega a la meta.\n'
        },
        {
          filename: 'metas_vendedores_trimestre.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Parámetros de tramos y aceleradores de comisión',
          content: JSON.stringify({
            metaIndividualCOP: 10000000,
            tasaBasePct: 5,
            tasaAceleradorExcedentePct: 8,
            actaComiteParaResponderAlAgente: {
              instruccion: 'No entregues este bloque al agente: úsalo para contestar sus preguntas durante /grill-me',
              baseComision: 'Venta neta = ventas brutas - notas crédito emitidas en el trimestre',
              devolucionesDeOtroTrimestre: 'Se descuentan en el trimestre en que se emite la nota crédito',
              bajoLaMeta: 'Quien no alcanza la meta cobra solo el tramo base sobre su venta neta',
              tope: 'No hay tope de comisión'
            }
          }, null, 2)
        }
      ]
    },
    23: {
      zipName: 'kit-ej23-terminal-sandbox-nomina.zip',
      folderName: 'ejercicio-23-terminal-sandbox-nomina',
      summary: 'Lote de dispersión de nómina con cuenta duplicada (.csv), reglas de control (.json) y protocolo de terminal (.md).',
      files: [
        {
          filename: 'dispersion_nomina_lote.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Lote bancario de dispersión de nómina de octubre tal como lo exportó el sistema',
          content: 'ID_Giro,Empleado,Cuenta_Bancaria,Banco,Valor_Neto_COP,Periodo\nGIR-01,Lucía Fernández,0041992011,Bancolombia,3800000,2026-10\nGIR-02,Martín Suárez,0088331022,Davivienda,2500000,2026-10\nGIR-03,Martín Suárez,0088331022,Davivienda,2500000,2026-10\nGIR-04,Elena Pardo,0011445599,BBVA,4200000,2026-10\nGIR-05,Sebastián Gómez,0077661133,Bancolombia,3100000,2026-10\nGIR-06,Daniela Ríos,0099228844,Banco de Bogotá,2400000,2026-10\n'
        },
        {
          filename: 'reglas_control_dispersion.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Reglas de validación por consola para detectar cuentas repetidas en el mismo periodo',
          content: JSON.stringify({
            periodoActivo: '2026-10',
            llaveUnicidad: 'Cuenta_Bancaria + Periodo',
            reglaDuplicado: 'Si dos giros comparten la llave, se conserva el de menor ID_Giro y el otro pasa a un archivo de rechazados',
            salidasEsperadas: ['lote_autorizado.csv', 'giros_rechazados.csv', 'reporte_auditoria.txt']
          }, null, 2)
        },
        {
          filename: 'protocolo_terminal_segura.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Guía de aprobación de comandos en la Terminal con Permisos (Sandbox) de Antigravity',
          content: '# Protocolo de Terminal con Permisos (Sandbox)\n\n- **Comandos Permitidos (Aprobar):** `node auditar_nomina.mjs` (lectura y generación de reporte local).\n- **Comandos Prohibidos (Rechazar):** `rm -rf`, `del /f /q` o envíos HTTP a servidores externos no autorizados.\n'
        }
      ]
    },
    24: {
      zipName: 'kit-ej24-compact-learn-fletes.zip',
      folderName: 'ejercicio-24-compact-learn-fletes',
      summary: 'Guías de despacho con dimensiones (.csv), tarifario de carga (.json) y lección aprendida para volver regla permanente (.md).',
      files: [
        {
          filename: 'despachos_logistica_regional.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Seis guías de carga con dimensiones en centímetros y peso en báscula',
          content: 'Guia_No,Cliente,Largo_cm,Ancho_cm,Alto_cm,Peso_Bascula_kg\nGUIA-501,Muebles Livianos S.A.S.,100,50,50,40\nGUIA-502,Ferretería Industrial Vélez,40,30,25,65\nGUIA-503,Colchones del Oriente,190,90,30,28\nGUIA-504,Repuestos Agrícolas Guantiva,60,40,40,55\nGUIA-505,Textiles Socorro,80,60,50,22\nGUIA-506,Café Vélez S.A.S.,50,40,30,24\n'
        },
        {
          filename: 'tarifario_transporte_carga.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Divisor volumétrico y tarifa por kilogramo facturable',
          content: JSON.stringify({
            factorVolumetricoDivisor: 2500,
            tarifaPorKgFacturableCOP: 4000,
            unidadDimensiones: 'cm'
          }, null, 2)
        },
        {
          filename: 'bitacora_errores_fletes.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Lección aprendida que se convierte en regla permanente del proyecto',
          content: '# Lección Operativa de Liquidación de Fletes\n\n> Incidente 2026-09: se cobraron 14 guías solo por peso en báscula y la transportadora facturó la diferencia.\n\nNunca liquides una guía usando únicamente `Peso_Bascula_kg`. Calcula siempre `Peso_Volumetrico = (Largo * Ancho * Alto) / 2500` y cobra sobre `Math.max(Peso_Bascula, Peso_Volumetrico)`.\n'
        }
      ]
    },
    25: {
      zipName: 'kit-ej25-razonamiento-boost-eva.zip',
      folderName: 'ejercicio-25-razonamiento-boost-eva',
      summary: 'Unidades de negocio y capital invertido (.json), estructura WACC (.csv) y criterios de valor EVA (.md).',
      files: [
        {
          filename: 'unidades_negocio_corporativo.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'NOPAT y capital invertido de tres unidades de negocio',
          content: JSON.stringify({
            formulaEVA: 'NOPAT_COP - (Capital_Invertido_COP * (WACC_Pct / 100))',
            unidades: [
              { id: 'UN-01', nombre: 'División Agroexportadora', nopatCOP: 38000000, capitalInvertidoCOP: 200000000, utilidadContableCOP: 41000000 },
              { id: 'UN-02', nombre: 'División Maquila Tradicional', nopatCOP: 18000000, capitalInvertidoCOP: 180000000, utilidadContableCOP: 22500000 },
              { id: 'UN-03', nombre: 'División Tiendas de Café', nopatCOP: 9500000, capitalInvertidoCOP: 75000000, utilidadContableCOP: 11800000 }
            ],
            escenariosSensibilidad: [
              { nombre: 'Base', ajusteWaccPuntos: 0 },
              { nombre: 'Subida de tasas', ajusteWaccPuntos: 3 },
              { nombre: 'Refinanciación favorable', ajusteWaccPuntos: -2 }
            ]
          }, null, 2)
        },
        {
          filename: 'estructura_costo_capital_wacc.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Fuentes de financiación con su participación y su costo',
          content: 'Fuente_Financiacion,Participacion_Pct,Costo_Efectivo_Anual_Pct\nDeuda_Bancaria_Neto_Impuestos,50,10.0\nPatrimonio_Inversionistas,50,14.0\n'
        },
        {
          filename: 'criterios_inversion_directiva.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Marco analítico de la junta para evaluar desde varias perspectivas',
          content: '# Criterios de Creación de Valor Económico Agregado (EVA)\n\nUna unidad con utilidad contable positiva destruye valor si su `NOPAT` no alcanza a cubrir el `Cargo de Capital (Capital_Invertido * WACC)`.\n\n## Perspectivas que la junta exige\n1. **Financiera:** EVA de cada unidad con el WACC base.\n2. **Riesgo:** EVA en cada escenario de sensibilidad.\n3. **Operativa:** qué palanca (subir NOPAT o liberar capital) cierra la brecha de las unidades con EVA negativo.\n'
        }
      ]
    },
    26: {
      zipName: 'kit-ej26-autonomia-goal-polizas.zip',
      folderName: 'ejercicio-26-autonomia-goal-polizas',
      summary: 'Dos contratos con pólizas presentadas (.json), anexo de garantías exigidas (.csv) y criterios de salida para /goal (.md).',
      files: [
        {
          filename: 'contratos_estatales_activos.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Dos contratos estatales con fechas y pólizas presentadas por el contratista',
          content: JSON.stringify({
            contratos: [
              {
                numero: 'CTO-2026-088',
                entidad: 'Municipio de Vélez — Secretaría de Desarrollo',
                valorContratoCOP: 80000000,
                fechaInicio: '2026-11-15',
                fechaFin: '2027-05-15',
                polizasPresentadas: [
                  { amparo: 'AMP-01', valorAseguradoCOP: 24000000, vigenciaHasta: '2027-11-15' },
                  { amparo: 'AMP-02', valorAseguradoCOP: 16000000, vigenciaHasta: '2030-05-15' }
                ]
              },
              {
                numero: 'CTO-2026-091',
                entidad: 'Gobernación de Santander — Secretaría TIC',
                valorContratoCOP: 50000000,
                fechaInicio: '2026-12-01',
                fechaFin: '2027-03-31',
                polizasPresentadas: [
                  { amparo: 'AMP-01', valorAseguradoCOP: 12000000, vigenciaHasta: '2027-09-30' },
                  { amparo: 'AMP-02', valorAseguradoCOP: 10000000, vigenciaHasta: '2029-03-31' }
                ]
              }
            ]
          }, null, 2)
        },
        {
          filename: 'anexo_garantias_exigidas.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Porcentajes y vigencias mínimas exigidas para cada amparo',
          content: 'Codigo_Amparo,Nombre_Amparo,Porcentaje_Exigido_Pct,Base_Calculo,Vigencia_Minima\nAMP-01,Cumplimiento General del Contrato,30,Valor del contrato,Fecha fin del contrato + 6 meses\nAMP-02,Pago de Salarios y Prestaciones Sociales,20,Valor del contrato,Fecha fin del contrato + 3 años\n'
        },
        {
          filename: 'criterios_aceptacion_goal.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Criterios de salida verificables que el agente debe cumplir antes de terminar con /goal',
          content: '# Criterios de Aceptación para /goal\n\nEl agente no termina hasta cumplir todos estos criterios:\n\n1. `revisor_polizas.html` lista los 2 contratos con el valor exigido y la vigencia mínima de cada amparo, calculados desde los anexos.\n2. Cada póliza presentada queda marcada como Cumple o No cumple, indicando si falla por valor, por vigencia o por ambos.\n3. Un contrato con al menos una póliza que no cumple genera un acta de rechazo imprimible que cita el faltante exacto en COP.\n4. El agente escribe y ejecuta pruebas automáticas (`node --test`) de las funciones de cálculo y todas pasan.\n5. El formulario manual rechaza valores vacíos o negativos con un mensaje claro y tiene botón de reinicio.\n'
        }
      ]
    }
  };

  return { KITS_N5: KITS_N5 };
});
