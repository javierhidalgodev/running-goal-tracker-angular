# RUNNING GOALS APP

## TAREAS

### Refactoring del login/register

  - [ ] Crear un servicio especifico para emular el trabajo con una base de datos, que haga referencia a JSON-SERVER.

**Guard**
 - [ ] El token debe existir en el localStorage.
 - [ ] Generando un endpoint en el back end, este debe comprobar la veracidad del token.
 - [ ] El token se envía con petición GET y por cabecera.
 - [ ] Se formatea en el back end y se comprueba.
 - [ ] Si la comprobación no da error devuelve un json con el token decodificado.
 - [ ] Si devuelve error, el guard lo maneja borrando el token y redirigiendo al login.

De esta manera las rutas protegidas lo estarán por el token verificado.

**Nota:** cabe destacar que si dotamos el token de un tiempo de expiración, al hacer la verificación dará error si el tiempo de expiración ha pasado.

**Login**
  - [x] Recibir los datos del fomulario.
  - [x] Pedir al servicio que nos devuelva el usuario solicitado por email, manejar el error si no lo encuentra o si el servicio no está disponible.
  - [x] Usar también el servicio para, una vez recuperado el usuario, comprobar (con `bcrypt`) que la password es correcta.
  - [x] Comprobada la password (hash), generar con `jsonwebtoken` un token basado en el id del usuario y el email.
  - [x] Guardar el `token` en `localStorage` para a partir de aquí permiti el resto de operaciones (`guard`).

**Register**
  - [ ] Recibir los datos del fomulario.
  - [ ] Pedir al servicio que compruebe la posible existencia de un usuario ya creado con el mismo email.
  - [ ] Si no existe el usuario, crearlo y notificarlo.
  - [ ] Si existe, devolver notificación.
  - [ ] Manejar la posibilidad de que el servicio falle.


### Goal Details Page
**Considerar la creación de componentes independientes para:**
  - [x] La tabla de actividades (`<table mat-table [dataSource]="selectedGoal.activities">`).
  - [x] La barra de progreso (más que un componente, un *pipe* que ayude a darle formato).

**Cálculo del progreso:**
  - [x] Externalizar el cálculo del progreso del objetivo (`goalProgress`) a un método o servicio independiente para mejorar la legibilidad y reutilización del código.

**Inicialización de `Goal`:**
  - [x] Cambiar la inicialización de `selectedGoal` a `undefined` en lugar de `null` para seguir las buenas prácticas en TypeScript.


### Goals Form Component
- [x] La comprobación del campo KM no está del todo perfilada. Debéria de mostrar error con campo vacío, con campo inferior a 1, y con campo con valores alfabéticos. Este último no lo muestra, y en su lugar muestra el de requerido. **Tiramos de required para pedir un valor válido siempre que este sea vacío o contenga letras.**

- [x] Añadir al botón ***Go For It!*** el tooltip.****

### Goal Details Page Component
**Crear el Componente Goal Details**:
  - [x] Definir y generar el componente.
  - [x] Implementar la lógica para mostrar todos los detalles de un objetivo.

### Goal Service
**Conectar la Lógica de Objetivos**:
  - [ ] Actualizar el servicio para manejar objetivos.
  - [ ] Integrar el componente Goal con datos reales.

**Actualizar el Objeto Goal**:
  - [x] Añadir el campo `activities` al objeto `Goal` para almacenar el progreso del objetivo.
  - [x] Definir el objeto `Activity` con los campos `date` y `km`.
  - Al añadir correctamente una actividad hay que manejar dos casuísticas.
    - [ ] Añadir una notificación temporal que indique que la actividad se ha añadido.
    - [ ] Si el objetivo ha sido cumplido, además de notificar la actividad añadida, mostrar una notificación del logro, y... :
      - [ ] Manejar la indicación de los KM que quedan a 0 (y que no indique un número negativo).

### Goals Page Component
**Ajustar ID Dinámico**:
  - [ ] Implementar lógica para utilizar un ID de usuario dinámico al obtener objetivos.

### Gestión de Errores
**Mejorar Manejo de Errores**:
  - [ ] Implementar lógica para manejar errores en la carga de objetivos.
  - [ ] Visualizar los errores en la plantilla si ocurren.

### Toolbar
**Mejorar el Tool-Bar**:
  - [x] Verificar y ajustar el comportamiento del tool-bar en pantallas pequeñas y grandes.
  - [ ] Cuando se hace zoom en la página, la barra del menú responsivo tiene un comportamiento raro.

### Formulario de Registro
**Ajustar Tooltip en el Formulario de Registro** (Completado):
  - [x] Implementar `matTooltip` en el formulario de registro.
  - [x] Asegurar que el `matTooltip` se desactive correctamente cuando el formulario es válido.