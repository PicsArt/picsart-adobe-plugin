const fs = require('uxp').storage.localFileSystem;

async function CreditsCheckingFetch() {
    const pluginFolder = await fs.getDataFolder();
    const file = await pluginFolder.getEntry("key.txt");
    const key = await file.read();

    const options = {
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "X-Picsart-API-Key": key,
            'X-Picsart-Plugin': "Photoshop"
        }
    };
    
    return await fetch('https://api.picsart.io/tools/1.0/balance', options)
      .then(response => response.json())
      .then(response => response.credits)
      .catch(err => console.error(err));
}


async function GetBalance() {
    return (`<div class="getBalanceContainer">
                <p class="getBalance-current-balance">Current balance</p>
                <p class="getBalance-upgrade">Upgrade your plan for more credits</p>
                <p class="getBalance-credits-count">${await CreditsCheckingFetch()} credits left</p>
                <div class="button-container">
                    <button id="buyCredits-button">Buy more credits</button>
                </div>
            </div>`);
}

module.exports = { GetBalance, };