// Esperamos a que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener('DOMContentLoaded', function () {

    // Detectamos si hay una wallet disponible
    if (window.ethereum) {
        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                // Asignamos la cuenta conectada
                const userAddress = accounts[0];
                console.log("Cuenta conectada: ", userAddress);
            })
            .catch(error => {
                alert("Error al conectar la wallet: " + error.message);
            });
    } else {
        alert("No se encontró ninguna wallet. Por favor, instala MetaMask u otra extensión.");
    }

    // Función para manejar la compra de tokens
    document.getElementById('buyButton').addEventListener('click', function () {
        const amount = document.getElementById('amountInput').value; // Captura el valor de compra
        if (amount && parseFloat(amount) >= 10) {
            buyTokens(amount);  // Llamamos a la función para realizar la compra
        } else {
            alert("El monto mínimo de compra es 10 USDT.");
        }
    });

    // Función para realizar la compra
    function buyTokens(amount) {
        const contractAddress = "0xYourContractAddress"; // Dirección del contrato
        const abi = [/* tu ABI aquí */]; // ABI del contrato

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Verificamos que el usuario esté conectado a la wallet
        if (typeof window.ethereum !== 'undefined') {
            ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                const userAddress = accounts[0];

                // Llamada a la función de compra en el contrato
                contract.methods.buyTokens().send({
                    from: userAddress,
                    value: web3.utils.toWei(amount, 'ether') // Convertimos USDT a la cantidad correspondiente en Ether
                })
                .then(result => {
                    console.log("Compra exitosa: ", result);
                    alert("Compra exitosa!");
                })
                .catch(error => {
                    console.log("Error en la compra: ", error);
                    alert("Hubo un error en la compra.");
                });
            });
        } else {
            alert("Por favor, conecta tu wallet.");
        }
    }

    // Función para cambiar de idioma (simplificada para el ejemplo)
    document.getElementById('changeLanguage').addEventListener('change', function () {
        const selectedLanguage = this.value;
        if (selectedLanguage === 'es') {
            // Cambia a español
            document.getElementById('title').innerText = "Bienvenido a la preventa de LORD M";
            // Agrega más cambios de texto según sea necesario
        } else if (selectedLanguage === 'en') {
            // Cambia a inglés
            document.getElementById('title').innerText = "Welcome to the LORD M presale";
            // Agrega más cambios de texto según sea necesario
        }
    });

    // Función para compartir en redes sociales (simplificada)
    document.getElementById('shareButton').addEventListener('click', function () {
        const url = window.location.href;
        const text = "Únete a la preventa del token LORD M (LMB)!";
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
    });

    // Función para controlar el temporizador de la preventa (simplificado)
    let countdownTimer = setInterval(function () {
        const endDate = new Date('2025-04-08T00:00:00'); // Fecha de finalización de la preventa
        const currentDate = new Date();
        const timeRemaining = endDate - currentDate;

        if (timeRemaining <= 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerText = "La preventa ha terminado";
        } else {
            const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            document.getElementById('countdown').innerText = `${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
});
