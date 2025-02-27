
from src.config.config_twilio import client, TWILIO_PHONE_NUMBER

def make_call(phone_number,message):

    # Hace una llamada a un número específico usando Twilio.

    try:
        call = client.calls.create(
            twiml=f"""
            <Response>
              <Say voice="Polly.Conchita">
              {message}
              </Say>
            </Response>
            """,
            to=phone_number,
            from_=TWILIO_PHONE_NUMBER
        )
        return {"success": True, "call_sid": call.sid}
    except Exception as e:
        return {"success": False, "error": str(e)}
    