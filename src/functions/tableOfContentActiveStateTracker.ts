/**
 * Creates an observer that tracks which section is currently visible on screen
 * This highlights the active item in your table of contents as the user scrolls
 */
export const createActiveSectionTracker = (
  sectionIds: string[],
  onActiveChange: (activeId: string) => void,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '-100px 0px -80% 0px', // Trigger when section is near top of viewport
    threshold: 0,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    // Find sections that are currently visible
    const visibleEntries = entries.filter(entry => entry.isIntersecting);

    if (visibleEntries.length > 0) {
      // Get the topmost visible section
      const topEntry = visibleEntries.reduce((prev, current) => {
        return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current;
      });

      // Update the active section
      onActiveChange(topEntry.target.id);
    }
  }, defaultOptions);

  // Start observing all the sections
  sectionIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });

  return observer;
};