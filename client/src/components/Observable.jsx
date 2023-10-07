import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
function Observable({ children, onElementVisible, onClick }) {
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // The viewport is the default root
      rootMargin: '0px', // No margin
      threshold: 0.5 // When at least 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible, trigger the callback
          onElementVisible();
          observer.unobserve(targetRef.current); // Stop observing once visible
        }
      });
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [onElementVisible]);

  return <button ref={targetRef} onClick={onClick}>{children}</button>;
}

export default Observable;
