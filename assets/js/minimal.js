/* H24 Creationz, minimal edition. iOS-inspired, hand-written. */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var root = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var WA = '918667701001', MAIL = 'harshavarthanep@gmail.com';
var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
var CHEV = '<svg class="chev" viewBox="0 0 9 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5 7 7l-5.5 5.5"/></svg>';

var SVC_GROUPS = [
  ['Brand', [['brand', 'Brand identity'], ['logo', 'Logo design'], ['tagline', 'Name and tagline'], ['cards', 'Business cards with QR'], ['brochure', 'Brochure'], ['design', 'Graphic design'], ['pack', 'Packaging']]],
  ['Online', [['web', 'Website or redesign'], ['store', 'Online store'], ['landing', 'Landing page for ads'], ['booking', 'Online booking'], ['app', 'App for phones']]],
  ['Get found', [['maps', 'Google Maps listing', 1], ['seo', 'SEO'], ['geo', 'AI search visibility (GEO)', 1]]],
  ['Grow', [['video', 'AI video and reels', 1], ['social', 'Social media setup'], ['wa', 'WhatsApp automation', 1], ['bot', 'AI chat assistant', 1], ['tools', 'Dashboard or tool']]]
];

var PALS = [['Fire', '#F45D0A', '#1C0C0D', '#FFD640'], ['Ocean', '#0D66D0', '#0B1B33', '#8BE8FF'], ['Forest', '#1F7A63', '#0E2A22', '#E9C46A'], ['Berry', '#B5179E', '#2B0A3D', '#FFB3E6'], ['Mono', '#E3262E', '#111111', '#F2EAE0']];
var KIT = [
  ['name', 'Brand name', 's31', 'tagline'], ['logo', 'Logo', 's22', 'logo'], ['tag', 'Tagline', 's31', 'tagline'], ['col', 'Colours and type', 's21', 'brand'],
  ['web', 'Website', 's32', 'web'], ['card', 'Business cards with QR', 's21', 'cards'], ['soc', 'Social media handles', 's23', 'social'], ['maps', 'Google Maps listing', 's22', 'maps'],
  ['bro', 'Brochure', 's22', 'brochure'], ['let', 'Letterhead', 's12', 'design'], ['pack', 'Packaging', 's22', 'pack'], ['sign', 'Signage', 's31', 'design'],
  ['mail', 'Email signature', 's21', 'design'], ['deck', 'Pitch deck', 's21', 'design'], ['vid', 'AI brand video', 's21', 'video'], ['des', 'Graphic design', 's12', 'design']
];
var KMAP = {}; KIT.forEach(function (k) { KMAP[k[0]] = k; });
var PRESET = { 'new': ['name', 'logo', 'tag', 'col', 'web', 'card', 'soc', 'maps'], re: ['logo', 'col', 'web', 'card', 'soc', 'sign', 'let'], grow: ['web', 'maps', 'soc', 'vid', 'bro', 'mail'], launch: ['pack', 'web', 'vid', 'soc', 'deck', 'des'] };
var TAGS = { 'new': 'Made to be remembered.', re: 'Same heart. New look.', grow: 'Now easier to find.', launch: 'Something new is here.' };

