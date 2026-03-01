// main.js - Funcionalidades do site

// Menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Carrossel de depoimentos
    const carrossel = {
        depoimentos: document.querySelectorAll('.depoimento'),
        indicadores: document.querySelectorAll('.indicador'),
        prevBtn: document.querySelector('.prev'),
        nextBtn: document.querySelector('.next'),
        currentIndex: 0,
        
        init: function() {
            if (this.depoimentos.length === 0) return;
            
            this.showDepoimento(this.currentIndex);
            
            // Eventos dos botões
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }
            
            // Eventos dos indicadores
            this.indicadores.forEach((indicador, index) => {
                indicador.addEventListener('click', () => this.goTo(index));
            });
            
            // Auto-rotacionar a cada 5 segundos
            this.startAutoRotate();
        },
        
        showDepoimento: function(index) {
            // Esconde todos
            this.depoimentos.forEach(dep => dep.classList.remove('active'));
            this.indicadores.forEach(ind => ind.classList.remove('active'));
            
            // Mostra o atual
            this.depoimentos[index].classList.add('active');
            this.indicadores[index].classList.add('active');
            this.currentIndex = index;
        },
        
        prev: function() {
            let newIndex = this.currentIndex - 1;
            if (newIndex < 0) newIndex = this.depoimentos.length - 1;
            this.showDepoimento(newIndex);
        },
        
        next: function() {
            let newIndex = this.currentIndex + 1;
            if (newIndex >= this.depoimentos.length) newIndex = 0;
            this.showDepoimento(newIndex);
        },
        
        goTo: function(index) {
            this.showDepoimento(index);
        },
        
        startAutoRotate: function() {
            setInterval(() => {
                this.next();
            }, 5000); // Muda a cada 5 segundos
        }
    };
    
    carrossel.init();
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de aparecimento ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.card, .contato-item, .galeria-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Formulário de contato (simulação)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 1500);
        });
    });
    
    // Botão WhatsApp - Adiciona mensagem padrão
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        if (!link.href.includes('text=')) {
            link.href += '?text=Olá! Gostaria de agendar uma consulta';
        }
    });
});