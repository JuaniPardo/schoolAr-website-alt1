# Configuración de EmailJS para el Formulario de Contacto

Este documento explica cómo configurar EmailJS para que funcione con el formulario de contacto de SchoolAR.

## Pasos para configurar EmailJS

1. **Crear una cuenta en EmailJS**
   - Regístrate en [EmailJS](https://www.emailjs.com/)
   - Inicia sesión en tu cuenta

2. **Configurar un servicio de email**
   - Ve a la sección "Email Services" en el dashboard
   - Haz clic en "Add New Service"
   - Selecciona tu proveedor de email (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectar tu cuenta de email

3. **Crear una plantilla de email**
   - Ve a la sección "Email Templates" en el dashboard
   - Haz clic en "Create New Template"
   - Puedes usar el contenido del archivo `contact/automated-response.html` como base
   - Asegúrate de usar las variables del formulario en tu plantilla:
     - `{{name}}` - Nombre del usuario
     - `{{email}}` - Email del usuario
     - `{{message}}` - Mensaje del usuario
     - `{{subject}}` - Asunto seleccionado
     - `{{school}}` - Institución educativa (si se proporciona)
     - `{{phone}}` - Teléfono (si se proporciona)

4. **Obtener tus IDs**
   - **User ID**: Ve a la sección "Integration" y copia tu User ID
   - **Service ID**: Ve a la sección "Email Services" y copia el ID de tu servicio
   - **Template ID**: Ve a la sección "Email Templates" y copia el ID de tu plantilla

5. **Actualizar el código**
   - Abre el archivo `contact.html` y reemplaza `YOUR_USER_ID` con tu User ID
   - Abre el archivo `js/script.js` y reemplaza:
     - `service_id` con tu Service ID
     - `template_id` con tu Template ID

## Prueba del formulario

Una vez configurado, puedes probar el formulario de contacto:

1. Completa todos los campos requeridos
2. Envía el formulario
3. Deberías recibir un email de confirmación en la dirección proporcionada

## Personalización adicional

Puedes personalizar aún más la integración de EmailJS:

- **Plantillas múltiples**: Crea diferentes plantillas para diferentes tipos de consultas
- **Respuestas automáticas**: Configura respuestas automáticas personalizadas según el asunto seleccionado
- **Notificaciones internas**: Configura notificaciones para el equipo cuando se recibe un nuevo mensaje

## Solución de problemas

Si encuentras problemas con la integración de EmailJS:

1. Verifica que los IDs (User ID, Service ID, Template ID) sean correctos
2. Asegúrate de que tu servicio de email esté correctamente configurado
3. Revisa la consola del navegador para ver si hay errores
4. Consulta la [documentación oficial de EmailJS](https://www.emailjs.com/docs/) para más información