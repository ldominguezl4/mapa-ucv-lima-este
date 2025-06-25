# 📱 Mapa Interactivo UCV Lima Este - Progressive Web App

Una aplicación web progresiva (PWA) del mapa interactivo de la Universidad César Vallejo Lima Este con funcionalidades de accesibilidad y navegación por voz.

## 🚀 Características

### ✅ Funcionalidades Web
- **Mapa interactivo** del campus universitario
- **Navegación por voz** con síntesis de texto a voz
- **11 ubicaciones detalladas** del campus
- **Modo de alto contraste** para accesibilidad
- **Diseño responsive** para móviles y desktop
- **Bienvenida automática** al cargar la página

### ✅ Funcionalidades PWA
- **Instalable** como aplicación nativa
- **Funciona offline** con Service Worker
- **Actualizaciones automáticas**
- **Iconos personalizados**
- **Pantalla de inicio personalizada**

## 📱 Instalación como App

### En Android (Chrome/Edge):
1. Abre la web en Chrome o Edge
2. Aparecerá un botón "📱 Instalar App" en la esquina inferior derecha
3. Haz clic en "Instalar" cuando aparezca el prompt
4. La app se instalará en tu pantalla de inicio

### En iPhone/iPad (Safari):
1. Abre la web en Safari
2. Toca el botón "Compartir" (cuadrado con flecha hacia arriba)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma el nombre y toca "Agregar"

### En Windows (Chrome/Edge):
1. Abre la web en Chrome o Edge
2. Haz clic en el ícono de instalación en la barra de direcciones
3. O ve a Menú → "Instalar [nombre de la app]"
4. La app aparecerá en tu menú de inicio

### En Mac (Chrome/Safari):
1. **Chrome**: Menú → "Instalar [nombre de la app]"
2. **Safari**: Archivo → "Agregar al Dock"

## 🛠️ Desarrollo Local

```bash
# Clonar o descargar los archivos
# Servir con cualquier servidor HTTP
python3 -m http.server 8000

# O con Node.js
npx serve .

# O con PHP
php -S localhost:8000
```

## 📁 Estructura de Archivos

```
mapa-ucv-pwa/
├── index.html          # Página principal
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
├── README.md          # Este archivo
└── styles.css         # Estilos (incluidos en HTML)
```

## 🎯 Ubicaciones del Campus

1. **Admisión** - Oficina de admisión (entrada principal)
2. **Pabellón D** - 4 pisos, laboratorios especializados
3. **Pabellón C** - 1 piso, oficinas administrativas
4. **Tópico** - Atención médica básica
5. **Finanzas** - Pagos y trámites financieros
6. **Pabellón E** - 1 piso, aulas de estudio
7. **Pabellón F** - 1 piso, aulas de estudio
8. **Auditorio** - Eventos académicos
9. **Biblioteca** - Centro de recursos académicos
10. **Pabellón A** - 7 pisos con ascensor
11. **Pabellón B** - 8 pisos con accesibilidad completa

## ♿ Características de Accesibilidad

- **Navegación por teclado** (Tab, Enter, Espacio)
- **Síntesis de voz** en español
- **Alto contraste** para personas con discapacidad visual
- **Etiquetas ARIA** para lectores de pantalla
- **Texto alternativo** descriptivo
- **Duración extendida** de mensajes (12 segundos)
- **Botón de cierre manual** para control del usuario

## 🔧 Tecnologías Utilizadas

- **HTML5** semántico
- **CSS3** con variables personalizadas
- **JavaScript ES6+**
- **Service Worker API**
- **Web App Manifest**
- **Speech Synthesis API**
- **Responsive Design**

## 📊 Compatibilidad

### Navegadores Soportados:
- ✅ Chrome 67+ (Android/Desktop)
- ✅ Firefox 79+ (Android/Desktop)
- ✅ Safari 14+ (iOS/macOS)
- ✅ Edge 79+ (Windows/Android)
- ✅ Samsung Internet 8.2+

### Funcionalidades PWA:
- ✅ **Instalación**: Chrome, Edge, Firefox, Safari
- ✅ **Offline**: Todos los navegadores modernos
- ✅ **Síntesis de voz**: Todos excepto algunos Firefox móviles

## 🚀 Ventajas de la PWA

### vs Aplicación Web Normal:
- ⚡ **Carga más rápida** (caché local)
- 📱 **Instalable** como app nativa
- 🔄 **Funciona offline**
- 🔔 **Actualizaciones automáticas**
- 🎨 **Pantalla de inicio personalizada**

### vs App Nativa:
- 💾 **Menor tamaño** (no requiere descarga de tienda)
- 🔄 **Actualizaciones instantáneas**
- 🌐 **Multiplataforma** automática
- 💰 **Sin costos de distribución**
- 🛠️ **Mantenimiento más simple**

## 📞 Soporte

Para reportar problemas o sugerir mejoras, contacta al equipo de desarrollo de la Universidad César Vallejo Lima Este.

---

**© 2023 Universidad César Vallejo Lima Este - Diseñado con accesibilidad e inclusión**
