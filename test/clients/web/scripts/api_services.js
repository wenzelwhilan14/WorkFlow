function loadService(service) {
  let templatePath = "";

  switch (service) {
    case "sms":
      templatePath = "templates/form_sms.html";
      break;
    case "call":
      templatePath = "templates/form_call.html";
      break;
    case "map":
      templatePath = "templates/form_map.html";
      break;
    default:
      document.getElementById("form-container").innerHTML =
        "<p>Servicio no encontrado.</p>";
      return;
  }

  fetch(templatePath)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("form-container").innerHTML = html;

      if (service === "sms") {
        setupSmsForm();
      } else if (service === "call") {
        setupCallForm();
      } else if (service === "map") {
        setupMap();
      }
    })
    .catch((error) => console.error("Error cargando el servicio:", error));
}

function setupSmsForm() {
  const form = document.getElementById("smsForm");
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const phoneNumber = document.getElementById("phone_number").value;
      const message = document.getElementById("message").value;
      const responseMessage = document.getElementById("responseMessage");

      try {
        const response = await fetch("http://127.0.0.1:5000/send_sms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            message: message,
          }),
        });

        const data = await response.json();

        if (data.success) {
          responseMessage.innerHTML = "✅ Mensaje enviado con éxito.";
          responseMessage.style.color = "green";
        } else {
          responseMessage.innerHTML = `❌ Error: ${data.error}`;
          responseMessage.style.color = "red";
        }
      } catch (error) {
        responseMessage.innerHTML = "❌ Error al conectar con la API.";
        responseMessage.style.color = "red";
      }
    });
  }
}

function setupCallForm() {
  const form = document.getElementById("callForm");
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const phoneNumber = document.getElementById("phone_number").value;
      const message = document.getElementById("message").value;
      const responseMessage = document.getElementById("callResponseMessage");

      try {
        const response = await fetch("http://127.0.0.1:5000/make_call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
            message: message,
          }),
        });

        const data = await response.json();

        if (data.success) {
          responseMessage.innerHTML = "✅ Llamada realizada con éxito.";
          responseMessage.style.color = "green";
        } else {
          responseMessage.innerHTML = `❌ Error: ${data.error}`;
          responseMessage.style.color = "red";
        }
      } catch (error) {
        responseMessage.innerHTML = "❌ Error al conectar con la API.";
        responseMessage.style.color = "red";
      }
    });
  }
}

function setupMap() {
  if (!document.getElementById("google-maps-script")) {
    fetch("http://127.0.0.1:5000/maps")
      .then((response) => response.json())
      .then((data) => {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key_maps}&libraries=marker&callback=initMap&loading=async&defer`;

        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      })
      .catch((error) => console.error("Error obteniendo la API Key:", error));
  } else {
    initMap();
  }
}

let map, directionsRenderer, directionsService;
let userLocation = null;
let pickups = [];
let markers = [];
let userMarker, accuracyCircle;
let firstPositionUpdate = true;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -12.0659, lng: -77.1181 },
    zoom: 13,
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updatePosition, handleLocationError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    });
  } else {
    alert("⚠️ Tu navegador no soporta geolocalización.");
  }

  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    preserveViewport: true,
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer.setMap(map);

  // 🎯 Aseguramos que los clics en el mapa se detectan
  google.maps.event.addListener(map, "click", function (event) {
    console.log("Click en: ", event.latLng.lat(), event.latLng.lng()); // <-- Verifica si aparece en consola
    addPickupPoint(event.latLng);
  });
}

function updatePosition(position) {
  userLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  if (firstPositionUpdate) {
    map.setCenter(userLocation);
    firstPositionUpdate = false;
  }

  if (!userMarker) {
    userMarker = new google.maps.Marker({
      position: userLocation,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "white",
      },
    });

    accuracyCircle = new google.maps.Circle({
      strokeColor: "#4285F4",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#4285F4",
      fillOpacity: 0.2,
      map: map,
      center: userLocation,
      radius: 100,
      clickable: false,
    });
  } else {
    userMarker.setPosition(userLocation);
    accuracyCircle.setCenter(userLocation);
    accuracyCircle.setRadius(100);
  }
}

function handleLocationError(error) {
  console.error("Error obteniendo la ubicación:", error);
  alert("⚠️ No se pudo obtener tu ubicación. Revisa los permisos.");
}

function addPickupPoint(location) {
  if (pickups.length >= 5) {
    alert("Máximo 5 puntos de recogida permitidos.");
    return;
  }

  let marker = new google.maps.Marker({
    position: location,
    map: map,
    label: (pickups.length + 1).toString(),
    title: "Punto de recogida " + (pickups.length + 1),
  });

  pickups.push({ lat: location.lat(), lng: location.lng() });
  markers.push(marker);
}

async function calculateRoute() {
  const statusElement = document.getElementById("status");

  if (!statusElement) {
    console.error("❌ Error: No se encontró el elemento con id 'status'.");
    alert("❌ Error interno: No se encontró el estado de la ruta.");
    return;
  }

  if (pickups.length === 0) {
    alert("⚠️ Selecciona al menos un punto de recogida.");
    return;
  }

  statusElement.innerText = "Calculando ruta... ⏳";

  try {
    const response = await fetch("http://localhost:5000/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start: userLocation, pickups }),
    });

    const data = await response.json();

    if (!data.routes) throw new Error("No se encontró una ruta válida");

    // 📌 Extraemos el destino optimizado de la API
    const destination = data.optimized_destination;

    if (!destination || !destination.lat || !destination.lng) {
      console.error("❌ Error: El destino no está definido correctamente.");
      alert("Error: El destino no es válido.");
      return;
    }

    const directionsRequest = {
      origin: new google.maps.LatLng(userLocation.lat, userLocation.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      waypoints: pickups.map((p) => ({
        location: new google.maps.LatLng(p.lat, p.lng),
        stopover: true,
      })),
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(directionsRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        statusElement.innerText = "¡Ruta optimizada correctamente! ✅";
      } else {
        statusElement.innerText = "Error en la API de Google Maps ❌";
        console.error("Error en la API de Google Maps:", status);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    statusElement.innerText = "❌ Error al calcular la ruta.";
  }
}
