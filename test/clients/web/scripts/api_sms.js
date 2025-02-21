function loadService(service) {
    let templatePath = "";

    switch (service) {
        case 'sms':
            templatePath = "templates/form_sms.html";
            break;
        case '':
            templatePath = "";
            break;
        case '':
            templatePath = "";
            break;
        default:
            document.getElementById("form-container").innerHTML = "<p>Servicio no encontrado.</p>";
            return;
    }

    
    fetch(templatePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById("form-container").innerHTML = html;


            if (service === 'sms') {
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
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    phone_number: phoneNumber,
                                    message: message
                                })
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
        })
        .catch(error => console.error("Error cargando el servicio:", error));
}
