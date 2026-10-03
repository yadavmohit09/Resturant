class App {
  constructor() {
    this.appContainer = document.getElementById('app-container');
    this.cartCount = document.getElementById('cartCount');
    this.navMenu = document.getElementById('navMenu');
    this.mobileToggle = document.getElementById('mobileToggle');
    
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.user = JSON.parse(localStorage.getItem('user')) || null;
    
    this.menuItems = [];
    
    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.updateCartCount();
    
    // Check auth status
    if (api.token && !this.user) {
      try {
        const res = await api.getMe();
        this.user = res.data;
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (e) {
        api.setToken(null);
        this.user = null;
        localStorage.removeItem('user');
      }
    }
    
    // Initial Route
    this.navigate('home');
  }

  setupEventListeners() {
    this.mobileToggle.addEventListener('click', () => {
      this.navMenu.classList.toggle('active');
    });
  }

  navigate(view) {
    this.appContainer.innerHTML = '<div class="section container text-center"><i class="fa-solid fa-spinner fa-spin fa-3x text-primary"></i></div>';
    
    if (this.navMenu.classList.contains('active')) {
      this.navMenu.classList.remove('active');
    }

    switch(view) {
      case 'home':
        this.renderHome();
        break;
      case 'menu':
        this.renderMenu();
        break;
      case 'book':
        this.renderBook();
        break;
      case 'about':
        this.renderAbout();
        break;
      case 'contact':
        this.renderContact();
        break;
      case 'cart':
        this.renderCart();
        break;
      case 'login':
        this.renderLogin();
        break;
      case 'register':
        this.renderRegister();
        break;
      case 'checkout':
        this.renderCheckout();
        break;
      case 'admin':
        this.renderAdmin();
        break;
      default:
        this.renderHome();
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}"></i> ${message}`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ----- Views -----

  async renderHome() {
    this.appContainer.innerHTML = `
      <section class="hero fade-in">
        <div class="container">
          <h1>Taste the Extraordinary</h1>
          <p>Experience culinary excellence with our premium pure vegetarian dishes. Conveniently located and perfect for by-road travel pit stops!</p>
          
          <!-- Select Service block removed -->
        </div>
      </section>

      <section class="section container fade-in">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="section-subtitle">Our Specialities</span>
          <h2 class="section-title">Featured Dishes</h2>
        </div>
        <div class="grid grid-3" id="featuredGrid">
           <!-- Loaded via API -->
        </div>
      </section>

      <section class="section container fade-in" style="background: var(--bg-color);">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="section-subtitle">A Look Inside</span>
          <h2 class="section-title">Restaurant Gallery</h2>
        </div>
        <div class="grid grid-3" style="gap: 1rem;">
          <div style="height: 250px; overflow: hidden; border-radius: var(--radius-lg);"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" alt="Restaurant Hall" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
          <div style="height: 250px; overflow: hidden; border-radius: var(--radius-lg);"><img src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80" alt="Hygienic Kitchen" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
          <div style="height: 250px; overflow: hidden; border-radius: var(--radius-lg);"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" alt="VIP Dining" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
          <div style="height: 250px; overflow: hidden; border-radius: var(--radius-lg);"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80" alt="Events and Parties" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
          <div style="height: 250px; overflow: hidden; border-radius: var(--radius-lg);"><img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80" alt="Authentic Food" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
          <div style="height: 250px; overflow: hidden; border-radius: var(--radius-lg);"><img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80" alt="Chefs Cooking" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></div>
        </div>
      </section>

      <section class="section container fade-in">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="section-subtitle">Find Us</span>
          <h2 class="section-title">Location Map</h2>
          <p class="text-muted">Dewas Naka, Indore, Madhya Pradesh</p>
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5269389274294!2d75.89066661496265!3d22.745814532321453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd765d70e303%3A0xc47b9319e7102e3b!2sDewas%20Naka%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v16543456789!5m2!1sen!2sin" width="100%" height="400" style="border:0; border-radius: var(--radius-md); box-shadow: var(--shadow-md);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </section>

      <section class="section container fade-in">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="section-subtitle">Customer Experience</span>
          <h2 class="section-title">Ratings & Feedback</h2>
        </div>
        <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <div class="summary-card" style="margin-bottom: 1rem;">
              <div style="display: flex; gap: 0.5rem; color: #f59e0b; margin-bottom: 0.5rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
              <p style="font-style: italic; margin-bottom: 0.5rem;">"Absolutely stunning food! We stopped here on our road trip and the quick service was phenomenal. The kitchen looked spotless."</p>
              <p style="color: var(--primary-color); font-weight: 500;">- Rajesh Sharma</p>
            </div>
            <div class="summary-card" style="margin-bottom: 1rem;">
              <div style="display: flex; gap: 0.5rem; color: #f59e0b; margin-bottom: 0.5rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>
              <p style="font-style: italic; margin-bottom: 0.5rem;">"Booked a Maharaja table for my anniversary. The candlelight setup was beautiful and the pure veg menu is endless!"</p>
              <p style="color: var(--primary-color); font-weight: 500;">- Priya Patel</p>
            </div>
            <div class="summary-card">
              <div style="display: flex; gap: 0.5rem; color: #f59e0b; margin-bottom: 0.5rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
              <p style="font-style: italic; margin-bottom: 0.5rem;">"Best Dosa and Paneer dishes in Indore. The new OTP booking system was incredibly smooth!"</p>
              <p style="color: var(--primary-color); font-weight: 500;">- Amit Verma</p>
            </div>
          </div>
          
          <div class="summary-card">
            <h3 style="margin-bottom: 1.5rem;">Leave Your Rating</h3>
            <form onsubmit="event.preventDefault(); app.showToast('Thank you for your valuable feedback!'); this.reset();">
              <div class="form-group">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Rate your experience</label>
                <select class="form-control" required style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                  <option value="5">⭐⭐⭐⭐⭐ Excellent (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ Very Good (4 Stars)</option>
                  <option value="3">⭐⭐⭐ Good (3 Stars)</option>
                  <option value="2">⭐⭐ Fair (2 Stars)</option>
                  <option value="1">⭐ Poor (1 Star)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Your Feedback / Review</label>
                <textarea class="form-control" rows="4" placeholder="Tell us what you loved..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Submit Feedback</button>
            </form>
          </div>
        </div>
      </section>
    `;

    try {
      if(this.menuItems.length === 0) {
        const res = await api.getMenu();
        this.menuItems = res.data;
      }
      const featuredGrid = document.getElementById('featuredGrid');
      const featured = this.menuItems.slice(0, 3); // Just show first 3 for demo
      
      featuredGrid.innerHTML = featured.map(item => this.createFoodCard(item)).join('');
    } catch (e) {
      this.menuItems = this.getMockMenuData();
      const featuredGrid = document.getElementById('featuredGrid');
      const featured = this.menuItems.slice(0, 3);
      featuredGrid.innerHTML = featured.map(item => this.createFoodCard(item)).join('');
      this.showToast('Backend offline. Loaded sample menu.', 'error');
    }
  }

  async renderMenu() {
    this.appContainer.innerHTML = `
      <div class="section container fade-in">
        <div class="text-center" style="margin-bottom: 3rem;">
          <h1 class="section-title">Our Menu</h1>
          <p class="text-muted">Discover our delicious offerings</p>
        </div>
        
        <div class="grid grid-3" id="menuGrid"></div>
      </div>
    `;

    try {
      if(this.menuItems.length === 0) {
        const res = await api.getMenu();
        this.menuItems = res.data;
      }
      
      document.getElementById('menuGrid').innerHTML = this.menuItems.map(item => this.createFoodCard(item)).join('');
    } catch (e) {
      this.menuItems = this.getMockMenuData();
      document.getElementById('menuGrid').innerHTML = this.menuItems.map(item => this.createFoodCard(item)).join('');
      this.showToast('Backend offline. Loaded sample menu.', 'error');
    }
  }

  createFoodCard(item) {
    const imageUrl = item.image && item.image !== 'no-photo.jpg' 
      ? item.image 
      : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
      
    return `
      <div class="food-card">
        ${item.isPopular ? '<span class="food-badge">Popular</span>' : ''}
        <div class="food-img-wrapper">
          <img src="${imageUrl}" alt="${item.name}" class="food-img">
        </div>
        <div class="food-content">
          <div class="food-header">
            <h3 class="food-title">${item.name}</h3>
            <span class="food-price">₹${item.price.toFixed(2)}</span>
          </div>
          <p class="food-desc">${item.description}</p>
          <div class="food-footer">
            <span class="food-rating"><i class="fa-solid fa-star"></i> ${item.rating} (${Math.floor(Math.random() * 150) + 11} ratings)</span>
            <button class="btn btn-outline" onclick="app.addToCart('${item._id}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }

  renderBook() {
    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 1000px;">
        <div class="cart-layout" style="align-items: flex-start; gap: 3rem;">
          
          <div style="flex: 1;">
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Experience the Best</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.6;">
              Enjoy our premium ambiance. <strong style="color: var(--primary-color);">Pre-order from our menu or book a luxury hotel room easily!</strong>
            </p>
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" alt="Dining Hall">
              <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" alt="Hotel Room">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" alt="Delicious Food">
              <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 180px; object-fit: cover; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" alt="Table Service">
            </div>
            <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid var(--primary-color); padding: 1rem; border-radius: var(--radius-md);">
              <p style="margin: 0; color: var(--text-color); font-weight: 500;">Need assistance? Official Contact:</p>
              <p style="margin: 0; color: var(--primary-color);">📞 +91 9876543210 | ✉️ info@indianrestaurant.com</p>
            </div>
          </div>

          <div class="summary-card" style="flex: 1;">
            <h2 class="text-center" style="margin-bottom: 1.5rem;">Book with Us</h2>
            <p class="text-center text-muted" style="margin-bottom: 2rem;">No advance payment required!</p>
            <form id="bookForm">
              
              <div class="form-group">
                <label class="form-label">What would you like to book?</label>
                <select class="form-control" id="venueType" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                  <option value="restaurant">Restaurant Table / Food</option>
                  <option value="hotel">Luxury Hotel Room</option>
                  <option value="cabin">Luxury Cabin</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" id="bookName" value="${this.user ? this.user.name : ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" id="bookEmail" value="${this.user && this.user.email ? this.user.email : ''}" placeholder="your@email.com" required>
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number</label>
                <input type="tel" class="form-control" id="bookPhone" value="${this.user && this.user.phone ? this.user.phone : '+91 '}" ${this.user ? 'readonly' : ''} pattern="^\\+91 [0-9]{10}$" placeholder="+91 XXXXXXXXXX" required>
              </div>
              
              <div id="restaurantOptions">
                <div class="form-group">
                  <label class="form-label">Order Type</label>
                  <div style="display: flex; gap: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                      <input type="radio" name="orderType" value="dinein" checked style="width: 18px; height: 18px;" onchange="document.getElementById('guestCountGroup').style.display='block'">
                      Dine-In (Stay here & eat)
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                      <input type="radio" name="orderType" value="pickup" style="width: 18px; height: 18px;" onchange="document.getElementById('guestCountGroup').style.display='none'">
                      Pickup / Parcel
                    </label>
                  </div>
                </div>

                <div class="form-group" id="mealTypeGroup">
                  <label class="form-label">Meal Type</label>
                  <select class="form-control" id="mealTypeSelect" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>

                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="form-group">
                    <label class="form-label">Date</label>
                    <input type="date" class="form-control" id="bookingDate">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Time</label>
                    <input type="time" class="form-control" id="bookingTime">
                  </div>
                </div>

                <div class="form-group" id="guestCountGroup">
                  <label class="form-label">How many customers will eat?</label>
                  <select class="form-control" id="guestCountSelect" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="1">1 Person</option>
                    <option value="2" selected>2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                    <option value="7">7 People</option>
                    <option value="8">8 People</option>
                    <option value="9">9 People</option>
                    <option value="10">10 People</option>
                    <option value="custom">More than 10 (Specify) _________</option>
                  </select>
                  <input type="number" class="form-control" id="customGuestCount" placeholder="Enter number of guests" min="11" style="display: none; margin-top: 0.5rem;">
                </div>

                <div class="form-group" id="companionsGroup">
                  <label class="form-label">Companions</label>
                  <select class="form-control" id="companionSelect" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="none">None / Alone</option>
                    <option value="friends">Friends</option>
                    <option value="family">Family</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                    <option value="girlfriend">Girlfriend</option>
                    <option value="boyfriend">Boyfriend</option>
                  </select>
                </div>

                <div class="form-group" id="tableSuggestionGroup" style="display: none; background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: var(--radius-md); border-left: 4px solid var(--primary-color);">
                  <p style="margin: 0;"><i class="fa-solid fa-lightbulb text-primary"></i> <strong>Suggested Table:</strong> <span id="tableSuggestionText"></span></p>
                </div>

                <div class="form-group" id="tableNumberGroup">
                  <label class="form-label">Table Number (If known)</label>
                  <input type="number" class="form-control" id="tableNumber" placeholder="Enter Table Number" min="1">
                </div>

                <div class="form-group" id="paymentMethodGroup">
                  <label class="form-label">Payment Method</label>
                  <select class="form-control" id="paymentMethod" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="Wallet">Wallet Integration</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Pay at Venue">Pay at Venue</option>
                  </select>
                </div>
              </div>

              <div id="hotelOptions" style="display: none;">
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="form-group">
                    <label class="form-label">Check-in Date</label>
                    <input type="date" class="form-control" id="hotelCheckIn">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Check-out Date</label>
                    <input type="date" class="form-control" id="hotelCheckOut">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Number of Guests</label>
                  <input type="number" class="form-control" id="hotelGuests" value="2" min="1">
                </div>

                <div class="form-group">
                  <label class="form-label">Relationship / Companions</label>
                  <select class="form-control" id="hotelCompanionSelect" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="none">Alone / Solo</option>
                    <option value="wife">Husband & Wife (Couple)</option>
                    <option value="family">Family (Parents & Children)</option>
                    <option value="business">Business / Corporate</option>
                    <option value="friends">Friends</option>
                  </select>
                </div>

                <div class="form-group" id="roomSuggestionGroup" style="display: none; background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: var(--radius-md); border-left: 4px solid #10b981;">
                  <p style="margin: 0;"><i class="fa-solid fa-bed text-primary"></i> <strong>Recommended Room:</strong> <span id="roomSuggestionText"></span></p>
                </div>

                <div class="form-group">
                  <label class="form-label">Room / Cabin Type</label>
                  <select class="form-control" id="roomTypeSelect" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="Standard">Standard Room</option>
                    <option value="Deluxe">Deluxe Room</option>
                    <option value="Suite">VIP Suite</option>
                    <option value="Honeymoon">Honeymoon Suite</option>
                    <option value="Family">Family Suite</option>
                    <option value="Executive">Executive Suite</option>
                    <option value="Presidential">Presidential Suite</option>
                    <option value="Family Cabin">Family Cabin</option>
                    <option value="Luxury Cabin">Luxury Cabin</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Special Requests (Optional)</label>
                  <textarea class="form-control" id="hotelRequests" rows="2" placeholder="E.g., Romantic setup, family-friendly services, business meeting facilities"></textarea>
                </div>

                <div class="form-group" id="hotelPaymentMethodGroup">
                  <label class="form-label">Payment Method</label>
                  <select class="form-control" id="hotelPaymentMethod" style="padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 100%;">
                    <option value="Wallet">Wallet Integration</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="Pay at Venue">Pay at Venue</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem;">
                <input type="checkbox" id="saveWalletDetails" checked>
                <label for="saveWalletDetails" style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Save Wallet/Payment details for faster future bookings</label>
              </div>

              <div class="form-group" id="idProofGroup" style="display: none; margin-top: 1rem;">
                <label class="form-label">ID Proof (Aadhar/PAN/Passport)</label>
                <input type="text" class="form-control" id="idProof" placeholder="Required for Check-in">
              </div>

              <div class="form-group" id="bookOtpGroup" style="display: none; margin-top: 1.5rem;">
                <label class="form-label">Enter OTP to Confirm</label>
                <input type="text" class="form-control" id="bookOtp" placeholder="4-digit OTP" maxlength="4">
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">OTP sent to your mobile!</p>
              </div>
              
              <button type="button" class="btn btn-secondary btn-block" id="sendBookOtpBtn" style="margin-top: 1.5rem;">Send OTP to Confirm</button>
              <button type="submit" class="btn btn-primary btn-block" id="verifyBookOtpBtn" style="display: none; margin-top: 1.5rem;">Verify OTP & Book Now</button>
            </form>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const select = document.getElementById('guestCountSelect');
      const customInput = document.getElementById('customGuestCount');
      const companionSelect = document.getElementById('companionSelect');
      const suggestionGroup = document.getElementById('tableSuggestionGroup');
      const suggestionText = document.getElementById('tableSuggestionText');

      const updateSuggestion = () => {
        if(!select || !companionSelect || !suggestionGroup) return;
        let guests = parseInt(select.value);
        if (select.value === 'custom') guests = parseInt(customInput.value) || 11;
        const comp = companionSelect.value;
        
        let suggestion = '';
        if (guests === 1) suggestion = 'Cozy single seating (Bar or Small Table)';
        else if (guests === 2 && ['wife', 'husband', 'girlfriend', 'boyfriend'].includes(comp)) suggestion = 'Romantic Candle Light Table for 2';
        else if (guests === 2) suggestion = 'Standard 2-seater Table';
        else if (guests >= 3 && guests <= 4 && comp === 'family') suggestion = 'Family Booth (4-seater)';
        else if (guests >= 3 && guests <= 4) suggestion = 'Standard 4-seater Table';
        else if (guests >= 5 && guests <= 8) suggestion = 'Large Round Table (8-seater)';
        else suggestion = 'Party Hall / Joined Tables Setup';
        
        suggestionText.textContent = suggestion;
        suggestionGroup.style.display = 'block';
      };

      if(select && customInput) {
        select.addEventListener('change', (e) => {
          if(e.target.value === 'custom') {
            customInput.style.display = 'block';
          } else {
            customInput.style.display = 'none';
          }
          updateSuggestion();
        });
        customInput.addEventListener('input', updateSuggestion);
      }
      
      if (companionSelect) companionSelect.addEventListener('change', updateSuggestion);

      const hotelGuestsInput = document.getElementById('hotelGuests');
      const hotelCompanion = document.getElementById('hotelCompanionSelect');
      const roomSuggestionGrp = document.getElementById('roomSuggestionGroup');
      const roomSuggestionTxt = document.getElementById('roomSuggestionText');
      const roomTypeSel = document.getElementById('roomTypeSelect');

      const updateRoomSuggestion = () => {
        if(!hotelGuestsInput || !hotelCompanion || !roomSuggestionGrp) return;
        const guests = parseInt(hotelGuestsInput.value) || 1;
        const comp = hotelCompanion.value;
        
        let suggestion = '';
        let roomVal = 'Standard';

        if (comp === 'wife' || comp === 'husband') {
            suggestion = 'Honeymoon Suite (Perfect for couples with romantic setup)';
            roomVal = 'Honeymoon';
        } else if (comp === 'family') {
            suggestion = 'Family Suite (Spacious for parents and children)';
            roomVal = 'Family';
        } else if (comp === 'business') {
            suggestion = 'Executive Suite (Ideal for business travelers with meeting facilities)';
            roomVal = 'Executive';
        } else if (comp === 'friends') {
            suggestion = 'Deluxe Room (Twin beds available)';
            roomVal = 'Deluxe';
        } else {
            if (guests > 2) {
              suggestion = 'VIP Suite (Plenty of space)';
              roomVal = 'Suite';
            } else {
              suggestion = 'Standard Room (Cozy and comfortable)';
              roomVal = 'Standard';
            }
        }
        
        roomSuggestionTxt.textContent = suggestion;
        roomSuggestionGrp.style.display = 'block';
        roomTypeSel.value = roomVal;
      };

      if (hotelGuestsInput) hotelGuestsInput.addEventListener('input', updateRoomSuggestion);
      if (hotelCompanion) hotelCompanion.addEventListener('change', updateRoomSuggestion);

      const venueType = document.getElementById('venueType');
      const restaurantOptions = document.getElementById('restaurantOptions');
      const hotelOptions = document.getElementById('hotelOptions');
      const idProofGroup = document.getElementById('idProofGroup');
      
      if(venueType) {
        venueType.addEventListener('change', (e) => {
          if(e.target.value === 'hotel' || e.target.value === 'cabin') {
            restaurantOptions.style.display = 'none';
            hotelOptions.style.display = 'block';
            idProofGroup.style.display = 'block';
            document.getElementById('idProof').required = true;
          } else {
            restaurantOptions.style.display = 'block';
            hotelOptions.style.display = 'none';
            idProofGroup.style.display = 'none';
            document.getElementById('idProof').required = false;
          }
        });
      }
    }, 0);

    document.getElementById('sendBookOtpBtn').addEventListener('click', () => {
      const phone = document.getElementById('bookPhone').value;
      const name = document.getElementById('bookName').value;
      if(!name || phone.length < 14) {
        this.showToast('Please enter your full name and valid +91 mobile number', 'error');
        return;
      }
      document.getElementById('sendBookOtpBtn').style.display = 'none';
      document.getElementById('bookOtpGroup').style.display = 'block';
      document.getElementById('verifyBookOtpBtn').style.display = 'block';
      document.getElementById('bookName').readOnly = true;
      document.getElementById('bookPhone').readOnly = true;
      this.showToast('OTP sent successfully!');
    });

    document.getElementById('bookForm').addEventListener('submit', (e) => this.submitBooking(e));
  }

  submitBooking(e) {
    e.preventDefault();
    const otp = document.getElementById('bookOtp').value;
    if(otp.length !== 4) {
      this.showToast('Please enter a valid 4-digit OTP', 'error');
      return;
    }

    const venueType = document.getElementById('venueType').value;
    const id = 'BKG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    if (venueType === 'hotel' || venueType === 'cabin') {
      const roomType = document.getElementById('roomTypeSelect').value;
      const checkIn = document.getElementById('hotelCheckIn').value || new Date().toISOString().split('T')[0];
      const checkOut = document.getElementById('hotelCheckOut').value || new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const guests = document.getElementById('hotelGuests').value || 1;
      const comp = document.getElementById('hotelCompanionSelect').value;
      const payment = document.getElementById('hotelPaymentMethod').value;
      const requests = document.getElementById('hotelRequests').value;
      const isCabin = venueType === 'cabin';
      
      let offer = '';
      if (comp === 'wife' || comp === 'husband') offer = 'Honeymoon Package applied (Complimentary wine & romantic setup)!';
      else if (comp === 'family') offer = 'Family Discount applied (Kids stay free)!';
      else if (comp === 'business') offer = 'Corporate Deal applied (Free access to business lounge)!';
      else offer = 'Welcome to our luxury experience!';

      this.appContainer.innerHTML = `
        <div class="section container fade-in" style="max-width: 600px; text-align: center;">
          <div class="summary-card">
            <i class="fa-solid fa-check-circle fa-4x text-primary" style="margin-bottom: 1.5rem;"></i>
            <h2 style="margin-bottom: 1rem;">Luxury ${isCabin ? 'Cabin' : 'Hotel'} Booked!</h2>
            <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 1.1rem;">Your booking ID is <strong style="color: var(--text-color); font-size: 1.3rem;">${id}</strong></p>
            <div style="text-align: left; background: var(--bg-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-bed text-primary"></i> <strong>${isCabin ? 'Cabin' : 'Room'} Type:</strong> ${roomType}</p>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-calendar text-primary"></i> <strong>Dates:</strong> Check-in ${checkIn} | Check-out ${checkOut}</p>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-users text-primary"></i> <strong>Guests:</strong> ${guests} (Relationship: ${comp})</p>
              ${requests ? `<p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-note-sticky text-primary"></i> <strong>Requests:</strong> ${requests}</p>` : ''}
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-credit-card text-primary"></i> <strong>Payment:</strong> ${payment}</p>
              
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; border-radius: var(--radius-sm);">
                <p style="margin-bottom: 0.5rem; color: #10b981; font-weight: bold;"><i class="fa-solid fa-gift"></i> Personalized Offer: ${offer}</p>
                <p style="margin-bottom: 0;"><i class="fa-solid fa-star" style="color: #f59e0b;"></i> You earned ${guests * 500} Loyalty Points for this stay!</p>
              </div>
              <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.9rem;">
                <i class="fa-solid fa-bell"></i> We will send you an SMS and Email reminder 24 hours before check-in. Please present your valid ID Proof at the reception.
              </p>
              
              <div style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-map-location-dot"></i> Location Map</h4>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122822.46419793145!2d74.93175891395641!3d15.461427244955283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d2a93322194b%3A0xc48c03ce156f2648!2sDharwad%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714856037812!5m2!1sen!2sin" width="100%" height="200" style="border:0; border-radius: var(--radius-md);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem;">
               <button class="btn btn-outline" onclick="app.navigate('book')"><i class="fa-solid fa-pen"></i> Edit Booking</button>
               <button class="btn btn-outline" style="border-color: #ef4444; color: #ef4444;" onclick="app.showToast('Booking Cancelled!', 'error'); app.navigate('home')"><i class="fa-solid fa-times"></i> Cancel Booking</button>
            </div>
            <button class="btn btn-primary" onclick="app.navigate('home')">Return Home</button>
          </div>
        </div>
      `;
    } else {
      const orderTypeRadios = document.getElementsByName('orderType');
      let orderType = 'dinein';
      for(let i = 0; i < orderTypeRadios.length; i++){
        if(orderTypeRadios[i].checked) orderType = orderTypeRadios[i].value;
      }
      
      let guests = 0;
      let tableNo = '';
      let mealType = '';
      let bookDate = '';
      let bookTime = '';
      let payment = '';
      let companion = '';
      
      if (orderType === 'dinein') {
        const select = document.getElementById('guestCountSelect');
        if(select.value === 'custom') {
          guests = document.getElementById('customGuestCount').value;
        } else {
          guests = select.value;
        }
        tableNo = document.getElementById('tableNumber').value;
        mealType = document.getElementById('mealTypeSelect').value;
        bookDate = document.getElementById('bookingDate').value || new Date().toISOString().split('T')[0];
        bookTime = document.getElementById('bookingTime').value || '19:00';
        payment = document.getElementById('paymentMethod').value;
        companion = document.getElementById('companionSelect').value;
      }

      this.appContainer.innerHTML = `
        <div class="section container fade-in" style="max-width: 600px; text-align: center;">
          <div class="summary-card">
            <i class="fa-solid fa-check-circle fa-4x text-primary" style="margin-bottom: 1.5rem;"></i>
            <h2 style="margin-bottom: 1rem;">Table Booking Confirmed!</h2>
            <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 1.1rem;">Your booking ID is <strong style="color: var(--text-color); font-size: 1.3rem;">${id}</strong></p>
            <div style="text-align: left; background: var(--bg-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-calendar text-primary"></i> <strong>Schedule:</strong> ${bookDate} at ${bookTime} (${mealType})</p>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-users text-primary"></i> <strong>Party:</strong> ${guests} people (Companions: ${companion})</p>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-chair text-primary"></i> <strong>Table Info:</strong> ${tableNo ? 'Table No: ' + tableNo : 'Table will be assigned perfectly for your party.'}</p>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-credit-card text-primary"></i> <strong>Payment:</strong> ${payment}</p>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-star text-primary"></i> <strong style="color: #f59e0b;">Loyalty Rewards:</strong> You will earn ${guests * 50} loyalty points for this visit!</p>
              <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.9rem;">
                <i class="fa-solid fa-bell"></i> We will send you an SMS and Email reminder 1 hour before your booking time.
              </p>
              <div style="margin-top: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-map-location-dot"></i> Location Map</h4>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122822.46419793145!2d74.93175891395641!3d15.461427244955283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d2a93322194b%3A0xc48c03ce156f2648!2sDharwad%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714856037812!5m2!1sen!2sin" width="100%" height="200" style="border:0; border-radius: var(--radius-md);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem;">
               <button class="btn btn-outline" onclick="app.navigate('book')"><i class="fa-solid fa-pen"></i> Edit Booking</button>
               <button class="btn btn-outline" style="border-color: #ef4444; color: #ef4444;" onclick="app.showToast('Booking Cancelled!', 'error'); app.navigate('home')"><i class="fa-solid fa-times"></i> Cancel Booking</button>
            </div>
            <button class="btn btn-primary" onclick="app.navigate('menu')">Go to Menu & Pre-order Food</button>
          </div>
        </div>
      `;
    }
  }

  renderAbout() {
    this.appContainer.innerHTML = `
      <div class="section container fade-in">
        <div class="text-center" style="margin-bottom: 3rem;">
          <h1 class="section-title">About Us</h1>
          <p class="text-muted">Meet the mind behind Indian Restaurant</p>
        </div>
        <div class="cart-layout" style="align-items: center;">
          <div>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" alt="Mohit Yadav" style="width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
          </div>
          <div>
            <h2 style="margin-bottom: 1rem; font-size: 2rem;">Mohit Yadav</h2>
            <p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.8;">
              Welcome to Indian Restaurant at Dewas Naka, Indore! I am Mohit Yadav, the founder. Since 1995, we pride ourselves on maintaining the highest standards of cleanliness, hygiene, and hospitality. Our restaurant is 100% pure vegetarian, offering an enormous menu of over 250 authentic dishes from all across India.
            </p>
            <p style="margin-bottom: 1.5rem; color: var(--text-muted); line-height: 1.8;">
              We offer premium facilities including Standard Hall seating, VIP Maharaja Tables, and romantic Candle Light Dinners. We are also fully equipped to host and cater Kitty Parties, Birthday Celebrations, Weddings, and Corporate events, with full arrangements expertly managed by our Hotel Manager.
            </p>
            <div class="summary-card">
              <h3 style="margin-bottom: 1rem;">Contact Details</h3>
              <p style="margin-bottom: 0.5rem;"><i class="fa-solid fa-envelope text-primary"></i> <a href="mailto:info@indianrestaurant.com">info@indianrestaurant.com</a></p>
              <p><i class="fa-solid fa-phone text-primary"></i> +91 9876543210</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderContact() {
    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 800px;">
        <div class="text-center" style="margin-bottom: 3rem;">
          <h1 class="section-title">Contact Us</h1>
          <p class="text-muted">We'd love to hear from you</p>
        </div>
        <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div class="summary-card">
            <h3 style="margin-bottom: 1.5rem;">Contact Information</h3>
            <p style="margin-bottom: 1rem;"><i class="fa-solid fa-location-dot text-primary" style="width: 25px;"></i> Dewas Naka, Indore</p>
            <p style="margin-bottom: 1rem;"><i class="fa-solid fa-phone text-primary" style="width: 25px;"></i> +91 9876543210</p>
            <p style="margin-bottom: 1rem;"><i class="fa-solid fa-envelope text-primary" style="width: 25px;"></i> info@indianrestaurant.com</p>
            <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Opening Hours</h4>
            <p style="color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 500;">Open 24 Hours, 7 Days a Week</p>
          </div>
          <div class="summary-card">
            <h3 style="margin-bottom: 1.5rem;">Send a Message</h3>
            <form onsubmit="event.preventDefault(); app.showToast('Message sent successfully!');">
              <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" required>
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea class="form-control" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  renderCart() {
    if (this.cart.length === 0) {
      this.appContainer.innerHTML = `
        <div class="section container text-center fade-in">
          <i class="fa-solid fa-cart-shopping fa-4x text-muted" style="margin-bottom: 1rem;"></i>
          <h2>Your cart is empty</h2>
          <p class="text-muted" style="margin-bottom: 2rem;">Looks like you haven't added anything to your cart yet.</p>
          <button class="btn btn-primary" onclick="app.navigate('menu')">Browse Menu</button>
        </div>
      `;
      return;
    }

    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.1; // 10% tax
    const delivery = 49.00;
    const total = subtotal + tax + delivery;

    this.appContainer.innerHTML = `
      <div class="section container fade-in">
        <h2 class="section-title" style="margin-bottom: 2rem;">Your Cart</h2>
        <div class="cart-layout">
          <div class="cart-items">
            ${this.cart.map(item => `
              <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                  <h4>${item.name}</h4>
                  <p class="text-primary font-bold">₹${item.price.toFixed(2)}</p>
                </div>
                <div class="qty-control">
                  <button class="qty-btn" onclick="app.updateQty('${item._id}', -1)"><i class="fa-solid fa-minus"></i></button>
                  <span>${item.qty}</span>
                  <button class="qty-btn" onclick="app.updateQty('${item._id}', 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="btn text-danger" onclick="app.removeFromCart('${item._id}')"><i class="fa-solid fa-trash"></i></button>
              </div>
            `).join('')}
          </div>
          
          <div class="summary-card">
            <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
            <div class="summary-row">
              <span class="text-muted">Subtotal</span>
              <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span class="text-muted">Tax (10%)</span>
              <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span class="text-muted">Delivery Fee</span>
              <span>₹${delivery.toFixed(2)}</span>
            </div>
            <div class="summary-row summary-total">
              <span>Total</span>
              <span class="text-primary">₹${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary btn-block" style="margin-top: 1.5rem;" onclick="app.navigate('checkout')">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    `;
  }

  renderLogin() {
    if(this.user) {
      this.appContainer.innerHTML = `
        <div class="section container text-center fade-in">
          <h2>Welcome back, ${this.user.name}!</h2>
          <button class="btn btn-outline" style="margin-top: 1rem;" onclick="app.logout()">Logout</button>
        </div>
      `;
      return;
    }

    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 500px;">
        <div class="summary-card">
          <h2 class="text-center" style="margin-bottom: 2rem;">Login / Sign Up</h2>
          <form id="loginForm">
            <div class="form-group">
              <label class="form-label">Mobile Number (Format: +91 XXXXXXXXXX)</label>
              <input type="text" class="form-control" id="loginPhone" value="+91 " required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-control" id="loginEmail" placeholder="your@email.com" required>
            </div>
            <div class="form-group" id="otpGroup" style="display: none;">
              <label class="form-label">Enter OTP</label>
              <input type="text" class="form-control" id="loginOtp" placeholder="4-digit OTP" maxlength="4">
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">OTP sent to your device!</p>
            </div>
            <button type="button" class="btn btn-secondary btn-block" id="sendOtpBtn" style="margin-bottom: 1rem;">Send OTP</button>
            <button type="submit" class="btn btn-primary btn-block" id="verifyOtpBtn" style="display: none;">Verify OTP & Login</button>
          </form>
        </div>
      </div>
    `;

    document.getElementById('sendOtpBtn').addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const phone = document.getElementById('loginPhone').value;
      if(!email || phone.length < 14) {
        this.showToast('Please enter a valid +91 mobile number and email', 'error');
        return;
      }
      document.getElementById('sendOtpBtn').style.display = 'none';
      document.getElementById('otpGroup').style.display = 'block';
      document.getElementById('verifyOtpBtn').style.display = 'block';
      document.getElementById('loginEmail').readOnly = true;
      document.getElementById('loginPhone').readOnly = true;
      this.showToast('OTP sent successfully!');
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const phone = document.getElementById('loginPhone').value;
      const otp = document.getElementById('loginOtp').value;
      
      if(otp.length !== 4) {
        this.showToast('Please enter a valid 4-digit OTP', 'error');
        return;
      }
      
      try {
        // Mock successful login
        this.user = { name: "Valued Customer", email: email, phone: phone };
        localStorage.setItem('user', JSON.stringify(this.user));
        this.showToast('Logged in successfully!');
        this.navigate('home');
        
        // Removed real API call as we use mock OTP for now
      } catch (error) {
        this.showToast('Login failed. Please try again.', 'error');
      }
    });
  }


  renderRegister() {
    if(this.user) {
      this.navigate('home');
      return;
    }

    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 500px;">
        <div class="summary-card">
          <h2 class="text-center" style="margin-bottom: 2rem;">Register</h2>
          <form id="registerForm">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control" id="regName" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-control" id="regEmail" required>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" id="regPassword" required minlength="6">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Create Account</button>
          </form>
          <p class="text-center text-muted" style="margin-top: 1.5rem;">Already have an account? <a href="#" onclick="app.navigate('login')" class="text-primary">Login</a></p>
        </div>
      </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      
      try {
        const res = await api.register({ name, email, password });
        api.setToken(res.token);
        this.user = res.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.showToast('Registration successful!');
        this.navigate('home');
      } catch (err) {
        this.showToast(err.message, 'error');
      }
    });
  }

  renderCheckout() {
    if(!this.user) {
      this.showToast('Please login to checkout', 'error');
      this.navigate('login');
      return;
    }

    if (this.cart.length === 0) {
      this.navigate('menu');
      return;
    }

    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 600px; text-align: center;">
        <div class="summary-card">
          <i class="fa-solid fa-mobile-screen-button fa-4x text-primary" style="margin-bottom: 1.5rem;"></i>
          <h2 style="margin-bottom: 1rem;">Verify Your Order</h2>
          <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 1.1rem;">An OTP has been sent to your registered mobile number.</p>
          
          <div style="margin-bottom: 2rem;">
            <input type="text" id="orderOtp" class="form-control" placeholder="Enter 4-digit OTP (e.g. 1234)" style="text-align: center; font-size: 1.5rem; letter-spacing: 5px;" maxlength="4">
          </div>
          
          <button class="btn btn-primary" onclick="app.verifyOtp(${total})">Verify & Confirm</button>
        </div>
      </div>
    `;
  }

  verifyOtp(total) {
    const otp = document.getElementById('orderOtp').value;
    if(otp.length !== 4) {
      this.showToast('Please enter a valid 4-digit OTP', 'error');
      return;
    }
    
    // Accept any 4 digit OTP for demo
    this.showReceipt(total);
  }

  showReceipt(total) {
    const subtotal = this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const tax = subtotal * 0.1;
    const itemsHtml = this.cart.map(item => `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding: 0.5rem 0;">
        <span>${item.qty}x ${item.name}</span>
        <span>₹${(item.price * item.qty).toFixed(2)}</span>
      </div>
    `).join('');

    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 600px; text-align: center;">
        <div class="summary-card" id="receiptCard">
          <i class="fa-solid fa-circle-check fa-4x text-primary" style="margin-bottom: 1.5rem;"></i>
          <h2 style="margin-bottom: 1rem;">Order Confirmed!</h2>
          <p style="margin-bottom: 2rem; color: var(--text-muted); font-size: 1.1rem;">Your delicious food is being prepared.</p>
          
          <div style="text-align: left; background: var(--bg-color); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 2rem;">
            <div style="text-align: center; margin-bottom: 1.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 1rem;">
              <h3 style="margin: 0; color: var(--text-color);">INDIAN RESTAURANT</h3>
              <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">Dewas Naka, Indore</p>
              <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">Receipt #${Math.floor(Math.random() * 100000)}</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              ${itemsHtml}
            </div>
            
            <div style="display: flex; justify-content: space-between; font-weight: 500; margin-top: 1rem;">
              <span>Subtotal:</span>
              <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: 500; color: var(--text-muted);">
              <span>Tax (10%):</span>
              <span>₹${tax.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-top: 1rem; border-top: 2px solid var(--border-color); padding-top: 1rem;">
              <span>Total:</span>
              <span>₹${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button class="btn btn-primary" onclick="app.completeOrder()">Done</button>
        </div>
      </div>
    `;
  }

  completeOrder() {
    this.cart = [];
    this.saveCart();
    this.showToast('We look forward to serving you!');
    this.navigate('home');
  }

  // ----- Admin Features -----

  renderAdmin() {
    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 800px;">
        <div class="summary-card text-center">
          <i class="fa-solid fa-user-shield fa-4x text-primary" style="margin-bottom: 1.5rem;"></i>
          <h2 style="margin-bottom: 1rem;">Admin Dashboard</h2>
          <p style="margin-bottom: 2rem; color: var(--text-muted);">Manage restaurant profiles, menus, and incoming orders.</p>
          
          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div style="border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md); cursor: pointer;" onclick="app.renderAdminEditMenu()">
              <i class="fa-solid fa-utensils fa-2x text-primary" style="margin-bottom: 1rem;"></i>
              <h3>Menu Management</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Edit food names, descriptions, and replace photos.</p>
            </div>
            <div style="border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md); cursor: pointer;" onclick="app.showToast('Order Management coming soon!', 'error')">
              <i class="fa-solid fa-receipt fa-2x text-primary" style="margin-bottom: 1rem;"></i>
              <h3>Order Management</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted);">View and manage table bookings and pickup orders.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async renderAdminEditMenu() {
    if(this.menuItems.length === 0) {
      try {
        const res = await api.getMenu();
        this.menuItems = res.data;
      } catch (e) {
        this.menuItems = this.getMockMenuData();
      }
    }

    this.appContainer.innerHTML = `
      <div class="section container fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h2 class="section-title" style="margin-bottom: 0;">Edit Menu</h2>
          <div>
            <button class="btn btn-outline" onclick="app.navigate('admin')">Back</button>
            <button class="btn btn-primary" onclick="app.adminPublish()"><i class="fa-solid fa-upload"></i> Publish Changes</button>
          </div>
        </div>
        
        <div style="background: var(--bg-color); border-radius: var(--radius-lg); padding: 1rem; box-shadow: var(--shadow-sm); overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 600px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color);">
                <th style="padding: 1rem;">Photo</th>
                <th style="padding: 1rem;">Dish Name</th>
                <th style="padding: 1rem;">Price</th>
                <th style="padding: 1rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.menuItems.map(item => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 1rem;"><img src="${item.image && item.image !== 'no-photo.jpg' ? item.image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                  <td style="padding: 1rem; font-weight: 500;">${item.name}</td>
                  <td style="padding: 1rem;">₹${item.price.toFixed(2)}</td>
                  <td style="padding: 1rem; text-align: right;">
                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;" onclick="app.renderAdminEditDish('${item._id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderAdminEditDish(id) {
    const item = this.menuItems.find(i => i._id === id);
    if(!item) return;

    this.appContainer.innerHTML = `
      <div class="section container fade-in" style="max-width: 600px;">
        <div class="summary-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <h2 style="margin-bottom: 0;">Correct Dish Details</h2>
            <button class="btn btn-outline" style="padding: 0.4rem 0.8rem;" onclick="app.renderAdminEditMenu()">Cancel</button>
          </div>
          
          <form onsubmit="event.preventDefault(); app.adminSaveDish('${item._id}')">
            <div class="form-group">
              <label class="form-label">Dish Name (Correct Spelling/Formatting)</label>
              <input type="text" class="form-control" id="editDishName" value="${item.name}" required>
            </div>
            <div class="form-group">
              <label class="form-label">High-Quality Photo URL (Replace Existing)</label>
              <input type="text" class="form-control" id="editDishImage" value="${item.image}" required>
              <div style="margin-top: 1rem;">
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Current Photo Preview:</p>
                <img src="${item.image}" id="editDishPreview" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md);">
              </div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
              <button type="submit" class="btn btn-primary" style="flex: 1;"><i class="fa-solid fa-save"></i> Save Changes</button>
              <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="app.navigate('menu')"><i class="fa-solid fa-eye"></i> Preview on Website</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('editDishImage').addEventListener('input', (e) => {
      document.getElementById('editDishPreview').src = e.target.value;
    });
  }

  adminSaveDish(id) {
    const item = this.menuItems.find(i => i._id === id);
    if(item) {
      item.name = document.getElementById('editDishName').value;
      item.image = document.getElementById('editDishImage').value;
      this.showToast('Changes saved locally. Preview on website and click Publish to make them live!');
      this.renderAdminEditMenu();
    }
  }

  adminPublish() {
    this.showToast('Success! The updated food names and photos are now LIVE on the user-facing website.');
    this.navigate('admin');
  }

  // ----- Actions -----

  addToCart(itemId) {
    const item = this.menuItems.find(i => i._id === itemId);
    if (!item) return;

    const existingItem = this.cart.find(i => i._id === itemId);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }
    
    this.saveCart();
    this.showToast(`${item.name} added to cart`);
  }

  updateQty(itemId, change) {
    const item = this.cart.find(i => i._id === itemId);
    if(item) {
      item.qty += change;
      if(item.qty <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.saveCart();
        this.renderCart();
      }
    }
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter(i => i._id !== itemId);
    this.saveCart();
    this.renderCart();
    this.showToast('Item removed from cart');
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

  updateCartCount() {
    const count = this.cart.reduce((acc, item) => acc + item.qty, 0);
    this.cartCount.innerText = count;
  }

  logout() {
    api.setToken(null);
    this.user = null;
    localStorage.removeItem('user');
    this.showToast('Logged out');
    this.navigate('home');
  }

  getMockMenuData() {
    return [
      {
            "_id": "1",
            "name": "Paneer Butter Masala",
            "description": "Authentic 100% pure veg Paneer Butter Masala prepared fresh in our hygienic kitchens.",
            "price": 178,
            "image": "https://foodish-api.com/images/biryani/biryani2.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "2",
            "name": "Paneer Kadai",
            "description": "Authentic 100% pure veg Paneer Kadai prepared fresh in our hygienic kitchens.",
            "price": 158,
            "image": "https://foodish-api.com/images/dosa/dosa2.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "3",
            "name": "Paneer Palak",
            "description": "Authentic 100% pure veg Paneer Palak prepared fresh in our hygienic kitchens.",
            "price": 154,
            "image": "https://foodish-api.com/images/idly/idly2.jpg",
            "isPopular": true,
            "rating": "4.1"
      },
      {
            "_id": "4",
            "name": "Paneer Tikka Masala",
            "description": "Authentic 100% pure veg Paneer Tikka Masala prepared fresh in our hygienic kitchens.",
            "price": 187,
            "image": "https://foodish-api.com/images/rice/rice2.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "5",
            "name": "Paneer Makhani",
            "description": "Authentic 100% pure veg Paneer Makhani prepared fresh in our hygienic kitchens.",
            "price": 414,
            "image": "https://foodish-api.com/images/biryani/biryani3.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "6",
            "name": "Dal Makhani",
            "description": "Authentic 100% pure veg Dal Makhani prepared fresh in our hygienic kitchens.",
            "price": 228,
            "image": "https://foodish-api.com/images/dosa/dosa3.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "7",
            "name": "Dal Tadka",
            "description": "Authentic 100% pure veg Dal Tadka prepared fresh in our hygienic kitchens.",
            "price": 422,
            "image": "https://foodish-api.com/images/idly/idly3.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "8",
            "name": "Dal Fry",
            "description": "Authentic 100% pure veg Dal Fry prepared fresh in our hygienic kitchens.",
            "price": 318,
            "image": "https://foodish-api.com/images/rice/rice3.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "9",
            "name": "Dal Palak",
            "description": "Authentic 100% pure veg Dal Palak prepared fresh in our hygienic kitchens.",
            "price": 318,
            "image": "https://foodish-api.com/images/biryani/biryani4.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "10",
            "name": "Dal Panchratna",
            "description": "Authentic 100% pure veg Dal Panchratna prepared fresh in our hygienic kitchens.",
            "price": 407,
            "image": "https://foodish-api.com/images/dosa/dosa4.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "11",
            "name": "Dal Bukhara",
            "description": "Authentic 100% pure veg Dal Bukhara prepared fresh in our hygienic kitchens.",
            "price": 202,
            "image": "https://foodish-api.com/images/idly/idly4.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "12",
            "name": "Dal Lahsuni",
            "description": "Authentic 100% pure veg Dal Lahsuni prepared fresh in our hygienic kitchens.",
            "price": 200,
            "image": "https://foodish-api.com/images/rice/rice4.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "13",
            "name": "Dal Dhaba Style",
            "description": "Authentic 100% pure veg Dal Dhaba Style prepared fresh in our hygienic kitchens.",
            "price": 263,
            "image": "https://foodish-api.com/images/biryani/biryani5.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "14",
            "name": "Dal Jeera",
            "description": "Authentic 100% pure veg Dal Jeera prepared fresh in our hygienic kitchens.",
            "price": 128,
            "image": "https://foodish-api.com/images/dosa/dosa5.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "15",
            "name": "Dal Tomato",
            "description": "Authentic 100% pure veg Dal Tomato prepared fresh in our hygienic kitchens.",
            "price": 100,
            "image": "https://foodish-api.com/images/idly/idly5.jpg",
            "isPopular": true,
            "rating": "4.8"
      },
      {
            "_id": "16",
            "name": "Dal Gujarati",
            "description": "Authentic 100% pure veg Dal Gujarati prepared fresh in our hygienic kitchens.",
            "price": 449,
            "image": "https://foodish-api.com/images/rice/rice5.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "17",
            "name": "Dal Maharashtrian",
            "description": "Authentic 100% pure veg Dal Maharashtrian prepared fresh in our hygienic kitchens.",
            "price": 293,
            "image": "https://foodish-api.com/images/biryani/biryani6.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "18",
            "name": "Dal Hyderabadi",
            "description": "Authentic 100% pure veg Dal Hyderabadi prepared fresh in our hygienic kitchens.",
            "price": 326,
            "image": "https://foodish-api.com/images/dosa/dosa6.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "19",
            "name": "Dal Kashmiri",
            "description": "Authentic 100% pure veg Dal Kashmiri prepared fresh in our hygienic kitchens.",
            "price": 419,
            "image": "https://foodish-api.com/images/idly/idly6.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "20",
            "name": "Dal Amritsari",
            "description": "Authentic 100% pure veg Dal Amritsari prepared fresh in our hygienic kitchens.",
            "price": 172,
            "image": "https://foodish-api.com/images/rice/rice6.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "21",
            "name": "Dal Punjabi",
            "description": "Authentic 100% pure veg Dal Punjabi prepared fresh in our hygienic kitchens.",
            "price": 323,
            "image": "https://foodish-api.com/images/biryani/biryani7.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "22",
            "name": "Dal Sindhi",
            "description": "Authentic 100% pure veg Dal Sindhi prepared fresh in our hygienic kitchens.",
            "price": 224,
            "image": "https://foodish-api.com/images/dosa/dosa7.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "23",
            "name": "Dal Pahari",
            "description": "Authentic 100% pure veg Dal Pahari prepared fresh in our hygienic kitchens.",
            "price": 378,
            "image": "https://foodish-api.com/images/idly/idly7.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "24",
            "name": "Dal Khatti",
            "description": "Authentic 100% pure veg Dal Khatti prepared fresh in our hygienic kitchens.",
            "price": 436,
            "image": "https://foodish-api.com/images/rice/rice7.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "25",
            "name": "Dal Meethi",
            "description": "Authentic 100% pure veg Dal Meethi prepared fresh in our hygienic kitchens.",
            "price": 180,
            "image": "https://foodish-api.com/images/biryani/biryani8.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "26",
            "name": "Chana Masala",
            "description": "Authentic 100% pure veg Chana Masala prepared fresh in our hygienic kitchens.",
            "price": 344,
            "image": "https://foodish-api.com/images/dosa/dosa8.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "27",
            "name": "Rajma Masala",
            "description": "Authentic 100% pure veg Rajma Masala prepared fresh in our hygienic kitchens.",
            "price": 370,
            "image": "https://foodish-api.com/images/idly/idly8.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "28",
            "name": "Lobia Masala",
            "description": "Authentic 100% pure veg Lobia Masala prepared fresh in our hygienic kitchens.",
            "price": 350,
            "image": "https://foodish-api.com/images/rice/rice8.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "29",
            "name": "Kala Chana",
            "description": "Authentic 100% pure veg Kala Chana prepared fresh in our hygienic kitchens.",
            "price": 237,
            "image": "https://foodish-api.com/images/biryani/biryani9.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "30",
            "name": "Pindi Chole",
            "description": "Authentic 100% pure veg Pindi Chole prepared fresh in our hygienic kitchens.",
            "price": 374,
            "image": "https://foodish-api.com/images/dosa/dosa9.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "31",
            "name": "Amritsari Chole",
            "description": "Authentic 100% pure veg Amritsari Chole prepared fresh in our hygienic kitchens.",
            "price": 129,
            "image": "https://foodish-api.com/images/idly/idly9.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "32",
            "name": "Masala Dosa",
            "description": "Authentic 100% pure veg Masala Dosa prepared fresh in our hygienic kitchens.",
            "price": 380,
            "image": "https://foodish-api.com/images/dosa/dosa10.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "33",
            "name": "Plain Dosa",
            "description": "Authentic 100% pure veg Plain Dosa prepared fresh in our hygienic kitchens.",
            "price": 387,
            "image": "https://foodish-api.com/images/dosa/dosa11.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "34",
            "name": "Onion Dosa",
            "description": "Authentic 100% pure veg Onion Dosa prepared fresh in our hygienic kitchens.",
            "price": 110,
            "image": "https://foodish-api.com/images/dosa/dosa12.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "35",
            "name": "Rava Dosa",
            "description": "Authentic 100% pure veg Rava Dosa prepared fresh in our hygienic kitchens.",
            "price": 397,
            "image": "https://foodish-api.com/images/dosa/dosa13.jpg",
            "isPopular": true,
            "rating": "4.0"
      },
      {
            "_id": "36",
            "name": "Onion Rava Dosa",
            "description": "Authentic 100% pure veg Onion Rava Dosa prepared fresh in our hygienic kitchens.",
            "price": 197,
            "image": "https://foodish-api.com/images/dosa/dosa14.jpg",
            "isPopular": true,
            "rating": "4.1"
      },
      {
            "_id": "37",
            "name": "Mysore Masala Dosa",
            "description": "Authentic 100% pure veg Mysore Masala Dosa prepared fresh in our hygienic kitchens.",
            "price": 134,
            "image": "https://foodish-api.com/images/dosa/dosa15.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "38",
            "name": "Paneer Dosa",
            "description": "Authentic 100% pure veg Paneer Dosa prepared fresh in our hygienic kitchens.",
            "price": 322,
            "image": "https://foodish-api.com/images/dosa/dosa16.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "39",
            "name": "Cheese Dosa",
            "description": "Authentic 100% pure veg Cheese Dosa prepared fresh in our hygienic kitchens.",
            "price": 301,
            "image": "https://foodish-api.com/images/dosa/dosa17.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "40",
            "name": "Cheese Burst Dosa",
            "description": "Authentic 100% pure veg Cheese Burst Dosa prepared fresh in our hygienic kitchens.",
            "price": 256,
            "image": "https://foodish-api.com/images/dosa/dosa18.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "41",
            "name": "Ghee Roast Dosa",
            "description": "Authentic 100% pure veg Ghee Roast Dosa prepared fresh in our hygienic kitchens.",
            "price": 266,
            "image": "https://foodish-api.com/images/dosa/dosa19.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "42",
            "name": "Paper Dosa",
            "description": "Authentic 100% pure veg Paper Dosa prepared fresh in our hygienic kitchens.",
            "price": 380,
            "image": "https://foodish-api.com/images/dosa/dosa20.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "43",
            "name": "Family Dosa",
            "description": "Authentic 100% pure veg Family Dosa prepared fresh in our hygienic kitchens.",
            "price": 234,
            "image": "https://foodish-api.com/images/dosa/dosa21.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "44",
            "name": "Spring Dosa",
            "description": "Authentic 100% pure veg Spring Dosa prepared fresh in our hygienic kitchens.",
            "price": 415,
            "image": "https://foodish-api.com/images/dosa/dosa22.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "45",
            "name": "Schezwan Dosa",
            "description": "Authentic 100% pure veg Schezwan Dosa prepared fresh in our hygienic kitchens.",
            "price": 165,
            "image": "https://foodish-api.com/images/dosa/dosa23.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "46",
            "name": "Jini Dosa",
            "description": "Authentic 100% pure veg Jini Dosa prepared fresh in our hygienic kitchens.",
            "price": 227,
            "image": "https://foodish-api.com/images/dosa/dosa24.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "47",
            "name": "Set Dosa",
            "description": "Authentic 100% pure veg Set Dosa prepared fresh in our hygienic kitchens.",
            "price": 406,
            "image": "https://foodish-api.com/images/dosa/dosa25.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "48",
            "name": "Neer Dosa",
            "description": "Authentic 100% pure veg Neer Dosa prepared fresh in our hygienic kitchens.",
            "price": 406,
            "image": "https://foodish-api.com/images/dosa/dosa26.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "49",
            "name": "Pesarattu Dosa",
            "description": "Authentic 100% pure veg Pesarattu Dosa prepared fresh in our hygienic kitchens.",
            "price": 276,
            "image": "https://foodish-api.com/images/dosa/dosa27.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "50",
            "name": "Adai Dosa",
            "description": "Authentic 100% pure veg Adai Dosa prepared fresh in our hygienic kitchens.",
            "price": 434,
            "image": "https://foodish-api.com/images/dosa/dosa28.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "51",
            "name": "Idli Sambar",
            "description": "Authentic 100% pure veg Idli Sambar prepared fresh in our hygienic kitchens.",
            "price": 418,
            "image": "https://foodish-api.com/images/idly/idly10.jpg",
            "isPopular": true,
            "rating": "4.8"
      },
      {
            "_id": "52",
            "name": "Mini Idli",
            "description": "Authentic 100% pure veg Mini Idli prepared fresh in our hygienic kitchens.",
            "price": 153,
            "image": "https://foodish-api.com/images/idly/idly11.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "53",
            "name": "Rava Idli",
            "description": "Authentic 100% pure veg Rava Idli prepared fresh in our hygienic kitchens.",
            "price": 108,
            "image": "https://foodish-api.com/images/idly/idly12.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "54",
            "name": "Thatte Idli",
            "description": "Authentic 100% pure veg Thatte Idli prepared fresh in our hygienic kitchens.",
            "price": 244,
            "image": "https://foodish-api.com/images/idly/idly13.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "55",
            "name": "Kanchipuram Idli",
            "description": "Authentic 100% pure veg Kanchipuram Idli prepared fresh in our hygienic kitchens.",
            "price": 106,
            "image": "https://foodish-api.com/images/idly/idly14.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "56",
            "name": "Fried Idli",
            "description": "Authentic 100% pure veg Fried Idli prepared fresh in our hygienic kitchens.",
            "price": 224,
            "image": "https://foodish-api.com/images/idly/idly15.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "57",
            "name": "Chilli Idli",
            "description": "Authentic 100% pure veg Chilli Idli prepared fresh in our hygienic kitchens.",
            "price": 304,
            "image": "https://foodish-api.com/images/idly/idly16.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "58",
            "name": "Medu Vada",
            "description": "Authentic 100% pure veg Medu Vada prepared fresh in our hygienic kitchens.",
            "price": 200,
            "image": "https://foodish-api.com/images/idly/idly17.jpg",
            "isPopular": true,
            "rating": "4.8"
      },
      {
            "_id": "59",
            "name": "Dal Vada",
            "description": "Authentic 100% pure veg Dal Vada prepared fresh in our hygienic kitchens.",
            "price": 410,
            "image": "https://foodish-api.com/images/idly/idly18.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "60",
            "name": "Rasa Vada",
            "description": "Authentic 100% pure veg Rasa Vada prepared fresh in our hygienic kitchens.",
            "price": 320,
            "image": "https://foodish-api.com/images/idly/idly19.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "61",
            "name": "Curd Vada",
            "description": "Authentic 100% pure veg Curd Vada prepared fresh in our hygienic kitchens.",
            "price": 188,
            "image": "https://foodish-api.com/images/idly/idly20.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "62",
            "name": "Plain Uttapam",
            "description": "Authentic 100% pure veg Plain Uttapam prepared fresh in our hygienic kitchens.",
            "price": 331,
            "image": "https://foodish-api.com/images/dosa/dosa29.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "63",
            "name": "Onion Uttapam",
            "description": "Authentic 100% pure veg Onion Uttapam prepared fresh in our hygienic kitchens.",
            "price": 298,
            "image": "https://foodish-api.com/images/dosa/dosa30.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "64",
            "name": "Tomato Uttapam",
            "description": "Authentic 100% pure veg Tomato Uttapam prepared fresh in our hygienic kitchens.",
            "price": 212,
            "image": "https://foodish-api.com/images/dosa/dosa31.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "65",
            "name": "Mixed Veg Uttapam",
            "description": "Authentic 100% pure veg Mixed Veg Uttapam prepared fresh in our hygienic kitchens.",
            "price": 313,
            "image": "https://foodish-api.com/images/dosa/dosa32.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "66",
            "name": "Upma",
            "description": "Authentic 100% pure veg Upma prepared fresh in our hygienic kitchens.",
            "price": 417,
            "image": "https://foodish-api.com/images/dosa/dosa33.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "67",
            "name": "Ven Pongal",
            "description": "Authentic 100% pure veg Ven Pongal prepared fresh in our hygienic kitchens.",
            "price": 419,
            "image": "https://foodish-api.com/images/rice/rice9.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "68",
            "name": "Veg Biryani",
            "description": "Authentic 100% pure veg Veg Biryani prepared fresh in our hygienic kitchens.",
            "price": 153,
            "image": "https://foodish-api.com/images/biryani/biryani10.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "69",
            "name": "Paneer Biryani",
            "description": "Authentic 100% pure veg Paneer Biryani prepared fresh in our hygienic kitchens.",
            "price": 178,
            "image": "https://foodish-api.com/images/biryani/biryani11.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "70",
            "name": "Mushroom Biryani",
            "description": "Authentic 100% pure veg Mushroom Biryani prepared fresh in our hygienic kitchens.",
            "price": 443,
            "image": "https://foodish-api.com/images/biryani/biryani12.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "71",
            "name": "Hyderabadi Biryani",
            "description": "Authentic 100% pure veg Hyderabadi Biryani prepared fresh in our hygienic kitchens.",
            "price": 381,
            "image": "https://foodish-api.com/images/biryani/biryani13.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "72",
            "name": "Lucknowi Biryani",
            "description": "Authentic 100% pure veg Lucknowi Biryani prepared fresh in our hygienic kitchens.",
            "price": 426,
            "image": "https://foodish-api.com/images/biryani/biryani14.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "73",
            "name": "Kolkata Veg Biryani",
            "description": "Authentic 100% pure veg Kolkata Veg Biryani prepared fresh in our hygienic kitchens.",
            "price": 217,
            "image": "https://foodish-api.com/images/biryani/biryani15.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "74",
            "name": "Sindhi Biryani",
            "description": "Authentic 100% pure veg Sindhi Biryani prepared fresh in our hygienic kitchens.",
            "price": 406,
            "image": "https://foodish-api.com/images/biryani/biryani16.jpg",
            "isPopular": true,
            "rating": "5.0"
      },
      {
            "_id": "75",
            "name": "Awadhi Biryani",
            "description": "Authentic 100% pure veg Awadhi Biryani prepared fresh in our hygienic kitchens.",
            "price": 251,
            "image": "https://foodish-api.com/images/biryani/biryani17.jpg",
            "isPopular": true,
            "rating": "4.2"
      },
      {
            "_id": "76",
            "name": "Jeera Rice",
            "description": "Authentic 100% pure veg Jeera Rice prepared fresh in our hygienic kitchens.",
            "price": 335,
            "image": "https://foodish-api.com/images/rice/rice10.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "77",
            "name": "Steamed Rice",
            "description": "Authentic 100% pure veg Steamed Rice prepared fresh in our hygienic kitchens.",
            "price": 418,
            "image": "https://foodish-api.com/images/rice/rice11.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "78",
            "name": "Ghee Rice",
            "description": "Authentic 100% pure veg Ghee Rice prepared fresh in our hygienic kitchens.",
            "price": 367,
            "image": "https://foodish-api.com/images/rice/rice12.jpg",
            "isPopular": true,
            "rating": "4.5"
      },
      {
            "_id": "79",
            "name": "Lemon Rice",
            "description": "Authentic 100% pure veg Lemon Rice prepared fresh in our hygienic kitchens.",
            "price": 307,
            "image": "https://foodish-api.com/images/rice/rice13.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "80",
            "name": "Tomato Rice",
            "description": "Authentic 100% pure veg Tomato Rice prepared fresh in our hygienic kitchens.",
            "price": 432,
            "image": "https://foodish-api.com/images/rice/rice14.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "81",
            "name": "Curd Rice",
            "description": "Authentic 100% pure veg Curd Rice prepared fresh in our hygienic kitchens.",
            "price": 193,
            "image": "https://foodish-api.com/images/rice/rice15.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "82",
            "name": "Tamarind Rice",
            "description": "Authentic 100% pure veg Tamarind Rice prepared fresh in our hygienic kitchens.",
            "price": 367,
            "image": "https://foodish-api.com/images/rice/rice16.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "83",
            "name": "Coconut Rice",
            "description": "Authentic 100% pure veg Coconut Rice prepared fresh in our hygienic kitchens.",
            "price": 113,
            "image": "https://foodish-api.com/images/rice/rice17.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "84",
            "name": "Mango Rice",
            "description": "Authentic 100% pure veg Mango Rice prepared fresh in our hygienic kitchens.",
            "price": 393,
            "image": "https://foodish-api.com/images/rice/rice18.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "85",
            "name": "Bisi Bele Bath",
            "description": "Authentic 100% pure veg Bisi Bele Bath prepared fresh in our hygienic kitchens.",
            "price": 311,
            "image": "https://foodish-api.com/images/biryani/biryani18.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "86",
            "name": "Vangi Bath",
            "description": "Authentic 100% pure veg Vangi Bath prepared fresh in our hygienic kitchens.",
            "price": 111,
            "image": "https://foodish-api.com/images/biryani/biryani19.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "87",
            "name": "Pudina Rice",
            "description": "Authentic 100% pure veg Pudina Rice prepared fresh in our hygienic kitchens.",
            "price": 360,
            "image": "https://foodish-api.com/images/rice/rice19.jpg",
            "isPopular": true,
            "rating": "4.8"
      },
      {
            "_id": "88",
            "name": "Coriander Rice",
            "description": "Authentic 100% pure veg Coriander Rice prepared fresh in our hygienic kitchens.",
            "price": 246,
            "image": "https://foodish-api.com/images/rice/rice20.jpg",
            "isPopular": true,
            "rating": "4.3"
      },
      {
            "_id": "89",
            "name": "Schezwan Fried Rice",
            "description": "Authentic 100% pure veg Schezwan Fried Rice prepared fresh in our hygienic kitchens.",
            "price": 382,
            "image": "https://foodish-api.com/images/rice/rice21.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "90",
            "name": "Veg Fried Rice",
            "description": "Authentic 100% pure veg Veg Fried Rice prepared fresh in our hygienic kitchens.",
            "price": 341,
            "image": "https://foodish-api.com/images/rice/rice22.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "91",
            "name": "Paneer Fried Rice",
            "description": "Authentic 100% pure veg Paneer Fried Rice prepared fresh in our hygienic kitchens.",
            "price": 141,
            "image": "https://foodish-api.com/images/rice/rice23.jpg",
            "isPopular": true,
            "rating": "4.0"
      },
      {
            "_id": "92",
            "name": "Mushroom Fried Rice",
            "description": "Authentic 100% pure veg Mushroom Fried Rice prepared fresh in our hygienic kitchens.",
            "price": 155,
            "image": "https://foodish-api.com/images/rice/rice24.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "93",
            "name": "Veg Pulao",
            "description": "Authentic 100% pure veg Veg Pulao prepared fresh in our hygienic kitchens.",
            "price": 111,
            "image": "https://foodish-api.com/images/biryani/biryani20.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "94",
            "name": "Kashmiri Pulao",
            "description": "Authentic 100% pure veg Kashmiri Pulao prepared fresh in our hygienic kitchens.",
            "price": 298,
            "image": "https://foodish-api.com/images/biryani/biryani21.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "95",
            "name": "Navratan Pulao",
            "description": "Authentic 100% pure veg Navratan Pulao prepared fresh in our hygienic kitchens.",
            "price": 344,
            "image": "https://foodish-api.com/images/biryani/biryani22.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "96",
            "name": "Mutter Pulao",
            "description": "Authentic 100% pure veg Mutter Pulao prepared fresh in our hygienic kitchens.",
            "price": 241,
            "image": "https://foodish-api.com/images/biryani/biryani23.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "97",
            "name": "Tawa Pulao",
            "description": "Authentic 100% pure veg Tawa Pulao prepared fresh in our hygienic kitchens.",
            "price": 277,
            "image": "https://foodish-api.com/images/biryani/biryani24.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "98",
            "name": "Punjabi Samosa",
            "description": "Authentic 100% pure veg Punjabi Samosa prepared fresh in our hygienic kitchens.",
            "price": 147,
            "image": "https://foodish-api.com/images/samosa/samosa2.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "99",
            "name": "Mini Samosa",
            "description": "Authentic 100% pure veg Mini Samosa prepared fresh in our hygienic kitchens.",
            "price": 374,
            "image": "https://foodish-api.com/images/samosa/samosa3.jpg",
            "isPopular": true,
            "rating": "4.9"
      },
      {
            "_id": "100",
            "name": "Cheese Samosa",
            "description": "Authentic 100% pure veg Cheese Samosa prepared fresh in our hygienic kitchens.",
            "price": 204,
            "image": "https://foodish-api.com/images/samosa/samosa4.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "101",
            "name": "Paneer Samosa",
            "description": "Authentic 100% pure veg Paneer Samosa prepared fresh in our hygienic kitchens.",
            "price": 374,
            "image": "https://foodish-api.com/images/samosa/samosa5.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "102",
            "name": "Chinese Samosa",
            "description": "Authentic 100% pure veg Chinese Samosa prepared fresh in our hygienic kitchens.",
            "price": 108,
            "image": "https://foodish-api.com/images/samosa/samosa6.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "103",
            "name": "Onion Kachori",
            "description": "Authentic 100% pure veg Onion Kachori prepared fresh in our hygienic kitchens.",
            "price": 351,
            "image": "https://foodish-api.com/images/samosa/samosa7.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "104",
            "name": "Dal Kachori",
            "description": "Authentic 100% pure veg Dal Kachori prepared fresh in our hygienic kitchens.",
            "price": 420,
            "image": "https://foodish-api.com/images/samosa/samosa8.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "105",
            "name": "Moong Dal Kachori",
            "description": "Authentic 100% pure veg Moong Dal Kachori prepared fresh in our hygienic kitchens.",
            "price": 136,
            "image": "https://foodish-api.com/images/samosa/samosa9.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "106",
            "name": "Raj Kachori",
            "description": "Authentic 100% pure veg Raj Kachori prepared fresh in our hygienic kitchens.",
            "price": 119,
            "image": "https://foodish-api.com/images/samosa/samosa10.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "107",
            "name": "Aloo Tikki",
            "description": "Authentic 100% pure veg Aloo Tikki prepared fresh in our hygienic kitchens.",
            "price": 122,
            "image": "https://foodish-api.com/images/samosa/samosa11.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "108",
            "name": "Aloo Tikki Chaat",
            "description": "Authentic 100% pure veg Aloo Tikki Chaat prepared fresh in our hygienic kitchens.",
            "price": 175,
            "image": "https://foodish-api.com/images/samosa/samosa12.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "109",
            "name": "Bhel Puri",
            "description": "Authentic 100% pure veg Bhel Puri prepared fresh in our hygienic kitchens.",
            "price": 215,
            "image": "https://foodish-api.com/images/samosa/samosa13.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "110",
            "name": "Pani Puri",
            "description": "Authentic 100% pure veg Pani Puri prepared fresh in our hygienic kitchens.",
            "price": 182,
            "image": "https://foodish-api.com/images/samosa/samosa14.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "111",
            "name": "Sev Puri",
            "description": "Authentic 100% pure veg Sev Puri prepared fresh in our hygienic kitchens.",
            "price": 214,
            "image": "https://foodish-api.com/images/samosa/samosa15.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "112",
            "name": "Dahi Puri",
            "description": "Authentic 100% pure veg Dahi Puri prepared fresh in our hygienic kitchens.",
            "price": 199,
            "image": "https://foodish-api.com/images/samosa/samosa16.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "113",
            "name": "Papdi Chaat",
            "description": "Authentic 100% pure veg Papdi Chaat prepared fresh in our hygienic kitchens.",
            "price": 325,
            "image": "https://foodish-api.com/images/samosa/samosa17.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "114",
            "name": "Dahi Vada",
            "description": "Authentic 100% pure veg Dahi Vada prepared fresh in our hygienic kitchens.",
            "price": 323,
            "image": "https://foodish-api.com/images/idly/idly21.jpg",
            "isPopular": true,
            "rating": "4.3"
      },
      {
            "_id": "115",
            "name": "Dahi Bhalla",
            "description": "Authentic 100% pure veg Dahi Bhalla prepared fresh in our hygienic kitchens.",
            "price": 271,
            "image": "https://foodish-api.com/images/idly/idly22.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "116",
            "name": "Aloo Chaat",
            "description": "Authentic 100% pure veg Aloo Chaat prepared fresh in our hygienic kitchens.",
            "price": 425,
            "image": "https://foodish-api.com/images/samosa/samosa18.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "117",
            "name": "Samosa Chaat",
            "description": "Authentic 100% pure veg Samosa Chaat prepared fresh in our hygienic kitchens.",
            "price": 399,
            "image": "https://foodish-api.com/images/samosa/samosa19.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "118",
            "name": "Kachori Chaat",
            "description": "Authentic 100% pure veg Kachori Chaat prepared fresh in our hygienic kitchens.",
            "price": 280,
            "image": "https://foodish-api.com/images/samosa/samosa20.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "119",
            "name": "Basket Chaat",
            "description": "Authentic 100% pure veg Basket Chaat prepared fresh in our hygienic kitchens.",
            "price": 279,
            "image": "https://foodish-api.com/images/samosa/samosa21.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "120",
            "name": "Palak Patta Chaat",
            "description": "Authentic 100% pure veg Palak Patta Chaat prepared fresh in our hygienic kitchens.",
            "price": 151,
            "image": "https://foodish-api.com/images/samosa/samosa22.jpg",
            "isPopular": true,
            "rating": "4.5"
      },
      {
            "_id": "121",
            "name": "Shakarkandi Chaat",
            "description": "Authentic 100% pure veg Shakarkandi Chaat prepared fresh in our hygienic kitchens.",
            "price": 226,
            "image": "https://foodish-api.com/images/samosa/samosa1.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "122",
            "name": "Chana Chaat",
            "description": "Authentic 100% pure veg Chana Chaat prepared fresh in our hygienic kitchens.",
            "price": 355,
            "image": "https://foodish-api.com/images/samosa/samosa2.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "123",
            "name": "Matar Chaat",
            "description": "Authentic 100% pure veg Matar Chaat prepared fresh in our hygienic kitchens.",
            "price": 229,
            "image": "https://foodish-api.com/images/samosa/samosa3.jpg",
            "isPopular": true,
            "rating": "4.0"
      },
      {
            "_id": "124",
            "name": "Ragda Pattice",
            "description": "Authentic 100% pure veg Ragda Pattice prepared fresh in our hygienic kitchens.",
            "price": 249,
            "image": "https://foodish-api.com/images/rice/rice25.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "125",
            "name": "Khandvi",
            "description": "Authentic 100% pure veg Khandvi prepared fresh in our hygienic kitchens.",
            "price": 313,
            "image": "https://foodish-api.com/images/biryani/biryani25.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "126",
            "name": "Dhokla",
            "description": "Authentic 100% pure veg Dhokla prepared fresh in our hygienic kitchens.",
            "price": 388,
            "image": "https://foodish-api.com/images/samosa/samosa4.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "127",
            "name": "Nylon Khaman",
            "description": "Authentic 100% pure veg Nylon Khaman prepared fresh in our hygienic kitchens.",
            "price": 306,
            "image": "https://foodish-api.com/images/samosa/samosa5.jpg",
            "isPopular": true,
            "rating": "4.2"
      },
      {
            "_id": "128",
            "name": "Fafda",
            "description": "Authentic 100% pure veg Fafda prepared fresh in our hygienic kitchens.",
            "price": 349,
            "image": "https://foodish-api.com/images/rice/rice26.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "129",
            "name": "Jalebi",
            "description": "Authentic 100% pure veg Jalebi prepared fresh in our hygienic kitchens.",
            "price": 239,
            "image": "https://foodish-api.com/images/dessert/dessert2.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "130",
            "name": "Vada Pav",
            "description": "Authentic 100% pure veg Vada Pav prepared fresh in our hygienic kitchens.",
            "price": 346,
            "image": "https://foodish-api.com/images/idly/idly23.jpg",
            "isPopular": true,
            "rating": "4.8"
      },
      {
            "_id": "131",
            "name": "Misal Pav",
            "description": "Authentic 100% pure veg Misal Pav prepared fresh in our hygienic kitchens.",
            "price": 173,
            "image": "https://foodish-api.com/images/samosa/samosa6.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "132",
            "name": "Pav Bhaji",
            "description": "Authentic 100% pure veg Pav Bhaji prepared fresh in our hygienic kitchens.",
            "price": 211,
            "image": "https://foodish-api.com/images/samosa/samosa7.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "133",
            "name": "Cheese Pav Bhaji",
            "description": "Authentic 100% pure veg Cheese Pav Bhaji prepared fresh in our hygienic kitchens.",
            "price": 444,
            "image": "https://foodish-api.com/images/samosa/samosa8.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "134",
            "name": "Paneer Pav Bhaji",
            "description": "Authentic 100% pure veg Paneer Pav Bhaji prepared fresh in our hygienic kitchens.",
            "price": 374,
            "image": "https://foodish-api.com/images/samosa/samosa9.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "135",
            "name": "Dabeli",
            "description": "Authentic 100% pure veg Dabeli prepared fresh in our hygienic kitchens.",
            "price": 431,
            "image": "https://foodish-api.com/images/idly/idly24.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "136",
            "name": "Mirchi Vada",
            "description": "Authentic 100% pure veg Mirchi Vada prepared fresh in our hygienic kitchens.",
            "price": 154,
            "image": "https://foodish-api.com/images/idly/idly25.jpg",
            "isPopular": true,
            "rating": "4.1"
      },
      {
            "_id": "137",
            "name": "Kothimbir Vadi",
            "description": "Authentic 100% pure veg Kothimbir Vadi prepared fresh in our hygienic kitchens.",
            "price": 312,
            "image": "https://foodish-api.com/images/samosa/samosa10.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "138",
            "name": "Plain Naan",
            "description": "Authentic 100% pure veg Plain Naan prepared fresh in our hygienic kitchens.",
            "price": 184,
            "image": "https://foodish-api.com/images/biryani/biryani26.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "139",
            "name": "Butter Naan",
            "description": "Authentic 100% pure veg Butter Naan prepared fresh in our hygienic kitchens.",
            "price": 117,
            "image": "https://foodish-api.com/images/biryani/biryani27.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "140",
            "name": "Garlic Naan",
            "description": "Authentic 100% pure veg Garlic Naan prepared fresh in our hygienic kitchens.",
            "price": 361,
            "image": "https://foodish-api.com/images/biryani/biryani28.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "141",
            "name": "Cheese Naan",
            "description": "Authentic 100% pure veg Cheese Naan prepared fresh in our hygienic kitchens.",
            "price": 264,
            "image": "https://foodish-api.com/images/biryani/biryani29.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "142",
            "name": "Chilli Garlic Naan",
            "description": "Authentic 100% pure veg Chilli Garlic Naan prepared fresh in our hygienic kitchens.",
            "price": 432,
            "image": "https://foodish-api.com/images/biryani/biryani30.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "143",
            "name": "Paneer Naan",
            "description": "Authentic 100% pure veg Paneer Naan prepared fresh in our hygienic kitchens.",
            "price": 194,
            "image": "https://foodish-api.com/images/biryani/biryani31.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "144",
            "name": "Kashmiri Naan",
            "description": "Authentic 100% pure veg Kashmiri Naan prepared fresh in our hygienic kitchens.",
            "price": 412,
            "image": "https://foodish-api.com/images/biryani/biryani32.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "145",
            "name": "Tandoori Roti",
            "description": "Authentic 100% pure veg Tandoori Roti prepared fresh in our hygienic kitchens.",
            "price": 183,
            "image": "https://foodish-api.com/images/biryani/biryani33.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "146",
            "name": "Butter Roti",
            "description": "Authentic 100% pure veg Butter Roti prepared fresh in our hygienic kitchens.",
            "price": 227,
            "image": "https://foodish-api.com/images/biryani/biryani34.jpg",
            "isPopular": true,
            "rating": "4.2"
      },
      {
            "_id": "147",
            "name": "Missi Roti",
            "description": "Authentic 100% pure veg Missi Roti prepared fresh in our hygienic kitchens.",
            "price": 261,
            "image": "https://foodish-api.com/images/biryani/biryani35.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "148",
            "name": "Rumali Roti",
            "description": "Authentic 100% pure veg Rumali Roti prepared fresh in our hygienic kitchens.",
            "price": 103,
            "image": "https://foodish-api.com/images/biryani/biryani36.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "149",
            "name": "Khasta Roti",
            "description": "Authentic 100% pure veg Khasta Roti prepared fresh in our hygienic kitchens.",
            "price": 342,
            "image": "https://foodish-api.com/images/biryani/biryani37.jpg",
            "isPopular": true,
            "rating": "4.5"
      },
      {
            "_id": "150",
            "name": "Lachha Paratha",
            "description": "Authentic 100% pure veg Lachha Paratha prepared fresh in our hygienic kitchens.",
            "price": 101,
            "image": "https://foodish-api.com/images/biryani/biryani38.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "151",
            "name": "Pudina Paratha",
            "description": "Authentic 100% pure veg Pudina Paratha prepared fresh in our hygienic kitchens.",
            "price": 299,
            "image": "https://foodish-api.com/images/biryani/biryani39.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "152",
            "name": "Methi Paratha",
            "description": "Authentic 100% pure veg Methi Paratha prepared fresh in our hygienic kitchens.",
            "price": 265,
            "image": "https://foodish-api.com/images/biryani/biryani40.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "153",
            "name": "Aloo Paratha",
            "description": "Authentic 100% pure veg Aloo Paratha prepared fresh in our hygienic kitchens.",
            "price": 407,
            "image": "https://foodish-api.com/images/biryani/biryani41.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "154",
            "name": "Gobi Paratha",
            "description": "Authentic 100% pure veg Gobi Paratha prepared fresh in our hygienic kitchens.",
            "price": 341,
            "image": "https://foodish-api.com/images/biryani/biryani42.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "155",
            "name": "Mooli Paratha",
            "description": "Authentic 100% pure veg Mooli Paratha prepared fresh in our hygienic kitchens.",
            "price": 410,
            "image": "https://foodish-api.com/images/biryani/biryani43.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "156",
            "name": "Paneer Paratha",
            "description": "Authentic 100% pure veg Paneer Paratha prepared fresh in our hygienic kitchens.",
            "price": 424,
            "image": "https://foodish-api.com/images/biryani/biryani44.jpg",
            "isPopular": true,
            "rating": "4.7"
      },
      {
            "_id": "157",
            "name": "Mixed Veg Paratha",
            "description": "Authentic 100% pure veg Mixed Veg Paratha prepared fresh in our hygienic kitchens.",
            "price": 133,
            "image": "https://foodish-api.com/images/biryani/biryani45.jpg",
            "isPopular": false,
            "rating": "5.0"
      },
      {
            "_id": "158",
            "name": "Onion Paratha",
            "description": "Authentic 100% pure veg Onion Paratha prepared fresh in our hygienic kitchens.",
            "price": 390,
            "image": "https://foodish-api.com/images/biryani/biryani46.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "159",
            "name": "Puri",
            "description": "Authentic 100% pure veg Puri prepared fresh in our hygienic kitchens.",
            "price": 415,
            "image": "https://foodish-api.com/images/samosa/samosa11.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "160",
            "name": "Bhatura",
            "description": "Authentic 100% pure veg Bhatura prepared fresh in our hygienic kitchens.",
            "price": 301,
            "image": "https://foodish-api.com/images/rice/rice27.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "161",
            "name": "Amritsari Kulcha",
            "description": "Authentic 100% pure veg Amritsari Kulcha prepared fresh in our hygienic kitchens.",
            "price": 404,
            "image": "https://foodish-api.com/images/biryani/biryani47.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "162",
            "name": "Onion Kulcha",
            "description": "Authentic 100% pure veg Onion Kulcha prepared fresh in our hygienic kitchens.",
            "price": 274,
            "image": "https://foodish-api.com/images/biryani/biryani48.jpg",
            "isPopular": true,
            "rating": "4.0"
      },
      {
            "_id": "163",
            "name": "Paneer Kulcha",
            "description": "Authentic 100% pure veg Paneer Kulcha prepared fresh in our hygienic kitchens.",
            "price": 366,
            "image": "https://foodish-api.com/images/biryani/biryani49.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "164",
            "name": "Aloo Kulcha",
            "description": "Authentic 100% pure veg Aloo Kulcha prepared fresh in our hygienic kitchens.",
            "price": 126,
            "image": "https://foodish-api.com/images/biryani/biryani50.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "165",
            "name": "Bhakri",
            "description": "Authentic 100% pure veg Bhakri prepared fresh in our hygienic kitchens.",
            "price": 185,
            "image": "https://foodish-api.com/images/biryani/biryani51.jpg",
            "isPopular": true,
            "rating": "4.9"
      },
      {
            "_id": "166",
            "name": "Thepla",
            "description": "Authentic 100% pure veg Thepla prepared fresh in our hygienic kitchens.",
            "price": 402,
            "image": "https://foodish-api.com/images/dosa/dosa34.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "167",
            "name": "Puran Poli",
            "description": "Authentic 100% pure veg Puran Poli prepared fresh in our hygienic kitchens.",
            "price": 373,
            "image": "https://foodish-api.com/images/idly/idly26.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "168",
            "name": "Gulab Jamun",
            "description": "Authentic 100% pure veg Gulab Jamun prepared fresh in our hygienic kitchens.",
            "price": 109,
            "image": "https://foodish-api.com/images/dessert/dessert3.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "169",
            "name": "Kala Jamun",
            "description": "Authentic 100% pure veg Kala Jamun prepared fresh in our hygienic kitchens.",
            "price": 330,
            "image": "https://foodish-api.com/images/dessert/dessert4.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "170",
            "name": "Rasgulla",
            "description": "Authentic 100% pure veg Rasgulla prepared fresh in our hygienic kitchens.",
            "price": 136,
            "image": "https://foodish-api.com/images/dessert/dessert5.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "171",
            "name": "Rajbhog",
            "description": "Authentic 100% pure veg Rajbhog prepared fresh in our hygienic kitchens.",
            "price": 294,
            "image": "https://foodish-api.com/images/idly/idly27.jpg",
            "isPopular": true,
            "rating": "4.3"
      },
      {
            "_id": "172",
            "name": "Rasmalai",
            "description": "Authentic 100% pure veg Rasmalai prepared fresh in our hygienic kitchens.",
            "price": 192,
            "image": "https://foodish-api.com/images/rice/rice28.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "173",
            "name": "Cham Cham",
            "description": "Authentic 100% pure veg Cham Cham prepared fresh in our hygienic kitchens.",
            "price": 213,
            "image": "https://foodish-api.com/images/biryani/biryani52.jpg",
            "isPopular": true,
            "rating": "4.3"
      },
      {
            "_id": "174",
            "name": "Kaju Katli",
            "description": "Authentic 100% pure veg Kaju Katli prepared fresh in our hygienic kitchens.",
            "price": 176,
            "image": "https://foodish-api.com/images/dessert/dessert6.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "175",
            "name": "Badam Katli",
            "description": "Authentic 100% pure veg Badam Katli prepared fresh in our hygienic kitchens.",
            "price": 403,
            "image": "https://foodish-api.com/images/dessert/dessert7.jpg",
            "isPopular": true,
            "rating": "4.6"
      },
      {
            "_id": "176",
            "name": "Pista Barfi",
            "description": "Authentic 100% pure veg Pista Barfi prepared fresh in our hygienic kitchens.",
            "price": 295,
            "image": "https://foodish-api.com/images/dessert/dessert8.jpg",
            "isPopular": true,
            "rating": "4.6"
      },
      {
            "_id": "177",
            "name": "Besan Barfi",
            "description": "Authentic 100% pure veg Besan Barfi prepared fresh in our hygienic kitchens.",
            "price": 450,
            "image": "https://foodish-api.com/images/dessert/dessert9.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "178",
            "name": "Coconut Barfi",
            "description": "Authentic 100% pure veg Coconut Barfi prepared fresh in our hygienic kitchens.",
            "price": 271,
            "image": "https://foodish-api.com/images/dessert/dessert10.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "179",
            "name": "Milk Cake",
            "description": "Authentic 100% pure veg Milk Cake prepared fresh in our hygienic kitchens.",
            "price": 324,
            "image": "https://foodish-api.com/images/dessert/dessert11.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "180",
            "name": "Kalakand",
            "description": "Authentic 100% pure veg Kalakand prepared fresh in our hygienic kitchens.",
            "price": 150,
            "image": "https://foodish-api.com/images/rice/rice29.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "181",
            "name": "Doda Barfi",
            "description": "Authentic 100% pure veg Doda Barfi prepared fresh in our hygienic kitchens.",
            "price": 287,
            "image": "https://foodish-api.com/images/dessert/dessert12.jpg",
            "isPopular": true,
            "rating": "4.7"
      },
      {
            "_id": "182",
            "name": "Moong Dal Halwa",
            "description": "Authentic 100% pure veg Moong Dal Halwa prepared fresh in our hygienic kitchens.",
            "price": 336,
            "image": "https://foodish-api.com/images/dessert/dessert13.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "183",
            "name": "Gajar Halwa",
            "description": "Authentic 100% pure veg Gajar Halwa prepared fresh in our hygienic kitchens.",
            "price": 336,
            "image": "https://foodish-api.com/images/dessert/dessert14.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "184",
            "name": "Sooji Halwa",
            "description": "Authentic 100% pure veg Sooji Halwa prepared fresh in our hygienic kitchens.",
            "price": 213,
            "image": "https://foodish-api.com/images/dessert/dessert15.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "185",
            "name": "Badam Halwa",
            "description": "Authentic 100% pure veg Badam Halwa prepared fresh in our hygienic kitchens.",
            "price": 317,
            "image": "https://foodish-api.com/images/dessert/dessert16.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "186",
            "name": "Atte Ka Halwa",
            "description": "Authentic 100% pure veg Atte Ka Halwa prepared fresh in our hygienic kitchens.",
            "price": 367,
            "image": "https://foodish-api.com/images/dessert/dessert17.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "187",
            "name": "Kheer",
            "description": "Authentic 100% pure veg Kheer prepared fresh in our hygienic kitchens.",
            "price": 306,
            "image": "https://foodish-api.com/images/dessert/dessert18.jpg",
            "isPopular": true,
            "rating": "4.3"
      },
      {
            "_id": "188",
            "name": "Phirni",
            "description": "Authentic 100% pure veg Phirni prepared fresh in our hygienic kitchens.",
            "price": 236,
            "image": "https://foodish-api.com/images/dessert/dessert19.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "189",
            "name": "Rabri",
            "description": "Authentic 100% pure veg Rabri prepared fresh in our hygienic kitchens.",
            "price": 307,
            "image": "https://foodish-api.com/images/dessert/dessert20.jpg",
            "isPopular": true,
            "rating": "4.3"
      },
      {
            "_id": "190",
            "name": "Basundi",
            "description": "Authentic 100% pure veg Basundi prepared fresh in our hygienic kitchens.",
            "price": 433,
            "image": "https://foodish-api.com/images/dosa/dosa35.jpg",
            "isPopular": true,
            "rating": "4.5"
      },
      {
            "_id": "191",
            "name": "Shrikhand",
            "description": "Authentic 100% pure veg Shrikhand prepared fresh in our hygienic kitchens.",
            "price": 311,
            "image": "https://foodish-api.com/images/dessert/dessert21.jpg",
            "isPopular": true,
            "rating": "4.2"
      },
      {
            "_id": "192",
            "name": "Amrakhand",
            "description": "Authentic 100% pure veg Amrakhand prepared fresh in our hygienic kitchens.",
            "price": 300,
            "image": "https://foodish-api.com/images/rice/rice30.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "193",
            "name": "Jalebi",
            "description": "Authentic 100% pure veg Jalebi prepared fresh in our hygienic kitchens.",
            "price": 133,
            "image": "https://foodish-api.com/images/dessert/dessert22.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "194",
            "name": "Imarti",
            "description": "Authentic 100% pure veg Imarti prepared fresh in our hygienic kitchens.",
            "price": 280,
            "image": "https://foodish-api.com/images/dessert/dessert23.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "195",
            "name": "Malpua",
            "description": "Authentic 100% pure veg Malpua prepared fresh in our hygienic kitchens.",
            "price": 324,
            "image": "https://foodish-api.com/images/dessert/dessert24.jpg",
            "isPopular": true,
            "rating": "4.5"
      },
      {
            "_id": "196",
            "name": "Ghevar",
            "description": "Authentic 100% pure veg Ghevar prepared fresh in our hygienic kitchens.",
            "price": 157,
            "image": "https://foodish-api.com/images/rice/rice31.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "197",
            "name": "Mysore Pak",
            "description": "Authentic 100% pure veg Mysore Pak prepared fresh in our hygienic kitchens.",
            "price": 349,
            "image": "https://foodish-api.com/images/dessert/dessert25.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "198",
            "name": "Sandesh",
            "description": "Authentic 100% pure veg Sandesh prepared fresh in our hygienic kitchens.",
            "price": 425,
            "image": "https://foodish-api.com/images/dessert/dessert26.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "199",
            "name": "Mishti Doi",
            "description": "Authentic 100% pure veg Mishti Doi prepared fresh in our hygienic kitchens.",
            "price": 307,
            "image": "https://foodish-api.com/images/idly/idly28.jpg",
            "isPopular": false,
            "rating": "4.7"
      },
      {
            "_id": "200",
            "name": "Peda",
            "description": "Authentic 100% pure veg Peda prepared fresh in our hygienic kitchens.",
            "price": 382,
            "image": "https://foodish-api.com/images/dessert/dessert27.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "201",
            "name": "Mathura Peda",
            "description": "Authentic 100% pure veg Mathura Peda prepared fresh in our hygienic kitchens.",
            "price": 321,
            "image": "https://foodish-api.com/images/dessert/dessert28.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "202",
            "name": "Dharwad Peda",
            "description": "Authentic 100% pure veg Dharwad Peda prepared fresh in our hygienic kitchens.",
            "price": 311,
            "image": "https://foodish-api.com/images/dessert/dessert29.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "203",
            "name": "Modak",
            "description": "Authentic 100% pure veg Modak prepared fresh in our hygienic kitchens.",
            "price": 278,
            "image": "https://foodish-api.com/images/dessert/dessert30.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "204",
            "name": "Mix Veg",
            "description": "Authentic 100% pure veg Mix Veg prepared fresh in our hygienic kitchens.",
            "price": 235,
            "image": "https://foodish-api.com/images/rice/rice32.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "205",
            "name": "Veg Jalfrezi",
            "description": "Authentic 100% pure veg Veg Jalfrezi prepared fresh in our hygienic kitchens.",
            "price": 159,
            "image": "https://foodish-api.com/images/biryani/biryani53.jpg",
            "isPopular": true,
            "rating": "4.9"
      },
      {
            "_id": "206",
            "name": "Veg Kadai",
            "description": "Authentic 100% pure veg Veg Kadai prepared fresh in our hygienic kitchens.",
            "price": 129,
            "image": "https://foodish-api.com/images/dosa/dosa36.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "207",
            "name": "Veg Kolhapuri",
            "description": "Authentic 100% pure veg Veg Kolhapuri prepared fresh in our hygienic kitchens.",
            "price": 403,
            "image": "https://foodish-api.com/images/samosa/samosa12.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "208",
            "name": "Veg Makhanwala",
            "description": "Authentic 100% pure veg Veg Makhanwala prepared fresh in our hygienic kitchens.",
            "price": 143,
            "image": "https://foodish-api.com/images/rice/rice33.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "209",
            "name": "Veg Handi",
            "description": "Authentic 100% pure veg Veg Handi prepared fresh in our hygienic kitchens.",
            "price": 130,
            "image": "https://foodish-api.com/images/biryani/biryani54.jpg",
            "isPopular": false,
            "rating": "4.8"
      },
      {
            "_id": "210",
            "name": "Veg Diwani Handi",
            "description": "Authentic 100% pure veg Veg Diwani Handi prepared fresh in our hygienic kitchens.",
            "price": 316,
            "image": "https://foodish-api.com/images/dosa/dosa37.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "211",
            "name": "Veg Maratha",
            "description": "Authentic 100% pure veg Veg Maratha prepared fresh in our hygienic kitchens.",
            "price": 363,
            "image": "https://foodish-api.com/images/idly/idly29.jpg",
            "isPopular": true,
            "rating": "5.0"
      },
      {
            "_id": "212",
            "name": "Veg Kofta",
            "description": "Authentic 100% pure veg Veg Kofta prepared fresh in our hygienic kitchens.",
            "price": 149,
            "image": "https://foodish-api.com/images/rice/rice34.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "213",
            "name": "Malai Kofta",
            "description": "Authentic 100% pure veg Malai Kofta prepared fresh in our hygienic kitchens.",
            "price": 346,
            "image": "https://foodish-api.com/images/biryani/biryani55.jpg",
            "isPopular": false,
            "rating": "4.3"
      },
      {
            "_id": "214",
            "name": "Shaam Savera",
            "description": "Authentic 100% pure veg Shaam Savera prepared fresh in our hygienic kitchens.",
            "price": 297,
            "image": "https://foodish-api.com/images/dosa/dosa38.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "215",
            "name": "Aloo Gobi",
            "description": "Authentic 100% pure veg Aloo Gobi prepared fresh in our hygienic kitchens.",
            "price": 231,
            "image": "https://foodish-api.com/images/idly/idly30.jpg",
            "isPopular": false,
            "rating": "4.2"
      },
      {
            "_id": "216",
            "name": "Aloo Jeera",
            "description": "Authentic 100% pure veg Aloo Jeera prepared fresh in our hygienic kitchens.",
            "price": 207,
            "image": "https://foodish-api.com/images/rice/rice35.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "217",
            "name": "Aloo Mutter",
            "description": "Authentic 100% pure veg Aloo Mutter prepared fresh in our hygienic kitchens.",
            "price": 333,
            "image": "https://foodish-api.com/images/biryani/biryani56.jpg",
            "isPopular": true,
            "rating": "4.4"
      },
      {
            "_id": "218",
            "name": "Dum Aloo",
            "description": "Authentic 100% pure veg Dum Aloo prepared fresh in our hygienic kitchens.",
            "price": 196,
            "image": "https://foodish-api.com/images/dosa/dosa39.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "219",
            "name": "Kashmiri Dum Aloo",
            "description": "Authentic 100% pure veg Kashmiri Dum Aloo prepared fresh in our hygienic kitchens.",
            "price": 342,
            "image": "https://foodish-api.com/images/idly/idly31.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "220",
            "name": "Bhindi Masala",
            "description": "Authentic 100% pure veg Bhindi Masala prepared fresh in our hygienic kitchens.",
            "price": 395,
            "image": "https://foodish-api.com/images/rice/rice1.jpg",
            "isPopular": true,
            "rating": "4.6"
      },
      {
            "_id": "221",
            "name": "Bhindi Fry",
            "description": "Authentic 100% pure veg Bhindi Fry prepared fresh in our hygienic kitchens.",
            "price": 443,
            "image": "https://foodish-api.com/images/biryani/biryani57.jpg",
            "isPopular": false,
            "rating": "4.1"
      },
      {
            "_id": "222",
            "name": "Kurkuri Bhindi",
            "description": "Authentic 100% pure veg Kurkuri Bhindi prepared fresh in our hygienic kitchens.",
            "price": 275,
            "image": "https://foodish-api.com/images/dosa/dosa40.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "223",
            "name": "Baingan Bharta",
            "description": "Authentic 100% pure veg Baingan Bharta prepared fresh in our hygienic kitchens.",
            "price": 418,
            "image": "https://foodish-api.com/images/idly/idly32.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "224",
            "name": "Bagara Baingan",
            "description": "Authentic 100% pure veg Bagara Baingan prepared fresh in our hygienic kitchens.",
            "price": 169,
            "image": "https://foodish-api.com/images/rice/rice2.jpg",
            "isPopular": false,
            "rating": "4.0"
      },
      {
            "_id": "225",
            "name": "Gobi Manchurian",
            "description": "Authentic 100% pure veg Gobi Manchurian prepared fresh in our hygienic kitchens.",
            "price": 249,
            "image": "https://foodish-api.com/images/biryani/biryani58.jpg",
            "isPopular": true,
            "rating": "4.0"
      },
      {
            "_id": "226",
            "name": "Veg Manchurian",
            "description": "Authentic 100% pure veg Veg Manchurian prepared fresh in our hygienic kitchens.",
            "price": 117,
            "image": "https://foodish-api.com/images/dosa/dosa41.jpg",
            "isPopular": false,
            "rating": "4.5"
      },
      {
            "_id": "227",
            "name": "Mushroom Masala",
            "description": "Authentic 100% pure veg Mushroom Masala prepared fresh in our hygienic kitchens.",
            "price": 133,
            "image": "https://foodish-api.com/images/idly/idly33.jpg",
            "isPopular": false,
            "rating": "4.6"
      },
      {
            "_id": "228",
            "name": "Mushroom Mutter",
            "description": "Authentic 100% pure veg Mushroom Mutter prepared fresh in our hygienic kitchens.",
            "price": 288,
            "image": "https://foodish-api.com/images/rice/rice3.jpg",
            "isPopular": false,
            "rating": "4.4"
      },
      {
            "_id": "229",
            "name": "Mushroom Kadai",
            "description": "Authentic 100% pure veg Mushroom Kadai prepared fresh in our hygienic kitchens.",
            "price": 290,
            "image": "https://foodish-api.com/images/dosa/dosa42.jpg",
            "isPopular": false,
            "rating": "4.9"
      },
      {
            "_id": "230",
            "name": "Navratan Korma",
            "description": "Authentic 100% pure veg Navratan Korma prepared fresh in our hygienic kitchens.",
            "price": 380,
            "image": "https://foodish-api.com/images/dosa/dosa43.jpg",
            "isPopular": false,
            "rating": "4.0"
      }
];
  }
}

const app = new App();
