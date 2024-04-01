document.addEventListener('DOMContentLoaded', function () {
    const hours = document.querySelector('.hours');
    const mins = document.querySelector('.mins');
    const secs = document.querySelector('.secs');
    const form = document.getElementById('durationForm');
    let timerID = null;
    const dialog = document.querySelector('dialog');
    const timesUpDialog = document.getElementById('timesUpDialog');
    const closeButton = document.getElementById('closeButton');

    closeButton.addEventListener('click', function() {
        timesUpDialog.close();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        dialog.close();
        if (timerID !== null) {
            clearInterval(timerID);
            timerID = null;
        }

        const inHours = parseInt(document.getElementById('inHours').value, 10) || 0;
        const inMinutes = parseInt(document.getElementById('inMinutes').value, 10) || 0;
        const inSeconds = parseInt(document.getElementById('inSeconds').value, 10) || 0;

        let totalSeconds = inHours * 3600 + inMinutes * 60 + inSeconds;

        timerID = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerID);
                timesUpDialog.showModal();
            } else {
                totalSeconds--;
                const time = secondsToTime(totalSeconds);
                setDigits(hours, formatDigits(time.hours));
                setDigits(mins, formatDigits(time.minutes));
                setDigits(secs, formatDigits(time.seconds));
            }
        }, 1000);
    });

    function secondsToTime(secs) {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs - (hours * 3600)) / 60);
        const seconds = secs - (hours * 3600) - (minutes * 60);
        return {
            hours,
            minutes,
            seconds,
        };
    }

    function formatDigits(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }

    function setDigits(section, digits) {
        const tens = [...section.children[0].children];
        const ones = [...section.children[1].children];
        const digitArray = digits.split('').map(Number);
        
        tens.forEach((number, index) => {
            number.classList.remove('active');
            if (index === digitArray[0]) {
                number.classList.add('active');
            }
        });
        
        ones.forEach((number, index) => {
            number.classList.remove('active');
            if (index === digitArray[1]) {
                number.classList.add('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const themeColorPicker = document.getElementById('themeColor');
    
    themeColorPicker.addEventListener('change', function () {
        const selectedColor = themeColorPicker.value;
        updateThemeColor(selectedColor);
    });

    function updateThemeColor(color) {
        const stylesheet = getThemeStylesheet();
        clearThemeColorRules(stylesheet);

        stylesheet.insertRule(`.clock section p.active { color: ${color}; text-shadow: 0px 10px 20px ${color}; }`, stylesheet.cssRules.length);
        stylesheet.insertRule(`button { background-color: ${color}; text-align: center; color: white; padding: 0.5rem 1rem; border: none; border-radius: 10px 10px 0 0; cursor: pointer; font-size: 2rem; font-weight: bold; transition: all 0.3s;}`, stylesheet.cssRules.length);
        stylesheet.insertRule(`button:hover { background: #1f1f1f; color: ${color}; border: 1px solid ${color}; }`, stylesheet.cssRules.length);
    }

    function getThemeStylesheet() {
        return [...document.styleSheets].find(
            (sheet) => sheet.href && sheet.href.includes('style.css')
        );
    }

    function clearThemeColorRules(stylesheet) {
        for (let i = stylesheet.cssRules.length - 1; i >= 0; i--) {
            const rule = stylesheet.cssRules[i];
            if (rule.selectorText === '.clock section p.active' || rule.selectorText === 'button') {
                stylesheet.deleteRule(i);
            }
        }
    }
    updateThemeColor(themeColorPicker.value);
});

document.addEventListener('DOMContentLoaded', function () {
    generateOptions(document.getElementById('hourList'), 24);
    generateOptions(document.getElementById('minuteList'), 60);
    generateOptions(document.getElementById('secondList'), 60);
});

function generateOptions(datalist, max) {
    for (let i = 1; i <= max; i++) {
        const option = document.createElement('option');
        option.value = i;
        datalist.appendChild(option);
    }
}
