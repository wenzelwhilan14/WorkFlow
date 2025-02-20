from flask import request, jsonify
from src.server import app
from src.services.sms_twilio import send_sms

@app.route('/send_sms', methods=['POST'])
def send_sms_api():

    # Endpoint para enviar un SMS.
    # Recibe un JSON con "phone_number" y "message".

    data = request.get_json()
    phone_number = data.get("phone_number")
    message = data.get("message")

    if not phone_number or not message:
        return jsonify({"error": "Número de teléfono y mensaje son requeridos"}), 400

    response = send_sms(phone_number, message)
    return jsonify(response), (200 if response["success"] else 500)
