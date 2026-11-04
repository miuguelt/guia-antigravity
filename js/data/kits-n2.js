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
          role: 'Catálogo oficial con costos internos y precios de lista netos (sin IVA)',
          content: 'SKU,Producto,Categoria,Costo_Interno_COP,Precio_Lista_Neto_COP,Margen_Minimo_Pct\nSER-01,Consultoria Auditoria de Procesos,Servicios,650000,1000000,35\nSER-02,Implementacion Tablero Gerencial BI,Servicios,900000,1500000,35\nLIC-01,Licencia Anual Suite Operativa Pyme,Software,560000,800000,30\nCAP-01,Taller Entrenamiento Equipos IA (16h),Formacion,325000,500000,35\nSOP-01,Bolsa Soporte Tecnico Prioritario 20h,Soporte,640000,800000,30\nEQU-01,Terminal Lectora Codigo Barras Industrial,Hardware,420000,700000,35\n'
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
            aplicaRetencionServiciosA: ['Servicios', 'Formacion', 'Soporte'],
            notaMargen: 'El IVA y las retenciones se muestran en la cotización, pero el margen se calcula siempre sobre el precio neto sin IVA'
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
          role: 'Notas de 1 a 10 por criterio y pesos oficiales de la licitación',
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
          content: '# Evaluación Técnica del Comité de Compras\n\n1. **PROV-A (Suministros Básicos del Norte):** Ofrece el precio más bajo, pero solo da 6 meses de garantía sin técnico en Santander.\n2. **PROV-B (Tecnología Empresarial Certificada S.A.S.):** Precio competitivo, 24 meses de garantía en sitio y entrega en 5 días hábiles.\n3. **PROV-C (Importadora Global High-End):** Equipos de gama alta pero sobrecosto del 34 % e importación demorada.\n'
        },
        {
          filename: 'pliego_ponderacion.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Reglas de normalización y umbrales mínimos de contratación',
          content: 'pesos_oficiales:\n  precio_competitivo: 0.40\n  calidad_y_garantia: 0.35\n  rapidez_entrega: 0.25\npuntaje_minimo_aprobacion: 7.0\nregla_empate: "gana el proveedor con mayor nota de calidad"\n'
        }
      ]
    },
    8: {
      zipName: 'kit-ej08-inventario-rop-seguridad.zip',
      folderName: 'ejercicio-08-control-inventario-rop',
      summary: 'Maestro de existencias en bodega (.csv), salidas diarias de 14 días (.json) y acuerdos de tiempos de entrega (.yaml).',
      files: [
        {
          filename: 'inventario_bodega.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Existencias, tiempo de entrega y costo unitario de 6 referencias',
          content: 'SKU,Producto,Stock_Actual,Tiempo_Entrega_Dias,Costo_Unitario_COP\nCAF-500,Cafe Especial Origen Santander 500g,68,5,28000\nCAF-250,Cafe Molido Tradicional 250g,95,4,15500\nFIL-100,Filtros Papel Biodegradable x100,120,4,9500\nEMP-500,Bolsa Valvula Desgasificadora x50,85,6,32000\nMOL-01,Molino Acero Inoxidable Manual,15,7,145000\nTER-02,Termo Barista Control Temperatura,22,5,85000\n'
        },
        {
          filename: 'historial_salidas_almacen.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Salidas diarias de los últimos 14 días por referencia, para derivar promedio y máximo',
          content: JSON.stringify({
            bodega: 'Centro de Distribución Vélez',
            periodo: { desde: '2026-10-19', hasta: '2026-11-01', dias: 14 },
            unidad: 'unidades vendidas por día',
            salidasDiarias: {
              'CAF-500': [8, 10, 14, 9, 11, 10, 7, 12, 10, 9, 11, 10, 8, 11],
              'CAF-250': [12, 15, 11, 10, 13, 12, 12, 14, 11, 10, 12, 13, 11, 12],
              'FIL-100': [8, 7, 12, 6, 8, 9, 7, 8, 8, 7, 9, 8, 6, 9],
              'EMP-500': [15, 14, 20, 13, 15, 16, 14, 15, 15, 14, 16, 15, 13, 15],
              'MOL-01': [1, 0, 2, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1],
              'TER-02': [2, 2, 3, 1, 2, 2, 2, 3, 2, 1, 2, 2, 2, 2]
            }
          }, null, 2)
        },
        {
          filename: 'tiempos_entrega_proveedores.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Parámetros logísticos de reposición y política de clasificación ABC',
          content: 'formulas:\n  stock_seguridad: "(Venta_Diaria_Maxima - Venta_Diaria_Promedio) * Tiempo_Entrega_Dias"\n  punto_reorden_rop: "(Venta_Diaria_Promedio * Tiempo_Entrega_Dias) + Stock_Seguridad"\ndefiniciones:\n  Venta_Diaria_Promedio: "promedio de salidasDiarias del historial"\n  Venta_Diaria_Maxima: "máximo de salidasDiarias del historial"\nregla_alerta_roja: "Stock_Actual <= Punto_Reorden_ROP"\n'
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
          role: '20 encuestas del trimestre con nota, motivo y comentario',
          content: 'ID,Sede,Nota_0_a_10,Motivo,Comentario\n1,Bogotá,10,Promotor,Atención,Entrega inmediata y clara\n2,Bogotá,9,Promotor,Calidad,Excelente aroma y empaque\n3,Medellín,10,Promotor,Atención,Muy buen soporte comercial\n4,Medellín,9,Promotor,Calidad,Cumplió lo prometido\n5,Cali,10,Promotor,Precio,Justo para la calidad del café\n6,Cali,9,Promotor,Atención,Asesoría oportuna\n7,Bogotá,10,Promotor,Calidad,Sin fallos en el lote\n8,Medellín,9,Promotor,Rapidez,Llegó antes de tiempo\n9,Bucaramanga,10,Promotor,Atención,Personal muy amable\n10,Barranquilla,9,Promotor,Calidad,Totalmente recomendado\n11,Bogotá,8,Pasivo,Precio,Bueno pero podría incluir envío\n12,Medellín,7,Pasivo,Tiempo de espera,Tardó un día más de lo habitual\n13,Cali,8,Pasivo,Atención,Servicio normal\n14,Bogotá,7,Pasivo,Precio,Un poco costoso el flete\n15,Bucaramanga,8,Pasivo,Calidad,Cumple lo básico\n16,Barranquilla,7,Pasivo,Tiempo de espera,Fila moderada en punto físico\n17,Bogotá,4,Detractor,Tiempo de espera,Demora de 48 horas en despacho\n18,Medellín,5,Detractor,Tiempo de espera,Nadie contestó el teléfono de soporte\n19,Cali,3,Detractor,Tiempo de espera,El pedido llegó incompleto\n20,Bogotá,6,Detractor,Facturación,Error en el NIT de la factura electrónica\n'
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
            promotores: { rango: [9, 10] },
            pasivos: { rango: [7, 8] },
            detractores: { rango: [0, 6] },
            formulaNps: '% Promotores - % Detractores',
            motivosValidos: ['Atención', 'Calidad', 'Precio', 'Rapidez', 'Tiempo de espera', 'Pedido incompleto', 'Facturación'],
            reglaAuditoria: 'Si el comentario o el ticket contradicen el motivo registrado, reclasifica el motivo y deja constancia del cambio'
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
          role: 'Ventas registradas de las 2 semanas por cerrar e histórico de semanas auditadas',
          content: JSON.stringify({
            semanasPorCerrar: [
              { semana: '2026-W44', idempotencyKey: 'CIERRE-2026-W44-SIA', ventasRegistradasCOP: 12500000 },
              { semana: '2026-W45', idempotencyKey: 'CIERRE-2026-W45-SIA', ventasRegistradasCOP: 13000000 }
            ],
            historicoSemanas: [
              { semana: '2026-W41', ventasCOP: 11200000, estado: 'CERRADO_AUDITADO' },
              { semana: '2026-W42', ventasCOP: 11800000, estado: 'CERRADO_AUDITADO' },
              { semana: '2026-W43', ventasCOP: 12100000, estado: 'CERRADO_AUDITADO' }
            ]
          }, null, 2)
        },
        {
          filename: 'auxiliar_bancos_y_cartera_w44.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Recaudos en banco y facturas a crédito de las semanas 2026-W44 y 2026-W45',
          content: 'Semana,Tipo_Soporte,Referencia,Tercero,Monto_COP,Estado_Conciliacion\n2026-W44,Banco_Transferencia,PSE-7741,Supermercados Oriente,5200000,Confirmado en Extracto\n2026-W44,Banco_Transferencia,PSE-7789,Hoteles del Fonce S.A.S.,3800000,Confirmado en Extracto\n2026-W44,Cuenta_Por_Cobrar,FE-4510,Clínica Metropolitana,2000000,Crédito 30 días\n2026-W44,Cuenta_Por_Cobrar,FE-4518,Corporación Educativa Vélez,1500000,Crédito 30 días\n2026-W45,Banco_Transferencia,PSE-7902,Supermercados Oriente,6100000,Confirmado en Extracto\n2026-W45,Banco_Transferencia,PSE-7915,Hoteles del Fonce S.A.S.,4300000,Confirmado en Extracto\n2026-W45,Cuenta_Por_Cobrar,FE-4561,Clínica Metropolitana,2000000,Crédito 30 días\n'
        },
        {
          filename: 'protocolo_cierre_poka_yoke.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Reglas de bloqueo a prueba de errores e idempotencia para /schedule',
          content: '# Protocolo de Auditoría Semanal e Idempotencia (`/schedule`)\n\n1. **Regla Poka-Yoke de Cuadre Cruzado:** `Ventas_Registradas` DEBE ser exactamente igual a `Ingresos_Bancos + Cuentas_Por_Cobrar` de la misma semana. Si la diferencia es distinta de `$0`, bloquear el cierre de esa semana y listar el valor faltante.\n3. **Regla de variación:** Si las ventas de una semana varían más de 25 % frente al promedio de las semanas auditadas, marcar la semana para revisión humana.\n2. **Regla de Idempotencia:** Si la tarea programada se ejecuta dos veces sobre la misma `idempotencyKey`, actualiza el registro existente sin duplicar saldos.\n'
        }
      ]
    }
  };

  return { KITS_N2: KITS_N2 };
});
