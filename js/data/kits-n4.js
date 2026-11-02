/* Catálogo de Kits de Archivos Semilla Reales — Nivel 4 (Ejercicios 16 al 20) */
/* Nota: Todos los documentos y registros de este módulo son materiales de práctica creados para aprender y no contienen datos reales. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.AGPortal = root.AGPortal || {}; Object.assign(root.AGPortal, factory()); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

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
              { idSalon: 'SALON-A', nombre: 'Auditorio Principal Guantiva', capacidadSillas: 200, inscritosActuales: 180, sobrecupo: 0 },
              { idSalon: 'SALON-B', nombre: 'Sala Innovación Tecnológica', capacidadSillas: 80, inscritosActuales: 120, sobrecupo: 40 },
              { idSalon: 'SALON-C', nombre: 'Aula Taller Experimental', capacidadSillas: 60, inscritosActuales: 52, sobrecupo: 0 }
            ],
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
          role: 'Lote de inscripciones por salón para validar aforo y recaudo',
          content: 'ID_Inscripcion,Asistente,Empresa,ID_Salon,Tipo_Entrada,Valor_Pagado_COP,Estado\nINS-001,Valeria Montoya,TecnoAndes,SALON-B,VIP,300000,Confirmado\nINS-002,Santiago Mejía,AgroSantander,SALON-B,General,150000,Confirmado\nINS-003,Paula Castellanos,Clínica Oriental,SALON-A,General,150000,Confirmado\nINS-004,Andrés Villamizar,Consultores S.A.S.,SALON-B,VIP,300000,Confirmado\n'
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
          role: 'Lote de 5 pedidos de bodega donde 3 superan los 15 días de mora y exigen firma humana',
          content: JSON.stringify({
            reglaHumanInTheLoop: 'Retener pedidos cuyos clientes superen 15 días de mora en cartera.',
            umbralMoraDias: 15,
            lotePedidosBodega: [
              { pedido: 'PED-901', cliente: 'Comercial del Valle S.A.S.', montoCOP: 4800000, diasMora: 22, requiereFirmaHumana: true },
              { pedido: 'PED-902', cliente: 'Distribuidora Andina Ltda.', montoCOP: 1950000, diasMora: 0, requiereFirmaHumana: false },
              { pedido: 'PED-903', cliente: 'Insumos del Caribe S.A.S.', montoCOP: 6200000, diasMora: 30, requiereFirmaHumana: true },
              { pedido: 'PED-904', cliente: 'Logística Central S.A.', montoCOP: 1100000, diasMora: 5, requiereFirmaHumana: false },
              { pedido: 'PED-905', cliente: 'Grupo Santandereano S.A.S.', montoCOP: 3400000, diasMora: 19, requiereFirmaHumana: true }
            ],
            pedidosRetenidosEsperados: 3
          }, null, 2)
        },
        {
          filename: 'mcp_servers_config.yaml', ext: 'yaml', mime: 'text/yaml;charset=utf-8',
          role: 'Configuración de Principio de Menor Privilegio en conectores Model Context Protocol',
          content: 'mcp_governance_version: "1.0"\nservers:\n  cartera_erp:\n    mode: "read_only"\n    allowed_tools: ["get_customer_balance", "list_overdue_invoices"]\n  bodega_wms:\n    mode: "controlled_write"\n    human_in_the_loop_condition: "dias_mora > 15"\n  notificaciones_externas:\n    mode: "require_explicit_approval"\n'
        },
        {
          filename: 'bitacora_auditoria_mcp.log', ext: 'log', mime: 'text/plain;charset=utf-8',
          role: 'Trazabilidad inmutable de llamadas MCP y retenciones preventivas',
          content: '2026-10-25T08:00:12-05:00 [MCP:cartera_erp] [READ] Consulta mora PED-901 -> 22 días -> RETENIDO (Human-in-the-Loop)\n2026-10-25T08:00:13-05:00 [MCP:cartera_erp] [READ] Consulta mora PED-902 -> 0 días -> LIBERADO AUTOMÁTICO\n2026-10-25T08:00:14-05:00 [MCP:cartera_erp] [READ] Consulta mora PED-903 -> 30 días -> RETENIDO (Human-in-the-Loop)\n2026-10-25T08:00:15-05:00 [MCP:cartera_erp] [READ] Consulta mora PED-904 -> 5 días -> LIBERADO AUTOMÁTICO\n2026-10-25T08:00:16-05:00 [MCP:cartera_erp] [READ] Consulta mora PED-905 -> 19 días -> RETENIDO (Human-in-the-Loop)\n'
        }
      ]
    },
    18: {
      zipName: 'kit-ej18-optimizador-turnos-44h.zip',
      folderName: 'ejercicio-18-optimizador-turnos',
      summary: 'Plantilla de 5 colaboradores con límite de 44h (.csv), normativa laboral (.md) y demanda de cobertura (.json).',
      files: [
        {
          filename: 'plantilla_turnos_equipo.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Plantilla de 5 colaboradores (5 x 44 horas = 220 horas ordinarias semanales disponibles)',
          content: 'ID_Colaborador,Nombre,Rol,Max_Horas_Ordinarias_Semana,Tarifa_Hora_Ordinaria_COP,Restriccion_Dura\nCOL-01,Andrea Castellanos,Supervisora,44,25000,No_Noche_Seguido_Manana\nCOL-02,Camilo Duarte,Supervisora,44,25000,No_Noche_Seguido_Manana\nCOL-03,Diana Patiño,Especialista,44,19000,No_Noche_Seguido_Manana\nCOL-04,Esteban Mora,Auxiliar,44,15000,No_Noche_Seguido_Manana\nCOL-05,Fernanda Ríos,Auxiliar,44,15000,No_Noche_Seguido_Manana\n'
        },
        {
          filename: 'normativa_jornada_laboral.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Reglas duras y blandas para el programador de turnos sin conflictos legales',
          content: '# Reglas de Programación de Turnos (Ley Laboral Colombiana)\n\n## 1. Restricciones Duras (Innegociables)\n- **Tope Semanal Ordinario:** Máximo **44 horas semanales** por colaborador (`5 colaboradores * 44h = 220 horas ordinarias`).\n- **Descanso Interjornada:** Prohibido programar turno **Mañana (06:00-14:00)** el día inmediatamente posterior a un turno **Noche (22:00-06:00)**.\n- **Cobertura de Supervisión:** Todo turno activo requiere al menos un rol `Supervisora`.\n'
        },
        {
          filename: 'demanda_turnos_semanal.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Requerimiento operativo de horas por franja de lunes a sábado',
          content: JSON.stringify({
            equipoTotalColaboradores: 5,
            maxHorasOrdinariasPorPersona: 44,
            capacidadTotalOrdinariaEquipoHoras: 220,
            franjas: [
              { codigo: 'MANANA', horario: '06:00 a 14:00', duracionHoras: 8 },
              { codigo: 'TARDE', horario: '14:00 a 22:00', duracionHoras: 8 },
              { codigo: 'NOCHE', horario: '22:00 a 06:00', duracionHoras: 8 }
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
          role: 'Matriz de 3 puntos (Etapa 1: O=5, M=8, P=20 -> Duración PERT = 9,5 días)',
          content: 'ID_Etapa,Etapa,Dias_Optimista,Dias_Mas_Probable,Dias_Pesimista,Dias_Esperados_PERT,Costo_Base_COP\nET-01,Permisos y Licencias Ambientales,5,8,20,9.5,4500000\nET-02,Adecuacion Fisica y Redes,6,9,18,10.0,12000000\nET-03,Instalacion Equipos Tostion,4,6,14,7.0,18500000\nET-04,Pruebas e Integracion de Software,3,5,13,6.0,6000000\n'
        },
        {
          filename: 'grafo_ruta_critica.json', ext: 'json', mime: 'application/json;charset=utf-8',
          role: 'Secuencia de dependencias y penalidades por día de atraso',
          content: JSON.stringify({
            proyecto: 'Apertura Nueva Planta Tostadora Vélez',
            formulaPert: '(Optimista + 4 * Mas_Probable + Pesimista) / 6',
            casoTestigoEtapa1: {
              etapa: 'Permisos y Licencias Ambientales',
              optimista: 5,
              masProbable: 8,
              pesimista: 20,
              calculoNumerador: 57,
              duracionEsperadaPertDias: 9.5
            },
            iteracionesMonteCarlo: 5000
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
          role: 'Estado financiero y operativo integral (Flujo de Caja Neto Disponible = $3.570.000 COP)',
          content: JSON.stringify({
            empresa: 'Soluciones Integrales Andinas S.A.S.',
            nit: '901.482.391-4',
            sede: 'Vélez, Santander, Colombia',
            tesoreriaMesActual: {
              ingresosCobradosCOP: 12000000,
              egresosOperativosCOP: 7800000,
              utilidadOperativaCOP: 4200000,
              reservaImpositivaPct: 15,
              reservaImpositivaCOP: 630000,
              flujoCajaNetoDisponibleCOP: 3570000
            }
          }, null, 2)
        },
        {
          filename: 'catalogo_y_bodega_pyme.csv', ext: 'csv', mime: 'text/csv;charset=utf-8',
          role: 'Módulo de inventario y precios conectado con Ventas y Tesorería',
          content: 'SKU,Producto,Stock_Actual,Punto_Reorden_ROP,Costo_Unitario_COP,Precio_Venta_COP,Estado_Stock\nCAF-500,Cafe Especial Origen Santander 500g,68,70,28000,50000,PEDIR_HOY\nSER-01,Consultoria Auditoria Procesos,999,0,650000,1000000,DISPONIBLE\nMOL-01,Molino Acero Inoxidable,15,12,145000,240000,OPTIMO\n'
        },
        {
          filename: 'esquema_erp_pyme.sql', ext: 'sql', mime: 'application/sql;charset=utf-8',
          role: 'Modelo de datos integrado para conectar Ventas, Bodega y Flujo de Caja',
          content: '-- Esquema ERP Simplificado — Proyecto Cumbre Antigravity\nCREATE TABLE resumen_tesoreria (\n  periodo VARCHAR(10) PRIMARY KEY,\n  ingresos_cobrados_cop NUMERIC(14,2) NOT NULL,\n  egresos_operativos_cop NUMERIC(14,2) NOT NULL,\n  reserva_impositiva_pct NUMERIC(5,2) DEFAULT 15.00\n);\n'
        },
        {
          filename: 'reglas_copiloto_auditor.md', ext: 'md', mime: 'text/markdown;charset=utf-8',
          role: 'Fórmulas e invariantes que debe auditar el Copiloto de la Suite Pyme',
          content: '# Reglas del Copiloto Auditor — Suite Operativa Pyme\n\n1. **Utilidad Operativa del Mes:** `$12.000.000 (Ingresos) - $7.800.000 (Egresos) = $4.200.000 COP`.\n2. **Reserva Impositiva y de Seguridad (15 %):** `$4.200.000 * 0,15 = $630.000 COP`.\n3. **Flujo de Caja Neto Disponible:** `$4.200.000 - $630.000 = $3.570.000 COP`.\n4. **Alerta de Inventario:** Emitir orden de compra inmediata para `CAF-500` (`Stock 68 <= ROP 70`).\n'
        }
      ]
    }
  };

  return { KITS_N4: KITS_N4 };
});
