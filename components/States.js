import React from 'react';
import { useRouter } from 'next/router';
import states from '@/json/states.json';

function StateList() {
  const router = useRouter();

  const handleStateClick = (state) => {
    localStorage.setItem('selectedStateData', JSON.stringify(state));
    router.push('/details');
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center text-black mb-6">States In India </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {states.map((state, index) => (
          <button
            key={index}
            onClick={() => handleStateClick(state)}
            className="w-full text-left px-4 py-2 border border-gray-200 rounded-lg hover:bg-teal-50 transition"
          >
            {state.State}
          </button>
        ))}
      </div>


    </section>
  );
}

export default StateList;
