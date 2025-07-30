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

  // Lifestyle data with costs and items
  const lifestyles = {
    pocket: {
      title: '💰 Some Pocket Money',
      subtitle: 'Perfect for side income (~12 hrs/week)',
      items: [
        { icon: '📱', text: 'Phone bill', cost: 80 },
        { icon: '☕', text: 'Daily coffee treats', cost: 120 },
        { icon: '💄', text: 'Beauty & self-care', cost: 150 },
        { icon: '🛍️', text: 'Shopping & clothes', cost: 200 },
        { icon: '🍽️', text: 'Nice dinners out', cost: 300 },
        { icon: '✈️', text: 'Weekend getaway fund', cost: 250 }
      ],
      color: 'from-pink-400 to-purple-500'
    },
    nomad: {
      title: '🌴 Digital Nomad Life',
      subtitle: 'Live & work anywhere (~20 hrs/week)',
      items: [
        { icon: '📱', text: 'International phone plan', cost: 100 },
        { icon: '🏠', text: 'Beautiful Bali villa (monthly)', cost: 800 },
        { icon: '🍜', text: 'Amazing local food daily', cost: 300 },
        { icon: '🏍️', text: 'Scooter rental & adventures', cost: 150 },
        { icon: '✈️', text: 'Flight to next destination', cost: 400 },
        { icon: '💻', text: 'Co-working space membership', cost: 100 },
        { icon: '🧘', text: 'Yoga classes & wellness', cost: 200 },
        { icon: '👗', text: 'Tropical wardrobe refresh', cost: 300 }
      ],
      color: 'from-cyan-400 to-blue-500'
    },
    career: {
      title: '🚀 Career Builder',
      subtitle: 'Build your future (~30+ hrs/week)',
      items: [
        { icon: '📱', text: 'Phone & internet bills', cost: 120 },
        { icon: '🏠', text: 'Nice apartment rent', cost: 2000 },
        { icon: '🍼', text: 'Family expenses', cost: 1500 },
        { icon: '💰', text: 'Monthly savings', cost: 1000 },
        { icon: '🎓', text: 'Professional development', cost: 300 },
        { icon: '🚗', text: 'Car payment', cost: 500 },
        { icon: '🏥', text: 'Health & insurance', cost: 400 },
        { icon: '✈️', text: 'Family vacation fund', cost: 600 }
      ],
      color: 'from-emerald-400 to-teal-500'
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
      <div class="lifestyle-card active bg-gradient-to-br ${lifestyle.color} text-white rounded-2xl p-6 shadow-2xl">
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold mb-2">${lifestyle.title}</h3>
          <p class="text-lg opacity-90">${lifestyle.subtitle}</p>
          <div class="mt-4 text-3xl font-bold">${formatCurrency(monthlyNet)}/month</div>
        </div>
        
        <div class="space-y-3 mb-6">
          ${lifestyle.items.map(item => `
            <div class="lifestyle-item flex justify-between items-center bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
              <span class="flex items-center">
                <span class="text-xl mr-3">${item.icon}</span>
                <span class="font-medium">${item.text}</span>
              </span>
              <span class="font-bold">${formatCurrency(item.cost)}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="border-t border-white border-opacity-30 pt-4 text-center">
          <div class="text-lg font-semibold">
            ${remaining > 0 ? 
              `💸 ${formatCurrency(remaining)} left for more fun!` : 
              `🎯 Perfect lifestyle match!`
            }
          </div>
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
