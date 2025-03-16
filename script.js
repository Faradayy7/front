const API_URL = "https://backend-8xsi.onrender.com";

// Cargar dispositivos desde la API
async function cargarDispositivos() {
  try {
    const response = await fetch(`${API_URL}/dispositivos`);
    const dispositivos = await response.json();
    renderizarDispositivos(dispositivos);
  } catch (error) {
    console.error("Error cargando dispositivos", error);
  }
}

// Renderizar dispositivos en la página
function renderizarDispositivos(dispositivos) {
  const lista = document.getElementById("lista-dispositivos");
  lista.innerHTML = "";

  dispositivos.forEach((dispositivo) => {
    lista.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${dispositivo.imagen}" class="card-img-top" alt="${dispositivo.nombre}" onerror="this.onerror=null; this.src='default.jpg';">
                    <div class="card-body">
                        <h5 class="card-title">${dispositivo.nombre}</h5>
                        <p class="card-text">${dispositivo.marca} - ${dispositivo.tipo}</p>
                        <a href="detalle.html?id=${dispositivo._id}" class="btn btn-primary">Ver detalles</a>
                    </div>
                </div>
            </div>`;
  });
}

// Filtrar dispositivos según búsqueda y filtros
function filtrarDispositivos() {
  const busqueda = document.getElementById("search").value.toLowerCase();
  const marca = document.getElementById("filtro-marca").value;
  const tipo = document.getElementById("filtro-tipo").value;

  fetch(`${API_URL}/dispositivos`)
    .then((response) => response.json())
    .then((dispositivos) => {
      const filtrados = dispositivos.filter(
        (dispositivo) =>
          dispositivo.nombre.toLowerCase().includes(busqueda) &&
          (marca === "" || dispositivo.marca === marca) &&
          (tipo === "" || dispositivo.tipo === tipo)
      );
      renderizarDispositivos(filtrados);
    });
}

// Eventos de búsqueda y filtrado
document
  .getElementById("search")
  .addEventListener("input", filtrarDispositivos);
document
  .getElementById("filtro-marca")
  .addEventListener("change", filtrarDispositivos);
document
  .getElementById("filtro-tipo")
  .addEventListener("change", filtrarDispositivos);

// Cargar dispositivos al iniciar la página
window.onload = cargarDispositivos;
