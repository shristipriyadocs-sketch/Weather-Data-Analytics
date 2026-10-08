import React from 'react';

export const SkeletonLoader: React.FC = () => (
  <div className="skeleton-wrapper">
    <div className="skeleton skeleton-card tall" />
    <div className="skeleton skeleton-card" />
    <div className="skeleton skeleton-card" />
    <div className="skeleton skeleton-card small" />
  </div>
);
