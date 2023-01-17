const template = document.createElement("template");
template.innerHTML = `
    
    <style>
        :root {
            --prymairy: #161513;
            --secondary: #8D8983;
            --light-text: #D9D9D9;
            --medium-text: #8A8A8A;
            --dark-text: #6B6761;
            --black: black;
        }

        .arrow {
            height: 16px;
            background: black;
            border: none;  
            cursor: pointer;
        }

        .arrow img {
            width: 11px;
            height: auto;
            margin-left: -2px;
        }

        .arrow:hover {
            background-color: var(--dark-text);
        }

        .container{
            width: 227px;
        }


        .icon {
            width: 100%;
            height: 100%;

            max-width: 31px;
            max-height: 31px;
        }

        .input-container {
            display: flex;
        }

        .number-container {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 12px;
            margin-top: 4px;

            color: var(--medium-text)

        }

        .option-slider {
            display: flex;
            gap: 10px;
        }

        p {
            font-size: 12px;
        }

        .slide-container {
            position: relative;
            display: inline-block;
        }

        .slider-label {
            position: absolute;
            top: -3;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 0;
        }

        .slider {
            -webkit-appearance: none;
            width: 173px;
            height: 28px;
            background: transparent;
        
            -webkit-transition: .2s;
            transition: opacity .2s;
            cursor: pointer;
            z-index: 1
        }
        
        .slider:hover {
        opacity: 1;
        }
        
        .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 0px;
        height: 0px;
        }

        .fill-container {
        position: relative;
        }
        
        .bar {
            position: absolute;
            z-index: 0;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            

            outline: 1px solid var(--black);
        }
        .fill {
            pointer-events: none;
            z-index: 0;
            display: block;
            width: 0%;
            height: 100%;
            background-color: var(--secondary);
            transition: 50ms
        }

        .up-down-container {
            display: flex;
            flex-direction: column;
            width: 18px;
            height: 100%;
        }

          
    </style>
    <div class="container">
        <div class="option-slider">
            <img class="icon">
            <div class="slide-container">
                <div>
                    <div class="progress-slide-container">

                        <div class="input-container">
                            <div>
                                <div class="fill-container">
                                        <input class="slider" type="range" min="0" max="100" value="0">
                                        <span class="bar"><span class="fill"></span></span>
                                        <div class="slider-label">
                                            <p class="slider-text"></p>
                                        </div>
                                </div>
                                <div class="number-container">
                                    <p>0</p>
                                </div>  
                            </div>
                            <div class="up-down-container">
                                <button type="button" class="arrow up">
                                    <image class="up-icon " src="assets/up-icon.png" alt="up icon">
                                </button>
                                <button type="button" class="arrow down">
                                    <image class="down-icon" src="assets/down-icon.png" alt="down icon">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
`

class OptionSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open"});
        this.shadowRoot.appendChild(template.content.
        cloneNode(true));

        const image = this.shadowRoot.querySelector("img");
        image.src =this.getAttribute('icon');
        image.alt =this.getAttribute('name' + 'icon');

        this.shadowRoot.querySelector(".slider-text").innerText =
        this.getAttribute('name');
        
        const slider = this.shadowRoot.querySelector(".slider");
        slider.id = "slider-" + this.getAttribute('name').split(" ")[0];

        if(this.getAttribute('isMiddle')) {
            slider.value = 100;
            slider.max = 200;
            this.shadowRoot.querySelector(".fill").style.width = "50%";
        }
        
    }

    updateProgress(slider) {

        console.log("hello")

        const maxVal = slider.getAttribute("max");
        const val = (slider.value / maxVal) * 100 + "%";

        const counter = this.shadowRoot.querySelector(".number-container p");
        console.log(counter);
        counter.innerHTML = this.getAttribute('isMiddle')? slider.value - 100 : slider.value;
        this.shadowRoot.querySelector(".fill").style.width = val;
    }

    increase(slider) {
        slider.value = parseInt(slider.value) + 5;
        this.updateProgress(slider);
    }

    decrease(slider) {
        slider.value = parseInt(slider.value) - 5;
        this.updateProgress(slider);
    }

    connectedCallback() {
        const slider = this.shadowRoot.querySelector("#slider-" + this.getAttribute('name').split(" ")[0]);
        slider.addEventListener("input", () => this.updateProgress(slider));

        const up = this.shadowRoot.querySelector(".arrow.up");
        up.addEventListener("click", () => this.increase(slider));

        const down = this.shadowRoot.querySelector(".arrow.down");
        down.addEventListener("click", () => this.decrease(slider));
    }
}

window.customElements.define("option-slider", OptionSlider)