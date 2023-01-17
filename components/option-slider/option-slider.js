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
        }

        .slider {
            -webkit-appearance: none;
            width: 100%;
            height: 27px;
            background: transparent;
            outline: 1px solid var(--black);
            opacity: 0.7;
            -webkit-transition: .2s;
            transition: opacity .2s;
          }
          
          .slider:hover {
            opacity: 1;
          }
          
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 25px;
            height: 25px;
            background: var(--light-text);
            cursor: pointer;
          }
          
    </style>
    <div class="container">
        <div class="option-slider">
            <img>
            <div class="slide-container">
                <div>
                    <input class="slider" id="blur-range" type="range" min="0" max="100" value="1">
                    <div class="number-container">
                        <p>0</p>
                    </div>  
                </div>
                <div class="slider-label">
                    <p><slot/></p>
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
    }
}

window.customElements.define("option-slider", OptionSlider)