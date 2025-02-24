import requests
from src.config.config_google import client

def get_optimized_route_service(start, pickups):
    if not start or not pickups:
        return {"error": "Faltan parámetros"}, 400

    waypoints = "|".join([f"{p['lat']},{p['lng']}" for p in pickups])

    url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        "origin": f"{start['lat']},{start['lng']}",
        "destination": f"{pickups[-1]['lat']},{pickups[-1]['lng']}",
        "waypoints": f"optimize:true|{waypoints}", 
        "key": client
    }

    response = requests.get(url, params=params)
    route_data = response.json()

    if route_data.get("status") != "OK":
        return {"error": "No se encontró una ruta válida", "details": route_data}, 500

    optimized_order = route_data["routes"][0].get("waypoint_order", [])

    if not optimized_order:
        return {"error": "No se pudo optimizar la ruta"}, 500

    last_waypoint_index = optimized_order[-1]
    destination = pickups[last_waypoint_index] if last_waypoint_index is not None else pickups[-1]

    route_data["optimized_destination"] = destination

    return route_data, 200
