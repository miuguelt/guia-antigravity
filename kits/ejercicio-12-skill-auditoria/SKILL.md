---
name: auditoria-gastos
description: Audita relaciones de gastos detectando excesos de tope individual y compras fraccionadas el mismo día.
---

# Procedimiento Estándar de Auditoría de Gastos (SOP)

1. Verificar que ningún gasto de alimentación individual supere `$90.000 COP`.
2. Agrupar recibos por la llave compuesta `(Empleado + Fecha + NIT_Proveedor)`.
3. Si una agrupación presenta `>= 2` recibos el mismo día y su suma supera `$200.000 COP`, marcar **Alerta Crítica de Fraccionamiento**.
