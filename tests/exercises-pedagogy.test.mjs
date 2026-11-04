/**
 * tests/exercises-pedagogy.test.mjs
 *
 * Comprueba que los 26 ejercicios de Antigravity se puedan resolver con los datos de su kit:
 * 1. Cada @archivo citado en el prompt, los pasos o el refinamiento existe en el kit.
 * 2. Ningún kit trae la respuesta ya calculada.
 * 3. Cada Caso Testigo se recalcula leyendo los archivos del kit, no con números fijos.
 * 4. Los ejercicios solo usan comandos de Antigravity confirmados.
 * 5. La ruta se ordena por nivel y la navegación respeta la lista filtrada.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const agN1N2 = require('../js/data/ag-exercises-n1-n2.js');
const agN3N4 = require('../js/data/ag-exercises-n3-n4.js');
const kitGen = require('../js/core/kit-generator.js');
const agTabs = require('../js/ui/render-ag-tabs.js');
const toolsMap = require('../js/data/antigravity-tools-map.js');

const exercises = [...agN1N2.AG_EXERCISES_N1_N2, ...agN3N4.AG_EXERCISES_N3_N4];
const byId = (id) => exercises.find((e) => e.id === id);
const files = (id) => kitGen.getKitFiles(id);
const file = (id, name) => {
  const f = files(id).find((x) => x.filename === name);
  assert.ok(f, `El kit ${id} debe incluir ${name}`);
  return f.content;
};
const json = (id, name) => JSON.parse(file(id, name));
const csv = (id, name) => {
  const [head, ...rows] = file(id, name).trim().split('\n');
  const cols = head.split(',');
  return rows.map((r) => Object.fromEntries(r.split(',').map((v, i) => [cols[i], v])));
};
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const expected = (id) => byId(id).testCase.expectedValue;

test('1. Todo @archivo citado en un ejercicio existe en su kit', () => {
  for (const ex of exercises) {
    const names = new Set(files(ex.id).map((f) => f.filename));
    const text = [ex.initialPrompt, ex.refinementPrompt, ...(ex.antigravitySteps || [])].join(' ');
    const cited = [...text.matchAll(/@([\w.-]+\.[a-z]{2,4})\b/gi)].map((m) => m[1]);
    assert.ok(cited.length >= 1, `Ejercicio ${ex.id}: debe citar al menos un archivo con @`);
    for (const name of cited) {
      // Se admite citar un archivo que el mismo ejercicio pide crear antes (aparece sin @).
      const createdInExercise = new RegExp('(^|[^@\\w])' + name.replace(/\./g, '\\.')).test(text);
      assert.ok(names.has(name) || createdInExercise, `Ejercicio ${ex.id}: @${name} no existe en el kit`);
    }
  }
});

test('2. Ningún kit trae la respuesta del Caso Testigo ya calculada', () => {
  const leaks = [
    /_Esperad[oa]/, /esperad[oa]COP/i, /casoTestigo/i, /Caso Testigo/i, /resultado_esperado/, /ganador_esperado/,
    /puntaje_ganador/, /requiereFirmaHumana/, /pedidosRetenidosEsperados/, /ALERTA_CRITICA/, /SIN_FECHA_ALERTA/,
    /valorPonderadoCOP/, /npsEsperado/, /promedioEsperado/, /\(Testigo\)/, /punto_equilibrio_esperado/,
    /Peso_Facturable_kg/, /Costo_Flete_COP/, /Neto_Pagar_COP/, /Venta_Neta_Efectiva/, /Estado_Stock/,
    /Saldo_Final_Banco/, /Promedio_Final/, /Dias_Esperados_PERT/, /Aporte_WACC/, /flujoCajaNetoDisponible/
  ];
  for (let id = 1; id <= 26; id++) {
    for (const f of files(id)) {
      for (const rx of leaks) {
        assert.ok(!rx.test(f.content), `Kit ${id} · ${f.filename} no debe contener ${rx}`);
      }
    }
  }
});

test('3a. Casos Testigo de los niveles 1 y 2 se derivan del kit', () => {
  // Ej1: los 8 documentos se reparten en 4 categorías.
  assert.equal(files(1).length, expected(1));

  // Ej2: suma de los 4 pedidos del chat y 2 pedidos sin dirección.
  const chat = file(2, 'notas_crudas_pedidos.txt').trim().split('\n').slice(1);
  const montos = chat.map((l) => Number(l.match(/\$(\d+)/)[1]));
  assert.equal(sum(montos), expected(2));
  const sinDireccion = chat.filter((l) => !/(Cra|Calle)\s/.test(l));
  assert.equal(sinDireccion.length, 2, 'Ej2: María y Jorge no tienen dirección');

  // Ej3: punto de equilibrio con el CSV.
  const c3 = csv(3, 'costos_base_negocio.csv');
  const fijos = sum(c3.filter((r) => r.Tipo === 'Costo_Fijo_Mensual').map((r) => Number(r.Valor_COP)));
  const cv = Number(c3.find((r) => r.Tipo === 'Costo_Variable_Unitario').Valor_COP);
  const pv = Number(c3.find((r) => r.Tipo === 'Precio_Venta').Valor_COP);
  assert.equal(fijos / (pv - cv), expected(3));

  // Ej4: fases contractuales distintas en el JSON.
  const fases = new Set(json(4, 'parametros_propuesta_roi.json').entregables.map((e) => e.fase));
  assert.equal(fases.size, expected(4));
  assert.ok(!/ROI al inicio/.test(file(4, 'GEMINI.md')), 'Ej4: GEMINI.md no debe exigir un ROI que el ejercicio prohíbe inventar');

  // Ej5: deduplicación por teléfono o correo normalizado (incluye duplicados aproximados).
  const c5 = csv(5, 'contactos_duplicados.csv');
  const tel = (t) => t.replace(/\D/g, '');
  const mail = (m) => { const [u, d] = m.trim().toLowerCase().split('@'); return u.replace(/\./g, '') + '@' + d; };
  const parent = c5.map((_, i) => i);
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  c5.forEach((a, i) => c5.forEach((b, j) => {
    if (j > i && (tel(a.Telefono) === tel(b.Telefono) || mail(a.Correo) === mail(b.Correo))) parent[find(j)] = find(i);
  }));
  assert.equal(new Set(c5.map((_, i) => find(i))).size, expected(5));
  const exactos = new Set(c5.map((r) => r.Correo.trim().toLowerCase())).size;
  assert.ok(exactos > expected(5), 'Ej5: debe haber al menos un duplicado que no se detecta solo con el correo');

  // Ej6: margen de SER-01 y presencia de los 3 colores del semáforo.
  const c6 = csv(6, 'catalogo_productos.csv');
  const margen = (r) => ((Number(r.Precio_Lista_Neto_COP) - Number(r.Costo_Interno_COP)) / Number(r.Precio_Lista_Neto_COP)) * 100;
  assert.equal(margen(c6.find((r) => r.SKU === 'SER-01')), expected(6));
  const colores = new Set(c6.map((r) => (margen(r) >= 35 ? 'verde' : margen(r) >= 25 ? 'ambar' : 'rojo')));
  assert.deepEqual([...colores].sort(), ['ambar', 'rojo', 'verde']);

  // Ej7: mayor puntaje ponderado de la matriz.
  const m7 = json(7, 'matriz_proveedores.json');
  const score = (p) => p.notaPrecio * m7.criterios.precio + p.notaCalidad * m7.criterios.calidad + p.notaRapidez * m7.criterios.rapidez;
  assert.equal(Math.round(Math.max(...m7.proveedores.map(score)) * 100) / 100, expected(7));

  // Ej8: ROP de CAF-500 con promedio y máximo del historial.
  const h8 = json(8, 'historial_salidas_almacen.json').salidasDiarias['CAF-500'];
  const lt = Number(csv(8, 'inventario_bodega.csv').find((r) => r.SKU === 'CAF-500').Tiempo_Entrega_Dias);
  const prom = sum(h8) / h8.length;
  assert.equal(prom * lt + (Math.max(...h8) - prom) * lt, expected(8));

  // Ej9: NPS desde las notas y una fila cuyo motivo contradice el ticket.
  const n9 = csv(9, 'encuestas_trimestre.csv').map((r) => Number(r.Nota_0_a_10));
  assert.equal((n9.filter((n) => n >= 9).length - n9.filter((n) => n <= 6).length) / n9.length * 100, expected(9));
  assert.ok(/Faltaron 2 cajas/.test(file(9, 'transcripciones_pqrs_soporte.log')));

  // Ej10: W44 cuadra y W45 debe bloquearse.
  const c10 = csv(10, 'auxiliar_bancos_y_cartera_w44.csv');
  const sem = json(10, 'bitacora_cierres.json').semanasPorCerrar;
  const total = (s) => sum(c10.filter((r) => r.Semana === s).map((r) => Number(r.Monto_COP)));
  assert.equal(total('2026-W44'), expected(10));
  assert.equal(sem.find((s) => s.semana === '2026-W44').ventasRegistradasCOP, total('2026-W44'));
  assert.notEqual(sem.find((s) => s.semana === '2026-W45').ventasRegistradasCOP, total('2026-W45'));
});

test('3b. Casos Testigo de los niveles 3 y 4 se derivan del kit', () => {
  // Ej11: embudo ponderado sin oportunidades cerradas; 3 tablas en el SQL.
  const o11 = json(11, 'cartera_crm_relacional.json').oportunidades.filter((o) => !/Cerrado/.test(o.etapa));
  assert.equal(sum(o11.map((o) => o.valorCOP * o.probabilidadPct / 100)), expected(11));
  assert.equal((file(11, 'schema_crm_relacional.sql').match(/CREATE TABLE/g) || []).length, 3);

  // Ej12: grupo fraccionado (empleado + fecha + NIT) con 2+ recibos y suma > $200.000.
  const g12 = {};
  csv(12, 'relacion_gastos_viaticos.csv').forEach((r) => {
    const k = r.Empleado + '|' + r.Fecha + '|' + r.NIT_Proveedor;
    (g12[k] = g12[k] || []).push(Number(r.Valor_COP));
  });
  const alertas = Object.values(g12).filter((v) => v.length >= 2 && sum(v) > 200000);
  assert.equal(alertas.length, 1);
  assert.equal(sum(alertas[0]), expected(12));

  // Ej13: saldo de febrero cobrando a 60 días; serie de 12 meses.
  const c13 = csv(13, 'flujo_tesoreria_base.csv');
  assert.equal(c13.length, 12);
  const j13 = json(13, 'calendario_cartera_60dias.json');
  const lag = j13.plazoCarteraActualDias / 30;
  let saldo = j13.saldoInicialEneroCOP;
  for (let m = 0; m < 2; m++) {
    const cobro = m - lag >= 0 ? Number(c13[m - lag].Ventas_Facturadas_COP) : 0;
    saldo += cobro - Number(c13[m].Pagos_Contado_Obligatorios_COP);
  }
  assert.equal(saldo, expected(13));

  // Ej14: promedio del coordinador; cada escenario declara su nivel de Bloom.
  const r14 = csv(14, 'resultados_equipo_piloto.csv').find((r) => r.Participante === 'Coordinador_01');
  assert.equal(sum([1, 2, 3, 4].map((i) => Number(r14['Escenario_' + i]))) / 4, expected(14));
  assert.ok(json(14, 'escenarios_competencias.json').escenarios.every((e) => e.nivelBloom));

  // Ej15: abono neto de V-101 y un lote que agrupa 2 ventas del mismo día.
  const j15 = json(15, 'reglas_pasarela_pagos.json');
  const v15 = csv(15, 'conciliacion_ventas_banco.csv');
  const neto = (r) => Number(r.Monto_Bruto_COP) * (1 - j15.tasasComision[r.Medio_Pago]);
  assert.equal(neto(v15.find((r) => r.ID_Venta === 'V-101')), expected(15));
  const lote = sum(v15.filter((r) => r.Fecha_Venta === '2026-10-20').map(neto));
  assert.ok(csv(15, 'extracto_bancario_octubre.csv').some((m) => Number(m.Credito_Abono_COP) === lote));

  // Ej16: exceso de aforo del Salón B contando solo confirmados.
  const ins = csv(16, 'asistentes_confirmados.csv').filter((r) => r.Estado === 'Confirmado' && r.ID_Salon === 'SALON-B');
  const cap = json(16, 'esquema_evento.json').salones.find((s) => s.idSalon === 'SALON-B').capacidadSillas;
  assert.equal(ins.length - cap, expected(16));

  // Ej17: pedidos con mora estrictamente mayor a 15 días (incluye el límite exacto de 15).
  const p17 = json(17, 'mcp_politicas_seguridad.json');
  assert.equal(p17.lotePedidosBodega.filter((p) => p.diasMora > p17.umbralMoraDias).length, expected(17));
  assert.ok(p17.lotePedidosBodega.some((p) => p.diasMora === p17.umbralMoraDias));

  // Ej18: horas demandadas = capacidad legal, y los turnos de mando caben en las personas de mando.
  const d18 = json(18, 'demanda_turnos_semanal.json');
  const horas = d18.diasOperacion.length * sum(d18.franjas.map((f) => f.duracionHoras * f.personasRequeridas));
  const eq = csv(18, 'plantilla_turnos_equipo.csv');
  assert.equal(horas, expected(18));
  assert.equal(sum(eq.map((r) => Number(r.Max_Horas_Ordinarias_Semana))), horas);
  const mando = eq.filter((r) => /Supervisora|Especialista/.test(r.Rol)).length * 42;
  assert.ok(mando >= d18.diasOperacion.length * d18.franjas.length * 7, 'Ej18: debe ser factible poner mando en cada turno');
  const norma = file(18, 'normativa_jornada_laboral.md');
  assert.ok(norma.includes('06:00-13:00') && norma.includes('20:00-03:00'), 'Ej18: las franjas de la norma coinciden con la demanda');

  // Ej19: PERT de ET-01 y grafo con dependencias.
  const e19 = csv(19, 'estimaciones_pert_proyecto.csv').find((r) => r.ID_Etapa === 'ET-01');
  assert.equal((Number(e19.Dias_Optimista) + 4 * Number(e19.Dias_Mas_Probable) + Number(e19.Dias_Pesimista)) / 6, expected(19));
  assert.ok(json(19, 'grafo_ruta_critica.json').dependencias.length === 4);

  // Ej20: flujo neto solo con pedidos cobrados; ROP de MOL-01 coherente con la fórmula del ej8.
  const s20 = json(20, 'sistema_pyme_semilla.json');
  const util = sum(s20.pedidos.filter((p) => p.estadoCobro === 'Cobrado').map((p) => p.totalCOP)) - sum(s20.egresos.map((e) => e.valorCOP));
  assert.equal(util * (1 - s20.reservaImpositivaPct / 100), expected(20));
  const mol = csv(20, 'catalogo_y_bodega_pyme.csv').find((r) => r.SKU === 'MOL-01');
  assert.equal(Number(mol.Venta_Diaria_Maxima) * Number(mol.Tiempo_Entrega_Dias), 14);
});

test('3c. Casos Testigo del bloque 21 a 26 se derivan del kit', () => {
  const t21 = json(21, 'tarifas_retencion_vigentes.json');
  const base21 = Number(csv(21, 'orden_compra_cliente.csv').find((r) => r.ID_Orden === 'OC-701').Subtotal_Base_COP);
  assert.equal(base21 * (1 + t21.ivaGeneralPct / 100 - t21.retefuenteComprasPct / 100), expected(21));

  const m22 = json(22, 'metas_vendedores_trimestre.json');
  const v22 = csv(22, 'ventas_equipo_comercial.csv').find((r) => r.ID_Vendedor === 'VEN-01');
  const neta = Number(v22.Ventas_Brutas_COP) - Number(v22.Devoluciones_Nota_Credito_COP);
  const meta = m22.metaIndividualCOP;
  assert.equal(Math.min(neta, meta) * m22.tasaBasePct / 100 + Math.max(0, neta - meta) * m22.tasaAceleradorExcedentePct / 100, expected(22));
  assert.ok(!/\d{1,3}(\.\d{3})+/.test(file(22, 'borrador_politica_comisiones.md')), 'Ej22: el borrador no debe traer cifras resueltas');

  const g23 = csv(23, 'dispersion_nomina_lote.csv');
  assert.ok('ID_Giro' in g23[0]);
  const vistos = new Set();
  const autorizados = g23.filter((r) => { const k = r.Cuenta_Bancaria + r.Periodo; if (vistos.has(k)) return false; vistos.add(k); return true; });
  assert.equal(sum(autorizados.map((r) => Number(r.Valor_Neto_COP))), expected(23));

  const t24 = json(24, 'tarifario_transporte_carga.json');
  const g24 = csv(24, 'despachos_logistica_regional.csv');
  assert.ok(g24.length >= 6);
  const flete = (r) => Math.max(Number(r.Peso_Bascula_kg), (r.Largo_cm * r.Ancho_cm * r.Alto_cm) / t24.factorVolumetricoDivisor) * t24.tarifaPorKgFacturableCOP;
  assert.equal(flete(g24.find((r) => r.Guia_No === 'GUIA-501')), expected(24));

  const wacc = sum(csv(25, 'estructura_costo_capital_wacc.csv').map((r) => Number(r.Participacion_Pct) * Number(r.Costo_Efectivo_Anual_Pct) / 100));
  const u25 = json(25, 'unidades_negocio_corporativo.json');
  const un1 = u25.unidades.find((u) => u.id === 'UN-01');
  assert.equal(un1.nopatCOP - un1.capitalInvertidoCOP * wacc / 100, expected(25));
  assert.ok(u25.escenariosSensibilidad.length >= 2);

  const c26 = json(26, 'contratos_estatales_activos.json').contratos;
  const a26 = csv(26, 'anexo_garantias_exigidas.csv');
  const exigido = (c) => sum(a26.map((a) => c.valorContratoCOP * Number(a.Porcentaje_Exigido_Pct) / 100));
  assert.equal(exigido(c26.find((c) => c.numero === 'CTO-2026-088')), expected(26));
  const incumple = c26.filter((c) => c.polizasPresentadas.some((p) => {
    const a = a26.find((x) => x.Codigo_Amparo === p.amparo);
    return p.valorAseguradoCOP < c.valorContratoCOP * Number(a.Porcentaje_Exigido_Pct) / 100;
  }));
  assert.deepEqual(incumple.map((c) => c.numero), ['CTO-2026-091'], 'Ej26: debe existir un contrato para rechazar');
});

test('4. Los ejercicios solo usan comandos de Antigravity confirmados', () => {
  const unverified = ['/boost', '/compact', '/learn', '/plan', 'Ctrl+E'];
  const corpus = exercises.map((ex) => JSON.stringify(ex)).join('\n') + JSON.stringify(toolsMap.ANTIGRAVITY_TOOLS);
  const kitCorpus = Array.from({ length: 26 }, (_, i) => files(i + 1).map((f) => f.content).join('\n')).join('\n');
  for (const cmd of unverified) {
    assert.ok(!corpus.includes(cmd), `No debe enseñarse ${cmd}: no aparece en la documentación de Antigravity`);
    assert.ok(!kitCorpus.includes(cmd), `Los kits no deben mencionar ${cmd}`);
  }
  for (const cmd of ['/grill-me', '/goal', '/browser', '/schedule', 'Planning', 'Ctrl+I', 'GEMINI.md', 'SKILL.md', 'MCP']) {
    assert.ok(corpus.includes(cmd), `La ruta debe practicar ${cmd}`);
  }
});

test('5. Duraciones realistas y checklist sin 4 estados donde no hay entradas', () => {
  for (const ex of exercises) {
    assert.ok(agTabs.getExerciseMinutes(ex) >= 10, `Ejercicio ${ex.id}: duración realista (>= 10 min)`);
  }
  const ex1 = byId(1);
  assert.equal(ex1.hasUserInputs, false);
  assert.ok(!agTabs.getArtifactChecklist(ex1).some((t) => /4 estados/.test(t)));
  assert.ok(agTabs.getArtifactChecklist(byId(6)).some((t) => /4 estados/.test(t)));
});

test('6. La ruta se ordena por nivel y Anterior/Siguiente respeta la lista visible', () => {
  const ordered = agTabs.sortExercisesForRoute(exercises);
  assert.equal(ordered.length, 26);
  for (let i = 1; i < ordered.length; i++) {
    const a = ordered[i - 1], b = ordered[i];
    assert.ok(a.level < b.level || (a.level === b.level && a.id < b.id), `Orden roto entre ${a.id} y ${b.id}`);
  }
  assert.equal(agTabs.getAdjacentExerciseId(ordered, 5, 1), 21, 'Tras el 5 (nivel 1) sigue el 21 (nivel 1)');
  assert.equal(agTabs.getAdjacentExerciseId(ordered, ordered[0].id, -1), null);
  assert.equal(agTabs.getAdjacentExerciseId(ordered, ordered[25].id, 1), null);
  const nivel2 = ordered.filter((e) => e.level === 2);
  assert.equal(agTabs.getAdjacentExerciseId(nivel2, 10, 1), 22, 'Con filtro de nivel 2, tras el 10 sigue el 22');
  assert.equal(agTabs.getAdjacentExerciseId(nivel2, 999, 1), null);
});
