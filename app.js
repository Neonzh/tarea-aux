const campo = document.getElementById("nota");
const lista = document.getElementById("lista");

document.getElementById("agregar").addEventListener("click", function () {
  const li = document.createElement("li");
  li.textContent = campo.value;
  lista.appendChild(li);
  campo.value = "";
});

document.getElementById("borrar").addEventListener("click", function (evento) {
  evento.preventDefault();
  lista.innerHTML = "";
});
