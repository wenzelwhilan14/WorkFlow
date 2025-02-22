
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env 
load_dotenv()

# Credenciales de google maps
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Cliente de Google
client = GOOGLE_API_KEY

# NOTA: Tiene que crear un archivo .env para las varibles de entorno
