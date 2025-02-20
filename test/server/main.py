
from src.server import app
import src.services # Carga todas las rutas automáticamente

if __name__ == '__main__':
    app.run(debug=True)  # Solo para desarrollo
