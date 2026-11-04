/* Motor determinista de evaluación de Casos Testigo (4 estados: válido, inválido, vacío, reset) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AGPortal = root.AGPortal || {};
    Object.assign(root.AGPortal, factory());
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const WITNESS_SPECS = {
    1: { id: 1, label: 'Total de archivos válidos clasificados en las 4 carpetas ISO-8601', expectedValue: 8, tolerance: 0, allowNegative: false, unit: 'archivos', sampleInput: '8',
      formulaHint: 'Facturas (3) + Contratos (2) + Presupuestos (2) + Otros (1) = 8 archivos',
      stepByStep: '1. Facturas: 3 archivos (.html, .xml, .csv)\n2. Contratos: 2 archivos (.md, .txt)\n3. Presupuestos: 2 archivos (.csv, .json)\n4. Otros: 1 archivo (.txt)\nTotal clasificado = 8 archivos exactos.',
      validMsg: 'Clasificación exacta de 8 archivos conforme a la taxonomía ISO-8601.', overMsg: 'Sobredimensionamiento: el agente contó carpetas, temporales o archivos ocultos (.DS_Store).', underMsg: 'Déficit en conteo: el agente omitió subcarpetas o filtros restrictivos.' },
    2: { id: 2, label: 'Suma total de los 4 pedidos válidos normalizados en COP', expectedValue: 2450000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '2450000',
      formulaHint: '$1.200.000 + $450.000 + $320.000 + $480.000 = $2.450.000 COP',
      stepByStep: '1. Pedido 1 (Sillas): $1.200.000 COP\n2. Pedido 2 (Escritorios): $450.000 COP\n3. Pedido 3 (Lámparas): $320.000 COP\n4. Pedido 4 (Archivadores): $480.000 COP\nTotal consolidado = $2.450.000 COP.',
      validMsg: 'Consolidación de $2.450.000 COP en Primera Forma Normal (1NF) sin caracteres corruptos.', overMsg: 'Sobrecálculo: la IA sumó registros con importes corruptos o duplicó ítems al normalizar.', underMsg: 'Déficit en consolidación: la IA descartó filas válidas al limpiar símbolos o regex.' },
    3: { id: 3, label: 'Punto de Equilibrio en unidades (CF=$3.000.000, CV=$20.000, P=$50.000)', expectedValue: 100, tolerance: 0, allowNegative: false, unit: 'unidades', sampleInput: '100',
      formulaHint: '3.000.000 / (50.000 - 20.000) = 100 unidades exactas',
      stepByStep: '1. Margen unitario = Precio ($50.000) - Costo Variable ($20.000) = $30.000 COP/unidad.\n2. Punto de equilibrio = Costos Fijos ($3.000.000) / Margen unitario ($30.000) = 100 unidades.',
      validMsg: 'Umbral de 100 unidades verificado con absorción exacta de costos fijos y variables.', overMsg: 'Sobreestimación: la IA subestimó el margen unitario ($30.000 COP) inflando el umbral.', underMsg: 'Subestimación del punto de equilibrio: la IA omitió parte de los costos fijos.' },
    4: { id: 4, label: 'Fases contractuales auditadas de implementación y garantía (cronograma bimestral)', expectedValue: 2, tolerance: 0.05, allowNegative: false, unit: 'fases', sampleInput: '2',
      formulaHint: 'Inversión de $5.000.000 COP estructurada en 2 fases de entrega bimestral con acta',
      stepByStep: '1. Abre parametros_propuesta_roi.json y mira el campo fase de cada entregable.\n2. Fase 1 — Captura agrupa 2 entregables (mes 2) y Fase 2 — Control agrupa 1 (mes 4).\n3. Fases distintas = 2.',
      validMsg: 'Hito contractual validado: 2 fases bimestrales estructuradas con acta de entrega conforme a GEMINI.md.', overMsg: 'Sobredimensionamiento: El cronograma excede las 2 fases bimestrales pactadas en el contrato.', underMsg: 'Déficit de control: Se omitió la segunda fase de garantía y auditoría pactada con el cliente.' },
    5: { id: 5, label: 'Contactos únicos limpios tras fusionar 10 filas con 3 duplicados', expectedValue: 7, tolerance: 0, allowNegative: false, unit: 'contactos únicos', sampleInput: '7',
      formulaHint: '10 registros brutos - 3 duplicados fusionados = 7 registros maestros',
      stepByStep: '1. Registros brutos importados = 10 filas.\n2. Duplicados por teléfono o correo normalizado: Ana (2), Carlos (2) y Laura (2, correo distinto pero mismo teléfono) = 3 fusiones.\n3. Registros maestros = 10 - 3 = 7 contactos limpios.',
      validMsg: 'Depuración de 7 contactos únicos verificada con supervivencia estricta de registros maestros.', overMsg: 'Fusión incompleta: el agente de IA no aplicó la regla de supervivencia por correo o teléfono.', underMsg: 'Sobrededuplicación: la IA purgó contactos válidos confundiendo homónimos.' },
    6: { id: 6, label: 'Porcentaje de Margen Bruto Real (Precio Neto $1.000.000, Costo $650.000)', expectedValue: 35, tolerance: 0.1, allowNegative: false, unit: '%', sampleInput: '35',
      formulaHint: '(1.000.000 - 650.000) / 1.000.000 * 100 = 35 %',
      stepByStep: '1. Utilidad Bruta = Precio Neto ($1.000.000) - Costo ($650.000) = $350.000 COP.\n2. Margen Bruto = $350.000 / $1.000.000 = 0,35 (35 % exacto -> Semáforo Verde).',
      validMsg: 'Margen Bruto Real del 35 % confirmado con semáforo verde sobre precio de venta neto.', overMsg: 'Confusión típica en IA: calculó Markup sobre costo (53,8 %) en lugar de Margen Bruto sobre precio.', underMsg: 'Margen subestimado: la IA cargó gastos operativos indirectos que no van al costo de venta.' },
    7: { id: 7, label: 'Puntaje ponderado (Precio 7×40 % + Calidad 9×35 % + Rapidez 8×25 %)', expectedValue: 7.95, tolerance: 0.05, allowNegative: false, unit: 'puntos', sampleInput: '7.95',
      formulaHint: '2,80 + 3,15 + 2,00 = 7,95 sobre 10',
      stepByStep: '1. Precio: 7 × 0,40 = 2,80 pts.\n2. Calidad: 9 × 0,35 = 3,15 pts.\n3. Rapidez: 8 × 0,25 = 2,00 pts.\nPuntaje Ponderado = 2,80 + 3,15 + 2,00 = 7,95 puntos.',
      validMsg: 'Puntuación multicriterio de 7,95/10 verificada con pesos objetivos de adjudicación.', overMsg: 'Sobreponderación: la IA alteró los pesos relativos o sumó factores no normalizados a escala 10.', underMsg: 'Subponderación: la IA omitió alguno de los tres criterios ponderados.' },
    8: { id: 8, label: 'Punto de Reorden ROP (Venta prom 10, Venta máx 14, Entrega 5 días)', expectedValue: 70, tolerance: 0, allowNegative: false, unit: 'unidades', sampleInput: '70',
      formulaHint: '(10 × 5) + ((14 - 10) × 5) = 50 + 20 = 70 unidades',
      stepByStep: '0. Del historial de 14 días de CAF-500: promedio = 140 / 14 = 10 y máximo = 14.\n1. Consumo normal en espera = 10 bolsas/día × 5 días = 50 bolsas.\n2. Stock de seguridad = (14 - 10) × 5 días = 20 bolsas.\n3. Punto de Reorden (ROP) = 50 + 20 = 70 bolsas.',
      validMsg: 'Punto de Reorden de 70 unidades verificado protegiendo la variabilidad de la demanda.', overMsg: 'Sobreaprovisionamiento: la IA duplicó tiempo de espera o sumó stock de seguridad redundante.', underMsg: 'Riesgo de desabastecimiento: la IA omitió el stock de seguridad (20 uds).' },
    9: { id: 9, label: 'Puntaje NPS oficial (10 Promotores, 6 Pasivos y 4 Detractores de 20)', expectedValue: 30, tolerance: 0, allowNegative: true, unit: 'puntos NPS', sampleInput: '30',
      formulaHint: '% Promotores (50 %) - % Detractores (20 %) = +30',
      stepByStep: '1. Total respuestas = 20 clientes.\n2. % Promotores = 10 / 20 = 50 %.\n3. % Detractores = 4 / 20 = 20 %.\n4. NPS = 50 % - 20 % = +30 puntos.',
      validMsg: 'Indicador NPS de +30 puntos verificado excluyendo pasivos según estándar internacional.', overMsg: 'NPS inflado: la IA incluyó clientes pasivos (neutros) dentro de la proporción de promotores.', underMsg: 'Déficit en NPS: la IA restó los pasivos o calculó porcentajes sobre totales inconsistentes.' },
    10: { id: 10, label: 'Total cuadrado de Cierre Semanal (Bancos $9.000.000 + Cartera $3.500.000)', expectedValue: 12500000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '12500000',
      formulaHint: '$9.000.000 en bancos + $3.500.000 en cuentas por cobrar = $12.500.000 COP',
      stepByStep: '1. Semana 2026-W44: bancos $5.200.000 + $3.800.000 = $9.000.000 COP.\n2. Cartera W44: $2.000.000 + $1.500.000 = $3.500.000 COP.\n3. Total W44 = $12.500.000 COP = ventas registradas (diferencia $0). La W45 suma $12.400.000 frente a $13.000.000 y debe bloquearse.',
      validMsg: 'Cierre semanal cuadrado en $12.500.000 COP con conciliación bancaria y contable a diferencia cero.', overMsg: 'Descuadre contable positivo: la IA duplicó recaudos o computó notas crédito invertidas.', underMsg: 'Descuadre contable negativo: la IA omitió transacciones en tránsito o saldos de cartera.' },
    11: { id: 11, label: 'Valor Ponderado del Embudo ($10.000.000×50 % + $4.000.000×25 %)', expectedValue: 6000000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '6000000',
      formulaHint: '$5.000.000 + $1.000.000 = $6.000.000 COP',
      stepByStep: '1. OP-101: $10.000.000 × 50 % = $5.000.000 COP.\n2. OP-102: $4.000.000 × 25 % = $1.000.000 COP.\n3. OP-201 está Cerrado Perdido y no suma.\n4. Pipeline ponderado = $6.000.000 COP.',
      validMsg: 'Pronóstico ponderado de $6.000.000 COP verificado según la etapa real de conversión.', overMsg: 'Pipeline sobrevalorado: la IA asignó probabilidades superiores al estado del negocio.', underMsg: 'Pipeline subvalorado: la IA castigó probabilidades o no acumuló todas las oportunidades.' },
    12: { id: 12, label: 'Suma detectada en compra fraccionada (2 recibos de $175.000 el mismo día)', expectedValue: 350000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '350000',
      formulaHint: '$175.000 + $175.000 = $350.000 COP (> tope de $200.000)',
      stepByStep: '1. Julián, 2026-10-15, mismo NIT: REC-801 $175.000 + REC-802 $175.000 = $350.000 COP (Laura suma $170.000 y no supera el tope).\n2. Límite de autorización = $200.000 COP.\n3. Alerta: $350.000 > $200.000 (Fraccionamiento detectado).',
      validMsg: 'Alerta de fraccionamiento confirmada en $350.000 COP superando el tope de control de $200.000 COP.', overMsg: 'Falsa alarma: la IA agrupó comprobantes de fechas distintas o proveedores no relacionados.', underMsg: 'Evasión no detectada: la IA validó recibos aislados sin consolidar el mismo día.' },
    13: { id: 13, label: 'Saldo en banco al mes 2 vendiendo a 60 días (Inicio $50M - 2×$40M)', expectedValue: -30000000, tolerance: 1, allowNegative: true, unit: 'COP', sampleInput: '-30000000',
      formulaHint: '$50.000.000 - $40.000.000 (Ene) - $40.000.000 (Feb) = -$30.000.000 COP',
      stepByStep: '1. Saldo 1 de enero = $50.000.000 COP.\n2. Pagos de contado Ene y Feb = 2 × $40.000.000 = $80.000.000 COP.\n3. Cobros a 60 días en Feb = $0.\n4. Saldo real en banco = $50.000.000 - $80.000.000 = -$30.000.000 COP.',
      validMsg: 'Déficit de -$30.000.000 COP verificado alertando el desfase financiero de ventas a crédito.', overMsg: 'Ilusión de liquidez: la IA consideró ventas a plazo como recaudo disponible en tesorería.', underMsg: 'Déficit sobreestimado: la IA dedujo salidas adicionales a las operaciones programadas.' },
    14: { id: 14, label: 'Promedio de competencia (3 decisiones de 100 pts y 1 de 60 pts)', expectedValue: 90, tolerance: 0.1, allowNegative: false, unit: 'puntos', sampleInput: '90',
      formulaHint: '(100 + 100 + 100 + 60) / 4 = 90 puntos',
      stepByStep: '1. Coordinador_01: 3 escenarios óptimos (3 × 100) + 1 aceptable (60) = 360 puntos.\n2. Promedio = 360 / 4 = 90 puntos de competencia.',
      validMsg: 'Promedio de 90 puntos verificado evaluando solidez y consistencia en decisiones técnicas.', overMsg: 'Promedio inflado: la IA supuso desempeño perfecto en las 4 pruebas sin ponderar el caso de 60 pts.', underMsg: 'Promedio penalizado: la IA aplicó ponderación asimétrica en vez de media aritmética.' },
    15: { id: 15, label: 'Abono neto en banco tras comisión del 4 % sobre venta de $200.000', expectedValue: 192000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '192000',
      formulaHint: '$200.000 × (1 - 0,04) = $192.000 COP',
      stepByStep: '1. Venta bruta = $200.000 COP.\n2. Comisión pasarela (4 %) = $8.000 COP.\n3. Abono neto en extracto bancario = $200.000 - $8.000 = $192.000 COP.',
      validMsg: 'Abono neto de $192.000 COP verificado tras conciliar la comisión bancaria del 4 %.', overMsg: 'Error común en IA: acreditó la venta bruta ($200.000 COP) sin deducir comisión de pasarela (4 %).', underMsg: 'Deducción en exceso: la IA aplicó retenciones impositivas no estipuladas.' },
    16: { id: 16, label: 'Exceso de aforo detectado (120 inscritos en salón de 80 sillas)', expectedValue: 40, tolerance: 0, allowNegative: false, unit: 'personas', sampleInput: '40',
      formulaHint: '120 inscritos - 80 sillas de capacidad = 40 personas de sobrecupo',
      stepByStep: '1. Inscripciones confirmadas del Salón B en el CSV = 120 (las 4 canceladas no cuentan).\n2. Capacidad máxima autorizada = 80 sillas.\n3. Exceso de aforo por reasignar = 120 - 80 = 40 personas.',
      validMsg: 'Sobrecupo de 40 personas detectado activando la reasignación de espacios y control de aforo.', overMsg: 'Sobrecupo sobreestimado: la IA contó interesados sin confirmar o redujo la capacidad (80).', underMsg: 'Riesgo de seguridad: la IA subestimó las 40 personas por encima de la capacidad.' },
    17: { id: 17, label: 'Pedidos retenidos por regla Human-in-the-Loop (mora > 15 días)', expectedValue: 3, tolerance: 0, allowNegative: false, unit: 'pedidos', sampleInput: '3',
      formulaHint: 'De 5 pedidos en bodega, 3 superan los 15 días de mora y exigen firma humana',
      stepByStep: '1. Pedidos en bodega = 5.\n2. Mora estrictamente mayor a 15 días: PED-901 (22d), PED-903 (30d), PED-905 (19d) = 3 pedidos; PED-904 tiene 15 días y no se retiene.\n3. Retención obligatoria = 3 pedidos requieren firma humana.',
      validMsg: 'Retención de 3 pedidos verificada protegiendo la política de riesgo de cartera con intervención humana.', overMsg: 'Falso bloqueo: la IA retuvo pedidos con mora menor o igual a 15 días incumpliendo la regla HITL.', underMsg: 'Falla de seguridad HITL: la IA liberó pedidos en mora crítica sin firma humana requerida.' },
    18: { id: 18, label: 'Balance de cobertura ordinaria semanal Ley 2101 (5 colaboradores × 42 h)', expectedValue: 210, tolerance: 0, allowNegative: false, unit: 'horas', sampleInput: '210',
      formulaHint: '5 colaboradores × 42 horas semanales de cobertura ordinaria legal = 210 horas',
      stepByStep: '1. Demanda diaria = Mañana 2 + Tarde 2 + Noche 1 = 5 turnos de 7 h = 35 horas.\n2. Semana de lunes a sábado = 6 × 35 = 210 horas.\n3. Capacidad legal = 5 colaboradores × 42 h = 210 horas: la demanda se cubre sin horas extras.',
      validMsg: 'Capacidad de 210 horas ordinarias verificada conforme a la Ley 2101 (42 h/semana).', overMsg: 'Infracción laboral: la IA superó la jornada máxima legal colombiana (42 h/semana) con sobretiempo.', underMsg: 'Capacidad subutilizada: la IA calculó menos de las 210 horas ordinarias sin justificación.' },
    19: { id: 19, label: 'Duración esperada PERT en días (Optimista=5, Probable=8, Pesimista=20)', expectedValue: 9.5, tolerance: 0.05, allowNegative: false, unit: 'días', sampleInput: '9.5',
      formulaHint: '(5 + 4×8 + 20) / 6 = 57 / 6 = 9,5 días',
      stepByStep: '1. Optimista = 5 días, Más Probable = 8 días, Pesimista = 20 días.\n2. Ponderación = 5 + (4 × 8) + 20 = 5 + 32 + 20 = 57.\n3. Duración esperada PERT = 57 / 6 = 9,5 días.',
      validMsg: 'Duración PERT de 9,5 días verificada integrando incertidumbre mediante distribución beta.', overMsg: 'Estimación inflada: la IA dio peso desproporcionado a lo pesimista o promedió sin fórmula PERT.', underMsg: 'Estimación optimista riesgosa: la IA omitió el ponderador 4x del tiempo más probable.' },
    20: { id: 20, label: 'Flujo de Caja Neto tras reserva del 15 % (Ingresos $12M, Egresos $7,8M)', expectedValue: 3570000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '3570000',
      formulaHint: '($12.000.000 - $7.800.000) × (1 - 0,15) = $4.200.000 × 0,85 = $3.570.000 COP',
      stepByStep: '1. Pedidos cobrados = $12.000.000 (PV-306 está por cobrar y no entra); egresos = $7.800.000.\n   Utilidad Operativa = $12.000.000 - $7.800.000 = $4.200.000 COP.\n2. Reserva impositiva (15 %) = $630.000 COP.\n3. Flujo de Caja Neto Disponible = $4.200.000 - $630.000 = $3.570.000 COP.',
      validMsg: 'Flujo neto de $3.570.000 COP verificado asegurando la provisión de impuestos y liquidez del negocio.', overMsg: 'Riesgo impositivo: la IA omitió reservar el 15 % legal de impuestos sobre utilidad operativa.', underMsg: 'Flujo subestimado: la IA duplicó deducciones o reservó porcentaje tributario excesivo.' },
    21: { id: 21, label: 'Neto a pagar sobre base de $2.000.000 (+19 % IVA - 2,5 % Retefuente)', expectedValue: 2330000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '2330000',
      formulaHint: '$2.000.000 + $380.000 (IVA) - $50.000 (Retefuente) = $2.330.000 COP',
      stepByStep: '1. Base = $2.000.000 COP.\n2. IVA (19 %) = +$380.000 COP.\n3. Retefuente (2,5 %) = -$50.000 COP.\n4. Neto a pagar = $2.330.000 COP.',
      validMsg: 'Neto de $2.330.000 COP verificado tras editar en línea con Ctrl+I el IVA (19 %) y la Retefuente (2,5 %).', overMsg: 'Sobrecálculo: olvidaste restar la retención en la fuente del 2,5 % ($50.000 COP).', underMsg: 'Subcálculo: se mantuvo el IVA desactualizado del 16 % o se descontó un porcentaje mayor.' },
    22: { id: 22, label: 'Comisión escalonada total (Venta neta $15M: $10M×5 % + $5M×8 %)', expectedValue: 900000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '900000',
      formulaHint: '($10.000.000 × 5 %) + ($5.000.000 × 8 %) = $500.000 + $400.000 = $900.000 COP',
      stepByStep: '1. Venta neta = $16.000.000 - $1.000.000 (devoluciones) = $15.000.000 COP.\n2. Tramo base ($10M × 5 %) = $500.000 COP.\n3. Excedente ($5M × 8 %) = $400.000 COP.\n4. Total = $900.000 COP.',
      validMsg: 'Comisión escalonada de $900.000 COP verificada descontando devoluciones descubiertas con /grill-me.', overMsg: 'Pago en exceso: la IA aplicó el 8 % a toda la venta o no descontó el $1.000.000 de devoluciones.', underMsg: 'Déficit en comisión: la IA no activó el acelerador del 8 % sobre los $5.000.000 de excedente.' },
    23: { id: 23, label: 'Total neto autorizado de nómina tras excluir giro duplicado ($18,5M - $2,5M)', expectedValue: 16000000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '16000000',
      formulaHint: '$18.500.000 lote bruto - $2.500.000 cuenta duplicada = $16.000.000 COP',
      stepByStep: '1. Total bruto de los 6 registros = $18.500.000 COP.\n2. Giro repetido (cuenta 0088331022) = $2.500.000 COP.\n3. Total neto seguro = $16.000.000 COP.',
      validMsg: 'Dispersión segura de $16.000.000 COP verificada por consola bloqueando el giro duplicado de $2.500.000.', overMsg: 'Riesgo de doble pago: la IA incluyó el giro duplicado de $2.500.000 COP.', underMsg: 'Retención excesiva: la IA eliminó ambos registros del empleado en lugar de conservar uno válido.' },
    24: { id: 24, label: 'Flete liquidado por Peso Volumétrico (100×50×50 cm / 2500 = 100 kg × $4.000)', expectedValue: 400000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '400000',
      formulaHint: 'max(40 kg, 250.000 / 2.500 = 100 kg) × $4.000 = $400.000 COP',
      stepByStep: '1. Peso volumétrico = (100 × 50 × 50) / 2.500 = 100 kg.\n2. Peso facturable = max(40 kg báscula, 100 kg volumétrico) = 100 kg.\n3. Flete = 100 kg × $4.000 = $400.000 COP.',
      validMsg: 'Flete de $400.000 COP verificado liquidando sobre los 100 kg de peso volumétrico registrado como regla en GEMINI.md.', overMsg: 'Sobrecobro: la IA sumó el peso de báscula más el volumétrico en lugar de elegir el mayor.', underMsg: 'Pérdida logística: la IA cobró por los 40 kg de báscula ($160.000) ignorando el volumen ocupado.' },
    25: { id: 25, label: 'Valor Económico Agregado EVA (NOPAT $38M - Capital $200M × WACC 12 %)', expectedValue: 14000000, tolerance: 1, allowNegative: true, unit: 'COP', sampleInput: '14000000',
      formulaHint: '$38.000.000 - ($200.000.000 × 12 %) = $38.000.000 - $24.000.000 = $14.000.000 COP',
      stepByStep: '0. WACC = 50 % × 10 % + 50 % × 14 % = 12 %.\n1. NOPAT de UN-01 = $38.000.000 COP.\n2. Cargo de capital = $200.000.000 × 12 % = $24.000.000 COP.\n3. EVA = $38.000.000 - $24.000.000 = $14.000.000 COP.',
      validMsg: 'EVA positivo de $14.000.000 COP verificado tras el análisis multiperspectiva descontando el costo de oportunidad WACC (12 %).', overMsg: 'Sobreestimación: la IA reportó el NOPAT ($38M) sin deducir el cargo de capital ($24M).', underMsg: 'Subestimación: la IA aplicó un costo de capital superior al 12 % ponderado.' },
    26: { id: 26, label: 'Cobertura total asegurada en pólizas (Contrato $80M: 30 % Cumplimiento + 20 % Salarios)', expectedValue: 40000000, tolerance: 1, allowNegative: false, unit: 'COP', sampleInput: '40000000',
      formulaHint: '($80.000.000 × 30 %) + ($80.000.000 × 20 %) = $24.000.000 + $16.000.000 = $40.000.000 COP',
      stepByStep: '1. Amparo cumplimiento (30 % de $80M) = $24.000.000 COP.\n2. Amparo salarios (20 % de $80M) = $16.000.000 COP.\n3. Cobertura total exigida = $40.000.000 COP.',
      validMsg: 'Cobertura de $40.000.000 COP verificada autónomamente con /goal sobre los dos amparos contractuales.', overMsg: 'Sobredimensionamiento: la IA tomó el 100 % del contrato como garantía exigible.', underMsg: 'Cobertura insuficiente: la IA calculó solo uno de los dos amparos obligatorios.' }
  };

  function getWitnessSpec(exerciseId, customSpecs) {
    const id = Number(exerciseId);
    if (customSpecs) {
      if (Array.isArray(customSpecs)) {
        const found = customSpecs.find(function (e) { return e && Number(e.id) === id; });
        if (found && found.testCase) {
          const base = WITNESS_SPECS[id] || WITNESS_SPECS[1];
          const tc = found.testCase;
          return Object.assign({}, base, {
            id: id, label: tc.label || tc.expectedMetric || found.title || base.label,
            unit: tc.unit || base.unit || 'unidades',
            expectedValue: Number(tc.expectedValue),
            tolerance: tc.tolerance !== undefined ? Number(tc.tolerance) : base.tolerance,
            sampleInput: String(tc.sampleInput || base.sampleInput),
            formulaHint: tc.formulaHint || base.formulaHint
          });
        }
      } else if (typeof customSpecs === 'object' && customSpecs[id]) {
        const item = customSpecs[id];
        return Object.assign({}, WITNESS_SPECS[id] || WITNESS_SPECS[1], item.testCase || item);
      }
    }
    return WITNESS_SPECS[id] || WITNESS_SPECS[1];
  }

  function parseFlexibleNumber(rawInput) {
    const trimmed = String(rawInput == null ? '' : rawInput).trim();
    if (trimmed === '') return { isEmpty: true, value: NaN };

    let cleaned = trimmed.replace(/[\s$%a-zA-Z]/g, '');
    if (cleaned.includes(',') && cleaned.includes('.')) {
      cleaned = cleaned.replace(/\./g, '').replace(',', '.');
    } else if (cleaned.includes(',')) {
      cleaned = cleaned.replace(',', '.');
    } else if (/^-?\d{1,3}(\.\d{3})+$/.test(cleaned)) {
      cleaned = cleaned.replace(/\./g, '');
    }

    if (!/^-?\d+(\.\d+)?$/.test(cleaned)) {
      return { isEmpty: false, value: NaN };
    }
    return { isEmpty: false, value: Number(cleaned) };
  }

  function evaluateWitnessCase(exerciseId, rawInput, customSpecs) {
    const spec = getWitnessSpec(exerciseId, customSpecs);
    const parsed = parseFlexibleNumber(rawInput);

    if (parsed.isEmpty) {
      return {
        status: 'vacio', ok: false, exerciseId: spec.id, expectedValue: spec.expectedValue,
        message: 'Estado Vacío: ingresa tu cálculo del Caso Testigo antes de verificar (evita dejar el campo en blanco).',
        formulaHint: spec.formulaHint
      };
    }

    if (Number.isNaN(parsed.value)) {
      return {
        status: 'invalido', ok: false, exerciseId: spec.id, expectedValue: spec.expectedValue,
        message: 'Estado Inválido: el valor ingresado contiene caracteres no numéricos. Escribe únicamente cifras válidas.',
        formulaHint: spec.formulaHint
      };
    }

    if (!spec.allowNegative && parsed.value < 0) {
      return {
        status: 'invalido', ok: false, exerciseId: spec.id, expectedValue: spec.expectedValue,
        message: 'Estado Inválido: este indicador no admite cantidades negativas. Revisa los signos de tu operación.',
        formulaHint: spec.formulaHint
      };
    }

    const diff = Math.abs(parsed.value - spec.expectedValue);
    if (diff <= (spec.tolerance || 0) + 1e-9) {
      const validDetail = spec.validMsg ? ' ' + spec.validMsg : '';
      return {
        status: 'valido', ok: true, exerciseId: spec.id, enteredValue: parsed.value, expectedValue: spec.expectedValue, diff: diff,
        message: 'Estado Válido: cálculo exacto verificado (' + spec.expectedValue.toLocaleString('es-CO') + ' ' + spec.unit + ').' + validDetail + ' Ya tienes tu Caso Testigo listo para auditar la entrega de Antigravity en tu Portafolio de Evidencias.',
        formulaHint: spec.formulaHint
      };
    }

    const isOver = parsed.value > spec.expectedValue;
    const diagnosis = isOver ? (spec.overMsg || 'Sobredimensionamiento frente al valor esperado.') : (spec.underMsg || 'Déficit frente al valor esperado.');
    return {
      status: 'invalido', ok: false, exerciseId: spec.id, enteredValue: parsed.value, expectedValue: spec.expectedValue, diff: diff,
      message: 'Estado Inválido (Diferencia matemática): ingresaste ' + parsed.value.toLocaleString('es-CO') + ' pero el Caso Testigo da ' + spec.expectedValue.toLocaleString('es-CO') + ' ' + spec.unit + '. Diagnóstico: ' + diagnosis + ' Revisa la fórmula: ' + spec.formulaHint,
      formulaHint: spec.formulaHint
    };
  }

  function resetWitnessCase(exerciseId, customSpecs) {
    const spec = getWitnessSpec(exerciseId, customSpecs);
    return {
      status: 'reset', ok: false, exerciseId: spec.id, inputValue: '', sampleInput: spec.sampleInput, expectedValue: spec.expectedValue,
      message: 'Estado Reiniciado (Reset): el simulador volvió a su estado limpio inicial. Calcula el resultado con la fórmula del ejercicio (' + spec.sampleInput + ') y escríbelo para verificar.',
      formulaHint: spec.formulaHint
    };
  }

  return {
    WITNESS_SPECS,
    getWitnessSpec,
    parseFlexibleNumber,
    evaluateWitnessCase,
    resetWitnessCase
  };
});
