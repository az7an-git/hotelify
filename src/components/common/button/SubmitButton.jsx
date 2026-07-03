import React from 'react';
import './submitButton.css';

function SubmitButton({callToAction, loading}) {
  return (
    <button
      className='glass-button-primary w-full py-3.5 rounded-full text-base font-bold shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform active:scale-95 mt-3 flex items-center justify-center gap-2'
      type='submit'
      disabled={loading}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Submitting...</span>
        </>
      ) : callToAction}
    </button>
  )
}

export default SubmitButton
