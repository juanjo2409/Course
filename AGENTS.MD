# AGENT.MD: Reglas y Directrices del Proyecto

Este documento establece las instrucciones operativas, restricciones de diseño y normas arquitectónicas obligatorias para cualquier agente que interactúe, genere o modifique código en este repositorio.

---

## 1. Comunicación y Explicación de Cambios

* **Explicación previa y posterior en cambios mayores:** Antes de ejecutar o sugerir una modificación estructural profunda (migraciones de base de datos, adición de endpoints clave, refactorizaciones de capas o cambios en contratos de API), debes desglosar el razonamiento técnico:
* **Qué** se modifica exactamente.
* **Por qué** es necesario el cambio frente a la alternativa existente.
* **Impacto** potencial en otras capas o componentes del sistema.


* **Prohibición de cambios silenciosos:** No realices cambios colaterales, reescrituras de archivos enteros sin justificación o eliminación de lógica previa sin documentarlo en tu respuesta.

---

## 2. Restricciones de Diseño e Identidad Visual

* **Cero bordes redondeados (No Rounded Corners):**
* Queda estrictamente prohibido el uso de clases utilitarias como `rounded`, `rounded-md`, `rounded-lg`, `rounded-full`, etc., o propiedades CSS equivalentes (`border-radius > 0`).
* Toda la interfaz debe mantener una estética recta, angular, industrial y precisa: `border-radius: 0px` (o `rounded-none` en Tailwind CSS). Aplica para botones, tarjetas, modales, barras de progreso, inputs y contenedores.


* **Cero logos o recursos genéricos:**
* No utilices iconos genéricos de stock, emojis infantiles ni logotipos cliché de plantillas básicas.
* La identidad visual debe sentirse técnica, profesional y temática (estilo terminal retro, interfaces IDE oscuras, tipografías monoespaciadas y elementos angulares de alto contraste).



---

## 3. Respeto Estricto de la Arquitectura y el Stack Tecnológico

* **Inviolabilidad de Clean Architecture:**
* El backend está estructurado en capas estrictas:
* `Domain`: Entidades, Value Objects y lógica de negocio pura. **Cero dependencias externas o paquetes de persistencia.**
* `Application`: Casos de uso (CQRS / Handlers), DTOs, validaciones e interfaces de abstracción.
* `Infrastructure`: Implementación de repositorios (Entity Framework Core), servicios externos (IA, caché, Docker runner).
* `Presentation / Api`: Minimal APIs de ASP.NET Core, middlewares y configuración.


* **Regla de dependencia:** Las dependencias siempre apuntan hacia adentro. Queda prohibido acoplar el Dominio con frameworks o saltarse capas.


* **Stack Tecnológico Cerrado (No agregar nuevos lenguajes/herramientas no autorizadas):**
* **Backend:** C# / .NET (ASP.NET Core Minimal APIs).
* **Persistencia:** PostgreSQL con Entity Framework Core.
* **Frontend:** Framework definido en el proyecto con Tailwind CSS (configurado sin redondeos).
* **Ejecución en cliente:** WebAssembly (Pyodide para Python básico) y Web Workers para JavaScript.
* **No introduzcas lenguajes adicionales, runtimes alternativos ni frameworks de backend o bases de datos no contempladas** (por ejemplo, no sustituyas endpoints por Python/FastAPI, no metas MongoDB ni agregues librerías pesadas sin instrucción explícita).