Plataforma de Aprendizaje Interactivo y Gamificado de Software
Plataforma web de aprendizaje de desarrollo de software basada en micro-retos interactivos y mecánicas de gamificación. El objetivo es eliminar la fatiga teórica de los cursos tradicionales mediante lecciones dinámicas de corta duración (3 a 5 minutos) con retroalimentación inmediata, guiando al usuario desde la lógica fundamental hasta arquitecturas backend profesionales.

Características Principales
Micro-Learning Práctico: Retos interactivos enfocados en código:

Completar espacios en blanco (Fill-in-the-blank).

Ordenar bloques lógicos (Parsons problems).

Predicción de salida en consola y selección de opciones.

Mini-editor para resolución de pruebas sintácticas.

Evaluación en Cliente a Costo Cero: Ejecución de código directamente en el navegador del usuario utilizando WebAssembly (Pyodide para Python, SQLite WASM para SQL) y Web Workers para JavaScript, garantizando inmediatez sin sobrecargar la infraestructura del servidor.

Sistema de Gamificación y Progresión:

Experiencia Dinámica (XP): Recompensas basadas en puntuación base, precisión y bonos de eficiencia temporal (con protecciones antifraude contra envíos automáticos).

Gestión de Vidas y Rachas: Pérdida de corazones por error sintáctico y seguimiento de rachas diarias (Streaks) con soporte para protectores de racha (Streak Freezes).

Logros Desbloqueables: Hitos de progreso y aprendizaje estilo plataforma de videojuegos.

Tienda de Cosméticos: Economía interna basada en monedas ganadas por esfuerzo (DevCoins) para canjear temas visuales, marcos de avatar, títulos y efectos de sonido (sin mecánicas pay-to-win).

Tutor Socrático con Inteligencia Artificial:

Modo gratuito respaldado por pistas estáticas predeterminadas en base de datos o mediante integración BYOK (Bring Your Own Key).

Modo suscriptor con tutor integrado que proporciona orientación conceptual mediante preguntas socráticas, con inyección segura de prompts desde el backend para evitar la revelación directa de la solución.

Monetización Híbrida y Protección de Ingresos:

Capa gratuita sustentada con anuncios no invasivos y detección activa de bloqueadores de publicidad (anti-adblock).

Suscripciones Pro y Plan Familiar para eliminar anuncios, habilitar vidas ilimitadas y acceder a tutoría IA integrada.

Rutas de Aprendizaje
El contenido se estructura de manera desacoplada: cada módulo opera como un curso independiente y, a su vez, se encadena dentro de una ruta de carrera completa:

Módulo 1: Fundamentos y Lógica Pura (Python): Variables, estructuras de datos nativas (listas, diccionarios), condicionales, ciclos y algoritmia sin la fricción de tipos complejos o llaves.

Módulo 2: Núcleo Web y Persistencia Relacional:

Maquetación y estilos: HTML5 semántico, CSS moderno y Tailwind CSS.

Lógica interactiva: JavaScript moderno (ES6+), manipulación del DOM y asincronía.

Frontend estructurado: Componentes, estado y ciclo de vida en React.

Bases de datos: Modelado relacional y consultas SQL estándar con PostgreSQL.

Módulo 3: Especialización Backend de Producción (Electivo): Rutas avanzadas a elección del estudiante:

Next.js: Fullstack reactivo y renderizado del lado del servidor.

NestJS: Arquitectura modular empresarial sobre Node.js y TypeScript.

ASP.NET Core: APIs REST empresariales de alto rendimiento con C# y Clean Architecture.

Spring Boot: Sistemas transaccionales y arquitecturas corporativas con Java.

Stack Tecnológico
Backend: C# / .NET (ASP.NET Core Minimal APIs).

Arquitectura: Clean Architecture (Domain, Application, Infrastructure, Presentation/API).

Base de Datos: PostgreSQL con Entity Framework Core (mapeos vía Fluent API y consultas de lectura optimizadas con AsNoTracking()).

Caché en Servidor: IMemoryCache / Redis para respuestas de alto rendimiento y baja latencia.

Frontend: Framework reactivo con Tailwind CSS.

Runtimes del Lado del Cliente: Pyodide (WASM) para Python y Web Workers aislados para JavaScript.

Ejecución Aislada de Backend: Contenedores Docker efímeros con límites estrictos de CPU y memoria para retos de compilación avanzada.

Directrices de Diseño e Identidad
Estética Angular e Industrial: Se descarta estrictamente el uso de bordes redondeados (border-radius: 0px o rounded-none). Los componentes (tarjetas, botones, inputs, modales) mantienen líneas rectas, técnicas y de alto contraste.

Cero Recursos Genéricos: No se emplean iconos genéricos de stock ni estilos prediseñados tipo plantilla; el entorno prioriza una interfaz técnica inspirada en entornos de desarrollo y terminales.

Estado del Proyecto y Estructura
Nota: La sección de árbol de directorios y organización de carpetas se incorporará una vez consolidada la estructura física de la solución.