
from flask import request, jsonify
from src.server import app
from src.services.call_twilio import make_call

@app.route("/make_call", methods=["POST"])
def call():
    data = request.json
    phone_number = data.get("phone_number")
    message = data.get("message")

    if not phone_number or not message:
        return jsonify({"success": False, "error": "Número de teléfono requerido"}), 400

    result = make_call(phone_number, message)
    return jsonify(result)
