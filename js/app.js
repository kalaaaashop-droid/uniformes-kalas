/* ============================================================
   ESTADO Y LÓGICA DE LA APLICACIÓN
   Constructor de conjunto de uniformes médicos (scrubs)
   ============================================================ */

const state = {
  shirtId: null,
  pantId: null,
  fabricId: null,
  colorId: null,
  logoId: null,
  sizeId: null,
};

const els = {
  shirts: document.getElementById("shirts-grid"),
  pants: document.getElementById("pants-grid"),
  fabrics: document.getElementById("fabrics-grid"),
  colors: document.getElementById("colors-grid"),
  colorsHint: document.getElementById("colors-hint"),
  logos: document.getElementById("logos-grid"),
  sizes: document.getElementById("sizes-grid"),
  sizeChartTable: document.getElementById("size-chart-table"),
  summaryShirt: document.getElementById("summary-shirt"),
  summaryPant: document.getElementById("summary-pant"),
  summaryFabric: document.getElementById("summary-fabric"),
  summaryColor: document.getElementById("summary-color"),
  summaryLogo: document.getElementById("summary-logo"),
  summarySize: document.getElementById("summary-size"),
  summaryTotal: document.getElementById("summary-total"),
  orderBtn: document.getElementById("order-btn"),
  progressFill: document.getElementById("progress-fill"),
  customOrderText: document.getElementById("custom-order-text"),
  customOrderBtn: document.getElementById("custom-order-btn"),
};

function findById(list, id) {
  return list.find((item) => item.id === id) || null;
}

function money(n) {
  return `$${n.toFixed(2)}`;
}

/* ------------------------------------------------------------
   RENDER: tarjetas seleccionables para camisas y pantalones
   ------------------------------------------------------------ */
