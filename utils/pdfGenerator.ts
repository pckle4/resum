
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

// --- RICH TEXT ENGINE ---
// Parses simple HTML tags (<b>, <strong>, <i>, <em>, <ul>, <li>) and renders them to PDF
interface TextToken {
  text: string;
  isBold: boolean;
  isItalic: boolean;
  isBullet: boolean;
}

const parseHtml = (html: string): TextToken[] => {
    // 1. Replace block elements with newlines or markers
    let processed = html
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '')
        .replace(/<li>/g, '\n• ')
        .replace(/<\/li>/g, '')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n');

    // 2. Split by tags
    // Captures: <b>, </b>, <strong>, </strong>, <i>, </i>, <em>, </em>
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
        } else if (part !== '') {
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

const printRichText = (doc: any, html: string, x: number, y: number, maxWidth: number, fontSize: number, fontName: string = 'helvetica', color: [number, number, number] = [0,0,0]): number => {
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);

    const tokens = parseHtml(html);
    const lineHeight = fontSize * 0.45; // Approx mm conversion
    
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
const printSkillChips = (doc: any, skills: string[], x: number, y: number, maxWidth: number, colorPrimary: [number, number, number]): number => {
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
        doc.setDrawColor(203, 213, 225); 
        doc.roundedRect(cursorX, cursorY - 4, chipWidth, chipHeight, 1.5, 1.5, 'F');

        // Text Contrast Check - simple logic: if primary is dark, text white, else dark
        // Here we assume light chips for Modern/Minimalist, dark for Creative
        const isDark = colorPrimary[0] < 100;
        doc.setTextColor(isDark ? 255 : 51, isDark ? 255 : 65, isDark ? 255 : 85);
        
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
    doc.rect(0, 0, PAGE_WIDTH, 50, 'F');
    
    // Name & Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(data.fullName.toUpperCase(), MARGIN, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(203, 213, 225); // slate-300
    doc.text(data.title, MARGIN, 28);

    // Contact Info
    doc.setFontSize(9);
    let contactX = MARGIN;
    const contactGap = 5;
    
    const addContact = (text: string, link?: string) => {
        if (!text) return;
        const width = doc.getTextWidth(text);
        if (link) {
            doc.textWithLink(text, contactX, 36, { url: ensureUrl(link) });
        } else {
            doc.text(text, contactX, 36);
        }
        contactX += width + contactGap;
    };

    addContact(data.email, `mailto:${data.email}`);
    if (data.phone) addContact(`| ${data.phone}`);
    if (data.location) addContact(`| ${data.location}`);
    if (data.linkedin) addContact(`| LinkedIn`, data.linkedin);
    if (data.website) addContact(`| Portfolio`, data.website);

    cursorY = 50;

    // Layout
    const sidebarWidth = 70;
    const mainWidth = PAGE_WIDTH - sidebarWidth; // 140
    const sidebarX = mainWidth;

    // Draw Sidebar Background
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(sidebarX, cursorY, sidebarWidth, PAGE_HEIGHT - cursorY, 'F');
    doc.setDrawColor(226, 232, 240); // border
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
        doc.setLineWidth(0.5);
        doc.line(x, y + 2, x + 30, y + 2);
        return y + 8;
    };

    // Summary
    if (data.summary) {
        mainY = sectionTitle("Professional Summary", mainY, mainMargin);
        mainY = printRichText(doc, data.summary, mainMargin, mainY, mainTextW, 10, 'helvetica', [51, 65, 85]);
        mainY += 5;
    }

    // Experience
    if (data.experience.length > 0) {
        mainY = sectionTitle("Experience", mainY, mainMargin);
        
        data.experience.forEach(exp => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(30, 41, 59);
            doc.text(exp.position, mainMargin, mainY);
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(100, 116, 139);
            const dateStr = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
            const dateW = doc.getTextWidth(dateStr);
            doc.text(dateStr, (mainWidth - mainMargin) - dateW, mainY);
            
            mainY += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(37, 99, 235); // blue-600
            doc.text(exp.company, mainMargin, mainY);

            mainY += 5;
            mainY = printRichText(doc, exp.description, mainMargin, mainY, mainTextW, 10, 'helvetica', [51, 65, 85]);
            mainY += 6;

            if (mainY > PAGE_HEIGHT - 20) {
                doc.addPage();
                mainY = 20;
                doc.setFillColor(248, 250, 252); 
                doc.rect(sidebarX, 0, sidebarWidth, PAGE_HEIGHT, 'F');
                doc.setDrawColor(226, 232, 240);
                doc.line(sidebarX, 0, sidebarX, PAGE_HEIGHT);
            }
        });
    }

    // Projects
    if (data.projects.length > 0) {
        mainY = sectionTitle("Projects", mainY, mainMargin);
        data.projects.forEach(proj => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(30, 41, 59);
            doc.text(proj.name, mainMargin, mainY);
            
            if (proj.link) {
                const linkW = doc.getTextWidth(proj.name);
                doc.setFontSize(9);
                doc.setTextColor(37, 99, 235);
                doc.textWithLink("View Project", mainMargin + linkW + 3, mainY, { url: ensureUrl(proj.link) });
            }

            mainY += 5;
            mainY = printRichText(doc, proj.description, mainMargin, mainY, mainTextW, 10, 'helvetica', [51, 65, 85]);
            mainY += 6;
        });
    }

    // --- RIGHT COLUMN (SIDEBAR) ---
    let sideY = cursorY + 15;
    const sideMargin = sidebarX + 10;
    const sideTextW = sidebarWidth - 20;

    const sideTitle = (title: string, y: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42); 
        doc.text(title.toUpperCase(), sideMargin, y);
        doc.setLineWidth(0.5);
        doc.setDrawColor(203, 213, 225);
        doc.line(sideMargin, y + 2, sideMargin + 30, y + 2);
        return y + 8;
    };

    // Education
    if (data.education.length > 0) {
        sideY = sideTitle("Education", sideY);
        data.education.forEach(edu => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(30, 41, 59);
            const schoolLines = doc.splitTextToSize(edu.school, sideTextW);
            doc.text(schoolLines, sideMargin, sideY);
            sideY += (schoolLines.length * 4);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(71, 85, 105);
            const degreeLines = doc.splitTextToSize(edu.degree, sideTextW);
            doc.text(degreeLines, sideMargin, sideY + 1);
            sideY += (degreeLines.length * 4) + 1;

            doc.setFontSize(8);
            doc.setTextColor(100, 116, 139);
            doc.text(`${edu.year} | ${edu.location}`, sideMargin, sideY + 1);
            sideY += 8;
        });
        sideY += 5;
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

    // Skills (CHIPS)
    if (data.skills.length > 0) {
        sideY = sideTitle("Skills", sideY);
        sideY = printSkillChips(doc, data.skills, sideMargin, sideY, sideTextW, [226, 232, 240]);
        sideY += 5;
    }

    // Languages
    if (data.languages.length > 0) {
        sideY = sideTitle("Languages", sideY);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
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
        doc.setTextColor(51, 65, 85);
        data.interests.forEach(int => {
            doc.text(`• ${int}`, sideMargin, sideY);
            sideY += 5;
        });
    }
};

