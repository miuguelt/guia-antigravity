# Protocolo de Auditoría Semanal e Idempotencia (`/schedule`)

1. **Regla Poka-Yoke de Cuadre Cruzado:** `Ventas_Registradas` DEBE ser exactamente igual a `Ingresos_Bancos + Cuentas_Por_Cobrar` (`$9.000.000 + $3.500.000 = $12.500.000 COP`). Si la diferencia es distinta de `$0`, bloquear el cierre.
2. **Regla de Idempotencia:** Si la tarea programada se ejecuta dos veces sobre la llave `2026-W44`, actualiza el registro existente sin duplicar saldos.
