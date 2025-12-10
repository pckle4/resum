
import React, { forwardRef } from 'react';
import { ResumeData, TemplateType } from '../types';
import ModernTemplate from './resume/ModernTemplate';
import MinimalistTemplate from './resume/MinimalistTemplate';
import CreativeTemplate from './resume/CreativeTemplate';

interface Props {
  data: ResumeData;
  template: TemplateType;
  scale?: number;
  isSkeleton?: boolean;
}

const ResumePreview = forwardRef<HTMLDivElement, Props>(({ data, template, scale = 1, isSkeleton = false }, ref) => {
  // A4 dimensions in pixels at 96 DPI: 794 x 1123
  
  const renderTemplate = () => {
    switch (template) {
      case TemplateType.MODERN:
        return <ModernTemplate data={data} isSkeleton={isSkeleton} />;
      case TemplateType.MINIMALIST:
        return <MinimalistTemplate data={data} isSkeleton={isSkeleton} />;
      case TemplateType.CREATIVE:
        return <CreativeTemplate data={data} isSkeleton={isSkeleton} />;
      default:
        return <ModernTemplate data={data} isSkeleton={isSkeleton} />;
    }
  };

  return (
    <div className="w-full flex justify-center items-start min-h-full overflow-visible">
        {/* Wrapper that handles the scaling logic properly without affecting flow incorrectly */}
        <div 
          className="relative transition-transform duration-200 ease-out box-content print:transform-none"
          style={{
            width: '794px',
            height: '1123px', // Fixed A4 height for preview
            // Note: Transform is handled by parent container now for better responsiveness control in App.tsx
            // But we keep the container logic sound
          }}
        >
          <div 
            id="resume-content" 
            ref={ref} 
            className="w-[794px] min-h-[1123px] bg-white shadow-2xl"
            style={{
                boxShadow: '0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)'
            }}
          >
            {renderTemplate()}
          </div>
        </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;