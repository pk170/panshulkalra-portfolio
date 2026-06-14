import { css } from 'styled-components';

const variables = css`
  :root {
    /* Backgrounds - Off-White Palette (Original Variable Names) */
    --dark-navy: #e2e8f0;      /* Borders and subtle dividers */
    --navy: #f8f9fa;           /* MAIN BACKGROUND: Off-white */
    --light-navy: #ffffff;     /* Card/Section backgrounds: Pure white */
    --lightest-navy: #f1f5f9;  /* Hover states for cards */
    --navy-shadow: rgba(0, 0, 0, 0.08); /* Softened shadow for light mode */
    
    /* Text - Greyish Palette (Original Variable Names) */
    --dark-slate: #94a3b8;     /* Lightest text / metadata */
    --slate: #64748b;          /* Secondary text */
    --light-slate: #282e36;    /* MAIN TEXT: Greyish */
    --lightest-slate: #1e293b; /* Headings: Dark grey */
    --white: #0f172a;          /* Previously white, now almost black for high contrast */

    /* Accents */
    --green: #64b9ff;          /* Kept original Neon Green */
    --green-tint: rgba(100, 255, 218, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;