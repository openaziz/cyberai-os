document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    
    // State
    let commandHistory = [];
    let historyIndex = -1;
    let currentDirectory = '/home/user';
    
    // File system simulation
    const fileSystem = {
        '/': {
            type: 'directory',
            children: {
                'home': {
                    type: 'directory',
                    children: {
                        'user': {
                            type: 'directory',
                            children: {
                                'models': {
                                    type: 'directory',
                                    children: {
                                        'tinyllama-1.1b.gguf': { type: 'file', size: '400MB' },
                                        'llama-2-7b.gguf': { type: 'file', size: '4GB' },
                                        'README.md': { type: 'file', size: '2KB' }
                                    }
                                },
                                'data': {
                                    type: 'directory',
                                    children: {
                                        'training.jsonl': { type: 'file', size: '15MB' },
                                        'config.json': { type: 'file', size: '4KB' }
                                    }
                                },
                                'scripts': {
                                    type: 'directory',
                                    children: {
                                        'run_model.py': { type: 'file', size: '3KB' },
                                        'train.py': { type: 'file', size: '8KB' },
                                        'utils.py': { type: 'file', size: '5KB' }
                                    }
                                },
                                'README.md': { type: 'file', size: '5KB' }
                            }
                        }
                    }
                },
                'bin': {
                    type: 'directory',
                    children: {
                        'python': { type: 'file', size: '15MB' },
                        'llama-cpp': { type: 'file', size: '8MB' }
                    }
                }
            }
        }
    };
    
    // Initialize
    init();
    
    function init() {
        // Show welcome message
        printWelcomeMessage();
        
        // Focus input
        terminalInput.focus();
        
        // Add event listeners
        terminalInput.addEventListener('keydown', handleKeyDown);
    }
    
    function printWelcomeMessage() {
        const welcomeMessage = `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗  █████╗ ██╗     ██████╗ ███████╗
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗██╔════╝
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████║██║     ██║  ██║███████╗
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗██╔══██║██║     ██║  ██║╚════██║
╚██████╗   ██║   ██████╔╝███████╗██║  ██║██║  ██║███████╗██████╔╝███████║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝
                                                                          
CyberAI OS Terminal v1.0.0
نظام ذكاء اصطناعي محلي بدون مفاتيح API

اكتب 'help' للحصول على قائمة الأوامر المتاحة.
`;
        
        printOutput(welcomeMessage);
    }
    
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            const command = terminalInput.value.trim();
            
            if (command) {
                // Add command to history
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                
                // Print command
                printOutput(`<span class="terminal-prompt">$</span> <span class="command-text">${command}</span>`);
                
                // Execute command
                executeCommand(command);
                
                // Clear input
                terminalInput.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            
            // Auto-complete
            autoComplete();
        }
    }
    
    function printOutput(text) {
        terminalOutput.innerHTML += `<div>${text}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function executeCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        switch (cmd) {
            case 'help':
                showHelp();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'version':
                showVersion();
                break;
            case 'date':
                showDate();
                break;
            case 'echo':
                echoMessage(args.join(' '));
                break;
            case 'ls':
                listDirectory(args[0]);
                break;
            case 'cd':
                changeDirectory(args[0]);
                break;
            case 'pwd':
                printWorkingDirectory();
                break;
            case 'cat':
                catFile(args[0]);
                break;
            case 'run':
                runModel(args[0]);
                break;
            default:
                printOutput(`<span class="error">Command not found: ${cmd}</span>`);
                printOutput(`Type 'help' to see available commands.`);
        }
    }
    
    function showHelp() {
        const helpText = `
<span class="help-title">Available Commands:</span>

<span class="command">help</span>        - Show this help message
<span class="command">clear</span>       - Clear the terminal screen
<span class="command">version</span>     - Show system version
<span class="command">date</span>        - Show current date and time
<span class="command">echo [message]</span> - Print a message
<span class="command">ls [directory]</span> - List directory contents
<span class="command">cd [directory]</span> - Change directory
<span class="command">pwd</span>         - Print working directory
<span class="command">cat [file]</span>  - Display file contents
<span class="command">run [model]</span> - Run AI model
`;
        
        printOutput(helpText);
    }
    
    function clearTerminal() {
        terminalOutput.innerHTML = '';
    }
    
    function showVersion() {
        printOutput(`CyberAI OS v1.0.0`);
    }
    
    function showDate() {
        const now = new Date();
        printOutput(now.toLocaleString('ar-SA'));
    }
    
    function echoMessage(message) {
        printOutput(message || '');
    }
    
    function listDirectory(dirPath) {
        const path = dirPath || currentDirectory;
        const normalizedPath = normalizePath(path);
        
        const dir = getFileSystemObject(normalizedPath);
        
        if (!dir) {
            printOutput(`<span class="error">ls: cannot access '${path}': No such file or directory</span>`);
            return;
        }
        
        if (dir.type !== 'directory') {
            printOutput(`<span class="error">ls: cannot list '${path}': Not a directory</span>`);
            return;
        }
        
        const children = dir.children;
        let output = '';
        
        for (const name in children) {
            const item = children[name];
            const itemType = item.type === 'directory' ? 'directory' : 'file';
            output += `<span class="${itemType}">${name}</span>${item.type === 'directory' ? '/' : ''}${item.size ? ' (' + item.size + ')' : ''}\n`;
        }
        
        printOutput(output);
    }
    
    function changeDirectory(dirPath) {
        if (!dirPath) {
            currentDirectory = '/home/user';
            return;
        }
        
        const normalizedPath = normalizePath(dirPath);
        
        const dir = getFileSystemObject(normalizedPath);
        
        if (!dir) {
            printOutput(`<span class="error">cd: no such file or directory: ${dirPath}</span>`);
            return;
        }
        
        if (dir.type !== 'directory') {
            printOutput(`<span class="error">cd: not a directory: ${dirPath}</span>`);
            return;
        }
        
        currentDirectory = normalizedPath;
    }
    
    function printWorkingDirectory() {
        printOutput(currentDirectory);
    }
    
    function catFile(filePath) {
        if (!filePath) {
            printOutput(`<span class="error">cat: missing file operand</span>`);
            return;
        }
        
        const normalizedPath = normalizePath(filePath);
        
        const file = getFileSystemObject(normalizedPath);
        
        if (!file) {
            printOutput(`<span class="error">cat: ${filePath}: No such file or directory</span>`);
            return;
        }
        
        if (file.type !== 'file') {
            printOutput(`<span class="error">cat: ${filePath}: Is a directory</span>`);
            return;
        }
        
        // Simulate file contents
        let content = '';
        
        if (normalizedPath.endsWith('README.md')) {
            content = `# CyberAI OS

نظام ذكاء اصطناعي محلي بدون مفاتيح API

## نظرة عامة

CyberAI OS هو نظام متكامل لتشغيل نماذج الذكاء الاصطناعي محلياً على جهازك الشخصي. يوفر النظام واجهة سهلة الاستخدام للتفاعل مع النماذج المختلفة دون الحاجة إلى مفاتيح API خارجية.

## المميزات

- تشغيل نماذج الذكاء الاصطناعي محلياً
- خصوصية كاملة للبيانات
- دعم لمجموعة متنوعة من النماذج
- واجهة دردشة متقدمة
- إمكانية تدريب النماذج وتخصيصها

## البدء السريع

راجع دليل الإعداد للحصول على تعليمات التثبيت والاستخدام.`;
        } else if (normalizedPath.endsWith('config.json')) {
            content = `{
  "model": "tinyllama-1.1b",
  "parameters": {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 1024
  },
  "system_prompt": "أنت مساعد ذكي ومفيد تقدم إجابات دقيقة وواضحة."
};
        } else if (normalizedPath.endsWith('run_model.py')) {
            content = `from llama_cpp import Llama

def run_model(model_path, prompt, temperature=0.7, max_tokens=1024):
    """
    Run inference with the specified model.
    
    Args:
        model_path: Path to the model file
        prompt: User prompt
        temperature: Sampling temperature
        max_tokens: Maximum tokens to generate
        
    Returns:
        Generated text
    """
    model = Llama(model_path)
    
    response = model.create_chat_completion([
        {"role": "user", "content": prompt}
    ], temperature=temperature, max_tokens=max_tokens)
    
    return response["choices"][0]["message"]["content"]

if __name__ == "__main__":
    model_path = "models/tinyllama-1.1b.gguf"
    prompt = "مرحباً، كيف حالك؟"
    
    response = run_model(model_path, prompt)
    print(response)`;
        } else {
            content = `[File contents not available for preview]`;
        }
        
        printOutput(`<pre>${content}</pre>`);
    }
    
    function runModel(modelName) {
        if (!modelName) {
            printOutput(`<span class="error">run: missing model name</span>`);
            printOutput(`Available models: tinyllama-1.1b, llama-2-7b`);
            return;
        }
        
        printOutput(`<span class="info">Loading model ${modelName}...</span>`);
        
        // Simulate model loading and inference
        setTimeout(() => {
            printOutput(`<span class="success">Model ${modelName} loaded successfully!</span>`);
            
            printOutput(`<span class="info">Starting chat session with ${modelName}...</span>`);
            
            setTimeout(() => {
                printOutput(`<span class="ai-message">مرحباً! أنا نموذج ${modelName}. كيف يمكنني مساعدتك اليوم؟</span>`);
                
                printOutput(`<span class="info">Chat session started. Type your messages in the terminal.</span>`);
                printOutput(`<span class="info">Note: This is a simulation. In a real implementation, you would interact with the actual AI model.</span>`);
            }, 1000);
        }, 2000);
    }
    
    function autoComplete() {
        const input = terminalInput.value;
        const parts = input.split(' ');
        
        if (parts.length <= 1) {
            // Command auto-complete
            const cmd = parts[0].toLowerCase();
            const commands = ['help', 'clear', 'version', 'date', 'echo', 'ls', 'cd', 'pwd', 'cat', 'run'];
            
            const matches = commands.filter(c => c.startsWith(cmd));
            
            if (matches.length === 1) {
                terminalInput.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                printOutput(`<span class="info">Available commands:</span>`);
                printOutput(matches.join('  '));
            }
        } else if (parts[0] === 'cd' || parts[0] === 'ls' || parts[0] === 'cat') {
            // Path auto-complete
            const pathPrefix = parts[1] || '';
            const currentDir = getFileSystemObject(currentDirectory);
            
            if (!currentDir || currentDir.type !== 'directory') return;
            
            const children = currentDir.children;
            const matches = [];
            
            for (const name in children) {
                if (name.startsWith(pathPrefix)) {
                    matches.push(name + (children[name].type === 'directory' ? '/' : ''));
                }
            }
            
            if (matches.length === 1) {
                terminalInput.value = `${parts[0]} ${matches[0]}`;
            } else if (matches.length > 1) {
                printOutput(`<span class="info">Available paths:</span>`);
                printOutput(matches.join('  '));
            }
        } else if (parts[0] === 'run') {
            // Model auto-complete
            const modelPrefix = parts[1] || '';
            const models = ['tinyllama-1.1b', 'llama-2-7b'];
            
            const matches = models.filter(m => m.startsWith(modelPrefix));
            
            if (matches.length === 1) {
                terminalInput.value = `run ${matches[0]}`;
            } else if (matches.length > 1) {
                printOutput(`<span class="info">Available models:</span>`);
                printOutput(matches.join('  '));
            }
        }
    }
    
    function normalizePath(path) {
        // If path is absolute, use it as is
        if (path.startsWith('/')) {
            return path;
        }
        
        // If path is relative, combine with current directory
        let result = currentDirectory;
        
        if (!result.endsWith('/')) {
            result += '/';
        }
        
        result += path;
        
        // Handle '..' (parent directory)
        const parts = result.split('/');
        const normalized = [];
        
        for (const part of parts) {
            if (part === '' || part === '.') {
                continue;
            } else if (part === '..') {
                normalized.pop();
            } else {
                normalized.push(part);
            }
        }
        
        return '/' + normalized.join('/');
    }
    
    function getFileSystemObject(path) {
        if (path === '/') {
            return fileSystem['/'];
        }
        
        const parts = path.split('/').filter(p => p);
        let current = fileSystem['/'];
        
        for (const part of parts) {
            if (!current || current.type !== 'directory' || !current.children[part]) {
                return null;
            }
            
            current = current.children[part];
        }
        
        return current;
    }
});
