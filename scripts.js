// Global variables to store data
let brandingData = null;
let themeData = null;
let gamesData = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
async function initializeApp() {
    try {
        // Load all JSON data files
        await loadAllData();
        
        // Apply branding and theme
        applyBranding();
        applyTheme();
        
        // Populate content
        populateGames();
        setupCountdown();
        
        console.log('Kids Gaming Site initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
        // TODO: student exercise - Add user-friendly error handling
    }
}

// Load all JSON data files
async function loadAllData() {
    try {
        const [branding, theme, games] = await Promise.all([
            fetch('data/branding.json').then(response => response.json()),
            fetch('data/theme.json').then(response => response.json()),
            fetch('data/games.json').then(response => response.json())
        ]);
        
        brandingData = branding;
        themeData = theme;
        gamesData = games;
        
        console.log('All data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        throw error;
    }
}

// Apply branding elements - Enhanced for HERE AND NOW AI
function applyBranding() {
    if (!brandingData) return;
    
    const brand = brandingData.brand;
    
    // Set favicon
    if (brand.logo && brand.logo.favicon) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = brand.logo.favicon;
        }
    }
    
    // Set logo
    if (brand.logo && brand.logo.title) {
        const logoImg = document.getElementById('site-logo');
        if (logoImg) {
            logoImg.src = brand.logo.title;
            logoImg.alt = brand.organizationName || 'Site Logo';
        }
    }
    
    // Set organization name in title
    if (brand.organizationName) {
        const titleElement = document.getElementById('site-title');
        if (titleElement && !titleElement.textContent.includes(brand.organizationName)) {
            titleElement.textContent = `Welcome to ${brand.organizationName} Gaming Zone!`;
        }
        // Update page title
        document.title = `${brand.organizationName} - Kids Gaming Zone`;
    }
    
    // Set slogan
    if (brand.slogan) {
        const sloganElement = document.getElementById('site-tagline');
        const footerSloganElement = document.getElementById('footer-slogan');
        if (sloganElement) {
            sloganElement.textContent = brand.slogan;
        }
        if (footerSloganElement) {
            footerSloganElement.textContent = brand.slogan;
        }
    }
    
    // Set contact information
    if (brand.email) {
        const emailLink = document.querySelector('#contact-email a');
        if (emailLink) {
            emailLink.href = `mailto:${brand.email}`;
            emailLink.textContent = brand.email;
        }
    }
    
    if (brand.mobile) {
        const phoneSpan = document.querySelector('#contact-phone span');
        if (phoneSpan) {
            phoneSpan.textContent = brand.mobile;
        }
    }
    
    // Set website link if available
    if (brand.website) {
        // Check if website link already exists or add it
        const contactInfo = document.querySelector('.contact-info');
        let websiteLink = contactInfo.querySelector('a[href*="hereandnowai.com"]');
        if (!websiteLink && contactInfo) {
            const websiteParagraph = document.createElement('p');
            websiteParagraph.innerHTML = `Website: <a href="${brand.website}" target="_blank" rel="noopener">${brand.website.replace('https://', '')}</a>`;
            contactInfo.appendChild(websiteParagraph);
        }
    }
    
    // Set social media links
    if (brand.socialMedia) {
        populateSocialMedia(brand.socialMedia);
    }
    
    // Apply brand colors if available
    if (brand.colors) {
        const root = document.documentElement;
        if (brand.colors.primary) {
            root.style.setProperty('--primary', brand.colors.primary);
        }
        if (brand.colors.secondary) {
            root.style.setProperty('--accent', brand.colors.secondary);
        }
    }
    
    // TODO: student exercise - Add chatbot avatar integration
    // TODO: student exercise - Add dynamic branding themes
}

// Populate social media links - Enhanced for HERE AND NOW AI
function populateSocialMedia(socialMedia) {
    const socialContainer = document.getElementById('social-links');
    if (!socialContainer) return;
    
    // Clear existing links only if they are placeholder content
    const existingLinks = socialContainer.querySelectorAll('a');
    if (existingLinks.length === 0 || existingLinks[0].textContent === '') {
        socialContainer.innerHTML = '';
        
        Object.entries(socialMedia).forEach(([platform, url]) => {
            const link = document.createElement('a');
            link.href = url;
            link.className = 'social-link';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
            link.setAttribute('aria-label', `Visit our ${platform} page`);
            
            socialContainer.appendChild(link);
        });
    }
    
    // TODO: student exercise - Add social media icons
    // TODO: student exercise - Add follower count display
}

