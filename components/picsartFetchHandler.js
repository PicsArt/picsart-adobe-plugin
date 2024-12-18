const photoshop = require('photoshop');
const uxp = require('uxp');
const localFileSystem = require('uxp').storage.localFileSystem;

class PicsartFetchHandler {
    constructor() {
        this.tempFile = null;
        this.blob = null;
        this.fetchRes = null;
    }
    async saveCurrentDocumentWithoutDialog() {
        const activeDocument = photoshop.app.activeDocument;
    
        if (!activeDocument) {
            console.log("No active document found.");
            return;
        }
    
        try {
            const options = {
                format: "jpg",
                quality: 12,
                embedColorProfile: true,
            };
    
            const tempImgFolder = await localFileSystem.getDataFolder();
    
            this.tempFile = await tempImgFolder.createFile("savedImage.jpg", { overwrite: true });
    
            await photoshop.core.executeAsModal(async () => {
                await photoshop.app.activeDocument.saveAs.jpg(this.tempFile, options, true);
            });
    
        } catch (error) {
            console.error("Error saving document:", error);
        }
    }

    async convertJpgToBlob() {
        try {
            const arrayBuffer = await this.tempFile.read({ format: uxp.storage.formats.binary });
    
            const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
            return blob;
        } catch (error) {
            console.error("Error converting JPEG to Blob:", error);
        }
    }
    async fetchToPicsartAPI(url, options, form) {
        form.append('image', await this.blob.arrayBuffer());
        options.body = form;
        console.log(options);
        try {
            this.fetchRes = await fetch(url, options)
             .then((response) => response.json())
             .then((result) => fetch(result.data.url))
             .then((resBolob) => resBolob.blob())
             .then((arrBuffer) => {
                return arrBuffer.arrayBuffer();
             })
             .catch((err) => {
                console.log(`Error from catch: ${err}`);
             });
        } catch (err) {
            console.log(`Fetch request is failed: ${e}`);
        }
    }
    async createLayerFromArrayBuffer(arrayBuffer) {
        const uint8Array = new Uint8Array(arrayBuffer);
    
        const tempFolder = await localFileSystem.getTemporaryFolder();
        let tempFile = null;
        await photoshop.core.executeAsModal(async () => {
            tempFile = await tempFolder.createFile("tempImage.jpg", { overwrite: true });
        })
        
        await tempFile.write(uint8Array);
        
        let newDoc = null;
        await photoshop.core.executeAsModal(async () => {
            newDoc = await photoshop.app.open(tempFile);
            await newDoc.selection.selectAll();
            
            await newDoc.selection.copy();
            newDoc.closeWithoutSaving();
        });
        
        await app.activeDocument.paste();
    }
    async fetchToPicsart(url, options, form) {
        await this.saveCurrentDocumentWithoutDialog();
        this.blob = await this.convertJpgToBlob();
        await this.fetchToPicsartAPI(url, options, form);
        await this.createLayerFromArrayBuffer(this.fetchRes).catch(e => console.log(e));
    }
};

module.exports = {PicsartFetchHandler,};