import { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
function Observable({ children, onElementVisible, onClick, className }) {
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
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

  return (
    <button ref={targetRef} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Observable;
