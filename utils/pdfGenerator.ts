import { ResumeData, TemplateType } from '../types';

declare global {
  interface Window {
    jspdf: any;
  }
}

// A4 Dimensions
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 15;

const ensureUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://${url}`;
};

const getProfileUrl = (platform: string, value: string) => {
  if (!value) return '';
  if (value.includes('http')) return value;
  
  switch(platform) {
    case 'linkedin': return `https://www.linkedin.com/in/${value}`;
    case 'leetcode': return `https://leetcode.com/${value}`; 
    case 'codeforces': return `https://codeforces.com/profile/${value}`;
    case 'hackerrank': return `https://www.hackerrank.com/${value}`; 
    case 'hackerearth': return `https://www.hackerearth.com/@${value}`;
    default: return value;
  }
};

// --- RICH TEXT ENGINE ---
interface TextToken {
  text: string;
  isBold: boolean;
  isItalic: boolean;
  isBullet: boolean;
}

const parseHtml = (html: string): TextToken[] => {
    if (!html) return [];
    
    let processed = html
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '')
        .replace(/<li>/g, '\n• ')
        .replace(/<\/li>/g, '')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n');

    const regex = /(<\/?(?:b|strong|i|em)>)/g;
    const parts = processed.split(regex);

    const tokens: TextToken[] = [];
    let isBold = false;
    let isItalic = false;

    parts.forEach(part => {
        if (part === '<b>' || part === '<strong>') {
            isBold = true;
        } else if (part === '</b>' || part === '</strong>') {
            isBold = false;
        } else if (part === '<i>' || part === '<em>') {
            isItalic = true;
        } else if (part === '</i>' || part === '</em>') {
            isItalic = false;
        } else if (part && part.trim() !== '') {
            const lines = part.split('\n');
            lines.forEach((line, i) => {
                if (i > 0) tokens.push({ text: '\n', isBold: false, isItalic: false, isBullet: false }); 
                if (line) {
                    tokens.push({ text: line, isBold, isItalic, isBullet: line.trim().startsWith('•') });
                }
            });
        }
    });

    return tokens;
};

const printRichText = (doc: any, html: string, x: number, y: number, maxWidth: number, fontSize: number, fontName: string = 'helvetica', color: [number, number, number] = [0,0,0], lineHeightFactor: number = 0.5): number => {
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);

    const tokens = parseHtml(html);
    const lineHeight = fontSize * lineHeightFactor; 
    
    let cursorX = x;
    let cursorY = y;
    
    tokens.forEach(token => {
        if (token.text === '\n') {
            cursorX = x;
            cursorY += lineHeight;
            return;
        }

        let style = 'normal';
        if (token.isBold && token.isItalic) style = 'bolditalic';
        else if (token.isBold) style = 'bold';
        else if (token.isItalic) style = 'italic';
        
        doc.setFont(fontName, style);

        const words = token.text.split(/(\s+)/); 
        
        words.forEach(word => {
            const wordWidth = doc.getTextWidth(word);

            if (cursorX + wordWidth > x + maxWidth) {
                cursorX = x;
                cursorY += lineHeight;
            }

            doc.text(word, cursorX, cursorY);
            cursorX += wordWidth;
        });
    });

    return cursorY + lineHeight; 
};

// --- CHIP RENDERER ---
const printSkillChips = (doc: any, skills: string[], x: number, y: number, maxWidth: number, colorPrimary: [number, number, number], textColor: [number, number, number] = [255, 255, 255]): number => {
    let cursorX = x;
    let cursorY = y;
    const chipHeight = 6;
    const paddingX = 3;
    const gap = 2;
    const fontSize = 8;
    
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');

    skills.forEach(skill => {
        const textWidth = doc.getTextWidth(skill);
        const chipWidth = textWidth + (paddingX * 2);

        if (cursorX + chipWidth > x + maxWidth) {
            cursorX = x;
            cursorY += chipHeight + gap;
        }

        doc.setFillColor(...colorPrimary); 
        doc.roundedRect(cursorX, cursorY - 4, chipWidth, chipHeight, 1.5, 1.5, 'F');

        doc.setTextColor(...textColor);
        doc.text(skill, cursorX + paddingX, cursorY);

        cursorX += chipWidth + gap;
    });

    return cursorY + chipHeight + 4;
};


