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

        label {
            color: var(--light-text);
            font-size: 14px;
            user-select: none;
            cursor: pointer;
        }


        .wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
        }



        input[type="checkbox"] {
            appearance: none;
            -webkit-appearnce: none;
            height: 20px;
            width: 20px;
            background-color: var(--prymairy);
            outline: 2px solid var(--secondary);
            border-radius: 1px;
            cursor: pointer;
        }

        input[type="checkbox"]:hover {
            background-color: var(--dark-text);
        }

        input[type="checkbox"]:checked{
            background-color: var(--light-text);
            outline: 1px solid var(--light-text);
        }

        

    </style>
    <div class="wrapper">
      
        <input type="checkbox" class="menu-item">
        <label class="container"><slot /></label>
      
    </div>
`

class OptionCheckbox extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open"});
        this.shadowRoot.appendChild(template.content.
        cloneNode(true));

        const id = this.getAttribute("id");
        const checkbox = this.shadowRoot.querySelector("input");
        const label = this.shadowRoot.querySelector("label");

        console.log("broh", id)
        checkbox.name = id;
        checkbox.id = id;
        label.htmlFor = id;
        
    }

    connectedCallback() {
        
    }
}

window.customElements.define("option-checkbox", OptionCheckbox)