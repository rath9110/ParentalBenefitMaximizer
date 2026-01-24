import React, { useState } from 'react';

const Tooltip = ({ text, link }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '6px' }}>
            <span
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
                style={{
                    cursor: 'help',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-text-muted)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily: 'serif'
                }}
            >
                i
            </span>
            {isVisible && (
                <div style={{
                    position: 'absolute',
                    bottom: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    width: '200px',
                    zIndex: 1000,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    textAlign: 'left',
                    lineHeight: '1.4'
                }}>
                    {text}
                    {link && (
                        <div style={{ marginTop: '6px', borderTop: '1px solid #555', paddingTop: '4px' }}>
                            <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#FFC107', textDecoration: 'none' }}>
                                Läs mer &rarr;
                            </a>
                        </div>
                    )}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        marginLeft: '-5px',
                        borderWidth: '5px',
                        borderStyle: 'solid',
                        borderColor: '#333 transparent transparent transparent'
                    }}></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
