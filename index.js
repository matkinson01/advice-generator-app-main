const adviceID = document.getElementById('adviceID');
const adviceMessage = document.getElementById('adviceMessage');
const patternDivider = document.getElementById('patternDivider');
const diceBtn = document.getElementById('diceBtn');

const url = 'https://api.adviceslip.com/advice'; // Base URL, get random advice

const mobilePatternDivider = '<svg width="295" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z"/><g transform="translate(138)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>';
const desktopPatternDivider = '<svg width="444" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>';

async function getAdvice() {
    const response = await fetch(url,
        {
            method: 'GET',
            headers: { accept: 'application/json'}
        });
    if(!response.ok) throw new Error(`HTTP Error status: ${response.status}`);
    const data = await response.json();
    displayAdvice(data.slip);
}

function displayAdvice(data) {
    adviceID.textContent = `Advice #${data.id}`;
    adviceMessage.textContent = `"${data.advice}"`;
    patternDivider.innerHTML = window.innerWidth < 525 ? mobilePatternDivider : desktopPatternDivider;
}

// Check window width to display as screen resizes in real time
window.addEventListener('resize', (e) => {
    patternDivider.innerHTML = window.innerWidth < 525 ? mobilePatternDivider : desktopPatternDivider;
})

diceBtn.addEventListener('click', getAdvice);

// Call the getAdvice function on initial form load
window.onload = getAdvice();