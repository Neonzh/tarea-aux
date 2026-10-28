const formulario = document.getElementById("formulario");
const campoNota = document.getElementById("nota");
const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const botonLimpiar = document.getElementById("limpiar");

let siguienteId = 1;
let notas = [];

function mostrarMensaje(texto, tipo = "info", incluirDeshacer = false, accionDeshacer = null) {
  mensaje.replaceChildren();
  mensaje.className = "mensaje " + tipo;
  mensaje.append(document.createTextNode(texto + " "));
  if (incluirDeshacer && accionDeshacer) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "boton-secundario";
    boton.textContent = "Deshacer";
    boton.addEventListener("click", accionDeshacer);
    mensaje.append(boton);
  }
}

function actualizarInterfaz() {
  lista.replaceChildren();
  notas.forEach((nota) => {
    const item = document.createElement("li");
    item.className = "nota-item";
    const texto = document.createElement("span");
    texto.className = "nota-texto";
    texto.textContent = nota.texto;
    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "boton-eliminar";
    eliminar.textContent = "Eliminar";
    eliminar.setAttribute("aria-label", "Eliminar nota: " + nota.texto.slice(0, 40));
    eliminar.addEventListener("click", () => eliminarUnaNota(nota.id));
    item.append(texto, eliminar);
    lista.append(item);
  });
  vacio.hidden = notas.length > 0;
  total.textContent = notas.length + (notas.length === 1 ? " nota" : " notas");
  botonLimpiar.disabled = notas.length === 0;
}

function agregarNota(evento) {
  evento.preventDefault();
  const texto = campoNota.value.trim();
  if (!texto) {
    mostrarMensaje("Escribe una nota antes de agregarla.", "error");
    campoNota.focus();
    return;
  }
  notas.push({ id: siguienteId++, texto });
  campoNota.value = "";
  contador.textContent = "0 de 300 caracteres";
  actualizarInterfaz();
  mostrarMensaje("Nota agregada.", "exito");
  campoNota.focus();
}

function eliminarUnaNota(id) {
  const indice = notas.findIndex((nota) => nota.id === id);
  if (indice === -1) return;
  const respaldo = notas[indice];
  notas.splice(indice, 1);
  actualizarInterfaz();
  mostrarMensaje("Nota eliminada.", "info", true, () => {
    notas.splice(indice, 0, respaldo);
    actualizarInterfaz();
    mostrarMensaje("Se restauró la nota.", "exito");
  });
}

function limpiarNotas() {
  if (notas.length === 0) return;
  if (!window.confirm("¿Quieres eliminar todas las notas? Puedes cancelar esta acción.")) {
    mostrarMensaje("No se eliminó ninguna nota.", "info");
    return;
  }
  const respaldo = [...notas];
  notas = [];
  actualizarInterfaz();
  mostrarMensaje("Se eliminaron todas las notas.", "info", true, () => {
    notas = respaldo;
    actualizarInterfaz();
    mostrarMensaje("Se restauraron todas las notas.", "exito");
  });
}

formulario.addEventListener("submit", agregarNota);
botonLimpiar.addEventListener("click", limpiarNotas);
campoNota.addEventListener("input", () => {
  contador.textContent = campoNota.value.length + " de 300 caracteres";
});
actualizarInterfaz();
