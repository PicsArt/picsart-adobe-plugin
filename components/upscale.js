function Upscale() {
    return (`<div class="upscale-div">
                <form class="upscale-form">
                    <label class="upscale-label">Improve your image resolution with ease. Please select your upscale factor:</label>
                    <div class="upscale-nested-div">
                        <span class="upscaleP">Select upscale factor:</span>
                    </div>
                    <div class="upscale-nested-div">
                        <select id="upscale-select">
                            <option>2</option>
                            <option>4</option>
                            <option>6</option>
                            <option>8</option>
                        </select>
                    </div>
                    <br>
                    <div class="upscale-nested-div">
                        <button id="upscale-button">Start Proccesing</button>
                    </div>
                </form>
            </div>`);
}

module.exports = { Upscale, };