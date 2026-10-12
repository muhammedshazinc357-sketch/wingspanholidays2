const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.destination-card').forEach(card => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

document.querySelectorAll('.package-link').forEach(link => {
  link.addEventListener('click', () => {
    const destination = link.dataset.package;
    document.getElementById('destination').value = destination;
  });
});

document.querySelectorAll('.service-link').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    const field = document.getElementById('requirements');
    field.value = `I'm interested in ${service.toLowerCase()}. `;
  });
});

document.getElementById('enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const destination = document.getElementById('destination').value;
  const travellers = document.getElementById('travellers').value;
  const date = document.getElementById('travelDate').value || 'Not decided';
  const requirements = document.getElementById('requirements').value.trim() || 'No additional details';
  if (!name || !destination) {
    alert('Please enter your name and choose a destination.');
    return;
  }
  const message = [
    'Hello WINGSPAN HOLIDAYS!',
    '',
    'I would like to enquire about a trip.',
    `Name: ${name}`,
    `Destination: ${destination}`,
    `Travellers: ${travellers}`,
    `Preferred date: ${date}`,
    `Additional details: ${requirements}`
  ].join('\n');
  window.open(`https://wa.me/918136834678?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
