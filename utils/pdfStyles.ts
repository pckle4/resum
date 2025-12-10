


export const commonPdfStyles = `
  /* Reset and Base for PDF Generation */
  * {
    box-sizing: border-box !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  body, html {
    margin: 0 !important;
    padding: 0 !important;
    background: white;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  
  /* Remove default margins for print */
  @page {
    margin: 0;
    size: auto;
  }
`;

export const modernPdfStyles = `
  /* 
   * HIGH-FIDELITY MODERN TEMPLATE STYLES
   * Hardcoded values to ensure PDF rendering matches the preview exactly.
   * Dimensions are based on A4 width ~794px.
   */

  /* --- LAYOUT STRUCTURE --- */

  .modern-template {
    width: 794px !important;
    min-width: 794px !important;
    max-width: 794px !important;
    min-height: 1120px !important;
    background-color: #ffffff !important;
    font-family: 'Inter', sans-serif !important;
    color: #1e293b !important;
    display: flex !important;
    flex-direction: column !important;
    position: relative !important;
    overflow: hidden !important;
  }

  /* --- HEADER SECTION --- */

  .modern-header {
    background-color: #0f172a !important; /* slate-900 */
    color: #ffffff !important;
    padding: 40px 48px !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 32px !important;
    border-bottom: 1px solid #334155 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    flex-shrink: 0 !important;
  }

  .modern-header-avatar {
    width: 100px !important;
    height: 100px !important;
    border-radius: 50% !important;
    border: 3px solid #334155 !important;
    overflow: hidden !important;
    background-color: #f1f5f9 !important;
    flex-shrink: 0 !important;
    display: block !important;
  }

  .modern-header-avatar img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  .modern-header-content {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }

  .modern-name {
    font-family: 'Inter', sans-serif !important;
    font-size: 34px !important;
    font-weight: 800 !important;
    color: #ffffff !important;
    text-transform: uppercase !important;
    letter-spacing: 1.5px !important;
    line-height: 1.1 !important;
    margin: 0 0 8px 0 !important;
  }

  .modern-title {
    font-family: 'Inter', sans-serif !important;
    font-size: 16px !important;
    color: #cbd5e1 !important; /* slate-300 */
    font-weight: 500 !important;
    margin: 0 0 16px 0 !important;
    letter-spacing: 0.5px !important;
  }

  /* Contact Info */
  .modern-contact {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 16px !important;
    margin-top: 4px !important;
  }

  .modern-contact-item {
    font-size: 11px !important;
    color: #cbd5e1 !important; /* slate-300 */
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    line-height: 1.4 !important;
    white-space: nowrap !important;
  }

  /* Icons inside contact items */
  .modern-contact-item svg {
    width: 12px !important;
    height: 12px !important;
    color: #94a3b8 !important; /* slate-400 */
  }

  /* Coding Profiles */
  .modern-coding-profiles {
    margin-top: 14px !important;
    padding-top: 14px !important;
    border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 16px !important;
    font-size: 11px !important;
    color: #94a3b8 !important; /* slate-400 */
  }
  
  .modern-coding-profiles svg {
    width: 12px !important;
    height: 12px !important;
  }

  /* --- BODY CONTENT --- */

  .modern-body {
    display: flex !important;
    flex-direction: row !important;
    flex: 1 !important;
    align-items: stretch !important;
    background-color: #ffffff !important;
  }

  /* Main Column (Left) */
  .modern-main {
    width: 65% !important;
    min-width: 65% !important;
    padding: 40px !important;
    border-right: 1px solid #f1f5f9 !important;
    background-color: #ffffff !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 28px !important;
    flex-shrink: 0 !important;
  }

  /* Sidebar (Right) */
  .modern-sidebar {
    width: 35% !important;
    min-width: 35% !important;
    padding: 40px 32px !important;
    background-color: #f8fafc !important; /* slate-50 */
    border-left: 1px solid #e2e8f0 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 28px !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    flex-shrink: 0 !important;
  }

  /* --- SECTIONS --- */

  .modern-section {
    position: relative !important;
    width: 100% !important;
  }

  .modern-section-title {
    font-family: 'Inter', sans-serif !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    color: #0f172a !important; /* slate-900 */
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    border-bottom: 2px solid #0f172a !important;
    padding-bottom: 8px !important;
    margin-bottom: 16px !important;
    display: block !important;
  }

  /* --- ITEMS --- */

  .modern-item {
    margin-bottom: 20px !important;
    page-break-inside: avoid !important;
  }
  
  .modern-item:last-child {
    margin-bottom: 0 !important;
  }

  .modern-item-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: flex-end !important;
    margin-bottom: 4px !important;
    width: 100% !important;
  }

  .modern-item-title {
    font-family: 'Inter', sans-serif !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #1e293b !important; /* slate-800 */
    line-height: 1.3 !important;
  }

  .modern-item-date {
    font-family: 'Inter', sans-serif !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    color: #64748b !important; /* slate-500 */
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    white-space: nowrap !important;
    text-align: right !important;
    margin-left: 16px !important;
  }

  .modern-item-subtitle {
    font-family: 'Inter', sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #2563eb !important; /* blue-600 */
    margin-bottom: 8px !important;
    display: block !important;
  }

  /* --- RICH TEXT CONTENT --- */

  .modern-text {
    font-family: 'Inter', sans-serif !important;
    font-size: 12px !important;
    color: #334155 !important; /* slate-700 */
    line-height: 1.65 !important;
    text-align: justify !important;
    font-weight: 400 !important;
  }

  .modern-text p {
    margin-bottom: 6px !important;
  }

  .modern-text ul {
    list-style-type: disc !important;
    padding-left: 18px !important;
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }
  
  .modern-text ol {
    list-style-type: decimal !important;
    padding-left: 18px !important;
    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }

  .modern-text li {
    margin-bottom: 4px !important;
    padding-left: 4px !important;
  }
  
  .modern-text strong {
    font-weight: 700 !important;
    color: #1e293b !important;
  }

  /* --- SIDEBAR OVERRIDES --- */

  .modern-sidebar .modern-section-title {
    border-bottom-color: #cbd5e1 !important; /* lighter border */
    color: #334155 !important;
  }

  .modern-sidebar .modern-item-title {
    font-size: 14px !important;
  }

  .modern-sidebar .modern-item-subtitle {
    font-size: 12px !important;
    color: #475569 !important; /* slate-600 */
    font-style: italic !important;
  }

  .modern-sidebar .modern-item-date {
    font-size: 10px !important;
    color: #94a3b8 !important; /* slate-400 */
    text-transform: none !important;
    font-weight: 500 !important;
    margin-left: 0 !important;
    display: block !important;
    margin-top: 2px !important;
    text-align: left !important;
  }
  
  .modern-sidebar .modern-item-title svg {
    color: #ca8a04 !important; /* yellow-600 */
    margin-right: 4px !important;
    width: 12px !important;
    height: 12px !important;
    display: inline-block !important;
  }

  .modern-tag {
    display: inline-block !important;
    background-color: #e2e8f0 !important;
    color: #334155 !important; /* slate-700 */
    font-size: 11px !important;
    font-weight: 600 !important;
    padding: 6px 10px !important;
    border-radius: 6px !important;
    margin: 0 6px 6px 0 !important;
    border: 1px solid #cbd5e1 !important;
  }
  
  .modern-sidebar ul.space-y-1 li {
    font-size: 12px !important;
    color: #475569 !important;
    margin-bottom: 4px !important;
  }

  a {
    text-decoration: none !important;
    color: inherit !important;
  }
  
  svg {
    display: inline-block !important;
    vertical-align: middle !important;
  }
`;

