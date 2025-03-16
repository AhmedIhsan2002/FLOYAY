document.addEventListener("DOMContentLoaded", function () {
    // تهيئة AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    } else {
        console.error("AOS library is not loaded!");
    }
  
    // 🌟 الكود الخاص بالقائمة الجانبية
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const downloadBtnContainer = document.querySelector(".download-btn-container");
  
    if (menuBtn && navLinks && downloadBtnContainer) {
        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active"); // فتح/إغلاق القائمة
            if (navLinks.classList.contains("active")) {
                downloadBtnContainer.style.display = "block"; // إظهار زر التحميل
            } else {
                downloadBtnContainer.style.display = "none"; // إخفاء زر التحميل
            }
        });
    }
  
    // 🌟 الكود الخاص بتبديل اللغة
    const toggleLanguageBtn = document.getElementById('toggleLanguageBtn');
    if (toggleLanguageBtn) {
        let isArabic = true;
        toggleLanguageBtn.addEventListener('click', () => {
            if (isArabic) {
                document.documentElement.setAttribute('lang', 'en');
                document.querySelector('h1').textContent = 'Welcome to my site';
                document.querySelector('main p').textContent = 'This is content in English.';
                toggleLanguageBtn.textContent = 'English';
            } else {
                document.documentElement.setAttribute('lang', 'ar');
                document.querySelector('h1').textContent = 'مرحباً بكم في موقعي';
                document.querySelector('main p').textContent = 'هذا هو المحتوى باللغة العربية.';
                toggleLanguageBtn.textContent = 'العربية';
            }
            isArabic = !isArabic;
        });
    }
  
    // 🌟 الكود الخاص بالسلايدر
    const slider = document.querySelector(".silder-new");
    const cards = document.querySelectorAll(".card-news");
    const arrowLeft = document.querySelector(".arrow-left");
    const arrowRight = document.querySelector(".arrow-right");
    const dots = document.querySelectorAll(".dot");
  
    if (slider && cards.length > 0 && arrowLeft && arrowRight && dots.length > 0) {
        let currentIndex = 0;
  
        // 🌟 دالة لتحريك السلايدر إلى الصورة التالية
        function slideNext() {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }
  
        // 🌟 دالة لتحريك السلايدر إلى الصورة السابقة
        function slidePrev() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cards.length - 1;
            }
            updateSlider();
        }
  
        // 🌟 دالة لتحديث موضع السلايدر
        function updateSlider() {
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
  
            cards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });
  
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }
  
        // 🌟 تأثير التموج عند النقر على الأزرار
        function createRipple(event) {
            const button = event.currentTarget;
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            button.appendChild(ripple);
  
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        }
  
        // 🌟 إضافة أحداث النقر
        arrowLeft.addEventListener("click", (e) => {
            createRipple(e);
            slidePrev();
        });
  
        arrowRight.addEventListener("click", (e) => {
            createRipple(e);
            slideNext();
        });
  
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
            });
        });
    }

    const links = document.querySelectorAll("a");

    links.forEach(link => {
        // نستثني الروابط الخارجية أو التي تفتح في نافذة جديدة
        if (link.href && !link.target && link.href.indexOf("#") === -1) {
            link.addEventListener("click", function (e) {
                e.preventDefault(); // نمنع الانتقال المباشر

                // نضيف تأثير التلاشي
                document.body.classList.add("fade-out");

                // ننتظر حتى يكتمل التأثير ثم ننتقل إلى الصفحة الجديدة
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500); // 500 مللي ثانية (تتناسب مع مدة الانتقال في CSS)
            });
        }
    });

    
  });