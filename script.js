document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
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

    // Add animation classes to elements
    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // --- Marquee Logic ---
    const invitedPeople = [
        { name: "Shreya", quote: "Can't wait to celebrate!" },
        { name: "Suhani", quote: "Let's make it epic!" },
        { name: "Mukta", quote: "Happy Birthday Aadish!" },
        { name: "Naga", quote: "Party time!" },
        { name: "Kavin", quote: "The Legend himself." },
        { name: "Sparsh", quote: "Cheers to you!" },
        { name: "Aarya", quote: "See you there!" },
        { name: "Tanisi", quote: "You already know", special: true },
        { name: "Karthick", quote: "Let's rock!" }
    ];

    const marqueeRow1 = document.getElementById('marquee-row-1');

    // Modal Logic
    const modal = document.getElementById('widget-modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    function openModal(person) {
        modalImg.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${person.name.replace(' ', '')}&backgroundColor=transparent`;
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
        // Delay removal of special mode to match transition
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

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function createWidgetCard(person, index) {
        const card = document.createElement('div');
        card.className = 'widget-card';

        // Add click listener to open modal
        card.addEventListener('click', () => {
            openModal(person);
        });

        if (person.special) {
            card.classList.add('special-card');
            // Add hearts decoration
            const hearts = document.createElement('div');
            hearts.className = 'hearts-decoration';
            hearts.innerHTML = '🤍 🤍 🤍';
            card.appendChild(hearts);
        }

        const imgContainer = document.createElement('div');
        imgContainer.className = 'widget-image-container';

        const img = document.createElement('img');
        // Use DiceBear for consistent, premium avatars
        img.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${person.name.replace(' ', '')}&backgroundColor=transparent`;
        img.alt = person.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.padding = '1rem';

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
        // Populate Row 1 with ALL people
        // Duplicate for seamless loop effect
        // We need enough items to fill the screen width + buffer for the animation to look smooth
        // Let's duplicate the list 4 times to be safe for wide screens
        const fullList = [...invitedPeople, ...invitedPeople, ...invitedPeople, ...invitedPeople];

        fullList.forEach((person, i) => {
            marqueeRow1.appendChild(createWidgetCard(person, i));
        });
    }
});
