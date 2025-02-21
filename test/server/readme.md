<div style="text-align: justify;">

# SERVIDOR DE PRUEBA DE API Y SERVICIOS

</div>

<div style="text-align: justify;">

Este es el servidor de testing donde realizaran las pruebas necesarias y se entenderan el manejo de las API probandolas con configuraciones respectivas

</div>

## INSTRUCIONES DE DESPLIEGUE

<div style="text-align: justify;">

- Crear un entorno virtual dentro de la carpeta "server" e instalar las dependencias del archivo "requeriments.txt" para el correcto funcionamiento.

- Crear un archivo ".env" para almacenar las variables de entorno del servidor que seran las credenciales de los servicios a utilizar.

- Para inicializar el servidor se debe ejecutar el archivo "main.py" que dara inicio al despliegue del servidor.

</div>

### Twilio API (SMS)

<div style="text-align: justify;">

Se utilizo la API de Twilio para enviar mensajes SMS. Sin embargo, cabe recalacar que la version gratuita de este servicio es limitada y es solo para pruebas, la version gratuita solo permite enviar mensajes a numeros verificados por Twilio como mensajes de prueba.

</div>

REQUISITOS NECESARIOS:

<div style="text-align: justify;">

- Crearse una cuenta en [twilio](https://www.twilio.com/es-mx) y registrar su numero telefonico.
- Agregar las credenciasles de la API al archivo ".env " como variables de entorno segun el archivo "config_twilio.py".

</div>
