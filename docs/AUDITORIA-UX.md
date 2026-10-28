# Auditoría UX — Mis Notas

## Alcance y método

Este trabajo compara una pantalla básica de referencia creada para el ejercicio con la versión rediseñada de **Mis Notas**. La pantalla original es una maqueta creada para poder hacer la comparación; no corresponde a una aplicación anterior del alumno. Prueba ambas versiones y actualiza las observaciones si lo que ves en el navegador difiere.

## Tabla de auditoría: cinco heurísticas de Nielsen

| Heurística                                    | Problema en la pantalla original                                                     | Solución aplicada en el rediseño                                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Visibilidad del estado                        | Al agregar una nota no aparece una confirmación; no se sabe si la acción se realizó. | Se muestra «Nota agregada», «Nota eliminada» y mensajes de error en una región `role="status"` con `aria-live="polite"`. |
| Coincidencia entre el sistema y el mundo real | El botón dice «OK» y el enlace «BORRAR TODO» no explica el contexto con claridad.    | Se usan textos claros: «Agregar nota», «Eliminar» y «Eliminar todas las notas».                                          |
| Control y libertad                            | Borrar todas las notas no pide confirmación ni ofrece recuperación.                  | Se pide confirmación y se ofrece «Deshacer»; las notas individuales también pueden restaurarse.                          |
| Prevención de errores                         | Se puede agregar una nota vacía o que solo contiene espacios.                        | `trim()` valida el contenido antes de agregar. Si está vacío, aparece un mensaje y el foco vuelve al campo.              |
| Reconocer antes que recordar                  | El campo depende de un placeholder que desaparece al escribir.                       | Se añade la etiqueta visible «Nueva nota» asociada con `label for="nota"`.                                               |

## Leyes de usabilidad aplicadas

| Ley           | Cambio realizado                                                                                       | Justificación                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Ley de Fitts  | El botón «Agregar nota» ocupa el ancho disponible y los botones tienen una altura mínima de 44 px.     | Los objetivos importantes son más grandes y fáciles de alcanzar, especialmente en pantallas táctiles. |
| Ley de Hick   | La acción principal está separada de las acciones destructivas y cada nota tiene su acción «Eliminar». | Se muestran pocas acciones claras en cada contexto para facilitar la decisión.                        |
| Ley de Miller | La interfaz se divide en dos bloques: creación de notas y lista de notas.                              | Agrupar la información ayuda a comprenderla sin procesar todo como un solo bloque.                    |

## Cambios visuales y accesibilidad

- Los colores se definen con variables CSS en `:root`.
- Se utiliza un solo encabezado principal `h1`.
- El espaciado se basa en múltiplos de 8.
- El campo tiene una etiqueta visible asociada.
- Se añadió foco visible con `:focus-visible`; no se elimina el `outline`.
- Los botones tienen una altura mínima de 44 px.
- El contraste debe verificarse en DevTools/Lighthouse; corrige los avisos que aparezcan.
- Esta versión no usa imágenes, así que no necesita atributos `alt`.
