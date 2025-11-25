import React from "react";

const LoadingSpinner = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        width: '100%'
    }}>
        <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(246, 246, 246, 0.3)',
            borderTop: '5px solid #28845bff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
        }}></div>
        <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    </div>
);

export default LoadingSpinner;
