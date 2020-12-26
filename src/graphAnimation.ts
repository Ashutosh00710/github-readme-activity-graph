export const strokeAnimation = () => {
    return `
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
    `
} 

export const lineAnimation = () => {
    return `
    @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
    }
    
    `
}
