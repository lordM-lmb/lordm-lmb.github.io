const presaleContractAddress = "0x3Bd2D68541F359BdFDd5F172A6d4BA60096e8814"; // Wallet de preventa
const tokenContractAddress = "0xA1412331439BD6Ac4Fd8228556E865C597ED9B54"; // Contrato del token LMB

const presaleAbi = [
    {
        "constant": false,
        "inputs": [
            { "name": "amount", "type": "uint256" }
        ],
        "name": "buyTokens",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const tokenAbi = [
    {
        "constant": false,
        "inputs": [
            { "name": "spender", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3;
let presaleContract;
let tokenContract;
let userAccount;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            presaleContract = new web3.eth.Contract(presaleAbi, presaleContractAddress);
            tokenContract = new web3.eth.Contract(tokenAbi, tokenContractAddress);
            alert("Wallet conectada: " + userAccount);
        } catch (error) {
            console.error("Error al conectar la wallet:", error);
        }
    } else {
        alert("Por favor, instala MetaMask para comprar tokens.");
    }
}

async function buyTokens() {
    if (!presaleContract || !tokenContract) {
        alert("Conecta tu wallet primero.");
        return;
    }

    const amountUSDT = prompt("Ingresa la cantidad de USDT a invertir (mínimo 10, máximo 200):");
    if (amountUSDT < 10 || amountUSDT > 200) {
        alert("La compra debe ser entre 10 y 200 USDT.");
        return;
    }

    try {
        const usdtAmount = web3.utils.toWei(amountUSDT, "ether");

        // Aprobar USDT para la preventa
        await tokenContract.methods.approve(presaleContractAddress, usdtAmount).send({ from: userAccount });

        // Comprar tokens en la preventa
        await presaleContract.methods.buyTokens(usdtAmount).send({ from: userAccount });
        alert("¡Compra realizada con éxito! Revisa tu wallet.");
    } catch (error) {
        console.error("Error en la compra:", error);
        alert("Error al procesar la compra.");
    }
}

// Vincular botón de compra con la función
document.getElementById("buyButton").addEventListener("click", async function () {
    await connectWallet();
    await buyTokens();
});
