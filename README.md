# ControlStock - Gestión de Inventarios

¡Bienvenido a ControlStock! Esta aplicación está diseñada para ayudarte a gestionar tus productos de manera eficiente y mantener tu inventario siempre actualizado.

## Estructura General del Proyecto
![mockup1](https://github.com/user-attachments/assets/90b5f213-75d0-4c84-8397-21525f74623e)
![mockup2](https://github.com/user-attachments/assets/cc284c5a-22a2-4f57-9a3d-85a4a51065b5)
![mockup3](https://github.com/user-attachments/assets/7e4e83e1-f6b1-4249-9ef9-b086f2442490)

## Instalación del Frontend

Para instalar y configurar el backend del proyecto, sigue estos pasos:

1 **Clona el repositorio**:
```
   git clone https://github.com/tu-usuario/ControlStock-Frontend.git
```
2 **Ingresa al directorio del proyecto**:
```
  cd ControlStock-Frontend
```
3 **Instala las dependencias**:
```
  npm install
```
## Uso
1. Asegúrate de tener el backend de ControlStock-Backend en ejecución.
2. Configura la URL del backend en el archivo de configuración src/common/config.js:
```
  const config = {
    VERSION: '9.0',
    BASE_API: 'http://localhost:5000/api',
}

export default config;
```
3. Ejecuta la aplicación:
   ```
   npm run dev

## Funcionalidades Principales

- **Gestión de Productos**: Registra y administra la información de tus productos, incluyendo nombre, categoría, precio y stock.
- **Búsqueda Avanzada**: Busca productos por nombre o categoría y filtra los resultados según tus necesidades.
- **Control de Stock**: Mantén un registro actualizado de tu inventario y recibe alertas cuando los niveles de stock sean bajos.

## Tecnologías Utilizadas

- **FrontEnd**: HTML, CSS, JavaScript, React-JS, React-Bootstrap
- **BackEnd**: Express, Node.js
- **Base de Datos**: MongoDB (Base de Datos No-Relacional)

## Autores

- @MaxiGTX/Maximo Gabriel Garcia Toledo - Developer