export const minimalistPdfStyles = `
  /* 
   * HIGH-FIDELITY MINIMALIST TEMPLATE STYLES
   * Hardcoded values to ensure PDF rendering matches the preview exactly.
   */

  .minimalist-template {
    width: 794px !important;
    min-width: 794px !important;
    max-width: 794px !important;
    min-height: 1120px !important;
    background-color: #ffffff !important;
    color: #1f2937 !important; /* gray-800 */
    padding: 60px !important; /* p-12 equiv approx */
    font-family: 'Merriweather', serif !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 32px !important;
  }

  /* Header */
  .minimalist-header {
    border-bottom: 2px solid #1f2937 !important;
    padding-bottom: 24px !important;
    margin-bottom: 8px !important;
    flex-shrink: 0 !important;
    display: block !important;
    position: relative !important;
  }

  .minimalist-header-top {
    display: flex !important;
    justify-content: space-between !important;
    align-items: flex-start !important;
  }

  .minimalist-name {
    font-family: 'Merriweather', serif !important;
    font-size: 36px !important;
    font-weight: 700 !important;
    color: #111827 !important; /* gray-900 */
    margin: 0 0 8px 0 !important;
    line-height: 1.1 !important;
  }

  .minimalist-title {
    font-family: 'Merriweather', serif !important;
    font-size: 18px !important;
    color: #4b5563 !important; /* gray-600 */
    font-style: italic !important;
    margin-bottom: 16px !important;
  }

  .minimalist-avatar {
    width: 80px !important;
    height: 80px !important;
    background-color: #f3f4f6 !important;
    filter: grayscale(100%) !important;
    border: 1px solid #e5e7eb !important;
    overflow: hidden !important;
  }

  .minimalist-avatar img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .minimalist-contact {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 12px !important; /* gap-x-4 */
    font-family: 'Inter', sans-serif !important;
    font-size: 12px !important;
    color: #4b5563 !important;
    margin-top: 8px !important;
  }

  .minimalist-coding {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 12px !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 12px !important;
    color: #6b7280 !important; /* gray-500 */
    margin-top: 8px !important;
  }

  /* Sections */
  .minimalist-section {
    margin-bottom: 8px !important;
    width: 100% !important;
  }

  .minimalist-section-title {
    font-family: 'Inter', sans-serif !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    color: #9ca3af !important; /* gray-400 */
    text-transform: uppercase !important;
    letter-spacing: 2.5px !important; /* tracking-widest */
    margin-bottom: 16px !important;
    border-bottom: 1px solid #f3f4f6 !important;
    padding-bottom: 4px !important;
    display: block !important;
  }

  /* Items */
  .minimalist-item {
    margin-bottom: 20px !important;
    page-break-inside: avoid !important;
  }

  .minimalist-item-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: baseline !important;
    margin-bottom: 4px !important;
    font-family: 'Inter', sans-serif !important;
  }

  .minimalist-item-company {
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #111827 !important;
  }

  .minimalist-item-date {
    font-size: 11px !important;
    color: #6b7280 !important; /* gray-500 */
    white-space: nowrap !important;
  }

  .minimalist-item-position {
    font-size: 14px !important;
    color: #4b5563 !important;
    font-style: italic !important;
    margin-bottom: 8px !important;
    display: block !important;
  }

  .minimalist-text {
    font-size: 13px !important;
    line-height: 1.7 !important;
    color: #374151 !important; /* gray-700 */
    text-align: justify !important;
  }

  .minimalist-text ul {
    list-style-type: disc !important;
    padding-left: 20px !important;
    margin: 6px 0 !important;
  }

  .minimalist-text li {
    margin-bottom: 4px !important;
  }
  
  .minimalist-text strong {
    font-weight: 700 !important;
  }

  /* Grid Layout for Bottom */
  .minimalist-grid {
    display: flex !important;
    gap: 40px !important;
    margin-top: 16px !important;
  }

  .minimalist-col {
    width: 50% !important;
    min-width: 50% !important;
    flex: 1 !important;
    flex-shrink: 0 !important;
  }

  /* Specific Fonts Override for Mixed Sections */
  .font-sans {
    font-family: 'Inter', sans-serif !important;
  }
  
  .italic {
    font-style: italic !important;
  }

  a { text-decoration: none !important; color: inherit !important; }
`;

