// --- ROI & REVENUE CALCULATOR LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const totalRevenueRangeEl = document.getElementById('total-revenue-range');
    const ptsInput = document.getElementById('num-pts');
    const testsPerPtInput = document.getElementById('tests-per-pt');
    const weeklyRevenueEl = document.getElementById('weekly-revenue');
    const monthlyRevenueEl = document.getElementById('monthly-revenue');
    const annualRevenueEl = document.getElementById('annual-revenue');
    const weeklyTimeUsedEl = document.getElementById('weekly-time-used');
    const weeklyTimePerPtEl = document.getElementById('weekly-time-per-pt');
    const revenuePerHourEl = document.getElementById('revenue-per-hour');
    const allReportCards = document.querySelectorAll('.report-catalog-card');
    const formatCurrency = (value) => new Intl.NumberFormat('nb-NO').format(value);

    function calculateTotalPotential() {
        let totalMin = 0;
        let totalMax = 0;
        allReportCards.forEach(card => {
            totalMin += parseInt(card.dataset.priceMin);
            totalMax += parseInt(card.dataset.priceMax);
        });
        if (totalRevenueRangeEl) totalRevenueRangeEl.textContent = `${formatCurrency(totalMin)} - ${formatCurrency(totalMax)},-`;
    }

    function calculateROI() {
        const numPTs = parseInt(ptsInput.value) || 0;
        const testsPerPT = parseInt(testsPerPtInput.value) || 0;
        const numTests = numPTs * testsPerPT;

        let totalMinPrice = 0;
        let totalMaxPrice = 0;
        let totalMinDuration = 0;
        let totalMaxDuration = 0;

        allReportCards.forEach(card => {
            totalMinPrice += parseInt(card.dataset.priceMin);
            totalMaxPrice += parseInt(card.dataset.priceMax);
            totalMinDuration += parseInt(card.dataset.durationMin);
            totalMaxDuration += parseInt(card.dataset.durationMax);
        });

        const avgMinPrice = totalMinPrice / allReportCards.length;
        const avgMaxPrice = totalMaxPrice / allReportCards.length;
        const avgMinDuration = totalMinDuration / allReportCards.length;
        const avgMaxDuration = totalMaxDuration / allReportCards.length;

        const weeklyMin = Math.round(numTests * avgMinPrice);
        const weeklyMax = Math.round(numTests * avgMaxPrice);
        const monthlyMin = weeklyMin * 4;
        const monthlyMax = weeklyMax * 4;
        const annualMin = monthlyMin * 12;
        const annualMax = monthlyMax * 12;

        const weeklyTimeMinHours = (numTests * avgMinDuration) / 60;
        const weeklyTimeMaxHours = (numTests * avgMaxDuration) / 60;

        const weeklyTimePerPTMin = numPTs > 0 ? weeklyTimeMinHours / numPTs : 0;
        const weeklyTimePerPTMax = numPTs > 0 ? weeklyTimeMaxHours / numPTs : 0;

        const revenuePerHourMin = weeklyTimeMinHours > 0 ? weeklyMin / weeklyTimeMinHours : 0;
        const revenuePerHourMax = weeklyTimeMaxHours > 0 ? weeklyMax / weeklyTimeMaxHours : 0;

        weeklyRevenueEl.textContent = `${formatCurrency(weeklyMin)} - ${formatCurrency(weeklyMax)},-`;
        monthlyRevenueEl.textContent = `${formatCurrency(monthlyMin)} - ${formatCurrency(monthlyMax)},-`;
        annualRevenueEl.textContent = `${formatCurrency(annualMin)} - ${formatCurrency(annualMax)},-`;
        weeklyTimeUsedEl.textContent = `${weeklyTimeMinHours.toFixed(1)} - ${weeklyTimeMaxHours.toFixed(1)} hours`;
        weeklyTimePerPtEl.textContent = `${weeklyTimePerPTMin.toFixed(1)} - ${weeklyTimePerPTMax.toFixed(1)} hours`;
        revenuePerHourEl.textContent = `${formatCurrency(Math.round(revenuePerHourMin))} - ${formatCurrency(Math.round(revenuePerHourMax))},-`;
    }

    if (ptsInput && testsPerPtInput) {
        ptsInput.addEventListener('input', calculateROI);
        testsPerPtInput.addEventListener('input', calculateROI);
        // Initial calculations on load
        calculateTotalPotential();
        calculateROI();
    }
});

