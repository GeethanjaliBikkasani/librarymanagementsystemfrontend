// Sample data for resources
const resources = [
    {
        id: 1,
        title: "Full Stack Web Development",
        type: "textbook",
        description: "Complete guide to designing, developing, and deploying full stack web applications using modern front-end, back-end, and database technologies.",
        year: 2026,
        image: "https://www.schoolofit.co.za/wp-content/uploads/2023/03/What-is-full-stack-web-development-806x393.png",
        downloads: 1245,
        rating: 4.5,
        file: "pdfs/fullstack.pdf"
    },
    {
        id: 2,
        title: "DataBase Management System",
        type: "textbook",
        description: "Comprehensive overview of designing, storing, managing, and retrieving data efficiently using modern database systems and SQL.",
        year: 2026,
        image: "https://media.licdn.com/dms/image/v2/D5612AQFvLV6LQPi5bg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1708486612163?e=2147483647&v=beta&t=STlnq5C5zcSSx3vm2fnfcwvGShGYC4V2m547GcxkmNU",
        downloads: 892,
        rating: 4.2,
        file: "pdfs/dbms.pdf"
    },
    {
        id: 3,
        title: "Probability and Statistics",
        type: "textbook",
        description: "Fundamental study of data analysis, uncertainty, and statistical methods used for prediction, decision-making, and research.",
        year: 2026,
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20231215175200/Probabilty-and-Statistics.webp",
        downloads: 1567,
        rating: 4.7,
        file: "pdfs/ps.pdf"
    },
    {
        id: 4,
        title: "Operating System",
        type: "textbook",
        description: "Core study of how computer systems manage hardware, processes, memory, files, and security to run applications efficiently.",
        year: 2026,
        image: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2NvbXB1dGVyLW9wZXJhdGluZy1zeXRlbS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOiIxMjAwIn19fQ==",
        downloads: 2103,
        rating: 4.4,
        file: "pdfs/os.pdf"
    },
    {
        id: 5,
        title: "Machine learning",
        type: "textbook",
        description: "Study of algorithms that enable computers to learn from data, make predictions, and improve performance without being explicitly programmed.",
        year: 2026,
        image: "https://tdwi.org/-/media/TDWI/TDWI/BITW/machinelearning1.jpg",
        downloads: 734,
        rating: 4.8,
        file: "pdfs/ml.pdf"
    },
    {
        id: 6,
        title: "Data Science",
        type: "textbook",
        description: "Field focused on extracting insights and knowledge from data using statistics, programming, and machine learning techniques.",
        year: 2026,
        image: "https://www.dasca.org/Content/images/main/data-science-tools-img.jpg",
        downloads: 1892,
        rating: 4.3,
        file: "pdfs/datasci.pdf"
    }
];


// DOM Elements
const resourcesContainer = document.getElementById('resourcesContainer');

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackResource = document.getElementById('feedbackResource');
const ratingStars = document.querySelectorAll('.rating i');
const selectedRating = document.getElementById('selectedRating');
const resourceModal = document.getElementById('resourceModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadResources();
    populateFeedbackResources();
    setupEventListeners();
});

