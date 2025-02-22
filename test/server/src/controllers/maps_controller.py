
from flask import jsonify
from src.server import app
from src.services.maps_google import get_maps

@app.route('/maps', methods=['GET'])

def get_maps_api():
    return jsonify({"key_maps": get_maps()})