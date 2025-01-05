const DEFAULT_COUNT_DAY = new Date('01-06-2025 00:00:00');

function findDifference() {
    const nowDate = new Date(); 
    const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const milliSecondsDif = nowDate - DEFAULT_COUNT_DAY;
    let secondsDif = Math.floor(milliSecondsDif / 1000);
    if (secondsDif < 0) {
        secondsDif = 0;
    }
    let minutesDif = 0;
    let hoursDif = 0;
    let daysDif = 0;
    let monthsDif = 0;
    let yearsDif = 0;

    function decreaseDayByMonth() {
        let currentYear = DEFAULT_COUNT_DAY.getFullYear();
        let currentMonth = DEFAULT_COUNT_DAY.getMonth();

        while (daysDif >= dayInMonth[currentMonth]) {
            const isLeapYear = currentYear % 4 === 0;

            if (isLeapYear && currentMonth === 1 && daysDif >= dayInMonth[currentMonth] + 1) {
                daysDif -= dayInMonth[currentMonth] + 1;
                monthsDif++;
            }
            else if (isLeapYear && currentMonth === 1 && daysDif < dayInMonth[currentMonth] + 1) {
                break;
            }
            else {
                daysDif -= dayInMonth[currentMonth];
                monthsDif++;
            }
            
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }
    }

    decreaseDayByMonth()
    while (secondsDif >= 60) {
        secondsDif -= 60;
        minutesDif++;
    }
    while (minutesDif >= 60) {
        minutesDif -= 60;
        hoursDif++;
    }
    while (hoursDif >= 24) {
        hoursDif -= 24;
        daysDif++;
    }
    getAchievement(daysDif);

    if (daysDif >= 28) {
        decreaseDayByMonth();
    }

    while (monthsDif >= 12) {
        monthsDif -= 12;
        yearsDif++;
    }

    const secondsTimeNumber = document.getElementById('secondsTimeNumber');
    const minutesTimeNumber = document.getElementById('minutesTimeNumber');
    const hoursTimeNumber = document.getElementById('hoursTimeNumber');
    const daysTimeNumber = document.getElementById('daysTimeNumber');
    const monthsTimeNumber = document.getElementById('monthsTimeNumber');
    const yearsTimeNumber = document.getElementById('yearsTimeNumber');

    if (String(secondsDif).length < 2) {
        secondsDif = '0' + String(secondsDif); 
    }
    if (String(minutesDif).length < 2) {
        minutesDif = '0' + String(minutesDif); 
    }
    if (String(hoursDif).length < 2) {
        hoursDif = '0' + String(hoursDif); 
    }
    if (String(daysDif).length < 2) {
        daysDif = '0' + String(daysDif); 
    }
    if (String(monthsDif).length < 2) {
        monthsDif = '0' + String(monthsDif); 
    }
    if (String(yearsDif).length < 2) {
        yearsDif = '0' + String(yearsDif); 
    }
    
    secondsTimeNumber.textContent = secondsDif;
    minutesTimeNumber.textContent = minutesDif;
    hoursTimeNumber.textContent = hoursDif;
    daysTimeNumber.textContent = daysDif;
    monthsTimeNumber.textContent = monthsDif;
    yearsTimeNumber.textContent = yearsDif;
}

function getAchievement(days) {
    const medalImg = document.getElementById('medalImg');
    const medalDetail = document.getElementById('medalDetail');
    const dayPast = document.getElementById('dayPast');

    const imageUrl = ['medalImg', '.png'];
    const dayToGetAchievement = [0, 1, 5, 10, 25, 50, 100, 150, 200, 250, 365, 500, 1000, 1500, 2500];
    let currentAchievement = 0;
    
    for (let index = 0; index < dayToGetAchievement.length; index++){
        if (dayToGetAchievement[index] <= days) {
            currentAchievement = index;
        }
    }

    dayPast.textContent = `Anda sudah melewati ${days} hari`;
    medalDetail.textContent = `Hari ke-${dayToGetAchievement[currentAchievement]}`;
    medalImg.src = `${imageUrl[0]}${currentAchievement}${imageUrl[1]}`;
}

function firstDayDisplay() {
    const monthArray = ['Januari', 'Febuari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const countDateFrom = document.getElementById('countDateFrom');
    const date = DEFAULT_COUNT_DAY.getDate();
    const month = monthArray[DEFAULT_COUNT_DAY.getMonth()];
    const year = DEFAULT_COUNT_DAY.getFullYear();

    countDateFrom.textContent = `Perhitungan dimulai dari ${date} ${month} ${year}`;
}
firstDayDisplay();
setInterval(findDifference, 1000);
findDifference();