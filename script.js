document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const invitedPeople = [
        { name: "Naga", quote: "Equal parts presence and absence. Somehow central regardless.", image: "assets/naga.png" },
        { name: "Shreya", quote: "Chaos with a calendar. Frequently unavailable. Permanently worth the wait.", image: "assets/shreya.png" },
        { name: "Sanath", quote: "Two days of open warfare. Mutual respect. Questionable outcome.", image: "assets/sanath.png" },
        { name: "Suhani", quote: "Emotionally competent to an unsettling degree. Numerically questionable. Suspiciously kind. We keep her.", image: "assets/suhani.png" },
        { name: "Kavin", quote: "Practicing Marxist. Full-time menace. Will still show up when it counts.", image: "assets/kavin.png" },
        { name: "Sparsh", quote: "Arrives on his own terms. Leaves on better ones.", image: "assets/sparsh.png" },
        { name: "Mukta", quote: "Will roast you gently, help you anyway, and never let you forget either.", image: "assets/mukta.png" },
        { name: "Karthik", quote: "Same factory. Different batch number. Knows everything.", image: "assets/kartick.png" },
        { name: "Tanisi", quote: "You already know", special: true, image: "assets/Tanisi.png" }
    ];

    const marqueeRow1 = document.getElementById('marquee-row-1');

    const modal = document.getElementById('widget-modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    function openModal(person) {
        modalImg.src = person.image;
        modalTitle.innerText = person.name;
        modalDesc.innerText = person.quote;
        modal.classList.add('active');

        if (person.special) {
            modal.classList.add('tanisi-mode');
        } else {
            modal.classList.remove('tanisi-mode');
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.remove('tanisi-mode');
        }, 300);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function createWidgetCard(person, index) {
        const card = document.createElement('div');
        card.className = 'widget-card';

        card.addEventListener('click', () => {
            openModal(person);
        });

        if (person.special) {
            card.classList.add('special-card');
            const hearts = document.createElement('div');
            hearts.className = 'hearts-decoration';
            hearts.innerHTML = '🤍 🤍 🤍';
            card.appendChild(hearts);
        }

        const imgContainer = document.createElement('div');
        imgContainer.className = 'widget-image-container';

        const img = document.createElement('img');
        img.src = person.image;
        img.alt = person.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        imgContainer.appendChild(img);

        const info = document.createElement('div');
        info.className = 'widget-info';

        const title = document.createElement('h3');
        title.innerText = person.name;

        const desc = document.createElement('p');
        desc.innerText = person.quote;

        info.appendChild(title);
        info.appendChild(desc);

        card.appendChild(imgContainer);
        card.appendChild(info);

        return card;
    }

    if (marqueeRow1) {
        const fullList = [...invitedPeople, ...invitedPeople, ...invitedPeople, ...invitedPeople];

        fullList.forEach((person, i) => {
            marqueeRow1.appendChild(createWidgetCard(person, i));
        });
    }
});
