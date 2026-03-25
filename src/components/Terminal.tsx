import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── Arch Linux ASCII art (EndeavourOS flavour) ──────────────────────────────
const ARCH_ASCII = `                   ./                   
                 .o++\`                  
              \`ooo/                    
            \`+oooo:                   
           \`+oooooo:                  
           -+oooooo+:                 
         \`/:-:++oooo+:                
        \`/++++/+++++++:               
       \`/++++++++++++++:              
      \`/+++ooooooooooooo/\`            
     ./ooosssso++osssssso+\`           
    .oossssso-\`\`\`/ossssss+\`          
   -osssssso.      :ssssssso.         
  :osssssss/        osssso+++.        
 /ossssssss/        +ssssooo/-        
\`/ossssssss+-      \`ossssssso+        
\`+sssssssssso\`    \`+ossosssso-        
 \`+osssssssssso++\`\`+ossssssso         
  \`-/oossssssssssssossssso+/\`         
     \`-/+oossssssssossso+-\`           
         \`-:/+oossso+/:-\`             `;

const FASTFETCH = `${ARCH_ASCII}
  sifat@arch
  ----------
  OS        : EndeavourOS x86_64
  Host      : X510UQ (1.0)
  Kernel    : Linux 6.19.8-arch1-1
  Uptime    : 2 hours, 5 mins
  Packages  : 1276 (pacman)
  Shell     : zsh 5.8
  WM        : niri 25.11 (Wayland)
  Terminal  : ghostty 1.3.1-arc1
  CPU       : Intel Core i5-7200U
  GPU       : Intel HD Graphics 620
  Memory    : 7.83 GiB / 15.50 GiB
  Swap      : 0 B / 17.05 GiB (0%)
  Disk (/)  : 131.45 GiB / 214.4 GiB
  Local IP  : 192.168.0.x (wlan0)
  Battery   : 79% (ASUS Battery)
  Locale    : en_US.UTF-8`;

const INXI = `System:
  Host: arch  Kernel: 6.19.8-arch1-1  arch: x86_64  bits: 64
  Desktop: niri  Distro: EndeavourOS
Machine:
  Type: Laptop  System: ASUSTeK  product: X510UQ  v: 1.0
  Firmware: UEFI  vendor: American Megatrends  v: X510UQ.311
Battery:
  ID-1: BAT0  charge: 33.1 Wh (79.4%)  condition: 41.6/41.6 Wh (100%)
  volts: 11.4  min: 11.4
CPU:
  Info: dual core  model: Intel Core i5-7200U  bits: 64  type: MT MCP
  cache: L2: 512 KiB
  Speed (MHz): avg: 800  min/max: 400/3100  cores: 1: 800 2: 800 3: 800 4: 800
Graphics:
  Device-1: Intel Kaby Lake-U GT2 [HD Graphics 620]  driver: i915  v: kernel
  Display: wayland  compositor: niri  resolution: 1920x1080~60Hz
  API: OpenGL  v: 4.6  vendor: intel mesa  renderer: Mesa Intel HD Graphics 620
Audio:
  Device-1: Intel Sunrise Point-LP HD Audio  driver: snd_hda_intel
  Server-1: PipeWire  v: 1.6.2  status: active
Network:
  Device-1: Intel Wireless 8265 / 8275  driver: iwlwifi
  IF: wlan0  state: up  mac: f8:59:71:42:81:f5
Drives:
  Local Storage: total: 238.47 GiB  used: 131.45 GiB (55.1%)
  ID-1: /dev/sda  model: XTL-200 256GB  size: 238.47 GiB
Partition:
  ID-1: /  size: 214.92 GiB  used: 131.45 GiB (61.2%)  fs: ext4
Sensors:
  System Temperatures: cpu: 52.0 C  pch: 48.0 C
  Fan Speeds (rpm): cpu: 3000
Info:
  Memory: total: 16 GiB  available: 15.5 GiB  used: 7.82 GiB (50.5%)
  Processes: 241  Uptime: 2h 6m  Shell: Zsh  inxi: 3.3.40`;

const CTF_CHALLENGES = [
  `[CTF] Scanning target... nmap -sV -p- 10.0.0.1\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9\n80/tcp open  http    nginx 1.23\nHint: That HTTP port looks juicy. Try /robots.txt`,
  `[CTF] Decoding base64...\necho "Q2hvc2VuX1VuZGVhZA==" | base64 -d\n> Chosen_Undead\nFlag fragment found: flag{base64_`,
  `[CTF] RSA small exponent attack detected!\ne=3, n=... running Håstad's broadcast attack...\nRecovered m = 133713371337\nflag{h4st4d_w4s_right}`,
  `[CTF] Wiener's attack on weak RSA key...\nConverting key to continued fraction...\nd found! Private key recovered.\nflag{w13n3r_strikes_again}`,
];

