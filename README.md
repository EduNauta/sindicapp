<div align="center">
  <img src="assets/images/logo.jpg" alt="SindicApp Logo" width="200"/>
  
  # SindicApp
  
  **Una plataforma digital para la organización y coordinación de la clase trabajadora**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
  
</div>

---

## 📋 Descripción

SindicApp es una aplicación móvil progresiva (PWA) diseñada para servir como red social, directorio y plataforma de coordinación para la clase trabajadora. Combina elementos de InfoJobs, Facebook y WikiLeaks para proporcionar una infraestructura organizativa que ayude a mejorar las condiciones laborales.

### ✨ Características Principales

- **📍 Mapas Interactivos**: Integración con Google Maps para localizar empresas y organizaciones
- **🏢 Perfiles Empresariales**: Página automática para cada empresa con múltiples funcionalidades
- **💬 Foros Públicos y Privados**: Espacios de discusión moderados por sector y empresa
- **📊 Denuncias Anónimas**: Sistema seguro para reportar condiciones laborales
- **🤝 Coordinación Sindical**: Herramientas para organización y planificación de acciones
- **📱 Interfaz Moderna**: Diseño responsivo optimizado para móviles

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **UI/Styling**: Tailwind CSS
- **Estado**: Zustand
- **Datos**: React Query

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript  
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JWT + Refresh Tokens

### Servicios
- **Mapas**: Google Maps API
- **Cache**: Redis
- **Notificaciones**: Push Notifications
- **Infraestructura**: Docker

## 🚀 Instalación

### Prerrequisitos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- Redis
- Git

### Configuración Local

```bash
# Clonar el repositorio
git clone https://github.com/usuario/sindicapp.git
cd sindicapp

# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar migraciones
npm run db:migrate

# Semillas de la base de datos
npm run db:seed
```

### Desarrollo

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
sindicapp/
├── 📄 docs/                    # Documentación
├── 🎨 frontend/               # Aplicación cliente (Next.js)
├── ⚙️  backend/               # API servidor (Express)
├── 🗄️  database/              # Migraciones y esquemas
├── 🔧 shared/                 # Código compartido
├── 🚀 deployment/             # Scripts de despliegue
└── 📦 assets/                 # Recursos estáticos
```

## 🤝 Contribución

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📋 Convenciones de Código

- **TypeScript** obligatorio en todo el proyecto
- **ESLint + Prettier** para formateo consistente
- **Conventional Commits** para mensajes de commit
- **Tests unitarios** para funcionalidades críticas

## 📚 Documentación

- [📖 Manifesto y Visión del Proyecto](MANIFESTO.md)
- [🏗️ Arquitectura del Sistema](docs/architecture.md)
- [🔐 Consideraciones de Seguridad](docs/security.md)
- [📋 API Documentation](docs/api-spec.md)
- [👥 Historias de Usuario](docs/user-stories.md)

## 🔒 Seguridad y Privacidad

- **🔐 Autenticación robusta** con tokens seguros
- **🥷 Anonimato protegido** para denuncias
- **🛡️ Cumplimiento GDPR** y normativas locales
- **🔍 Moderación activa** contra abuso y spam
- **🤖 Detección de bots** y cuentas falsas

## 🗺️ Roadmap

### Fase 1: MVP (En desarrollo)
- [ ] Autenticación y registro
- [ ] Integración Google Maps
- [ ] Perfiles básicos de empresa
- [ ] Foro público simple

### Fase 2: Funcionalidades Core
- [ ] Sistema de denuncias anónimas
- [ ] Foros privados por empresa
- [ ] Sistema de notificaciones
- [ ] Panel administrativo

### Fase 3: Avanzadas
- [ ] Coordinación de acciones
- [ ] Análisis empresarial
- [ ] Aplicación móvil nativa
- [ ] Integraciones sindicales

## ⚖️ Consideraciones Legales

Este proyecto respeta:
- **GDPR** y normativas de protección de datos
- **Libertad de expresión** dentro del marco legal
- **Derecho de asociación** y organización sindical
- **Transparencia empresarial** según registros públicos

> ⚠️ **Aviso**: El uso responsable y legal de la plataforma es responsabilidad de cada usuario.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto**: [SindicApp](https://github.com/usuario/sindicapp)
- **Documentación**: [Wiki del Proyecto](https://github.com/usuario/sindicapp/wiki)
- **Issues**: [GitHub Issues](https://github.com/usuario/sindicapp/issues)

---

<div align="center">
  
  **¡Construyamos juntos una herramienta para la organización trabajadora! 🤝**
  
  [⭐ Star este proyecto](https://github.com/usuario/sindicapp) | [🐛 Reportar Bug](https://github.com/usuario/sindicapp/issues) | [💡 Solicitar Funcionalidad](https://github.com/usuario/sindicapp/issues)
  
</div> 