export const pointAnimation = () =>
    `
        @keyframes blink {
            from {
                opacity: 0;
                transform:translateX(-20px); 
            }
            to {
                opacity:1;
                transform: translateX(0);
            }
        }
    `;

export const lineAnimation = () =>
    `
        @keyframes dash {
            to {
                stroke-dashoffset: 0;
            }
        }
    
    `;
