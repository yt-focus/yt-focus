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

        .container{
            width: 227px;
        }


        img {
            width: 100%;
            height: 100%;

            max-width: 31px;
            max-height: 31px;
        }

        .number-container {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 12px;

            color: var(--medium-text)

        }

        .option-slider {
            display: flex;
            gap: 15px;
        }

        p {
            font-size: 12px;
        }

        .slide-container {
            position: relative;
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
            height: 27px;
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
            width: 50%;
            height: 100%;
            background-color: var(--secondary);
            transition: 50ms
        }

          
    </style>
    <div class="container">
        <div class="option-slider">
            <img>
            <div class="slide-container">
                <div>
                    <div class="fill-container">
                    <input class="slider" type="range" min="0" max="100" value="50">
                    <span class="bar"><span class="fill"></span></span>
                    </div>
                    <div class="number-container">
                        <p>0</p>
                    </div>  
                </div>
                <div class="slider-label">
                    <p class="slider-text"></p>
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

        this.shadowRoot.querySelector("img").src =
        this.getAttribute('icon');

        this.shadowRoot.querySelector(".slider-text").innerText =
        this.getAttribute('name');
        
        this.shadowRoot.querySelector(".slider").id =
        "slider-" + this.getAttribute('name').split(" ")[0];
        console.log( "slider-" + this.getAttribute('name').split(" ")[0])
    }

    updateProgress(slider) {

        console.log("hello")

        const maxVal = slider.getAttribute("max");
        const val = (slider.value / maxVal) * 100 + "%";

        const counter = this.shadowRoot.querySelector(".number-container p")
        console.log(counter);
        counter.innerHTML = slider.value;
        this.shadowRoot.querySelector(".fill").style.width = val;
    }

    connectedCallback() {
        const slider = this.shadowRoot.querySelector("#slider-" + this.getAttribute('name').split(" ")[0]);
        console.log(slider, "slider-" + this.getAttribute('name').split(" ")[0]);
        slider.addEventListener("input", () => this.updateProgress(slider));
    }
}

window.customElements.define("option-slider", OptionSlider)