const ANIME_RESPONSES = [
  `「私は人間じゃない。でも、それが何？」\n— Rem, Re:Zero\n(Translation: "I'm not human. But so what?")`,
  `"If you can't beat the exam, cheat the exam." — Ayanokoji, probably\nBut seriously, study the editorial first.`,
  `[HUNTER×HUNTER] Gon: "I want to use Arch Linux!"\nKillua: "You can't even type sudo without reading the wiki"\nGon: "..."`,
  `"When do you think people die? When they are forgotten!"\n— Dr. Hiluluk`,
  `"Nothing happened."\n— Roronoa Zoro`,
  `"Inherited will, the destiny of the age, the dreams of the people. As long as people continue to pursue the meaning of freedom, these things will never cease to be!"\n— Gol D. Roger`,
  `"If you don't take risks, you can't create a future!"\n— Monkey D. Luffy`,
  `"Power isn't determined by your size, but the size of your heart and dreams!"\n— Monkey D. Luffy`,
  `"You can't bring a dead man back to life. You can't change the past. The only thing you can do is keep moving forward."\n— Jinbe`,
  `"Forgetting is like a wound. The wound may heal, but the scar will always remain."\n— Portgas D. Ace`,
  `"It's not some sort of special power. He has the ability to make allies of everyone he meets."\n— Crocodile about Luffy`,
  `"When the world shoves you around, you just gotta stand up and shove back. It's not like somebody's gonna save you if you start babbling excuses."\n— Roronoa Zoro`,
  `"People's dreams... never end!"\n— Marshall D. Teach`,
  `"No matter how hard or impossible it is, never lose sight of your goal."\n— Monkey D. Luffy`,
  `"Miracles only happen to those who never give up."\n— Ivankov`,
  `"Stop counting what you've lost! What is gone, is gone!"\n— Jinbe`,
  `"If you want to protect something, do it right! Don't let them lay a finger on it!"\n— Roronoa Zoro`,
  `"You want to keep everyone from dying? That's naive. It's war. People die."\n— Trafalgar Law`,
  `"There comes a time when a man has to stand and fight! That time is when his friends' dreams are being laughed at!"\n— Usopp`,
  `"To act is not enough, we must also dream. To dream is not enough, we must also act."\n— Unknown`,
  `"Life is like a pencil that will surely run out, but will leave the beautiful writing of life."\n— Nami`,
  `"Compared to the 'righteous' greed of the rulers, the criminals of the underworld seem far more honorable."\n— Eustass Kid`,
  `"Fools who don't respect the past are likely to repeat it."\n— Nico Robin`,
];

const CP_JOKES = [
  `Codeforces Round result:\nChosen_Undead: +47 rating\nProblem A: ✓ (12 min)\nProblem B: ✓ (31 min)\nProblem C: TLE on test 42 (skill issue)\nProblem D: Did not attempt\n\n"Pupil arc incoming"`,
  `Runtime Error on test 42:\nWhat C++ programmers fear most:\n  int arr[1000]; // should've been 100001\nCurrent rating: Newbie\nExpected rating after fix: Pupil\nActual rating after fix: Newbie (wrong approach)`,
  `O(n²) solution submitted...\nTime limit: 1s\nYour time: 1.001s\n\n"I'll just add -O2... wait that won't help"\nEditorial: "Clearly O(n log n) is required"`,
  `Chosen_Undead submitted 47 times on the same problem.\nTest 1: Wrong Answer\nTest 1: Wrong Answer\nTest 1: Wrong Answer\n...\nTest 1: Accepted\n\nAC is the most beautiful word in the English language.`,
  `Variable shadowing detected:\n  int n = 5;\n  for (int n = 0; n < 10; n++) // 👀\n    cout << n; // which n?\n\nC++ undefined vibes.`,
];