function renderGarmentCards(container, items, selectedId, onSelect) {
  container.innerHTML = "";
  items.forEach((item) => {
    const isSelected = item.id === selectedId;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `option-card ${isSelected ? "option-card--selected" : ""}`;
    card.setAttribute("aria-pressed", String(isSelected));
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="option-card__img" loading="lazy" />
      <div class="option-card__body">
        <p class="option-card__name">${item.name}</p>
        <p class="option-card__desc">${item.description}</p>
        <p class="option-card__price">${money(item.price)}</p>
      </div>
      <span class="option-card__check">✓</span>
    `;
    card.addEventListener("click", () => onSelect(item.id));
    container.appendChild(card);
  });
}

/* ------------------------------------------------------------
   RENDER: tarjetas de tela
   ------------------------------------------------------------ */
function renderFabricCards() {
  els.fabrics.innerHTML = "";
  CATALOG.fabrics.forEach((fabric) => {
    const isSelected = fabric.id === state.fabricId;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `option-card ${isSelected ? "option-card--selected" : ""}`;
    card.setAttribute("aria-pressed", String(isSelected));
    const extra = fabric.extraCost > 0 ? `+${money(fabric.extraCost)}` : "Incluida";
    card.innerHTML = `
      <div class="option-card__body">
        <p class="option-card__name">${fabric.name}</p>
        <p class="option-card__desc">${fabric.description}</p>
        <p class="option-card__price">${extra}</p>
      </div>
      <span class="option-card__check">✓</span>
    `;
    card.addEventListener("click", () => selectFabric(fabric.id));
    els.fabrics.appendChild(card);
  });
}

/* ------------------------------------------------------------
   LÓGICA CONDICIONAL CLAVE:
   Los colores disponibles dependen de la tela seleccionada.
   Cada vez que cambia `state.fabricId`, se vuelve a construir
   la paleta de colores a partir de CATALOG.colorsByFabric.
   Si el color previamente elegido no existe en la nueva paleta,
   se limpia la selección para evitar un estado inconsistente
   (por ejemplo: tenías "Rosa Palo" en Algodón y cambias a
   Spandex, que no incluye ese tono).
   ------------------------------------------------------------ */
function renderColorSwatches() {
  const palette = state.fabricId ? CATALOG.colorsByFabric[state.fabricId] : [];

  if (!state.fabricId) {
    els.colors.innerHTML = "";
    els.colorsHint.textContent = "Primero elige una tela para ver los colores disponibles.";
    els.colorsHint.classList.remove("hidden");
    return;
  }

  els.colorsHint.classList.add("hidden");
  els.colors.innerHTML = "";

  palette.forEach((color) => {
    const isSelected = color.id === state.colorId;
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = `color-swatch ${isSelected ? "color-swatch--selected" : ""}`;
    swatch.setAttribute("aria-pressed", String(isSelected));
    swatch.setAttribute("title", color.name);
    swatch.innerHTML = `
      <span class="color-swatch__dot" style="background:${color.hex}"></span>
      <span class="color-swatch__label">${color.name}</span>
    `;
    swatch.addEventListener("click", () => {
      state.colorId = color.id;
      renderColorSwatches();
      updateSummary();
    });
    els.colors.appendChild(swatch);
  });
}

/* ------------------------------------------------------------
   RENDER: tarjetas de logo (Sin logo / DTF / Bordado)
   ------------------------------------------------------------ */
function renderLogoCards() {
  els.logos.innerHTML = "";
  CATALOG.logoOptions.forEach((logo) => {
    const isSelected = logo.id === state.logoId;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `option-card ${isSelected ? "option-card--selected" : ""}`;
    card.setAttribute("aria-pressed", String(isSelected));
    const extra = logo.extraCost > 0 ? `+${money(logo.extraCost)}` : "Sin costo extra";
    card.innerHTML = `
      <div class="option-card__body">
        <p class="option-card__name">${logo.name}</p>
        <p class="option-card__desc">${logo.description}</p>
        <p class="option-card__price">${extra}</p>
      </div>
      <span class="option-card__check">✓</span>
    `;
    card.addEventListener("click", () => selectLogo(logo.id));
    els.logos.appendChild(card);
  });
}

function selectLogo(logoId) {
  state.logoId = logoId;
  renderLogoCards();
  updateSummary();
}

/* ------------------------------------------------------------
   RENDER: tallas y tabla de medidas de referencia
   ------------------------------------------------------------ */
function renderSizeCards() {
  els.sizes.innerHTML = "";
  CATALOG.sizes.forEach((size) => {
    const isSelected = size.id === state.sizeId;
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `size-pill ${isSelected ? "size-pill--selected" : ""}`;
    pill.setAttribute("aria-pressed", String(isSelected));
    const extra = size.extraCost > 0 ? `+${money(size.extraCost)}` : "Incluida";
    pill.innerHTML = `
      <span class="size-pill__name">${size.name}</span>
      <span class="size-pill__price">${extra}</span>
    `;
    pill.addEventListener("click", () => {
      state.sizeId = size.id;
      renderSizeCards();
      updateSummary();
    });
    els.sizes.appendChild(pill);
  });
}

function renderSizeChart() {
  const chart = CATALOG.sizeChart;
  const headerCells = chart.sizes.map((s) => `<th>${s}</th>`).join("");
  const rows = chart.rows
    .map((row) => {
      const cells = row.values.map((v) => `<td>${v}</td>`).join("");
      return `<tr><th scope="row">${row.label}</th>${cells}</tr>`;
    })
    .join("");
  els.sizeChartTable.innerHTML = `
    <thead><tr><th>Medidas (cm)</th>${headerCells}</tr></thead>
    <tbody>${rows}</tbody>
  `;
}

function selectFabric(fabricId) {
  state.fabricId = fabricId;

  // Recalcula la paleta disponible para la nueva tela.
  const palette = CATALOG.colorsByFabric[fabricId] || [];
  const stillAvailable = palette.some((c) => c.id === state.colorId);
  if (!stillAvailable) {
    state.colorId = null; // el color ya no aplica a esta tela
  }

  renderFabricCards();
  renderColorSwatches();
  updateSummary();
}

function selectShirt(id) {
  state.shirtId = id;
  renderGarmentCards(els.shirts, CATALOG.shirts, state.shirtId, selectShirt);
  updateSummary();
}

function selectPant(id) {
  state.pantId = id;
  renderGarmentCards(els.pants, CATALOG.pants, state.pantId, selectPant);
  updateSummary();
}

/* ------------------------------------------------------------
   RESUMEN EN VIVO Y PRECIO TOTAL
   ------------------------------------------------------------ */
function calculateTotal() {
  const shirt = findById(CATALOG.shirts, state.shirtId);
  const pant = findById(CATALOG.pants, state.pantId);
  const fabric = findById(CATALOG.fabrics, state.fabricId);
  const logo = findById(CATALOG.logoOptions, state.logoId);
  const size = findById(CATALOG.sizes, state.sizeId);

  let total = 0;
  if (shirt) total += shirt.price;
  if (pant) total += pant.price;
  if (fabric) total += fabric.extraCost;
  if (logo) total += logo.extraCost;
  if (size) total += size.extraCost;
  return total;
}

function updateSummary() {
  const shirt = findById(CATALOG.shirts, state.shirtId);
  const pant = findById(CATALOG.pants, state.pantId);
  const fabric = findById(CATALOG.fabrics, state.fabricId);
  const palette = state.fabricId ? CATALOG.colorsByFabric[state.fabricId] : [];
  const color = state.colorId ? findById(palette, state.colorId) : null;
  const logo = findById(CATALOG.logoOptions, state.logoId);
  const size = findById(CATALOG.sizes, state.sizeId);

  els.summaryShirt.textContent = shirt ? shirt.name : "Sin seleccionar";
  els.summaryPant.textContent = pant ? pant.name : "Sin seleccionar";
  els.summaryFabric.textContent = fabric ? fabric.name : "Sin seleccionar";
  els.summaryColor.textContent = color ? color.name : "Sin seleccionar";
  els.summaryLogo.textContent = logo ? logo.name : "Sin seleccionar";
  els.summarySize.textContent = size ? size.name : "Sin seleccionar";

  if (color) {
    els.summaryColor.style.setProperty("--dot-color", color.hex);
    els.summaryColor.classList.add("summary-value--with-dot");
  } else {
    els.summaryColor.classList.remove("summary-value--with-dot");
  }

  els.summaryTotal.textContent = money(calculateTotal());

  const complete = shirt && pant && fabric && color && logo && size;
  els.orderBtn.disabled = !complete;
  els.orderBtn.classList.toggle("btn-disabled", !complete);

  updateProgress();
}

function updateProgress() {
  const steps = [state.shirtId, state.pantId, state.fabricId, state.colorId, state.logoId, state.sizeId];
  const done = steps.filter(Boolean).length;
  const pct = (done / steps.length) * 100;
  els.progressFill.style.width = `${pct}%`;
}

/* ------------------------------------------------------------
   PEDIDO POR WHATSAPP
   ------------------------------------------------------------ */
function buildWhatsAppMessage() {
  const shirt = findById(CATALOG.shirts, state.shirtId);
  const pant = findById(CATALOG.pants, state.pantId);
  const fabric = findById(CATALOG.fabrics, state.fabricId);
  const palette = state.fabricId ? CATALOG.colorsByFabric[state.fabricId] : [];
  const color = findById(palette, state.colorId);
  const logo = findById(CATALOG.logoOptions, state.logoId);
  const size = findById(CATALOG.sizes, state.sizeId);
  const total = calculateTotal();

  const lines = [
    "¡Hola! Quiero pedir un uniforme médico personalizado:",
    `• Camisa: ${shirt.name}`,
    `• Pantalón: ${pant.name}`,
    `• Tela: ${fabric.name}`,
    `• Color: ${color.name}`,
    `• Logo: ${logo.name}`,
    `• Talla: ${size.name}`,
    `• Total estimado: ${money(total)}`,
    "",
    "Quedo atent@ para coordinar medidas y forma de pago. ¡Gracias!",
  ];

  return encodeURIComponent(lines.join("\n"));
}

function handleOrderClick() {
  if (els.orderBtn.disabled) return;
  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ------------------------------------------------------------
   PEDIDO PERSONALIZADO
   Para clientas que quieren un modelo que no está en el catálogo.
   ------------------------------------------------------------ */
function buildCustomOrderMessage(description) {
  const lines = [
    "¡Hola! Quiero hacer un pedido personalizado que no encontré en el catálogo:",
    "",
    description,
    "",
    "Quedo atent@ para coordinar los detalles. ¡Gracias!",
  ];
  return encodeURIComponent(lines.join("\n"));
}

function handleCustomOrderClick() {
  if (els.customOrderBtn.disabled) return;
  const description = els.customOrderText.value.trim();
  if (!description) return;
  const message = buildCustomOrderMessage(description);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ------------------------------------------------------------
   INICIALIZACIÓN
   ------------------------------------------------------------ */
function init() {
  renderGarmentCards(els.shirts, CATALOG.shirts, state.shirtId, selectShirt);
  renderGarmentCards(els.pants, CATALOG.pants, state.pantId, selectPant);
  renderFabricCards();
  renderColorSwatches();
  renderLogoCards();
  renderSizeCards();
  renderSizeChart();
  updateSummary();
  els.orderBtn.addEventListener("click", handleOrderClick);

  els.customOrderText.addEventListener("input", () => {
    const hasText = els.customOrderText.value.trim().length > 0;
    els.customOrderBtn.disabled = !hasText;
    els.customOrderBtn.classList.toggle("btn-disabled", !hasText);
  });
  els.customOrderBtn.addEventListener("click", handleCustomOrderClick);
}

document.addEventListener("DOMContentLoaded", init);
