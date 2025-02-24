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

### Twilio API (Call)

<div style="text-align: justify;">

Se utilizo la API de Twilio para enviar hacer llamadas. Sin embargo, cabe recalacar que la version gratuita de este servicio es limitada y es solo para pruebas, la version gratuita solo permite hacer llamadas a numeros verificados por Twilio como llamadas de prueba.

**Nota:** Recalcamos que la version de prueba en llamada primero te contestara un voz predeterminada tienes que presionar un numero para que se ejecute o reproduzca el mensaje de tu codigo.

</div>

REQUISITOS NECESARIOS:

<div style="text-align: justify;">

- Crearse una cuenta en [twilio](https://www.twilio.com/es-mx) y registrar su numero telefonico.
- Agregar las credenciasles de la API al archivo ".env " como variables de entorno segun el archivo "config_twilio.py".

</div>

### Google Maps API (JS maps)

<div style="text-align: justify;">

Se utilizo la API de Google Google para poder visualizar el mapa. Sin embargo, cabe recalacar que al entrar a la pagina desde tu navegador en una computadora existe la probabilidad de que no tengas acceso o tu ubicacion salga erronea debido a la API de tu internet y configuraciones de tu computador.

**Nota:** Recalcamos que para la prueba gratuita se tiene que registrar una tarjeta con un valor equivalente a 5 dolares en tu moneda local, se consumira par de dicho valor para la verificacion pero posteriormente se hara la devolucion del monto. Tambien recalcamos que para que aplicacion funcione tiene que habilitarse la API "Maps JavaScript API "

</div>

REQUISITOS NECESARIOS:

<div style="text-align: justify;">

- Crearse una cuenta en [Google cloud](https://cloud.google.com/functions) y registrar un tarjeta para poder entrar a la prueba gratuita.
- Agregar las credenciasles de la API al archivo ".env " como variables de entorno segun el archivo "config_google.py".

</div>

### Google Maps API (ROUTE OPTIMIZE)

<div style="text-align: justify;">

Se utilizo la API de Google Google para optimizar la ruta y mostrarlo en el mapa. Sin embargo, cabe recalacar que la version de prueba solo permite un maximo de 10 punto para optimizar la ruta. Tambien mencionamos que sin importar el resgistro de los puntos en mapa la API buscara la mejor ruta.

**Nota:** Recalcamos que para la prueba gratuita se tiene que registrar una tarjeta con un valor equivalente a 5 dolares en tu moneda local, se consumira par de dicho valor para la verificacion pero posteriormente se hara la devolucion del monto. Tambien recalcamos que para que aplicacion funcione tiene que habilitarse la API "Directions API"

</div>

REQUISITOS NECESARIOS:

<div style="text-align: justify;">

- Crearse una cuenta en [Google cloud](https://cloud.google.com/functions) y registrar un tarjeta para poder entrar a la prueba gratuita.
- Agregar las credenciasles de la API al archivo ".env " como variables de entorno segun el archivo "config_google.py".

</div>
