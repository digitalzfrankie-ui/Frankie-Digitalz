(function(){
  'use strict';
  let _animationsPaused = false;
  document.addEventListener('visibilitychange', () => {
    _animationsPaused = document.hidden;
    document.querySelectorAll('.animate-marquee-left, .animate-marquee-right').forEach(el => {
      el.style.animationPlayState = _animationsPaused ? 'paused' : (el.classList.contains('marquee-running') ? 'running' : 'paused');
    });
  });
  function sanitizeText(str) { if (typeof str !== 'string') return ''; const div = document.createElement('div'); div.textContent = str; return div.innerHTML; }
  function sanitizeUrl(url) { if (typeof url !== 'string') return '#'; try { const u = new URL(url, location.href); if (!['http:', 'https:', 'data:'].includes(u.protocol)) return '#'; return u.href; } catch (_) { return '#'; } }
  function showNewsletterError(msg) { const errEl = document.getElementById('newsletterError'); if (!errEl) return; errEl.textContent = msg; errEl.classList.remove('hidden'); }
  function clearNewsletterError() { const errEl = document.getElementById('newsletterError'); if (!errEl) return; errEl.textContent = ''; errEl.classList.add('hidden'); }
  const nav = document.getElementById('main-nav'); if (nav) { nav.style.transform = 'translateY(0)'; nav.style.opacity = '1'; }
  startNavbarAnimations();
  resetAndPlayHeroIntro();
  resetAndPlayEdgeTrace();
  initMobileMenu();
  initBackToTop();
  initTestimonials();
  initFAQ();
  initTabs();
  initNewsletter();
  initSupportBadge();
  initFooterReveal();
  initFadeSections();
  initStatsObserver();
  function startNavbarAnimations() {
    let logoIntervalId = null, brandSwapIntervalId = null;
    setTimeout(() => {
      const logo = document.getElementById('nav-logo'); if (!logo) return;
      const animateLogo = () => { if (_animationsPaused) return; logo.style.fill = '#d3d3d3'; setTimeout(() => { logo.style.transform = 'scale(1.1)'; logo.classList.add('shake-animation'); setTimeout(() => { logo.style.fill = '#14b8a6'; setTimeout(() => { logo.style.transform = 'scale(1)'; logo.classList.remove('shake-animation'); }, 2000); }, 2000); }, 2000); };
      animateLogo(); logoIntervalId = setInterval(animateLogo, 10000);
      document.addEventListener('visibilitychange', () => { if (document.hidden) { clearInterval(logoIntervalId); clearInterval(brandSwapIntervalId); } else { logoIntervalId = setInterval(animateLogo, 10000); if (first && second) brandSwapIntervalId = setInterval(swapBrandColors, 5000); } });
    }, 3000);
    const first = document.getElementById('nav-brand-first'), second = document.getElementById('nav-brand-second');
    let swapBrandColors; if (first && second) { first.style.transition = 'color 0.5s ease'; second.style.transition = 'color 0.5s ease'; let brandSwapState = false; swapBrandColors = () => { if (_animationsPaused) return; brandSwapState = !brandSwapState; first.style.color = brandSwapState ? '#14b8a6' : '#d3d3d3'; second.style.color = brandSwapState ? '#d3d3d3' : '#14b8a6'; }; brandSwapIntervalId = setInterval(swapBrandColors, 5000); }
  }
  function resetAndPlayHeroIntro() {
    const welcomeStatic = document.getElementById('welcomeStatic'), container = document.getElementById('typedLettersContainer'), tagline = document.getElementById('tagline');
    if (welcomeStatic) welcomeStatic.style.opacity = '0'; if (tagline) tagline.style.opacity = '0'; if (container) container.innerHTML = '';
    setTimeout(() => { if (welcomeStatic) welcomeStatic.style.opacity = '1'; }, 500);
    setTimeout(() => { if (!container) return; const fullName = 'Frankie Digitalz'; container.innerHTML = ''; for (let i = 0; i < fullName.length; i++) { const span = document.createElement('span'); span.textContent = fullName[i]; span.className = 'letter-animation'; if (fullName[i] === ' ') span.style.marginRight = '0.25em'; container.appendChild(span); } container.querySelectorAll('.letter-animation').forEach((letter, idx) => { setTimeout(() => letter.classList.add('letter-visible'), idx * 50); }); }, 1000);
    const animDelay = 1000 + ('Frankie Digitalz'.length * 50) + 200; setTimeout(() => { if (tagline) tagline.style.opacity = '1'; }, animDelay);
    const heading = document.querySelector('.liquid-focus'), revealItems = document.querySelectorAll('.reveal-slow');
    if (heading) { heading.classList.remove('is-active'); setTimeout(() => heading.classList.add('is-active'), 100); }
    revealItems.forEach(el => { el.classList.remove('is-active'); setTimeout(() => el.classList.add('is-active'), 150); });
  }
  function resetAndPlayEdgeTrace() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animateTrace = (path, duration) => { if (!path) return; const length = path.getTotalLength(); path.style.transition = 'none'; path.style.strokeDasharray = length; path.style.strokeDashoffset = length; path.getBoundingClientRect(); path.style.transition = `stroke-dashoffset ${duration}ms linear`; path.style.strokeDashoffset = '0'; const parentContainer = path.closest('.relative'); if (parentContainer) { setTimeout(() => { parentContainer.classList.add('glow-active'); setTimeout(() => parentContainer.classList.remove('glow-active'), 3000); }, duration); } };
    animateTrace(document.getElementById('wavyPathDesktop'), 3000); animateTrace(document.getElementById('wavyPathMobile'), 3000);
  }
  const heroSection = document.querySelector('section.min-h-screen'); if (heroSection) { new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { resetAndPlayHeroIntro(); resetAndPlayEdgeTrace(); } }); }, { threshold: 0.3 }).observe(heroSection); }
  function initMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn'), mobileMenu = document.getElementById('mobileMenu');
    if (!mobileBtn || !mobileMenu) return;
    function closeMobileMenu() { if (mobileMenu.classList.contains('hidden')) return; mobileMenu.classList.add('hidden'); mobileBtn.setAttribute('aria-expanded', 'false'); mobileBtn.focus(); }
    mobileBtn.addEventListener('click', () => { const isHidden = mobileMenu.classList.toggle('hidden'); const isOpen = !isHidden; mobileBtn.setAttribute('aria-expanded', String(isOpen)); if (isOpen) { requestAnimationFrame(() => { const firstLink = mobileMenu.querySelector('a, button'); if (firstLink) firstLink.focus(); }); } else { mobileBtn.focus(); } });
    mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', closeMobileMenu); });
    document.addEventListener('click', (event) => { if (!mobileMenu.classList.contains('hidden') && !mobileBtn.contains(event.target) && !mobileMenu.contains(event.target)) closeMobileMenu(); });
    window.addEventListener('scroll', () => { if (!mobileMenu.classList.contains('hidden')) closeMobileMenu(); }, { passive: true });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) closeMobileMenu(); });
  }
  function initBackToTop() {
    const backBtn = document.getElementById('backToTopBtn'); if (!backBtn) return;
    const checkBackToTop = () => { const scrolled = window.scrollY > 300; backBtn.classList.toggle('opacity-100', scrolled); backBtn.classList.toggle('opacity-0', !scrolled); backBtn.classList.toggle('visible', scrolled); backBtn.classList.toggle('invisible', !scrolled); backBtn.setAttribute('tabindex', scrolled ? '0' : '-1'); };
    window.addEventListener('scroll', checkBackToTop, { passive: true }); checkBackToTop();
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  function initTestimonials() {
    const trackTest = document.getElementById('testimonialTrack'), dotButtons = document.querySelectorAll('#testimonialDots .dot-btn'), announceEl = document.getElementById('testimonialAnnounce'), slides = trackTest ? Array.from(trackTest.children) : [];
    if (!slides.length) return;
    const slideLabels = ['Testimonial from luxury skincare brand founder, rated 4.8 out of 5', 'Testimonial from e-commerce fashion retailer director, rated 5 out of 5'];
    let currentSlide = 0, testInterval;
    function updateTestimonial() { if (trackTest) trackTest.style.transform = `translateX(-${currentSlide * 100}%)`; dotButtons.forEach((dot, idx) => { const indicator = dot.querySelector('.dot-indicator'); if (indicator) { indicator.style.backgroundColor = idx === currentSlide ? '#14b8a6' : 'rgba(0,0,0,0.3)'; indicator.style.transform = idx === currentSlide ? 'scale(1.25)' : 'scale(1)'; } dot.setAttribute('aria-selected', idx === currentSlide ? 'true' : 'false'); }); if (announceEl) { announceEl.textContent = ''; requestAnimationFrame(() => { announceEl.textContent = slideLabels[currentSlide] || `Slide ${currentSlide + 1} of ${slides.length}`; }); } }
    function nextTest() { if (_animationsPaused) return; currentSlide = (currentSlide + 1) % slides.length; updateTestimonial(); }
    updateTestimonial(); testInterval = setInterval(nextTest, 5000);
    const carouselContainer = document.getElementById('testimonialCarousel');
    if (carouselContainer) { carouselContainer.addEventListener('mouseenter', () => clearInterval(testInterval)); carouselContainer.addEventListener('mouseleave', () => { testInterval = setInterval(nextTest, 5000); }); carouselContainer.addEventListener('focusin', () => clearInterval(testInterval)); carouselContainer.addEventListener('focusout', () => { testInterval = setInterval(nextTest, 5000); }); }
    document.getElementById('prevTestimonial')?.addEventListener('click', () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateTestimonial(); });
    document.getElementById('nextTestimonial')?.addEventListener('click', () => { currentSlide = (currentSlide + 1) % slides.length; updateTestimonial(); });
    dotButtons.forEach((dot, idx) => { dot.addEventListener('click', () => { currentSlide = idx; updateTestimonial(); }); });
  }
  function initFAQ() { document.querySelectorAll('.faq-q').forEach(btn => { btn.setAttribute('aria-expanded', 'false'); btn.addEventListener('click', () => { const answer = document.getElementById(btn.getAttribute('aria-controls')); if (!answer) return; const expanded = !answer.classList.contains('hidden'); answer.classList.toggle('hidden'); btn.setAttribute('aria-expanded', String(!expanded)); const icon = btn.querySelector('svg'); if (icon) icon.classList.toggle('rotate-180'); }); }); }
  function initTabs() {
    const tabData = { approach: { heading:'Human-Centered Design', desc:'We put your users first. Every decision is made with your audience in mind.', items:['User Research','Empathy Mapping','Journey Mapping','Usability Testing'] }, process: { heading:'Agile Development Process', desc:'We work in sprints, delivering value early and often.', items:['Discovery','Design','Development','Launch & Support'] }, results: { heading:'Measurable Business Results', desc:'Our work is driven by KPIs.', items:['+57% Avg Conversion','40% Faster Load Times','3x Engagement','98% Client Retention'] }, promise: { heading:'Our Promise to You', desc:'Transparency, on-time delivery, and a partnership beyond the project.', items:['100% Transparency','Dedicated Support','No Hidden Fees','Lifetime Warranty'] } };
    const TAB_ORDER = ['approach','process','results','promise'];
    function setTab(tabId) { const data = tabData[tabId]; if (!data) return; const tabContent = document.getElementById('tabContent'); if (!tabContent) return; tabContent.innerHTML = `<h3 class="text-2xl md:text-4xl font-black text-white mb-6">${data.heading}</h3><p class="text-white/70 text-lg mb-8 leading-relaxed">${data.desc}</p><ul class="space-y-4">${data.items.map(i => `<li class="flex items-center gap-4 text-white"><svg aria-hidden="true" class="w-6 h-6 text-[#14b8a6]" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>${i}</li>`).join('')}</ul>`; tabContent.setAttribute('aria-labelledby', 'tab-btn-' + tabId); document.querySelectorAll('[data-tab]').forEach(btn => { const isActive = btn.dataset.tab === tabId; btn.classList.toggle('bg-[#14b8a6]', isActive); btn.classList.toggle('text-black', isActive); btn.classList.toggle('bg-white', !isActive); btn.setAttribute('aria-selected', String(isActive)); }); }
    document.querySelectorAll('[data-tab]').forEach(btn => { btn.addEventListener('click', () => setTab(btn.dataset.tab)); btn.addEventListener('keydown', (e) => { const currentIdx = TAB_ORDER.indexOf(btn.dataset.tab); let targetIdx = -1; if (e.key === 'ArrowRight') { e.preventDefault(); targetIdx = (currentIdx + 1) % TAB_ORDER.length; } if (e.key === 'ArrowLeft') { e.preventDefault(); targetIdx = (currentIdx - 1 + TAB_ORDER.length) % TAB_ORDER.length; } if (e.key === 'Home') { e.preventDefault(); targetIdx = 0; } if (e.key === 'End') { e.preventDefault(); targetIdx = TAB_ORDER.length - 1; } if (targetIdx >= 0) { const targetBtn = document.getElementById('tab-btn-' + TAB_ORDER[targetIdx]); if (targetBtn) { targetBtn.focus(); setTab(TAB_ORDER[targetIdx]); } } }); });
    setTab('approach');
  }
  function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm'), newsletterFormContainer = document.getElementById('newsletterFormContainer'), newsletterThankYou = document.getElementById('newsletterThankYou'), newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');
    if (newsletterForm) { newsletterForm.addEventListener('submit', async (e) => { e.preventDefault(); clearNewsletterError(); const nameEl = document.getElementById('newsletterName'), emailEl = document.getElementById('newsletterEmail'); const email = emailEl.value.trim(); const name = nameEl ? nameEl.value.trim() : ''; if (!email) { showNewsletterError('Please enter your email address.'); emailEl.focus(); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showNewsletterError('Please enter a valid email address.'); emailEl.focus(); return; } newsletterSubmitBtn.disabled = true; newsletterSubmitBtn.innerHTML = 'Sending… <span class="inline-block animate-pulse">●</span>'; const controller = new AbortController(); const timeoutId = setTimeout(() => controller.abort(), 30000); const formData = new FormData(); formData.append('_subject', 'Newsletter Signup - Frankie Digitalz'); formData.append('name', name); formData.append('email', email); try { const response = await fetch('https://formspree.io/f/mvzwezoe', { method: 'POST', body: formData, headers: { 'Accept': 'application/json' }, signal: controller.signal }); clearTimeout(timeoutId); if (response.ok) { newsletterFormContainer.style.display = 'none'; newsletterThankYou.style.display = 'block'; nameEl.value = ''; emailEl.value = ''; } else { showNewsletterError('Something went wrong. Please try again later.'); } } catch (err) { clearTimeout(timeoutId); if (err.name === 'AbortError') { showNewsletterError('Request timed out. Please try again.'); } else { showNewsletterError('Network error. Please check your connection and try again.'); } } finally { newsletterSubmitBtn.disabled = false; newsletterSubmitBtn.innerHTML = 'Subscribe →'; } }); }
    document.getElementById('newsletterBackBtn')?.addEventListener('click', () => { if (newsletterFormContainer) newsletterFormContainer.style.display = 'block'; if (newsletterThankYou) newsletterThankYou.style.display = 'none'; clearNewsletterError(); const nameEl = document.getElementById('newsletterName'), emailEl = document.getElementById('newsletterEmail'); if (nameEl) nameEl.value = ''; if (emailEl) emailEl.value = ''; });
  }
  function initSupportBadge() {
    const supportTextSpan = document.getElementById('supportText'), badge = document.getElementById('supportBadge');
    if (!badge || !supportTextSpan) return;
    const showBadge = () => { if (_animationsPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; supportTextSpan.style.maxWidth = '200px'; supportTextSpan.style.opacity = '1'; badge.classList.add('badge-trace'); setTimeout(() => { badge.classList.remove('badge-trace'); supportTextSpan.style.maxWidth = '0px'; supportTextSpan.style.opacity = '0'; }, 1800); };
    setTimeout(showBadge, 5000); setInterval(showBadge, 30000);
  }
  function initFooterReveal() { const footer = document.querySelector('footer'); if (footer) { new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }); }, { threshold: 0.1 }).observe(footer); } }
  function initStatsObserver() { let statsAnimationPlayed = false; const statsSection = document.getElementById('statsSection'); if (statsSection) { new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting && !statsAnimationPlayed) { statsAnimationPlayed = true; statsSection.classList.add('is-visible'); initStats(); } }); }, { threshold: 0.2 }).observe(statsSection); } }
  function initFadeSections() {
    document.querySelectorAll('.fade-section:not(#statsSection)').forEach(section => {
      const inner = section.querySelector('.fade-inner'); if (!inner) return;
      let fadeTimeout = null;
      new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add('is-visible');
            if (fadeTimeout) clearTimeout(fadeTimeout);
            fadeTimeout = setTimeout(() => {
              if (section.querySelector('#infiniteScrollWrapper') && !window._portfolioStarted) { window._portfolioStarted = true; initHomePortfolio(); }
              if (section.querySelector('#neuralMap') && !window._neuralStarted) { window._neuralStarted = true; initNeuralHub(); }
              if (section.querySelector('#infraMarquee') && !window._marqueeStarted) { window._marqueeStarted = true; initMarquee(); }
              if (section.querySelector('#teamScrollWrapper') && !window._teamScrollStarted) { window._teamScrollStarted = true; initTeamInfiniteScroll(); }
              if (section.id === 'marqueeSection' && !window._marqueeAnimStarted) { window._marqueeAnimStarted = true; startMarqueeAnimation(); }
            }, 1500);
          }
        });
      }, { threshold: 0.2 }).observe(section);
    });
  }
  function startMarqueeAnimation() { document.querySelector('#infraMarquee')?.classList.add('marquee-running'); document.querySelector('#techMarquee')?.classList.add('marquee-running'); }
  function initStats() {
    const statsGrid = document.getElementById('statsGrid'); if (!statsGrid) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const calcTrigger = document.getElementById('calc-trigger'), systemStatus = document.getElementById('system-status'), impactTitle = document.getElementById('impactTitle'), getNumbers = () => statsGrid.querySelectorAll('.stat-number');
    if (prefersReduced) { if (calcTrigger) calcTrigger.style.opacity = '1'; if (systemStatus) systemStatus.innerHTML = ''; if (impactTitle) { impactTitle.style.opacity = '1'; impactTitle.classList.add('is-active'); } getNumbers().forEach(num => { num.innerText = num.getAttribute('data-target'); }); return; }
    const randomHex = () => { const chars = '0123456789ABCDEF!@#$%&*'; return '0x' + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)]; };
    let flickerRafId = null, flickerActive = false; const flickerFrame = () => { if (!flickerActive) return; if (!_animationsPaused) getNumbers().forEach(n => { n.innerText = randomHex(); }); flickerRafId = requestAnimationFrame(flickerFrame); }; const startFlicker = () => { flickerActive = true; flickerFrame(); }; const stopFlicker = () => { flickerActive = false; if (flickerRafId) cancelAnimationFrame(flickerRafId); getNumbers().forEach(n => { n.innerText = '0'; }); };
    const countUp = (el, target) => { const duration = 2000, startTime = performance.now(); const update = (now) => { if (_animationsPaused) { requestAnimationFrame(update); return; } const progress = Math.min((now - startTime) / duration, 1); el.innerText = Math.floor((1 - Math.pow(1 - progress, 3)) * target); if (progress < 1) requestAnimationFrame(update); else el.innerText = target; }; requestAnimationFrame(update); };
    if (calcTrigger) calcTrigger.style.opacity = '1'; let charIndex = 0; const fullText = 'Calculating our impact by numbers....'; if (systemStatus) systemStatus.innerHTML = '';
    const typingInterval = setInterval(() => { if (_animationsPaused) return; if (!systemStatus) { clearInterval(typingInterval); return; } if (charIndex < fullText.length) { systemStatus.innerHTML += fullText.charAt(charIndex++); } else { clearInterval(typingInterval); setTimeout(() => { startFlicker(); let eraseIndex = fullText.length; const eraseInterval = setInterval(() => { if (_animationsPaused) return; if (!systemStatus) { clearInterval(eraseInterval); return; } if (eraseIndex > 0) { systemStatus.innerHTML = fullText.substring(0, --eraseIndex); } else { clearInterval(eraseInterval); if (impactTitle) { impactTitle.style.opacity = '1'; impactTitle.classList.add('is-active'); } setTimeout(() => { stopFlicker(); getNumbers().forEach(num => countUp(num, parseInt(num.getAttribute('data-target')))); }, 100); } }, 40); }, 500); } }, 30);
  }
  function initMarquee() {
    const infraItems = [ { name:'Shopify', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 120 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Shopify</text></svg>' }, { name:'WooCommerce', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 80 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Woo</text></svg>' }, { name:'Stripe', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 90 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Stripe</text></svg>' }, { name:'Zapier', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 90 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Zapier</text></svg>' }, { name:'WordPress', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 140 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">WordPress</text></svg>' }, { name:'Wix', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 60 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Wix</text></svg>' }, { name:'Squarespace', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 160 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Squarespace</text></svg>' } ];
    const techItems = [ { name:'Meta Ads', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 80 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Meta</text></svg>' }, { name:'Google Ads', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 140 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Google Ads</text></svg>' }, { name:'TikTok', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 90 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">TikTok</text></svg>' }, { name:'Klaviyo', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 100 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Klaviyo</text></svg>' }, { name:'Mailchimp', svg:'<svg class="h-8 w-auto fill-current" viewBox="0 0 120 40" aria-hidden="true"><text x="5" y="28" font-family="Arial" font-weight="bold" font-size="20">Mailchimp</text></svg>' } ];
    function buildMarquee(containerId, items) { const container = document.getElementById(containerId); if (!container) return; container.innerHTML = ''; for (let copy = 0; copy < 2; copy++) { items.forEach(item => { const div = document.createElement('div'); div.className = 'flex-shrink-0 px-10 py-5 bg-white/60 border border-black/10 rounded-xl transition-all duration-300 hover:border-teal-500 hover:shadow-md'; div.setAttribute('aria-label', item.name); div.innerHTML = item.svg; const svg = div.querySelector('svg'); if (svg) { svg.style.fill = 'currentColor'; svg.style.color = '#000000'; div.addEventListener('mouseenter', () => { svg.style.color = '#14b8a6'; }); div.addEventListener('mouseleave', () => { svg.style.color = '#000000'; }); } container.appendChild(div); }); } }
    buildMarquee('infraMarquee', infraItems); buildMarquee('techMarquee', techItems);
    const infraContainer = document.getElementById('infraMarquee'), techContainer = document.getElementById('techMarquee'), infraLabel = document.getElementById('infraLabel'), techLabel = document.getElementById('techLabel');
    if (infraContainer && infraLabel) { infraContainer.addEventListener('mouseenter', () => { infraLabel.style.color = '#14b8a6'; }); infraContainer.addEventListener('mouseleave', () => { infraLabel.style.color = '#000000'; }); }
    if (techContainer && techLabel) { techContainer.addEventListener('mouseenter', () => { techLabel.style.color = '#14b8a6'; }); techContainer.addEventListener('mouseleave', () => { techLabel.style.color = '#000000'; }); }
  }
  function initNeuralHub() {
    const container = document.getElementById('neuralMap'); if (!container) return;
    const services = [ { id:'web', title:'Web Development', desc:'Modern, responsive websites built with cutting-edge technology', tags:['Next.js','React','Tailwind'] }, { id:'uiux', title:'UI/UX Design', desc:'Intuitive interfaces that delight users and drive engagement', tags:['Figma','Adobe XD','User Testing'] }, { id:'ecom', title:'E-Commerce Solutions', desc:'Scalable online stores with seamless checkout experiences', tags:['Shopify','WooCommerce','Magento'] }, { id:'marketing', title:'Digital Marketing', desc:'Data-driven strategies to reach and convert your audience', tags:['SEO','Google Ads','Social Media'] }, { id:'brand', title:'Brand Strategy', desc:'Define your unique voice and identity in the market', tags:['Brand Audit','Positioning','Visual Identity'] }, { id:'consulting', title:'Technical Consulting', desc:'Expert guidance to solve complex technical challenges', tags:['Architecture','Performance','Security'] } ];
    const nodeIcons = { web:'<polyline points="4 9 2 12 4 15"/><polyline points="20 9 22 12 20 15"/><line x1="9" y1="5" x2="15" y2="19"/>', uiux:'<path d="M12 19l7-7-3-3-7 7v3h3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>', ecom:'<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>', marketing:'<path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/><polyline points="18 4 21 7 18 10"/>', brand:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', consulting:'<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>' };
    const nodesContainer = document.getElementById('nodesContainer'), svgEl = document.getElementById('neuralLines'), serviceTitle = document.getElementById('serviceTitle'), serviceDesc = document.getElementById('serviceDesc'), serviceTags = document.getElementById('serviceTags'), nodeIdSpan = document.getElementById('nodeId');
    let currentActiveId = 'ecom', autoRotateInterval = null, autoRotateActive = true, userClickedTimer = null, particle = null;
    function updateGeometry() { const rect = container.getBoundingClientRect(), width = rect.width, height = rect.height, centerX = width / 2, centerY = height / 2, radius = Math.min(width, height) * 0.35; services.forEach((service, idx) => { const angle = (idx / services.length) * 2 * Math.PI - Math.PI / 2; const x = centerX + radius * Math.cos(angle), y = centerY + radius * Math.sin(angle); if (service.element) { service.element.style.left = x + 'px'; service.element.style.top = y + 'px'; } service.targetCoords = { x, y }; }); svgEl.innerHTML = ''; services.forEach(service => { const line = document.createElementNS('http://www.w3.org/2000/svg', 'line'); line.setAttribute('x1', centerX); line.setAttribute('y1', centerY); line.setAttribute('x2', service.targetCoords.x); line.setAttribute('y2', service.targetCoords.y); line.setAttribute('stroke', '#14b8a6'); line.setAttribute('stroke-width', '2'); line.setAttribute('stroke-dasharray', '1000'); line.setAttribute('stroke-dashoffset', '1000'); svgEl.appendChild(line); service.line = line; }); const active = services.find(s => s.id === currentActiveId); if (active && active.line) active.line.setAttribute('stroke-dashoffset', '0'); }
    function createNodes() { nodesContainer.innerHTML = ''; services.forEach(service => { const nodeBtn = document.createElement('button'); nodeBtn.type = 'button'; nodeBtn.className = 'service-node'; nodeBtn.setAttribute('data-service', service.id); nodeBtn.setAttribute('aria-label', 'Select service: ' + service.title); nodeBtn.setAttribute('aria-pressed', service.id === 'ecom' ? 'true' : 'false'); const displayLabel = service.id === 'ecom' ? 'E‑Commerce' : sanitizeText(service.title); nodeBtn.innerHTML = `<div class="node-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${nodeIcons[service.id] || nodeIcons.web}</svg></div><div class="node-label">${displayLabel}</div>`; nodesContainer.appendChild(nodeBtn); service.element = nodeBtn; nodeBtn.addEventListener('click', () => { if (userClickedTimer) clearTimeout(userClickedTimer); autoRotateActive = false; setActive(service.id); userClickedTimer = setTimeout(() => { autoRotateActive = true; }, 5000); }); }); }
    function createParticle() { if (particle) particle.remove(); particle = document.createElement('div'); particle.className = 'neural-particle'; particle.setAttribute('aria-hidden', 'true'); container.appendChild(particle); }
    function setActive(serviceId, skipLineDraw) { const service = services.find(s => s.id === serviceId); if (!service) return; if (currentActiveId === serviceId && !skipLineDraw) return; currentActiveId = serviceId; if (serviceTitle) serviceTitle.innerText = service.title; if (serviceDesc) serviceDesc.innerText = service.desc; if (serviceTags) serviceTags.innerHTML = service.tags.map(t => `<span class="px-3 py-1.5 bg-[#d3d3d3] rounded-full text-black text-xs border border-black/10">${sanitizeText(t)}</span>`).join(''); if (nodeIdSpan) nodeIdSpan.innerText = (services.findIndex(s => s.id === serviceId) + 1).toString().padStart(2, '0'); services.forEach(s => { if (s.element) { s.element.classList.remove('active'); s.element.setAttribute('aria-pressed', 'false'); } }); service.element.classList.add('active'); service.element.setAttribute('aria-pressed', 'true'); services.forEach(s => { if (s.line) { s.line.style.transition = `stroke-dashoffset 1500ms linear`; s.line.setAttribute('stroke-dashoffset', '1000'); } }); if (service.line) { service.line.getBoundingClientRect(); service.line.setAttribute('stroke-dashoffset', '0'); } createParticle(); const r = container.getBoundingClientRect(), startX = r.width / 2, startY = r.height / 2, endX = service.targetCoords.x, endY = service.targetCoords.y; let step = 0; const steps = 30; const moveParticle = () => { if (!particle) return; if (_animationsPaused) { requestAnimationFrame(moveParticle); return; } const t = step / steps; particle.style.left = (startX + (endX - startX) * t - 4) + 'px'; particle.style.top = (startY + (endY - startY) * t - 4) + 'px'; step++; if (step <= steps) requestAnimationFrame(moveParticle); else if (particle) particle.remove(); }; if (!_animationsPaused) moveParticle(); if (serviceTitle) { serviceTitle.classList.remove('is-active'); setTimeout(() => serviceTitle.classList.add('is-active'), 50); } }
    function nextService() { const idx = services.findIndex(s => s.id === currentActiveId); setActive(services[(idx + 1) % services.length].id); }
    function startAutoRotate(ms) { ms = ms || 3000; if (autoRotateInterval) clearInterval(autoRotateInterval); autoRotateInterval = setInterval(() => { if (autoRotateActive && !_animationsPaused) nextService(); }, ms); }
    function stopAutoRotate() { if (autoRotateInterval) { clearInterval(autoRotateInterval); autoRotateInterval = null; } }
    createNodes(); updateGeometry(); setActive('ecom', true); startAutoRotate(3000);
    new ResizeObserver(() => { updateGeometry(); const active = services.find(s => s.id === currentActiveId); if (active && active.line) active.line.setAttribute('stroke-dashoffset', '0'); }).observe(container);
  }
  const SPACE_ID = 'ha7fm2wzrbnt';
  const ACCESS_TOKEN = 'aHD6agJic7zpquFTSOczZyIjKvYiZk-7A-eEp_5OLZQ';
  function initHomePortfolio() {
    const wrapper = document.getElementById('infiniteScrollWrapper'), track = document.getElementById('infiniteScrollTrack'); if (!wrapper || !track) return;
    let allProjects = [];
    async function fetchHomePortfolio() { const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=homePortfolio&order=-fields.publishDate`; try { const response = await fetch(url, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }); const data = await response.json(); if (!data.items || data.items.length === 0) return []; return data.items.map(item => { const fields = item.fields; const imageId = fields.mainImage?.sys?.id; let imageUrl = null; if (imageId && data.includes?.Asset) { const asset = data.includes.Asset.find(a => a.sys.id === imageId); if (asset?.fields?.file?.url) imageUrl = `https:${asset.fields.file.url}`; } if (!imageUrl) imageUrl = null; return { name: sanitizeText(fields.storeName || 'Unnamed'), url: sanitizeUrl(fields.storeUrl || '#'), label: sanitizeText(fields.description || ''), badge: sanitizeText(fields.optimisationBadge || ''), img: imageUrl, fallback: null }; }); } catch (error) { console.warn('Contentful homePortfolio fetch failed', error); return []; } }
    function buildCard(proj) {
      const card = document.createElement('div');
      card.className = 'flex-shrink-0 w-80 portfolio-card group/card';
      let imageHtml = '';
      if (proj.img && proj.img !== '' && proj.img !== null) {
        imageHtml = `<img src="${proj.img}" alt="Frankie Digitalz – ${proj.label} ${proj.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" loading="lazy" decoding="async" width="400" height="176" style="background-color:rgba(0,0,0,0.08);">`;
      } else {
        imageHtml = `<div class="w-full h-full flex items-center justify-center bg-gray-200 text-black/60 text-xs px-2 text-center">No portfolio image available</div>`;
      }
      card.innerHTML = `<a href="${proj.url}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" class="block bg-white/60 rounded-2xl border border-black/10 overflow-hidden transition-all duration-300 hover:border-[#14b8a6] hover:shadow-xl hover:scale-105"><div class="h-44 overflow-hidden relative" style="background-color:rgba(0,0,0,0.08);">${imageHtml}<div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300"><span class="text-white font-bold text-sm bg-[#14b8a6]/80 px-4 py-2 rounded-full">View Project →</span></div></div><div class="p-4"><span class="text-xs font-mono text-[#0f766e]">${proj.label}</span><h3 class="font-bold text-black text-lg mt-1">${proj.name}</h3><p class="text-black/60 text-sm mt-1">${proj.badge}</p></div></a>`;
      return card;
    }
    function populateTrack(projects) { track.innerHTML = ''; for (let i = 0; i < 3; i++) projects.forEach(proj => track.appendChild(buildCard(proj))); }
    (async () => { allProjects = await fetchHomePortfolio(); populateTrack(allProjects); })();
    let currentTranslate = 0, speed = 0.8, isPaused = false, isDragging = false, rafId = null;
    new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { if (!rafId) rafId = requestAnimationFrame(animate); } else { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } } }); }, { threshold: 0 }).observe(wrapper);
    const animate = () => { if (!isPaused && !isDragging && !_animationsPaused && allProjects.length) { currentTranslate -= speed; const totalWidth = track.scrollWidth; if (Math.abs(currentTranslate) >= totalWidth / 3) currentTranslate += totalWidth / 3; track.style.transform = `translateX(${currentTranslate}px)`; } rafId = requestAnimationFrame(animate); };
    wrapper.addEventListener('mouseenter', () => { isPaused = true; }); wrapper.addEventListener('mouseleave', () => { isPaused = false; });
    wrapper.addEventListener('mousedown', (e) => { isDragging = true; const startX = e.clientX, dragStartTranslate = currentTranslate; wrapper.style.cursor = 'grabbing'; const onMouseMove = (ev) => { currentTranslate = dragStartTranslate + (ev.clientX - startX); track.style.transform = `translateX(${currentTranslate}px)`; }; const onMouseUp = () => { isDragging = false; wrapper.style.cursor = 'grab'; window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); }; window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp); });
    wrapper.addEventListener('touchstart', (e) => { const startX = e.touches[0].clientX, startY = e.touches[0].clientY, dragStartTranslate = currentTranslate; let isHorizontal = null; const onTouchMove = (ev) => { const dx = ev.touches[0].clientX - startX, dy = ev.touches[0].clientY - startY; if (isHorizontal === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) { isHorizontal = Math.abs(dx) > Math.abs(dy); } if (isHorizontal) { isDragging = true; currentTranslate = dragStartTranslate + dx; track.style.transform = `translateX(${currentTranslate}px)`; } }; const onTouchEnd = () => { isDragging = false; isHorizontal = null; wrapper.removeEventListener('touchmove', onTouchMove); wrapper.removeEventListener('touchend', onTouchEnd); }; wrapper.addEventListener('touchmove', onTouchMove, { passive: true }); wrapper.addEventListener('touchend', onTouchEnd, { passive: true }); }, { passive: true });
  }
  function initTeamInfiniteScroll() {
    const wrapper = document.getElementById('teamScrollWrapper'), track = document.getElementById('teamScrollTrack'); if (!wrapper || !track) return;
    let teamMembers = [];
    let autoCollapseTimer = null;
    let currentTranslate = 0, speed = 0.6, isPaused = false, isDragging = false, rafId = null;
    const statusMap = {
      ceo: { image: '/ceo.webp', role: 'CEO', description: 'Strategic leader aligning technology with business goals to drive sustainable growth.' },
      manager: { image: '/manager.webp', role: 'Manager', description: 'Keeps projects on track, teams aligned, and ensures on-time, high-quality delivery.' },
      developer: { image: '/developer.webp', role: 'Developer', description: 'Full-stack engineer building fast, scalable, and secure web applications.' },
      designer: { image: '/designer.webp', role: 'Designer', description: 'Creates intuitive interfaces and beautiful brand experiences users love.' }
    };
    async function fetchTeamMembers() { const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=teamMember`; try { const response = await fetch(url, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }); const data = await response.json(); if (!data.items || data.items.length === 0) return []; return data.items.map(item => { const fields = item.fields; const status = (fields.status || '').toLowerCase(); const mapping = statusMap[status] || statusMap.developer; return { name: sanitizeText(fields.name || 'Team Member'), role: mapping.role, image: mapping.image, description: mapping.description, status }; }); } catch (error) { console.warn('Contentful team fetch failed', error); return []; } }
    function buildCard(member) {
      return `<button type="button" class="team-card" data-status="${member.status}" aria-expanded="false" aria-label="View details for ${member.name}, ${member.role}">
        <div class="team-avatar">
          <img src="${member.image}" alt="${member.name}" loading="lazy" decoding="async" width="128" height="128" style="background-color:rgba(0,0,0,0.08);"
               onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\"w-full h-full flex items-center justify-center text-white/60 text-xs\">No image</div>';">
        </div>
        <h3 class="text-xl font-black text-black">${member.name}</h3>
        <div class="team-status text-sm font-bold uppercase tracking-wide">${member.role}</div>
        <div class="flex justify-center mt-2" aria-hidden="true">
          <svg class="team-card-chevron w-4 h-4 text-[#14b8a6]" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="team-description text-black/80 text-sm" aria-live="polite">${member.description}</div>
      </button>`;
    }
    function populateTrack(members) { track.innerHTML = ''; for (let i = 0; i < 3; i++) members.forEach(m => track.insertAdjacentHTML('beforeend', buildCard(m))); attachCardEvents(); }
    function attachCardEvents() { document.querySelectorAll('.team-card').forEach(card => { card.removeEventListener('click', handleCardActivate); card.addEventListener('click', handleCardActivate); }); }
    function handleCardActivate(e) { e.stopPropagation(); const card = e.currentTarget, isExpanded = card.classList.contains('expanded'); if (autoCollapseTimer) clearTimeout(autoCollapseTimer); if (isExpanded) { card.classList.remove('expanded'); card.setAttribute('aria-expanded', 'false'); isPaused = false; return; } document.querySelectorAll('.team-card.expanded').forEach(c => { c.classList.remove('expanded'); c.setAttribute('aria-expanded', 'false'); }); card.classList.add('expanded'); card.setAttribute('aria-expanded', 'true'); isPaused = true; autoCollapseTimer = setTimeout(() => { card.classList.remove('expanded'); card.setAttribute('aria-expanded', 'false'); isPaused = false; autoCollapseTimer = null; }, 5000); }
    new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { if (!rafId) rafId = requestAnimationFrame(animateTeam); } else { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } } }); }, { threshold: 0 }).observe(wrapper);
    const animateTeam = () => { if (!isPaused && !isDragging && !_animationsPaused && track.scrollWidth > wrapper.clientWidth) { currentTranslate -= speed; const totalWidth = track.scrollWidth; if (Math.abs(currentTranslate) >= totalWidth / 3) currentTranslate += totalWidth / 3; track.style.transform = `translateX(${currentTranslate}px)`; } rafId = requestAnimationFrame(animateTeam); };
    (async () => { teamMembers = await fetchTeamMembers(); populateTrack(teamMembers); })();
    wrapper.addEventListener('mouseenter', () => { isPaused = true; });
    wrapper.addEventListener('mouseleave', () => { if (!document.querySelector('.team-card.expanded')) isPaused = false; });
    wrapper.addEventListener('mousedown', (e) => { document.querySelectorAll('.team-card.expanded').forEach(c => { c.classList.remove('expanded'); c.setAttribute('aria-expanded', 'false'); }); if (autoCollapseTimer) clearTimeout(autoCollapseTimer); isPaused = false; isDragging = true; const startX = e.clientX, dragStartTranslate = currentTranslate; wrapper.style.cursor = 'grabbing'; const onMouseMove = (ev) => { currentTranslate = dragStartTranslate + (ev.clientX - startX); track.style.transform = `translateX(${currentTranslate}px)`; }; const onMouseUp = () => { isDragging = false; wrapper.style.cursor = 'grab'; window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); }; window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp); });
    wrapper.addEventListener('touchstart', (e) => { document.querySelectorAll('.team-card.expanded').forEach(c => { c.classList.remove('expanded'); c.setAttribute('aria-expanded', 'false'); }); if (autoCollapseTimer) clearTimeout(autoCollapseTimer); isPaused = false; const startX = e.touches[0].clientX, startY = e.touches[0].clientY, dragStartTranslate = currentTranslate; let isHorizontal = null; const onTouchMove = (ev) => { const dx = ev.touches[0].clientX - startX, dy = ev.touches[0].clientY - startY; if (isHorizontal === null && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) { isHorizontal = Math.abs(dx) > Math.abs(dy); } if (isHorizontal) { isDragging = true; currentTranslate = dragStartTranslate + dx; track.style.transform = `translateX(${currentTranslate}px)`; } }; const onTouchEnd = () => { isDragging = false; isHorizontal = null; wrapper.removeEventListener('touchmove', onTouchMove); wrapper.removeEventListener('touchend', onTouchEnd); }; wrapper.addEventListener('touchmove', onTouchMove, { passive: true }); wrapper.addEventListener('touchend', onTouchEnd, { passive: true }); }, { passive: true });
    function resetAutoCollapseOnInteraction() { if (autoCollapseTimer) { clearTimeout(autoCollapseTimer); autoCollapseTimer = setTimeout(() => { const expandedCard = document.querySelector('.team-card.expanded'); if (expandedCard) { expandedCard.classList.remove('expanded'); expandedCard.setAttribute('aria-expanded', 'false'); isPaused = false; } autoCollapseTimer = null; }, 5000); } }
    window.addEventListener('scroll', resetAutoCollapseOnInteraction);
    document.addEventListener('touchstart', resetAutoCollapseOnInteraction);
    document.addEventListener('click', resetAutoCollapseOnInteraction);
  }
})();