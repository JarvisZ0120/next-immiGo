"use client";
import React, { useEffect } from 'react';

const Confetti = () => {
    useEffect(() => {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiArray = [];
        const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#ff6347", "#32cd32"];

        class Confetti {
            constructor(x, y, speedX, speedY, size, color) {
                this.x = x;
                this.y = y;
                this.speedX = speedX;
                this.speedY = speedY;
                this.size = size;
                this.color = color;
                this.opacity = 1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.01;
            }

            isOutOfBounds() {
                return this.y > canvas.height || this.opacity <= 0;
            }
        }

        function createConfetti() {
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height - canvas.height;
                const speedX = (Math.random() - 0.5) * 2;
                const speedY = Math.random() * 5 + 2;
                const size = Math.random() * 7 + 3;
                const color = colors[Math.floor(Math.random() * colors.length)];
                confettiArray.push(new Confetti(x, y, speedX, speedY, size, color));
            }
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confettiArray.forEach((confetti, index) => {
                confetti.update();
                confetti.draw();

                if (confetti.isOutOfBounds()) {
                    confettiArray.splice(index, 1); // Remove out-of-bounds confetti
                }
            });

            requestAnimationFrame(animateConfetti);
        }

        createConfetti();
        animateConfetti();

        // Clean up
        return () => {
            canvas.remove();
        };
    }, []);

    return null; // 不需要返回任何 JSX
};

export default Confetti;
