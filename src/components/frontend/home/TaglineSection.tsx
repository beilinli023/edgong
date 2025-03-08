
import React from 'react';

const TaglineSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4">
          <span className="text-blue-500">Explore.</span>{' '}
          <span className="text-green-500">Learn.</span>{' '}
          <span className="text-orange-500">Grow.</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your Lifetime Itinerary Awaits.
        </p>
      </div>
    </div>
  );
};

export default TaglineSection;
