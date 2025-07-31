// Waitlist form handler
// Reusable for client and guide forms

document.addEventListener('DOMContentLoaded', () => {
  const ENDPOINT = 'https://msainz.app.n8n.cloud/webhook/machina_waitlist';

  function attach(formId, userType) {
    const form = document.getElementById(formId);
    if (!form) return;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const successDiv = document.getElementById(`waitlist-success-${userType}`);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;

      // Indicate processing
      submitButton.disabled = true;
      submitButton.innerHTML = 'Joining...';

      try {
        await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            user_type: userType,
            date_added: new Date().toISOString(),
          }),
        });

        // Success state
        emailInput.disabled = true;
        submitButton.innerHTML = '✓ You\'re on the list!';
        // The 'hidden' class is used in the HTML, not 'd-none'
        if (successDiv) {
          successDiv.classList.remove('hidden');
        }

      } catch (err) {
        // Error state
        alert('Sorry, something went wrong. Please try again later.');
        console.error(err);
        submitButton.disabled = false;
        submitButton.innerHTML = 'Join Waitlist';
      }
    });
  }

  attach('waitlist-form-client', 'client');
  attach('waitlist-form-guide', 'guide');
});
