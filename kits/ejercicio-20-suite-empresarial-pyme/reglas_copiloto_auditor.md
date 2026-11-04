# Reglas del Copiloto Auditor — Suite Operativa Pyme

1. **Utilidad Operativa de Caja:** suma de pedidos con estado `Cobrado` menos la suma de egresos del periodo. Los pedidos `Por cobrar` se muestran como cartera, no como caja.
2. **Reserva Impositiva y de Seguridad:** `reservaImpositivaPct` sobre la utilidad operativa de caja.
3. **Flujo de Caja Neto Disponible:** utilidad operativa de caja menos la reserva.
4. **Alerta de Inventario:** solo para `Tipo = Producto`. `ROP = (Venta_Diaria_Promedio * Tiempo_Entrega_Dias) + (Venta_Diaria_Maxima - Venta_Diaria_Promedio) * Tiempo_Entrega_Dias`. Si `Stock_Actual <= ROP`, emitir orden de compra.
5. **Decisiones de la semana:** el Copiloto propone las 3 decisiones con mayor impacto en caja y cita el dato que respalda cada una.
