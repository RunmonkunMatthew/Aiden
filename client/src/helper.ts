import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//render
export function render() {
  const auth = getAuth()

  onAuthStateChanged(auth, user => {
    if(user) {
      showMainUi()
    } else {
      showWelcome()
    }
  })
}


// show main ui
export function showMainUi():void {
  const header = document.querySelector('.header') as HTMLDivElement;
  const slider = document.querySelector('.slider') as HTMLDivElement;
  const mainUi = document.querySelector('.main-ui') as HTMLDivElement;

  slider.classList.add('hidden')
  header.classList.remove('hidden')
  mainUi.classList.remove('hidden')
}

//showWelcome
export function showWelcome():void {
  const header = document.querySelector('.header') as HTMLDivElement;
  const slider = document.querySelector('.slider') as HTMLDivElement;
  const mainUi = document.querySelector('.main-ui') as HTMLDivElement;

  slider.classList.remove('hidden')
  header.classList.add('hidden')
  mainUi.classList.add('hidden')
}

// Show loader
export function showSpinner(btn:HTMLButtonElement):void {
    btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status">
     <span class="visually-hidden">Loading...</span>
    </div>`
}

// hide loader
export function hideSpinner(btn:HTMLButtonElement, message: string):void {
    btn.innerHTML = message
}

// Show Alert 
export function showAlert( text:string):void {
  const alertEl = document.getElementById('alert') as HTMLDivElement
  const alertText = document.querySelector('.alert-text') as HTMLDivElement

  alertEl.classList.remove('hidden');
  alertText.textContent = text

  setTimeout(() => {
    alertEl.classList.add('hidden')
  }, 3000)
}

// show typing indicator
export function showTypingIndicator() {
const container = document.getElementById('messages')!;
const bubble = document.createElement('div');

bubble.className = 'typing-indicator';
bubble.id = 'typing-indicator';

bubble.innerHTML = `
<span></span>
<span></span>
<span></span>
`;

container.appendChild(bubble);
container.scrollTop = container.scrollHeight;
}

// hide typing indicator
export function removeTypingIndicator() {
document.getElementById('typing-indicator')?.remove();
}


// Typing animation
export function typeText(element: HTMLElement, text: string, speed = 20) {
let index = 0;

function type() {
if (index < text.length) {
element.textContent += text.charAt(index);
index++;
setTimeout(type, speed);
element.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
}

type();
}


// input above Keybord
export function checkUI(): void {
  const inputBar = document.querySelector('.input-area') as HTMLElement;
  const messages = document.querySelector('.messages') as HTMLElement;

  if (window.visualViewport){
    window.visualViewport.addEventListener('resize', () => {
      const offset = window.visualViewport?.offsetTop

      inputBar.style.transform = `translateY(${offset}px)`

      messages.style.height = window.visualViewport?.height + 'px'
    })
  }
}


// Format Firebase Error
const firebaseErrorMap: Record<string, string> = {
  "auth/email-already-in-use": "Email is already registered.",
  "auth/invalid-email": "Invalid email address.",
  "auth/wrong-password": "Incorrect password.",
  "auth/user-not-found": "No account found with entered email.",
  "auth/invalid-credential": "Incorrect email or password",
  "auth/too-many-requests": "Too many login attempts. Please try again later.",
};


export function formatFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    return firebaseErrorMap[error.code] ?? "Something went wrong.";
  }
  return "Something went wrong.";
}

export function scrollToBottom(){
  const messages = document.querySelector('#messages')! as HTMLDivElement

  messages.scrollTop = messages.scrollHeight
}