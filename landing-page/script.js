// ==========================================================================
// Part 2 Landing Page Interactivity
// (01-landing-page-plan.md + taste-skill guidelines)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. CTA Links Interaction (Hero & Final Buttons)
  const ctaButtons = document.querySelectorAll('.btn-cta');
  ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
      const ctaType = button.getAttribute('data-cta') || button.id;
      console.log(`[CTA Clicked] Coupang Partners Link: ${ctaType}`);
    });
  });

  // 2. FAQ Accordion Interaction
  // "FAQ는 모두 닫힌 상태로 시작한다. 한 항목을 열면 다른 항목은 닫힌다. 질문 행 전체를 버튼으로 제공하고, Enter/Space로 열고 닫을 수 있다."
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other accordions
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.accordion-trigger');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherTrigger && otherContent) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherContent.hidden = true;
            otherItem.classList.remove('is-open');
          }
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.hidden = true;
        item.classList.remove('is-open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.hidden = false;
        item.classList.add('is-open');
      }
    });
  });

  // 3. Specification Disclosure Panel Toggle
  // "'표기 보기'는 버튼이며 aria-expanded 값으로 상태를 알린다. 열리면 같은 페이지 안에서 원재료 표기 이미지와 캡션을 보여 준다."
  const specToggles = document.querySelectorAll('.toggle-spec-btn');
  const specPanel = document.getElementById('spec-disclosure-panel');

  specToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!specPanel) return;

      const isHidden = specPanel.hidden;
      specPanel.hidden = !isHidden;

      specToggles.forEach(b => {
        b.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        b.textContent = isHidden ? '표기 닫기 ▴' : '표기 보기 ▾';
      });

      if (isHidden) {
        specPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // 3-B. FAQ 1 Inline Spec Drawer Toggle
  // "FAQ 1을 열면 답변 뒤에 ‘1kg 표기 보기’ 인라인 링크를 제공해 해당 근거 크롭을 펼친다."
  const faqSpecBtn = document.getElementById('faq-1kg-spec-btn');
  const faqSpecPanel = document.getElementById('faq-1kg-spec-panel');
  if (faqSpecBtn && faqSpecPanel) {
    faqSpecBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = faqSpecPanel.hidden;
      faqSpecPanel.hidden = !isHidden;
      faqSpecBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      faqSpecBtn.textContent = isHidden ? '1kg 표기 닫기 ▴' : '1kg 표기 보기 ▾';
    });
  }

  // 4. Missing Image Graceful Fallback
  // "상품 사진이 없으면 '이미지 준비 중'으로 표시"
  function handleImageError(img) {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';
    const container = img.closest('.image-container') || img.parentElement;
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', '이미지 준비 중');
    fallback.innerHTML = `
      <span class="image-fallback-icon" aria-hidden="true">🍲</span>
      <span class="image-fallback-text">이미지 준비 중</span>
    `;
    img.style.display = 'none';
    if (container) {
      container.appendChild(fallback);
    }
  }

  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', () => handleImageError(img));
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
      handleImageError(img);
    }
  });

  // 5. Header Shadow on Scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(32, 23, 21, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
});
