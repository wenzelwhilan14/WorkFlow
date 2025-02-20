from src.server import app
import src.controllers  # Importa todas las rutas automáticamente

if __name__ == '__main__':
    app.run(debug=True)
