const params = new URLSearchParams(window.location.search);
const dispositivoId = params.get("id");

if (!dispositivoId || dispositivoId.length !== 24) {
  console.error("Error: ID de dispositivo inválido o faltante.");
  document.body.innerHTML = "<h3>Error: Dispositivo no encontrado.</h3>";
} else {

  fetch(`https://backend-8xsi.onrender.com/dispositivos/${dispositivoId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.error("Error:", data.message);
      } else {
        document.getElementById("nombre").textContent = data.nombre;
        document.getElementById("descripcion").textContent = data.descripcion;
        document.getElementById("imagen").src = data.imagen;
      }
    })
    .catch((error) => console.error("Error al obtener el dispositivo:", error));

  
  fetch(`https://backend-8xsi.onrender.com/comentarios/${dispositivoId}`)
    .then((response) => response.json())
    .then((comentarios) => {
      const comentariosContainer = document.getElementById("comentarios");
      comentariosContainer.innerHTML = ""; // Limpiar antes de agregar nuevos comentarios

      if (comentarios.length === 0) {
        comentariosContainer.innerHTML = "<p>No hay comentarios aún.</p>";
      } else {
        comentarios.forEach((comentario) => {
          const comentarioElemento = document.createElement("div");
          comentarioElemento.classList.add("comentario");
          comentarioElemento.innerHTML = `
                      <strong>${comentario.usuario}:</strong> ${comentario.comentario}
                  `;
          comentariosContainer.appendChild(comentarioElemento);
        });
      }
    })
    .catch((error) => console.error("Error al obtener comentarios:", error));

  
  document
    .getElementById("comentario-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const usuario = document.getElementById("usuario").value;
      const comentario = document.getElementById("comentario").value;

      fetch("https://backend-8xsi.onrender.com/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dispositivoId, usuario, comentario }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Comentario agregado:", data);
          location.reload(); 
        })
        .catch((error) => console.error("Error al enviar comentario:", error));
    });
}
