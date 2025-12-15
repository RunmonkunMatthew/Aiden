export function showMainUi():void {
  const slider = document.querySelector('.slider') as HTMLDivElement;
  const mainUi = document.querySelector('.main-ui') as HTMLDivElement;
}

export function checkUI(inputBar:HTMLElement, messages:HTMLElement): void {
  if (window.visualViewport){
    window.visualViewport.addEventListener('resize', () => {
      const offset = window.visualViewport?.offsetTop

      inputBar.style.transform = `translateY(${offset}px)`

      messages.style.height = window.visualViewport?.height + 'px'
    })
  }
}

export function showAlert(alertElement: HTMLDivElement, alertText:HTMLDivElement):void {
  alertElement.classList.remove('hidden');
  alertText.textContent = ''
}

const firebaseErrorMap: object = {
  "auth/email-already-in-use": "Email is already registered.",
  "auth/invalid-email": "Invalid email address.",
  "auth/wrong-password": "Incorrect password.",
  "auth/user-not-found": "No account found with that email.",
  "auth/invalid-credential": "Incorrect email or password",
  "auth/too-many-requests": "Too many login attempts. Please try again later.",
};

// export function formatFirebaseError(error) {
//   return firebaseErrorMap[error.code] || "Something went wrong.";
// }