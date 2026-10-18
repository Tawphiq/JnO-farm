'use strict';

const catalogue = {
  livestock: {
    number: '01', title: 'Livestock rearing', interest: 'Livestock rearing',
    intro: 'Healthy, vaccinated livestock, reared on our integrated farm for meat and breeding stock.',
    groups: [{ title: 'Our livestock', items: ['Pigs', 'Cattle', 'Sheep', 'Goats', 'Rabbits'] }, { title: 'For your table. For your herd.', text: 'Speak with our team about meat animals or breeding stock, current availability, quantities and delivery.' }],
    note: 'Tell us the type of animal, your quantity and whether you need meat or breeding stock.'
  },
  aquaculture: {
    number: '02', title: 'Aquaculture & fish farming', interest: 'Fish farming',
    intro: 'From stocking your pond to supplying your table, explore fish at every stage of growth.',
    groups: [{ title: 'Species', items: ['Tilapia — Akosombo Strain', 'Catfish — African Clarias'] }, { title: 'Growth stages', items: ['Fingerlings', 'Juveniles', 'Table-size'] }],
    note: 'Let us know your preferred species, growth stage, quantity and delivery location.'
  },
  crops: {
    number: '03', title: 'Crops, vegetables & plants', interest: 'Crops, vegetables & plants',
    intro: 'From everyday vegetables to commercial crops and the seedlings for your next season.',
    groups: [{ title: 'Field crops', items: ['Maize', 'Cashew — raw cashew nuts for export', 'Oil palm'] }, { title: 'Fresh vegetables', items: ['Carrots', 'Lettuce', 'Green bell peppers', 'Red bell peppers', 'Yellow bell peppers', 'Orange bell peppers'] }, { title: 'Seedlings & plants', items: ['Oil palm seedlings', 'Cashew seedlings', 'Vegetable seedlings', 'Ornamental plants'] }],
    note: 'Availability varies by crop and season. Contact us for current stock, quantities and prices.'
  },
  feed: {
    number: '04', title: 'J&O Feed — our animal feed mill', interest: 'J&O animal feed',
    intro: 'We mill our own feed, with options for poultry, pigs, cattle, sheep, goats and fish.',
    groups: [{ title: 'Poultry', items: ['Broiler Starter', 'Broiler Finisher', 'Layer Mash', 'Grower'] }, { title: 'Pigs', items: ['Starter', 'Grower', 'Finisher', 'Sow & Weaner'] }, { title: 'Cattle, sheep & goats', items: ['Beef Fattener', 'Dairy Meal', 'Goat & Sheep Feed'] }, { title: 'Fish', items: ['Floating feed for tilapia & catfish', 'Sinking feed for tilapia & catfish'] }, { title: 'Raw materials', items: ['Maize', 'Soya', 'Wheat bran'] }],
    note: 'Tell our team which animals you feed, their growth stage and the quantity you need.'
  },
  fertilizer: {
    number: '05', title: 'Fertilizer, imports & exports', interest: 'Fertilizer, imports & exports',
    intro: 'Genuine fertilizer, directly sourced. Retail and bulk supply from 27 MT to 500 MT, with nationwide delivery. No fake fertilizer.',
    groups: [{ title: 'Urea 46%', text: 'Granular & prilled urea — direct FOB Tianjin.' }, { title: 'NPK — all grades', items: ['15-15-15', '20-10-10', '23-10-5'] }, { title: 'Other fertilizers', items: ['MOP', 'TSP', 'Ammonia sulphate'] }, { title: 'Export produce', items: ['Raw cashew nuts', 'Maize', 'Palm products'] }, { title: 'Retail & bulk enquiries', text: 'Discuss your grade, tonnage, delivery destination and preferred timing directly with our team.' }],
    note: 'Request a quotation for current pricing, stock, order terms and delivery arrangements.'
  },
  consultancy: {
    number: '06', title: 'Agro-consultancy & training', interest: 'Agro-consultancy & training',
    intro: 'Connect with Joseph, Owura and the J&O team to discuss your agricultural goals.',
    groups: [{ title: 'A conversation about your farm', text: 'Tell us what you are working on, the support you need, and your experience so far. Our team will discuss the relevant agro-consultancy or training options with you.' }, { title: 'Planning your enquiry', items: ['Your farming interests', 'Your location', 'Your goals', 'Your preferred timing'] }],
    note: 'Ask our team about available training, consultation arrangements and fees.'
  }
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.division-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.querySelector('#filter-status').textContent = `Showing ${visible} ${visible === 1 ? 'division' : 'divisions'}`;
}));

const dialog = document.querySelector('#division-dialog');
let lastTrigger = null;
function openDivision(key, trigger) {
  const division = catalogue[key];
  if (!division) return;
  lastTrigger = trigger;
  const container = document.querySelector('#dialog-content');
  container.replaceChildren();
  const header = document.createElement('div');
  header.className = 'dialog-header';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = `OUR DIVISIONS / ${division.number}`;
  const title = document.createElement('h2');
  title.id = 'dialog-title';
  title.textContent = division.title;
  const intro = document.createElement('p');
  intro.textContent = division.intro;
  header.append(eyebrow, title, intro);
  const groups = document.createElement('div');
  groups.className = 'dialog-products';
  division.groups.forEach(group => {
    const section = document.createElement('section');
    section.className = 'product-group';
    const heading = document.createElement('h3');
    heading.textContent = group.title;
    section.append(heading);
    if (group.text) {
      const description = document.createElement('p');
      description.textContent = group.text;
      section.append(description);
    }
    if (group.items) {
      const list = document.createElement('ul');
      group.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.append(li);
      });
      section.append(list);
    }
    groups.append(section);
  });
  const footer = document.createElement('div');
  footer.className = 'dialog-footer';
  const note = document.createElement('p');
  note.textContent = division.note;
  const enquire = document.createElement('button');
  enquire.className = 'button';
  enquire.textContent = 'Enquire about this division ↗';
  enquire.addEventListener('click', () => {
    dialog.close();
    document.querySelector('#interest').value = division.interest;
    document.querySelector('#contact').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.querySelector('#name').focus({ preventScroll: true });
  });
  footer.append(note, enquire);
  container.append(header, groups, footer);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-division]').forEach(button => button.addEventListener('click', () => openDivision(button.dataset.division, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastTrigger?.focus({ preventScroll: true });
});

document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const nameInput = form.elements.name;
  const messageInput = form.elements.message;
  for (const input of [nameInput, messageInput]) {
    if (!input.value.trim()) {
      input.setCustomValidity('Please enter a little more information.');
      input.reportValidity();
      input.addEventListener('input', () => input.setCustomValidity(''), { once: true });
      return;
    }
  }
  const message = `Hello J&O Farm Produce!\n\nMy name is ${nameInput.value.trim()}.\nI’m interested in: ${form.elements.interest.value}.\n\n${messageInput.value.trim()}`;
  const url = `https://wa.me/233243503083?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const status = document.querySelector('#form-status');
  status.replaceChildren(document.createTextNode('Your enquiry is ready. If WhatsApp didn’t open, '));
  const fallback = document.createElement('a');
  fallback.href = url;
  fallback.target = '_blank';
  fallback.rel = 'noopener noreferrer';
  fallback.textContent = 'open your message here ↗';
  fallback.style.textDecoration = 'underline';
  status.append(fallback);
  status.hidden = false;
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