var SERV = [
  { svc: 'brand', peek: 'arjuna', theme: '', title: 'Branding and rebranding', sub: 'From a new name to a full refresh. A look customers remember and trust.', pain: 'For when you are starting out, or your look no longer fits.', incl: ['Name and tagline', 'Logo', 'Colours and type', 'Brochure', 'Business cards with QR', 'Social media handles'],
    dels: ['Brand name', 'Tagline', 'Logo', 'Colour and type system', 'Brand guidelines', 'Brochure', 'Business cards with QR', 'Letterhead and stationery', 'Social media handles and kit', 'Packaging', 'Signage'], steps: ['Learn your story and customers', 'Explore directions together', 'Refine the chosen look', 'Hand over every file you need'], proof: ['arjuna', 'See Arjuna Hospital'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/></svg>' },
  { svc: 'web', peek: 'rmax', theme: 'water', title: 'Websites and web apps', sub: 'Fast sites that install on a phone like an app.', pain: 'For when your site is slow, old, or hard to use on a phone.', incl: ['Design and build', 'Installable web app', 'Online stores and booking', 'Hosting and updates'],
    dels: ['Website design and build', 'Installable web app (PWA)', 'Online store', 'Booking system', 'Landing pages for ads', 'WhatsApp and call buttons', 'Hosting and updates', 'Speed and security'], steps: ['Plan pages around what customers ask', 'Design for phones first', 'Build, test on every device', 'Launch, host and keep it updated'], proof: ['rmax', 'See Rmax'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8"/></svg>' },
  { svc: 'seo', peek: 'dap', theme: 'ink', title: 'SEO, GEO and Google Maps', sub: 'Found on Google, on Maps and in AI answers.', pain: 'For when customers find your competitor first.', incl: ['Google Maps listing', 'On-page and technical SEO', 'Structured data for AI', 'Content that answers real questions'],
    dels: ['Google Maps listing', 'On-page SEO', 'Technical SEO', 'Structured data for AI search', 'Review strategy', 'Content that answers questions', 'Local listings and citations', 'Monthly ranking report'], steps: ['Check how you show up today', 'Fix your details everywhere', 'Publish pages people search for', 'Track and improve every month'], proof: ['dap', 'See DAP Fitness'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>' },
  { svc: 'video', peek: 'ocb', theme: '', title: 'AI video campaigns', sub: 'Festival, launch and product ads, without a film shoot.', pain: 'For when every reel needs a crew you can not afford.', incl: ['Concept and script', 'Multi-scene AI video', 'Reels, shorts and ads', 'Sizes for every platform'],
    dels: ['Concept and script', 'Storyboard', 'Multi-scene AI video', 'Festival campaigns', 'Product launch ads', 'Reels and shorts', 'Every aspect ratio', 'Captions and voice-over'], steps: ['Agree the idea and script', 'Storyboard every scene', 'Produce and edit', 'Deliver every size you need'], proof: ['ocb', 'See OCB'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 10l5-3v10l-5-3"/></svg>' },
  { svc: 'tools', peek: 'blend', theme: 'paper', title: 'Tools and automation', sub: 'Less repetitive work for your team.', pain: 'For when leads, sheets and follow-ups eat your day.', incl: ['WhatsApp automation', 'AI chat assistant', 'Google Sheets dashboards', 'Custom web tools'],
    dels: ['WhatsApp automation', 'AI chat assistant', 'Lead tracking sheet', 'Google Sheets dashboard', 'Custom web tool', 'Chrome extension'], steps: ['Map the work you repeat', 'Pick the simplest fix', 'Build and test with your team', 'Hand over with a short guide'], proof: ['#lab', 'See our own apps'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>' }
];

var I = {
  pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8.5 15.5c1.5-.5 4-3 4.5-6 .4 2.6 2 4.5 3 5-1.6-.1-5.5.2-7.5 1z"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  graph: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><circle cx="12" cy="11" r="1.6"/><path d="M8 7.3 10.6 10M15.8 8.2 13.4 10.2M12 12.6v3"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/>',
  flick: '<path d="M9 7 4 12l5 5"/><path d="M15 7l5 5-5 5"/><path d="M13 5 11 19"/>',
  rec: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  puzzle: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 12h16M12 4v16"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.2" fill="currentColor"/>',
  drop: '<path d="M12 20V6"/><path d="m6 11 6-6 6 6"/><path d="M5 20h14"/>',
  qr: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2v2M18 18h2v2"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  hub: '<circle cx="7" cy="7" r="1.8" fill="currentColor"/><circle cx="12" cy="7" r="1.8" fill="currentColor"/><circle cx="17" cy="7" r="1.8" fill="currentColor"/><circle cx="7" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="17" cy="12" r="1.8" fill="currentColor"/><circle cx="7" cy="17" r="1.8" fill="currentColor"/><circle cx="12" cy="17" r="1.8" fill="currentColor"/><circle cx="17" cy="17" r="1.8" fill="currentColor"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  wa: '<path d="M20.5 11.7A8.5 8.5 0 0 1 8 19.2L3.5 20.5l1.3-4.4a8.5 8.5 0 1 1 15.7-4.4z"/>'
};
function svgI(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[n] || I.grid) + '</svg>'; }
var CWS_IMG = 'https://developer.chrome.com/static/docs/webstore/branding/image/iNEddTyWiMfLSwFD6qGq.png';
var PLAY_IMG = 'https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png';
var AMZ_IMG = 'https://images-na.ssl-images-amazon.com/images/G/01/rainier/available_at_amazon_1200x600_Nvz5h2M.png';
var APPS = [
  { g: 'Web apps' },
  { id: 'zenpdf', name: 'ZenPDF', kind: 'PDF suite', icon: 'pdf', bg: 'linear-gradient(145deg,#ff3b30,#b0141b)', desc: 'Every PDF tool in one private workspace: edit, sign, fill, merge, split, compress, convert and protect. Files never leave the device.', feat: ['Works right in the browser', 'Nothing is uploaded', 'Sign and fill forms'], meta: ['Web app', 'Productivity', 'Free'], open: [['Open ZenPDF', 'https://harshavarthanep.github.io/pdf-edit/']] },
  { id: 'nodalis', name: 'Nodalis', kind: 'Knowledge software', icon: 'graph', bg: 'linear-gradient(145deg,#2c2c2e,#000)', desc: 'Local-first notes, canvas and knowledge graph with tasks and a priority matrix. Notes stay as plain markdown on your own disk.', feat: ['Linked notes and a live graph', 'Canvas and tasks', 'Your files, on your disk'], meta: ['Web app', 'Notes', 'Free'], open: [['Open the editor', 'https://harshavarthanep.github.io/Nodalis-apps/#editor'], ['Product site', 'https://harshavarthanep.github.io/Nodalis/']] },
  { id: 'tally', name: 'Tallyroll', kind: 'Screen recorder', icon: 'rec', bg: 'linear-gradient(145deg,#1f2a44,#0d1220)', desc: 'Record screen and camera with no watermark, no time limit and no account. Trim, then share a link that expires when you choose.', feat: ['No watermark or time limit', 'Screen and camera together', 'Trim before you share'], meta: ['Web app', 'Video', 'Free'], open: [['Open Tallyroll', 'https://harshavarthanep.github.io/Tallyroll/']] },
  { id: 'owl', name: 'OwlKaraoke', kind: 'Audio studio', icon: 'mic', bg: 'linear-gradient(145deg,#ff9f0a,#c25e00)', desc: 'Removes vocals from any song, changes key and tempo, syncs lyrics and exports audio or a karaoke video. Nothing is uploaded.', feat: ['Vocal removal', 'Key and tempo control', 'Karaoke video export'], meta: ['Web app', 'Music', 'Free'], open: [['Open OwlKaraoke', 'https://harshavarthanep.github.io/owlkaraoke/']] },
  { id: 'zendocs', name: 'ZenDocs Pro', kind: 'Writing workspace', icon: 'pen', bg: 'linear-gradient(145deg,#f2e6cf,#c9a66b)', dark: 1, desc: 'Linked notes, a live graph, kanban, Eisenhower matrix, focus timer and real Word and PDF export. Works offline and syncs across devices.', feat: ['Kanban and focus timer', 'Word and PDF export', 'Works offline'], meta: ['Web app', 'Writing', 'Free'], open: [['Open the app', 'https://harshavarthanep.github.io/NotesV2/'], ['Product site', 'https://harshavarthanep.github.io/ZenDocs/']] },
  { id: 'kuro', name: 'Kuro Logic', kind: 'Puzzle game', icon: 'puzzle', bg: 'linear-gradient(145deg,#3a3a3c,#111)', desc: 'Minimal logic puzzle with levels, IQ points and power-ups. Installs and plays offline.', feat: ['Dozens of levels', 'IQ points and power-ups', 'Plays offline'], meta: ['Game', 'Puzzle', 'Free'], open: [['Play Kuro Logic', 'https://harshavarthanep.github.io/Kuro-Logic/']] },
  { id: 'drop', name: 'InfinityDrop', kind: 'File transfer', icon: 'drop', bg: 'linear-gradient(145deg,#0a84ff,#0040a8)', desc: 'High-speed peer-to-peer file transfer over WebRTC, with no server limits.', feat: ['Device to device', 'No upload limits', 'Nothing stored on a server'], meta: ['Web app', 'Utilities', 'Free'], open: [['Open InfinityDrop', 'https://harshavarthanep.github.io/Files-transfer2/']] },
  { id: 'qrs', name: 'QR Studio', kind: 'QR generator', icon: 'qr', bg: 'linear-gradient(145deg,#f2f2f7,#c7c7cc)', dark: 1, desc: 'Generate and manage dynamic QR codes.', feat: ['Dynamic QR codes', 'Edit where a code points', 'Download in high resolution'], meta: ['Web app', 'Business', 'Free'], open: [['Open QR Studio', 'https://harshavarthanep.github.io/Dynamic-QR/']] },
  { id: 'wealth', name: 'Wealth Tracker', kind: 'Finance dashboard', icon: 'chart', bg: 'linear-gradient(145deg,#30d158,#0b7a35)', desc: 'Net worth and expense tracking dashboard.', feat: ['Net worth at a glance', 'Track expenses', 'Clear charts'], meta: ['Web app', 'Finance', 'Free'], open: [['Open Wealth Tracker', 'https://harshavarthanep.github.io/Wealth-tracker/']] },
  { g: 'Chrome extensions' },
  { id: 'shelf', name: 'Shelf Shelf', kind: 'Chrome extension', icon: 'grid', bg: 'linear-gradient(145deg,#f2f2f7,#d1d1d6)', dark: 1, desc: 'Your favourite websites as apps, folders and a dock, plus to-dos with reminders. Published on the Chrome Web Store, with a free web version.', feat: ['Websites as apps and folders', 'A dock for your favourites', 'To-dos with reminders'], meta: ['Extension', 'Productivity', 'Free'], store: ['cws', 'https://chromewebstore.google.com/detail/shelf-shelf-%E2%80%94-app-launche/bhhnembgfddoomakgmegbhkpklcgelhn'], open: [['Add to Chrome', 'https://chromewebstore.google.com/detail/shelf-shelf-%E2%80%94-app-launche/bhhnembgfddoomakgmegbhkpklcgelhn'], ['Web version', 'https://harshavarthanep.github.io/Shelf-Shelf/']] },
  { id: 'flick', name: 'Flick Flick', kind: 'Chrome extension', icon: 'flick', bg: 'linear-gradient(145deg,#ff375f,#a3002a)', desc: 'Jump back to your last tab in one keystroke, plus Arc and Zen-style productivity features for Chromium browsers.', feat: ['Last tab in one keystroke', 'Arc and Zen-style features', 'Works in Chromium browsers'], meta: ['Extension', 'Productivity', 'Free'], store: ['cws', 'https://chromewebstore.google.com/detail/flick-flick-%E2%80%94-last-tab-sw/ccjfgehimibjhjfbncilcfpdpnaibkml'], open: [['Add to Chrome', 'https://chromewebstore.google.com/detail/flick-flick-%E2%80%94-last-tab-sw/ccjfgehimibjhjfbncilcfpdpnaibkml']] },
  { g: 'Android and books' },
  { id: 'android', name: 'Android', kind: 'Seven apps on Google Play', folder: ['#5856D6', '#FF9500', '#34C759', '#FF2D55', '#0A84FF', '#1C1C1E', '#AF52DE', '#FFCC00', '#30B0C7'], desc: 'Android apps published under H24 Creationz on Google Play.', list: [['Confident Candidate', '#5856D6'], ['Aegan', '#FF9500'], ['I Am Antifragile', '#34C759'], ['Monster Affirmation', '#FF2D55'], ['TextHack', '#0A84FF'], ['Retro Shooter', '#1C1C1E']], feat: ['Published under H24 Creationz', 'Free to download', 'Apps, games and tools'], meta: ['Android', '7 apps', 'Free'], store: ['play', 'https://play.google.com/store/apps/dev?id=8039460198278259208'], open: [['Open on Google Play', 'https://play.google.com/store/apps/dev?id=8039460198278259208']] },
  { id: 'mf', name: 'Mind Feast', kind: 'Book by Harsha Varthan E P', book: 'MF', bg: 'linear-gradient(160deg,#F45D0A,#8E1A12)', desc: 'A short guide to building self-esteem and personal growth, with practical techniques for young people to stay productive and succeed in their goals. Published by H24 Creationz.', feat: ['Self-help and personal growth', 'Paperback and Kindle', 'Published by H24 Creationz'], meta: ['Book', '51 pages', 'Amazon'], store: ['amz', 'https://www.amazon.in/Mind-Feast-Rejuvenate-Your/dp/B08SCXDW8S'], open: [['View on Amazon', 'https://www.amazon.in/Mind-Feast-Rejuvenate-Your/dp/B08SCXDW8S']] },
  { id: 'ii', name: 'Inspiring Illusions', kind: 'Book by Harsha Varthan E P', book: 'II', bg: 'linear-gradient(160deg,#25B8F4,#0B3F8A)', desc: 'Unique quotes for unique people: short, original thoughts on motivation, friendship and success, to make each day a little brighter than the last.', feat: ['Original quotes', 'Paperback and Kindle', 'Published by H24 Creationz'], meta: ['Book', '126 pages', 'Amazon'], store: ['amz', 'https://www.amazon.in/INSPIRING-ILLUSIONS-UNIQUE-QUOTES-PEOPLE/dp/1639971033'], open: [['View on Amazon', 'https://www.amazon.in/INSPIRING-ILLUSIONS-UNIQUE-QUOTES-PEOPLE/dp/1639971033']] }
];
var DOCK = [
  { id: 'hub', name: 'App Hub', kind: 'H24 Nexus', icon: 'hub', bg: 'linear-gradient(145deg,#1c1c1e,#000)', desc: '20+ free web apps, tools and games in one place, plus client websites, product sites and extensions.', feat: ['Every app in one place', 'Free to use', 'Installable'], meta: ['Hub', '20+ apps', 'Free'], open: [['Open the app hub', 'https://harshavarthanep.github.io/apps/']] },
  { id: 'port', name: 'Founder', kind: 'Harsha Varthan E P', icon: 'user', bg: 'linear-gradient(145deg,#5E5CE6,#2F2C9B)', desc: 'The founder of H24 Creationz: project manager by trade, builder by habit. See the full portfolio of work.', feat: ['Client work and case studies', 'Career and skills', 'Contact details'], meta: ['Portfolio', 'Chennai', 'Open'], open: [['Open the portfolio', 'https://harshavarthanep.github.io/portfolio/?for=client']] },
  { id: 'brief', name: 'Start', kind: 'Start a project', icon: 'chat', bg: 'linear-gradient(145deg,#E3262E,#8E1A12)', action: '#contact' },
  { id: 'wa', name: 'WhatsApp', kind: 'Chat with us', icon: 'wa', bg: 'linear-gradient(145deg,#30D158,#128C3E)', href: 'https://wa.me/918667701001' }
];
var AMAP = {}; APPS.concat(DOCK).forEach(function (a) { if (a.id) AMAP[a.id] = a; });
function iconHTML(a, big) {
  if (a.folder) return '<span class="ic folder">' + a.folder.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>';
  if (a.book) return '<span class="ic book" style="background:' + a.bg + '">' + a.book + '</span>';
  return '<span class="ic' + (a.dark ? ' dark-glyph' : '') + '" style="background:' + a.bg + '">' + svgI(a.icon) + '</span>';
}

function badge(s) {
  if (s[0] === 'cws') return '<a href="' + s[1] + '" target="_blank" rel="noopener"><img src="' + CWS_IMG + '" alt="Available in the Chrome Web Store" width="206" height="58" loading="lazy"></a>';
  if (s[0] === 'play') return '<a href="' + s[1] + '" target="_blank" rel="noopener"><img src="' + PLAY_IMG + '" alt="Get it on Google Play" width="180" height="70" loading="lazy" style="height:64px;margin:-6px -8px"></a>';
  return '<a class="amz" href="' + s[1] + '" target="_blank" rel="noopener"><img src="' + AMZ_IMG + '" alt="Available at Amazon" width="96" height="48" loading="lazy" onerror="this.parentNode.outerHTML=\'<a class=&quot;pill&quot; href=&quot;' + s[1] + '&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;>Buy on Amazon</a>\'"></a>';
}


/* ---------- basics ---------- */
var toastEl = $('#toast'), tT;
function toast(m) { toastEl.textContent = m; toastEl.classList.add('on'); clearTimeout(tT); tT = setTimeout(function () { toastEl.classList.remove('on'); }, 2000); }
function copy(text, msg) { if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast(msg); }, function () { toast(text); }); else toast(text); }
function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
var qrReady = null; function qrLib() { if (!qrReady) qrReady = window.qrcode ? Promise.resolve() : loadScript('../assets/js/qrcode.min.js'); return qrReady; }
function drawQR(c, text, fg, bg, qz) { if (!window.qrcode || !text) return; var q = window.qrcode(0, 'M'); q.addData(unescape(encodeURIComponent(text))); q.make(); var n = q.getModuleCount(); qz = qz == null ? 2 : qz; var s = c.width, cell = s / (n + qz * 2), x = c.getContext('2d'); x.fillStyle = bg || '#fff'; x.fillRect(0, 0, s, s); x.fillStyle = fg || '#000'; for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) x.fillRect(Math.floor((k + qz) * cell), Math.floor((r + qz) * cell), Math.ceil(cell), Math.ceil(cell)); }
function goTo(sel) { var el = typeof sel === 'string' ? $(sel) : sel; if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: reduce ? 'auto' : 'smooth' }); }
document.addEventListener('click', function (e) { var a = e.target.closest('a[href^="#"]'); if (!a) return; var h = a.getAttribute('href'); var t = h === '#top' ? document.body : document.getElementById(h.slice(1)); if (!t) return; e.preventDefault(); if (h === '#top') window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); else goTo(t); });
function seg(el, i) { el.style.setProperty('--i', i); $$('button', el).forEach(function (b, k) { b.setAttribute('aria-checked', k === i ? 'true' : 'false'); }); }

/* ---------- theme switch ---------- */
var tsw = $('#themeSw'); tsw.checked = root.getAttribute('data-eff') === 'dark';
tsw.addEventListener('change', function () {
  var nx = tsw.checked ? 'dark' : 'light', r = tsw.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  function apply() { root.setAttribute('data-theme', nx); root.setAttribute('data-eff', nx); try { localStorage.setItem('h24-theme', nx); } catch (e) {} }
  if (document.startViewTransition && !reduce) { root.style.setProperty('--vx', x + 'px'); root.style.setProperty('--vy', y + 'px'); root.style.setProperty('--vr', Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 'px'); root.classList.add('vt'); document.startViewTransition(apply).finished.finally(function () { root.classList.remove('vt'); }); } else apply();
});

/* ---------- nav bar + tabs ---------- */
var nb = $('#nb'), h1 = $('.lt');
function navState() { var y = window.scrollY; nb.classList.toggle('flat', y < 8); nb.classList.toggle('titled', h1.getBoundingClientRect().bottom < 56); }
window.addEventListener('scroll', navState, { passive: true }); navState();
if ('IntersectionObserver' in window) {
  var tabs = $$('.tabbar a'), links = $$('.nb .links a');
  var spy = new IntersectionObserver(function (en) { en.forEach(function (e) { if (!e.isIntersecting) return; var id = e.target.id; var map = { work: 'work', services: 'work', kit: 'kit', qr: 'kit', check: 'kit', decode: 'kit', values: 'kit', words: 'work', apps: 'apps', about: 'apps', faq: 'contact', offers: 'contact', contact: 'contact', top: 'top' };
    tabs.forEach(function (t) { t.setAttribute('aria-current', t.dataset.tab === (map[id] || 'top') ? 'true' : 'false'); });
    links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false'); }); }); }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section').forEach(function (s) { if (!s.id) s.id = 'top'; spy.observe(s); });
}

/* ---------- sheets ---------- */
var sheet = $('#sheet'), lastF = null;
function openSheet(title, html) {
  sheet.innerHTML = '<div class="grab" aria-hidden="true"><i></i></div><div class="sh-top"><h3>' + title + '</h3><button class="done" data-close>Done</button></div><div class="sh-body">' + html + '</div>';
  lastF = document.activeElement; sheet.showModal ? sheet.showModal() : sheet.setAttribute('open', ''); document.body.style.overflow = 'hidden'; dragClose(sheet);
}
function closeSheet(d) { d = d || sheet; if (!d.open) return; d.classList.add('closing'); setTimeout(function () { d.classList.remove('closing'); d.style.transform = ''; d.close ? d.close() : d.removeAttribute('open'); }, reduce ? 0 : 280); }
[sheet, $('#appSheet')].forEach(function (d) {
  d.addEventListener('close', function () { document.body.style.overflow = ''; if (lastF) lastF.focus(); });
  d.addEventListener('cancel', function (e) { e.preventDefault(); closeSheet(d); });
  d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-close]')) closeSheet(d); });
});
function dragClose(d) {
  var g = $('.grab', d); if (!g) return; var y0 = 0, dy = 0, on = false;
  g.addEventListener('pointerdown', function (e) { on = true; y0 = e.clientY; dy = 0; g.setPointerCapture(e.pointerId); d.style.transition = 'none'; });
  g.addEventListener('pointermove', function (e) { if (!on) return; dy = Math.max(0, e.clientY - y0); d.style.transform = 'translateY(' + dy + 'px)'; });
  g.addEventListener('pointerup', function () { if (!on) return; on = false; d.style.transition = 'transform .35s cubic-bezier(.16,1,.3,1)'; if (dy > 110) closeSheet(d); else d.style.transform = ''; });
}

/* ---------- brief state ---------- */
var SVCS = {}, ORD = [];
SVC_GROUPS.forEach(function (g) { g[1].forEach(function (s) { SVCS[s[0]] = s[1]; ORD.push(s[0]); }); });
var brief = {}, extras = {}, kitList = [], stage = '', when = '';
var STAGES = { 'new': 'Starting a brand', re: 'Rebranding', grow: 'Growing', launch: 'Launching a product' };
function picked() { return ORD.filter(function (k) { return brief[k]; }); }
function sync() { $$('[data-svc]').forEach(function (b) { b.setAttribute('aria-pressed', brief[b.dataset.svc] ? 'true' : 'false'); }); compose(); }
document.addEventListener('click', function (e) { var b = e.target.closest('[data-svc]'); if (!b) return; var k = b.dataset.svc; if (brief[k]) delete brief[k]; else { brief[k] = 1; if (!b.classList.contains('tok')) toast(SVCS[k] + ' added'); } sync(); });

/* ---------- Today cards ---------- */
var frames = $$('.frame-src .frame'), today = $('#today');
today.innerHTML = frames.map(function (f) { return '<button class="tcard" data-proj="' + f.dataset.id + '">' + $('.cover', f).outerHTML + '<div class="cap"><small>' + $('.ind', f).textContent + '</small><b>' + $('.fcap h3', f).textContent + '</b></div></button>'; }).join('');
function openProject(id) {
  var f = $('.frame-src .frame[data-id="' + id + '"]'); if (!f) return;
  openSheet(f.dataset.name, '<div class="cover-wrap">' + $('.cover', f).outerHTML + '</div>' + $('.detail', f).innerHTML.replace('class="detail"', ''));
  $$('.btn-ghost,.btn-red', sheet).forEach(function () {});
}
document.addEventListener('click', function (e) { var c = e.target.closest('[data-proj]'); if (c) openProject(c.dataset.proj); var s = e.target.closest('[data-similar]'); if (s) { s.dataset.similar.split(',').forEach(function (k) { brief[k] = 1; }); sync(); closeSheet(); setTimeout(function () { goTo('#contact'); }, 300); } var o = e.target.closest('[data-open]'); if (o) openProject(o.dataset.open); });

/* ---------- Services ---------- */
var SCOL = ['#FF9500', '#007AFF', '#FF3B30', '#AF52DE', '#34C759'];
$('#svcGroup').innerHTML = SERV.map(function (s, i) { return '<button class="row" data-serv="' + i + '"><span class="ico" style="background:' + SCOL[i] + '">' + s.icon + '</span><span class="tx"><b>' + s.title + '</b><small>' + s.sub + '</small></span>' + CHEV + '</button>'; }).join('');
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-serv]'); if (!b) return; var s = SERV[+b.dataset.serv];
  var h = '<p class="lead">' + s.sub + ' ' + s.pain + '</p><div class="group plain">' + s.dels.map(function (d) { return '<label class="row"><span class="tx"><b>' + d + '</b></span><input class="sw" type="checkbox" data-del="' + esc(d) + '" data-dsvc="' + s.svc + '"' + (extras[d] ? ' checked' : '') + '></label>'; }).join('') + '</div>';
  h += '<p class="foot-note" style="margin:18px 4px 8px">How it works</p><div class="group plain">' + s.steps.map(function (x, k) { return '<div class="row"><span class="ico" style="background:' + SCOL[+b.dataset.serv] + ';border-radius:50%;font-weight:700">' + (k + 1) + '</span><span class="tx"><b>' + x + '</b></span></div>'; }).join('') + '</div>';
  h += '<div class="pd-acts"><button class="btn btn-fill" data-go="' + s.svc + '">Add to brief</button>' + (s.proof[0].charAt(0) === '#' ? '' : '<button class="btn btn-gray" data-open="' + s.proof[0] + '">' + s.proof[1] + '</button>') + '</div>';
  openSheet(s.title, h);
});
sheet.addEventListener('change', function (e) { var c = e.target.closest('[data-del]'); if (!c) return; if (c.checked) { extras[c.dataset.del] = 1; brief[c.dataset.dsvc] = 1; } else delete extras[c.dataset.del]; sync(); });
sheet.addEventListener('click', function (e) { var g = e.target.closest('[data-go]'); if (g) { brief[g.dataset.go] = 1; sync(); closeSheet(); toast('Added to your brief'); setTimeout(function () { goTo('#contact'); }, 300); } });

/* ---------- Brand kit wallet ---------- */
var bb = { stage: 'new', pal: 0, sel: PRESET['new'].slice(), open: false };
var KCOL = ['#FF9500', '#FF3B30', '#AF52DE', '#007AFF', '#34C759', '#5856D6', '#FF2D55', '#30B0C7'];
$('#pals').innerHTML = PALS.map(function (p, i) { return '<button role="radio" aria-checked="' + (i === 0) + '" aria-label="' + p[0] + '" data-pal="' + i + '" style="background:conic-gradient(' + p[1] + ' 0 50%,' + p[2] + ' 50% 80%,' + p[3] + ' 80%)"></button>'; }).join('');
$('#kitItems').innerHTML = KIT.map(function (k, i) { return '<label class="row"><span class="ico" style="background:' + KCOL[i % KCOL.length] + '">' + (k[1][0]) + '</span><span class="tx"><b>' + k[1] + '</b></span><input class="sw" type="checkbox" data-kit="' + k[0] + '"></label>'; }).join('');
function vals() { var nm = ($('#bbName').value || 'Your Brand').trim() || 'Your Brand', w = nm.split(/\s+/), slug = nm.toLowerCase().replace(/[^a-z0-9]+/g, ''); return { name: nm, init: (w[0][0] + (w[1] ? w[1][0] : (w[0][1] || ''))).toUpperCase(), handle: '@' + slug, domain: slug + '.in' }; }
var SUB = { name: function (v) { return 'Name and wordmark'; }, logo: function () { return 'Primary mark and icon'; }, tag: function () { return TAGS[bb.stage]; }, col: function () { return 'Palette and typefaces'; }, web: function (v) { return v.domain; }, card: function (v) { return 'Scan to visit ' + v.domain; }, soc: function (v) { return v.handle; }, maps: function () { return 'Open now · Directions'; }, bro: function () { return 'Tri-fold, print ready'; }, let: function () { return 'Letterhead and envelopes'; }, pack: function () { return 'Box and labels'; }, sign: function () { return 'Shopfront and indoor'; }, mail: function (v) { return 'hello@' + v.domain; }, deck: function () { return 'Investor and sales deck'; }, vid: function () { return '15s, 30s and reels'; }, des: function () { return 'Posters and posts'; } };
function shade(hex, f) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; r = Math.round(r + (f > 0 ? (255 - r) * f : r * f)); g = Math.round(g + (f > 0 ? (255 - g) * f : g * f)); b = Math.round(b + (f > 0 ? (255 - b) * f : b * f)); return 'rgb(' + r + ',' + g + ',' + b + ')'; }
var stackw = $('#stackw');
function renderWallet(animate) {
  var v = vals(), p = PALS[bb.pal], order = KIT.map(function (k) { return k[0]; }).filter(function (k) { return bb.sel.indexOf(k) > -1; });
  $('#walletT').textContent = v.name; $('#kitN').textContent = order.length;
  $$('[data-kit]').forEach(function (c) { c.checked = bb.sel.indexOf(c.dataset.kit) > -1; });
  if (!order.length) { stackw.innerHTML = '<p class="empty">Switch on any piece to add it to your wallet.</p>'; stackw.style.height = 'auto'; return; }
  var cols = [p[1], p[2], shade(p[1], -.25), shade(p[2], .18)];
  stackw.innerHTML = order.map(function (k, i) {
    var bg = cols[i % cols.length];
    return '<div class="pass' + (animate ? ' enter' : '') + '" data-pk="' + k + '" style="background:' + bg + ';animation-delay:' + (i * 50) + 'ms;z-index:' + (i + 1) + '"><div class="top"><span>' + KMAP[k][1] + '</span><i>' + v.init + '</i></div><div><div class="nm">' + esc(v.name) + '</div><div class="sm">' + esc(SUB[k](v)) + '</div></div>' + (k === 'card' ? '<div class="qr"><canvas width="112" height="112"></canvas></div>' : '') + '</div>';
  }).join('');
  layoutWallet();
  var c = $('.pass .qr canvas', stackw); if (c) qrLib().then(function () { drawQR(c, 'https://' + v.domain, '#000', '#fff', 1); });
}
function layoutWallet() { var ps = $$('.pass', stackw), gap = bb.open ? 200 : 46; ps.forEach(function (el, i) { el.style.transform = 'translateY(' + (i * gap) + 'px)'; }); stackw.style.height = ps.length ? ((ps.length - 1) * gap + 190) + 'px' : 'auto'; }
stackw.addEventListener('click', function () { bb.open = !bb.open; layoutWallet(); });
$('#kitItems').addEventListener('change', function (e) { var c = e.target.closest('[data-kit]'); if (!c) return; var k = c.dataset.kit, i = bb.sel.indexOf(k); if (c.checked && i < 0) bb.sel.push(k); if (!c.checked && i > -1) bb.sel.splice(i, 1); renderWallet(false); });
$$('#stageSeg button').forEach(function (b, i) { b.addEventListener('click', function () { seg($('#stageSeg'), i); bb.stage = b.dataset.stage; bb.sel = PRESET[bb.stage].slice(); renderWallet(true); }); });
$$('#pals button').forEach(function (b) { b.addEventListener('click', function () { bb.pal = +b.dataset.pal; $$('#pals button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); renderWallet(false); }); });
$('#bbName').addEventListener('input', function () { renderWallet(false); });
$('#kitSend').addEventListener('click', function () { if (!bb.sel.length) { toast('Add at least one piece first.'); return; } kitList = bb.sel.map(function (k) { return KMAP[k][1]; }); bb.sel.forEach(function (k) { brief[KMAP[k][3]] = 1; }); setStage(bb.stage); if (!$('#fBiz').value.trim()) $('#fBiz').value = $('#bbName').value.trim(); sync(); toast('Kit added to your brief'); goTo('#contact'); });
renderWallet(true);

/* ---------- QR pass ---------- */
(function () {
  var type = 'wa', cv = $('#qrCanvas'), F = { name: $('#qName'), role: $('#qRole'), phone: $('#qPhone'), web: $('#qWeb') };
  var SUBS = { wa: 'Scan to chat on WhatsApp', web: 'Scan to open the website', vcard: 'Scan to save the contact' };
  function data() { var ph = F.phone.value.replace(/[^\d+]/g, ''), w = F.web.value.trim(); if (w && !/^https?:\/\//i.test(w)) w = 'https://' + w; if (type === 'wa') return ph.replace(/\D/g, '') ? 'https://wa.me/' + ph.replace(/\D/g, '') : ''; if (type === 'web') return w; return 'BEGIN:VCARD\nVERSION:3.0\nFN:' + F.name.value.trim() + '\nTITLE:' + F.role.value.trim() + '\nTEL;TYPE=CELL:' + ph + (w ? '\nURL:' + w : '') + '\nEND:VCARD'; }
  function render() { $('#pName').textContent = F.name.value.trim() || 'Your name'; $('#pRole').textContent = F.role.value.trim(); $('#pPhone').textContent = F.phone.value.trim(); $('#qrSub').textContent = SUBS[type]; qrLib().then(function () { drawQR(cv, data(), '#000', '#fff', 1); }); }
  Object.keys(F).forEach(function (k) { F[k].addEventListener('input', render); });
  $$('#qrSeg button').forEach(function (b, i) { b.addEventListener('click', function () { seg($('#qrSeg'), i); type = b.dataset.q; render(); }); });
  $('#qrDl').addEventListener('click', function () { qrLib().then(function () { var big = document.createElement('canvas'); big.width = big.height = 1024; drawQR(big, data(), '#000', '#fff', 4); big.toBlob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'qr-' + (F.name.value.trim() || 'card').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png'; document.body.appendChild(a); a.click(); a.remove(); toast('QR downloaded'); }); }); });
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { render(); io.disconnect(); } }, { rootMargin: '400px' }); io.observe($('#qr')); } else render();
})();

/* ---------- Findability ring ---------- */
(function () {
  var Q = [['Your business has its own website.', 'Get a fast website you own and control.'], ['It looks right and loads quickly on a phone.', 'Make the site quick and easy on phones.'], ['Your Google Business Profile is complete.', 'Complete your Google Business Profile so you show up on Maps.'], ['Your name, address and phone match everywhere.', 'Make your details match everywhere, so Google and AI trust them.'], ['Each service has its own page.', 'Give each service its own page.'], ['Your site answers questions customers ask.', 'Answer the questions customers ask before buying.'], ['Customers can WhatsApp you in one tap.', 'Add one-tap WhatsApp and call buttons.'], ['You have recent reviews, and reply to them.', 'Ask for reviews and reply to every one.']];
  var box = $('#qs'); box.innerHTML = Q.map(function (q, i) { return '<label class="row"><span class="tx"><b>' + q[0] + '</b></span><input class="sw" type="checkbox" data-q="' + i + '"></label>'; }).join('');
  var fg = $('#ringFg'), C = 345.6, touched = false;
  box.addEventListener('change', function () {
    touched = true; var on = $$('input', box).filter(function (c) { return c.checked; }).length, miss = $$('input', box).filter(function (c) { return !c.checked; });
    fg.style.strokeDashoffset = (C * (1 - on / 8)).toFixed(1); $('#ringN').innerHTML = on + '<small>/8</small>';
    $('#ringT').textContent = on <= 3 ? 'Customers will struggle to find you.' : on <= 6 ? "You're findable, not yet the obvious choice." : on === 7 ? 'Nearly closed.' : 'Ring closed. Great work.';
    $('#ringP').textContent = on === 8 ? 'Keep it that way with fresh content and updates.' : 'Fix these first:';
    $('#ringGaps').innerHTML = miss.slice(0, 3).map(function (c) { return '<li>' + Q[+c.dataset.q][1] + '</li>'; }).join('');
    $('#gapCta').hidden = false;
  });
  $('#gapCta').addEventListener('click', function () { var on = $$('input', box).filter(function (c) { return c.checked; }).length, miss = $$('input', box).filter(function (c) { return !c.checked; }); brief.seo = 1; brief.geo = 1; brief.maps = 1; var m = $('#fMsg'); if (!m.value.trim()) m.value = 'My findability score: ' + on + ' of 8.' + (miss.length ? '\nWhat I want to fix:\n' + miss.map(function (c) { return '- ' + Q[+c.dataset.q][1]; }).join('\n') : ''); sync(); goTo('#contact'); });
})();

/* ---------- Decode slider ---------- */
(function () {
  var L = [['Paper', 'Space to think', '#C7C7CC'], ['Frame', 'Structure', '#8E8E93'], ['Ink', 'Foundation', '#1C1C1E'], ['Fire', 'Creation', '#FF9500'], ['Water', 'Clarity and flow', '#0A84FF']];
  $('#layerList').innerHTML = L.map(function (l, i) { return '<div class="row" data-l="' + i + '"><span class="ico" style="background:' + l[2] + '">' + (i + 1) + '</span><span class="tx"><b>' + l[0] + '</b><small>' + l[1] + '</small></span></div>'; }).join('');
  var r = $('#decR'), st = $('#dstack'), imgs = $$('img', st), rows = $$('#layerList .row'), playing = 0;
  function apply() {
    var e = r.value / 100, ee = e < .5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2; r.style.setProperty('--p', r.value + '%');
    st.style.transform = 'rotateX(' + (55 * ee).toFixed(1) + 'deg) rotateZ(' + (-35 * ee).toFixed(1) + 'deg) scale(' + (1 - .12 * ee).toFixed(3) + ')';
    var act = e > .15 ? Math.min(4, Math.floor((e - .15) / .17)) : -1;
    imgs.forEach(function (im, i) { im.style.transform = 'translateZ(' + ((i - 2) * 80 * ee + (i === act ? 30 * ee : 0)).toFixed(1) + 'px)'; });
    rows.forEach(function (row, i) { row.classList.toggle('on', i === act); });
  }
  r.addEventListener('input', apply);
  $('#decPlay').addEventListener('click', function () { if (playing) return; var t0 = performance.now(); playing = 1; (function f(t) { var k = (t - t0) / 3200; r.value = Math.round((k < .5 ? k * 2 : 2 - k * 2) * 100); apply(); if (k < 1) requestAnimationFrame(f); else { r.value = 0; apply(); playing = 0; } })(t0); });
  apply();
})();

/* ---------- Values ---------- */
(function () {
  var V = [['Clarity', 'Customers understand what you do in five seconds.', ['One clear promise', 'A simple name and tagline', 'Service pages that answer real questions']], ['Consistency', 'You look and sound the same everywhere.', ['One logo, palette and typeface', 'Templates for social and print', 'The same details on web, Maps and socials']], ['Credibility', 'Proof that you deliver what you promise.', ['Real reviews, and replies', 'Case stories with results', 'A fast, secure website']], ['Character', 'A personality people remember.', ['A voice that sounds like you', 'Visuals that stand apart', 'Stories only you can tell']]];
  var sg = $('#valSeg'), card = $('#valCard');
  function show(i) { seg(sg, i); var v = V[i]; card.innerHTML = '<div class="fade"><h3>' + v[0] + '</h3><p>' + v[1] + '</p><ul>' + v[2].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>'; }
  $$('button', sg).forEach(function (b, i) { b.addEventListener('click', function () { show(i); }); }); show(0);
})();

/* ---------- Springboard ---------- */
$('#springs').innerHTML = APPS.map(function (a) { if (a.g) return '<span class="grp-lb" role="presentation">' + a.g + '</span>'; return '<button class="app" role="listitem" data-app="' + a.id + '" aria-label="' + esc(a.name) + '">' + iconHTML(a) + '<span>' + a.name + '</span></button>'; }).join('');
$('#dock').innerHTML = DOCK.map(function (a) { return '<button class="app" role="listitem" data-app="' + a.id + '" aria-label="' + esc(a.name) + '">' + iconHTML(a) + '<span>' + a.name + '</span></button>'; }).join('');
var asheet = $('#appSheet');
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-app]'); if (!b) return; var a = AMAP[b.dataset.app]; if (!a) return;
  if (a.action) { goTo(a.action); return; } if (a.href) { window.open(a.href, '_blank', 'noopener'); return; }
  var h = '<div class="grab" aria-hidden="true"><i></i></div><div class="as-hd">' + iconHTML(a) + '<div><h3>' + a.name + '</h3><p>' + a.kind + '</p><div class="get">' + a.open.map(function (o, k) { return '<a class="pill' + (k ? ' ghost' : '') + '" href="' + o[1] + '" target="_blank" rel="noopener">' + o[0] + '</a>'; }).join('') + '</div></div></div>';
  h += '<div class="as-meta">' + ['Type', 'Category', a.book ? 'Store' : 'Price'].map(function (lb, k) { return '<div><small>' + lb.toUpperCase() + '</small><b>' + a.meta[k] + '</b></div>'; }).join('') + '</div><div class="as-body"><p>' + a.desc + '</p>';
  if (a.list) h += '<ul class="as-list">' + a.list.map(function (l) { return '<li><i style="background:' + l[1] + '">' + l[0][0] + '</i>' + l[0] + '</li>'; }).join('') + '</ul>';
  h += '<ul class="feat">' + (a.feat || []).map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>';
  if (a.store) h += '<div class="as-store">' + badge(a.store) + '</div>';
  if (a.book) h += '<p class="legal">Amazon\'s trademark is used under license from Amazon.com, Inc. or its affiliates.</p>';
  asheet.innerHTML = h + '<div style="padding:0 28px 28px"><button class="btn btn-gray" data-close style="width:100%">Close</button></div></div>';
  lastF = document.activeElement; asheet.showModal ? asheet.showModal() : asheet.setAttribute('open', ''); document.body.style.overflow = 'hidden'; dragClose(asheet);
});
function iosTime() { var d = new Date(), h = d.getHours(), m = d.getMinutes(); $('#iosTime').textContent = ((h + 11) % 12 + 1) + ':' + (m < 10 ? '0' : '') + m; } iosTime(); setInterval(iosTime, 30000);

/* ---------- FAQ ---------- */
var FAQ = [['Can you build a brand completely from scratch?', 'Yes. Name, logo, tagline, colours, website, brochure, business cards with QR, social media and a Google Maps listing, designed as one kit.'], ['Can you refresh our brand without losing what people know?', 'Yes. We keep what customers recognise and fix what holds you back.'], ['What is GEO?', 'Generative engine optimization makes your business easier for AI tools like ChatGPT, Gemini and Google AI Overviews to find, understand and recommend.'], ['Can you get my business on Google Maps?', 'Yes. We set up or fix your Google Business Profile with correct details, categories, photos and services.'], ['How much does a project cost?', 'Every project is quoted in writing after a short conversation. You approve scope, dates and cost before any work starts.'], ['Do you work outside Chennai?', 'Yes, over calls, WhatsApp and email. OCB, for example, is in the USA.'], ['Who owns the website and files?', 'You do. Domain, files and logins are in your name.']];
$('#faqList').innerHTML = FAQ.map(function (f) { return '<details class="row" style="display:block"><summary style="list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:500">' + f[0] + CHEV + '</summary><p style="color:var(--sec);margin-top:8px">' + f[1] + '</p></details>'; }).join('');

/* ---------- Contact ---------- */
$('#stageToks').innerHTML = Object.keys(STAGES).map(function (k) { return '<button type="button" class="tok" role="radio" aria-checked="false" data-stage="' + k + '">' + STAGES[k] + '</button>'; }).join('');
$('#svcToks').innerHTML = SVC_GROUPS.map(function (g) { return '<span class="tgrp">' + g[0] + '</span>' + g[1].map(function (s) { return '<button type="button" class="tok" data-svc="' + s[0] + '" aria-pressed="false">' + (s[2] ? '<span class="hot"></span>' : '') + s[1] + '</button>'; }).join(''); }).join('');
var WHEN = ['As soon as possible', 'In 1 to 2 months', 'Just exploring'];
$('#whenToks').innerHTML = WHEN.map(function (w) { return '<button type="button" class="tok" role="radio" aria-checked="false" data-when="' + w + '">' + w + '</button>'; }).join('');
function setStage(s) { stage = s; $$('[data-stage]', $('#stageToks')).forEach(function (b) { b.setAttribute('aria-checked', b.dataset.stage === s ? 'true' : 'false'); }); compose(); }
$('#stageToks').addEventListener('click', function (e) { var b = e.target.closest('[data-stage]'); if (b) setStage(stage === b.dataset.stage ? '' : b.dataset.stage); });
$('#whenToks').addEventListener('click', function (e) { var b = e.target.closest('[data-when]'); if (!b) return; when = when === b.dataset.when ? '' : b.dataset.when; $$('[data-when]').forEach(function (x) { x.setAttribute('aria-checked', x.dataset.when === when ? 'true' : 'false'); }); compose(); });
var fName = $('#fName'), fBiz = $('#fBiz'), fCity = $('#fCity'), fMsg = $('#fMsg'), err = $('#err');
function message() { var L = ['Hi H24 Creationz,', "I'm " + (fName.value.trim() || '[your name]') + (fBiz.value.trim() ? ' from ' + fBiz.value.trim() : '') + (fCity.value.trim() ? ' in ' + fCity.value.trim() : '') + '.']; if (stage) L.push('Where I am: ' + STAGES[stage].toLowerCase() + '.'); var l = picked().map(function (k) { return SVCS[k]; }); if (l.length) L.push('I need: ' + l.join(', ') + '.'); if (kitList.length) L.push('Brand kit: ' + kitList.join(', ') + '.'); var ex = Object.keys(extras); if (ex.length) L.push('Details: ' + ex.join(', ') + '.'); if (when) L.push('Timing: ' + when + '.'); if (fMsg.value.trim()) L.push('', fMsg.value.trim()); return L.join('\n'); }
function compose() { $('#bubble').textContent = message(); }
[fName, fBiz, fCity, fMsg].forEach(function (i) { i.addEventListener('input', function () { err.textContent = ''; compose(); }); });
function valid() { if (!fName.value.trim()) { err.textContent = 'Add your name so we know who is writing.'; fName.focus(); return false; } if (!picked().length && !kitList.length && !stage && !fMsg.value.trim()) { err.textContent = 'Pick what you need, or write a line about your project.'; return false; } return true; }
var via = 'wa'; $$('#brief [data-via]').forEach(function (b) { b.addEventListener('click', function () { via = b.dataset.via; }); });
$('#brief').addEventListener('submit', function (e) { e.preventDefault(); if (!valid()) return; var m = message(); if (via === 'mail') location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Project enquiry') + '&body=' + encodeURIComponent(m); else window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(m), '_blank', 'noopener'); via = 'wa'; });
$('#copyMsg').addEventListener('click', function () { if (valid()) copy(message(), 'Message copied'); });
$('#copyMail').addEventListener('click', function () { copy(MAIL, 'Email address copied'); });
$('#yr').textContent = new Date().getFullYear();
compose();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) window.addEventListener('load', function () { navigator.serviceWorker.register('../sw.js', { scope: '../' }).catch(function () {}); });
})();
