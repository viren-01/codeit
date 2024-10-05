const input = document.querySelector('input')
const defaultSpan = document.getElementById('default')
const deboundSpan = document.getElementById('debounce')
const throttleSpan = document.getElementById('throttle')


input.addEventListener('input', (e) => {
    defaultSpan.textContent = e.target.value
    // deboundSpan.textContent = e.target.value
    updateDebounceText(e.target.value)
    updateThrottleText(e.target.value)
})

const updateDebounceText = debounce(text => {
    deboundSpan.textContent = text
})

const updateThrottleText = throttle((text) => {
    throttleSpan.textContent = text
})


function debounce (cb, delay=1000) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
    
}

function throttle(cb, delay=1000) {
    let shouldWait = false

    return (...args) => {
        if(shouldWait) return
        cb(...args)
        shouldWait = true

        setTimeout(() => {
            shouldWait = false
        }, delay)
    }
}