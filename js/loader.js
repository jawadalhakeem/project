// المتغيرات الخاصة بالحركة الدائرية
var ctx = document.getElementById('circularLoader').getContext('2d');
var al = 0;
var start = 4.72;
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;
var sim;

function progressSim() {
    diff = ((al / 100) * Math.PI * 2 * 10).toFixed(2);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 17;
    ctx.fillStyle = '#0d6efd';
    ctx.strokeStyle = "#0d6efd";
    ctx.textAlign = "center";
    ctx.font = "28px monospace";
    ctx.fillText(al + '%', cw * .52, ch * .5 + 5, cw + 12);
    ctx.beginPath();
    ctx.arc(100, 100, 75, start, diff / 10 + start, false);
    ctx.stroke();
    if (al >= 100) {
        clearTimeout(sim);
        // تشغيل المودال عند اكتمال التحميل
        myModal.show();
        loader.style.display = 'none';
        // عرض الطراطيع
        showConfetti();
    }
    al++;
}

// اختيار الرابح
const win = document.querySelector("#winner");
const loader = document.querySelector(".loader-con");

var myModal = new bootstrap.Modal(document.getElementById('modal'), {
    keyboard: false
});

win.addEventListener('click', function () {
    loader.style.display = 'flex';
    al = 0; 
    sim = setInterval(progressSim, 20);
});

function showConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(confetti);

        confetti.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(100vh)' }
        ], {
            duration: 2000,
            iterations: 1
        });

        setTimeout(() => confetti.remove(), 2000);
    }
}
