const inputBar = document.querySelector('.input-bar') as HTMLElement
const messages = document.querySelector('.messages') as HTMLElement

export function checkUI(){
  if (window.visualViewport){
    window.visualViewport.addEventListener('resize', () => {
      const offset = window.visualViewport?.offsetTop

      inputBar.style.transform = `translateY(${offset}px)`

      messages.style.height = window.visualViewport?.height + 'px'
    })
  }
}

window.visualViewport?.addEventListener('scroll', () => {
  inputBar.style.transform = `translate(${window.visualViewport?.offsetTop}px)`
})

// export function animateOnLoad(){
//   window.addEventListener("load", () => {
//     anime({
//       targets: '.sentry',
//       opacity: [0, 1],
//       translate: [50, 0],
//       duration: 1000,
//       easing: 'easeOutExpo'
//     })
//   })
// }