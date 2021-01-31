import { graphStyle } from '../styles/graphStyle';
import { pointAnimation, lineAnimation } from '../styles/graphAnimation';
import { graphArgs } from '../interfaces/interface';

export const graphSvg = (props: graphArgs) => `
    <svg
        width="${props.width}"
        height="${props.height}"
        viewBox="0 0 ${props.width} ${props.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <rect xmlns="http://www.w3.org/2000/svg" data-testid="card_bg" id="cardBg" 
            x="0" y="0" rx="2.5" height="100%" stroke="#E4E2E2" fill-opacity="1" 
            width="100%" fill="#${
              props.colors.bgColor
            }" stroke-opacity="1" style="stroke:#ffffff; stroke-width:1;"/>
        
            <style>
                body {
                    font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
                .header {
                    font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                    text-align: center;
                    color: #${props.colors.color};
                    margin-top: 20px; 
                }
                svg {
                    font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
                ${graphStyle(
                  props.colors.color,
                  props.colors.lineColor,
                  props.colors.pointColor
                )}
                ${pointAnimation()}
                ${lineAnimation()}
            </style>

            <foreignObject x="0" y="0" width="${props.width}" height="50">
                <h1 xmlns="http://www.w3.org/1999/xhtml" class="header">
                    ${props.title}
                </h1>
            </foreignObject>
            <a xlink:href="https://github.com/Ashutosh00710/github-readme-activity-graph" target="__blank">
                 <text x="${props.width/2.5}" y="${props.height - 5}" fill="red">Github Readme Activity Graph!</text>
            </a>
            ${props.line}
    </svg>
`;

export const invalidUserSvg = (data: string) => `
    <svg
        width="400"
        height="200"
        viewBox="0 0 420 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <style>
                svg {
                    font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif;
                }
        </style>
        <rect xmlns="http://www.w3.org/2000/svg" data-testid="card_bg" id="cardBg" x="0.5" 
        y="0.5" rx="4.5" height="100%" stroke="#E4E2E2" fill-opacity="1" width="100%" 
        fill="#44475a" stroke-opacity="1"/>
        <text x="20" y="100" fill="#bd93f9">${data}</text>
    </svg>
`;
