const fs = require('uxp').storage.localFileSystem;

async function Auth() {
    const pluginFolder = await fs.getDataFolder();
    const file = await pluginFolder.getEntry("key.txt");
    const key = await file.read();
    const options = {
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "X-Picsart-API-Key": key
        }
    };
    
    return await fetch('https://api.picsart.io/tools/1.0/balance', options)
      .then(response => response.json())
      .then((response) => response.credits ? true : false)
      .catch(err => console.error(err));
}

module.exports = { Auth, };