// Configuration - UPDATE THESE WITH YOUR GOOGLE FORM URLs
const CONFIG = {
    offerFormUrl: 'https://forms.gle/L77FXngX4refmx6r8',
    requestFormUrl: 'https://forms.gle/iwvJteS8xT8HyqKR7',
    spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1ioLhZ6zvFgUro4eiQe7ro7jJe20J6gL6kEgHCelDS-8/edit?usp=sharing'
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set up Google Form iframes
    document.getElementById('offer-form').src = CONFIG.offerFormUrl;
    document.getElementById('request-form').src = CONFIG.requestFormUrl;
    document.getElementById('sheet-link').href = CONFIG.spreadsheetUrl;
    
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
// This would require Google Sheets API or Apps Script for real-time data
async function loadAvailableSwipes() {
    // This is a placeholder for the actual implementation
    // You would need to set up Google Apps Script to serve the data as JSON
    console.log('Loading available meal swipes...');
    
    // Example structure of what the data would look like:
    /*
    const sampleData = [
        {
            name: "John D.",
            year: "Sophomore",
            school: "Wharton",
            swipesAvailable: 5,
            availability: "Weekday evenings",
            diningHalls: ["Commons", "Hill"],
            interests: "Business, Basketball",
            email: "johnd@upenn.edu"
        }
    ];
    */
}

// Call this function to populate the browse section
// loadAvailableSwipes();
