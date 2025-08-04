

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.application-form');
    const submitBtn = document.querySelector('.submit-btn');
    const successDiv = document.getElementById('form-success');
    const afterSubmissionDiv = document.getElementById('after-submission');
    
    // Check if we're returning from a successful form submission
    // Handle both with and without trailing slash
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');
    if (successParam === 'true' || successParam === 'trues') {
        // Instantly navigate to the form section
        const applicationSection = document.getElementById('section-application');
        if (applicationSection) {
            applicationSection.scrollIntoView({ 
                behavior: 'instant', 
                block: 'start' 
            });
        }
        
        // Show success message immediately
        showSuccessMessage();
        
        // Clean up URL - remove trailing slash if present
        const cleanPath = window.location.pathname.replace(/\/$/, '');
        window.history.replaceState({}, document.title, cleanPath || '/');
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Prevent double submission
            if (submitBtn.disabled) {
                e.preventDefault();
                return false;
            }
            
            // Update subject line
            const subjectField = form.querySelector('input[name="_subject"]');
            if (subjectField) {
                subjectField.value = 'G4 Skitrip 2026 - Nová žiadosť o účasť';
            }
            
            // Update redirect URL to include current page
            const nextField = form.querySelector('input[name="_next"]');
            if (nextField) {
                const cleanPath = window.location.pathname.replace(/\/$/, '');
                nextField.value = window.location.origin + cleanPath + '?success=true';
            }
            
            // Add loading state to submit button
            submitBtn.innerHTML = '⏳ Odosielam...';
            submitBtn.disabled = true;
        });
    }
    
    function showSuccessMessage() {
        if (successDiv && afterSubmissionDiv && form) {
            // Reset form
            form.reset();
            
            // Reset submit button
            if (submitBtn) {
                submitBtn.innerHTML = 'Odoslať žiadosť';
                submitBtn.disabled = false;
            }
            
            // Show success message
            successDiv.style.display = 'block';
            afterSubmissionDiv.style.display = 'none';
            form.style.display = 'none';
            
            // Center the success message instantly
            if (successDiv) {
                successDiv.scrollIntoView({ behavior: 'instant', block: 'center' });
            }
        }
    }
});



// Card click handlers
document.addEventListener('DOMContentLoaded', function() {
    const locationCard = document.getElementById('location-card');
    const registrationCard = document.getElementById('registration-card');
    
    // Location card - open Google Maps
    if (locationCard) {
        locationCard.addEventListener('click', function() {
            const mapsUrl = 'https://www.google.com/maps/search/Schladming+Planai+Austria';
            window.open(mapsUrl, '_blank');
        });
    }
    
    // Registration card - scroll to application section
    if (registrationCard) {
        registrationCard.addEventListener('click', function() {
            const applicationSection = document.getElementById('section-application');
            if (applicationSection) {
                applicationSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Collect all image sources
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push({
            src: img.src,
            alt: img.alt
        });
        
        // Add click event to open modal
        item.addEventListener('click', function() {
            openModal(index);
        });
    });
    
    function openModal(index) {
        currentImageIndex = index;
        updateModalImage();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    function updateModalImage() {
        modalImage.src = images[currentImageIndex].src;
        modalImage.alt = images[currentImageIndex].alt;
        currentImageSpan.textContent = currentImageIndex + 1;
        totalImagesSpan.textContent = images.length;
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateModalImage();
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateModalImage();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next image
                showNextImage();
            } else {
                // Swiped right - show previous image
                showPrevImage();
            }
        }
    }
});