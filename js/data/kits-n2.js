/* Catálogo de Kits de Archivos Semilla Reales — Nivel 2 (Ejercicios 6 al 10) */
/* Nota: Todos los documentos y registros de este módulo son materiales de práctica creados para aprender y no contienen datos reales. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const KITS_N2 = {
    6: {
      zipName: 'kit-ej06-cotizador-margen-bruto.zip',
      folderName: 'ejercicio-06-cotizador-rentabilidad',
      summary: 'Catálogo de productos y servicios B2B (.csv), política comercial de márgenes (.md) y reglas tributarias (.json).',
      files: [
        {
          filename: 'catalogo_productos.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Catálogo oficial con costos internos y precios de lista (Caso Testigo: Costo $650.000, Precio $1.000.000 -> 35 %)',
          content: 'SKU,Producto,Categoria,Costo_Interno_COP,Precio_Lista_Neto_COP,Margen_Minimo_Pct\nSER-01,Consultoria Auditoria de Procesos,Servicios,650000,1000000,35\nSER-02,Implementacion Tablero Gerencial BI,Servicios,900000,1500000,35\nLIC-01,Licencia Anual Suite Operativa Pyme,Software,480000,800000,30\nCAP-01,Taller Entrenamiento Equipos IA (16h),Formacion,325000,500000,35\nSOP-01,Bolsa Soporte Tecnico Prioritario 20h,Soporte,520000,800000,30\nEQU-01,Terminal Lectora Codigo Barras Industrial,Hardware,420000,700000,35\n'
        },
        {
          filename: 'politica_descuentos_y_margenes.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Normativa comercial para el semáforo de rentabilidad y diferenciación entre Margen y Recargo',
          content: '# Política Comercial de Precios y Protección de Margen Bruto\n\n## 1. Fórmula Oficial Obligatoria\n- **Margen Bruto Real (%)** = `(Precio_Venta_Neto - Costo_Interno) / Precio_Venta_Neto * 100`.\n- Prohibido confundir el Margen sobre la Venta con el Recargo sobre el Costo (*Markup*).\n\n## 2. Reglas del Semáforo Comercial\n- **Verde (Aprobación Automática):** Margen Bruto Real `>= 35,0 %`.\n- **Ámbar (Requiere Aval de Coordinación):** Margen Bruto entre `25,0 %` y `34,9 %`.\n- **Rojo (Bloqueado por Sistema):** Margen Bruto `< 25,0 %`.\n'
        },
        {
          filename: 'reglas_tributarias_cotizador.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Parámetros de IVA, retenciones y vigencia de ofertas comerciales en Colombia',
          content: JSON.stringify({
            moneda: 'COP',
            ivaGeneralPct: 19,
            retencionServiciosPct: 4,
            retencionComprasPct: 2.5,
            diasValidezOferta: 15,
            casoTestigo: {
              sku: 'SER-01',
              costoInternoCOP: 650000,
              precioVentaNetoCOP: 1000000,
              utilidadBrutaCOP: 350000,
              margenBrutoRealPct: 35
            }
          }, null, 2)
        }
      ]
    },
    7: {
      zipName: 'kit-ej07-matriz-ponderada-proveedores.zip',
      folderName: 'ejercicio-07-comparador-proveedores',
      summary: 'Matriz multicriterio de proveedores (.json), propuestas técnicas recibidas (.md) y pliego de ponderación (.yaml).',
      files: [
        {
          filename: 'matriz_proveedores.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Datos de calificación 1-10 y pesos oficiales (40 % Precio, 35 % Calidad, 25 % Rapidez -> 7,95 pts)',
          content: JSON.stringify({
            licitacion: 'Adquisición de Servidores y Red Local Sede Vélez',
            criterios: { precio: 0.40, calidad: 0.35, rapidez: 0.25 },
            proveedores: [
              { id: 'PROV-A', nombre: 'Suministros Básicos del Norte', precioCOP: 14200000, garantiaMeses: 6, entregaDias: 12, notaPrecio: 9, notaCalidad: 4, notaRapidez: 5 },
              { id: 'PROV-B', nombre: 'Tecnología Empresarial Certificada S.A.S.', precioCOP: 16800000, garantiaMeses: 24, entregaDias: 5, notaPrecio: 7, notaCalidad: 9, notaRapidez: 8 },
              { id: 'PROV-C', nombre: 'Importadora Global High-End', precioCOP: 22500000, garantiaMeses: 36, entregaDias: 9, notaPrecio: 4, notaCalidad: 10, notaRapidez: 6 }
            ]
          }, null, 2)
        },
        {
          filename: 'resumen_propuestas_tecnicas.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Comparativa cualitativa de soporte, repuestos y tiempos de respuesta de los 3 oferentes',
          content: '# Evaluación Técnica del Comité de Compras\n\n1. **PROV-A (Suministros Básicos del Norte):** Ofrece el precio más bajo, pero solo da 6 meses de garantía sin técnico en Santander.\n2. **PROV-B (Tecnología Empresarial Certificada S.A.S.):** Precio competitivo, 24 meses de garantía en sitio y entrega en 5 días hábiles. Puntaje ponderado esperado: `(7*0,40) + (9*0,35) + (8*0,25) = 7,95`.\n3. **PROV-C (Importadora Global High-End):** Equipos de gama alta pero sobrecosto del 34 % e importación demorada.\n'
        },
        {
          filename: 'pliego_ponderacion.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Reglas de normalización y umbrales mínimos de contratación',
          content: 'pesos_oficiales:\n  precio_competitivo: 0.40\n  calidad_y_garantia: 0.35\n  rapidez_entrega: 0.25\npuntaje_minimo_aprobacion: 7.0\nganador_esperado_id: "PROV-B"\npuntaje_ganador_esperado: 7.95\n'
        }
      ]
    },
    8: {
      zipName: 'kit-ej08-inventario-rop-seguridad.zip',
      folderName: 'ejercicio-08-control-inventario-rop',
      summary: 'Maestro de existencias en bodega (.csv), bitácora de consumo diario (.json) y acuerdos de tiempos de entrega (.yaml).',
      files: [
        {
          filename: 'inventario_bodega.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Inventario con demanda media, pico y Lead Time (Café 500g: ROP = 70 unidades)',
          content: 'SKU,Producto,Categoria_ABC,Stock_Actual,Venta_Diaria_Promedio,Venta_Diaria_Maxima,Tiempo_Entrega_Dias,Costo_Unitario_COP\nCAF-500,Cafe Especial Origen Santander 500g,A,68,10,14,5,28000\nCAF-250,Cafe Molido Tradicional 250g,A,95,12,15,4,15500\nFIL-100,Filtros Papel Biodegradable x100,B,120,8,12,4,9500\nEMP-500,Bolsa Valvula Desgasificadora x50,B,85,15,20,6,32000\nMOL-01,Molino Acero Inoxidable Manual,C,15,1,2,7,145000\nTER-02,Termo Barista Control Temperatura,C,22,2,3,5,85000\n'
        },
        {
          filename: 'historial_salidas_almacen.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Registro histórico de consumos para auditar el Stock de Seguridad',
          content: JSON.stringify({
            bodega: 'Centro de Distribución Vélez',
            casoTestigo: {
              sku: 'CAF-500',
              ventaPromedioDiaria: 10,
              ventaMaximaDiaria: 14,
              tiempoEntregaDias: 5,
              consumoEnEspera: 50,
              stockSeguridad: 20,
              puntoReordenROP: 70,
              stockActual: 68,
              estadoAlerta: '¡PEDIR HOY! (Stock 68 <= ROP 70)'
            }
          }, null, 2)
        },
        {
          filename: 'tiempos_entrega_proveedores.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Parámetros logísticos de reposición y política de clasificación ABC',
          content: 'formulas:\n  stock_seguridad: "(Venta_Diaria_Maxima - Venta_Diaria_Promedio) * Tiempo_Entrega_Dias"\n  punto_reorden_rop: "(Venta_Diaria_Promedio * Tiempo_Entrega_Dias) + Stock_Seguridad"\nregla_alerta_roja: "Stock_Actual <= Punto_Reorden_ROP"\n'
        }
      ]
    },
    9: {
      zipName: 'kit-ej09-encuestas-nps-pareto.zip',
      folderName: 'ejercicio-09-analizador-nps',
      summary: '20 respuestas de satisfacción (.csv), registro de tickets de soporte (.log) y diccionario de motivos CX (.json).',
      files: [
        {
          filename: 'encuestas_trimestre.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: '20 encuestas del trimestre (10 Promotores, 6 Pasivos, 4 Detractores -> NPS = +30)',
          content: 'ID,Sede,Nota_0_a_10,Segmento_Esperado,Motivo,Comentario\n1,Bogotá,10,Promotor,Atención,Entrega inmediata y clara\n2,Bogotá,9,Promotor,Calidad,Excelente aroma y empaque\n3,Medellín,10,Promotor,Atención,Muy buen soporte comercial\n4,Medellín,9,Promotor,Calidad,Cumplió lo prometido\n5,Cali,10,Promotor,Precio,Justo para la calidad del café\n6,Cali,9,Promotor,Atención,Asesoría oportuna\n7,Bogotá,10,Promotor,Calidad,Sin fallos en el lote\n8,Medellín,9,Promotor,Rapidez,Llegó antes de tiempo\n9,Bucaramanga,10,Promotor,Atención,Personal muy amable\n10,Barranquilla,9,Promotor,Calidad,Totalmente recomendado\n11,Bogotá,8,Pasivo,Precio,Bueno pero podría incluir envío\n12,Medellín,7,Pasivo,Tiempo de espera,Tardó un día más de lo habitual\n13,Cali,8,Pasivo,Atención,Servicio normal\n14,Bogotá,7,Pasivo,Precio,Un poco costoso el flete\n15,Bucaramanga,8,Pasivo,Calidad,Cumple lo básico\n16,Barranquilla,7,Pasivo,Tiempo de espera,Fila moderada en punto físico\n17,Bogotá,4,Detractor,Tiempo de espera,Demora de 48 horas en despacho\n18,Medellín,5,Detractor,Tiempo de espera,Nadie contestó el teléfono de soporte\n19,Cali,3,Detractor,Tiempo de espera,El pedido llegó incompleto\n20,Bogotá,6,Detractor,Facturación,Error en el NIT de la factura electrónica\n'
        },
        {
          filename: 'transcripciones_pqrs_soporte.log', ext: 'log', mime: 'text/plain;charset=utf-8',
          role: 'Bitácora de eventos de soporte de los 4 clientes detractores para análisis de Pareto',
          content: '2026-10-18T09:12:04-05:00 [WARN] [TICKET-901] [Sede:Bogotá] [Nota:4] Motivo="Tiempo de espera" Detalle="Transportadora retrasó entrega 48h"\n2026-10-19T14:30:11-05:00 [WARN] [TICKET-904] [Sede:Medellín] [Nota:5] Motivo="Tiempo de espera" Detalle="Línea de atención ocupada en hora pico"\n2026-10-21T11:05:40-05:00 [ERROR] [TICKET-908] [Sede:Cali] [Nota:3] Motivo="Tiempo de espera" Detalle="Faltaron 2 cajas en la guía de remisión"\n2026-10-22T16:45:00-05:00 [WARN] [TICKET-912] [Sede:Bogotá] [Nota:6] Motivo="Facturación" Detalle="Dígito de verificación erróneo en XML DIAN"\n'
        },
        {
          filename: 'diccionario_clasificacion_cx.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Reglas oficiales de cálculo NPS y priorización Pareto 80/20',
          content: JSON.stringify({
            totalEncuestas: 20,
            promotores: { rango: [9, 10], cantidad: 10, porcentaje: 50 },
            pasivos: { rango: [7, 8], cantidad: 6, porcentaje: 30 },
            detractores: { rango: [0, 6], cantidad: 4, porcentaje: 20 },
            npsEsperado: 30,
            causaPrincipalDetractores: 'Tiempo de espera (75 % de las quejas críticas)'
          }, null, 2)
        }
      ]
    },
    10: {
      zipName: 'kit-ej10-cierres-schedule-pokayoke.zip',
      folderName: 'ejercicio-10-cierres-poka-yoke',
      summary: 'Bitácora histórica de cierres (.json), auxiliar de bancos (.csv) y protocolo de control Poka-Yoke (.md).',
      files: [
        {
          filename: 'bitacora_cierres.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Estado de cierre semanal 2026-W44 con cuadre cruzado por $12.500.000 COP',
          content: JSON.stringify({
            semanaActual: '2026-W44',
            idempotencyKey: 'CIERRE-2026-W44-SIA',
            controlCuadre: {
              ventasRegistradasCOP: 12500000,
              ingresosBancosCOP: 9000000,
              cuentasPorCobrarCOP: 3500000,
              diferenciaCOP: 0
            },
            historicoSemanas: [
              { semana: '2026-W41', ventasCOP: 11200000, estado: 'CERRADO_AUDITADO' },
              { semana: '2026-W42', ventasCOP: 11800000, estado: 'CERRADO_AUDITADO' },
              { semana: '2026-W43', ventasCOP: 12100000, estado: 'CERRADO_AUDITADO' }
            ]
          }, null, 2)
        },
        {
          filename: 'auxiliar_bancos_y_cartera_w44.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Detalle de recaudos en banco ($9.000.000) y facturas a crédito ($3.500.000)',
          content: 'Tipo_Soporte,Referencia,Tercero,Monto_COP,Estado_Conciliacion\nBanco_Transferencia,PSE-7741,Supermercados Oriente,5200000,Confirmado en Extracto\nBanco_Transferencia,PSE-7789,Hoteles del Fonce S.A.S.,3800000,Confirmado en Extracto\nCuenta_Por_Cobrar,FE-4510,Clínica Metropolitana,2000000,Crédito 30 días\nCuenta_Por_Cobrar,FE-4518,Corporación Educativa Vélez,1500000,Crédito 30 días\n'
        },
        {
          filename: 'protocolo_cierre_poka_yoke.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Reglas de bloqueo a prueba de errores e idempotencia para /schedule',
          content: '# Protocolo de Auditoría Semanal e Idempotencia (`/schedule`)\n\n1. **Regla Poka-Yoke de Cuadre Cruzado:** `Ventas_Registradas` DEBE ser exactamente igual a `Ingresos_Bancos + Cuentas_Por_Cobrar` (`$9.000.000 + $3.500.000 = $12.500.000 COP`). Si la diferencia es distinta de `$0`, bloquear el cierre.\n2. **Regla de Idempotencia:** Si la tarea programada se ejecuta dos veces sobre la llave `2026-W44`, actualiza el registro existente sin duplicar saldos.\n'
        }
      ]
    }
  };

  return { KITS_N2: KITS_N2 };
});
