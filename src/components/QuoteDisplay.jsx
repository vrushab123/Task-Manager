import React from 'react';
import '../styles/components/QuoteDisplay.css';

const QuoteDisplay = ({ quote, show }) => {
    return (
        <div className={`quote-container ${show ? 'show' : ''}`}>
            <p className="quote-text">{quote}</p>
        </div>
    );
};

export default QuoteDisplay;
