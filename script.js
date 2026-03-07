let count = 0;
let target = 0;
const popunderLink = "https://www.effectivegatecpm.com/cyp2b2th7?key=4c48dc262b066e9e69253f092e89476e";

// Function to initialize an ad container based on its data attributes
function initAdContainer(container) {
    const type = container.dataset.adType;
    if (type === 'atoptions') {
        const key = container.dataset.adKey;
        const width = container.dataset.adWidth;
        const height = container.dataset.adHeight;
        if (!key) return;

        // Clear container
        container.innerHTML = '';

        // Create atOptions script
        const atScript = document.createElement('script');
        atScript.text = `
            atOptions = {
                'key' : '${key}',
                'format' : 'iframe',
                'height' : ${height},
                'width' : ${width},
                'params' : {}
            };
        `;
        container.appendChild(atScript);

        // Create invoke script
        const invokeScript = document.createElement('script');
        invokeScript.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
        container.appendChild(invokeScript);
    }
    else if (type === 'container') {
        const containerId = container.dataset.adContainerId;
        const scriptSrc = container.dataset.adScriptSrc;
        if (!containerId || !scriptSrc) return;

        // Clear container
        container.innerHTML = '';

        // Create the inner container div
        const innerDiv = document.createElement('div');
        innerDiv.id = containerId;
        container.appendChild(innerDiv);

        // Create the script
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = scriptSrc;
        container.appendChild(script);
    }
}

// Function to refresh all ads
function refreshAllAds() {
    // Select all ad containers (ad-slot class and sticky bottom ad)
    const adContainers = document.querySelectorAll('.ad-slot, #stickyBottomAd');
    adContainers.forEach(container => {
        initAdContainer(container);
    });
    console.log('All ads refreshed at', new Date().toLocaleTimeString());
}

function startTasbih() {
    const val = document.getElementById('targetInput').value;
    if (val < 1) { alert("Meharbani karke target likhein!"); return; }
    target = parseInt(val);
    document.getElementById('target-display').innerText = "Hadaf (Target): " + target;
    document.getElementById('setup-screen').style.display = "none";
    window.scrollTo(0, 0);
}

function increment() {
    if (count < target) {
        count++;
        document.getElementById('counter').innerText = count;
        document.getElementById('bar').style.width = (count / target) * 100 + "%";
        if (navigator.vibrate) navigator.vibrate(60);
        if (count === target) { showReward(); }
    }
}

function showReward() {
    window.open(popunderLink, '_blank');
    const popup = document.getElementById('reward-popup');
    document.getElementById('congrats-text').innerHTML = `SubhanAllah! Aapne <b>${target}</b> martaba zikr mukammal kar liya hai. <br> Allah aapki is koshish ko qubool farmaye. 🎉`;
    popup.style.display = "flex";
}

function resetForNewGoal() {
    count = 0;
    target = 0;
    document.getElementById('counter').innerText = "0";
    document.getElementById('bar').style.width = "0%";
    document.getElementById('reward-popup').style.display = "none";
    document.getElementById('setup-screen').style.display = "flex";
}

// Start auto-refresh every 40 seconds when page loads
window.onload = function() {
    setInterval(refreshAllAds, 40000);
};