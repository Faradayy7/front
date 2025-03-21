const API_URL = "https://backend-8xsi.onrender.com";

async function cargarDispositivosAdmin() {
  try {
    const response = await fetch(`${API_URL}/dispositivos`);
    const dispositivos = await response.json();
    renderizarDispositivosAdmin(dispositivos);
  } catch (error) {
    console.error("Error cargando dispositivos", error);
  }
}

function renderizarDispositivosAdmin(dispositivos) {
  const lista = document.getElementById("lista-dispositivos");
  if (!lista) {
    console.error("No se encontró el contenedor de dispositivos.");
    return;
  }
  lista.innerHTML = "";

  dispositivos.forEach((dispositivo) => {
    lista.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${dispositivo.nombre}</h5>
                    <p class="card-text">${dispositivo.marca} - ${dispositivo.tipo}</p>
                    <button class="btn btn-warning" onclick="editarDispositivo('${dispositivo._id}')">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarDispositivo('${dispositivo._id}')">Eliminar</button>
                </div>
            </div>`;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  cargarDispositivosAdmin();

  const formDispositivo = document.getElementById("form-dispositivo");
  if (formDispositivo) {
    formDispositivo.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nuevoDispositivo = {
        nombre: document.getElementById("nombre").value,
        marca: document.getElementById("marca").value,
        tipo: document.getElementById("tipo").value,
        descripcion: document.getElementById("descripcion").value,
      };

      await fetch(`${API_URL}/dispositivos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoDispositivo),
      });

      formDispositivo.reset();
      cargarDispositivosAdmin();
    });
  } else {
    console.error("No se encontró el formulario de dispositivos.");
  }
});


function editarDispositivo(id) {
  window.location.href = `editar.html?id=${id}`;
}

// Eliminar un dispositivo
async function eliminarDispositivo(id) {
  if (confirm("¿Seguro que deseas eliminar este dispositivo?")) {
    await fetch(`${API_URL}/dispositivos/${id}`, {
      method: "DELETE",
    });
    cargarDispositivosAdmin();
  }
}
