import { FirebaseError } from "firebase/app";

export function render() {
 const introPage = document.getElementById('intro-slider') as HTMLDivElement

 introPage.innerHTML = `
  <div class="intro-header">
        <h1>Welcome To Aiden</h1>
        <span>...your first line of aid, anytime.</span>
      </div>

      <div class="sentry">
        <img src="" alt="sentry" id="bot-image" />
        <h2>hi, i'm Sentry</h2>
      </div>

      <div class="text">
        <p>
          Aiden provides AI-generated first-aid guidance and does not replace
          professional medical advice, diagnosis or emergency services. Always
          seek licensed medical help when possible or in situations when things
          escalate
        </p>
      </div>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        href="#exampleModalToggle"
        role="button"
      >
        Continue
      </button>
 `
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

// Show auth loader
export function showSpinner(btn:HTMLButtonElement):void {
    btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status">
     <span class="visually-hidden">Loading...</span>
    </div>`
}

// hide auth loader
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