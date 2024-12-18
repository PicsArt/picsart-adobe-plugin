function ApiKey() {
    return (`<div class="apiKey-div">
                <p class="apiKeyP">1. To use the plugin, go to <span class="apiKeySpan">Picsart.com</span> and create a free account.</p>
                <p style="padding-bottom: 15px;" class="apiKeyP">2. Go to the <span class="apiKeySpan">API dashboard</span>, copy and past your API key here.</p>
                <div class="textarea-container">
                    <sp-textarea id="signIn-Textarea"></sp-textarea>
                </div>
                <div class="apiKeyButtonContainer">
                    <button id="saveKeyButton">Continue</button>
                </div>
             </div>`);
}

module.exports = { ApiKey, };