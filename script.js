// Tasbih logic
let count = 0;
let target = 0;
const popunderLink = "https://www.effectivegatecpm.com/cyp2b2th7?key=4c48dc262b066e9e69253f092e89476e";

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

// Ad management with auto-refresh every 40 seconds
function getAdHTML(slot) {
    const type = slot.dataset.adType;
    if (type === 'atoptions') {
        const key = slot.dataset.adKey;
        const width = slot.dataset.adWidth;
        const height = slot.dataset.adHeight;
        if (!key) return '';
        const atOptions = {
            key: key,
            format: 'iframe',
            height: parseInt(height),
            width: parseInt(width),
            params: {}
        };
        return `<script>atOptions = ${JSON.stringify(atOptions)};</script>\n` +
               `<script src="https://www.highperformanceformat.com/${key}/invoke.js"></script>`;
    } else if (type === 'container') {
        const containerId = slot.dataset.adContainerId;
        const scriptSrc = slot.dataset.adScriptSrc;
        if (!containerId || !scriptSrc) return '';
        return `<div id="${containerId}"></div>\n` +
               `<script async="async" data-cfasync="false" src="${scriptSrc}"></script>`;
    }
    return '';
}

function loadAdInSlot(slot) {
    slot.innerHTML = '';
    const html = getAdHTML(slot);
    if (!html) return;

    const iframe = document.createElement('iframe');
    if (slot.dataset.adWidth) iframe.width = slot.dataset.adWidth;
    if (slot.dataset.adHeight) iframe.height = slot.dataset.adHeight;
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.display = 'block';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.src = 'about:blank';

    iframe.onload = function() {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();
        } catch (e) {
            console.warn('Ad iframe write error', e);
        }
    };

    slot.appendChild(iframe);
}

function refreshAllAds() {
    console.log('Refreshing all ads...', new Date().toLocaleTimeString());
    const slots = document.querySelectorAll('.ad-slot, #stickyBottomAd');
    slots.forEach(loadAdInSlot);
}

// Initialise when page loads
window.addEventListener('load', () => {
    refreshAllAds();
    setInterval(refreshAllAds, 40000); // 40 seconds
});
