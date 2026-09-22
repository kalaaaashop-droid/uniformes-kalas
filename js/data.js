/* ============================================================
   DATOS MOCK — catálogo de uniformes médicos (scrubs)
   Reemplaza imágenes, precios y textos por los reales cuando
   tengas fotos y precios definitivos.
   ============================================================ */

const CATALOG = {
  // Paso 1: Camisas (filipinas)
  shirts: [
    {
      id: "shirt-v",
      name: "Cuello V Clásica",
      description: "Corte recto, escote en V, bolsillo frontal.",
      price: 18,
      image: "img/productos/camisa-cuello-v-clasica.jpg",
    },
    {
      id: "shirt-v-bolsillo",
      name: "Cuello en V Moderno",
      description: "Escote en V, bolsillo frontal para bordado o logo.",
      price: 19,
      image: "img/productos/camisa-cuello-v-bolsillo.jpg",
    },
    {
      id: "shirt-v-delgado",
      name: "Cuello en V Delgado",
      description: "Escote en V, tela ligera, manga corta, bolsillo lateral.",
      price: 19,
      image: "img/productos/camisa-cuello-v-delgado.jpg",
    },
    {
      id: "shirt-redonda",
      name: "Cuello Redondo Fit",
      description: "Entallada, cuello redondo, muy cómoda.",
      price: 17,
      image: "https://placehold.co/400x400/E8F4F1/0F5C4C?text=Filipina+Redonda",
    },
    {
      id: "shirt-mao-grueso",
      name: "Cuello Mao Grueso",
      description: "Cuello mao reforzado, manga corta, ajuste recto.",
      price: 19,
      image: "img/productos/camisa-cuello-mao-grueso.jpg",
    },
    {
      id: "shirt-mao-fino",
      name: "Cuello Mao Delgado",
      description: "Cuello mao delgado, manga corta, ajuste recto.",
      price: 19,
      image: "img/productos/camisa-cuello-mao-fino.jpg",
    },
  ],

  // Paso 2: Pantalones
  pants: [
    {
      id: "pant-jogger",
      name: "Jogger Elástico",
      description: "Tobillo ajustado, cintura elástica con cordón.",
      price: 16,
      image: "https://placehold.co/400x400/EAF1F8/0B3D5C?text=Pantalon+Jogger",
    },
    {
      id: "pant-recto",
      name: "Recto Clásico",
      description: "Corte recto tradicional, cintura elástica.",
      price: 15,
      image: "https://placehold.co/400x400/EAF1F8/0B3D5C?text=Pantalon+Recto",
    },
    {
      id: "pant-cargo",
      name: "Cargo Multibolsillos",
      description: "Bolsillos laterales tipo cargo, muy funcional.",
      price: 19,
      image: "https://placehold.co/400x400/EAF1F8/0B3D5C?text=Pantalon+Cargo",
    },
    {
      id: "pant-skinny",
      name: "Skinny Tiro Alto",
      description: "Entallado, tiro alto, silueta moderna.",
      price: 17,
      image: "https://placehold.co/400x400/EAF1F8/0B3D5C?text=Pantalon+Skinny",
    },
  ],

  // Paso 3: Telas (cada una define cuánto suma al precio base)
  fabrics: [
    {
      id: "fabric-antifluido",
      name: "Antifluido Clásico",
      description: "Repele líquidos, transpirable, ideal para jornadas largas.",
      extraCost: 0,
      image: "https://placehold.co/400x260/F4F1E8/6B5B00?text=Antifluido+Clasico",
    },
    {
      id: "fabric-spandex",
      name: "Spandex / Stretch Premium",
      description: "Máxima elasticidad, se ajusta al cuerpo, gran comodidad.",
      extraCost: 4,
      image: "https://placehold.co/400x260/F4F1E8/6B5B00?text=Spandex+Stretch",
    },
    {
      id: "fabric-algodon",
      name: "Algodón Premium",
      description: "Suave, fresco y liviano, excelente para climas cálidos.",
      extraCost: 2,
      image: "https://placehold.co/400x260/F4F1E8/6B5B00?text=Algodon+Premium",
    },
  ],

  /* ------------------------------------------------------------
     LÓGICA CONDICIONAL: colores disponibles por tela.
     La clave debe coincidir con el id de cada tela en `fabrics`.
     Cada tela puede tener una paleta distinta (distinta cantidad
     y distintos tonos), y el color seleccionado se recalcula
     cada vez que el usuario cambia de tela (ver app.js).
     ------------------------------------------------------------ */
  colorsByFabric: {
    "fabric-antifluido": [
      { id: "azul-cielo", name: "Azul Cielo", hex: "#8FC7E8" },
      { id: "azul-marino", name: "Azul Marino", hex: "#1F3B5C" },
      { id: "verde-quirurgico", name: "Verde Quirúrgico", hex: "#4B7B6B" },
      { id: "verde-menta", name: "Verde Menta", hex: "#9FD8C8" },
      { id: "blanco", name: "Blanco", hex: "#FFFFFF" },
      { id: "gris-perla", name: "Gris Perla", hex: "#C3C7CC" },
      { id: "negro", name: "Negro", hex: "#1B1B1D" },
      { id: "vino-tinto", name: "Vino Tinto", hex: "#6E2436" },
      { id: "morado", name: "Morado", hex: "#6B4E9B" },
      { id: "turquesa", name: "Turquesa", hex: "#2FA6A0" },
    ],
    "fabric-spandex": [
      { id: "azul-marino", name: "Azul Marino", hex: "#1F3B5C" },
      { id: "negro", name: "Negro", hex: "#1B1B1D" },
      { id: "gris-perla", name: "Gris Perla", hex: "#C3C7CC" },
      { id: "verde-menta", name: "Verde Menta", hex: "#9FD8C8" },
      { id: "vino-tinto", name: "Vino Tinto", hex: "#6E2436" },
    ],
    "fabric-algodon": [
      { id: "blanco", name: "Blanco", hex: "#FFFFFF" },
      { id: "azul-cielo", name: "Azul Cielo", hex: "#8FC7E8" },
      { id: "verde-menta", name: "Verde Menta", hex: "#9FD8C8" },
      { id: "gris-perla", name: "Gris Perla", hex: "#C3C7CC" },
      { id: "negro", name: "Negro", hex: "#1B1B1D" },
      { id: "rosa-palo", name: "Rosa Palo", hex: "#E3B7B0" },
    ],
  },
};

// Número de WhatsApp de contacto (formato internacional, sin "+" ni espacios).
// TODO: reemplaza con el número real del negocio de uniformes.
const WHATSAPP_NUMBER = "584140000000";
