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
      price: 15,
      image: "img/productos/camisa-cuello-v-clasica.jpg",
    },
    {
      id: "shirt-v-bolsillo",
      name: "Cuello en V Moderno",
      description: "Escote en V, bolsillo frontal para bordado o logo.",
      price: 15,
      image: "img/productos/camisa-cuello-v-bolsillo.jpg",
    },
    {
      id: "shirt-v-delgado",
      name: "Cuello en V Delgado",
      description: "Escote en V, tela ligera, manga corta, bolsillo lateral.",
      price: 15,
      image: "img/productos/camisa-cuello-v-delgado.jpg",
    },
    {
      id: "shirt-cierre",
      name: "Cuello con Cierre",
      description: "Cuello alto con zíper frontal, manga corta, ajuste recto.",
      price: 15,
      image: "img/productos/camisa-cuello-cierre.jpg",
    },
    {
      id: "shirt-mao-grueso",
      name: "Cuello Mao Grueso",
      description: "Cuello mao reforzado, manga corta, ajuste recto.",
      price: 15,
      image: "img/productos/camisa-cuello-mao-grueso.jpg",
    },
    {
      id: "shirt-mao-fino",
      name: "Cuello Mao Delgado",
      description: "Cuello mao delgado, manga corta, ajuste recto.",
      price: 15,
      image: "img/productos/camisa-cuello-mao-fino.jpg",
    },
  ],

  // Paso 2: Pantalones
  pants: [
    {
      id: "pant-cargo",
      name: "Cargo Multibolsillos",
      description: "Bolsillo cargo tipo parche, uno de cada lado, bota ancha. <strong>Puedes elegir entre pretina lisa y arruchada.</strong>",
      price: 15,
      image: "img/productos/pantalon-cargo-multibolsillos.jpg",
    },
    {
      id: "pant-bolsillo-clasico",
      name: "Bolsillo Clásico",
      description: "Bolsillo lateral de parche, corte recto, cintura elástica.",
      price: 15,
      image: "img/productos/pantalon-bolsillo-clasico.jpg",
    },
    {
      id: "pant-bolsillo-superior-expuesto",
      name: "Bolsillo Superior Expuesto",
      description: "Cintura elástica con cordón. <strong>Va junto al Bolsillo Clásico y puedes elegir entre cargo y bota recta.</strong>",
      price: 15,
      image: "img/productos/pantalon-bolsillo-superior-expuesto.jpg",
    },
  ],

  // Paso 3: Telas (cada una define cuánto suma al precio base)
  // Microfibra cuesta $5 menos que Stretch.
  fabrics: [
    {
      id: "fabric-microfibra",
      name: "Microfibra",
      description: "Tela clásica de uniformes médicos, liviana y de fácil cuidado.",
      extraCost: 0,
      image: "https://placehold.co/400x260/F4F1E8/6B5B00?text=Microfibra",
    },
    {
      id: "fabric-stretch",
      name: "Stretch",
      description: "Máxima elasticidad, se ajusta al cuerpo, gran comodidad.",
      extraCost: 5,
      image: "https://placehold.co/400x260/F4F1E8/6B5B00?text=Stretch",
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
    "fabric-microfibra": [
      { id: "rosa-palo", name: "Rosa Palo", hex: "#AA7076" },
      { id: "blanco-micro", name: "Blanco", hex: "#FFFFFF" },
      { id: "vino-tinto", name: "Vino Tinto", hex: "#74243F" },
      { id: "verde-bosque", name: "Verde Bosque", hex: "#66A51A" },
      { id: "marron-cafe", name: "Marrón Café", hex: "#9B7C5B" },
      { id: "naranja-coral", name: "Naranja Coral", hex: "#E97646" },
      { id: "lila-micro", name: "Lila", hex: "#B294B5" },
      { id: "rosa-palo-claro", name: "Rosa Palo Claro", hex: "#DBBBCA" },
      { id: "gris-micro", name: "Gris", hex: "#B3B3B3" },
      { id: "coral", name: "Coral", hex: "#FF8A82" },
      { id: "azul-rey-micro", name: "Azul Rey", hex: "#176DAE" },
      { id: "azul-marino-micro", name: "Azul Marino", hex: "#0A1B85" },
      { id: "beige-kaki", name: "Beige Kaki", hex: "#A8A48F" },
      { id: "azul-cielo-micro", name: "Azul Cielo", hex: "#5B8AE3" },
      { id: "rojo-vino", name: "Rojo Vino", hex: "#B60835" },
      { id: "verde-menta-micro", name: "Verde Menta", hex: "#90E1DC" },
      { id: "morado-micro", name: "Morado", hex: "#502D82" },
      { id: "azul-claro", name: "Azul Claro", hex: "#41A5EE" },
      { id: "rojo-coral", name: "Rojo Coral", hex: "#D74C40" },
      { id: "amarillo", name: "Amarillo", hex: "#FDC603" },
      { id: "verde-lima", name: "Verde Lima", hex: "#B7D94C" },
      { id: "verde-militar-micro", name: "Verde Militar", hex: "#464B2A" },
      { id: "gris-oscuro", name: "Gris Oscuro", hex: "#5B5B5B" },
      { id: "negro-micro", name: "Negro", hex: "#000000" },
    ],
    "fabric-stretch": [
      { id: "azul-cielo-strech", name: "Azul Cielo", hex: "#298FBC" },
      { id: "blanco-strech", name: "Blanco", hex: "#FFFFFF" },
      { id: "rosa-viejo", name: "Rosa Viejo", hex: "#AB696A" },
      { id: "azul-rey", name: "Azul Rey", hex: "#025699" },
      { id: "gris-verdoso", name: "Gris Verdoso", hex: "#9AA6A4" },
      { id: "beige", name: "Beige", hex: "#A19270" },
      { id: "negro-strech", name: "Negro", hex: "#000000" },
      { id: "lila", name: "Lila", hex: "#B17FC5" },
      { id: "rosa-bebe", name: "Rosa Bebé", hex: "#F8BDCA" },
      { id: "verde-militar", name: "Verde Militar", hex: "#46624D" },
      { id: "naranja", name: "Naranja", hex: "#DA6532" },
      { id: "azul-marino-strech", name: "Azul Marino", hex: "#23428C" },
      { id: "turquesa-strech", name: "Turquesa", hex: "#5AD5D2" },
      { id: "fucsia", name: "Fucsia", hex: "#F54C97" },
      { id: "rojo-vino", name: "Rojo Vino", hex: "#B60835" },
      { id: "morado-uva", name: "Morado Uva", hex: "#A06C96" },
      { id: "azul-petroleo", name: "Azul Petróleo", hex: "#376C77" },
      { id: "azul-noche", name: "Azul Noche", hex: "#3A4065" },
      { id: "verde-esmeralda", name: "Verde Esmeralda", hex: "#236B51" },
    ],
  },

  // Paso 5: Logo (opcional, con recargo si se elige DTF o bordado)
  logoOptions: [
    {
      id: "logo-ninguno",
      name: "Sin logo",
      description: "Uniforme liso, sin personalización.",
      extraCost: 0,
    },
    {
      id: "logo-dtf",
      name: "Logo DTF",
      description: "Estampado DTF a color, ideal para diseños detallados. Ciertas condiciones aplican (solo para universidades).",
      extraCost: 0,
    },
    {
      id: "logo-bordado",
      name: "Logo Bordado",
      description: "Bordado en hilo, acabado más resistente y elegante.",
      extraCost: 7,
    },
  ],
};

// Número de WhatsApp de contacto (formato internacional, sin "+" ni espacios).
// TODO: reemplaza con el número real del negocio de uniformes.
const WHATSAPP_NUMBER = "584140000000";
