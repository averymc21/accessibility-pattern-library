// Use a self-invoking function to avoid global scope pollution
(function() {
   // ===================================
   // A. Single-Page Navigation Logic
   // ===================================


   const navButtons = document.querySelectorAll('.nav-item');
   const pages = document.querySelectorAll('.page-content');
   const mainContent = document.getElementById('main-content');


   /**
    * Handles switching between content sections (pages)
    * @param {string} pageId - The ID of the page to show (e.g., 'home', 'patterns').
    */
   function showPage(pageId) {
       // 1. Hide all pages
       pages.forEach(page => {
           page.classList.remove('active-page');
       });


       // 2. Show the selected page
       const activePage = document.getElementById(`${pageId}-page`);
       if (activePage) {
           activePage.classList.add('active-page');


           // 3. Update active nav state and ARIA attribute
           navButtons.forEach(button => {
               const isCurrent = button.dataset.page === pageId;
               button.setAttribute('aria-current', isCurrent ? 'page' : 'false');
               // Simple style change for visual active state
               if (isCurrent) {
                   button.classList.add('bg-gray-100', 'text-gray-900');
               } else {
                   button.classList.remove('bg-gray-100', 'text-gray-900');
               }
           });


           // 4. Set focus to the main heading of the new page for screen reader users (WCAG 3.2.2)
           // The heading has a tabindex="-1" to make it programmatically focusable
           const pageHeading = activePage.querySelector('h2[tabindex="-1"]');
           if (pageHeading) {
               pageHeading.focus();
           } else {
               // Fallback focus to main content area
               mainContent.focus();
           }
       }
   }


   // Add click listeners to navigation buttons
   navButtons.forEach(button => {
       button.addEventListener('click', () => {
           const pageId = button.dataset.page;
           showPage(pageId);
       });
   });


   // Set initial state
   showPage('home');




   // ===================================
   // B. Interactive Text Scaling Demo Logic (Pattern 5)
   // ===================================


   const demoText = document.getElementById('demo-text');
   const increaseButton = document.getElementById('increase-text');
   const decreaseButton = document.getElementById('decrease-text');


   let currentFontSize = 16; // Initial font size in pixels (text-base)
   const step = 2; // Pixel step for size change
   const maxFontSize = 32; // Limit size to prevent overflow
   const minFontSize = 12; // Lower limit


   /**
    * Updates the font size of the demo text.
    * @param {number} newSize - The new font size in pixels.
    */
   function updateFontSize(newSize) {
       if (newSize > maxFontSize) newSize = maxFontSize;
       if (newSize < minFontSize) newSize = minFontSize;


       currentFontSize = newSize;
       demoText.style.fontSize = `${currentFontSize}px`;


       // Disable/enable buttons based on limits
       increaseButton.disabled = currentFontSize === maxFontSize;
       decreaseButton.disabled = currentFontSize === minFontSize;
      
       // Add ARIA attributes to indicate button state
       increaseButton.setAttribute('aria-disabled', increaseButton.disabled);
       decreaseButton.setAttribute('aria-disabled', decreaseButton.disabled);
   }


   increaseButton.addEventListener('click', () => {
       updateFontSize(currentFontSize + step);
   });


   decreaseButton.addEventListener('click', () => {
       updateFontSize(currentFontSize - step);
   });


   // Initialize button state
   updateFontSize(currentFontSize);




   // ===================================
   // C. Customizable Input & Pacing Logic (Pattern 2)
   // ===================================


   // Input Toggle Logic
   const inputToggleButton = document.getElementById('input-toggle-button');
   const inputStateSpan = document.getElementById('input-state');
   let isToggle = false;


   if (inputToggleButton) {
       inputToggleButton.addEventListener('click', () => {
           isToggle = !isToggle;
           if (isToggle) {
               inputStateSpan.textContent = 'TOGGLE ENABLED';
               inputToggleButton.classList.remove('bg-green-200', 'text-green-800', 'hover:bg-green-300');
               inputToggleButton.classList.add('bg-blue-200', 'text-blue-800', 'hover:bg-blue-300');
           } else {
               inputStateSpan.textContent = 'HOLD REQUIRED';
               inputToggleButton.classList.remove('bg-blue-200', 'text-blue-800', 'hover:bg-blue-300');
               inputToggleButton.classList.add('bg-green-200', 'text-green-800', 'hover:bg-green-300');
           }
       });
   }


   // Pacing Control Logic
   const speedButtons = document.querySelectorAll('.speed-btn');


   speedButtons.forEach(button => {
       button.addEventListener('click', () => {
           const selectedSpeed = button.dataset.speed;
          
           // Reset all buttons
           speedButtons.forEach(btn => {
               btn.classList.remove('text-blue-700');
               btn.classList.add('text-gray-900');
           });


           // Highlight selected button
           button.classList.add('text-blue-700');
           button.classList.remove('text-gray-900');
          
           // Ensure the first button is rounded-l-lg and the last is rounded-r-lg for visual consistency
           speedButtons[0].classList.remove('rounded-r-lg');
           speedButtons[0].classList.add('rounded-l-lg');
           speedButtons[speedButtons.length - 1].classList.remove('rounded-l-lg');
           speedButtons[speedButtons.length - 1].classList.add('rounded-r-lg');
       });
   });




   // ===================================
   // D. Failsafe & Error Recovery Logic (Pattern 4)
   // ===================================


   // Progress Gate Logic
   const skipChallengeButton = document.getElementById('skip-challenge-button');
   const failAttemptButton = document.getElementById('fail-attempt-button');
   let attempts = 0;
   const maxAttempts = 3;


   if (failAttemptButton) {
       failAttemptButton.addEventListener('click', () => {
           if (attempts < maxAttempts) {
                attempts++;
           }
          
           failAttemptButton.textContent = `Fail Attempt (${attempts}/${maxAttempts})`;
          
           if (attempts >= maxAttempts) {
               skipChallengeButton.disabled = false;
               skipChallengeButton.setAttribute('aria-disabled', 'false');
               skipChallengeButton.textContent = 'Skip Difficult Section (Available)';
               skipChallengeButton.classList.remove('bg-red-500', 'hover:bg-red-600', 'disabled:opacity-50');
               skipChallengeButton.classList.add('bg-green-500', 'hover:bg-green-600');
           }
       });
   }
  
   // Media Control Logic (Simple visual state change)
   const mediaPlayButton = document.getElementById('media-play-button');
   const mediaPauseButton = document.getElementById('media-pause-button');
  
   if (mediaPlayButton && mediaPauseButton) {
       mediaPlayButton.addEventListener('click', () => {
           mediaPlayButton.classList.remove('bg-gray-700');
           mediaPlayButton.classList.add('bg-green-500');
           mediaPauseButton.classList.remove('bg-red-500', 'text-white');
           mediaPauseButton.classList.add('bg-gray-200', 'text-gray-800');
       });
      
       mediaPauseButton.addEventListener('click', () => {
           mediaPauseButton.classList.remove('bg-gray-200', 'text-gray-800');
           mediaPauseButton.classList.add('bg-red-500', 'text-white');
           mediaPlayButton.classList.remove('bg-green-500');
           mediaPlayButton.classList.add('bg-gray-700');
       });
      
       // Initialize state
       mediaPauseButton.click(); // Start in paused state
   }
  
})();

