const paths={
 defend:'<path d="M12 2 4 5v7c0 5 8 10 8 10s8-5 8-10V5Z"/><path d="m8 12 3 3 5-7"/>',
 assault:'<path d="M3 2h4l13 15-3 3L2 7V3m11 14 5-5m-1 8 4-4m-2 2 3 4M21 2h-4L4 17l3 3L22 7V3m-11 14-5-5m1 8-4-4m2 2-3 4"/>',
 supply:'<path d="M3 5h18v12H3ZM8 5v12m8-12v12M3 10h18M6 17v3m12-3v3M4 22h4m8 0h4"/>',
 truce:'<path d="M5 22V2m0 1c6-4 10 4 16 0v10c-6 4-10-4-16 0"/>',
 state:'<path d="M3 21h18M5 20V10m5 10V10m4 10V10m5 10V10M2 8l10-6 10 6Z"/>',
 diplomacy:'<path d="M5 22V2m0 1c6-4 10 4 16 0v10c-6 4-10-4-16 0M2 22h9"/>'};
export function gameIcon(name,cl='game-icon'){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class',cl);svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.7');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.innerHTML=paths[name]||paths.assault;return svg;}
