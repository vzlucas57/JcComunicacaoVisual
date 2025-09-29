document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('#sobre, #servicos, #contato');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('nav');
  const mainContent = document.querySelector('.main-content');

  const adjustLayout = () => {
    const headerHeight = header ? header.offsetHeight : 0;
    const activationOffset = headerHeight + 10;

    if (mainContent) {
      mainContent.style.paddingTop = `${headerHeight}px`;
    }

    return { headerHeight, activationOffset };
  };

  let { headerHeight, activationOffset } = adjustLayout();

  window.addEventListener('resize', () => {
    const newAdjustments = adjustLayout();
    headerHeight = newAdjustments.headerHeight;
    activationOffset = newAdjustments.activationOffset;
  });


  const activateLink = (id) => {
    const targetHref = id === 'galeria.html' ? id : `#${id}`;

    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');

      if (linkHref === targetHref || linkHref === id) {
        link.classList.add('active');
      }
    });
  };

  const handleScrollSpy = () => {
    let currentSectionId = 'sobre';
    const scrollY = window.scrollY;

    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = documentHeight - viewportHeight;

    if (maxScroll > 0 && (scrollY >= maxScroll - 50)) {
      currentSectionId = 'contato';
      activateLink(currentSectionId);
      return;
    }

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();

      if (rect.top <= activationOffset) {
        currentSectionId = section.id;
        break;
      }
    }

    if (scrollY < 5) {
      currentSectionId = 'sobre';
    }

    activateLink(currentSectionId);
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (!href.startsWith('#') || href === 'galeria.html') {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const { headerHeight } = adjustLayout();

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });

        activateLink(targetId);
      }
    });
  });

  window.addEventListener('scroll', handleScrollSpy);
  handleScrollSpy();
});
