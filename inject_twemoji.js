const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Bridger\\VSCODE PROJECTS\\VSPROJECT';
const files = ['game.html', 'aboutme.html', 'honeymoonfinder.html', 'markettrends.html', 'recommendations.html'];

const headInjection = `
    <!-- Twemoji -->
    <script src="https://unpkg.com/twemoji@latest/dist/twemoji.min.js" crossorigin="anonymous"></script>
    <style>
        img.emoji {
            height: 1em;
            width: 1em;
            margin: 0 .05em 0 .1em;
            vertical-align: -0.1em;
        }
    </style>
`;
const bodyInjection = `
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            twemoji.parse(document.body);
        });
    </script>
</body>`;

files.forEach(file => {
   const filePath = path.join(dir, file);
   if(fs.existsSync(filePath)) {
       let content = fs.readFileSync(filePath, 'utf8');
       if(!content.includes('twemoji.min.js')) {
           content = content.replace('</head>', headInjection + '</head>');
           content = content.replace('</body>', bodyInjection);
           fs.writeFileSync(filePath, content);
           console.log('Injected into ' + file);
       }
   }
});
console.log('Done');
