const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 400;

const particles = 1500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particles * 3);
for (let i = 0; i < particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 1000;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
}
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ size: 2, color: 0x38bdf8 });
const particleMesh = new THREE.Points(geometry, material);
scene.add(particleMesh);

function animate() {
    requestAnimationFrame(animate);
    const pos = particleMesh.geometry.attributes.position.array;
    const time = Date.now() * 0.001;
    for (let i = 0; i < particles; i++) {
        const x = pos[i * 3];
        const z = pos[i * 3 + 2];
        pos[i * 3 + 1] = Math.sin(x * 0.01 + time) * 20 + Math.cos(z * 0.01 + time) * 20;
    }
    particleMesh.geometry.attributes.position.needsUpdate = true;
    particleMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

const text = "Frontend Developer|Designer|UI/UX";
let i = 0;
function typing() {
    if (i < text.length) {
        document.querySelector(".typing").innerText += text.charAt(i);
        i++;
        setTimeout(typing, 100);
    }
}
window.onload = typing;

document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("light");
    material.color.setHex(document.body.classList.contains("light") ? 0x0284c7 : 0x38bdf8);
};

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active");
    });
});

