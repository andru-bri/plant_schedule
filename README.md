#Plant Care Scheduler
Este proyecto implementa un sistema de programación de cuidado de plantas que ayuda a los usuarios a realizar un seguimiento de cuándo regar sus plantas según el tipo de planta y el historial de cuidado.

Arquitectura
El proyecto está dividido en dos partes:

Backend: API RESTful desarrollada con C# .NET que proporciona los endpoints para gestionar las plantas y su información de riego.
Frontend: Aplicación web de una sola página desarrollada con Next.js y TypeScript que consume la API del backend y proporciona una interfaz de usuario para interactuar con el sistema.
Funcionalidades
Listar todas las plantas: Permite obtener una lista de todas las plantas registradas en el sistema.
Agregar una planta: Permite agregar una nueva planta al sistema, especificando su nombre, tipo, frecuencia de riego, ubicación y fecha del último riego.
Registrar riego: Permite registrar que una planta ha sido regada, actualizando la fecha del último riego.
Obtener plantas que necesitan riego: Permite obtener una lista de las plantas que necesitan ser regadas en función de su frecuencia de riego y la fecha del último riego.
Filtrar plantas: Permite filtrar las plantas por tipo y estado de riego.
Ordenar plantas: Permite ordenar las plantas por fecha de próximo riego.
Tecnologías utilizadas
Backend:
C#
.NET 9.0
ASP.NET Core
xUnit (para pruebas unitarias)
Frontend:
Next.js
TypeScript
React
Tailwind CSS
Jest & React Testing Library (para pruebas unitarias)
Cómo ejecutar el proyecto
Backend:

Asegúrate de tener instalado el .NET 9.0 SDK.
Abre el proyecto del backend en Visual Studio o en tu editor de código preferido.
Ejecuta el proyecto desde Visual Studio o usando el comando dotnet run en la consola.
La API estará disponible en https://localhost:7216/api/plants.
Frontend:

Asegúrate de tener instalado Node.js y npm.
Abre el proyecto del frontend en tu editor de código preferido.
Instala las dependencias usando el comando npm install.
Ejecuta el proyecto usando el comando npm run dev.
La aplicación estará disponible en http://localhost:3000.
Pruebas unitarias:

Backend: Ejecuta las pruebas unitarias del backend desde Visual Studio o usando el comando dotnet test en la consola.
Frontend: Ejecuta las pruebas unitarias del frontend usando el comando npm test o yarn test.