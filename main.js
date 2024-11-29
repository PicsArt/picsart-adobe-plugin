const { ApiKey } = require('./components/apiKey');
const { Upscale } = require('./components/upscale');
const { GetBalance } = require('./components/getBalance');
const { Auth } = require('./components/auth');
const { GetBalanceEventListeners } = require('./controller/getBalanceEventListeners');
const { RemoveBgEventListeners } = require('./controller/removeBgEventListeners');
const { ApiKeyEventListeners } = require('./controller/apiKeyEventListeners');
const { UpscaleEventListeners } = require('./controller/upscaleEventListeners');
const { entrypoints } = require('uxp');

const root = document.getElementById("root");

entrypoints.setup({
  panels: {
    picsartPlugin: {
      async show() {
        if (await Auth()) {
          root.innerHTML = Upscale();
          UpscaleEventListeners();
        } else {
          root.innerHTML = ApiKey();
          ApiKeyEventListeners();
        }
      }
    }
  },

  commands: {
    setApiKey: {
      run() {
        root.innerHTML = ApiKey();
        ApiKeyEventListeners();
      }
    },
    removeBg: {
      async run() {
        if (await Auth()) {
          await RemoveBgEventListeners();
        } else {
          root.innerHTML = ApiKey();
          ApiKeyEventListeners();
        }
      }
    },
    upscale: {
      async run() {
        if (await Auth()) {
          root.innerHTML = Upscale();
          UpscaleEventListeners();
        } else {
          root.innerHTML = ApiKey();
          ApiKeyEventListeners();
        }
      }
    },
    myAccount: {
      async run() {
        if (await Auth()) {
          root.innerHTML = await GetBalance(); // will change method name
          GetBalanceEventListeners();
        } else {
          root.innerHTML = ApiKey();
          ApiKeyEventListeners();
        }
      }
    },
    support: {
      run() {
        document.getElementById("help").showModal();
      }
    },
  }
});