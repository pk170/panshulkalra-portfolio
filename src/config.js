module.exports = {
  email: 'panshulkalra@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/panshulkalra',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/panshul-kalra-6808a9381',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/panshonrepeat?igsh=enl2bDN0ajRtc2p4&utm_source=qr',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@PanshOnRepeat',
    },
    
    {
      name: 'X',
      url: 'https://x.com/panshul589625?s=11',
    },
    
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Blogs',
      url : '/#blog'
    },
    
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
