document.addEventListener('DOMContentLoaded', () => {
  /* === 1. FITUR LIVE SEARCH SMOOTH === */
  const searchForm = document.querySelector('#header .search form');
  const searchInput = document.getElementById('kata-kunci');
  const brandSections = document.querySelectorAll('main section[id]');
  const heroBanner = document.querySelector('.hero-banner');

  const noResultMsg = document.createElement('p');
  noResultMsg.textContent = 'Laptop yang Anda cari tidak ditemukan.';
  noResultMsg.style.cssText = 'text-align: center; padding: 0 20px; font-size: 16px; color: #64748b; opacity: 0; max-height: 0; overflow: hidden; transition: opacity 0.5s ease, max-height 0.5s ease, padding 0.5s ease;';
  document.querySelector('main').appendChild(noResultMsg);

  let typingTimer;

  function filterLaptops() {
    const keyword = searchInput.value.toLowerCase().trim();
    let totalVisibleCards = 0;

    if (heroBanner) {
      if (keyword) {
        heroBanner.classList.add('banner-collapsed');
      } else {
        heroBanner.classList.remove('banner-collapsed');
      }
    }

    brandSections.forEach(section => {
      const cards = section.querySelectorAll('.slider nav > div');
      const scrollButtons = section.querySelectorAll('.scroll-btn');
      let visibleInSection = 0;

      cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const isMatch = cardText.includes(keyword);

        if (isMatch) {
          visibleInSection++;
          totalVisibleCards++;
          card.classList.remove('card-collapsed');
        } else {
          card.classList.remove('active');
          card.classList.add('card-collapsed');
        }
      });

      if (visibleInSection === 0) {
        section.classList.add('section-collapsed');
      } else {
        section.classList.remove('section-collapsed');
        scrollButtons.forEach(btn => {
          btn.style.display = (keyword && visibleInSection <= 3) ? 'none' : '';
        });
      }
    });

    if (totalVisibleCards === 0) {
      noResultMsg.style.maxHeight = '120px';
      noResultMsg.style.padding = '40px 20px';
      noResultMsg.style.opacity = '1';
    } else {
      noResultMsg.style.opacity = '0';
      noResultMsg.style.maxHeight = '0';
      noResultMsg.style.padding = '0 20px';
    }
  }

  searchInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(filterLaptops, 200);
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(typingTimer);
    filterLaptops();
  });

  document.querySelectorAll('.scroll-btn').forEach(button => {
    button.addEventListener('click', () => {
      const section = button.closest('section');
      const nav = section.querySelector('nav');
      const step = 260;
      nav.scrollBy({
        left: button.classList.contains('prev') ? -step : step,
        behavior: 'smooth'
      });
    });
  });

  const productCards = document.querySelectorAll('.slider nav > div');

  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!card.querySelector('.specs')) return;

      e.preventDefault();
      const isAlreadyActive = card.classList.contains('active');

      productCards.forEach(c => c.classList.remove('active'));

      if (!isAlreadyActive) {
        card.classList.add('active');
        setTimeout(() => {
          card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }, 250);
      }
    });
  });
});
