function openModal(imageSrc) {
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = imageSrc;
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "";
}

// Close the modal when clicking anywhere outside of the image
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal on escape key press
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.gallery-item img');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });
});

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }
    img.src = src;
}

// Add touch support for gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    item.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
});

// Optimize scroll performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Perform any scroll-based updates here
            ticking = false;
        });
        ticking = true;
    }
});