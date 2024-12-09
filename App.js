// Seleccionamos los elementos relevantes
const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.slider-nav button');
const slideWidth = slider.clientWidth; // Ancho del slider

// Establecemos el índice actual
let currentIndex = 0;

// Función para actualizar la posición del slider
function moveToSlide(index) {
    // Aseguramos que el índice sea válido (no menor que 0 ni mayor que el total de slides)
    if (index < 0) index = 0;
    if (index >= buttons.length) index = buttons.length - 1;

    // Desactivamos scroll-snap temporalmente
    slider.style.scrollSnapType = 'none';

    // Desplazamos el slider a la posición correspondiente
    slider.scrollTo({
        left: slideWidth * index, // Desplazamos al slide correspondiente
        behavior: 'smooth', // Animación suave
    });

    // Actualizamos el índice actual
    currentIndex = index;

    // Reactivamos scroll-snap después de un breve retraso
    setTimeout(() => {
        slider.style.scrollSnapType = 'x mandatory';
    }, 500); // Ajusta el tiempo a la duración de la animación
}

// Agregamos un eventListener a los botones de navegación
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Movemos el slider al índice seleccionado
        moveToSlide(index);
    });
});

// Controlar el auto-scroll (si se tiene) para que no interfiera con la navegación manual
let autoScroll;

function startAutoScroll() {
    autoScroll = setInterval(() => {
        // Calcular el siguiente índice
        const nextIndex = (currentIndex + 1) % buttons.length;
        moveToSlide(nextIndex);
    }, 3000); // Cambiar cada 3 segundos
}

// Detener el auto-scroll cuando el usuario interactúa
function stopAutoScroll() {
    clearInterval(autoScroll);
}

// Iniciar el auto-scroll
startAutoScroll();

// Pausar auto-scroll al hacer clic
buttons.forEach((button, index) => {
    button.addEventListener('click', stopAutoScroll);
});
