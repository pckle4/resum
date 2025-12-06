import { ResumeData } from '../types';

/**
 * Generates the "Jake's Resume" LaTeX code populated with ResumeData.
 */
export const generateLatexCode = (data: ResumeData): string => {
  // Escape special LaTeX characters
  const esc = (str: string = "") => {
    return str
      .replace(/\\/g, '\\textbackslash ')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
      .replace(/~/g, '\\textasciitilde ')
      .replace(/\^/g, '\\textasciicircum ');
  };

  // Helper to check if list is empty
  const hasExp = data.experience.length > 0;
  const hasEdu = data.education.length > 0;
  const hasProj = data.projects.length > 0;
  const hasSkills = data.skills.length > 0;

  // Format Experience
  const experienceItems = data.experience.map(exp => `
    \\resumeSubheading
      {${esc(exp.company)}}{${esc(exp.startDate)} -- ${exp.current ? 'Present' : esc(exp.endDate)}}
      {${esc(exp.position)}}{${''}}
      \\resumeItemListStart
        \\resumeItem{${esc(exp.description)}}
      \\resumeItemListEnd
`).join('');

  // Format Education
  const educationItems = data.education.map(edu => `
    \\resumeSubheading
      {${esc(edu.school)}}{${esc(edu.location)}}
      {${esc(edu.degree)}}{${esc(edu.year)}}
`).join('');

  // Format Projects
  const projectItems = data.projects.map(proj => `
    \\resumeProjectHeading
      {\\textbf{${esc(proj.name)}} $|$ \\emph{${esc(proj.link || '')}}}{}
      \\resumeItemListStart
        \\resumeItem{${esc(proj.description)}}
      \\resumeItemListEnd
`).join('');

  // Format Skills
  const technicalSkills = `
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Skills}{: ${data.skills.map(esc).join(', ')}} \\\\
     \\textbf{Languages}{: ${data.languages.map(esc).join(', ')}} \\\\
    }}
 \\end{itemize}
`;

  return `
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------

\\begin{center}
    \\textbf{\\Huge \\scshape ${esc(data.fullName)}} \\\\ \\vspace{1pt}
    \\small ${esc(data.phone)} $|$ \\href{mailto:${esc(data.email)}}{\\underline{${esc(data.email)}}} 
    ${data.linkedin ? `$|$ \\href{https://${esc(data.linkedin)}}{\\underline{${esc(data.linkedin)}}}` : ''}
    ${data.website ? `$|$ \\href{https://${esc(data.website)}}{\\underline{${esc(data.website)}}}` : ''}
\\end{center}


%-----------EDUCATION-----------
${hasEdu ? `
\\section{Education}
  \\resumeSubHeadingListStart
    ${educationItems}
  \\resumeSubHeadingListEnd
` : ''}


%-----------EXPERIENCE-----------
${hasExp ? `
\\section{Experience}
  \\resumeSubHeadingListStart
    ${experienceItems}
  \\resumeSubHeadingListEnd
` : ''}


%-----------PROJECTS-----------
${hasProj ? `
\\section{Projects}
    \\resumeSubHeadingListStart
      ${projectItems}
    \\resumeSubHeadingListEnd
` : ''}


%-----------PROGRAMMING SKILLS-----------
${hasSkills ? `
\\section{Technical Skills}
 ${technicalSkills}
` : ''}

%-------------------------------------------
\\end{document}
  `.trim();
};