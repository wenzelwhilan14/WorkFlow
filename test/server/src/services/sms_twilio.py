
from src.config.config_twilio import client, TWILIO_PHONE_NUMBER

def send_sms(phone_number, message):

    # Envía un SMS a un número específico usando Twilio.

    try:
        sms = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return {"success": True, "message_sid": sms.sid}
    except Exception as e:
        return {"success": False, "error": str(e)}
