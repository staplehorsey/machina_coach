// Simple accordion toggle (replacing Bootstrap)

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const collapsed = btn.classList.toggle('collapsed');
      const collapseDiv = btn.parentElement.nextElementSibling;
      if (collapseDiv && collapseDiv.classList.contains('accordion-collapse')) {
        collapseDiv.style.display = collapsed ? 'none' : 'block';
      }
    });
  });
});
