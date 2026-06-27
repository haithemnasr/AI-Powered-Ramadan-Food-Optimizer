// ========== ISLAMIC CALENDAR API INTEGRATION ==========
async function fetchIslamicDate() {
    try {
        console.log('📅 Fetching current Hijri date from AlAdhan API...');
        
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const day = today.getDate();
        
        const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ API Response received');
        
        if (data.code === 200 && data.data) {
            const todayData = data.data.find(item => 
                parseInt(item.gregorian.day) === day
            );
            
            if (todayData && todayData.hijri) {
                console.log('✅ Hijri Date:', todayData.hijri.date);
                return todayData.hijri;
            }
        }
        return null;
    } catch (error) {
        console.error('❌ Erreur API AlAdhan:', error);
        return null;
    }
}

async function updateRamadanDay() {
    const dayElement = document.getElementById('ramadanDay');
    const labelElement = document.getElementById('ramadanLabel');
    
    if (!dayElement || !labelElement) {
        console.error('❌ Calendar elements not found in DOM');
        return;
    }
    
    const hijriDate = await fetchIslamicDate();
    
    if (!hijriDate) {
        dayElement.textContent = 'رمضان كريم';
        labelElement.textContent = 'تحقق من الاتصال بالإنترنت';
        return;
    }
    
    const currentMonth = parseInt(hijriDate.month.number);
    const currentDay = parseInt(hijriDate.day);
    const hijriMonthAr = hijriDate.month.ar;
    const hijriYear = hijriDate.year;
    
    console.log(`📅 Date Hijri: ${currentDay} ${hijriMonthAr} ${hijriYear} (Mois ${currentMonth})`);
    
    const RAMADAN_MONTH = 9;
    
    if (currentMonth < RAMADAN_MONTH) {
        // قبل رمضان
        const daysUntilRamadan = calculateDaysUntilRamadan(currentMonth, currentDay);
        dayElement.textContent = `بعد ${daysUntilRamadan} يوم`;
        labelElement.textContent = 'حتى رمضان المبارك 🌙';
        console.log(`⏳ Avant Ramadan: ${daysUntilRamadan} jours restants`);
        
        // Générer calendrier grisé
        generateRamadanCalendar(0, false);
        document.getElementById('decadeInfo').style.display = 'none';
        
    } else if (currentMonth === RAMADAN_MONTH) {
        // في رمضان
        dayElement.textContent = `يوم ${currentDay}`;
        labelElement.textContent = 'من رمضان المبارك ✨';
        console.log(`🌙 Pendant Ramadan: Jour ${currentDay}`);
        
        // Générer calendrier actif
        generateRamadanCalendar(currentDay, true);
        updateDecadeInfo(currentDay);
        updateDailyReminder(currentDay);
        
    } else {
        // بعد رمضان
        dayElement.textContent = 'رمضان كريم';
        labelElement.textContent = `${hijriMonthAr} ${hijriYear} - نسأل الله القبول 🤲`;
        console.log(`✅ Après Ramadan: ${hijriMonthAr}`);
        
        // Calendrier complété
        generateRamadanCalendar(31, true);
        const decadeInfo = document.getElementById('decadeInfo');
        decadeInfo.style.display = 'block';
        decadeInfo.innerHTML = '<div class="decade-title">🎉 تقبل الله منا ومنكم</div><div class="decade-desc">صيامنا وقيامنا</div>';
    }
}

function calculateDaysUntilRamadan(currentMonth, currentDay) {
    const monthsUntilRamadan = 9 - currentMonth;
    const daysInCurrentMonth = 30 - currentDay;
    const approximateDays = (monthsUntilRamadan - 1) * 29.5 + daysInCurrentMonth;
    
    return Math.round(approximateDays);
}

