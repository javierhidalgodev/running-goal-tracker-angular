# Running Goal Tracker (ANGULAR PROJECT)

### 7/11-10//2024
- [ ] Continar la refactorización con `Firestore`.
- [ ] Depurar la lógica.
- [ ] *Lazy loading*.
- [ ] Revisión general de estilos.
- [ ] Despliegue.

#### 9-10
- [x] Implementación de `AngularFire Auth`.
  - [x] Login.
  - [x] Logout.
  - [x] Register.
- [ ] Recuperar la data en relación al usuario loggeado.


#### 8-10
- [x] Investigando `AngularFire Auth`.

#### 7-10
- [x] Continar la refactorización con `Firestore`.

- Hay que dominar *AngularFire*.
- Creación de usuario: comprobar si existe; hashear password + guardar usuario; notificar.

### 30-9/4-0//2024
- [x] Operación de eliminación en *goals* + *activities* + *profile* [Video CRUD Angular:](https://youtu.be/56syqNBu0bg?feature=shared)
- [ ] Página *profile*.
- [ ] Imágenes en...
  - [ ] Actividad (portada).
  - [ ] *Profile*.
- [ ] Revisión de estilos.
- [ ] Tests.
- [x] Refactorización BBDD a *Firebase*.
- [ ] Configuración y despliegue en *Firebase*.

#### 4-10
- [ ] Depurar las funciones que necesitan validación de token, para usar una utilidad y no duplicar código.
- [ ] Revisar código refactorizado en relación a la creación de la colección `actividades` y la implicación en el tratamiento de los objetos `goal`.


#### 3-10
- [x] Buscar el completado de el objetivo en el flujo de la lógica de añadir una actividad, para terminar mostrando el modal.

#### 2-10
- Al refactorizar las actividades como colección independiente, hay que revisar el guardado de *goals* además de la recuperación de estos y de las actividades para ser mostradas en la vista en detalle de los mismos.

- He revisado los estilos en los botones de acción de la tarjeta que presenta los detalles de una actividad.
- He revisado los estilos del navside en `role=navigation`, ya que se superponía en el modal de añadir actividades.
- Queda recuperar el modal de completado; hay que revisar la lógica.

#### 1-10
- Se me complica mucho hacer un componente *modal* totalmente reutilizable.
  - Si inserto un formulario como template, no encuentro el modo de que los botones del modal actúen sobre las acciones del formulario.
  - Además, no quiero cerrar el modal hasta que el formulario esté enviado y grabado.
  - Tengo que controlar también el botón de envío y la carga de la operación.

- [x] Días restantes de la actividad si está en fecha pasada.
- [x] Barra de fondo negativo en Progreso de cada tarea en la vista general de las tareas.
  - De momento dejamos el original, a falta de investigar cómo cambiar el color.

#### 30-9
- Empiezo trabajando en la eliminación de objetivos, creando funciones en los servicios de `JSON SERVER`, servicio de objetivos y lógica del componente.

- Podemos crear un modal genérico a partir de la creación de servicios específicos para el modal. De momento trabajamos sobre un *confirm*.
  - A partir de esta idea, generamos un modal único, que recibe el componente refencia modal y una interfaz configurable con unos parámetros preestablecidos que tendrá el modal.
  - La interfez recibe un *template* y se gestiona con un `ngContainer *ngTemplateOutlet` en el modal, para poder recibir el formulario. Tal vez deba recibir un `ngComponentOutlet`.
  - Habría que modificar el modal de `añadir actividad`, `logout` y `confirmación de eliminar`, este último ya sea de objetivo, actividad o perfil.
  - También podríamos pedir confirmación para el registro de un nuevo usuario, o para el registro de un nuevo objetivo/actividad.
  - La lógica del componente gestiona los datos enviados desde la lógica del servidor. ~~Como idea **colateral**, habría que refactorizar la lógica de los componentes que resuelven las suscripciones. Sería posible que los componentes no necesiten hacer la suscripción, sino que sean los servicios los que operen en consecuencia~~.
- [ ] Mandar notificación de eliminado a *goalsPageComponent*.
- [x] Deshabilitar el botón de *"ADD ACTIVITY"* durante el proceso de eliminar.

### 23-9/27-9//2024
- [ ] Buscar alternativa para el guardado de imagen.
- [x] Grabación de actividades (refactorizar).
- [ ] Refactorizar las validaciones de *goals*.
- [ ] ¿Imágenes o iconos para objetivos?
- [ ] Dar más contenido a la *home*.
- [ ] Eliminar *goals*/*actividades*.
- [ ] Eliminar perfil.
---
- [ ] Revisión general de estilos.
---
- [ ] Testing.
---
- [ ] Migrar a `MongoDB`/`Firebase`.
- [ ] Despliegue.

#### 27-9

- [ ] Crear middleware para la validación del *token* en operaciónes *CRUD*.
- [ ] Revisar las suscripciones para borrarlas en `ngOnDestroy`.

    > <small>Hasta ahora no me he removido ninguna suscripción, lo que genera varias suscripciones a un mismo observable, duplicando recurso, `console.log`, *memory leaks*...</small>

# RUNNING GOALS APP

## TAREAS

### Estilos
- [ ] Crear inputs personalizados con opción de label y directivas que permitan estilizar.

### Notification Component
- [ ] Eliminar logs para mensajes de éxito y revisar lo de error/validación.

### Add Activity Form
- [x] Refactorizar la manera en que se graban las actividades y hacerlo persistente (`JSON SERVER`).

### Dar vida a la HOME
- [x] Añadir algunos mensajes personalizados en relación a los objetivos grabados, los pendientes y los completos.
- [ ] Seguir dando vida a la HOME con un diseño más "chulo", y otros datos como los KM recorridos en total.

### Refactoring para conseguir los objetivos del BACKEND/DBJSON y mostrarlos en la página general de objetivos del usuario

- [x] Se debe comprobar el estado de la sesión y del token. Esto lo hace el guard.
- [x] Se debe recoger el userId de la sesión. **Aquí sería conveniente modificar cómo se guarda el token al iniciar sesión. Debemos mirar si es necesario guardar en el localStorage también el userId y el email, para operaciones cómo esta.**
1. Se pueden dar hasta tres casos (reconocidos de momento):
   - [x] El servidor devuelve una lista de objetivos.
   - [x] El servidor no devuelve nada, porque no hay objetivos, y se renderiza una notificación.
   - [x] El servidor tiene problemas al recuperar los objetivos y muestra el error en cuestión.

**Nota:** me he dado cuenta que si borro el userId del *localStorage*, y recargo la página, se queda con el *loader*. Esto es porque ahora estoy asignado el usuario desde el guard, y parece ser que el componente se renderiza antes, y al no tener un userId al que acudir no gestiona las operaciones necesarias ni para mostrar el error. Por eso la idea de guardar un objeto de token más complejo, de tal manera que si se borra el token, el usuario sería directamente desconectado.

### Manejador de mensajes

1. La primera vez que entro en un campo y salgo sin escribir no se muestra nada, tantas veces como salga y entre, en cualquiera de los campos.
2. Si al entrar escribo, y al salir el campo es inválido, entonces se debe mostrar la caja y el mensaje.
3. Ahora solo se está mostrando la caja cuando interactúo y escribo en campo, salgo y vuelvo a interactuar con él.
4. Parece ser que no detecta con exactitud el campo tocado hasta que se vuelve a él y se modifica.

Podemos buscar la manera de manejar los mensajes de notificación desde un servicio/componente externo, para simplificar la lógica interna de los componenentes.

- [x] Tenemos un servicio común con varias funciones que pueden ser emitidas en relación al tipo de mensaje que se quiera emitir. Esto emite un objeto que puede ser utilizado en el componente para renderizar lo que se necesite.

**Manejar notificaciones de éxito/error**
- [x] Usamos un componente específico, que en el inicio se suscribe al emisor de notificaciones, iguala el mensaje interno a lo que recibe del emisor, y a los 5 segundos vuelve el mensaje a nulo.

**Manejar validaciones de formulario**
- [x] Tenemos un componente específico, que en el inicio se suscribe al emisor esperando mensajes de validación.
- [x] Esto es un array de ninguna/varias posiciones, que determinará si el componente debe renderizarse o no.
- [x] Internamente renderizará tantos mensajes de validación (mat-error) cómo tenga el array que recibe.

### Refactoring del login/register
  - [x] Crear un servicio especifico para emular el trabajo con una base de datos, que haga referencia a JSON-SERVER.

**Guard**
 - [x] El token debe existir en el localStorage.
 - [x] Generando un endpoint en el back end, este debe comprobar la veracidad del token.
 - [x] El token se envía con petición GET y por cabecera.
 - [x] Se formatea en el back end y se comprueba.
 - [x] Si la comprobación no da error devuelve un json con el token decodificado.
 - [x] Si devuelve error, el guard lo maneja borrando el token y redirigiendo al login.

De esta manera las rutas protegidas lo estarán por el token verificado.

**Nota:** cabe destacar que si dotamos el token de un tiempo de expiración, al hacer la verificación dará error si el tiempo de expiración ha pasado.

**Login**
  - [x] Spinner en el botón para mostrar que se está haciendo login o esperar errores.
  - [x] Recibir los datos del fomulario.
  - [x] Pedir al servicio que nos devuelva el usuario solicitado por email, manejar el error si no lo encuentra o si el servicio no está disponible.
  - [x] Usar también el servicio para, una vez recuperado el usuario, comprobar (con `bcrypt`) que la password es correcta.
  - [x] Comprobada la password (hash), generar con `jsonwebtoken` un token basado en el id del usuario y el email.
  - [x] Guardar el `token` en `localStorage` para a partir de aquí permitir el resto de operaciones (`guard`).

**Register**
  - [x] Spinner en el botón para mostrar que se está haciendo register o esperar errores.
  - [x] Doble verificación de password.
  - [x] Recibir los datos del fomulario.
  - [x] Pedir al servicio que compruebe la posible existencia de un usuario ya creado con el mismo email.
  - [x] Si no existe el usuario, crearlo y notificarlo.
  - [x] Si existe, devolver notificación.
  - [x] Manejar la posibilidad de que el servicio falle.

### Goal Details Page
**Considerar la creación de componentes independientes para:**
  - [x] La tabla de actividades (`<table mat-table [dataSource]="selectedGoal.activities">`).
  - [x] La barra de progreso (más que un componente, un *pipe* que ayude a darle formato).

**Cálculo del progreso:**
  - [x] Externalizar el cálculo del progreso del objetivo (`goalProgress`) a un método o servicio independiente para mejorar la legibilidad y reutilización del código.

**Inicialización de `Goal`:**
  - [x] Cambiar la inicialización de `selectedGoal` a `undefined` en lugar de `null` para seguir las buenas prácticas en TypeScript.


### Goals Form Component
- [ ] Refactorizar la manera en que se graban los objetivos atacando a JSON SERVER.
- [x] La comprobación del campo KM no está del todo perfilada. Debéria de mostrar error con campo vacío, con campo inferior a 1, y con campo con valores alfabéticos. Este último no lo muestra, y en su lugar muestra el de requerido. **Tiramos de required para pedir un valor válido siempre que este sea vacío o contenga letras.**

- [x] Añadir al botón ***Go For It!*** el tooltip.****

### Goal Details Page Component
**Crear el Componente Goal Details**:
  - [x] Definir y generar el componente.
  - [x] Implementar la lógica para mostrar todos los detalles de un objetivo.

### Goal Service
**Conectar la Lógica de Objetivos**:
  - [x] Actualizar el servicio para manejar objetivos.
  - [x] Integrar el componente Goal con datos reales.

**Actualizar el Objeto Goal**:
  - [x] Añadir el campo `activities` al objeto `Goal` para almacenar el progreso del objetivo.
  - [x] Definir el objeto `Activity` con los campos `date` y `km`.
  - Al añadir correctamente una actividad hay que manejar dos casuísticas.
    - [x] Añadir una notificación temporal que indique que la actividad se ha añadido.
    - [x] Si el objetivo ha sido cumplido, además de notificar la actividad añadida, mostrar una notificación del logro, y... :
      - [x] Manejar la indicación de los KM que quedan a 0 (y que no indique un número negativo).

### Goals Page Component
  - [x] Refactorización de la lógica para atacar a JSON SERVER + gestión de errores (notificaciones)
  - [x] Squeleton para la carga de imágenes/datos.
  - [x] Implementar lógica para utilizar un ID de usuario dinámico al obtener objetivos.

### Gestión de Errores
**Mejorar Manejo de Errores**:
  - [x] Implementar lógica para manejar errores en la carga de objetivos.
  - [x] Visualizar los errores en la plantilla si ocurren.

### Toolbar
**Mejorar el Tool-Bar**:
  - [x] Verificar y ajustar el comportamiento del tool-bar en pantallas pequeñas y grandes.
  - [ ] Cuando se hace zoom en la página, la barra del menú responsivo tiene un comportamiento raro.

### Formulario de Registro
**Ajustar Tooltip en el Formulario de Registro** (Completado):
  - [x] Implementar `matTooltip` en el formulario de registro.
  - [x] Asegurar que el `matTooltip` se desactive correctamente cuando el formulario es válido.