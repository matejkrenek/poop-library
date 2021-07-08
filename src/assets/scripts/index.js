console.log("Javascript is kokot")


const btns = document.querySelectorAll(".btn")

btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        btn.classList.add("is-loading")

        setTimeout(() => {
            btn.classList.remove("is-loading")
            btn.classList.add("is-success")

            setTimeout(() => {
                btn.classList.remove("is-success")
            }, 1000)
        }, 1000)
    })
})
