
from flask import  request, jsonify
from src.server import app
from src.services.routes_google import get_optimized_route_service

@app.route("/route", methods=["POST"])

def get_optimized_route():
    try:
        data = request.json
        start = data.get("start")
        pickups = data.get("pickups", [])

        result, status_code = get_optimized_route_service(start, pickups)

        return jsonify(result), status_code

    except Exception as e:
        print("Error interno en el servidor:", e)
        return jsonify({"error": "Error interno en el servidor"}), 500
