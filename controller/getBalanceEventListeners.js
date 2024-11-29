const shell = require('uxp').shell;

function GetBalanceEventListeners() {
    const buyCreditsButton = document.getElementById("buyCredits-button");
    buyCreditsButton.addEventListener('click', () => {
        document.getElementById("picsart").showModal();
    });
}

module.exports = { GetBalanceEventListeners, };