const LINUX_LORE = [
  `pacman -Syu\n:: Synchronizing package databases...\n:: Starting full system upgrade...\n(1/1) upgrading linux  [##########] 100%\nWARNING: Don't reboot into a broken kernel.\nPro tip: Keep a fallback entry in grub.`,
  `niri --version\nniri 25.11\n\n"A scrollable-tiling Wayland compositor"\nHidden fact: Using niri makes you 40% more productive\nand 200% more likely to rice your desktop at 3am.`,
  `[QUICKSHELL] Loading feature/rainmeter-clock branch...\nQml file compiled.\nWARNING: Time widget may look too good.\nUsers may become addicted to staring at system clock.`,
  `[DISTROBOX] Containers initialized:\n  blackarch-latest  [RUNNING]\n  kali-rolling      [RUNNING]\n\nGDB MCP server: ACTIVE\nRadare2 MCP server: ACTIVE\nCodex agent: ACTIVE\n\nYour CTF rig is ready. Now solve something.`,
  `[ENDEAVOUROS] "I use Arch btw"\n(technically EndeavourOS but close enough)\nArch wiki pages read: 847\nAUR packages broken: 3\nTime spent ricing: > time spent coding\nRegrets: 0`,
];

const PORTFOLIO_EGGS = [
  `[HAKIMSHIFAT.GITHUB.IO] Portfolio loaded.\nThemes available:\n  1. TUI Terminal    ← you are here\n  2. Anime/Manga     (weebs welcome)\n  3. Cinematic       (dramatic)\n  4. Lo-fi Retro     (comfy)\n  5. Minimal Dev     (chad mode)\n\nAll hand-crafted. No templates were harmed.`,
  `[ASTRO] Build complete.\ndist/ directory: 2.3 MB\nDeployment target: GitHub Pages\nBlog pipeline: Obsidian → GitHub → Astro → ✓\n\nconfig.yml commit: "fix: the thing that broke the other thing"`,
];

