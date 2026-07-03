import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="border-b border-white/60/80 pb-4 mb-6">
      <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-600 font-medium text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;
