// Enhanced Earnings Calculator with Lifestyle Visualization

document.addEventListener('DOMContentLoaded', () => {
  const hoursSlider = document.getElementById('hours');
  const rateSlider = document.getElementById('rate');
  const rateNum = document.getElementById('rateNum');
  const hoursVal = document.getElementById('hoursVal');
  const incomeEl = document.getElementById('income');
  const lifestyleEl = document.getElementById('lifestyle');
  const SESSION_MIN = 45;
  const MACHINA_CUT = 0.3;

  // Lifestyle data with costs and items - Updated with vibrant Partiful-inspired design
  const lifestyles = {
    pocket: {
      title: '✨ Side Hustle Vibes',
      subtitle: 'Perfect starter income (~4 hrs/week)',
      items: [
        { icon: '📱', text: 'Phone & streaming subscriptions', cost: 80 },
        { icon: '☕', text: 'Daily coffee & treats', cost: 120 },
        { icon: '🛍️', text: 'Shopping sprees & clothes', cost: 200 },
        { icon: '🍽️', text: 'Nice dinners & date nights', cost: 300 },
        { icon: '🎮', text: 'Gaming & entertainment', cost: 150 },
        { icon: '✈️', text: 'Weekend getaway fund', cost: 250 }
      ],
      color: 'from-pink-400 via-purple-500 to-indigo-500',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-purple-50'
    },
    nomad: {
      title: '🌴 Digital Nomad Dreams',
      subtitle: 'Live your best life anywhere (~12 hrs/week)',
      items: [
        { icon: '🏖️', text: 'Beachfront villa in Bali', cost: 800 },
        { icon: '🍜', text: 'Amazing street food daily', cost: 300 },
        { icon: '🏍️', text: 'Scooter adventures', cost: 150 },
        { icon: '✈️', text: 'Flights to new destinations', cost: 400 },
        { icon: '💻', text: 'Co-working & wifi', cost: 100 },
        { icon: '🧘', text: 'Yoga & wellness retreats', cost: 200 },
        { icon: '📱', text: 'Global connectivity', cost: 100 },
        { icon: '🎒', text: 'Travel gear & experiences', cost: 300 }
      ],
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      bgPattern: 'bg-gradient-to-br from-cyan-50 to-blue-50'
    },
    career: {
      title: '🚀 Boss Mode Activated',
      subtitle: 'Building your empire (~30+ hrs/week)',
      items: [
        { icon: '🏠', text: 'Dream apartment/house', cost: 2000 },
        { icon: '👶', text: 'Family & future planning', cost: 1500 },
        { icon: '💰', text: 'Investment & savings', cost: 1000 },
        { icon: '🎓', text: 'Skills & certifications', cost: 300 },
        { icon: '🚗', text: 'Nice car payment', cost: 500 },
        { icon: '🏥', text: 'Premium health coverage', cost: 400 },
        { icon: '✈️', text: 'Family vacation fund', cost: 600 },
        { icon: '📱', text: 'All the tech & subscriptions', cost: 120 }
      ],
      color: 'from-emerald-400 via-teal-500 to-green-600',
      bgPattern: 'bg-gradient-to-br from-emerald-50 to-teal-50'
    }
  };

  function formatCurrency(n) {
    return `$${n.toLocaleString()}`;
  }

  function getLifestyleCategory(monthlyNet) {
    // Calculate remaining budget for each lifestyle
    const pocketCost = lifestyles.pocket.items.reduce((sum, item) => sum + item.cost, 0);
    const nomadCost = lifestyles.nomad.items.reduce((sum, item) => sum + item.cost, 0);
    const careerCost = lifestyles.career.items.reduce((sum, item) => sum + item.cost, 0);
    
    const pocketRemaining = monthlyNet - pocketCost;
    const nomadRemaining = monthlyNet - nomadCost;
    const careerRemaining = monthlyNet - careerCost;
    
    // If you can afford career lifestyle with reasonable buffer, show career
    if (careerRemaining >= 500) return 'career';
    
    // If you can afford nomad lifestyle with small buffer (~$100), show nomad
    if (nomadRemaining >= 100) return 'nomad';
    
    // Otherwise show pocket money
    return 'pocket';
  }

  function createLifestyleCard(lifestyle, monthlyNet) {
    const totalCost = lifestyle.items.reduce((sum, item) => sum + item.cost, 0);
    const remaining = monthlyNet - totalCost;
    
    return `
      <div class="lifestyle-card active bg-gradient-to-br ${lifestyle.color} text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 sm:border-4 border-white/20 backdrop-blur-sm transition-all duration-300 w-full mx-auto sm:max-w-md md:max-w-none">
        <!-- Header with floating elements -->
        <div class="relative text-center mb-8">
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
          <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" style="animation-delay: 1s"></div>
          <h3 class="text-2xl sm:text-3xl font-black mb-3 drop-shadow-lg">${lifestyle.title}</h3>
          <p class="text-base sm:text-lg opacity-90 font-medium">${lifestyle.subtitle}</p>
          <div class="mt-6 relative">
            <div class="text-4xl sm:text-5xl font-black drop-shadow-xl">${formatCurrency(monthlyNet)}</div>
            <div class="text-base sm:text-lg font-bold opacity-80">/month</div>
            <div class="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
          </div>
        </div>
        
        <!-- Lifestyle items with enhanced styling -->
        <div class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          ${lifestyle.items.map((item, index) => `
            <div class="lifestyle-item flex justify-between items-center bg-white/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-200" style="animation-delay: ${index * 0.1}s">
              <span class="flex items-center">
                <span class="text-xl sm:text-2xl mr-3 sm:mr-4 drop-shadow-sm">${item.icon}</span>
                <span class="font-semibold text-base sm:text-lg">${item.text}</span>
              </span>
              <span class="font-black text-sm sm:text-lg bg-white/20 px-2 sm:px-3 py-1 rounded-full">${formatCurrency(item.cost)}</span>
            </div>
          `).join('')}
        </div>
        
        <!-- Footer with enhanced styling -->
        <div class="relative border-t-2 border-white/30 pt-5 sm:pt-6 text-center">
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/40 rounded-full"></div>
          <div class="text-lg sm:text-xl font-black drop-shadow-lg">
            ${remaining > 0 ? 
              `🎉 ${formatCurrency(remaining)} left for spontaneous fun!` : 
              `🎯 Perfect lifestyle match - living your best life!`
            }
          </div>
          ${remaining > 0 ? 
            `<div class="mt-2 text-xs sm:text-sm md:text-base opacity-80 font-medium">Time to treat yourself! 💅</div>` : 
            `<div class="mt-2 text-xs sm:text-sm md:text-base opacity-80 font-medium">You're absolutely crushing it! 🔥</div>`
          }
        </div>
      </div>
    `;
  }

  function update() {
    const hours = parseInt(hoursSlider.value, 10);
    const rate = parseInt(rateSlider.value, 10);
    const sessionsPerWeek = hours * (60 / SESSION_MIN);
    const monthlyGross = sessionsPerWeek * rate * 4; // 4 weeks per month
    const monthlyNet = monthlyGross * (1 - MACHINA_CUT);

    hoursVal.textContent = hours;
    incomeEl.textContent = formatCurrency(Math.round(monthlyNet));

    // Update lifestyle visualization
    const category = getLifestyleCategory(monthlyNet);
    const lifestyle = lifestyles[category];
    
    lifestyleEl.innerHTML = createLifestyleCard(lifestyle, Math.round(monthlyNet));
    
    // Add animation
    lifestyleEl.querySelector('.lifestyle-card').classList.add('animate-fade-in-up');
  }

  hoursSlider.addEventListener('input', update);
  rateSlider.addEventListener('input', () => {
    rateNum.value = rateSlider.value;
    update();
  });
  rateNum.addEventListener('input', () => {
    let v = parseInt(rateNum.value || 0, 10);
    if (v < 40) v = 40; if (v > 200) v = 200;
    rateSlider.value = v;
    update();
  });
  update();
});
