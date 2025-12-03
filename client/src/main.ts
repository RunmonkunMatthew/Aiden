import { showAlert, showSpinner, hideSpinner, showMainUi, showWelcome, formatFirebaseError } from './helper';
import {createAccount, loginAccount, signUserOut} from '../config/auth';
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
const closeLogin = document.getElementById('closelogin') as HTMLButtonElement
const signupBtn = document.getElementById('signup-btn') as HTMLButtonElement
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement
const inputBar = document.querySelector('.input-area') as HTMLElement;


// Create Account
async function createNewUser(e:Event): Promise<void> {  
  e.preventDefault()

 try {
   showSpinner(signupBtn)

  const email: string = signupEmail.value;
  const password: string = signupPassword.value;

   if(!email && !password){
    signupEmail.style.border = '2px solid red';
    signupPassword.style.border = '2px solid red';
    showAlert('Enter all fields!')
    return
  } else if(!email){
    signupEmail.style.border = '2px solid red';
    showAlert('Enter email address')
    return
  } else if(!password){
    signupPassword.style.border = '2px solid red';
    showAlert('Enter your password')
    return
  } 

 await createAccount(email, password);


 showMainUi()
 closeModalBtn.click();

 } catch (error) {
  showAlert(formatFirebaseError(error))
  
 } finally{
  signupForm.reset()
  hideSpinner(signupBtn, 'Sign up')
 }
  

}

// Log in to account
async function loginUser(e:Event): Promise<void> {
  e.preventDefault()

 try {
   showSpinner(loginBtn)

  const email: string = loginEmail.value;
  const password: string = loginPassword.value;

  if(!email && !password){
    loginEmail.style.border = '2px solid red';
    loginPassword.style.border = '2px solid red';
    showAlert('Enter all fields!')
    return
  } else if(!email){
    loginEmail.style.border = '2px solid red';
    showAlert('Enter email address')
    return
  } else if(!password){
    loginPassword.style.border = '2px solid red';
    showAlert('Enter your password')
    return
  }

  await loginAccount(email, password);
  closeLogin.click()

  showMainUi()
 } catch (error) {
  
  showAlert(formatFirebaseError(error));
  
  
 } finally{
  loginForm.reset()
   hideSpinner(loginBtn, 'log in')
 }
   
}



// Add Event Listeners
signupForm.addEventListener('submit', createNewUser);
loginForm.addEventListener('submit', loginUser);
window.visualViewport?.addEventListener('scroll', () => {
  inputBar.style.transform = `translate(${window.visualViewport?.offsetTop}px)`
})