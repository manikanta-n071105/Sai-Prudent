/**
 * Sai Prudent Scholarship - Central Client Routing Configuration
 * Provides canonical URL paths, aliases, and browser history synchronization.
 */

export const ROUTE_MAP = {
  home: {
    path: '/',
    aliases: ['/home'],
    title: 'Sai Prudent Scholarship (SPS) | Puttaparthi'
  },
  about: {
    path: '/about',
    aliases: ['/about-us'],
    title: 'About Us — Sai Prudent Scholarship & Genesis'
  },
  'talent-test': {
    path: '/talent-test',
    aliases: ['/test', '/syllabus', '/exam-pattern'],
    title: 'Talent Test Pattern & Syllabus — Sai Prudent'
  },
  benefits: {
    path: '/scholarships',
    aliases: ['/benefits', '/prizes', '/rewards'],
    title: 'Scholarships & Merit Rewards — Sai Prudent'
  },
  results: {
    path: '/results',
    aliases: ['/merit', '/ranks', '/toppers'],
    title: 'Results & Merit Rankings — Sai Prudent'
  },
  hallticket: {
    path: '/hallticket',
    aliases: ['/admit-card', '/admitcard', '/hall-ticket'],
    title: 'Download Admit Card / Hall Ticket — Sai Prudent'
  },
  register: {
    path: '/register',
    aliases: ['/apply', '/apply-online', '/registration'],
    title: 'Apply Online — Sai Prudent Candidate Registration'
  },
  attendance: {
    path: '/attendance',
    aliases: ['/rooms'],
    title: 'Room Attendance — Sai Prudent Examination'
  },
  admin: {
    path: '/admin',
    aliases: ['/coordinator', '/control-desk'],
    title: 'Admin & Control Desk — Sai Prudent'
  }
};

export const getPathForTab = (tab) => {
  return ROUTE_MAP[tab]?.path || '/';
};

export const getTabFromPath = () => {
  if (typeof window === 'undefined') return 'home';

  const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');

  // Check path match
  for (const [tab, config] of Object.entries(ROUTE_MAP)) {
    if (config.path === rawPath) return tab;
    if (config.aliases && config.aliases.includes(rawPath)) return tab;
  }

  // Check hash fallback (e.g. /#about or /#register)
  if (rawHash) {
    const formattedHash = `/${rawHash}`;
    for (const [tab, config] of Object.entries(ROUTE_MAP)) {
      if (tab === rawHash) return tab;
      if (config.path === formattedHash) return tab;
      if (config.aliases && config.aliases.includes(formattedHash)) return tab;
    }
  }

  // Check query parameter fallback (e.g. ?tab=register)
  try {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') || params.get('page');
    if (tabParam && ROUTE_MAP[tabParam]) return tabParam;
  } catch (e) {
    // ignore
  }

  return 'home';
};

export const updateDocumentTitle = (tab) => {
  if (typeof document === 'undefined') return;
  document.title = ROUTE_MAP[tab]?.title || ROUTE_MAP.home.title;
};

