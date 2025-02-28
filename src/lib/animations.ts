
// Define animations to use throughout the app

export const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

export const fadeInUp = {
  from: {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

export const fadeInDown = {
  from: {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

export const slideInRight = {
  from: {
    transform: 'translateX(100%)',
  },
  to: {
    transform: 'translateX(0)',
  },
};

export const slideInLeft = {
  from: {
    transform: 'translateX(-100%)',
  },
  to: {
    transform: 'translateX(0)',
  },
};

export const wiggle = {
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(-5deg)' },
  '50%': { transform: 'rotate(0deg)' },
  '75%': { transform: 'rotate(5deg)' },
  '100%': { transform: 'rotate(0deg)' },
};

export const pingOnce = {
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '50%': {
    transform: 'scale(1.5)',
    opacity: 0.8,
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
};

export const zoomIn = {
  from: {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
};

export const rotate = {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
};

export const pulse = {
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
};
