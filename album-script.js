// Check if user is admin
const isAdmin = localStorage.getItem('isAdmin') === 'true';
document.body.classList.toggle('is-admin', isAdmin);

// Like functionality
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const countSpan = this.querySelector('span');
        const isLiked = icon.classList.contains('fas');
        const currentCount = parseInt(countSpan.textContent);

        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.style.color = isLiked ? '' : '#ff4d4d';
        
        countSpan.textContent = `${isLiked ? currentCount - 1 : currentCount + 1} Likes`;
    });
});

// Comment functionality
document.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const postCard = this.closest('.post-card');
        const commentsSection = postCard.querySelector('.comments-section');
        commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
    });
});

// Share functionality
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const postUrl = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'Check out this post!',
                url: postUrl
            });
        } else {
            // Fallback
            navigator.clipboard.writeText(postUrl)
                .then(() => alert('Link copied to clipboard!'));
        }
    });
});

// Story highlights functionality
document.querySelectorAll('.highlight-circle').forEach(highlight => {
    highlight.addEventListener('click', function() {
        // Here you would typically open a modal or lightbox
        // to show the full story/images
        alert('Story viewer coming soon!');
    });
});

// Post creation (Admin only)
if (isAdmin) {
    const postForm = document.querySelector('.post-create');
    const imageBtn = postForm.querySelector('.btn.primary');
    const postBtn = postForm.querySelector('.btn.secondary');
    let selectedImage = null;

    imageBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            selectedImage = e.target.files[0];
            imageBtn.innerHTML = `<i class="fas fa-check"></i> Image Selected`;
        };
        input.click();
    });

    postBtn.addEventListener('click', () => {
        const text = postForm.querySelector('textarea').value;
        if (!text && !selectedImage) {
            alert('Please add some content to your post!');
            return;
        }
        
        // Here you would typically upload to a server
        alert('Post creation feature coming soon!');
        
        // Reset form
        postForm.querySelector('textarea').value = '';
        imageBtn.innerHTML = `<i class="fas fa-image"></i> Add Photo`;
        selectedImage = null;
    });
}

// Infinite scroll simulation
let loading = false;
window.addEventListener('scroll', () => {
    if (loading) return;
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loading = true;
        // Simulate loading more posts
        setTimeout(() => {
            // Here you would typically fetch more posts from server
            loading = false;
        }, 1000);
    }
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseover', (e) => {
        const tip = document.createElement('div');
        tip.className = 'tooltip';
        tip.textContent = e.target.dataset.tooltip;
        document.body.appendChild(tip);
        
        const rect = e.target.getBoundingClientRect();
        tip.style.top = rect.bottom + 10 + 'px';
        tip.style.left = rect.left + (rect.width - tip.offsetWidth) / 2 + 'px';
    });
    
    tooltip.addEventListener('mouseout', () => {
        const tip = document.querySelector('.tooltip');
        if (tip) tip.remove();
    });
}); 