const fs = require('uxp').storage.localFileSystem;
const { PicsartFetchHandler } = require('../components/picsartFetchHandler');
const fetchToPicsart = new PicsartFetchHandler();

async function UpscaleEventListeners() {
    const upscaleButton = document.getElementById("upscale-button");
    const select = document.getElementById('upscale-select');

    upscaleButton.addEventListener('click', async () => {
        const pluginFolder = await fs.getDataFolder();
        const file = await pluginFolder.getEntry("key.txt");
        const key = await file.read();

        const form = new FormData();
        form.append('upscale_factor', typeof(select.value) === 'undefined' ? "2" : select.value);
        form.append('format', 'JPG');

        const options = {
            method : 'POST',
            headers : {
                accept : 'application/json',
                'X-Picsart-API-Key': key,
                'X-Picsart-Plugin': "Photoshop",
            },
        }
        
        await fetchToPicsart.fetchToPicsart('https://api.picsart.io/tools/1.0/upscale', options, form);
    });
}

module.exports = { UpscaleEventListeners, };