// Apply theme colors and fonts
function applyTheme() {
    if (!themeData) return;
    
    const root = document.documentElement;
    
    // Apply colors from theme data
    if (themeData.colors) {
        Object.entries(themeData.colors).forEach(([colorName, colorValue]) => {
            root.style.setProperty(`--${colorName}`, colorValue);
        });
    }
    
    // Apply font from theme data
    if (themeData.font) {
        root.style.setProperty('--font-family', themeData.font);
    }
    
    // If branding has specific colors, override theme
    if (brandingData && brandingData.brand && brandingData.brand.colors) {
        const brandColors = brandingData.brand.colors;
        if (brandColors.primary) {
            root.style.setProperty('--primary', brandColors.primary);
        }
        if (brandColors.secondary) {
            root.style.setProperty('--accent', brandColors.secondary);
        }
    }
}

// Populate games section
function populateGames() {
    if (!gamesData) return;
    
    // Set site title and tagline
    if (gamesData.siteTitle) {
        const titleElement = document.getElementById('site-title');
        if (titleElement) {
            titleElement.textContent = gamesData.siteTitle;
        }
        document.title = gamesData.siteTitle;
    }
    
    if (gamesData.tagline) {
        const taglineElement = document.getElementById('site-tagline');
        if (taglineElement) {
            taglineElement.textContent = gamesData.tagline;
        }
    }
    
    // Populate games grid
    if (gamesData.games && gamesData.games.length > 0) {
        const gamesGrid = document.getElementById('games-grid');
        if (gamesGrid) {
            gamesGrid.innerHTML = '';
            
            gamesData.games.forEach(game => {
                const gameCard = createGameCard(game);
                gamesGrid.appendChild(gameCard);
            });
        }
    }
}

// Create individual game card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.setAttribute('role', 'listitem');
    
    card.innerHTML = `
        <img src="${game.thumb || 'assets/images/placeholder.jpg'}" alt="${game.name}" class="game-image">
        <h3 class="game-title">${game.name}</h3>
        <p class="game-description">${game.description}</p>
        <span class="difficulty">Difficulty: ${game.difficulty}</span>
        <button class="play-button" onclick="playGame('${game.url || '#'}')" aria-label="Play ${game.name}">
            Play Now!
        </button>
    `;
    
    // TODO: student exercise - Add game rating system
    // TODO: student exercise - Add favorite games functionality
    
    return card;
}

// Handle game play button click
function playGame(gameUrl) {
    if (gameUrl && gameUrl !== '#') {
        window.open(gameUrl, '_blank', 'noopener,noreferrer');
    } else {
        alert('Game coming soon! Stay tuned for more awesome games!');
    }
    
    // TODO: student exercise - Add game analytics tracking
    // TODO: student exercise - Add loading animation before opening game
}

// Setup countdown timer
function setupCountdown() {
    if (!gamesData || !gamesData.countdownTarget) return;
    
    const targetDate = new Date(gamesData.countdownTarget).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Countdown finished
            document.getElementById('countdown-timer').innerHTML = '<h3>ðŸŽ‰ New Game Released! ðŸŽ‰</h3>';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // TODO: student exercise - Add countdown sound effects
    // TODO: student exercise - Add visual effects when countdown reaches zero
}

// Search and filter functionality (for student extension)
function searchGames(query) {
    // TODO: student exercise - Implement game search functionality
    // Hint: Filter gamesData.games array based on game name or description
    console.log('Search functionality to be implemented by students');
}

function filterGamesByDifficulty(difficulty) {
    // TODO: student exercise - Implement game filtering by difficulty
    // Hint: Show/hide game cards based on difficulty level
    console.log('Filter functionality to be implemented by students');
}

// Additional utility functions for student exercises
function addGameToFavorites(gameId) {
    // TODO: student exercise - Implement favorites system using localStorage
    console.log('Favorites functionality to be implemented by students');
}

function rateGame(gameId, rating) {
    // TODO: student exercise - Implement game rating system
    console.log('Rating functionality to be implemented by students');
}

// Error handling utility
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // TODO: student exercise - Implement user-friendly error messages
    // TODO: student exercise - Add error reporting functionality
}

// Accessibility helpers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadAllData,
        applyBranding,
        applyTheme,
        populateGames,
        setupCountdown
    };
}
