// Configuration - UPDATE THESE WITH YOUR GOOGLE FORM URLs
const CONFIG = {
    offerFormUrl: 'https://forms.gle/L77FXngX4refmx6r8',
    requestFormUrl: 'https://forms.gle/iwvJteS8xT8HyqKR7',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit?usp=sharing',
    // Web App URL - Get this after deploying the Google Apps Script as a web app
    apiUrl: 'https://script.google.com/macros/s/AKfycbwN0l9xN2NsjR37RC8hgN6lUz55RpMUVfnAKPNj4A121-977FGSQ1BTPlIK2-CJ6m0JKg/exec' // Will look like: https://script.google.com/macros/s/...../exec
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Set up Google Form iframes
    document.getElementById('offer-form').src = CONFIG.offerFormUrl;
    document.getElementById('request-form').src = CONFIG.requestFormUrl;
    document.getElementById('sheet-link').href = CONFIG.spreadsheetUrl;

    // Load available swipes data
    loadAvailableSwipes();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Show specific section
function showSection(section) {
    // Hide all sections
    document.getElementById('offer-section').classList.add('hidden');
    document.getElementById('request-section').classList.add('hidden');

    // Show requested section
    if (section === 'offer') {
        document.getElementById('offer-section').classList.remove('hidden');
        document.getElementById('offer-section').scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'request') {
        document.getElementById('request-section').classList.remove('hidden');
        document.getElementById('request-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to load and display data from Google Sheets
async function loadAvailableSwipes() {
    const cardsContainer = document.getElementById('offers-container');

    // Show loading state
    cardsContainer.innerHTML = '<div class="col-span-full text-center py-8"><i class="fas fa-spinner fa-spin text-4xl text-blue-900"></i><p class="mt-4 text-gray-600">Loading available meal swipes...</p></div>';

    try {
        // Check if API URL is configured
        if (!CONFIG.apiUrl || CONFIG.apiUrl === 'YOUR_WEB_APP_URL_HERE') {
            cardsContainer.innerHTML = `
                <div class="col-span-full">
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <p class="text-gray-700">
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            <strong>API not configured yet.</strong> Please deploy the Google Apps Script as a web app and add the URL to CONFIG.apiUrl in script.js.
                            <br><br>
                            <a href="${CONFIG.spreadsheetUrl}" target="_blank" class="text-blue-900 underline">View the spreadsheet directly</a>
                        </p>
                    </div>
                </div>
            `;
            return;
        }

        // Fetch data from Google Apps Script web app
        const response = await fetch(CONFIG.apiUrl);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Failed to load data');
        }

        // Clear loading state
        cardsContainer.innerHTML = '';

        // Check if there are any offers
        if (!data.offers || data.offers.length === 0) {
            cardsContainer.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600 text-lg">No meal swipes available yet.</p>
                    <p class="text-gray-500 mt-2">Be the first to offer!</p>
                </div>
            `;
            return;
        }

        // Create cards for each offer
        data.offers.forEach(offer => {
            const card = createOfferCard(offer);
            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading swipes:', error);
        cardsContainer.innerHTML = `
            <div class="col-span-full">
                <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <p class="text-gray-700">
                        <i class="fas fa-exclamation-circle mr-2"></i>
                        <strong>Error loading data:</strong> ${error.message}
                        <br><br>
                        <a href="${CONFIG.spreadsheetUrl}" target="_blank" class="text-blue-900 underline">View the spreadsheet directly</a>
                    </p>
                </div>
            </div>
        `;
    }
}

// Create a card element for an offer
function createOfferCard(offer) {
    const card = document.createElement('div');
    card.className = 'penn-card group relative bg-white rounded-2xl p-7';

    // Get first name only for privacy
    const firstName = offer.name.split(' ')[0];
    const lastInitial = offer.name.split(' ').length > 1 ? offer.name.split(' ')[1][0] + '.' : '';
    const displayName = `${firstName} ${lastInitial}`;

    // Format dining halls - show all selected
    const diningHalls = typeof offer.diningHalls === 'string'
        ? offer.diningHalls.split(',').map(h => h.trim()).join(', ')
        : 'Various';

    // Format availability - show all selected
    const availability = typeof offer.availability === 'string'
        ? offer.availability.split(',').map(a => a.trim()).join(', ')
        : 'Flexible';

    card.innerHTML = `
        <!-- Profile header -->
        <div class="flex items-center mb-6">
            <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-[#011F5B] to-[#990000] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div class="relative w-14 h-14 bg-gradient-to-br from-[#011F5B] to-[#990000] text-white rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <i class="fas fa-user text-lg"></i>
                </div>
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-900 group-hover:text-[#011F5B] transition-colors">${displayName}</h3>
                <p class="text-sm text-gray-500 font-medium">${offer.year} • ${offer.school}</p>
            </div>
        </div>
        
        <!-- Info badges -->
        <div class="space-y-3 mb-5">
            <div class="flex items-center gap-3 text-sm">
                <div class="flex items-center justify-center w-8 h-8 bg-[#011F5B]/10 rounded-lg">
                    <i class="fas fa-ticket-alt text-[#011F5B]"></i>
                </div>
                <div>
                    <p class="text-xs text-gray-500 font-medium">Swipes Available</p>
                    <p class="font-semibold text-gray-900">${offer.swipesAvailable}</p>
                </div>
            </div>
            <div class="flex items-center gap-3 text-sm">
                <div class="flex items-center justify-center w-8 h-8 bg-[#990000]/10 rounded-lg">
                    <i class="fas fa-clock text-[#990000]"></i>
                </div>
                <div>
                    <p class="text-xs text-gray-500 font-medium">Availability</p>
                    <p class="font-semibold text-gray-900">${availability}</p>
                </div>
            </div>
            <div class="flex items-center gap-3 text-sm">
                <div class="flex items-center justify-center w-8 h-8 bg-[#D4AF37]/10 rounded-lg">
                    <i class="fas fa-map-marker-alt text-[#D4AF37]"></i>
                </div>
                <div>
                    <p class="text-xs text-gray-500 font-medium">Preferred Location</p>
                    <p class="font-semibold text-gray-900">${diningHalls}</p>
                </div>
            </div>
        </div>
        
        <!-- About section -->
        ${offer.about ? `
            <div class="mb-5 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600 leading-relaxed line-clamp-2">${offer.about}</p>
            </div>
        ` : ''}
        
        <!-- CTA button -->
        <button onclick="showSection('request')" class="penn-button w-full bg-gradient-to-r from-[#990000] to-[#C41E3A] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-red-900/20 hover:shadow-xl hover:shadow-red-900/30">
            <span class="relative z-10 flex items-center justify-center">
                <i class="fas fa-paper-plane mr-2"></i>
                Request to Connect
            </span>
        </button>
    `;

    return card;
}
