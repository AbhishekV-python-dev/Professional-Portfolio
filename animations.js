/**
 * ADVANCED ANIMATIONS - Premium Portfolio Effects
 * Text scramble, typewriter, smooth morphing, and more
 */

// =========================================
// TEXT SCRAMBLE EFFECT
// =========================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// =========================================
// TYPEWRITER EFFECT
// =========================================
class Typewriter {
    constructor(el, words, wait = 2000) {
        this.el = el;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.el.innerHTML = `<span class="typewriter-text">${this.txt}</span><span class="typewriter-cursor">|</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// =========================================
// SMOOTH NUMBER COUNTER
// =========================================
class Counter {
    constructor(el, target, duration = 2000) {
        this.el = el;
        this.target = target;
        this.duration = duration;
        this.start = 0;
        this.startTime = null;
    }
    
    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const progress = Math.min((currentTime - this.startTime) / this.duration, 1);
        const value = Math.floor(progress * (this.target - this.start) + this.start);
        this.el.innerText = value;
        
        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        }
    }
    
    run() {
        requestAnimationFrame((time) => this.animate(time));
    }
}

// =========================================
// MAGNETIC EFFECT (Enhanced)
// =========================================
class MagneticElement {
    constructor(el, strength = 0.5) {
        this.el = el;
        this.strength = strength;
        this.boundingRect = null;
        this.bindEvents();
    }
    
    bindEvents() {
        this.el.addEventListener('mouseenter', () => this.onEnter());
        this.el.addEventListener('mousemove', (e) => this.onMove(e));
        this.el.addEventListener('mouseleave', () => this.onLeave());
    }
    
    onEnter() {
        this.boundingRect = this.el.getBoundingClientRect();
    }
    
    onMove(e) {
        if (!this.boundingRect) return;
        
        const x = e.clientX - this.boundingRect.left - this.boundingRect.width / 2;
        const y = e.clientY - this.boundingRect.top - this.boundingRect.height / 2;
        
        this.el.style.transform = `translate(${x * this.strength}px, ${y * this.strength}px)`;
    }
    
    onLeave() {
        this.el.style.transform = 'translate(0, 0)';
        this.boundingRect = null;
    }
}

// =========================================
// PARALLAX TILT EFFECT
// =========================================
class ParallaxTilt {
    constructor(el, options = {}) {
        this.el = el;
        this.options = {
            maxTilt: 15,
            perspective: 1000,
            scale: 1.05,
            speed: 400,
            ...options
        };
        this.bindEvents();
    }
    
    bindEvents() {
        this.el.addEventListener('mouseenter', () => this.onEnter());
        this.el.addEventListener('mousemove', (e) => this.onMove(e));
        this.el.addEventListener('mouseleave', () => this.onLeave());
    }
    
    onEnter() {
        this.el.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
    }
    
    onMove(e) {
        const rect = this.el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -this.options.maxTilt;
        const rotateY = ((x - centerX) / centerX) * this.options.maxTilt;
        
        this.el.style.transform = `
            perspective(${this.options.perspective}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${this.options.scale})
        `;
    }
    
    onLeave() {
        this.el.style.transition = `transform ${this.options.speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
        this.el.style.transform = `
            perspective(${this.options.perspective}px) 
            rotateX(0deg) 
            rotateY(0deg) 
            scale(1)
        `;
    }
}

// =========================================
// SMOOTH REVEAL ON SCROLL (GSAP-like)
// =========================================
class SmoothReveal {
    constructor(selector, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px',
            ...options
        };
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// =========================================
// CURSOR TRAIL EFFECT
// =========================================
class CursorTrail {
    constructor(count = 10) {
        this.count = count;
        this.trail = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.count; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.opacity = (1 - i / this.count) * 0.5;
            dot.style.transform = `scale(${1 - i / this.count})`;
            document.body.appendChild(dot);
            this.trail.push({
                el: dot,
                x: 0,
                y: 0
            });
        }
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.animate();
    }
    
    animate() {
        let x = this.mouseX;
        let y = this.mouseY;
        
        this.trail.forEach((dot, i) => {
            const nextDot = this.trail[i + 1] || this.trail[0];
            dot.x += (x - dot.x) * (0.3 - i * 0.02);
            dot.y += (y - dot.y) * (0.3 - i * 0.02);
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top = dot.y + 'px';
            x = dot.x;
            y = dot.y;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// =========================================
// LOADING TEXT ANIMATION
// =========================================
class LoadingText {
    constructor(el) {
        this.el = el;
        this.text = el.textContent;
        this.animate();
    }
    
    animate() {
        let dots = 0;
        setInterval(() => {
            dots = (dots + 1) % 4;
            this.el.textContent = this.text + '.'.repeat(dots);
        }, 400);
    }
}

// =========================================
// INITIALIZE ON DOM LOAD
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cursor trail (smaller, subtle effect)
    // Uncomment if you want trail effect:
    // new CursorTrail(8);
    
    // Add CSS for scramble characters
    const style = document.createElement('style');
    style.textContent = `
        .scramble-char {
            color: #ff00ff;
        }
        .typewriter-cursor {
            animation: blink 0.7s infinite;
            color: #00ffff;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Loading text animation
    const loaderText = document.querySelector('.loader-text');
    if (loaderText) {
        new LoadingText(loaderText);
    }
    
    console.log('%c✨ Premium Portfolio Loaded ✨', 'color: #ff00ff; font-size: 20px; font-weight: bold;');
    console.log('%cCrafted with passion by Abhishek', 'color: #00ffff; font-size: 14px;');
});

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TextScramble,
        Typewriter,
        Counter,
        MagneticElement,
        ParallaxTilt,
        SmoothReveal,
        CursorTrail
    };
}