const HIDDEN_COMMANDS: Record<string, string[]> = {
  'sudo rm -rf /': [
    'Executing...',
    'Just kidding. Did you really think I\'d let you do that?',
    'Your filesystem is safe. Unlike your Codeforces rating.',
  ],
  'rm -rf /': [
    'Permission denied.',
    '(Also no. Never.)',
  ],
  ':wq': ['You\'re not in vim. But the instinct to escape is valid.'],
  ':q!': ['There\'s nothing to quit. The terminal is eternal.'],
  'vim': ['Opening vim...\n\nJust kidding. Use neovim like a civilized person.\nnvim is available. vim is a relic.'],
  'neovim': ['nvim is launching...\n\nnvim is blocked for your own protection.\nYou have a deadline.'],
  'nvim': ['nvim blocked. You have a deadline. Use cat.'],
  'vscode': ['Opening VS Code...\n\nJust kidding. Real developers use nvim.\n(But VS Code is probably what you actually use.)'],
  'git push --force': [
    'Are you sure? [y/N]: y',
    'Counting objects: 3, done.',
    'WARNING: You just force-pushed to main.',
    'Your teammates have been notified.',
    'And they are not happy.',
  ],
  'git blame': ['The blame is always yourself. You wrote it at 3am. We all know.'],
  'git': [
    'git status:',
    '  On branch main',
    '  Your branch is behind origin/main by 47 commits.',
    '  (You know you should pull first.)',
  ],
  'merge_conflict': [
    'Merge conflict detected!',
    '',
    '<<<<<<< HEAD',
    'Your code',
    '=======',
    'Their code',
    '>>>>>>> branch',
    '',
    '"Choose violence. Delete both."',
  ],
  'ls -la': [
    'total 48',
    'drwxr-xr-x  sifat sifat  projects/',
    'drwxr-xr-x  sifat sifat  ctf-writeups/',
    '-rw-r--r--  sifat sifat  codeforces_rating_goals.txt',
    '-rw-------  sifat sifat  .ssh/id_rsa  ← don\'t even think about it',
    '-rw-r--r--  sifat sifat  .zshrc  (1847 lines of aliases)',
    'drwxr-xr-x  sifat sifat  .config/niri/',
    '-rw-r--r--  sifat sifat  regrets.txt  (0 bytes)',
  ],
  'cat .zshrc': [
    '# .zshrc — a monument to procrastination',
    'alias update="sudo pacman -Syu && yay -Syu"',
    'alias please="sudo"',
    'alias yeet="rm -rf"',
    'alias cf="xdg-open https://codeforces.com"',
    'alias rice="echo \'you are already ricing\'"',
    'alias skill-issue="man 1 skill"',
    '# 1840 more lines...',
  ],
  'cat regrets.txt': [''],
  'pacman -Syu': [
    ':: Synchronizing package databases...',
    ' core          [######################] 100%',
    ' extra         [######################] 100%',
    ':: Starting full system upgrade...',
    'there is nothing to do',
    '(Your system is already perfect. Probably.)',
  ],
  'yay': ['yay: command available but blocked in this terminal. Try \'pacman -Ss [package]\' instead.'],
  'htop': [
    'PID  USER   %CPU  %MEM  COMMAND',
    '1    sifat   0.0   0.1  niri',
    '234  sifat  12.3   8.4  ghostty (too many tabs)',
    '891  sifat  45.2  15.2  firefox (codeforces editorial)',
    '902  sifat   3.1   2.0  codex-agent',
    '1337 sifat  99.9  31.1  procrastination-daemon',
    'Press q to quit (just like your last Codeforces contest)',
  ],
  'codeforces': [
    'Opening Codeforces...',
    'User: Chosen_Undead',
    'Rank: Newbie (soon™)',
    'Rating: ???',
    'Problems solved: many (most on 3rd+ attempt)',
    'Favourite problem type: simulation, greedy',
    'Most feared: graph problems with 10^18 edge weights',
  ],
  'ctf': [
    '[CTF TOOLKIT]',
    'Available tools: gdb, radare2, pwntools, netcat, burpsuite',
    'MCP servers: filesystem, memory, sequential-thinking, CyberChef',
    'Containers: BlackArch, Kali (via Distrobox)',
    'Specialties: RSA attacks, OSINT, binary exploitation (learning)',
    '',
    'Solved recently:',
    '  ✓ Small exponent attack (e=3)',
    '  ✓ Wiener\'s attack (weak RSA)',
    '  ~ Symbol decoding (partial)',
    '  ~ OSINT challenge (partial)',
  ],
  'rice': [
    '[DOTFILES STATUS]',
    'WM       : niri (scrollable-tiling Wayland)',
    'Shell    : zsh + starship prompt',
    'Terminal : ghostty',
    'Editor   : neovim',
    'Bar      : Quickshell',
    'Launcher : rofi (probably)',
    'Theme    : whatever looks cool at 3am',
    '',
    '"Ricing is not a hobby. It\'s a lifestyle disorder." — every Arch user ever',
  ],
  'chosen_undead': [
    '"Bearer of the curse..."',
    '',
    'You died.',
    '',
    'But that\'s fine. You always come back.',
    'Codeforces contests. CTF challenges. Kernel updates.',
    'The Chosen Undead persists.',
  ],
  'dark souls': [
    'YOU DIED',
    '',
    '> Try finger, but hole',
    '> Praise the sun \\\\[T]/',
    '> Don\'t give up, skeleton',
  ],
  'evangelion': [
    'NERV MAGI SYSTEM ONLINE',
    'Caspar: CONFIRMED',
    'Balthasar: CONFIRMED',
    'Melchior: CONFIRMED',
    '',
    'Synchronization rate: 400%',
    'WARNING: Terminal has gone berserk.',
    'This is not an AT Field. This is just CSS.',
  ],
  'niri': [
    'niri 25.11 — scrollable-tiling Wayland compositor',
    '',
    'Active workspaces: 7',
    'Windows open: 23 (you have a problem)',
    'Hotkeys memorized: 4 out of 47',
    '',
    '"It\'s like i3 but I can scroll. Totally necessary."',
  ],
  'obsidian': [
    '[OBSIDIAN VAULT: ~/notes]',
    'Notes: 847',
    'Backlinks: 2,341',
    'Orphaned notes: 12 (ideas that went nowhere)',
    'Daily notes streak: broken (again)',
    '',
    'Publishing pipeline: Obsidian → GitHub → Astro → Blog',
    'Status: Operational',
    '',
    '[[Untitled]] [[TODO]] [[Ideas]] [[someday-maybe]]',
  ],
  'ssh sifat@arch': [
    'ssh: connect to host arch port 22: No route to host',
    '',
    'Nice try.',
    'This is a portfolio terminal, not an actual shell.',
    '(If it were real, you\'d need my SSH key anyway.)',
  ],
  'fortune': [
    '"The best time to plant a tree was 20 years ago. The second best time is to solve Problem B before the contest ends."',
    '"Do or do not. There is no try. There is only Wrong Answer and Time Limit Exceeded."',
    '"The journey of a thousand commits begins with a single git init."',
    '"To err is human, to blame the judge is programmer."',
  ],
  'sl': ['🚂💨   choo choo\n(You meant ls. We all do this.)'],
  'cowsay': [' _________\n< moo? >\n ---------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||'],
  'which god': ['god: /usr/bin/arch-wiki-lu'],
  'cat /etc/os-release': [
    'NAME="EndeavourOS"',
    'VERSION="Gemini"',
    'ID=endeavouros',
    'ID_LIKE=arch',
    'BUILD_ID=2024.04.20',
    'ANSI_COLOR="1;32"',
    'HOME_URL="https://endeavouros.com"',
    'PRETTY_NAME="EndeavourOS"',
  ],
  'uname -a': ['Linux arch 6.19.8-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'],
  'ping codeforces.com': [
    'PING codeforces.com (76.223.x.x): 56 data bytes',
    '64 bytes from codeforces.com: icmp_seq=0 ttl=234 time=89.3 ms',
    '64 bytes from codeforces.com: icmp_seq=1 ttl=234 time=91.2 ms',
    '--- codeforces.com ping statistics ---',
    '2 packets transmitted, 2 received, 0% packet loss',
    '',
    'Server is up. Your excuses are not.',
  ],
  'nmap': ['Starting Nmap 7.94...\nNote: This is a portfolio. There\'s nothing to scan.\nBut good instincts.'],
  'ls /home/sifat': [
    'Desktop/  Documents/  Downloads/  Music/',
    'Pictures/ Videos/     .config/    .local/',
    'projects/ ctf/        rice/       notes/',
    '.zshrc    .gitconfig  .ssh/       portfolio/',
  ],
  '42': ['The Answer to the Ultimate Question of Life, the Universe, and Everything.\n\nAlso: the test case your solution always fails on.'],
  'sudo make me a sandwich': ['...okay.\n\n🥪\n\nBecause you said sudo.'],
  'make': ['make: *** No targets specified and no makefile found. Stop.\n(Story of my life.)'],
  'exit 1': ['Exiting with error code 1.\n(Something always goes wrong at the last minute.)'],
  'man woman': ['No manual entry for woman.\n(Classic Unix joke. Very old. Still in here.)'],
  'reboot': ['Rebooting...\n\n[  OK  ] Reached target System Shutdown\n[  OK  ] Unmounting filesystems\n\nJust kidding. The portfolio stays up.'],
  'systemctl status life': [
    '● life.service — The Human Experience',
    '   Loaded: loaded (/lib/systemd/system/life.service)',
    '   Active: active (running) since birth',
    '  Process: 0 ExecStart=/usr/bin/exist',
    ' Main PID: 1 (sifat)',
    '   CGroup: /system.slice/life.service',
    '           └─1 /usr/bin/exist --arch-linux --no-sleep',
    '',
    'Mar 23 03:14:15 arch sifat[1]: WARNING: caffeine levels critical',
    'Mar 23 03:14:16 arch sifat[1]: NOTICE: contest starts in 4 hours',
    'Mar 23 03:14:17 arch sifat[1]: DEBUG: ricing instead of sleeping',
  ],
  'lsblk': [
    'NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS',
    'sda      8:0    0 238.5G  0 disk',
    '├─sda1   8:1    0     2G  0 part /boot/efi',
    '├─sda2   8:2    0 214.9G  0 part /',
    '└─sda3   8:3    0  17.1G  0 part [SWAP]',
  ],
  'leetcode': [
    'LeetCode detected!',
    '',
    'Problem: Two Sum (Easy)',
    'Your submissions: 47',
    'Accepted: 3',
    'Time: 2 hours',
    '',
    '"Maybe try Codeforces instead?"',
  ],
  'bd_internet': [
    'Internet status:',
    '  BSCPL → "Have you tried turning it off and on?"',
    '  Speed: 2G when it rains',
    '  Packet loss: Feature, not a bug',
  ],
  'deadline': [
    'Deadline tracker:',
    '  Smart Parking System: 3 days left',
    '  Codeforces contest: Tomorrow',
    '  Sleep schedule: Already dead',
    '  Motivation: Loading...',
  ],
  'elden ring': [
    'ELDEN RING LOADED',
    '',
    'Your status:',
    '  Level: 1 (still)',
    '  Runes: 0 (died too much)',
    '  Boss attempts: ∞',
    '',
    '"Try finger, but hole"',
  ],
  'minecraft': [
    'Minecraft server status:',
    '  Herobrine joined the game',
    '  Your house: Exploded',
    '  Diamonds: Fell in lava',
    '',
    '"It\'s a feature"',
  ],
  'chatgpt': [
    'ChatGPT is thinking...',
    '',
    '"I\'m sorry, I can\'t help with that."',
    '',
    '(Even AI has standards.)',
  ],
  'copilot': [
    'GitHub Copilot suggestion:',
    '  // I\'m sorry, I can\'t complete this',
    '  // Your code is... unique',
    '',
    '[Copilot has left the chat]',
  ],
  'ai': [
    'AI taking over:',
    '  Codeforces: ✓ (solves problems)',
    '  CTF: ✓ (finds flags)',
    '  Your job: ✓ (automated)',
    '  Sleep: ✗ (still broken)',
  ],
  'flag': [
    'CTF Flag collector:',
    '  Pwn: 0',
    '  Crypto: 3',
    '  Web: 2',
    '  Rev: 1',
    '  Forensics: 1',
    '',
    '"Skill issue" - everyone',
  ],
  '/flag': [
    'ZzE3X2cxN2h1Yl80cjNfZDFmZjNyM243'
  ],
  'kali': [
    'Kali Linux installed!',
    '',
    'Now what?',
    '  a) Run sqlmap',
    '  b) Feel like a hacker',
    '  c) Google "how to use kali"',
    '  d) All of the above',
  ],
  'rickroll': [
    '🎵 Never gonna give you up',
    'Never gonna let you down',
    'Never gonna run around',
    'And desert you 🎵',
    '',
    '(You got rickrolled in a terminal. Impressive.)',
  ],
  'this_is_fine': [
    '🔥🔥🔥',
    '[This is fine]',
    '🔥🔥🔥',
    '',
    'Production: on fire',
    'Deadline: yesterday',
    'You: "This is fine"',
  ],
  'who_made_this': [
    'Creator info:',
    '  Name: sifat',
    '  Location: Bangladesh',
    '  Status: Alive (somehow)',
    '  Sleep schedule: Deceased',
    '  Arch user: Yes, he\'s one of those',
  ],
  'easter_egg': [
    'You found the easter egg!',
    '',
    '🥚',
    '',
    'Prize: Nothing.',
    'But you get the satisfaction.',
    '(Just like solving CTF challenges.)',
  ],
};

