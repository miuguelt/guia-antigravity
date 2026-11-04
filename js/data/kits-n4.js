/* Catálogo de Kits de Archivos Semilla Reales — Nivel 4 (Ejercicios 16 al 20) */
/* Nota: Todos los documentos y registros de este módulo son materiales de práctica creados para aprender y no contienen datos reales. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* Genera el lote de inscripciones del ejercicio 16 de forma determinista (sin azar). */
  function buildAsistentesCsv() {
    const nombres = ['Valeria', 'Santiago', 'Paula', 'Andrés', 'Camila', 'Mateo', 'Laura', 'Julián', 'Sofía', 'Diego', 'Daniela', 'Felipe'];
    const apellidos = ['Montoya', 'Mejía', 'Castellanos', 'Villamizar', 'Rueda', 'Pinzón', 'Ardila', 'Serrano', 'Gélvez', 'Quintero'];
    const empresas = ['TecnoAndes', 'AgroSantander', 'Clínica Oriental', 'Consultores Guanentá', 'Café Vélez', 'Logística del Fonce'];
    const lotes = [
      { salon: 'SALON-A', confirmados: 180, cancelados: 3 },
      { salon: 'SALON-B', confirmados: 120, cancelados: 4 },
      { salon: 'SALON-C', confirmados: 52, cancelados: 2 }
    ];
    const rows = ['ID_Inscripcion,Asistente,Empresa,ID_Salon,Tipo_Entrada,Valor_Pagado_COP,Estado'];
    let n = 0;
    lotes.forEach(function (lote) {
      for (let i = 0; i < lote.confirmados + lote.cancelados; i++) {
        n++;
        const vip = n % 5 === 0;
        const estado = i >= lote.confirmados ? 'Cancelado' : 'Confirmado';
        rows.push([
          'INS-' + String(n).padStart(3, '0'),
          nombres[n % nombres.length] + ' ' + apellidos[(n * 3) % apellidos.length],
          empresas[(n * 7) % empresas.length],
          lote.salon,
          vip ? 'VIP' : 'General',
          estado === 'Cancelado' ? 0 : (vip ? 300000 : 150000),
          estado
        ].join(','));
      }
    });
    return rows.join('\n') + '\n';
  }

  const KITS_N4 = {
    16: {
      zipName: 'kit-ej16-orquestacion-multiagente-contratos.zip',
      folderName: 'ejercicio-16-orquestacion-multiagente',
      summary: 'Contrato JSON compartido entre agentes (.json), esquema SQL de salones (.sql) y registro de inscritos (.csv).',
      files: [
        {
          filename: 'esquema_evento.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Contrato de datos compartido entre Módulo A (Registro), Módulo B (Salones) y Módulo C (Finanzas)',
          content: JSON.stringify({
            evento: 'Cumbre Regional de Innovación y Agentes IA 2026',
            salones: [
              { idSalon: 'SALON-A', nombre: 'Auditorio Principal Guantiva', capacidadSillas: 200 },
              { idSalon: 'SALON-B', nombre: 'Sala Innovación Tecnológica', capacidadSillas: 80 },
              { idSalon: 'SALON-C', nombre: 'Aula Taller Experimental', capacidadSillas: 60 }
            ],
            reglaAforo: 'Solo cuentan las inscripciones con Estado = Confirmado',
            integracion: {
              archivoFinal: 'sistema_eventos_integrado.html',
              modulos: [
                { archivo: 'modulo_registro.js', exporta: 'window.Eventos.registro.cargarInscritos(csvTexto)', devuelve: 'arreglo de inscripciones confirmadas' },
                { archivo: 'modulo_salones.js', exporta: 'window.Eventos.salones.calcularAforo(inscritos, salones)', devuelve: 'arreglo { idSalon, inscritos, capacidad, exceso }' },
                { archivo: 'modulo_finanzas.js', exporta: 'window.Eventos.finanzas.resumen(inscritos, finanzas)', devuelve: '{ recaudoCOP, costoFijoCOP, utilidadCOP }' }
              ],
              reglaParalelo: 'Ningún módulo lee ni modifica el archivo de otro; solo se comunican con estas firmas'
            },
            finanzas: {
              tarifaGeneralCOP: 150000,
              tarifaVipCOP: 300000,
              costoFijoEventoCOP: 28000000
            }
          }, null, 2)
        },
        {
          filename: 'contrato_interfaz_modulos.sql', ext: 'sql', mime: 'application/sql;charset=utf-8',
          role: 'Definición de tablas y vista detectora de sobrecupo para evitar colisiones entre agentes',
          content: '-- Contrato SQL para Orquestación Multi-Agente sin Colisiones\nCREATE TABLE salones (\n  id_salon VARCHAR(16) PRIMARY KEY,\n  nombre VARCHAR(100) NOT NULL,\n  capacidad_sillas INT NOT NULL,\n  inscritos_actuales INT NOT NULL\n);\n\nCREATE VIEW v_alerta_sobrecupo AS\nSELECT id_salon, nombre, capacidad_sillas, inscritos_actuales,\n       (inscritos_actuales - capacidad_sillas) AS exceso_aforo\nFROM salones\nWHERE inscritos_actuales > capacidad_sillas;\n'
        },
        {
          filename: 'asistentes_confirmados.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Lote completo de 361 inscripciones por salón, con cancelaciones, para validar aforo y recaudo',
          content: buildAsistentesCsv()
        }
      ]
    },
    17: {
      zipName: 'kit-ej17-gobernanza-mcp-seguridad.zip',
      folderName: 'ejercicio-17-gobernanza-mcp',
      summary: 'Políticas y lote de pedidos MCP (.json), configuración de permisos de servidores (.yaml) y bitácora de auditoría (.log).',
      files: [
        {
          filename: 'mcp_politicas_seguridad.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Regla de retención y lote de 5 pedidos de bodega con sus días de mora',
          content: JSON.stringify({
            reglaHumanInTheLoop: 'Retener pedidos cuyos clientes superen 15 días de mora en cartera.',
            umbralMoraDias: 15,
            lotePedidosBodega: [
              { pedido: 'PED-901', cliente: 'Comercial del Valle S.A.S.', montoCOP: 4800000, diasMora: 22 },
              { pedido: 'PED-902', cliente: 'Distribuidora Andina Ltda.', montoCOP: 1950000, diasMora: 0 },
              { pedido: 'PED-903', cliente: 'Insumos del Caribe S.A.S.', montoCOP: 6200000, diasMora: 30 },
              { pedido: 'PED-904', cliente: 'Logística Central S.A.', montoCOP: 1100000, diasMora: 15 },
              { pedido: 'PED-905', cliente: 'Grupo Santandereano S.A.S.', montoCOP: 3400000, diasMora: 19 }
            ]
          }, null, 2)
        },
        {
          filename: 'mcp_servers_config.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Política interna de permisos por servidor MCP (no es el archivo de configuración de Antigravity)',
          content: 'mcp_governance_version: "1.0"\nservers:\n  cartera_erp:\n    mode: "read_only"\n    allowed_tools: ["get_customer_balance", "list_overdue_invoices"]\n  bodega_wms:\n    mode: "controlled_write"\n    human_in_the_loop_condition: "dias_mora > 15"\n  notificaciones_externas:\n    mode: "human_in_the_loop"\n    allowed_tools: ["send_customer_email"]\n'
        },
        {
          filename: 'bitacora_auditoria_mcp.log', ext: 'log', mime: 'text/plain;charset=utf-8',
          role: 'Bitácora de llamadas MCP de la víspera para auditar contra la política',
          content: '2026-10-24T08:00:12-05:00 [MCP:cartera_erp] [TOOL:list_overdue_invoices] OK\n2026-10-24T08:01:40-05:00 [MCP:cartera_erp] [TOOL:update_credit_limit] cliente=Insumos del Caribe S.A.S. OK\n2026-10-24T08:03:05-05:00 [MCP:bodega_wms] [TOOL:release_dispatch] pedido=PED-881 diasMora=27 aprobacion=ninguna OK\n2026-10-24T08:04:22-05:00 [MCP:bodega_wms] [TOOL:release_dispatch] pedido=PED-882 diasMora=3 aprobacion=ninguna OK\n2026-10-24T08:05:10-05:00 [MCP:notificaciones_externas] [TOOL:send_customer_email] destinatario=Comercial del Valle S.A.S. aprobacion=coordinadora.cartera OK\n'
        }
      ]
    },
    18: {
      zipName: 'kit-ej18-optimizador-turnos-42h.zip',
      folderName: 'ejercicio-18-optimizador-turnos',
      summary: 'Plantilla de 5 colaboradores con límite legal de 42h (.csv), normativa Ley 2101 (.md) y demanda de cobertura (.json).',
      files: [
        {
          filename: 'plantilla_turnos_equipo.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Plantilla de 5 colaboradores con rol, tope semanal y tarifa por hora',
          content: 'ID_Colaborador,Nombre,Rol,Max_Horas_Ordinarias_Semana,Tarifa_Hora_Ordinaria_COP,Restriccion_Dura\nCOL-01,Andrea Castellanos,Supervisora,42,26200,No_Noche_Seguido_Manana\nCOL-02,Camilo Duarte,Supervisora,42,26200,No_Noche_Seguido_Manana\nCOL-03,Diana Patiño,Especialista,42,20000,No_Noche_Seguido_Manana\nCOL-04,Esteban Mora,Auxiliar,42,16000,No_Noche_Seguido_Manana\nCOL-05,Fernanda Ríos,Auxiliar,42,16000,No_Noche_Seguido_Manana\n'
        },
        {
          filename: 'normativa_jornada_laboral.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Reglas duras y blandas para el programador de turnos sin conflictos legales (Ley 2101 de 2021)',
          content: '# Reglas de Programación de Turnos (Ley 2101 — Jornada de 42 Horas)\n\n## 1. Restricciones Duras (Innegociables)\n- **Tope Semanal Ordinario (Vigente desde julio de 2026):** Máximo **42 horas semanales** por colaborador.\n- **Jornada diaria:** Cada colaborador trabaja como máximo 1 turno de 7 horas por día, de lunes a sábado (6 × 7 h = 42 h).\n- **Descanso Interjornada:** Prohibido programar turno **Mañana (06:00-13:00)** el día inmediatamente posterior a un turno **Noche (20:00-03:00)**.\n- **Cobertura de Mando:** Todo turno activo requiere al menos una persona con rol `Supervisora` o `Especialista`.\n\n## 2. Restricciones Blandas (Preferencias)\n- Rotar las franjas para que nadie haga más de 2 noches seguidas.\n- Repartir los turnos de Tarde de forma equilibrada entre auxiliares.\n'
        },
        {
          filename: 'demanda_turnos_semanal.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Personas requeridas por franja de lunes a sábado',
          content: JSON.stringify({
            semana: '2026-W46',
            diasOperacion: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            franjas: [
              { codigo: 'MANANA', horario: '06:00 a 13:00', duracionHoras: 7, personasRequeridas: 2 },
              { codigo: 'TARDE', horario: '13:00 a 20:00', duracionHoras: 7, personasRequeridas: 2 },
              { codigo: 'NOCHE', horario: '20:00 a 03:00', duracionHoras: 7, personasRequeridas: 1 }
            ]
          }, null, 2)
        }
      ]
    },
    19: {
      zipName: 'kit-ej19-montecarlo-pert-riesgos.zip',
      folderName: 'ejercicio-19-simulador-montecarlo-pert',
      summary: 'Estimaciones de 3 puntos PERT (.csv), grafo de dependencias (.json) y configuración Monte Carlo (.yaml).',
      files: [
        {
          filename: 'estimaciones_pert_proyecto.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Estimación de 3 puntos y costo diario de cada etapa',
          content: 'ID_Etapa,Etapa,Dias_Optimista,Dias_Mas_Probable,Dias_Pesimista,Costo_Base_COP,Costo_Por_Dia_Adicional_COP\nET-01,Permisos y Licencias Ambientales,5,8,20,4500000,150000\nET-02,Adecuacion Fisica y Redes,6,9,18,12000000,600000\nET-03,Instalacion Equipos Tostion,4,6,14,18500000,900000\nET-04,Pruebas e Integracion de Software,3,5,13,6000000,250000\n'
        },
        {
          filename: 'grafo_ruta_critica.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Secuencia de dependencias y penalidades por día de atraso',
          content: JSON.stringify({
            proyecto: 'Apertura Nueva Planta Tostadora Vélez',
            formulaPert: '(Optimista + 4 * Mas_Probable + Pesimista) / 6',
            dependencias: [
              { etapa: 'ET-01', dependeDe: [] },
              { etapa: 'ET-02', dependeDe: ['ET-01'] },
              { etapa: 'ET-03', dependeDe: ['ET-01'] },
              { etapa: 'ET-04', dependeDe: ['ET-02', 'ET-03'] }
            ],
            plazoCompromisoDias: 30,
            penalidadPorDiaAtrasoCOP: 350000
          }, null, 2)
        },
        {
          filename: 'parametros_montecarlo.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Configuración de percentiles de confianza P50, P85 y P90',
          content: 'simulacion:\n  iteraciones: 5000\n  distribucion: "PERT / Triangular Asimétrica"\n  percentiles_reporte:\n    compromiso_gerencial: "P85 (85% de probabilidad de cumplir a tiempo)"\n    reserva_contingencia: "P90 - P50"\n'
        }
      ]
    },
    20: {
      zipName: 'kit-ej20-suite-integral-pyme.zip',
      folderName: 'ejercicio-20-suite-empresarial-pyme',
      summary: 'Estado maestro de la Pyme (.json), catálogo e inventario (.csv), esquema ERP (.sql) y reglas del Copiloto Auditor (.md).',
      files: [
        {
          filename: 'sistema_pyme_semilla.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Movimientos de tesorería y pedidos del mes, sin totales calculados',
          content: JSON.stringify({
            empresa: 'Soluciones Integrales Andinas S.A.S.',
            nit: '901.482.391-4',
            sede: 'Vélez, Santander, Colombia',
            periodo: '2026-10',
            reservaImpositivaPct: 15,
            pedidos: [
              { id: 'PV-301', cliente: 'Supermercados Oriente', sku: 'CAF-500', cantidad: 90, totalCOP: 4500000, estadoCobro: 'Cobrado' },
              { id: 'PV-302', cliente: 'Hoteles del Fonce S.A.S.', sku: 'SER-01', cantidad: 3, totalCOP: 3200000, estadoCobro: 'Cobrado' },
              { id: 'PV-303', cliente: 'Clínica Metropolitana', sku: 'CAF-500', cantidad: 40, totalCOP: 2000000, estadoCobro: 'Cobrado' },
              { id: 'PV-304', cliente: 'Corporación Educativa Vélez', sku: 'MOL-01', cantidad: 6, totalCOP: 1500000, estadoCobro: 'Cobrado' },
              { id: 'PV-305', cliente: 'Cafetería Central', sku: 'CAF-500', cantidad: 16, totalCOP: 800000, estadoCobro: 'Cobrado' },
              { id: 'PV-306', cliente: 'Restaurante La Casona', sku: 'SER-01', cantidad: 2, totalCOP: 2500000, estadoCobro: 'Por cobrar' }
            ],
            egresos: [
              { concepto: 'Nómina y seguridad social', valorCOP: 4200000 },
              { concepto: 'Compra de café pergamino', valorCOP: 2100000 },
              { concepto: 'Arriendo de bodega', valorCOP: 1000000 },
              { concepto: 'Servicios públicos e internet', valorCOP: 500000 }
            ]
          }, null, 2)
        },
        {
          filename: 'catalogo_y_bodega_pyme.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Módulo de inventario y precios conectado con Ventas y Tesorería',
          content: 'SKU,Producto,Tipo,Stock_Actual,Venta_Diaria_Promedio,Venta_Diaria_Maxima,Tiempo_Entrega_Dias,Costo_Unitario_COP,Precio_Venta_COP\nCAF-500,Cafe Especial Origen Santander 500g,Producto,68,10,14,5,28000,50000\nSER-01,Consultoria Auditoria Procesos,Servicio,,,,,650000,1000000\nMOL-01,Molino Acero Inoxidable,Producto,15,1,2,7,145000,240000\n'
        },
        {
          filename: 'esquema_erp_pyme.sql', ext: 'sql', mime: 'application/sql;charset=utf-8',
          role: 'Modelo de datos integrado para conectar Ventas, Bodega y Flujo de Caja',
          content: '-- Esquema ERP Simplificado — Proyecto Cumbre Antigravity\nCREATE TABLE productos (\n  sku VARCHAR(16) PRIMARY KEY,\n  nombre VARCHAR(120) NOT NULL,\n  tipo VARCHAR(10) NOT NULL CHECK (tipo IN (\'Producto\', \'Servicio\')),\n  stock_actual INT,\n  costo_unitario_cop NUMERIC(14,2) NOT NULL,\n  precio_venta_cop NUMERIC(14,2) NOT NULL\n);\n\nCREATE TABLE pedidos (\n  id_pedido VARCHAR(16) PRIMARY KEY,\n  sku VARCHAR(16) NOT NULL REFERENCES productos(sku),\n  cliente VARCHAR(120) NOT NULL,\n  cantidad INT NOT NULL CHECK (cantidad > 0),\n  total_cop NUMERIC(14,2) NOT NULL,\n  estado_cobro VARCHAR(12) NOT NULL CHECK (estado_cobro IN (\'Cobrado\', \'Por cobrar\'))\n);\n\nCREATE TABLE egresos (\n  id_egreso SERIAL PRIMARY KEY,\n  periodo VARCHAR(7) NOT NULL,\n  concepto VARCHAR(120) NOT NULL,\n  valor_cop NUMERIC(14,2) NOT NULL CHECK (valor_cop >= 0)\n);\n'
        },
        {
          filename: 'reglas_copiloto_auditor.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Fórmulas e invariantes que debe auditar el Copiloto de la Suite Pyme',
          content: '# Reglas del Copiloto Auditor — Suite Operativa Pyme\n\n1. **Utilidad Operativa de Caja:** suma de pedidos con estado `Cobrado` menos la suma de egresos del periodo. Los pedidos `Por cobrar` se muestran como cartera, no como caja.\n2. **Reserva Impositiva y de Seguridad:** `reservaImpositivaPct` sobre la utilidad operativa de caja.\n3. **Flujo de Caja Neto Disponible:** utilidad operativa de caja menos la reserva.\n4. **Alerta de Inventario:** solo para `Tipo = Producto`. `ROP = (Venta_Diaria_Promedio * Tiempo_Entrega_Dias) + (Venta_Diaria_Maxima - Venta_Diaria_Promedio) * Tiempo_Entrega_Dias`. Si `Stock_Actual <= ROP`, emitir orden de compra.\n5. **Decisiones de la semana:** el Copiloto propone las 3 decisiones con mayor impacto en caja y cita el dato que respalda cada una.\n'
        }
      ]
    }
  };

  return { KITS_N4: KITS_N4 };
});
