# GameHup-Gestor-de-Videojuegos
¿Qué es?
-
GameHup es una aplicación web para la gestión de una colección de videojuegos. Este proyecto está diseñado para proporcionar una interfaz sencilla y fácil de usar para agregar, editar, visualizar y eliminar juegos. El backend está desarrollado en ASP.NET Core, mientras que el frontend utiliza HTML, CSS y JavaScript.

Características
-
Listado de Videojuegos: Muestra una lista de todos los videojuegos almacenados en la base de datos.

Agregar Juegos: Permite añadir nuevos videojuegos con información como el nombre, la descripción y la imagen del juego.

Editar Juegos: Posibilidad de modificar los detalles de los videojuegos existentes.

Eliminar Juegos: Funcionalidad para eliminar videojuegos de la lista.

Previsualización de Imagen: Al agregar o editar un juego, se muestra una previsualización de la imagen antes de guardar los cambios.

Persistencia de Datos: Los juegos se almacenan en un archivo JSON o base de datos, permitiendo la persistencia de la información a través de las sesiones.

Tecnologías Utilizadas
-
Backend: ASP.NET Core

Frontend: HTML5, CSS3, JavaScript

Persistencia: Archivos JSON (puede ser extendido a bases de datos)

Serialización: Newtonsoft.Json

Instalación
-
Instrucciones para configurar y ejecutar el proyecto GameHUB - Gestor de Videojuegos

Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

.NET SDK: Descarga e instala el SDK de .NET desde el sitio oficial de Microsoft.

Visual Studio Code o Visual Studio: Puedes utilizar cualquiera de estos editores para trabajar con el código. 

Asegúrate de que tengan las extensiones necesarias para .NET y C#.

Git: Si no lo tienes, instala Git para poder clonar el repositorio.

Pasos:
Paso 1: Clona el Repositorio
Primero, clona el repositorio del proyecto desde GitHub a tu máquina local. Puedes hacerlo utilizando un terminal o línea de comandos.

Comando: git clone https://github.com/Elmerluis0129/GameHup-Gestor-de-Videojuegos.git

Paso 2: Navega al Directorio del Proyecto
Una vez clonado el repositorio, navega al directorio donde se encuentra el proyecto Backend del Gestor de Videojuegos. Si clonaste el proyecto en C:/GameHUB, navega a ese directorio. Si lo clonaste en otro lugar, usa la ruta correspondiente.

Comando: cd C:/GameHup-Gestor-de-Videojuegos


Paso 3: Restaura los Paquetes NuGet
Antes de compilar el proyecto, necesitas restaurar los paquetes NuGet que el proyecto utiliza. Esto descargará todas las dependencias necesarias.

Comando: dotnet restore


Paso 4: Compila el Proyecto
Una vez restaurados los paquetes, compila el proyecto para asegurarte de que todo esté configurado correctamente y sin errores.

Comando: dotnet build


Paso 5: Ejecuta el Servidor
Después de la compilación, ejecuta el servidor de la API. Esto iniciará el servidor localmente en el puerto configurado, generalmente http://localhost:5016.

Comando: dotnet run


Paso 6: Accede a la Aplicación Frontend
Para visualizar la aplicación frontend, abre el archivo index.html en un navegador web. Este archivo se encuentra dentro del directorio wwwroot, que es parte del repositorio clonado.

Ruta del archivo: C:/GameHup-Gestor-de-Videojuegos/wwwroot/index.html (Tener en cuenta que la ruta puede variar segun el dispositivo.
Abre este archivo en tu navegador web preferido para comenzar a utilizar la aplicación de gestión de videojuegos.

Paso 7: Verificación
Una vez que todo esté configurado y en ejecución:

Servidor Backend: Debes poder acceder a la API desde http://localhost:5016/api/Games.
Frontend: Deberías poder interactuar con la interfaz de usuario que se carga en tu navegador al abrir index.html.

Contribuciones
-
Las contribuciones son bienvenidas. Si tienes ideas para nuevas funcionalidades o mejoras, no dudes en hacer un fork del repositorio y enviar un pull request.
