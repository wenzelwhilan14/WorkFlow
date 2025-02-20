
import os
from dotenv import load_dotenv
from twilio.rest import Client

# Cargar variables de entorno desde .env 
load_dotenv()

# Configuración de Twilio
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

# Cliente Twilio
client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)

# NOTA: Tiene que crear un archivo .env para las varibles de entorno