// --- MODERN TEMPLATE GENERATOR ---
const generateModern = (doc: any, data: ResumeData) => {
    let cursorY = 0;
    
    // Header Background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, PAGE_WIDTH, 65, 'F'); 
    
    // Avatar Placeholder
    let headerTextStart = MARGIN;
    if (data.profileImage) {
         headerTextStart += 35; 
         doc.setFillColor(30, 41, 59);
         doc.circle(MARGIN + 12, 32, 14, 'F');
    }

    // Name & Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(data.fullName.toUpperCase(), headerTextStart, 22);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(129, 140, 248); // indigo-400
    doc.text(data.title.toUpperCase(), headerTextStart, 30);

    // Contact Info
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225); // slate-300
    let contactX = headerTextStart;
    let contactY = 38;
    const contactGap = 6;
    
    const addContact = (text: string, link?: string) => {
        if (!text) return;
        const width = doc.getTextWidth(text);
        if (contactX + width > PAGE_WIDTH - MARGIN) {
             contactX = headerTextStart; 
             contactY += 5; 
        }
        
        if (link) {
            doc.text(text, contactX, contactY, { url: link });
        } else {
            doc.text(text, contactX, contactY);
        }
        contactX += width + contactGap;
    };

    addContact(data.email, `mailto:${data.email}`);
    if (data.phone) addContact(`| ${data.phone}`);
    if (data.location) addContact(`| ${data.location}`);
    if (data.linkedin) addContact(`| LinkedIn`, getProfileUrl('linkedin', data.linkedin));
    if (data.website) addContact(`| Portfolio`, ensureUrl(data.website));

    // Coding Profiles in Header
    let profileX = headerTextStart;
    let profileY = contactY + 6;
    doc.setTextColor(148, 163, 184); // slate-400
    
    const addProfile = (label: string, url: string) => {
        if(!url) return;
        const text = `${label}`;
        const width = doc.getTextWidth(text);
        doc.text(text, profileX, profileY, { url: url });
        profileX += width + 6;
    };

    if (data.leetcode) addProfile("LeetCode", getProfileUrl('leetcode', data.leetcode));
    if (data.codeforces) addProfile("Codeforces", getProfileUrl('codeforces', data.codeforces));
    if (data.hackerrank) addProfile("HackerRank", getProfileUrl('hackerrank', data.hackerrank));
    if (data.hackerearth) addProfile("HackerEarth", getProfileUrl('hackerearth', data.hackerearth));

    cursorY = 65;

    // Layout
    const sidebarWidth = 70;
    const mainWidth = PAGE_WIDTH - sidebarWidth; 
    const sidebarX = mainWidth;

    // Draw Sidebar Background
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(sidebarX, cursorY, sidebarWidth, PAGE_HEIGHT - cursorY, 'F');
    doc.setDrawColor(241, 245, 249); // slate-100 border
    doc.line(sidebarX, cursorY, sidebarX, PAGE_HEIGHT);

    // --- LEFT COLUMN (MAIN) ---
    let mainY = cursorY + 15;
    const mainMargin = 15;
    const mainTextW = mainWidth - (mainMargin * 2);

    const sectionTitle = (title: string, y: number, x: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text(title.toUpperCase(), x, y);
        doc.setLineWidth(0.7);
        doc.setDrawColor(15, 23, 42);
        doc.line(x, y + 2, x + mainTextW, y + 2); // Full width line
        return y + 10;
    };

    // Summary
    if (data.summary) {
        mainY = sectionTitle("Professional Profile", mainY, mainMargin);
        mainY = printRichText(doc, data.summary, mainMargin, mainY, mainTextW, 9.5, 'helvetica', [71, 85, 105], 0.5);
        mainY += 10;
    }

    // Experience
    if (data.experience.length > 0) {
        mainY = sectionTitle("Experience", mainY, mainMargin);
        
        data.experience.forEach(exp => {
            // Header Row
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(30, 41, 59);
            doc.text(exp.position, mainMargin, mainY);
            
            // Date Badge
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            const dateStr = `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`;
            const dateW = doc.getTextWidth(dateStr);
            // Draw badge bg
            doc.setFillColor(241, 245, 249);
            doc.roundedRect((mainWidth - mainMargin) - dateW - 2, mainY - 3, dateW + 4, 5, 1, 1, 'F');
            doc.text(dateStr.toUpperCase(), (mainWidth - mainMargin) - dateW, mainY);
            
            mainY += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(79, 70, 229); // indigo-600
            doc.text(exp.company, mainMargin, mainY);

            mainY += 5;
            mainY = printRichText(doc, exp.description, mainMargin, mainY, mainTextW, 9.5, 'helvetica', [71, 85, 105], 0.5);
            mainY += 8;

            if (mainY > PAGE_HEIGHT - 20) {
                doc.addPage();
                mainY = 20;
                doc.setFillColor(248, 250, 252); 
                doc.rect(sidebarX, 0, sidebarWidth, PAGE_HEIGHT, 'F');
                doc.setDrawColor(241, 245, 249);
                doc.line(sidebarX, 0, sidebarX, PAGE_HEIGHT);
            }
        });
    }

    // Projects
    if (data.projects.length > 0) {
        mainY = sectionTitle("Key Projects", mainY, mainMargin);
        data.projects.forEach(proj => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(30, 41, 59);
            doc.text(proj.name, mainMargin, mainY);
            
            if (proj.link) {
                const linkW = doc.getTextWidth(proj.name);
                doc.setFontSize(8);
                doc.setTextColor(99, 102, 241);
                doc.setDrawColor(226, 232, 240);
                doc.roundedRect(mainMargin + linkW + 3, mainY - 3, 20, 4, 1, 1, 'S'); // Outline badge
                doc.text("VIEW PROJECT", mainMargin + linkW + 5, mainY, { url: ensureUrl(proj.link) });
            }

            mainY += 5;
            mainY = printRichText(doc, proj.description, mainMargin, mainY, mainTextW, 9.5, 'helvetica', [71, 85, 105], 0.5);
            mainY += 8;
        });
    }

    // --- RIGHT COLUMN (SIDEBAR) ---
    let sideY = cursorY + 15;
    const sideMargin = sidebarX + 8;
    const sideTextW = sidebarWidth - 16;

    const sideTitle = (title: string, y: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85); 
        doc.text(title.toUpperCase(), sideMargin, y);
        doc.setLineWidth(0.5);
        doc.setDrawColor(203, 213, 225);
        doc.line(sideMargin, y + 2, sideMargin + sideTextW, y + 2);
        return y + 8;
    };

    // Education
    if (data.education.length > 0) {
        sideY = sideTitle("Education", sideY);
        data.education.forEach(edu => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            doc.setTextColor(30, 41, 59);
            const schoolLines = doc.splitTextToSize(edu.school, sideTextW);
            doc.text(schoolLines, sideMargin, sideY);
            sideY += (schoolLines.length * 4);

            doc.setFont("helvetica", "italic");
            doc.setFontSize(9);
            doc.setTextColor(71, 85, 105);
            const degreeLines = doc.splitTextToSize(edu.degree, sideTextW);
            doc.text(degreeLines, sideMargin, sideY + 1);
            sideY += (degreeLines.length * 4) + 1;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            doc.text(`${edu.year} | ${edu.location}`, sideMargin, sideY + 1);
            sideY += 8;
        });
        sideY += 4;
    }

    // Skills (Pills)
    if (data.skills.length > 0) {
        sideY = sideTitle("Skills", sideY);
        // Using White Pills with border
        sideY = printSkillChips(doc, data.skills, sideMargin, sideY, sideTextW, [255, 255, 255], [51, 65, 85]);
        sideY += 6;
    }

    // Certifications
    if (data.certifications.length > 0) {
        sideY = sideTitle("Certifications", sideY);
        data.certifications.forEach(cert => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(30, 41, 59);
            const nameLines = doc.splitTextToSize(cert.name, sideTextW);
            doc.text(nameLines, sideMargin, sideY);
            sideY += (nameLines.length * 3.5);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            doc.text(`${cert.issuer}, ${cert.year}`, sideMargin, sideY);
            sideY += 6;
        });
        sideY += 4;
    }

    // Awards
    if (data.awards.length > 0) {
        sideY = sideTitle("Awards", sideY);
        data.awards.forEach(award => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(30, 41, 59);
            doc.text(award.name, sideMargin, sideY);
            sideY += 4;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            doc.text(`${award.issuer}, ${award.year}`, sideMargin, sideY);
            sideY += 6;
        });
        sideY += 4;
    }

    // Languages
    if (data.languages.length > 0) {
        sideY = sideTitle("Languages", sideY);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        data.languages.forEach(lang => {
            doc.text(`• ${lang}`, sideMargin, sideY);
            sideY += 5;
        });
        sideY += 5;
    }

    // Interests
    if (data.interests.length > 0) {
        sideY = sideTitle("Interests", sideY);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        data.interests.forEach(int => {
            doc.text(`• ${int}`, sideMargin, sideY);
            sideY += 5;
        });
    }
};

