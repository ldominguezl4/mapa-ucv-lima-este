const locations = {
  1: { name: "Oficina de admisión", route: ["Entrada principal", "Siga recto hacia Oficina de admisión"] },
  2: { name: "Pabellón D", route: ["Entrada principal", "Gire a la derecha hacia Pabellón D"] },
  3: { name: "Pabellón C", route: ["Entrada principal", "Gire a la izquierda hacia Pabellón C"] },
  4: { name: "Tópico", route: ["Entrada principal", "Siga hacia Tópico"] },
  5: { name: "Finanzas", route: ["Entrada principal", "Siga recto y luego a la derecha hacia Finanzas"] },
  6: { name: "Pabellón E", route: ["Entrada principal", "Siga recto hacia Pabellón E"] },
  7: { name: "Pabellón F", route: ["Entrada principal", "Siga recto y luego a la izquierda hacia Pabellón F"] },
  8: { name: "Auditorio principal", route: ["Entrada principal", "Siga recto hacia Auditorio principal"] },
  9: { name: "Biblioteca", route: ["Entrada principal", "Gire a la derecha hacia Biblioteca"] },
  10: { name: "Pabellón A", route: ["Entrada principal", "Siga recto hacia Pabellón A"] },
  11: { name: "Pabellón B", route: ["Entrada principal", "Suba al Pabellón B"] },
};

const markers = document.querySelectorAll(".marker");
const routeText = document.getElementById("routeText");
const contrastToggle = document.getElementById("contrastToggle");
const speechToggle = document.getElementById("speechToggle");
const routeSvg = document.getElementById("routeSvg");
let speechActive = false;
let synth = window.speechSynthesis;
let currentSpeech = null;

function speak(text) {
  if (!speechActive) return;
  if (synth.speaking) {
    synth.cancel();
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  synth.speak(utterance);
  currentSpeech = utterance;
}

function showRoute(num) {
  const location = locations[num];
  if (!location) return;
  // Show route instructions text
  routeText.textContent = `Ruta a ${location.name}: ${location.route.join(", ")}`;
  speak(`Ruta a ${location.name}. ${location.route.join(". ")}`);

  // Clear previous route lines
  while (routeSvg.firstChild) {
    routeSvg.removeChild(routeSvg.firstChild);
  }

  // Draw a simple route line from entrance (approx bottom left) to marker position
  const mapSvg = document.getElementById("mapSvg");

  // Entrance point (approx bottom left of SVG)
  const startX = 100;
  const startY = 550;

  // Marker circle element
  const marker = document.querySelector(`circle[data-num='${num}']`);
  if (!marker) return;
  const endX = parseFloat(marker.getAttribute("cx"));
  const endY = parseFloat(marker.getAttribute("cy"));

  // Create SVG group for line and arrow
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  // Create SVG line element
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", endX);
  line.setAttribute("y2", endY);
  line.setAttribute("stroke", "#f59e0b");
  line.setAttribute("stroke-width", "4");
  line.setAttribute("stroke-linecap", "round");

  // Create arrowhead marker
  const arrowId = "arrowhead";
  let defs = mapSvg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    mapSvg.insertBefore(defs, mapSvg.firstChild);
  }
  if (!document.getElementById(arrowId)) {
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", arrowId);
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("refX", "0");
    marker.setAttribute("refY", "3.5");
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0,0 L0,7 L10,3.5 z");
    path.setAttribute("fill", "#f59e0b");
    marker.appendChild(path);
    defs.appendChild(marker);
  }

  line.setAttribute("marker-end", `url(#${arrowId})`);

  group.appendChild(line);
  routeSvg.appendChild(group);
}

markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    const num = marker.getAttribute("data-num");
    showRoute(num);
  });
});

contrastToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

speechToggle.addEventListener("click", () => {
  speechActive = !speechActive;
  speechToggle.textContent = speechActive ? "Guía Hablada: ON" : "Guía Hablada: OFF";
  if (speechActive) {
    // Start reading all locations sequentially
    readAllLocations();
  } else {
    if (synth.speaking) {
      synth.cancel();
    }
  }
});

async function readAllLocations() {
  for (const num in locations) {
    if (!speechActive) break;
    const loc = locations[num];
    showRoute(num);
    speak(`Número ${num}. ${loc.name}.`);
    await waitForSpeechEnd();
  }
}

function waitForSpeechEnd() {
  return new Promise((resolve) => {
    if (!speechActive) {
      resolve();
      return;
    }
    if (!synth.speaking) {
      resolve();
      return;
    }
    const check = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
}
