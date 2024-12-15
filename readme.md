# Proyecto Base en PHP

## Índice
1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Uso](#uso)
7. [Enrutador de Vistas y Paso de Variables](#enrutador-de-vistas-y-paso-de-variables)
8. [Rutas y Controladores](#rutas-y-controladores-de-api)
9. [Modelos](#modelos)
10. [Autenticación y Autorización](#autenticación-y-autorización)
11. [Manejo de Errores](#manejo-de-errores)
12. [Testing](#testing)
13. [Contribuir](#contribuir)
14. [Licencia](#licencia)
15. [FAQ](#faq)
16. [Recursos](#recursos)

## Introducción
Este proyecto es una plantilla base para aplicaciones web utilizando PHP, Flight, Eloquent ORM, y JWT para autenticación. La plantilla incluye configuraciones básicas para desarrollo y producción, manejo de errores, y ejemplos de controladores y modelos.

## Requisitos Previos
- PHP >= 7.4
- Composer
- SQLite (para desarrollo)
- MySQL (para producción)

## Instalación
1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Instala las dependencias:
    ```bash
    composer install
    ```

## Configuración
1. Copia el archivo `.env.example` a `.env` y configura las variables de entorno según tu entorno:
    ```bash
    cp .env.example .env
    ```

2. Configura la base de datos en el archivo `.env`:
    ```env
    APP_ENV=development
    DB_CONNECTION=sqlite # O mysql según el entorno
    DB_HOST=localhost
    DB_DATABASE=nombre_de_tu_base_de_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    JWT_SECRET=tu_secreto_jwt
    ```

3. **Configuración de JWT**: Genera un secreto JWT seguro y actualiza el archivo `.env` con el valor generado.

## Estructura del Proyecto
- `index.php`: Punto de entrada de la aplicación.
- `src/config/db.php`: Configuración de la base de datos.
- `src/controllers`: Controladores de la aplicación.
- `src/models`: Modelos de la aplicación.
- `src/router`: Definición de rutas.
- `src/views`: Vistas de la aplicación.

## Uso
Para iniciar el servidor de desarrollo, ejecuta:
```bash
php -S localhost:8000 -t public

```

## Enrutador de Vistas y Paso de Variables

El enrutado de vistas en este proyecto PHP se realiza a través del archivo `view_router.php`. En este archivo, se definen las rutas de la aplicación web utilizando Flight, un microframework PHP. Cada ruta definida en Flight corresponde a una URL específica y tiene asociada una función de renderizado que utiliza un layout para mostrar la vista.

La ruta donde se modifica el layout en el código proporcionado es en el archivo `src\views\layout\layout.php`. Dentro de este archivo, se definen las secciones del layout como el encabezado `($header)`, el contenido principal `($content)`, y el pie de página `($footer)`. Además, se establece el título de la página utilizando la variable `$title` y se accede a variables de entorno como `$_ENV['TITLE_APP']` para personalizar la visualización de cada página.

### Funcionamiento del Enrutado de Vistas

1. Se define la función `renderWithLayout($view, $data = [])` que renderiza una vista con un layout.
2. Se establecen las rutas para la aplicación web utilizando `Flight::route()`.
3. Cada ruta especifica una URL y una función anónima que llama a `renderWithLayout()` con los datos necesarios para renderizar la vista correspondiente.
4. Se maneja la ruta `'*'` para mostrar una página de error 404 en caso de que ninguna otra ruta coincida.

### Ejemplo de Paso de Variables a las Plantillas

En el archivo `layout.php` ubicado en la carpeta `src/views/layout`, se muestra cómo se pasan variables a las plantillas de las vistas:

- Se utiliza la sintaxis `<?= $variable ?>` para imprimir variables en HTML.
- Por ejemplo, `$title` se utiliza para definir el título de la página, y se accede a variables de entorno como `$_ENV['TITLE_APP']`.
- Al renderizar una vista en `renderWithLayout()`, se pueden pasar datos adicionales como un array asociativo. Por ejemplo, en `renderWithLayout('login', ['title' => 'Login'])`, se pasa el título "Login" a la vista 'Login'.
```php
Flight::route('/login/', function () {
    if (isset($_SESSION['user'])) {
        Flight::redirect('/casagro_new');
    }
    renderWithLayout('login', ['title' => 'Login']);
});
```

En resumen, el enrutado de vistas en este proyecto PHP se basa en Flight para definir rutas y renderizar vistas con layouts, permitiendo el paso de variables a las plantillas para personalizar la visualización de cada página.


## Rutas y Controladores de api
Las rutas están definidas en `src/router/index.php` como archivo de barril para las rutas. Aquí tienes un ejemplo de cómo definir una ruta y su controlador asociado:

```php
<?php
// user.php
require 'src/controllers/User.php';

use App\Controllers\UserController;

Flight::group('/users', function () {
    Flight::route('GET /', function () {
        $controller = new UserController();
        $data  = $controller->getAll();
        Flight::json(['response' => $data]);
    });

    Flight::route('GET /@id', function ($id) {
        $controller = new UserController();
        $data = $controller->getById($id);
        Flight::json(['response' => $data]);
    });
});
```
**Ejemplo de solicitud:**

```bash
curl -X GET http://localhost:8000/api/users
```

**Respuesta Esperada**
```json
{
    "response": [/* Lista de usuarios */]
}
```
## Modelos
Los modelos están definidos en `src/models`. Aquí tienes un ejemplo de un modelo de usuario:

```php
<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class User extends Model
{
    protected $table = 'users';
    public $incrementing = false; // Utilizar UUID en lugar de auto-incremento
    protected $keyType = 'string';
    protected $fillable = ['id', 'name', 'lastname', 'dni', 'password', 'rol_id'];

    // Crear un UUID al crear el modelo
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Uuid::uuid4()->toString();
            }
        });
    }
}
```

## Autenticación y Autorización
La autenticación se maneja utilizando JWT. Aquí tienes un ejemplo de cómo proteger una ruta:

```php
Flight::route('/secure/*', function(){
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        Flight::halt(401, 'Unauthorized');
    }
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    try {
        $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        Flight::set('user', $decoded);
    } catch (Exception $e) {
        Flight::halt(401, 'Unauthorized');
    }
});
```
## Manejo de Errores
El manejo de errores global está configurado en `index.php`:

```php
Flight::map('error', function(Exception $ex){
    global $log;
    $log->error($ex->getMessage());
    renderWithLayout('error', ['message' => $ex->getMessage()]);
});
```

Esta sección muestra cómo se configuran los errores globalmente en tu archivo `index.php`.
## Testing
Para ejecutar los tests, utiliza PHPUnit. Asegúrate de tener PHPUnit instalado y configura tus tests en el directorio `tests`.

## Contribuir
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Realiza tus cambios y haz commit:
    ```bash
    git commit -am 'Añadir nueva funcionalidad'
    ```
4. Sube tus cambios:
    ```bash
    git push origin feature/nueva-funcionalidad
    ```
5. Abre un Pull Request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## FAQ

**¿Cómo configuro la base de datos para producción?**

Consulta la sección de [Configuración](#configuración) para detalles sobre cómo configurar MySQL.

**¿Cómo genero un secreto JWT?**

Puedes usar una herramienta como OpenSSL para generar un secreto seguro.

## Recursos

- [FlightPHP Documentation](https://docs.flightphp.com/)
- [Eloquent ORM Documentation](https://laravel.com/docs/eloquent)
- [JWT Documentation](https://github.com/firebase/php-jwt)
___

Estas mejoras deberían ayudar a que tu README sea más útil y accesible para los desarrolladores que lo utilicen.
