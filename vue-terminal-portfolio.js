const app = Vue.createApp({
    data() {
        return {
            input: '',
            output: [
                'Welcome to my portfolio!  <br>' +
                ' Type \'help\' to see the available commands. <br>' +
                '<span class="text-gray-400 text-xs">Or skip directly to my CV by typing \'download\'.\'</span>'
            ],
            isTyping: false,
            clear: false,
            commands: {
                help: 'Available commands: help, about, experience, achievements, contact, clear, download',
                about: `Hi, I'm Shaun Moore, a Lead/Backend Engineer with over 8 years of experience in PHP and Laravel. \n
                 I excel at tech architecture and team leadership, guiding projects from concept to completion with a focus on delivering high-quality, scalable solutions. \n
                 I've worked everywhere from startups to large corporations, in multiple industries including travel, automotive, gambling and Proptech. \n
                Recently I've been working on a paper to predict dementia using machine learning, you can find out more by typing 'projects'.`,
                achievements: `Notable achievements:
• Ran a team of 5 developers across different time zones
• Lead the development of a horse racing platform
• Secured £250,000 in funding for a startup as stand-in CTO
• Tech Languages: PHP, Laravel, Golang, Python jQuery, React, SCSS
• Languages: English(Native), Spanish(A1,Conversational)
• Lead an A/B testing platform, leading to a increase in conversions 
• (Almost published) Paper on predicting dementia using machine learning with a 92% accuracy rate
• Lead a team of 19 non-english speakers to manage a ranch in Mexico`,
                experience: `Work Experience:
Kamma Data - Senior Software Developer (October 2023 - Present)
   • Leading a innovative project to help homeowners retrofit their homes
   • Developing a machine learning model to predict EPC ratings
   • Project Management and prioritisation of tasks
   • Developed a tool to get rogue landlords from the UK government database
   
Racing Stars - Lead Developer / CTO (July 2022 - October 2023)
   • Leading a team of 5 developers across different time zones
   • Liaising with directors & external investors
   • Developing and maintaining entire infrastructure
   • Responsible for the development of the company's core project & direction
   • Secured £250,000 in funding for the company as stand-in CTO - From Superbet

Sykes Cottages - Senior Developer (April 2021 - July 2022)
   • Shaped customer acquisition team strategies
   • Developed custom solutions and optimized software systems
   • Collaborated on process optimization initiatives
   • Developed and maintained A/B testing platform

Creative Hedgehog - Lead Software & Web Developer (August 2018 - 2023)
   • Built custom CMS & Booking portal for multiple resorts
   • Made strategic decisions on software selection and development
   • Adapted to international work environment (Mexico)
   
   There's more to my experience, but I'd love to tell you about it in person! 'contact' `,
                projects: `Notable Projects:
1. Racing Stars - Developed and maintained a cutting-edge racing platform
2. Sykes Cottages - Implemented efficient customer acquisition strategies
3. Rancho Las Cascadas - Created custom CMS and booking system for multiple resorts
4. AutoHQ - Created a custom CRM for multiple car dealerships
5. Dementia Prediction - Developed a machine learning model to predict dementia with 92% accuracy

I'd love to share more about my projects, but what's the fun in you reading it? Let me tell you about it instead!`,
                education: `Education:
• 3aaa Apprenticeship - Level 3 in IT & Telecoms
• DevelopEBP - Level 2 in IT`,
                contact: 'You can contact me at: shaunmoore185@gmail.com \n' +
                    '\n Mobile: 07300 220183' +
                    '\n LinkedIn: https://www.linkedin.com/in/shaunrmoore/' +
                    '\n GitHub: https://github.com/prawn185' +
                    '\n Portfolio: https://prawn185.github.io',
                clear: 'Clearing the terminal...',
                download: 'Downloading CV... (file: ShaunMoore_CV.pdf)'
            }
        }
    },
    methods: {
        getPromptHTML() {
            return `
            <div class="flex items-center">
                <span class="pl-2 p-0.5 bg-white w-[30px]"><img src="https://cdn.icon-icons.com/icons2/2389/PNG/512/arch_linux_logo_icon_145482.png" alt="Arch Linux Logo" ></span>
                <span class="w-0 h-0 border-t-[12px] border-t-transparent border-l-[12px] border-l-white border-b-[12px] border-b-transparent bg-[#19a5c2] pr-2"></span>
                <span class="text-white bg-[#19a5c2]">[shaun@portfolio]</span>
                <span class="w-0 h-0 border-t-[12px] border-t-transparent border-l-[12px] border-l-[#19a5c2] border-b-[12px] border-b-transparent bg-[#1ee3e5] pr-2"></span>
                <span class="pr-2 text-white bg-[#1ee3e5]">~/Documents/Portfolio $</span>
                <span class="w-0 h-0 border-t-[12px] border-t-transparent border-l-[12px] border-l-[#1ee3e5] border-b-[12px] border-b-transparent pr-2"></span>
            </div>
            `;
        },
        handleInput(e) {
            if (e.key === 'Enter' && !this.isTyping) {
                const command = this.input.trim().toLowerCase();
                this.input = '';
                this.output.push(this.getPromptHTML() + ' ' + this.escapeHtml(command));

                if (command === 'clear') {
                    this.clearTerminal();
                } else if (command === 'download') {
                    this.downloadCV();
                } else if (this.commands[command]) {
                    this.isTyping = true;
                    this.typeOutput(this.commands[command]);
                } else {
                    this.output.push(this.escapeHtml('Command not found. Type \'help\' for available commands.'));
                }
            }
        },
        typeOutput(text) {
            let i = 0;
            const typing = setInterval(() => {
                if (i === 0) {
                    this.output.push(this.escapeHtml(text[i]));
                } else {
                    this.output[this.output.length - 1] += this.escapeHtml(text[i]);
                }
                i++;
                if (i === text.length) {
                    clearInterval(typing);
                    this.isTyping = false;
                }
            }, 10);
        },
        escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .replace(/\n/g, "<br>");
        },
        clearTerminal() {
            this.output = ['Terminal cleared. Type \'help\' for available commands.'];
        },
        downloadCV() {
            // Replace 'path_to_your_cv.pdf' with the actual path to your CV file
            const link = document.createElement('a');
            link.href = 'ShaunMoore_CV2024.pdf';
            link.download = 'ShaunMoore_CV2024.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.output.push('CV downloaded successfully. <br>' +
                ' Alternatively, you can view my CV online at:' +
                ' <a href="https://prawn185.github.io/ShaunMoore_CV2024.pdf" target="_blank" rel="noopener noreferrer" class="underline text-blue">Online Version</a>');
        }
    },
    updated() {
        this.$nextTick(() => {
            const terminal = this.$refs.terminal;
            terminal.scrollTop = terminal.scrollHeight;
        });
    }
});

app.mount('#app');