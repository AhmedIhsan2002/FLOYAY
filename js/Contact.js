document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form form");
    const inputs = form.querySelectorAll("input, textarea");
    const submitButton = form.querySelector("button");

    
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                this.classList.add("valid");
            } else {
                this.classList.remove("valid");
            }
            checkFormValidity();
        });
    });

    function checkFormValidity() {
        const allFilled = [...inputs].every(input => input.value.trim() !== "");
        submitButton.disabled = !allFilled;
        submitButton.style.backgroundColor = allFilled ? "#DCA91A" : "#ffc107";
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const name = form.querySelector("input[placeholder='الاسم الثلاثي الكامل']").value.trim();
        const phone = form.querySelector("input[placeholder='رقم الهاتف']").value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (!name || !phone || !message) {
            showErrorMessage("يرجى ملء جميع الحقول!");
            return;
        }

        // إرسال البيانات عبر AJAX
        fetch("send_message.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage("تم إرسال رسالتك بنجاح!");
                form.reset();
                inputs.forEach(input => input.classList.remove("valid"));
                checkFormValidity();
            } else {
                showErrorMessage("حدث خطأ أثناء الإرسال!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showErrorMessage("حدث خطأ غير متوقع!");
        });
    });

   
    function showSuccessMessage(message) {
        toastr.success(message, "نجاح", { timeOut: 3000, closeButton: true });
    }

    function showErrorMessage(message) {
        toastr.error(message, "خطأ", { timeOut: 3000, closeButton: true });
    }
    document.querySelector('.contact-form form').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const button = document.querySelector('.btn-custom');
        button.innerHTML = 'جاري الإرسال...'; // تغيير نص الزر
        button.disabled = true; // تعطيل الزر أثناء الإرسال
    
        // محاكاة إرسال البيانات
        setTimeout(() => {
            button.innerHTML = 'تم الإرسال!';
            button.style.backgroundColor = '#28a745'; // تغيير لون الزر
        }, 2000); // 2 ثانية كمحاكاة للإرسال
    });

    document.querySelector('.contact-form form').addEventListener('submit', function (e) {
        e.preventDefault(); // منع الإرسال الافتراضي
    
        const button = document.querySelector('.btn-custom');
    
        // إضافة كلاس الـ shake
        button.classList.add('shake');
    
        // إزالة الكلاس بعد انتهاء الـ Animation
        setTimeout(() => {
            button.classList.remove('shake');
        }, 500); // 500ms هي مدة الـ Animation
    
        // محاكاة إرسال النموذج
        setTimeout(() => {
            alert('تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.');
        }, 1000); // تأخير 1 ثانية قبل عرض الرسالة
    });

    AOS.init();
});

