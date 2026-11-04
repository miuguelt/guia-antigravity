# Protocolo de Auditoría Semanal e Idempotencia (`/schedule`)

1. **Regla Poka-Yoke de Cuadre Cruzado:** `Ventas_Registradas` DEBE ser exactamente igual a `Ingresos_Bancos + Cuentas_Por_Cobrar` de la misma semana. Si la diferencia es distinta de `$0`, bloquear el cierre de esa semana y listar el valor faltante.
3. **Regla de variación:** Si las ventas de una semana varían más de 25 % frente al promedio de las semanas auditadas, marcar la semana para revisión humana.
2. **Regla de Idempotencia:** Si la tarea programada se ejecuta dos veces sobre la misma `idempotencyKey`, actualiza el registro existente sin duplicar saldos.
