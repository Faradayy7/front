const API_URL = "https://backend-8xsi.onrender.com";


document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "admin.html"; 
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error en la autenticación", error);
  }
});