// --- Deep Dive / Modal Logic ---
const heroContentData = { 'gym': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/9MB_Alphatek_GYM.mp4', staticText: "Generate Greater Outcomes:", rotatorWords: ["Target New Customer Groups.", "Deliver Smarter Care.", "Boost Patient Compliance.", "Target New Customer Groups."] }, 'fysio': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/9MB_Alphatek_FYSIO.mp4', staticText: "Generate Greater Outcomes:", rotatorWords: ["Target New Customer Groups.", "Deliver Smarter Care.", "Boost Patient Compliance.", "Target New Customer Groups."] }, 'clinic': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/9MB_Alphatek_TOPPIDRETT_OILERS.mp4', staticText: "Generate Greater Outcomes:", rotatorWords: ["Target New Customer Groups.", "Deliver Smarter Care.", "Boost Patient Compliance.", "Target New Customer Groups."] } };
const deepDiveData = { 'runSafer': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/Videoer%20colo/Running%20Version%20-%20NO%20TEXT%20ON%20-%20Alphatatek%20-%20Knee%20Test%20-%204k%20.mp4', reportImage: 'https://storage.googleapis.com/intro_alphatek/reports/Return%20to%20play.png', title: 'Run Safer', explanation: 'Protocol for runners post-injury.', tests: ['Single-Leg CMJ', 'RSI', 'Drop Jump', 'Lateral Stability'] }, 'returnToPlay': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/Videoer%20colo/NO%20TEXT%20ON%20-%20Alphatatek%20-%20Knee%20Test%20-%204k%20.mp4', reportImage: 'https://storage.googleapis.com/intro_alphatek/reports/Return%20to%20play.png', title: 'Return to Play', explanation: 'Robust assessment for return to play.', tests: ['CMJ', 'Single-Leg CMJ', 'RSI', 'Drop Jump'] }, 'shoulderScreening': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/Videoer%20colo/Social%20Media%20-%20Alphatatek%20-%20Shoulder%20Test%20-%204k%20%20(1).mp4', reportImage: 'https://storage.googleapis.com/intro_alphatek/reports/shoulder.png', title: 'Shoulder Screening', explanation: 'ASH test for shoulder strength.', tests: ['Isometric Y', 'Isometric T', 'Ext/Int Rotation'] }, 'seniorFitness': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/Videoer%20colo/Age%20Test%20-%20NO%20TEXT%20ON%20-%20Alphatatek%20-%204k%20.mp4', reportImage: 'https://storage.googleapis.com/intro_alphatek/reports/senior%20raport.png', title: 'Senior Fitness Test', explanation: 'Fall risk assessment.', tests: ['Balance', 'Function', 'Strength'] }, 'fitnessAge': { video: 'https://storage.googleapis.com/intro_alphatek/videoer/Videoer%20colo/Age%20Test%202%20-%20NO%20TEXT%20ON%20-%20Alphatatek%20-%204k%20%20(1).mp4', title: 'Fitness Age', explanation: 'Motivational concept comparing bio vs functional age.', isFitnessCard: true } };

// Report Data for Modals
const reportData = {
    'performance': { title: 'Performance Report', explanation: "Measures explosive power.", tests: ['IMTP', 'CMJ', 'RSI', 'Repetitive CMJ'] },
    'advanced-pt': { title: 'Advanced PT Report', explanation: 'For experienced training.', tests: ['Double/Single CMJ', 'F-V Profile', 'IMTP'] },
    'basic-pt': { title: 'Basic PT / Rehab', explanation: 'For beginners/rehab.', tests: ['IMTP', 'Jump', 'Balance'] },
    'intermediate-pt': { title: 'Intermediate PT Report', explanation: 'For regular members.', tests: ['Balance', 'Isopull', 'Pushups', 'Squat'] },
    'senior-wellness': { title: 'Senior Wellness Report', explanation: 'Fall risk assessment.', tests: ['Balance', 'Function', 'Strength'] },
    'return-to-activity-running': { title: 'Return to Activity', explanation: 'For recreational athletes.', tests: ['CMJ', 'Single-Leg CMJ', 'RSI', 'Drop Jump', 'Lateral Stability'] },
    'return-to-sport-running': { title: 'Return to Sport', explanation: 'For athletes.', tests: ['CMJ', 'Single-Leg CMJ', 'RSI', 'Drop Jump', 'Lateral Stability'] },
    'return-to-play-running': { title: 'Return to Play', explanation: 'For performance.', tests: ['CMJ', 'Single-Leg CMJ', 'RSI', 'Drop Jump', 'Lateral Stability'] },
    'baseline-screening-running': { title: 'Baseline Screening', explanation: 'Reference data.', tests: ['CMJ', 'Single-Leg CMJ', 'RSI', 'Drop Jump', 'Lateral Stability'] },
    'return-safe-to-run': { title: 'Return Safe to Run', explanation: 'Runner protocol.', tests: ['CMJ', 'Single-Leg CMJ', 'RSI', 'Drop Jump', 'Lateral Stability'] },
    'shoulder-screening': { title: 'Shoulder: Return to Activity', explanation: 'ASH test.', tests: ['Iso Y', 'Iso T', 'Rotation'] },
    'shoulder-baseline': { title: 'Shoulder Baseline', explanation: 'New programs.', tests: ['Iso Y', 'Iso T', 'Rotation'] },
    'shoulder-return-performance': { title: 'Shoulder Performance', explanation: 'Elite athletes.', tests: ['Iso Y', 'Iso T', 'Rotation'] },
    'shoulder-return-sport': { title: 'Shoulder Sport', explanation: 'Overhead sports.', tests: ['Iso Y', 'Iso T', 'Rotation'] }
};

function updateHeroContent(key, btn) {
    const data = heroContentData[key];
    if (!data) return;
    const video = document.getElementById('hero-video');
    const source = video.querySelector('source');
    source.src = data.video;
    video.load();
    var playPromise = video.play();
    if (playPromise !== undefined) { playPromise.then(_ => { }).catch(error => { if (error.name !== 'AbortError') console.error("Video error:", error); }); }
    document.getElementById('hero-static-text').textContent = data.staticText;
    const rotatorEl = document.getElementById('hero-rotator');
    rotatorEl.innerHTML = '';
    data.rotatorWords.forEach(word => { const span = document.createElement('span'); span.textContent = word; rotatorEl.appendChild(span); });
    document.querySelectorAll('.video-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function renderDeepDive(key, btn) {
    const display = document.getElementById('deep-dive-display');
    const data = deepDiveData[key];
    if (!data) return;
    document.querySelectorAll('.deep-dive-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    display.style.opacity = '0';
    setTimeout(() => {
        let centerContent = data.isFitnessCard ?
            `<div class="fitness-age-card"><div class="age-row"><span class="age-label">Max Strength</span><span class="age-value">33</span></div><div class="age-row"><span class="age-label">Balance</span><span class="age-value">34</span></div><div class="age-row"><span class="age-label">Function</span><span class="age-value">31</span></div><div class="total-age"><span class="label">Fitness Age</span><span class="value">32</span></div></div>` :
            `<div class="deep-dive-report-container" onclick="expandImage('${data.reportImage}')" title="Expand"><img src="${data.reportImage}" class="deep-dive-report-img"></div>`;
        const listItems = data.tests ? data.tests.map(t => `<li>${t}</li>`).join('') : '';
        display.innerHTML = `<div class="deep-dive-video-container"><video class="deep-dive-video" autoplay muted loop playsinline><source src="${data.video}" type="video/mp4"></video></div>${centerContent}<div class="deep-dive-info"><h3>${data.title}</h3><p>${data.explanation}</p>${listItems ? `<h4>Tests</h4><ul>${listItems}</ul>` : ''}</div>`;
        display.style.opacity = '1';
    }, 300);
}

// Needs to be global for inline calls
window.renderDeepDive = renderDeepDive;
window.updateHeroContent = updateHeroContent;
// --- TYPING EFFECT LOGIC ---
const valuePropTexts = [
    "<strong>Generate greater outcomes</strong> with a tool that helps you <strong>target new customer groups</strong>, <strong>deliver smarter care</strong> with <strong>objective data</strong>, and <strong>boost patient compliance</strong>."
];

function initValuePropTyper() {
    const typerElement = document.getElementById('value-prop-typer');
    if (!typerElement) return;

    let textIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let wordIndex = 0;
    let words = [];

    function type() {
        const fullTextHTML = valuePropTexts[textIndex];
        // We need to parse the HTML to get words while preserving tags, but for simplicity in this specific case,
        // since we know the structure is simple (just <strong> tags), we can split by spaces but we need to be careful.
        // A better approach for "word by word" with HTML is to pre-parse the string into an array of "tokens" (words with their tags).

        // Simple parser: split by space, but keep tags attached to the words they belong to.
        // Actually, let's just split by space and if a word starts with <, it's a tag.
        // But <strong>Word</strong> is one unit.
        // Let's pre-process the current text string into an array of words/tokens.

        if (words.length === 0) {
            // Simple split by space, but we need to handle the HTML tags.
            // The user wants "word by word".
            // "<strong>Progress</strong>" is one unit. "you" is one unit.
            // Let's use a regex to match non-space sequences.
            words = fullTextHTML.split(' ');
        }

        // Add word by word
        wordIndex++;

        currentText = words.slice(0, wordIndex).join(' ');
        typerElement.innerHTML = currentText;

        let typeSpeed = 100; // Slightly faster typing

        if (wordIndex === words.length) {
            // Finished typing sentence - STOP HERE
            return;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

window.expandImage = function (src) {
    const modal = document.getElementById('report-modal-overlay');
    let fullImg = modal.querySelector('.full-image-modal-content');
    if (!fullImg) {
        fullImg = document.createElement('div'); fullImg.className = 'full-image-modal-content'; fullImg.style.display = 'none'; modal.appendChild(fullImg);
    }
    fullImg.innerHTML = `<img src="${src}"><button class="close-report-modal" style="position:fixed;top:20px;right:20px;">&times;</button>`;
    fullImg.querySelector('.close-report-modal').onclick = closeReportModal;
    const contentDiv = modal.querySelector('.report-modal-content');
    if (contentDiv) contentDiv.style.display = 'none';
    fullImg.style.display = 'flex';
    document.body.classList.add('modal-open');
    modal.classList.add('is-visible');
};

window.closeReportModal = function () {
    const modal = document.getElementById('report-modal-overlay');
    document.body.classList.remove('modal-open');
    modal.classList.remove('is-visible');
    setTimeout(() => {
        const contentDiv = modal.querySelector('.report-modal-content');
        const fullImg = modal.querySelector('.full-image-modal-content');
        if (contentDiv) contentDiv.style.display = 'grid';
        if (fullImg) fullImg.style.display = 'none';
    }, 300);
};

// Initialize deep dive
document.addEventListener('DOMContentLoaded', () => {
    renderDeepDive('runSafer');

    // Add listeners for catalog
    document.querySelectorAll('.report-catalog-card, .hero-report-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('report-reference-link')) {
                const id = card.dataset.reportId;
                const data = reportData[id];
                if (data) {
                    const modal = document.getElementById('report-modal-overlay');
                    const img = card.querySelector('img').src;
                    document.getElementById('modal-report-image').src = img;
                    document.getElementById('modal-report-title').textContent = data.title;
                    document.getElementById('modal-report-explanation').textContent = data.explanation;
                    const list = document.getElementById('modal-report-tests');
                    list.innerHTML = '';
                    data.tests.forEach(t => { const li = document.createElement('li'); li.textContent = t; list.appendChild(li); });
                    document.body.classList.add('modal-open');
                    modal.classList.add('is-visible');
                }
            }
        });
    });

    document.querySelectorAll('.close-report-modal').forEach(btn => btn.addEventListener('click', window.closeReportModal));

    // Initialize Typing Effect
    initValuePropTyper();
});

// Marketing Video Playback Logic
function playMarketingVideo(container) {
    const video = container.querySelector('video');
    const overlay = container.querySelector('.play-overlay');

    // If video is muted (autoplaying state) or paused, restart with sound
    if (video.muted || video.paused) {
        video.currentTime = 0;
        video.muted = false;
        video.play();
        container.classList.add('playing');
        video.controls = true; // Enable controls so user can pause/volume
    } else {
        // If already playing with sound, toggle pause (optional, but good UX)
        video.pause();
        container.classList.remove('playing');
        video.controls = false;
    }
}
window.playMarketingVideo = playMarketingVideo;
