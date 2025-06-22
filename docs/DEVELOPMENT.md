# 🚀 SindicApp - Guía de Desarrollo

## 📋 Prerrequisitos

### Software Requerido
- **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- **PostgreSQL** >= 14 ([Download](https://www.postgresql.org/download/))
- **Redis** ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/))

### Herramientas Recomendadas
- **VSCode** con extensiones:
  - TypeScript and JavaScript Language Features
  - Prisma
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

## 🏗️ Estructura del Proyecto

```
sindicapp/
├── 📁 frontend/          # Next.js 14 + TypeScript + Tailwind
├── 📁 backend/           # Express.js + TypeScript + Prisma
├── 📁 shared/            # Tipos y utilidades compartidas
├── 📁 database/          # Esquemas y migraciones
├── 📁 docs/              # Documentación
├── 📄 package.json       # Scripts del monorepo
├── 📄 tsconfig.json      # Configuración TypeScript base
└── 📄 env.example        # Variables de entorno ejemplo
```

## ⚙️ Setup Inicial

### 1. Clonar el Repositorio
```bash
git clone https://github.com/EduNauta/sindicapp.git
cd sindicapp
```

### 2. Configurar Variables de Entorno
```bash
# Copiar el archivo de ejemplo
cp env.example .env

# Editar .env con tus configuraciones
```

### 3. Instalar Dependencias
```bash
# Instalar dependencias del monorepo
npm install

# Instalar dependencias de todos los proyectos
npm run install:all
```

### 4. Setup de Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb sindicapp_dev

# Ejecutar migraciones
npm run db:migrate

# Sembrar datos iniciales
npm run db:seed
```

### 5. Iniciar Redis
```bash
# En Windows (si instalaste con chocolatey)
redis-server

# En macOS (si instalaste con brew)
brew services start redis

# En Linux
sudo systemctl start redis
```

## 🚀 Comandos de Desarrollo

### Desarrollo
```bash
# Iniciar frontend y backend simultáneamente
npm run dev

# Solo frontend (puerto 3000)
npm run dev:frontend

# Solo backend (puerto 4000)
npm run dev:backend
```

### Build
```bash
# Build completo del proyecto
npm run build

# Build individual
npm run build:frontend
npm run build:backend
npm run build:shared
```

### Testing
```bash
# Tests completos
npm run test

# Tests individuales
npm run test:frontend
npm run test:backend
```

### Linting
```bash
# Lint completo
npm run lint

# Lint individual
npm run lint:frontend
npm run lint:backend
```

### Base de Datos
```bash
# Ejecutar migraciones
npm run db:migrate

# Sembrar datos
npm run db:seed

# Reset completo (desarrollo)
npm run db:reset
```

### Docker (Opcional)
```bash
# Desarrollo con Docker
npm run docker:dev

# Producción con Docker
npm run docker:prod
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api-docs
- **Prisma Studio**: http://localhost:5555

## 🔧 Configuración del Editor

### VSCode Settings (`.vscode/settings.json`)
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## 📝 Convenciones de Código

### Commits
Usar **Conventional Commits**:
```
feat: add user authentication
fix: resolve database connection issue
docs: update API documentation
style: format code with prettier
refactor: reorganize component structure
test: add unit tests for auth service
```

### Branches
- `main` - Producción
- `develop` - Desarrollo
- `feature/nombre-feature` - Nuevas características
- `fix/nombre-bug` - Corrección de bugs
- `hotfix/nombre-hotfix` - Correcciones urgentes

### TypeScript
- **Strict mode** habilitado
- **Interfaces** para tipos complejos
- **Enums** para constantes
- **Utility types** cuando sea apropiado

## 🐛 Troubleshooting

### Node.js no funciona
```bash
# Verificar instalación
node --version
npm --version

# Reiniciar PowerShell como administrador
# Verificar PATH en Windows
echo $env:PATH
```

### Base de datos no conecta
```bash
# Verificar PostgreSQL corriendo
pg_isready

# Verificar credenciales en .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Puerto en uso
```bash
# Verificar qué usa el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :4000

# Cambiar puerto en .env
PORT=4001
```

## 📚 Recursos Adicionales

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🆘 Obtener Ayuda

1. Revisar esta documentación
2. Buscar en [Issues del proyecto](https://github.com/EduNauta/sindicapp/issues)
3. Crear un nuevo issue si es necesario
4. Preguntar en el canal de desarrollo 