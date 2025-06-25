import { useEffect, useState } from 'react';

export const useScrollSectionTracker = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!sectionIds.length) return;

    const handleScroll = () => {
      const headerOffset = 122;
      const scrollPosition = window.scrollY + headerOffset;

      // Find all sections and their positions
      const sections = sectionIds
        .map(id => {
          const element = document.getElementById(id);
          return element ? {
            id,
            top: element.offsetTop,
            bottom: element.offsetTop + element.offsetHeight
          } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a!.top - b!.top);

      if (sections.length === 0) return;

      // Find the section that's closest to the scroll position
      // This is the key fix - we look for the section whose top is closest to scroll position
      let currentSection = sections[0];

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]!;
        if (section.top <= scrollPosition + 50) { // 50px buffer for better UX
          currentSection = section;
        } else {
          break;
        }
      }

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [sectionIds, activeSection]);

  return activeSection;
};