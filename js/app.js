window.addEventListener('load', function() {   

    // Home Intro Rive Animation
    if ($('#home-animation').length) {
        function initializeHomeIntro() {
        const homeIntro = new rive.Rive({
            src: '/public/animation/invexos.riv',
            canvas: document.getElementById("home-animation"),
            stateMachines: ["State Machine 1"],
            autoplay: true,
            onLoad: () => {
            homeIntro.resizeDrawingSurfaceToCanvas();
            },
        });
        }
        // Intersection Observer
        const observerHomeIntro = new IntersectionObserver((entries,
        observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            initializeHomeIntro();
            observer.unobserve(entry.target);
            }
        });
        });
        // Canvas observer
        const homeIntroContainer = document.getElementById(
        'home-trigger');
        observerHomeIntro.observe(homeIntroContainer);
    }

    // About Intro Rive Animation
    if ($('#about-animation').length) {
        function initializeAboutIntro() {
          const aboutIntro = new rive.Rive({
            src: '/public/animation/invexos-letters.riv',
            canvas: document.getElementById("about-animation"),
            stateMachines: ["State Machine 1"],
            autoplay: true,
            onLoad: () => {
              aboutIntro.resizeDrawingSurfaceToCanvas();
            },
          });
        }
        // Intersection Observer
        const observerAboutIntro = new IntersectionObserver((entries,
        observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              initializeAboutIntro();
              observer.unobserve(entry.target);
            }
          });
        });
        // Canvas observer
        const aboutIntroContainer = document.getElementById(
          'about-trigger');
        observerAboutIntro.observe(aboutIntroContainer);
    }

    // Newsletter Form Submission
    if ($('#newsletter-form').length) {
        $(function () {
            const scriptURL =
                'https://script.google.com/macros/s/AKfycbwtun1QFrRUp-d-NmNsi5Ar_PswTsM9PSYjLzg7awc4dO7jGGh3qRnbjHyaNb-RHHzh/exec';
            const form = document.getElementById('newsletter-form');
        
            form.addEventListener('submit', (e) => {
                $('#newsletter-form').addClass('disabled');
        
                // Sending status
                $('#newsletter-form').addClass('readonly');
                $('#newsletter-form input.button').val("Sending");
        
                e.preventDefault();
        
                // Create a FormData to include file and other fields
                const formData = new FormData(form);
        
                fetch(scriptURL, { method: 'POST', body: formData })
                .then((response) => {
                    $('.success-form').addClass('visible');
                    $('#newsletter-form').addClass('readonly');
                    $('.wrapper-form').addClass('readonly');
                    $('#newsletter-form input.button').val("Submitted");
                })
                .catch((error) => {
                    console.error('Error!', error.message);
                    $('.success-form').removeClass('visible');
                    $('#newsletter-form').removeClass('readonly');
                    $('.wrapper-form').removeClass('readonly');
                    $('#newsletter-form input.button').val("Submit");
                });
            });
        });
    }


    // Fix navbar when scroll
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $('nav').addClass('scrolled');
        } 
        else {
            $('nav').removeClass('scrolled');
        }
    });

    // Animations
    let animatedElements = new Set(); // Para evitar reanimaciones

    let observer = new IntersectionObserver((entries) => {
        // Filtrar los elementos que están entrando en vista y no han sido animados aún
        const toAnimate = entries
            .filter(entry => entry.isIntersecting && !animatedElements.has(entry.target))
            .map(entry => entry.target);

        if (toAnimate.length > 0) {
            gsap.to(toAnimate, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.3
            });

            // Marcar los elementos como animados y dejar de observarlos
            toAnimate.forEach(el => {
                animatedElements.add(el);
                observer.unobserve(el);
            });
        }
    }, {
        threshold: 0.3
    });

    document.querySelectorAll("[data-fade]").forEach((el) => {
        observer.observe(el);
    });

});