type Lines = string[];

const getRandomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [history, setHistory] = useState<Lines>([
    '╔════════════════════════════════════════╗',
    '║  sifat@arch ~ portfolio terminal v2.0 ║',
    '╚════════════════════════════════════════╝',
    '',
    'EndeavourOS 6.19.8-arch1-1 x86_64',
    'Type "help" for commands. Type "fastfetch" to flex.',
    '',
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const COMMANDS: Record<string, Lines> = {
    help: [
      '┌─────────────────────────────────────────────┐',
      '│              AVAILABLE COMMANDS              │',
      '├─────────────────────────────────────────────┤',
      '│ System    : fastfetch, inxi -F, uname -a    │',
      '│             htop, lsblk, uptime, date       │',
      '│             cat /etc/os-release             │',
      '│ Files     : ls, ls -la, ls /home/sifat      │',
      '│             cat .zshrc, cat regrets.txt     │',
      '│ Network   : ping [host], nmap, ssh          │',
      '│ Package   : pacman -Syu, yay                │',
      '│ Portfolio : projects, blog, socials, about  │',
      '│ CTF       : ctf, nmap, hack, decode, kali   │',
      '│                                             │',
      '│ Rice      : rice, niri, neofetch, obsidian  │',
      '│ Fun       : anime, evangelion, fortune      │',
      '│             sl, cowsay, 42, chosen_undead   │',
      '│             dark souls, sudo make me a...   │',
      '│             systemctl status life           │',
      '│             codeforces, cp, git blame       │',
      '│ Games     : elden ring, minecraft           │',
      '│ Tech      : leetcode, vscode, chatgpt       │',
      '│             copilot, ai, bd_internet        │',
      '│ Memes     : rickroll, this_is_fine          │',
      '│             easter_egg, who_made_this       │',
      '│ Shell     : clear, exit, history            │',
      '└─────────────────────────────────────────────┘',
      '',
      'Hint: Some commands have hidden outputs. Explore.',
    ],
    fastfetch: FASTFETCH.split('\n'),
    neofetch: FASTFETCH.split('\n'),
    'inxi -f': INXI.split('\n'),
    uptime: ['up 2 hours, 5 minutes, 33 seconds  load average: 0.52, 0.48, 0.41'],
    date: [new Date().toString()],
    whoami: ['sifat  uid=1000(sifat) gid=1000(sifat) groups=1000(sifat),998(wheel),973(docker)'],
    ls: [
      'drwxr-xr-x  projects/       drwxr-xr-x  ctf/',
      'drwxr-xr-x  notes/          drwxr-xr-x  rice/',
      '-rw-r--r--  portfolio/      -rw-r--r--  .zshrc',
      '-rw-------  .ssh/           -rw-r--r--  regrets.txt',
    ],
    pwd: ['/home/sifat/git/portfolio'],
    about: [
      'sifat — CS/SE student, EndeavourOS enjoyer',
      'Building: Smart Parking System + Security & Fire Alert',
      'Competing: Codeforces (Chosen_Undead)',
      'Breaking: CTF challenges (RSA, OSINT, binary)',
      'Ricing: niri + Quickshell + ghostty + too many themes',
      'Writing: hakimshifat.github.io (Astro blog)',
      '',
      '"I use Arch btw" — yes, technically EndeavourOS.',
    ],
    projects: [
      '1. Smart Parking System w/ Security & Fire Alert',
      '   └─ Group project, active development',
      '2. Portfolio (hakimshifat.github.io)',
      '   └─ Astro, 5 themes, Obsidian pipeline',
      '3. CTF Agentic Setup',
      '   └─ Codex + Distrobox + GDB/r2 MCPs',
      '4. Quickshell date/time widget',
      '   └─ branch: feature/rainmeter-clock',
      '',
      'Type "projects --more" for extended list.',
    ],
    'projects --more': [
      'Past / ongoing experiments:',
      '  - C++ competitive programming solutions',
      '  - Obsidian vault → blog publishing pipeline',
      '  - EndeavourOS dotfiles (unreleased)',
      '  - Various CTF writeups',
      '',
      '"Build things that matter. Rice the rest."',
    ],
    blog: [
      'LATEST POSTS @ hakimshifat.github.io/blog',
      '─────────────────────────────────────────',
      'Pipeline: Obsidian → GitHub → Astro → Pages',
      '',
      '(Go read them. They exist now.)',
    ],
    socials: [
      'GitHub    : github.com/hakimshifat',
      'Portfolio : hakimshifat.github.io',
      'Codeforces: codeforces.com/profile/Chosen_Undead',
    ],
    contact: [
      'Best way to reach me: GitHub issues / portfolio contact form',
      'Alternatively: send a message in a CTF challenge',
      '(Just kidding. Use the contact page.)',
    ],
    version: ['portfolio-terminal v2.0.0  //  EndeavourOS shell simulation'],
    clear: [],
    history: [],
    cp: [getRandomFrom(CP_JOKES)],
    decode: [getRandomFrom(CTF_CHALLENGES)],
    hack: [
      'INITIALIZING_BRUTE_FORCE...',
      '[████████████████████] 100%',
      'CRACKING_RSA_KEY...',
      'e=3 detected. Applying Håstad broadcast attack.',
      '[████████████████████] 100%',
      'ACCESS_GRANTED.',
      '',
      'Just kidding. But the RSA knowledge is real.',
    ],
    ping: [
      'Usage: ping [host]',
      'Try: ping codeforces.com',
      '     ping 8.8.8.8',
    ],
    'ping 8.8.8.8': [
      'PING 8.8.8.8: 56 data bytes',
      '64 bytes from 8.8.8.8: icmp_seq=0 ttl=117 time=12.4 ms',
      '64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=13.1 ms',
      '--- 8.8.8.8 ping statistics ---',
      '2 packets transmitted, 2 received, 0% packet loss',
    ],
    'cat about.md': [
      '# sifat',
      '',
      'CS/SE student. Arch user. CTF enjoyer.',
      'I build things, break things, and rice things.',
      'Currently: learning to solve Div.2 D problems without crying.',
    ],
    weather: ['Sky: Clear  Temp: 28°C  Humidity: 72%  Wind: 12km/h NW\nLocation: Comilla, Bangladesh'],
    fortune: [getRandomFrom([
      '"The best code is code you don\'t have to write."',
      '"To understand recursion, you must first understand recursion."',
      '"It works on my machine." — famous last words before deployment',
      '"Premature optimization is the root of all evil." — Knuth\n"But have you tried it?" — every competitive programmer',
    ])],
    joke: [
      'Why do Arch users always tell you they use Arch?',
      '',
      'Because the installer told them to.',
      '',
      '(Also: the AUR made them feel superior and they can\'t stop.)',
    ],
    sudo: ['[sudo] password for sifat: \nsorry, try again.\n[sudo] password for sifat: \nsorry, try again.\n[sudo] password for sifat: \nsudo: 3 incorrect password attempts\n(We both know you know the password. This is a portfolio.)'],
    exit: [],
  };

  const addLines = (lines: Lines) => {
    setHistory(h => [...h, ...lines]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (!raw) return;

    // Track command history
    setCmdHistory(h => [raw, ...h]);
    setHistIdx(-1);

    const prompt = `sifat@arch ~/portfolio ❯ ${raw}`;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      addLines([prompt, 'logout', '']);
      setTimeout(() => setIsOpen(false), 600);
      setInput('');
      return;
    }

    if (cmd === 'history') {
      addLines([prompt, ...cmdHistory.map((c, i) => `  ${cmdHistory.length - i}  ${c}`), '']);
      setInput('');
      return;
    }

    if (cmd === 'inxi -f' || cmd === 'inxi') {
      addLines([prompt, ...INXI.split('\n'), '']);
      setInput('');
      return;
    }

    if (cmd.startsWith('echo ')) {
      addLines([prompt, raw.slice(5), '']);
      setInput('');
      return;
    }

    // Easter eggs
    if (HIDDEN_COMMANDS[cmd]) {
      addLines([prompt, ...HIDDEN_COMMANDS[cmd], '']);
      setInput('');
      return;
    }

    // Random easter egg triggers
    if (cmd === 'anime') {
      addLines([prompt, ...getRandomFrom(ANIME_RESPONSES).split('\n'), '']);
      setInput('');
      return;
    }

    if (cmd === 'ctf') {
      addLines([prompt, ...COMMANDS.ctf, '']);
      setInput('');
      return;
    }

    if (cmd === 'cp') {
      addLines([prompt, ...getRandomFrom(CP_JOKES).split('\n'), '']);
      setInput('');
      return;
    }

    if (cmd === 'fortune') {
      addLines([prompt, ...getRandomFrom([
        '"The best code is code you don\'t have to write."',
        '"To understand recursion, you must first understand recursion."',
        '"It works on my machine." — famous last words',
        '"Premature optimization: root of all evil." — Knuth',
      ]).split('\n'), '']);
      setInput('');
      return;
    }

    if (COMMANDS[cmd] !== undefined) {
      const output = COMMANDS[cmd];
      addLines([prompt, ...output, '']);
    } else {
      addLines([
        prompt,
        `zsh: command not found: ${raw}`,
        `Hint: try 'help' or check if you meant something else.`,
        '',
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx] ?? '');
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[var(--accent)] text-black flex items-center justify-center rounded-none hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,0,0.3)]"
        title="Open Terminal"
        aria-label="Toggle terminal"
      >
        <span className="font-mono font-bold text-xl">{'>_'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-8 z-50 w-[800px] h-[500px] bg-[#0a0a0a] border border-[var(--accent)]/30 shadow-2xl flex flex-col overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(0,255,0,0.08), 0 20px 60px rgba(0,0,0,0.8)' }}
          >
            {/* Title bar */}
            <div className="bg-[#111] px-4 py-2 border-b border-[var(--accent)]/10 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]/80">
                  ghostty — sifat@arch
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white/80 text-sm w-5 h-5 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-4 font-mono text-[11px] overflow-y-auto cursor-text leading-relaxed"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,0,0.2) transparent' }}
            >
              {history.map((line, i) => {
                const isPrompt = line.includes('❯');
                const isError = line.startsWith('zsh:') || line.startsWith('[sudo]') || line.startsWith('sorry');
                const isHeader = line.startsWith('╔') || line.startsWith('╚') || line.startsWith('║') || line.startsWith('┌') || line.startsWith('└') || line.startsWith('├') || line.startsWith('│');
                const isGreen = isPrompt || isHeader || line.startsWith('  OS') || line.startsWith('  Host') || line.startsWith('  Kernel') || line.startsWith('  WM') || line.startsWith('  Shell') || line.startsWith('  Terminal') || line.startsWith('  CPU') || line.startsWith('  GPU') || line.startsWith('  Memory') || line.startsWith('  sifat@arch');

                return (
                  <div
                    key={i}
                    className={
                      isGreen
                        ? 'text-[var(--accent)]'
                        : isError
                        ? 'text-red-400/80'
                        : 'text-white/65'
                    }
                    style={{ whiteSpace: 'pre' }}
                  >
                    {line}
                  </div>
                );
              })}

              {/* Input line */}
              <form onSubmit={handleCommand} className="flex items-center mt-1">
                <span className="text-[var(--accent)] mr-2 shrink-0">sifat@arch ~/portfolio ❯</span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white caret-[var(--accent)]"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
