import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Site-wide motion layer. Mounted once in App.js, it adds, without touching
// each page component:
//   - scroll-reveal animation for cards, headings, steps, form fields...
//   - a scroll progress bar and a back-to-top button
//   - a soft glow that follows the cursor (desktop only)
//   - a mouse-follow spotlight on cards (sets --mx / --my for the CSS)

// Everything in this list fades/slides in as it enters the viewport.
const REVEAL_SELECTOR = [
  '.section-head',
  '.service-card',
  '.step',
  '.about-intro > *',
  '.about-figure',
  '.about-card',
  '.about-value',
  '.about-toolkit-group',
  '.about-link',
  '.cta-band .container',
  '.contact-intro > *',
  '.form-row',
  '.contact-form > .btn',
  '.footer-col',
  '.footer-brand',
  '.footer-bottom',
].join(', ');

// Cards that get the cursor spotlight.
const SPOT_SELECTOR = [
  '.service-card',
  '.about-card',
  '.about-value',
  '.about-figure',
  '.about-toolkit-group',
].join(', ');

function MotionLayer() {
  const { pathname } = useLocation();
  const barRef = useRef(null);
  const glowRef = useRef(null);
  const observerRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  // One shared observer for the whole app. It is never disconnected on route
  // changes, so elements that live across routes (the footer) still reveal.
  function getObserver() {
    if (observerRef.current) return observerRef.current;

    if (!('IntersectionObserver' in window)) return null;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    return observerRef.current;
  }

  // Tag the page's elements for reveal after every route change. A layout
  // effect runs before the browser paints, so there is no flash of content.
  useLayoutEffect(() => {
    const observer = getObserver();
    const elements = document.querySelectorAll(REVEAL_SELECTOR);
    const countPerParent = new Map();

    elements.forEach((el) => {
      // the home page animates itself; skip anything already revealed
      if (el.classList.contains('is-visible') || el.closest('.home')) return;

      if (!observer) return;

      const parent = el.parentElement;
      const index = countPerParent.get(parent) || 0;
      countPerParent.set(parent, index + 1);

      el.style.setProperty('--d', `${Math.min(index, 6) * 90}ms`);
      el.classList.add('reveal');
      observer.observe(el);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(
    () => () => {
      if (observerRef.current) observerRef.current.disconnect();
    },
    []
  );

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      setShowTop(root.scrollTop > 600);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Cursor glow + card spotlight
  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (event) => {
      if (finePointer && glowRef.current) {
        x = event.clientX;
        y = event.clientY;
        glowRef.current.classList.add('is-on');
        if (!frame) {
          frame = requestAnimationFrame(() => {
            frame = 0;
            if (glowRef.current) {
              glowRef.current.style.transform = `translate3d(${x - 210}px, ${
                y - 210
              }px, 0)`;
            }
          });
        }
      }

      const card = event.target.closest && event.target.closest(SPOT_SELECTOR);
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }
    };

    const onLeave = () => {
      if (glowRef.current) glowRef.current.classList.remove('is-on');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <button
        type="button"
        className={`to-top${showTop ? ' is-shown' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span>↑</span>
      </button>
    </>
  );
}

export default MotionLayer;