// --- MINIMALIST TEMPLATE GENERATOR ---
const generateMinimalist = (doc: any, data: ResumeData) => {
    let cursorY = 25;
    const margin = 20;
    const contentW = PAGE_WIDTH - (margin * 2);

    // Header
    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.setTextColor(17, 24, 39); // gray-900
    doc.text(data.fullName, margin, cursorY);
    
    cursorY += 8;
    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.setTextColor(75, 85, 99); // gray-600
    doc.text(data.title, margin, cursorY);

    cursorY += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(31, 41, 55); // gray-800
    
    let contactLine = data.email;
    if (data.phone) contactLine += `  |  ${data.phone}`;
    if (data.location) contactLine += `  |  ${data.location}`;
    doc.text(contactLine, margin, cursorY);
    
    cursorY += 5;
    // Links line
    let linkX = margin;
    if (data.linkedin) {
        doc.text("LinkedIn", linkX, cursorY, { url: getProfileUrl('linkedin', data.linkedin) });
        linkX += 20;
    }
    if (data.website) {
        doc.text("Portfolio", linkX, cursorY, { url: ensureUrl(data.website) });
        linkX += 20;
    }

    // Coding Profiles
    const activeProfiles = [];
    if(data.leetcode) activeProfiles.push({name: "LeetCode", url: getProfileUrl('leetcode', data.leetcode)});
    if(data.codeforces) activeProfiles.push({name: "Codeforces", url: getProfileUrl('codeforces', data.codeforces)});
    if(data.hackerrank) activeProfiles.push({name: "HackerRank", url: getProfileUrl('hackerrank', data.hackerrank)});
    if(data.hackerearth) activeProfiles.push({name: "HackerEarth", url: getProfileUrl('hackerearth', data.hackerearth)});

    if (activeProfiles.length > 0) {
        cursorY += 5;
        let pX = margin;
        doc.setTextColor(107, 114, 128); // gray-500
        activeProfiles.forEach((p, i) => {
             doc.text(p.name, pX, cursorY, { url: p.url });
             const w = doc.getTextWidth(p.name);
             pX += w + 10;
        });
    }

    cursorY += 10;
    doc.setDrawColor(17, 24, 39); // Black Line
    doc.setLineWidth(0.5);
    doc.line(margin, cursorY, PAGE_WIDTH - margin, cursorY);
    cursorY += 12;

    const sectionTitle = (title: string) => {
        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175); // gray-400
        doc.text(title.toUpperCase(), margin, cursorY);
        cursorY += 6;
    };

    if (data.summary) {
        sectionTitle("PROFILE");
        cursorY = printRichText(doc, data.summary, margin, cursorY, contentW, 10, 'times', [55, 65, 81], 0.5);
        cursorY += 10;
    }

    // Experience
    if (data.experience.length > 0) {
        sectionTitle("PROFESSIONAL EXPERIENCE");
        data.experience.forEach(exp => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(17, 24, 39);
            doc.text(exp.company, margin, cursorY);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(107, 114, 128);
            const dateStr = `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`;
            const dateW = doc.getTextWidth(dateStr);
            doc.text(dateStr, PAGE_WIDTH - margin - dateW, cursorY);
            
            cursorY += 5;
            doc.setFont("times", "italic");
            doc.setFontSize(11);
            doc.setTextColor(75, 85, 99);
            doc.text(exp.position, margin, cursorY);

            cursorY += 5;
            // RICH TEXT
            cursorY = printRichText(doc, exp.description, margin, cursorY, contentW, 10, 'times', [55, 65, 81], 0.5);
            cursorY += 10;
            
            if (cursorY > PAGE_HEIGHT - 20) {
                doc.addPage();
                cursorY = 20;
            }
        });
        cursorY += 5;
    }

    // Projects
    if (data.projects.length > 0) {
        sectionTitle("SELECTED PROJECTS");
        data.projects.forEach(proj => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(17, 24, 39);
            doc.text(proj.name, margin, cursorY);

             if (proj.link) {
                const linkW = doc.getTextWidth(proj.name);
                doc.setFontSize(9);
                doc.setTextColor(107, 114, 128);
                doc.text("View Link", margin + linkW + 5, cursorY, { url: ensureUrl(proj.link) });
            }

            cursorY += 5;
            // RICH TEXT
            cursorY = printRichText(doc, proj.description, margin, cursorY, contentW, 10, 'times', [55, 65, 81], 0.5);
            cursorY += 10;
        });
    }

    // Grid System for Bottom Sections (Education, etc)
    const colWidth = (contentW / 2) - 10;
    let col1Y = cursorY + 5;
    let col2Y = cursorY + 5;

    // Draw separator line
    doc.setDrawColor(17, 24, 39);
    doc.line(margin, cursorY, PAGE_WIDTH - margin, cursorY);
    
    // Col 1: Education
    if (data.education.length > 0) {
        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175); 
        doc.text("EDUCATION", margin, col1Y);
        col1Y += 6;

        data.education.forEach(edu => {
             doc.setFont("helvetica", "bold");
             doc.setFontSize(10);
             doc.setTextColor(17, 24, 39);
             doc.text(edu.school, margin, col1Y);
             col1Y += 4;
             
             doc.setFont("times", "italic");
             doc.setFontSize(9);
             doc.setTextColor(75, 85, 99);
             doc.text(edu.degree, margin, col1Y);
             col1Y += 4;

             doc.setFont("helvetica", "normal");
             doc.setFontSize(8);
             doc.setTextColor(107, 114, 128);
             doc.text(`${edu.year} | ${edu.location}`, margin, col1Y);
             col1Y += 10;
        });
        col1Y += 5;
    }
    
    // Achievements (Col 1 continue)
    if (data.certifications.length > 0 || data.awards.length > 0) {
         doc.setFont("times", "bold");
         doc.setFontSize(10);
         doc.setTextColor(156, 163, 175); 
         doc.text("ACHIEVEMENTS", margin, col1Y);
         col1Y += 6;

         [...data.certifications, ...data.awards].forEach(item => {
             doc.setFont("helvetica", "bold");
             doc.setFontSize(9);
             doc.setTextColor(17, 24, 39);
             doc.text(item.name, margin, col1Y);
             col1Y += 4;
             
             doc.setFont("helvetica", "italic");
             doc.setFontSize(8);
             doc.setTextColor(107, 114, 128);
             doc.text(`${item.issuer}, ${item.year}`, margin, col1Y);
             col1Y += 8;
         });
    }

    // Col 2: Skills & Awards
    const col2X = margin + colWidth + 20;
    
    // Skills
    if (data.skills.length > 0) {
        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175); 
        doc.text("SKILLS", col2X, col2Y);
        col2Y += 6;

        doc.setFont("times", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(55, 65, 81);
        const skillsStr = data.skills.join("  •  ");
        const split = doc.splitTextToSize(skillsStr, colWidth);
        doc.text(split, col2X, col2Y);
        col2Y += (split.length * 5) + 10;
    }

    // Languages (Col 2 continue)
    if (data.languages.length > 0) {
        doc.setFont("times", "bold");
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175); 
        doc.text("LANGUAGES", col2X, col2Y);
        col2Y += 6;
        
        doc.setFont("times", "normal");
        doc.setFontSize(9.5);
        doc.setTextColor(55, 65, 81);
        doc.text(data.languages.join(", "), col2X, col2Y);
        col2Y += 10;
    }
};

