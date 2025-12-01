import { checkUI } from './helper';
import {createAccount, loginAccount} from '../config/auth';
import bot from '../public/bot.png?url';
import './css/style.css';


const botImage = document.getElementById('bot-image') as HTMLImageElement;
botImage.src = bot;


// Auth HTML Elements
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signupEmail = signupForm.querySelector('#signup-email') as HTMLInputElement;
const signupPassword = signupForm.querySelector('#signup-password') as HTMLInputElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginEmail = loginForm.querySelector('#login-email') as HTMLInputElement;
const loginPassword = loginForm.querySelector('#login-password') as HTMLInputElement;
const closeModalBtn = document.getElementById('closebtn') as HTMLButtonElement;

// Main UI keypad check
const inputBar = document.querySelector('.input-bar') as HTMLElement;
const messages = document.querySelector('.messages') as HTMLElement;


// Create Account
function createNewUser(): void {  
  const email: string = signupEmail.value;
  const password: string = signupPassword.value;

   if(!email && !password){
    signupEmail.style.border = '2px solid red';
    signupPassword.style.border = '2px solid red';
    return
  } else if(!email){
    signupEmail.style.border = '2px solid red';
    return
  } else if(!password){
    signupPassword.style.border = '2px solid red';
    return
  } 

  createAccount(email, password);
  closeModalBtn.click();
}

// Log in to account
function loginUser(): void {
  const email: string = loginEmail.value;
  const password: string = loginPassword.value;

  if(!email && !password){
    loginEmail.style.border = '2px solid red';
    loginPassword.style.border = '2px solid red';
    return
  } else if(!email){
    loginEmail.style.border = '2px solid red';
    return
  } else if(!password){
    loginPassword.style.border = '2px solid red';
    return
  }

  loginAccount(email, password);
  closeModalBtn.click()
}

checkUI(inputBar, messages);

// Add Event Listeners
signupForm.addEventListener('submit', createNewUser);
loginForm.addEventListener('submit', loginUser);
window.visualViewport?.addEventListener('scroll', () => {
  inputBar.style.transform = `translate(${window.visualViewport?.offsetTop}px)`
})


