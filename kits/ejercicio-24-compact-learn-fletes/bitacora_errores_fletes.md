# Lección Operativa de Liquidación de Fletes

> Incidente 2026-09: se cobraron 14 guías solo por peso en báscula y la transportadora facturó la diferencia.

Nunca liquides una guía usando únicamente `Peso_Bascula_kg`. Calcula siempre `Peso_Volumetrico = (Largo * Ancho * Alto) / 2500` y cobra sobre `Math.max(Peso_Bascula, Peso_Volumetrico)`.