export const creativePdfStyles = `
  /* 
   * HIGH-FIDELITY CREATIVE TEMPLATE STYLES
   * Hardcoded values to ensure PDF rendering matches the preview exactly.
   */

  .creative-template {
    width: 794px !important;
    min-width: 794px !important;
    max-width: 794px !important;
    min-height: 1120px !important;
    background-color: #ffffff !important;
    color: #1f2937 !important;
    display: flex !important;
    flex-direction: row-reverse !important; /* Sidebar on RIGHT */
    font-family: 'Inter', sans-serif !important;
  }

  /* Sidebar (Right) */
  .creative-sidebar {
    width: 33.333% !important;
    min-width: 33.333% !important;
    background-color: #4f46e5 !important; /* indigo-600 */
    color: #e0e7ff !important; /* indigo-50 */
    padding: 40px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 32px !important;
    min-height: 1120px !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    flex-shrink: 0 !important;
  }

  .creative-avatar-container {
    text-align: center !important;
    margin-bottom: 10px !important;
  }

  .creative-avatar {
    width: 120px !important;
    height: 120px !important;
    border-radius: 50% !important;
    background-color: #818cf8 !important;
    border: 4px solid #6366f1 !important;
    overflow: hidden !important;
    margin: 0 auto 16px auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .creative-avatar img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  .creative-sidebar-section {
    margin-bottom: 16px !important;
  }

  .creative-sidebar-title {
    color: #c7d2fe !important; /* indigo-200 */
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 2px !important;
    border-bottom: 1px solid #6366f1 !important;
    padding-bottom: 8px !important;
    margin-bottom: 16px !important;
    display: block !important;
  }

  .creative-sidebar-item {
    font-size: 12px !important;
    margin-bottom: 12px !important;
    color: #ffffff !important;
    line-height: 1.4 !important;
  }

  .creative-sidebar-item svg {
    width: 14px !important;
    height: 14px !important;
    margin-right: 8px !important;
    display: inline-block !important;
  }

  .creative-tag {
    display: inline-block !important;
    font-size: 11px !important;
    border: 1px solid #818cf8 !important;
    border-radius: 9999px !important;
    padding: 4px 10px !important;
    background-color: rgba(67, 56, 202, 0.5) !important;
    margin: 0 4px 4px 0 !important;
    color: #ffffff !important;
  }

  /* Main Content (Left) */
  .creative-main {
    width: 66.666% !important;
    min-width: 66.666% !important;
    padding: 48px !important;
    padding-top: 60px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 40px !important;
    background-color: #ffffff !important;
    flex-shrink: 0 !important;
  }

  .creative-header {
    margin-bottom: 10px !important;
  }

  .creative-name {
    font-size: 44px !important;
    font-weight: 800 !important;
    color: #312e81 !important; /* indigo-900 */
    margin: 0 0 8px 0 !important;
    line-height: 1 !important;
  }

  .creative-role {
    font-size: 20px !important;
    font-weight: 500 !important;
    color: #4f46e5 !important; /* indigo-600 */
    margin: 0 !important;
  }

  .creative-section-header {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    margin-bottom: 20px !important;
  }

  .creative-bar {
    height: 4px !important;
    width: 32px !important;
    background-color: #4f46e5 !important;
    border-radius: 2px !important;
  }

  .creative-section-title {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #1f2937 !important; /* gray-800 */
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
  }

  /* Timeline */
  .creative-timeline {
    border-left: 2px solid #e0e7ff !important;
    padding-left: 32px !important;
    margin-left: 10px !important;
    position: relative !important;
  }

  .creative-timeline-item {
    position: relative !important;
    margin-bottom: 32px !important;
    page-break-inside: avoid !important;
  }

  .creative-dot {
    position: absolute !important;
    left: -41px !important; /* adjust for padding + border */
    top: 6px !important;
    height: 14px !important;
    width: 14px !important;
    border-radius: 50% !important;
    border: 2px solid #4f46e5 !important;
    background-color: #ffffff !important;
    z-index: 10 !important;
  }

  .creative-item-title {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #1f2937 !important;
    margin-bottom: 2px !important;
  }

  .creative-item-company {
    font-size: 13px !important;
    color: #4f46e5 !important;
    font-weight: 600 !important;
    margin-bottom: 4px !important;
  }

  .creative-item-date {
    font-family: monospace !important;
    font-size: 11px !important;
    color: #9ca3af !important;
    text-transform: uppercase !important;
    margin-bottom: 10px !important;
    display: block !important;
  }

  .creative-text {
    font-size: 13px !important;
    color: #4b5563 !important;
    line-height: 1.6 !important;
  }

  /* Cards */
  .creative-card {
    background-color: #eef2ff !important; /* indigo-50 */
    padding: 20px !important;
    border-radius: 12px !important;
    border-left: 4px solid #818cf8 !important;
    page-break-inside: avoid !important;
  }

  a { text-decoration: none !important; color: inherit !important; }
  ul { padding-left: 18px !important; }
`;