// --- CREATIVE TEMPLATE GENERATOR ---
const generateCreative = (doc: any, data: ResumeData) => {
    // Right Sidebar Layout
    const sidebarWidth = 75;
    const sideX = PAGE_WIDTH - sidebarWidth; 
    
    // Backgrounds
    doc.setFillColor(79, 70, 229); // indigo-600
    doc.rect(sideX, 0, sidebarWidth, PAGE_HEIGHT, 'F');
    
    // Decorative Circles
    // Top Right
    doc.setFillColor(255, 255, 255);
    doc.setGState(new doc.GState({ opacity: 0.05 }));
    doc.circle(PAGE_WIDTH, 0, 40, 'F');
    doc.setGState(new doc.GState({ opacity: 1 }));
    
    // --- SIDEBAR CONTENT ---
    let sideY = 40;
    const sideMargin = sideX + 10;
    const sideTextW = sidebarWidth - 20;

    // Avatar Circle
    doc.setFillColor(129, 140, 248); // indigo-400
    const circleCenterX = sideX + (sidebarWidth/2);
    const circleCenterY = sideY + 20;
    doc.circle(circleCenterX, circleCenterY, 22, 'F');
    
    // Initials Center Aligned
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(30); 
    doc.setFont("helvetica", "bold");
    
    const initial = data.fullName.charAt(0).toUpperCase();
    doc.text(initial, circleCenterX, circleCenterY + 3, { align: 'center', baseline: 'middle' });
    
    // Ring
    doc.setDrawColor(99, 102, 241); // indigo-500
    doc.setLineWidth(1.5);
    doc.circle(circleCenterX, circleCenterY, 22, 'S');

    sideY += 60;

    const sideSection = (title: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(199, 210, 254); // indigo-200
        doc.text(title.toUpperCase(), sideMargin, sideY);
        doc.setDrawColor(129, 140, 248); // indigo-400
        doc.setLineWidth(0.5);
        doc.line(sideMargin, sideY + 2, sideMargin + sideTextW, sideY + 2);
        sideY += 8;
    };

    sideSection("Contact");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    
    const addSideItem = (text: string, link?: string) => {
        if (!text) return;
        const lines = doc.splitTextToSize(text, sideTextW);
        if (link) {
            doc.text(lines, sideMargin, sideY, { url: link });
        } else {
             doc.text(lines, sideMargin, sideY);
        }
        sideY += (lines.length * 4) + 3;
    };
    
    addSideItem(data.email, `mailto:${data.email}`);
    addSideItem(data.phone);
    addSideItem(data.location);
    if (data.linkedin) addSideItem("LinkedIn", getProfileUrl('linkedin', data.linkedin));
    if (data.website) addSideItem("Portfolio", ensureUrl(data.website));
    
    sideY += 8;

    // Education in Sidebar
    if (data.education.length > 0) {
        sideSection("Education");
        data.education.forEach(edu => {
             doc.setFont("helvetica", "bold");
             doc.setFontSize(10);
             doc.setTextColor(255, 255, 255);
             const schoolLines = doc.splitTextToSize(edu.school, sideTextW);
             doc.text(schoolLines, sideMargin, sideY);
             sideY += (schoolLines.length * 4);

             doc.setFont("helvetica", "normal");
             doc.setFontSize(9);
             doc.setTextColor(199, 210, 254);
             doc.text(edu.degree, sideMargin, sideY);
             sideY += 4;
             
             doc.setFontSize(8);
             doc.setTextColor(165, 180, 252); // indigo-300
             doc.text(edu.year, sideMargin, sideY);
             sideY += 8;
        });
        sideY += 4;
    }

    // Skills
    if (data.skills.length > 0) {
        sideSection("Skills");
        // CHIPS for Creative: Dark background, light text
        sideY = printSkillChips(doc, data.skills, sideMargin, sideY, sideTextW, [55, 48, 163], [255, 255, 255]); // indigo-800 bg
        sideY += 6;
    }

    // Awards / Achievements
    if (data.awards.length > 0) {
        sideSection("Honors");
        data.awards.forEach(aw => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(aw.name, sideMargin, sideY);
            sideY += 4;
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(199, 210, 254);
            doc.text(`${aw.issuer} | ${aw.year}`, sideMargin, sideY);
            sideY += 6;
        });
        sideY += 4;
    }

    // Languages
    if (data.languages.length > 0) {
        sideSection("Languages");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(224, 231, 255);
        data.languages.forEach(l => {
            doc.text(`• ${l}`, sideMargin, sideY);
            sideY += 5;
        });
    }

    // --- MAIN CONTENT ---
    let mainY = 40;
    const mainMargin = 20;
    const mainW = sideX - (mainMargin * 2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text(data.fullName, mainMargin, mainY);
    
    mainY += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229); // indigo-600
    doc.text(data.title.toUpperCase(), mainMargin, mainY);
    
    mainY += 20;

    const mainSection = (title: string) => {
        // Pill decoration
        doc.setFillColor(79, 70, 229);
        doc.roundedRect(mainMargin, mainY - 4, 8, 3, 1.5, 1.5, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(31, 41, 55); // gray-800
        doc.text(title.toUpperCase(), mainMargin + 12, mainY);
        mainY += 10;
    };

    if (data.summary) {
        mainSection("About Me");
        mainY = printRichText(doc, data.summary, mainMargin, mainY, mainW, 10, 'helvetica', [75, 85, 99], 0.5);
        mainY += 12;
    }

    if (data.experience.length > 0) {
        mainSection("Experience");
        
        // Timeline line
        const timelineStartX = mainMargin + 6;
        
        data.experience.forEach(exp => {
            // Line segment
            doc.setDrawColor(224, 231, 255);
            doc.setLineWidth(1);
            doc.line(timelineStartX, mainY, timelineStartX, mainY + 30); 

            // Dot
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(79, 70, 229);
            doc.setLineWidth(0.8);
            doc.circle(timelineStartX, mainY + 2, 2, 'FD');

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(31, 41, 55);
            doc.text(exp.position, mainMargin + 18, mainY);
            
            // Company and Date aligned
            mainY += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(79, 70, 229);
            doc.text(exp.company, mainMargin + 18, mainY);
            
            const dateStr = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
            doc.setFont("courier", "normal");
            doc.setFontSize(8);
            doc.setTextColor(156, 163, 175);
            const dateW = doc.getTextWidth(dateStr);
            doc.text(dateStr.toUpperCase(), mainMargin + mainW - dateW, mainY);

            mainY += 5;
            // RICH TEXT
            mainY = printRichText(doc, exp.description, mainMargin + 18, mainY, mainW - 18, 10, 'helvetica', [75, 85, 99], 0.5);
            mainY += 12;
            
            if (mainY > PAGE_HEIGHT - 30) {
                 doc.addPage();
                 doc.setFillColor(79, 70, 229);
                 doc.rect(sideX, 0, sidebarWidth, PAGE_HEIGHT, 'F');
                 mainY = 20;
            }
        });
        mainY += 5;
    }

    // Projects
    if (data.projects.length > 0) {
         mainSection("Projects");
         
         data.projects.forEach(proj => {
             // Card Bg
             doc.setFillColor(238, 242, 255); // indigo-50
             doc.setDrawColor(129, 140, 248); // border
             // A filled rect with left border simulated by drawing a thicker line
             doc.rect(mainMargin, mainY - 4, mainW, 35, 'F'); 
             
             // Accent Border Left
             doc.setFillColor(129, 140, 248);
             doc.rect(mainMargin, mainY - 4, 1.5, 35, 'F');

             doc.setFont("helvetica", "bold");
             doc.setFontSize(11);
             doc.setTextColor(30, 41, 59);
             doc.text(proj.name, mainMargin + 5, mainY + 2);
             
             if (proj.link) {
                 const linkW = doc.getTextWidth(proj.name);
                 doc.setFontSize(8);
                 doc.setTextColor(79, 70, 229);
                 doc.text("VIEW PROJECT", mainMargin + mainW - 25, mainY + 2, { url: ensureUrl(proj.link) });
             }
             
             mainY += 7;
             mainY = printRichText(doc, proj.description, mainMargin + 5, mainY, mainW - 10, 9.5, 'helvetica', [75, 85, 99], 0.5);
             mainY += 10;
         });
    }
};

export const generatePDF = async (data: ResumeData, template: TemplateType): Promise<boolean> => {
    return new Promise((resolve) => {
        try {
            // @ts-ignore
            if (!window.jspdf) {
                console.error("jsPDF not loaded");
                alert("Critical Error: PDF library not loaded.");
                resolve(false);
                return;
            }

            // @ts-ignore
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            if (template === TemplateType.MODERN) {
                generateModern(doc, data);
            } else if (template === TemplateType.MINIMALIST) {
                generateMinimalist(doc, data);
            } else if (template === TemplateType.CREATIVE) {
                generateCreative(doc, data);
            } else {
                generateModern(doc, data);
            }
            
            const filename = `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
            doc.save(filename);
            resolve(true);

        } catch (e) {
            console.error("PDF Generation Error", e);
            resolve(false);
        }
    });
};