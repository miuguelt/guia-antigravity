# Criterios de Aceptación para /goal

El agente no termina hasta cumplir todos estos criterios:

1. `revisor_polizas.html` lista los 2 contratos con el valor exigido y la vigencia mínima de cada amparo, calculados desde los anexos.
2. Cada póliza presentada queda marcada como Cumple o No cumple, indicando si falla por valor, por vigencia o por ambos.
3. Un contrato con al menos una póliza que no cumple genera un acta de rechazo imprimible que cita el faltante exacto en COP.
4. El agente escribe y ejecuta pruebas automáticas (`node --test`) de las funciones de cálculo y todas pasan.
5. El formulario manual rechaza valores vacíos o negativos con un mensaje claro y tiene botón de reinicio.