// Load resources into the grid
function loadResources() {
    resourcesContainer.innerHTML = '';
    
    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-image" style="background-image: url('${resource.image}')"></div>
            <div class="resource-content">
                <h3 class="resource-title">${resource.title}</h3>
                <div class="resource-meta">
                    <span><i class="far fa-file"></i> ${getTypeLabel(resource.type)}</span>
                    <span><i class="far fa-calendar"></i> ${resource.year}</span>
                </div>
                <p>${resource.description}</p>
                <div class="resource-meta">
                    <span><i class="fas fa-download"></i> ${resource.downloads} downloads</span>
                    <span><i class="fas fa-star"></i> ${resource.rating}</span>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-primary btn-small view-details" data-id="${resource.id}">View Details</button>
                    <button class="btn btn-success btn-small download-resource" data-id="${resource.id}">Download</button>
                </div>
            </div>
        `;
        resourcesContainer.appendChild(resourceCard);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = parseInt(this.getAttribute('data-id'));
            showResourceDetails(resourceId);
        });
    });
    
    document.querySelectorAll('.download-resource').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = parseInt(this.getAttribute('data-id'));
            downloadResource(resourceId);
        });
    });
}

// Get type label for display
function getTypeLabel(type) {
    const typeLabels = {
        'textbook': 'Textbook',
        'research': 'Research Paper',
        'guide': 'Study Guide',
        'video': 'Video Lecture'
    };
    return typeLabels[type] || type;
}

// Populate feedback resource dropdown
function populateFeedbackResources() {
    feedbackResource.innerHTML = '<option value="">Select a resource</option>';
    
    resources.forEach(resource => {
        const option = document.createElement('option');
        option.value = resource.id;
        option.textContent = resource.title;
        feedbackResource.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Star rating
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setRating(rating);
        });
    });
    
    // Feedback form
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitFeedback();
    });
    
    // Modal close
    closeModal.addEventListener('click', function() {
        resourceModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === resourceModal) {
            resourceModal.style.display = 'none';
        }
    });
}

// Set star rating
function setRating(rating) {
    selectedRating.value = rating;
    
    ratingStars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

// Perform search
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        const filteredResources = resources.filter(resource => 
            resource.title.toLowerCase().includes(query) || 
            resource.description.toLowerCase().includes(query) ||
            resource.type.toLowerCase().includes(query)
        );
        
        displaySearchResults(filteredResources);
    } else {
        loadResources(); // Show all resources if search is empty
    }
}

// Display search results
function displaySearchResults(results) {
    resourcesContainer.innerHTML = '';
    
    if (results.length === 0) {
        resourcesContainer.innerHTML = '<p class="no-results">No resources found matching your search.</p>';
        return;
    }
    
    results.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-image" style="background-image: url('${resource.image}')"></div>
            <div class="resource-content">
                <h3 class="resource-title">${resource.title}</h3>
                <div class="resource-meta">
                    <span><i class="far fa-file"></i> ${getTypeLabel(resource.type)}</span>
                    <span><i class="far fa-calendar"></i> ${resource.year}</span>
                </div>
                <p>${resource.description}</p>
                <div class="resource-meta">
                    <span><i class="fas fa-download"></i> ${resource.downloads} downloads</span>
                    <span><i class="fas fa-star"></i> ${resource.rating}</span>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-primary btn-small view-details" data-id="${resource.id}">View Details</button>
                    <button class="btn btn-success btn-small download-resource" data-id="${resource.id}">Download</button>
                </div>
            </div>
        `;
        resourcesContainer.appendChild(resourceCard);
    });
    
    // Reattach event listeners to the new buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = parseInt(this.getAttribute('data-id'));
            showResourceDetails(resourceId);
        });
    });
    
    document.querySelectorAll('.download-resource').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = parseInt(this.getAttribute('data-id'));
            downloadResource(resourceId);
        });
    });
}

// Show resource details in modal
function showResourceDetails(resourceId) {
    const resource = resources.find(r => r.id === resourceId);
    
    if (resource) {
        modalTitle.textContent = resource.title;
        modalContent.innerHTML = `
            <div class="resource-details">
                <div class="detail-image" style="background-image: url('${resource.image}'); height: 200px; background-size: cover; background-position: center; border-radius: 8px; margin-bottom: 20px;"></div>
                <div class="detail-meta">
                    <p><strong>Type:</strong> ${getTypeLabel(resource.type)}</p>
                    <p><strong>Year:</strong> ${resource.year}</p>
                    <p><strong>Downloads:</strong> ${resource.downloads}</p>
                    <p><strong>Rating:</strong> ${resource.rating} <i class="fas fa-star" style="color: var(--warning);"></i></p>
                </div>
                <div class="detail-description">
                    <h3>Description</h3>
                    <p>${resource.description}</p>
                </div>
                <div class="detail-actions" style="margin-top: 20px;">
                    <button class="btn btn-success download-resource-modal" data-id="${resource.id}">Download Resource</button>
                </div>
            </div>
        `;
        
        resourceModal.style.display = 'block';
        
        // Add event listener to the download button in the modal
        document.querySelector('.download-resource-modal').addEventListener('click', function() {
            downloadResource(resourceId);
            resourceModal.style.display = 'none';
        });
    }
}

// Download resource
function downloadResource(resourceId) {
    const resource = resources.find(r => r.id === resourceId);

    if (resource && resource.file) {
        const link = document.createElement("a");
        link.href = resource.file;
        link.download = resource.title + ".pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Increase download count
        resource.downloads++;
        loadResources();
    } else {
        alert("File not available for this resource.");
    }
}
// Submit feedback
function submitFeedback() {
    const resourceId = feedbackResource.value;
    const rating = selectedRating.value;
    const comment = document.getElementById('feedbackComment').value;

    if (!resourceId || rating == 0 || comment.trim() === "") {
        alert("Please select a resource, give a rating, and write feedback.");
        return;
    }

    const resource = resources.find(r => r.id == resourceId);

    alert(
        "Feedback Submitted!\n\n" +
        "Resource: " + resource.title + "\n" +
        "Rating: " + rating + " stars\n" +
        "Comment: " + comment
    );

    // Reset form
    feedbackForm.reset();
    selectedRating.value = 0;

    // Reset stars
    ratingStars.forEach(star => {
        star.classList.remove("fas", "active");
        star.classList.add("far");
    });
}



