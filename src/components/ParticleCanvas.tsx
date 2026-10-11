import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  launchFireworksTrigger?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ launchFireworksTrigger }) => {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fwCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background floating particles
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      hue: number;
      shape: 'circle' | 'heart' | 'petal';
      rotation: number;
      rotSpeed: number;
    };

    const count = Math.min(window.innerWidth < 640 ? 35 : 65, 80);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.2,
        speedY: Math.random() * 0.8 + 0.25,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.55 + 0.2,
        hue: Math.random() > 0.5 ? 330 : 280, // pink to purple
        shape: Math.random() > 0.7 ? 'petal' : 'circle',
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      });
    }

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate((rot * Math.PI) / 180);
      c.beginPath();
      c.moveTo(0, -size * 1.5);
      c.bezierCurveTo(size * 1.2, -size, size * 1.2, size, 0, size * 1.5);
      c.bezierCurveTo(-size * 1.2, size, -size * 1.2, -size, 0, -size * 1.5);
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.3 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = canvas.height + 15;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.opacity})`;
        if (p.shape === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size * 1.4, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Fireworks celebration canvas
  useEffect(() => {
    if (!launchFireworksTrigger) return;
    const canvas = fwCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    type Spark = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
    };

    const sparks: Spark[] = [];

    const addExplosion = (centerX: number, centerY: number) => {
      const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#f43f5e', '#a855f7', '#fb7185', '#ffd700'];
      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        sparks.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.018 + 0.012,
        });
      }
    };

    // Burst at center and random points
    addExplosion(canvas.width / 2, canvas.height * 0.4);
    setTimeout(() => addExplosion(canvas.width * 0.3, canvas.height * 0.35), 250);
    setTimeout(() => addExplosion(canvas.width * 0.7, canvas.height * 0.3), 500);
    setTimeout(() => addExplosion(canvas.width * 0.5, canvas.height * 0.25), 850);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.07; // gravity
        s.alpha -= s.decay;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;

      if (sparks.length > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [launchFireworksTrigger]);

  // Click burst everywhere on screen
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const heart = document.createElement('div');
      const symbols = ['❤️', '💖', '🌸', '✨', '💕', '🥰', '🌹'];
      heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.position = 'fixed';
      heart.style.left = `${clientX - 12}px`;
      heart.style.top = `${clientY - 12}px`;
      heart.style.fontSize = `${Math.floor(Math.random() * 14 + 18)}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.transition = 'all 1.6s cubic-bezier(0.2, 0.9, 0.3, 1)';
      document.body.appendChild(heart);

      const driftX = (Math.random() - 0.5) * 90;
      const driftY = -(Math.random() * 110 + 60);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${driftX}px, ${driftY}px) scale(1.4) rotate(${Math.random() * 60 - 30}deg)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => {
        heart.remove();
      }, 1600);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={bgCanvasRef}
        className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
      />
      <canvas
        ref={fwCanvasRef}
        className="fixed inset-0 pointer-events-none z-[40] w-full h-full"
      />
    </>
  );
};