// --- MINIMALIST TEMPLATE GENERATOR ---
const generateMinimalist = (doc: any, data: ResumeData) => {
    let cursorY = 20;
    const margin = 20;
    const contentW = PAGE_WIDTH - (margin * 2);

    // Header
    doc.setFont("times", "bold");
    doc.setFontSize(26);
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
    doc.setTextColor(75, 85, 99);
    
    let contactLine = data.email;
    if (data.phone) contactLine += `  •  ${data.phone}`;
    if (data.location) contactLine += `  •  ${data.location}`;
    doc.text(contactLine, margin, cursorY);
    
    cursorY += 5;
    // Links line
    let linkX = margin;
    if (data.linkedin) {
        doc.textWithLink("LinkedIn", linkX, cursorY, { url: ensureUrl(data.linkedin) });
        linkX += 20;
    }
    if (data.website) {
        doc.textWithLink("Portfolio", linkX, cursorY, { url: ensureUrl(data.website) });
    }

    cursorY += 10;
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, cursorY, PAGE_WIDTH - margin, cursorY);
    cursorY += 10;

    const sectionTitle = (title: string) => {
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.setTextColor(156, 163, 175); // gray-400
        doc.text(title.toUpperCase(), margin, cursorY);
        cursorY += 6;
    };

    if (data.summary) {
        sectionTitle("Profile");
        cursorY = printRichText(doc, data.summary, margin, cursorY, contentW, 10, 'times', [55, 65, 81]);
        cursorY += 8;
    }

    // Experience
    if (data.experience.length > 0) {
        sectionTitle("Experience");
        data.experience.forEach(exp => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text(exp.company, margin, cursorY);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(107, 114, 128);
            const dateStr = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
            const dateW = doc.getTextWidth(dateStr);
            doc.text(dateStr, PAGE_WIDTH - margin - dateW, cursorY);
            
            cursorY += 5;
            doc.setFont("times", "italic");
            doc.setFontSize(10);
            doc.setTextColor(55, 65, 81);
            doc.text(exp.position, margin, cursorY);

            cursorY += 5;
            // RICH TEXT
            cursorY = printRichText(doc, exp.description, margin, cursorY, contentW, 10, 'times', [55, 65, 81]);
            cursorY += 6;
            
            if (cursorY > PAGE_HEIGHT - 20) {
                doc.addPage();
                cursorY = 20;
            }
        });
        cursorY += 5;
    }

    // Projects
    if (data.projects.length > 0) {
        sectionTitle("Projects");
        data.projects.forEach(proj => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text(proj.name, margin, cursorY);

             if (proj.link) {
                const linkW = doc.getTextWidth(proj.name);
                doc.setFontSize(9);
                doc.setTextColor(75, 85, 99);
                doc.textWithLink("(Link)", margin + linkW + 2, cursorY, { url: ensureUrl(proj.link) });
            }

            cursorY += 5;
            // RICH TEXT
            cursorY = printRichText(doc, proj.description, margin, cursorY, contentW, 10, 'times', [55, 65, 81]);
            cursorY += 6;
        });
    }

    // Grid System for Bottom Sections (Education, etc)
    const colWidth = (contentW / 2) - 5;
    let col1Y = cursorY;
    let col2Y = cursorY;

    // Col 1: Education
    if (data.education.length > 0) {
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.setTextColor(156, 163, 175); 
        doc.text("EDUCATION", margin, col1Y);
        col1Y += 6;

        data.education.forEach(edu => {
             doc.setFont("helvetica", "bold");
             doc.setFontSize(10);
             doc.setTextColor(0,0,0);
             doc.text(edu.school, margin, col1Y);
             col1Y += 4;
             
             doc.setFont("times", "italic");
             doc.setFontSize(9);
             doc.setTextColor(55, 65, 81);
             doc.text(edu.degree, margin, col1Y);
             col1Y += 4;

             doc.setFont("helvetica", "normal");
             doc.setFontSize(8);
             doc.setTextColor(107, 114, 128);
             doc.text(edu.year, margin, col1Y);
             col1Y += 8;
        });
        col1Y += 5;
    }

    // Col 2: Skills & Awards
    const col2X = margin + colWidth + 10;
    
    // Skills
    if (data.skills.length > 0) {
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.setTextColor(156, 163, 175); 
        doc.text("SKILLS", col2X, col2Y);
        col2Y += 6;

        doc.setFont("times", "normal");
        doc.setFontSize(9);
        doc.setTextColor(55, 65, 81);
        const skillsStr = data.skills.join(" • ");
        const split = doc.splitTextToSize(skillsStr, colWidth);
        doc.text(split, col2X, col2Y);
        col2Y += (split.length * 4) + 10;
    }

    // Languages (Col 2 continue)
    if (data.languages.length > 0) {
        doc.setFont("times", "bold");
        doc.setFontSize(12);
        doc.setTextColor(156, 163, 175); 
        doc.text("LANGUAGES", col2X, col2Y);
        col2Y += 6;
        
        doc.setFont("times", "normal");
        doc.setFontSize(9);
        doc.setTextColor(55, 65, 81);
        doc.text(data.languages.join(", "), col2X, col2Y);
        col2Y += 10;
    }

    // Certs & Awards (Col 1 continue)
    if (data.certifications.length > 0 || data.awards.length > 0) {
         doc.setFont("times", "bold");
         doc.setFontSize(12);
         doc.setTextColor(156, 163, 175); 
         doc.text("ACHIEVEMENTS", margin, col1Y);
         col1Y += 6;

         [...data.certifications, ...data.awards].forEach(item => {
             doc.setFont("helvetica", "bold");
             doc.setFontSize(9);
             doc.setTextColor(0,0,0);
             doc.text(item.name, margin, col1Y);
             col1Y += 4;
             
             doc.setFont("helvetica", "italic");
             doc.setFontSize(8);
             doc.setTextColor(107, 114, 128);
             doc.text(`${item.issuer}, ${item.year}`, margin, col1Y);
             col1Y += 6;
         });
    }
};

