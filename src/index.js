// class _Ajax {
//     constructor() {

//     }

//     async GET(endpoint, data) {
//         const url = this.origin + endpoint

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 ...this.headers
//             }
//         })

//         this.is_failed = false

//         return response
//     }

//     POST(endpoint, data) {

//     }

//     PUT(endpoint, data) {

//     }

//     DELETE(endpoint, data) {

//     }

//     success() {
//         console.log("success")

//         return this
//     }

//     error(err) {
//         console.log("error")

//         return this
//     }

//     init(config = {}) {
//         this.origin = config.origin || window.location.origin
//         this.headers = config.headers || {}
//     }
// }

// const Ajax = new _Ajax()

// Ajax.init({
//     origin: 'http://127.0.0.1:5500',
//     headers: {
//         'X-CSRF-TOKEN': 'jkd488sdjk12jd9FDJa4A'
//     }
// })

const poopAction = document.querySelector("[poop-action]");
const poopActionId = poopAction.getAttribute("poop-action").split("#")[1]
const poopActionName = poopAction.getAttribute("poop-action").split("#")[0]


poopAction.addEventListener("click", (e) => {
    const popup = document.querySelector(`[poop-component*='popup::side#${poopActionId}']`)

    if(popup.getAttribute('poop-status') !== 'active') {
        popup.setAttribute('poop-status', 'active')
        document.body.setAttribute('poop-overlay', '')
    } else {
        popup.removeAttribute('poop-status')
    }
})

document.addEventListener("click", (e) => {
    if(e.target === document.body) {
        if(document.body.getAttribute('poop-overlay') !== null) {
            document.querySelector(`[poop-component*='popup::side#${poopActionId}']`).removeAttribute('poop-status')
            setTimeout(() => {
                document.body.removeAttribute('poop-overlay')
            }, 300)
        }
    }
})


