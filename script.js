document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. تحريك الهيدر والشعار مع النزول (Scroll Header)
    // ==========================================
    const header = document.querySelector('.site-header');
    const logoImg = document.querySelector('.brand-logo-img');
    
    const handleScroll = () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        // عند النزول: استخدم الشعار الذي يظهر بوضوح فوق الخلفية الرمادية
        if (logoImg && logoImg.src.includes('W2.png')) {
            logoImg.src = 'W.png'; 
        }
    } else {
        header.classList.remove('scrolled');
        // عند العودة للأعلى: أعد الشعار الأصلي (W2.png)
        if (logoImg && logoImg.src.includes('W2.png')) {
            logoImg.src = 'W2.png'; 
        }
    }
};
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // التحقق المباشر عند تحميل الصفحة لأول مرة

    // ==========================================
    // 2. حركة العداد الذكي للأرقام المنجزة (Stats Counter)
    // ==========================================
    const statNumbers = document.querySelectorAll(".stat-number");
    const animationDuration = 2200; // وقت التحريك بالملي ثانية

    const startCounting = (el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // معادلة Easing لتقليل سرعة العد الفائق في النهاية
            const easeProgress = 1 - Math.pow(1 - progress, 3); 
            const currentValue = Math.floor(easeProgress * target);

            if (target >= 1000 && currentValue >= 1000) {
                const thousands = (currentValue / 1000).toFixed(0);
                el.textContent = thousands + "K";
            } else {
                el.textContent = currentValue;
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                if (target >= 1000) {
                    el.textContent = (target / 1000).toFixed(0) + "K";
                } else {
                    el.textContent = target;
                }
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // ==========================================
    // 3. آلية ظهور العناصر التدريجي عند النزول (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // إذا كان المكون يحتوي على كلاس العداد اللوجستي، نطلق حركة الأرقام أولاً
                if (entry.target.classList.contains("stat-card")) {
                    const numberEl = entry.target.querySelector(".stat-number");
                    if (numberEl && !numberEl.classList.contains("counted")) {
                        numberEl.classList.add("counted");
                        startCounting(numberEl);
                    }
                }
                
                // إضافة تأخير طفيف متدرج (Stagger Effect) ليبدو الظهور متناغماً خلف بعضه
                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index % 4 * 100); 

                observer.unobserve(entry.target); // إزالة المراقبة بعد الحركة لثباتها
            }
        });
    }, {
        root: null,
        threshold: 0.1, // تفعيل الحركة بمجرد ملامسة 10% من العنصر لحجم الشاشة
        rootMargin: "0px 0px -40px 0px" // إزاحة مسبقة لمنع الحركات المفاجئة أسفل الشاشة
    });

    // تسجيل كافة العناصر للمراقبة الذكية
    revealElements.forEach(el => revealObserver.observe(el));
});


 function switchForm(type) {
        const title = document.getElementById('form-title');
        const subtitle = document.getElementById('form-subtitle');
        const detailsField = document.getElementById('details-field');
        const btns = document.querySelectorAll('.toggle-btn');
        
        // تبديل التصميم بناءً على النوع
        if (type === 'quote') {
            title.innerText = "طلب عرض سعر";
            subtitle.innerText = "أدخل بياناتك وسنتواصل معك لتقديم أفضل عرض سعر.";
            detailsField.style.display = 'none';
            // تفعيل زر "عرض سعر" بصرياً
            btns.forEach(btn => {
                btn.classList.remove('active');
                if(btn.innerText === "طلب عرض سعر") btn.classList.add('active');
            });
        } else {
            title.innerText = "طلب استشارة مجانية";
            subtitle.innerText = "دعنا نُقصر لك المسافات وسنقوم بالرد عليك في أسرع وقت";
            detailsField.style.display = 'flex';
            // تفعيل زر "استشارة" بصرياً
            btns.forEach(btn => {
                btn.classList.remove('active');
                if(btn.innerText === "طلب استشارة") btn.classList.add('active');
            });
        }
    }
   