// --- CREATIVE TEMPLATE GENERATOR ---
const generateCreative = (doc: any, data: ResumeData) => {
    // Right Sidebar Layout
    const sidebarWidth = 70;
    const sideX = PAGE_WIDTH - sidebarWidth; // 140
    
    // Backgrounds
    doc.setFillColor(79, 70, 229); // indigo-600
    doc.rect(sideX, 0, sidebarWidth, PAGE_HEIGHT, 'F');
    
    // --- SIDEBAR CONTENT ---
    let sideY = 40;
    const sideMargin = sideX + 10;
    const sideTextW = sidebarWidth - 20;

    // Avatar Circle
    doc.setFillColor(129, 140, 248);
    const circleCenterX = sideX + (sidebarWidth/2);
    const circleCenterY = sideY + 15;
    doc.circle(circleCenterX, circleCenterY, 20, 'F');
    
    // Initials Center Aligned
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28); 
    doc.setFont("helvetica", "bold");
    
    const initial = data.fullName.charAt(0).toUpperCase();
    doc.text(initial, circleCenterX, circleCenterY, { align: 'center', baseline: 'middle' });
    
    sideY += 50;

    const sideSection = (title: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(199, 210, 254); // indigo-200
        doc.text(title.toUpperCase(), sideMargin, sideY);
        doc.setDrawColor(99, 102, 241);
        doc.line(sideMargin, sideY + 2, sideMargin + 40, sideY + 2);
        sideY += 10;
    };

    sideSection("Contact");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    
    const addSideItem = (text: string, link?: string) => {
        if (!text) return;
        if (link) {
            doc.textWithLink(text, sideMargin, sideY, { url: ensureUrl(link) });
        } else {
             doc.text(text, sideMargin, sideY);
        }
        sideY += 6;
    };
    
    addSideItem(data.email, `mailto:${data.email}`);
    addSideItem(data.phone);
    addSideItem(data.location);
    if (data.linkedin) addSideItem("LinkedIn", data.linkedin);
    if (data.website) addSideItem("Portfolio", data.website);
    
    sideY += 10;

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
             doc.text(edu.year, sideMargin, sideY);
             sideY += 8;
        });
        sideY += 4;
    }

    // Skills
    if (data.skills.length > 0) {
        sideSection("Skills");
        // CHIPS for Creative
        sideY = printSkillChips(doc, data.skills, sideMargin, sideY, sideTextW, [99, 102, 241]);
        sideY += 4;
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
    doc.setFontSize(32);
    doc.setTextColor(49, 46, 129); // indigo-900
    doc.text(data.fullName, mainMargin, mainY);
    
    mainY += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229); // indigo-600
    doc.text(data.title, mainMargin, mainY);
    
    mainY += 20;

    const mainSection = (title: string) => {
        doc.setFillColor(79, 70, 229);
        doc.rect(mainMargin, mainY - 4, 20, 3, 'F');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(31, 41, 55);
        doc.text(title.toUpperCase(), mainMargin + 25, mainY);
        mainY += 10;
    };

    if (data.summary) {
        mainSection("About Me");
        mainY = printRichText(doc, data.summary, mainMargin, mainY, mainW, 10, 'helvetica', [75, 85, 99]);
        mainY += 10;
    }

    if (data.experience.length > 0) {
        mainSection("Experience");
        
        // Timeline line start
        const timelineStartX = mainMargin + 6;
        const timelineStartY = mainY;
        
        data.experience.forEach(exp => {
            // Draw line segment for this item (heuristic)
            doc.setDrawColor(224, 231, 255);
            doc.setLineWidth(1);
            // We draw line to bottom of this item later or continuous line
            // Continuous line is better, but difficult to calculate exact height beforehand
            // Let's just draw a long line and cut it off or just segments
            doc.line(timelineStartX, mainY, timelineStartX, mainY + 30); // simplistic segment

            // Dot
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(79, 70, 229);
            doc.setLineWidth(0.5);
            doc.circle(timelineStartX, mainY - 1, 2, 'FD');

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(31, 41, 55);
            doc.text(exp.position, mainMargin + 15, mainY);
            
            mainY += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(79, 70, 229);
            doc.text(exp.company, mainMargin + 15, mainY);

            mainY += 5;
            doc.setFont("courier", "normal");
            doc.setFontSize(9);
            doc.setTextColor(156, 163, 175);
            doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, mainMargin + 15, mainY);

            mainY += 5;
            // RICH TEXT
            mainY = printRichText(doc, exp.description, mainMargin + 15, mainY, mainW - 15, 10, 'helvetica', [75, 85, 99]);
            mainY += 10;
        });
        
        // Extend line to cover the full block
        doc.setDrawColor(224, 231, 255);
        doc.setLineWidth(1);
        doc.line(timelineStartX, timelineStartY, timelineStartX, mainY - 10);
    }

    // Projects (Was Missing!)
    if (data.projects.length > 0) {
         mainSection("Projects");
         
         data.projects.forEach(proj => {
             // Card Background
             // We can't know exact height easily without dry run, so we just draw text
             // To mimic card, we can draw a light rect background behind text if we tracked Y
             
             doc.setFillColor(238, 242, 255); // indigo-50
             doc.rect(mainMargin, mainY - 4, mainW, 6, 'F'); // Header bg

             doc.setFont("helvetica", "bold");
             doc.setFontSize(11);
             doc.setTextColor(30, 41, 59);
             doc.text(proj.name, mainMargin + 2, mainY);
             
             if (proj.link) {
                 const linkW = doc.getTextWidth(proj.name);
                 doc.setFontSize(9);
                 doc.setTextColor(79, 70, 229);
                 doc.textWithLink("View Project", mainMargin + linkW + 5, mainY, { url: ensureUrl(proj.link) });
             }
             
             mainY += 6;
             mainY = printRichText(doc, proj.description, mainMargin + 2, mainY, mainW - 4, 10, 'helvetica', [75, 85, 99]);
             mainY += 8;
         });
    }
};

export const generatePDF = (data: ResumeData, template: TemplateType) => {
    // @ts-ignore
    if (!window.jspdf) {
        alert("PDF generator not loaded. Please refresh.");
        return;
    }

    // @ts-ignore
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    try {
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
    } catch (e) {
        console.error("PDF Generation Error", e);
        alert("Failed to generate PDF. Please try again.");
    }
};