function updateDailyReminder(ramadanDay) {
    const reminderElement = document.getElementById('todayMeal');
    
    if (!reminderElement) {
        console.error('❌ todayMeal element not found');
        return;
    }
    
    if (ramadanDay === 1) {
        reminderElement.innerHTML = `🌙 <strong>أول يوم رمضان!</strong><br>ابدأ بخفة: شوربة، تمر، وماء. رمضان كريم!`;
    } else if (ramadanDay <= 10) {
        reminderElement.innerHTML = `✨ <strong>العشر الأوائل - الرحمة</strong><br>نوّع وجباتك واستخدم B9itlek لتقليل الهدر`;
    } else if (ramadanDay <= 20) {
        reminderElement.innerHTML = `🌟 <strong>العشر الثانية - المغفرة</strong><br>خطّط وجباتك مسبقاً واستفد من البقايا`;
    } else if (ramadanDay <= 27) {
        reminderElement.innerHTML = `💫 <strong>العشر الأواخر - العتق من النار</strong><br>ليلة القدر قريبة! وجبات خفيفة للتفرغ للعبادة`;
    } else {
        reminderElement.innerHTML = `🎉 <strong>الأيام الأخيرة</strong><br>قارب على الانتهاء! حافظ على نفس النظام`;
    }
}

// ========== CALENDRIER VISUEL ==========
function generateRamadanCalendar(currentDay, inRamadan = true) {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    if (!inRamadan) {
        grid.style.opacity = '0.4';
    } else {
        grid.style.opacity = '1';
    }
    
    // Ajouter quelques cellules vides pour alignement
    const startWeekday = 0; // 0 = Dimanche, ajustable selon le vrai calendrier
    for (let i = 0; i < startWeekday; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }
    
    // Générer les 30 jours de Ramadan
    for (let day = 1; day <= 30; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        
        if (inRamadan && day === currentDay) {
            dayEl.classList.add('today');
        } else if (inRamadan && day < currentDay) {
            dayEl.classList.add('passed');
        }
        
        grid.appendChild(dayEl);
    }
}

function updateDecadeInfo(day) {
    const decadeInfo = document.getElementById('decadeInfo');
    const decadeTitle = decadeInfo.querySelector('.decade-title');
    const decadeDesc = decadeInfo.querySelector('.decade-desc');
    
    decadeInfo.style.display = 'block';
    
    if (day <= 10) {
        decadeTitle.textContent = '✨ العشر الأوائل - الرحمة';
        decadeDesc.textContent = 'أيام الرحمة والبركة';
    } else if (day <= 20) {
        decadeTitle.textContent = '🌟 العشر الثانية - المغفرة';
        decadeDesc.textContent = 'أيام الصفح والمغفرة من الله';
    } else {
        decadeTitle.textContent = '💫 العشر الأواخر - العتق من النار';
        decadeDesc.textContent = 'أيام ليلة القدر والعتق من النار';
    }
}

// ========== FALLING STARS EFFECT ==========
function createFallingStars() {
    const container = document.getElementById('starsContainer');
    
    if (!container) {
        console.error('❌ starsContainer not found');
        return;
    }
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'falling-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = '-10px';
        
        const duration = 3 + Math.random() * 4;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, (duration + 2) * 1000);
    }, 800);
}

// ========== INITIALIZATION ==========
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 B9itlek Application Loaded');
    createFallingStars();
    loadStats();
    updateRamadanDay();
});

// ========== VOICE INPUT FEATURE ==========
let recognition = null;
let currentTextarea = null;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ar-TN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (currentTextarea) {
            currentTextarea.value = transcript;
        }
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (currentTextarea) {
            const btn = document.querySelector(`#${currentTextarea.id === 'today' ? 'voiceToday' : 'voiceLeftovers'}`);
            btn.classList.remove('listening');
        }
    };

    recognition.onend = () => {
        if (currentTextarea) {
            const btn = document.querySelector(`#${currentTextarea.id === 'today' ? 'voiceToday' : 'voiceLeftovers'}`);
            btn.classList.remove('listening');
        }
    };
} else {
    console.warn('⚠️ Speech Recognition not supported in this browser');
}

document.getElementById('voiceToday')?.addEventListener('click', () => {
    if (!recognition) {
        alert('المتصفح ما يدعمش التعرف على الصوت. جرب Chrome ولا Edge.');
        return;
    }
    
    const btn = document.getElementById('voiceToday');
    currentTextarea = document.getElementById('today');
    
    btn.classList.add('listening');
    recognition.start();
});

document.getElementById('voiceLeftovers')?.addEventListener('click', () => {
    if (!recognition) {
        alert('المتصفح ما يدعمش التعرف على الصوت. جرب Chrome ولا Edge.');
        return;
    }
    
    const btn = document.getElementById('voiceLeftovers');
    currentTextarea = document.getElementById('leftovers');
    
    btn.classList.add('listening');
    recognition.start();
});

