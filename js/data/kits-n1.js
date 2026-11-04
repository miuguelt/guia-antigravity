/* Catálogo de Kits de Archivos Semilla Reales — Nivel 1 (Ejercicios 1 al 5) */
/* Nota: Todos los documentos y registros de este módulo son materiales de práctica creados para aprender y no contienen datos personales reales. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const KITS_N1 = {
    1: {
      zipName: 'kit-ej01-archivos-desordenados.zip',
      folderName: 'ejercicio-01-organizador-documental',
      summary: 'Carpeta real con 8 documentos operativos sueltos (.html, .xml, .csv, .md, .json, .txt) para clasificar y renombrar bajo norma ISO-8601.',
      files: [
        {
          filename: '15-03-2026_factura_enel_energia.html', ext: 'html', mime: 'text/html;charset=utf-8',
          role: 'Factura de energía eléctrica para clasificar en 01_Facturas',
          content: '<!doctype html>\n<html lang="es-CO"><head><meta charset="utf-8"><title>Factura Enel #FE-99214</title></head>\n<body>\n  <h1>ENEL COLOMBIA S.A. E.S.P. — NIT 860.063.875-8</h1>\n  <p><strong>Cliente:</strong> Soluciones Integrales Andinas S.A.S. (NIT 901.482.391-4)</p>\n  <p><strong>Fecha de emisión:</strong> 15/03/2026 | <strong>Periodo:</strong> Febrero-Marzo 2026</p>\n  <p><strong>Consumo Activo:</strong> 740 kWh | <strong>Total a Pagar:</strong> $685.400 COP</p>\n  <p><strong>Estado:</strong> PAGADO — Comprobante PSE #884120</p>\n</body></html>\n'
        },
        {
          filename: '02-11-2025_factura_internet_fibra.xml', ext: 'xml', mime: 'application/xml;charset=utf-8',
          role: 'Factura electrónica XML de conectividad para clasificar en 01_Facturas',
          content: '<?xml version="1.0" encoding="UTF-8"?>\n<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">\n  <ID>SETT-445109</ID>\n  <IssueDate>2025-11-02</IssueDate>\n  <AccountingSupplierParty><Name>Colombia Telecomunicaciones S.A. E.S.P.</Name><CompanyID>830122566-1</CompanyID></AccountingSupplierParty>\n  <AccountingCustomerParty><Name>Soluciones Integrales Andinas S.A.S.</Name><CompanyID>901482391-4</CompanyID></AccountingCustomerParty>\n  <LegalMonetaryTotal><PayableAmount currencyID="COP">289900.00</PayableAmount></LegalMonetaryTotal>\n  <Note>Servicio Internet Dedicado Fibra 500 Mbps Sede Vélez</Note>\n</Invoice>\n'
        },
        {
          filename: '28-01-2026_factura_papeleria_central.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Relación de compra de papelería para clasificar en 01_Facturas',
          content: 'Factura_No,Fecha_Emision,Proveedor,NIT_Proveedor,Item,Cantidad,Valor_Unitario_COP,Subtotal_COP\nFV-3092,28-01-2026,Papeleria Central de Santander S.A.S.,900331442-5,Resma Papel Carta Ecológico 75g,20,16500,330000\nFV-3092,28-01-2026,Papeleria Central de Santander S.A.S.,900331442-5,Caja Marcadores Borrables x12,2,21000,42000\nFV-3092,28-01-2026,Papeleria Central de Santander S.A.S.,900331442-5,Rollo Etiquetas Térmicas Bodega,4,10000,40000\n'
        },
        {
          filename: 'contrato_arrendamiento_local_2026.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Contrato de arrendamiento comercial para clasificar en 02_Contratos',
          content: '# CONTRATO DE ARRENDAMIENTO DE LOCAL COMERCIAL Y BODEGA No. CA-2026-01\n\n- **Fecha de suscripción:** 2026-01-05\n- **Arrendador:** Inmobiliaria del Oriente S.A.S. (NIT 900.512.889-3)\n- **Arrendatario:** Soluciones Integrales Andinas S.A.S. (NIT 901.482.391-4)\n- **Inmueble:** Bodega 4, Parque Industrial Guantiva, Vélez (Santander)\n- **Canon mensual:** $1.800.000 COP pagaderos dentro de los primeros cinco (5) días hábiles.\n- **Vigencia:** 12 meses (2026-01-05 a 2027-01-04).\n'
        },
        {
          filename: 'contrato_mantenimiento_aires_2025.txt', ext: 'txt', mime: 'text/plain;charset=utf-8',
          role: 'Contrato de mantenimiento técnico para clasificar en 02_Contratos',
          content: 'ORDEN CONTRACTUAL DE SERVICIO TÉCNICO No. OC-2025-19\nFecha: 18-09-2025\nContratista: Climatización Industrial Santander S.A.S. (NIT 901.114.209-7)\nObjeto: Mantenimiento preventivo trimestral de 4 unidades inverter en sala de servidores y oficinas.\nValor total anual: $950.000 COP (IVA incluido).\nGarantía técnica por intervención: 90 días calendario.\n'
        },
        {
          filename: 'presupuesto_mercadeo_trimestre2.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Presupuesto de campaña comercial para clasificar en 03_Presupuestos',
          content: 'Codigo_Rubro,Fecha_Planeacion,Actividad,Responsable,Presupuesto_Asignado_COP,Estado\nMKT-2026-01,2026-04-01,Pauta Digital Geolocalizada Santander,Camila Rojas,1800000,Aprobado\nMKT-2026-02,2026-04-15,Stand Feria Agroindustrial de Vélez,Diego Castro,2100000,Aprobado\nMKT-2026-03,2026-05-02,Catálogos Impresos y Muestras Café,Camila Rojas,600000,En revisión\n'
        },
        {
          filename: 'presupuesto_adecuacion_bodega.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Presupuesto de infraestructura para clasificar en 03_Presupuestos',
          content: JSON.stringify({
            documento: 'Presupuesto Adecuación Bodega Central',
            fechaFormulacion: '2026-02-10',
            moneda: 'COP',
            partidas: [
              { codigo: 'INF-01', descripcion: 'Estantería pesada selectiva 4 niveles', valorCOP: 3800000 },
              { codigo: 'INF-02', descripcion: 'Iluminación industrial LED alta eficiencia', valorCOP: 1450000 },
              { codigo: 'INF-03', descripcion: 'Demarcación epóxica de pasillos y seguridad', valorCOP: 950000 }
            ],
            totalPresupuestoCOP: 6200000
          }, null, 2)
        },
        {
          filename: 'nota_rapida_reunion_lunes.txt', ext: 'txt', mime: 'text/plain;charset=utf-8',
          role: 'Apunte interno de reunión operativa para clasificar en 04_Otros',
          content: 'APUNTES COMITÉ OPERATIVO DEL LUNES\nFecha: 09-03-2026\nAsistentes: Gerencia, Bodega, Comercial\n1. Unificar el archivo digital antes del cierre de trimestre aplicando norma ISO-8601.\n2. Ninguna factura debe guardarse con el día primero en el nombre.\n3. Revisar cotización de estanterías antes del viernes.\n'
        }
      ]
    },
    2: {
      zipName: 'kit-ej02-pedidos-multicanal.zip',
      folderName: 'ejercicio-02-normalizacion-pedidos',
      summary: 'Exportación de chat de WhatsApp, correo institucional (.eml.txt) y catálogo JSON para pasar 4 pedidos a una tabla con un solo dato por casilla.',
      files: [
        {
          filename: 'notas_crudas_pedidos.txt', ext: 'txt', mime: 'text/plain;charset=utf-8',
          role: 'Exportación cruda de mensajes de WhatsApp con 4 pedidos, algunos sin dirección',
          content: 'EXPORTACIÓN DE CHAT — WHATSAPP VENTAS CORPORATIVAS (DATOS DE PRÁCTICA)\n[14/10/2026, 08:15:22] +57 310 555 1234: Hola soy maria gomez (tel 310-555-1234), necesito 4 sillas ergonomicas para el martes, pago $1200000 URGENTE\n[14/10/2026, 09:42:10] +57 315 888 9900: Buen día, habla carlos ruiz 315 888 9900, envíame 2 escritorios ejecutivos por valor de $450000 prioridad media, dirección Cra 15 #88-10 Bogotá\n[14/10/2026, 11:05:49] +57 300 444 5566: Pedido de ana lopez tel 3004445566: 8 lamparas led de escritorio total $320000 urgencia baja, entregar en Calle 34 #12-08 Bucaramanga\n[14/10/2026, 14:20:03] +57 320 111 2233: Urgente! Jorge Perez (320-111-2233) solicita 3 archivadores metalicos total $480000, falta confirmar dirección de entrega\n'
        },
        {
          filename: 'correo_confirmacion_bodega.eml.txt', ext: 'txt', mime: 'text/plain;charset=utf-8',
          role: 'Correo interno con requisitos obligatorios de despacho para detectar datos faltantes',
          content: 'From: despachos@solucionesandinas.co\nTo: ventas@solucionesandinas.co\nSubject: Regla obligatoria para liberar órdenes de despacho\nDate: Wed, 14 Oct 2026 07:30:00 -0500\n\nEquipo comercial:\nRecuerden que ningún pedido puede pasar a camión si no tiene: (1) Teléfono normalizado a 10 dígitos, (2) Valor numérico limpio sin símbolos de pesos ni puntos, y (3) Dirección física de entrega confirmada. Si falta la dirección, marquen Dato_Faltante = "Falta Dirección de Entrega".\n'
        },
        {
          filename: 'catalogo_mobiliario_referencia.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Catálogo maestro de mobiliario con códigos SKU y precios unitarios oficiales',
          content: JSON.stringify({
            moneda: 'COP',
            referencias: [
              { sku: 'MOB-SIL-01', nombre: 'Silla Ergonómica Malla Lumbar', precioUnitarioCOP: 300000 },
              { sku: 'MOB-ESC-02', nombre: 'Escritorio Ejecutivo Melamina 150cm', precioUnitarioCOP: 225000 },
              { sku: 'MOB-LAM-03', nombre: 'Lámpara LED Escritorio Brazo Articulado', precioUnitarioCOP: 40000 },
              { sku: 'MOB-ARC-04', nombre: 'Archivador Metálico 3 Gavetas con Llave', precioUnitarioCOP: 160000 }
            ]
          }, null, 2)
        }
      ]
    },
    3: {
      zipName: 'kit-ej03-punto-equilibrio.zip',
      folderName: 'ejercicio-03-calculadora-equilibrio',
      summary: 'Estructura de costos fijos y variables (.csv), desglose de insumo unitario (.json) y metas financieras (.yaml).',
      files: [
        {
          filename: 'costos_base_negocio.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Costos fijos, costo variable y precio para calcular el Punto de Equilibrio',
          content: 'Concepto,Tipo,Valor_COP,Observacion\nArriendo Bodega y Servicios,Costo_Fijo_Mensual,1800000,Sede principal Vélez\nNomina Administrativa y Seguros,Costo_Fijo_Mensual,1200000,Sueldo base mensual fijo\nCosto Variable por Unidad,Costo_Variable_Unitario,20000,Café tostado + bolsa válvula + etiqueta\nPrecio de Venta Unitario,Precio_Venta,50000,Precio de lista antes de descuentos\n'
        },
        {
          filename: 'desglose_costo_unitario.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Ficha técnica de costos variables por unidad producida',
          content: JSON.stringify({
            producto: 'Kit Café Especial Origen Santander 500g',
            costoVariableTotalCOP: 20000,
            componentes: [
              { insumo: 'Grano pergamino seleccionado y tostión media', costoCOP: 14500 },
              { insumo: 'Empaque trilaminado con válvula desgasificadora', costoCOP: 3200 },
              { insumo: 'Etiqueta de origen y sello de seguridad', costoCOP: 1100 },
              { insumo: 'Comisión de recaudo electrónico', costoCOP: 1200 }
            ]
          }, null, 2)
        },
        {
          filename: 'metas_rentabilidad.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Parámetros de simulación financiera y descuentos promocionales',
          content: 'empresa: "Café Especial Santander S.A.S."\nmoneda: "COP"\ncostos_fijos_totales_mes: 3000000\ncosto_variable_unitario: 20000\nprecio_venta_lista: 50000\nmeta_utilidad_mensual_cop: 1500000\nescenarios_descuento_pct:\n  - 5\n  - 10\n  - 15\n'
        }
      ]
    },
    4: {
      zipName: 'kit-ej04-memoria-gemini-scqa.zip',
      folderName: 'ejercicio-04-propuestas-gemini-md',
      summary: 'Archivo de memoria permanente GEMINI.md, diagnóstico de cliente en Markdown y parámetros de ROI en JSON.',
      files: [
        {
          filename: 'GEMINI.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Reglas permanentes de estilo, estructura SCQA, moneda COP e impresión',
          content: '# Reglas Permanentes del Proyecto (GEMINI.md)\n\n1. **Audiencia y Estructura:** Redacta toda propuesta ejecutiva aplicando la Pirámide de Minto (SCQA: Situación, Complicación, Pregunta y Respuesta). La Respuesta abre con la recomendación y el tiempo de recuperación, calculado solo con las cifras del diagnóstico.\n2. **Idioma y Moneda:** Español de Colombia (`es-CO`) y Pesos Colombianos (`COP`) con separador de miles.\n3. **Diseño e Impresión:** Paleta serena con contraste accesible (>= 4.5:1) y hoja `@media print` tamaño carta limpia.\n4. **Veracidad Determinista:** Prohibido inventar cifras o dejar marcadores vacíos como `[Insertar dato]`.\n'
        },
        {
          filename: 'diagnostico_operativo_cliente.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Levantamiento real del problema del cliente para estructurar la propuesta SCQA',
          content: '# Diagnóstico Operativo — Distribuidora Agroindustrial del Carare S.A.S.\n\n- **Situación actual:** La empresa procesa 400 pedidos mensuales manualmente desde hojas de cálculo sueltas.\n- **Complicación cuantificada:** Los errores de digitación y despachos cruzados generan pérdidas y reprocesos por **$2.500.000 COP al mes** ($30.000.000 COP al año).\n- **Pregunta clave:** ¿Cómo eliminar el reproceso operativo recuperando la inversión en el primer trimestre?\n- **Propuesta e Inversión:** Automatización integral del flujo de pedidos con inversión única de **$5.000.000 COP**.\n- **Ahorro mensual directo:** **$2.500.000 COP/mes**.\n'
        },
        {
          filename: 'parametros_propuesta_roi.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Cifras del cliente y entregables agrupados por fase contractual',
          content: JSON.stringify({
            cliente: 'Distribuidora Agroindustrial del Carare S.A.S.',
            nit: '900.741.258-9',
            costoProblemaMensualCOP: 2500000,
            inversionProyectoCOP: 5000000,
            ahorroMensualEstimadoCOP: 2500000,
            entregables: [
              { fase: 'Fase 1 — Captura', entregable: 'Estandarización de captura de pedidos', mesEntrega: 2, pagoPct: 50 },
              { fase: 'Fase 1 — Captura', entregable: 'Validador automático de cartera', mesEntrega: 2, pagoPct: 0 },
              { fase: 'Fase 2 — Control', entregable: 'Tablero gerencial y acta de conformidad', mesEntrega: 4, pagoPct: 50 }
            ],
            reglaPagos: 'Cada pago se libera solo con acta de conformidad firmada al cierre de su fase'
          }, null, 2)
        }
      ]
    },
    5: {
      zipName: 'kit-ej05-deduplicacion-contactos.zip',
      folderName: 'ejercicio-05-consolidador-contactos',
      summary: 'Base de 10 contactos con duplicados exactos y aproximados (.csv), registros complementarios de feria (.json) y reglas de supervivencia (.yaml).',
      files: [
        {
          filename: 'contactos_duplicados.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: '10 registros de formularios web, feria e histórico, con duplicados exactos y aproximados',
          content: 'ID_Origen,Nombre,Correo,Telefono,Ciudad,Cargo\nWEB-01,Ana María López,ANA.LOPEZ@EMPRESA.CO,(315) 222-3344,,Directora Comercial\nEVT-01,Ana M. Lopez,ana.lopez@empresa.co,3152223344,Bucaramanga,\nWEB-02,Carlos Andrés Pérez,cperez@logistica.co,310-444-5566,Bogotá,Jefe de Bodega\nHIS-01,Carlos A. Perez,C.PEREZ@LOGISTICA.CO ,310 444 5566,Bogota,\nWEB-03,Laura Sofía Gómez,lgomez@clinica.co,3209998877,Medellín,Coordinadora\nEVT-02,Laura Gomez,laura.gomez@clinica.co,(320) 999-8877,,Coordinadora Médica\nWEB-04,Mateo Vargas,mvargas@constructora.co,3001112233,Cali,Ingeniero Residente\nWEB-05,Valentina Rojas,vrojas@estudio.co,3112223344,Barranquilla,Arquitecta\nWEB-06,Diego Fernando Castro,dcastro@agro.co,3123334455,Pereira,Administrador\nWEB-07,Camila Andrea Silva,csilva@educacion.co,3145556677,Manizales,Rectora\n'
        },
        {
          filename: 'asistentes_rueda_negocios.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Fuente complementaria capturada en evento presencial para auditoría de rescate de campos',
          content: JSON.stringify({
            evento: 'Rueda de Negocios Santander Compra Santander 2026',
            registros: [
              { idEvento: 'EVT-01', correo: 'ana.lopez@empresa.co', ciudadRescatada: 'Bucaramanga', interes: 'Compra Mayorista' },
              { idEvento: 'EVT-03', correo: 'cperez@logistica.co', cargoActualizado: 'Gerente de Operaciones', interes: 'Contrato Anual' },
              { idEvento: 'EVT-02', correo: 'laura.gomez@clinica.co', cargoActualizado: 'Coordinadora Médica', interes: 'Dotación Sedes' }
            ]
          }, null, 2)
        },
        {
          filename: 'reglas_supervivencia_crm.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Reglas deterministas de normalización y supervivencia de atributos',
          content: 'normalizacion:\n  correo: "convertir a minúsculas y eliminar espacios extremos"\n  telefono: "conservar únicamente los 10 dígitos numéricos móviles de Colombia"\nregla_supervivencia:\n  nombre: "conservar la cadena con mayor longitud y tildes completas"\n  ciudad: "rescatar el valor no vacío entre las fichas fusionadas"\n  cargo: "priorizar el cargo más específico o reciente"\nclave_coincidencia:\n  regla: "dos filas son la misma persona si comparten el teléfono normalizado o el correo normalizado"\n  correo_normalizado: "minúsculas, sin espacios y sin puntos antes de la arroba"\n  advertencia: "una persona puede escribir su correo de dos formas; el teléfono es la clave más confiable"\n'
        }
      ]
    }
  };

  return { KITS_N1: KITS_N1 };
});
