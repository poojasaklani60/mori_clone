const services = [
  {
    id: crypto.randomUUID(),
    title: 'On-demand Plumbing Fix',
    provider: 'Ramesh Plumbing Co.',
    category: 'Home Repair',
    location: 'Lalitpur',
    price: 1800,
    rating: 4.8,
    description: 'Leak repairs, bathroom fittings, and quick emergency visits.'
  },
  {
    id: crypto.randomUUID(),
    title: 'Math Tutor (Grade 8-12)',
    provider: 'Sita Learning Hub',
    category: 'Education',
    location: 'Kathmandu',
    price: 1200,
    rating: 4.9,
    description: 'Personalized classes for school and entrance preparation.'
  },
  {
    id: crypto.randomUUID(),
    title: 'Wedding Photography Package',
    provider: 'Aayush Visuals',
    category: 'Events',
    location: 'Bhaktapur',
    price: 25000,
    rating: 4.7,
    description: 'Full-day wedding and pre-wedding shoots with edited photos.'
  },
  {
    id: crypto.randomUUID(),
    title: 'Deep Home Cleaning',
    provider: 'Sparkle Homes',
    category: 'Cleaning',
    location: 'Patan',
    price: 3200,
    rating: 4.6,
    description: 'Kitchen, bathroom, and sofa cleaning with eco-safe products.'
  }
];

let openRequests = 0;

const elements = {
  serviceGrid: document.getElementById('serviceGrid'),
  searchInput: document.getElementById('searchInput'),
  categoryFilter: document.getElementById('categoryFilter'),
  locationFilter: document.getElementById('locationFilter'),
  sortBy: document.getElementById('sortBy'),
  sellForm: document.getElementById('sellForm'),
  formMessage: document.getElementById('formMessage'),
  activeListings: document.getElementById('activeListings'),
  openRequests: document.getElementById('openRequests')
};

function populateLocationFilter() {
  const locations = ['All', ...new Set(services.map((service) => service.location))].sort();
  elements.locationFilter.innerHTML = locations
    .map((location) => `<option value="${location}">${location}</option>`)
    .join('');
}

function updateStats() {
  elements.activeListings.textContent = services.length;
  elements.openRequests.textContent = openRequests;
}

function renderServices() {
  const query = elements.searchInput.value.toLowerCase().trim();
  const selectedCategory = elements.categoryFilter.value;
  const selectedLocation = elements.locationFilter.value;

  let filtered = services.filter((service) => {
    const matchesQuery = [service.title, service.provider, service.description]
      .join(' ')
      .toLowerCase()
      .includes(query);

    return matchesQuery
      && (selectedCategory === 'All' || service.category === selectedCategory)
      && (selectedLocation === 'All' || service.location === selectedLocation);
  });

  if (elements.sortBy.value === 'price-low') filtered = filtered.sort((a, b) => a.price - b.price);
  if (elements.sortBy.value === 'price-high') filtered = filtered.sort((a, b) => b.price - a.price);
  if (elements.sortBy.value === 'rating') filtered = filtered.sort((a, b) => b.rating - a.rating);

  if (!filtered.length) {
    elements.serviceGrid.innerHTML = '<div class="empty-state">No services match your filters.</div>';
    return;
  }

  elements.serviceGrid.innerHTML = filtered.map((service) => `
    <article class="service-card">
      <span class="service-chip">${service.category}</span>
      <h4>${service.title}</h4>
      <p class="meta">${service.provider} · ${service.location}</p>
      <p class="meta">⭐ ${service.rating.toFixed(1)}</p>
      <p class="meta">${service.description}</p>
      <div class="card-footer">
        <span class="price">NPR ${service.price.toLocaleString()}</span>
        <button class="btn-primary" onclick="requestService('${service.id}')">Request</button>
      </div>
    </article>
  `).join('');
}

function requestService(serviceId) {
  const service = services.find((listing) => listing.id === serviceId);
  if (!service) return;

  openRequests += 1;
  updateStats();
  elements.formMessage.textContent = `Request sent to ${service.provider}.`;
}

function handleSellSubmit(event) {
  event.preventDefault();

  const listing = {
    id: crypto.randomUUID(),
    title: document.getElementById('title').value.trim(),
    provider: document.getElementById('provider').value.trim(),
    category: document.getElementById('category').value,
    location: document.getElementById('location').value.trim(),
    price: Number(document.getElementById('price').value),
    rating: 5.0,
    description: document.getElementById('description').value.trim()
  };

  services.unshift(listing);
  elements.sellForm.reset();
  elements.formMessage.textContent = `Published: "${listing.title}"`;

  populateLocationFilter();
  updateStats();
  renderServices();
}

function wireTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const screens = document.querySelectorAll('.tab-screen');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      tabButtons.forEach((tab) => tab.classList.remove('active'));
      screens.forEach((screen) => screen.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

window.requestService = requestService;

[elements.searchInput, elements.categoryFilter, elements.locationFilter, elements.sortBy].forEach((control) => {
  control.addEventListener('input', renderServices);
  control.addEventListener('change', renderServices);
});

elements.sellForm.addEventListener('submit', handleSellSubmit);

wireTabs();
populateLocationFilter();
updateStats();
renderServices();
