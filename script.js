// Contenido de los modales
const modalContent = {
    privacy: {
        title: "Política de Privacidad",
        content: `
            <h2>Política de Privacidad de SindicApp</h2>
            <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            
            <h3>1. Información que Recopilamos</h3>
            <p>En esta etapa de desarrollo, SindicApp no recopila ningún dato personal de los usuarios. Esta página es únicamente informativa.</p>
            
            <h3>2. Uso de la Información</h3>
            <p>Cuando la aplicación esté en funcionamiento, priorizaremos:</p>
            <ul>
                <li>Protección absoluta de la privacidad del usuario</li>
                <li>Anonimización de datos sensibles</li>
                <li>Cumplimiento del GDPR y normativas locales</li>
                <li>Transparencia total en el uso de datos</li>
            </ul>
            
            <h3>3. Derechos del Usuario</h3>
            <p>Los usuarios tendrán derecho a:</p>
            <ul>
                <li>Acceder a sus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Eliminar su cuenta y datos</li>
                <li>Portabilidad de datos</li>
                <li>Oposición al tratamiento</li>
            </ul>
            
            <h3>4. Contacto</h3>
            <p>Para consultas sobre privacidad, contacta a través de nuestro repositorio de GitHub.</p>
        `
    },
    terms: {
        title: "Términos de Uso",
        content: `
            <h2>Términos de Uso de SindicApp</h2>
            <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            
            <h3>1. Aceptación de Términos</h3>
            <p>Al utilizar SindicApp, aceptas estos términos de uso. Esta aplicación está diseñada para la organización legítima de trabajadores.</p>
            
            <h3>2. Uso Permitido</h3>
            <p>SindicApp puede ser utilizada para:</p>
            <ul>
                <li>Organización sindical legítima</li>
                <li>Intercambio de información laboral veraz</li>
                <li>Coordinación de acciones legales</li>
                <li>Denuncia de condiciones laborales inadecuadas</li>
            </ul>
            
            <h3>3. Uso Prohibido</h3>
            <p>Está prohibido usar la plataforma para:</p>
            <ul>
                <li>Difamación o información falsa</li>
                <li>Acoso o intimidación</li>
                <li>Actividades ilegales</li>
                <li>Spam o contenido no relacionado</li>
            </ul>
            
            <h3>4. Responsabilidad</h3>
            <p>Los usuarios son responsables del contenido que publican. SindicApp se reserva el derecho de moderar y eliminar contenido inapropiado.</p>
            
            <h3>5. Modificaciones</h3>
            <p>Estos términos pueden ser actualizados. Los cambios significativos serán notificados a los usuarios.</p>
        `
    },
    cookies: {
        title: "Política de Cookies",
        content: `
            <h2>Política de Cookies de SindicApp</h2>
            <p><strong>Última actualización:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
            
            <h3>1. ¿Qué son las Cookies?</h3>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.</p>
            
            <h3>2. Cookies que Utilizamos</h3>
            <p>En esta etapa de desarrollo, esta página no utiliza cookies. Cuando la aplicación esté operativa, utilizaremos:</p>
            
            <h4>Cookies Esenciales:</h4>
            <ul>
                <li>Sesión de usuario autenticado</li>
                <li>Preferencias de configuración</li>
                <li>Seguridad y prevención de fraude</li>
            </ul>
            
            <h4>Cookies Opcionales:</h4>
            <ul>
                <li>Análisis de uso (anónimo)</li>
                <li>Preferencias de interfaz</li>
                <li>Optimización de rendimiento</li>
            </ul>
            
            <h3>3. Control de Cookies</h3>
            <p>Podrás:</p>
            <ul>
                <li>Aceptar o rechazar cookies no esenciales</li>
                <li>Modificar preferencias en cualquier momento</li>
                <li>Eliminar cookies desde tu navegador</li>
            </ul>
            
            <h3>4. Cookies de Terceros</h3>
            <p>Cuando utilicemos servicios como Google Maps, estas tendrán sus propias políticas de cookies que serán claramente indicadas.</p>
        `
    }
};

// Función para mostrar modal
function showModal(type) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modalContent[type]) {
        modalBody.innerHTML = modalContent[type].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Animación de entrada para elementos
document.addEventListener('DOMContentLoaded', function() {
    // Animación de aparición gradual para los elementos
    const elements = document.querySelectorAll('.header, .status-card, .credits-card, .footer');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Título estático - sin animación de typing
});

// Función para generar partículas de fondo (opcional, efecto visual)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationName = 'float';
        particle.style.animationIterationCount = 'infinite';
        particle.style.animationDirection = 'alternate';
        
        particlesContainer.appendChild(particle);
    }
    
    // Agregar keyframes para la animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(particlesContainer);
}

// Inicializar partículas cuando carga la página
document.addEventListener('DOMContentLoaded', createParticles); 