# RUNNING GOALS APP

## TAREAS

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