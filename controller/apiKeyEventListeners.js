const fs = require('uxp').storage.localFileSystem;

function ApiKeyEventListeners() {
    const input = document.getElementById("signIn-Textarea");
    document.getElementById("saveKeyButton").addEventListener('click', async () => {
        const pluginFolder = await fs.getDataFolder();
        const file = await pluginFolder.getEntry("key.txt");
        await file.write(input.value);
        input.value = "";
    });
}

module.exports = { ApiKeyEventListeners, };