# React + Vite



http://localhost:5173

CreditSmart - Sistema de Gestión de Créditos

Sistema web para la gestión de solicitudes de crédito con integración a Firebase Firestore.

## 🚀 Características

- ✅ Crear solicitudes de crédito
- 📋 Listar todas las solicitudes
- 🗑️ Eliminar solicitudes
- 💾 Persistencia en Firebase Firestore
- ⚡ Interfaz responsive y moderna
- 🔄 Actualizaciones en tiempo real

## 🛠️ Tecnologías

- React 18
- Vite
- Firebase 10.x (Firestore)
- CSS personalizado

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/creditsmart.git
cd creditsmart
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Copia el archivo `.env.example` a `.env`
3. Reemplaza las credenciales con las de tu proyecto Firebase
```bash
cp .env.example .env
```

4. Edita `.env` con tus credenciales:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx
```

### 4. Configurar reglas de Firestore

En Firebase Console → Firestore Database → Reglas:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes/{solicitudId} {
      allow read, write: if true;
    }
  }
}
```

### 5. Ejecutar la aplicación
```bash
npm run dev
```

## 📂 Estructura del Proyecto
```
creditsmart/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CreditCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Solicitudes.jsx
│   ├── config/
│   │   └── firebase.js
│   ├── services/
│   │   └── creditService.js
│   ├── styles/
│   │   └── Application.css
│   ├── App.jsx
│   └── main.jsx
├── .env.actividad
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Funcionalidades

### Crear Solicitud
- Completa el formulario con los datos del cliente
- Monto, plazo y tipo de producto
- Se guarda automáticamente en Firebase

### Listar Solicitudes
- Visualiza todas las solicitudes en tarjetas
- Información detallada de cada solicitud
- Estado visual del crédito

### Eliminar Solicitud
- Confirmación antes de eliminar
- Eliminación inmediata de la base de datos

## 🔒 Seguridad

- Las credenciales de Firebase están en variables de entorno
- `.env` está excluido del repositorio Git
- Reglas de seguridad configuradas en Firestore

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request