// ========== STATISTICS FEATURE ==========
function loadStats() {
    const stats = JSON.parse(localStorage.getItem('b9itlek_stats')) || {
        savedKg: 0,
        totalSuggestions: 0,
        co2Saved: 0,
        moneySaved: 0
    };
    
    updateStatsDisplay(stats);
}

function updateStats() {
    const stats = JSON.parse(localStorage.getItem('b9itlek_stats')) || {
        savedKg: 0,
        totalSuggestions: 0,
        co2Saved: 0,
        moneySaved: 0
    };
    
    stats.savedKg += Math.random() * 0.5 + 0.3;
    stats.totalSuggestions += 1;
    stats.co2Saved = stats.savedKg * 2.5;
    stats.moneySaved = stats.savedKg * 8;
    
    localStorage.setItem('b9itlek_stats', JSON.stringify(stats));
    updateStatsDisplay(stats);
}

function updateStatsDisplay(stats) {
    document.getElementById('savedKg').textContent = stats.savedKg.toFixed(1) + ' كغ';
    document.getElementById('totalSuggestions').textContent = stats.totalSuggestions;
    document.getElementById('co2Saved').textContent = stats.co2Saved.toFixed(1) + ' كغ';
    document.getElementById('moneySaved').textContent = stats.moneySaved.toFixed(1) + ' د.ت';
}

function updateTodayMeal(suggestions) {
    const lines = suggestions.split('\n').filter(line => line.trim());
    let mealSuggestion = 'اقتراحات جاهزة! شوف الاقتراحات فوق 👆';
    
    for (let line of lines) {
        if (line.includes('🍽️') || line.includes('🥘') || line.includes('🌯')) {
            mealSuggestion = line.trim();
            break;
        }
    }
    
    const mealElement = document.getElementById('todayMeal');
    if (mealElement) {
        mealElement.textContent = mealSuggestion;
    }
}

// ========== MAIN BUTTON HANDLER ==========
document.getElementById("optBtn")?.addEventListener("click", async () => {
    const today = document.getElementById("today").value.trim();
    const leftovers = document.getElementById("leftovers").value.trim();
    const resultBox = document.getElementById("result");

    resultBox.innerHTML = "";
    resultBox.style.display = "block";

    if (!today && !leftovers) {
        showMessage("🙏 رجاءً اكتب شنو حضرت اليوم ولا شنو بقا من الماكلة.", "error");
        return;
    }

    showMessage("📄 نستناو شوية… نحضّرو في الاقتراحات 🍽️", "loading");

    try {
        const res = await fetch("http://localhost:8000/optimize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ today, leftovers })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        resultBox.innerHTML = "";
        typeEffect(data.suggestions, resultBox, 25);
        
        updateStats();
        updateTodayMeal(data.suggestions);

    } catch (e) {
        showMessage("⚠️ خطأ: السيرفر موش خدام. شغّلو backend وعاود المحاولة.", "error");
        console.error('❌ Backend Error:', e);
    }
});

// ========== HELPER FUNCTIONS ==========
function showMessage(text, type) {
    const box = document.getElementById("result");
    box.style.display = "block";
    box.style.padding = "20px";
    box.style.borderRadius = "15px";
    box.style.fontWeight = "600";
    box.style.textAlign = "center";

    if (type === "error") {
        box.style.background = "rgba(255, 80, 80, 0.2)";
        box.style.border = "2px solid rgba(255, 80, 80, 0.5)";
        box.style.color = "#ffb3b3";
        box.innerText = text;
    }

    if (type === "loading") {
        box.style.background = "rgba(255, 215, 0, 0.15)";
        box.style.border = "2px solid rgba(255, 215, 0, 0.4)";
        box.style.color = "#ffd700";
        box.className = "loading";
        box.innerText = text;
    }
}

function typeEffect(text, element, speed = 20) {
    element.style.background = "rgba(255, 255, 255, 0.1)";
    element.style.border = "2px solid rgba(255, 215, 0, 0.3)";
    element.style.color = "#f5e9d6";
    element.style.textAlign = "right";
    element.className = "";
    
    let i = 0;
    element.innerHTML = "";
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// ========== KEYBOARD SHORTCUTS ==========
document.getElementById("leftovers")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
        document.getElementById("optBtn").click();
    }
});

document.getElementById("today")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
        document.getElementById("optBtn").click();
    }
});

console.log('✅ B9itlek Script Loaded Successfully');