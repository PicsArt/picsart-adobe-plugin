const fs = require('uxp').storage.localFileSystem;
const { PicsartFetchHandler } = require('../components/picsartFetchHandler');
const fetchToPicsart = new PicsartFetchHandler();

async function RemoveBgEventListeners() {
        const pluginFolder = await fs.getDataFolder();
        const file = await pluginFolder.getEntry("key.txt");
        const key = await file.read();
        
        const form = new FormData();
        form.append('output_type', 'cutout');
        form.append('bg_blur', '0');
        form.append('scale', 'fit');
        form.append('auto_center', 'false');
        form.append('stroke_size', '0');
        form.append('stroke_color', 'FFFFFF');
        form.append('stroke_opacity', '100');
        form.append('shadow', 'disabled');
        form.append('shadow_opacity', '20');
        form.append('shadow_blur', '50');
        form.append('format', 'JPG');
        
        const options = {
            method : 'POST',
            headers : {
                accept : 'application/json',
                'X-Picsart-API-Key': key,
                'X-Picsart-Plugin': "Photoshop",
            },
        }
        
        await fetchToPicsart.fetchToPicsart('https://api.picsart.io/tools/1.0/removebg', options, form);
    
}

module.exports = { RemoveBgEventListeners };