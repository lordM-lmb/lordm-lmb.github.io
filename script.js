// Función para manejar el contador de la preventa
let countdownDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 días de preventa

let countdownFunction = setInterval(function() {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
}, 1000);

// Función para iniciar la animación de compra
function startBattle() {
    alert("¡Empezando la batalla! Compra procesada.");
    // Aquí puedes integrar la llamada a tu contrato inteligente para la compra.
}
