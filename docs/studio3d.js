// Full Production Studio — 3D hero scene (three.js)
// Four rounded "studio" cubes (Ideas, Content, Motion, Pro) feed glowing particles
// along curved wires into the orange burst in the middle (the Studio Director).
// No post-processing: glow comes from additive sprites, so the canvas stays transparent.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const ORANGE = 0xf47b20, ORANGE_HI = 0xffa860, CREAM = 0xf6efe6;

const SECTIONS = [
  { key: 'ideas',   ar: 'أفكار',   en: 'IDEAS',   color: 'orange', icon: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z', slot: [-1, 1] },
  { key: 'content', ar: 'محتوى',   en: 'CONTENT', color: 'cream',  icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5', slot: [1, 1] },
  { key: 'motion',  ar: 'موشن',    en: 'MOTION',  color: 'orange', icon: 'M15 10l5-3v10l-5-3M3 7h12v10H3z', slot: [-1, -1] },
  { key: 'pro',     ar: 'احترافي', en: 'PRO',     color: 'cream',  icon: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z', slot: [1, -1] },
];

// ---------- easing (taste: never linear) ----------
const clamp01 = x => Math.min(1, Math.max(0, x));
const easeOutExpo = x => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const easeOutBack = x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const easeInOutCubic = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

// ---------- textures ----------
function iconTexture(path, stroke) {
  const s = 256, c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d');
  g.translate(s / 2, s / 2);
  g.scale(s / 24 * 0.62, s / 24 * 0.62);
  g.translate(-12, -12);
  g.lineWidth = 2.1; g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = stroke;
  g.stroke(new Path2D(path));
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function glowTexture() {
  const s = 128, c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,200,150,.55)');
  grd.addColorStop(1, 'rgba(255,140,60,0)');
  g.fillStyle = grd; g.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function dashedRoundedRect(size, radius) {
  const h = size / 2, r = radius, shape = new THREE.Shape();
  shape.moveTo(-h + r, -h);
  shape.lineTo(h - r, -h); shape.quadraticCurveTo(h, -h, h, -h + r);
  shape.lineTo(h, h - r); shape.quadraticCurveTo(h, h, h - r, h);
  shape.lineTo(-h + r, h); shape.quadraticCurveTo(-h, h, -h, h - r);
  shape.lineTo(-h, -h + r); shape.quadraticCurveTo(-h, -h, -h + r, -h);
  const geo = new THREE.BufferGeometry().setFromPoints(shape.getPoints(12));
  const line = new THREE.Line(geo, new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.09, gapSize: 0.07, transparent: true, opacity: 0.22 }));
  line.computeLineDistances();
  return line;
}

// ---------- main ----------
export function mountStudio3D(stage, { onSelect, onDirector, still: startStill = false } = {}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // "still" = no animation: OS reduced-motion, or the user pressed Pause (WCAG 2.2.2)
  let still = reduced || startStill;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) {
    return null; // no WebGL → keep the HTML tiles
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x2a1a10, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 8);
  scene.add(key);
  const core = new THREE.PointLight(ORANGE_HI, 18, 9, 1.6);
  core.position.set(0, 0, 1.2);
  scene.add(core);

  const glowTex = glowTexture();

  // ---- center burst (Studio Director) ----
  const burst = new THREE.Group();
  const spikeMat = new THREE.MeshStandardMaterial({ color: ORANGE, emissive: ORANGE, emissiveIntensity: 0.55, roughness: 0.35, metalness: 0.1 });
  const SPIKES = 18;
  for (let i = 0; i < SPIKES; i++) {
    const len = (i % 2 ? 0.75 : 1.05) * (0.85 + 0.3 * Math.abs(Math.sin(i * 12.9898)));
    const geo = new THREE.CapsuleGeometry(0.055, len, 4, 10);
    geo.translate(0, len / 2 + 0.28, 0);
    const m = new THREE.Mesh(geo, spikeMat);
    m.rotation.z = (i / SPIKES) * Math.PI * 2 + (i % 3) * 0.06;
    burst.add(m);
  }
  const coreBall = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 16),
    new THREE.MeshStandardMaterial({ color: ORANGE_HI, emissive: ORANGE, emissiveIntensity: 1.2 }));
  burst.add(coreBall);
  const burstGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: ORANGE, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  burstGlow.scale.setScalar(4.2);
  burstGlow.position.z = -0.4;
  scene.add(burstGlow);
  scene.add(burst);

  // ---- cubes ----
  const cubeGeo = new RoundedBoxGeometry(1.45, 1.45, 0.55, 5, 0.3);
  const iconGeo = new THREE.PlaneGeometry(1.05, 1.05);
  const cubes = SECTIONS.map((s, i) => {
    const group = new THREE.Group();
    const isOrange = s.color === 'orange';
    const body = new THREE.Mesh(cubeGeo, new THREE.MeshStandardMaterial({
      color: isOrange ? ORANGE : CREAM, roughness: isOrange ? 0.42 : 0.55, metalness: 0.05,
      emissive: isOrange ? 0x5a2200 : 0x000000, emissiveIntensity: 0.35,
    }));
    const icon = new THREE.Mesh(iconGeo, new THREE.MeshBasicMaterial({
      map: iconTexture(s.icon, isOrange ? '#ffffff' : '#f47b20'), transparent: true, depthWrite: false, toneMapped: false,
    }));
    icon.position.z = 0.285;
    const ring = dashedRoundedRect(1.95, 0.42);
    ring.position.z = -0.05;
    group.add(body, icon, ring);
    body.userData.index = i;
    scene.add(group);
    return { s, group, body, ring, target: new THREE.Vector3(), hover: 0, speed: 1, phase: i * 1.7 };
  });

  // ---- wires + pulses ----
  const wireMat = new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.38, depthWrite: false });
  const PULSES_PER_WIRE = 7;
  const pulseGeo = new THREE.BufferGeometry();
  const pulsePos = new Float32Array(SECTIONS.length * PULSES_PER_WIRE * 3);
  const pulseCol = new Float32Array(SECTIONS.length * PULSES_PER_WIRE * 3);
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
  pulseGeo.setAttribute('color', new THREE.BufferAttribute(pulseCol, 3));
  const pulses = new THREE.Points(pulseGeo, new THREE.PointsMaterial({
    map: glowTex, size: 0.32, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(pulses);
  let wires = [];
  const pulseT = Array.from({ length: SECTIONS.length * PULSES_PER_WIRE }, (_, k) => (k % PULSES_PER_WIRE) / PULSES_PER_WIRE + Math.random() * 0.05);

  function buildWires() {
    wires.forEach(w => { scene.remove(w.mesh); w.mesh.geometry.dispose(); });
    wires = cubes.map(c => {
      const p = c.target;
      const start = new THREE.Vector3(p.x * 0.8, p.y * 0.8, 0);
      const ctrl = new THREE.Vector3(p.x * 0.42, p.y * 0.12, 0.9);
      const curve = new THREE.QuadraticBezierCurve3(start, ctrl, new THREE.Vector3(0, 0, 0.1));
      const geo = new THREE.TubeGeometry(curve, 64, 0.016, 6, false);
      const mesh = new THREE.Mesh(geo, wireMat);
      mesh.renderOrder = -1;
      scene.add(mesh);
      return { curve, mesh, count: geo.index.count };
    });
  }

  // ---- dust ----
  const DUST = 420;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 22;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    map: glowTex, size: 0.09, color: 0xffd9b8, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(dust);

  // ---- HTML labels (crisp Arabic text, keyboard accessible) ----
  const labelLayer = stage.querySelector('.stage-labels');
  const labels = cubes.map(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'stage-label';
    b.innerHTML = `<span lang="ar">${c.s.ar}</span><small lang="en">${c.s.en}</small>`;
    b.setAttribute('aria-label', `${c.s.en} / ${c.s.ar}`);
    b.addEventListener('click', () => onSelect && onSelect(c.s.key));
    b.addEventListener('pointerenter', () => (hovered = c));
    b.addEventListener('pointerleave', () => (hovered = null));
    labelLayer.appendChild(b);
    return b;
  });
  const centerLabel = document.createElement('button');
  centerLabel.type = 'button';
  centerLabel.className = 'stage-pill';
  centerLabel.innerHTML = '🎬 studio-director';
  centerLabel.lang = 'en';
  centerLabel.addEventListener('click', () => onDirector && onDirector());
  labelLayer.appendChild(centerLabel);

  // ---- layout (responsive) ----
  let W = 1, H = 1, boxScale = 1;
  function layout() {
    W = stage.clientWidth; H = stage.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const narrow = camera.aspect < 1.15;
    const sx = narrow ? 1.25 : 3.35, sy = narrow ? 2.05 : 1.75;
    boxScale = narrow ? 0.72 : 1;
    cubes.forEach(c => c.target.set(c.s.slot[0] * sx, c.s.slot[1] * sy, 0));
    const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const needX = (sx + 1.25 * boxScale) / (tanH * camera.aspect);
    const needY = (sy + 1.55 * boxScale) / tanH;
    camera.position.z = Math.max(needX, needY) * 1.04;
    camera.updateProjectionMatrix();
    burst.scale.setScalar(narrow ? 0.72 : 1);
    burstGlow.scale.setScalar(narrow ? 2.4 : 4.2);
    buildWires();
  }

  // ---- interaction ----
  const mouse = new THREE.Vector2(), smooth = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  let hovered = null, pointerInside = false;
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    pointerInside = true;
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(cubes.map(c => c.body), false)[0];
    const burstHit = !hit && ray.intersectObject(coreBall, false)[0];
    hovered = hit ? cubes[hit.object.userData.index] : null;
    stage.style.cursor = hit || burstHit ? 'pointer' : '';
    if (still) render(performance.now());
  });
  stage.addEventListener('pointerleave', () => { pointerInside = false; hovered = null; stage.style.cursor = ''; });
  stage.addEventListener('click', e => {
    if (e.target.closest('.stage-label,.stage-pill')) return;
    ray.setFromCamera(mouse, camera);
    const hit = ray.intersectObjects(cubes.map(c => c.body), false)[0];
    if (hit) onSelect && onSelect(cubes[hit.object.userData.index].s.key);
    else if (ray.intersectObject(coreBall, false)[0]) onDirector && onDirector();
  });

  // ---- animation ----
  const t0 = performance.now();
  let frozenAt = 0;
  let last = t0, visible = true, raf = 0;
  const v = new THREE.Vector3();

  function placeLabel(el, world, dy) {
    v.copy(world); v.y += dy; v.project(camera);
    el.style.transform = `translate(-50%, 0) translate(${(v.x * 0.5 + 0.5) * W}px, ${(-v.y * 0.5 + 0.5) * H}px)`;
  }

  function render(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const time = still ? Math.max(3, frozenAt) : (now - t0) / 1000;
    const motion = still ? 0 : 1;

    // camera parallax
    smooth.lerp(pointerInside ? mouse : smooth.set(smooth.x * 0.96, smooth.y * 0.96), 0.06);
    camera.position.x = smooth.x * 0.7 * motion;
    camera.position.y = smooth.y * 0.45 * motion;
    camera.lookAt(0, 0, 0);

    // burst: scale-in with overshoot, then slow spin + breathing
    const bIn = easeOutBack(clamp01((time - 0.15) / 0.9));
    const narrowScale = boxScale < 1 ? 0.52 : 1;
    burst.scale.setScalar(Math.max(0.0001, bIn * narrowScale * (1 + 0.035 * Math.sin(time * 2.1) * motion)));
    burst.rotation.z = -time * 0.22 * motion;
    burstGlow.material.opacity = 0.42 + 0.14 * Math.sin(time * 2.1) * motion;
    core.intensity = 14 + 6 * Math.sin(time * 2.1) * motion;

    // cubes: staggered fly-in, float, face the pointer, hover pop
    cubes.forEach((c, i) => {
      const k = easeOutExpo(clamp01((time - 0.35 - i * 0.12) / 1.1));
      const from = v.set(c.target.x * 1.9, c.target.y * 1.9, -7);
      c.group.position.lerpVectors(from, c.target, k);
      c.group.position.y += Math.sin(time * 1.3 + c.phase) * 0.09 * motion * k;
      c.hover = lerp(c.hover, hovered === c ? 1 : 0, 0.14);
      const s = boxScale * Math.max(0.0001, easeOutBack(clamp01((time - 0.35 - i * 0.12) / 0.9))) * (1 + 0.12 * c.hover);
      c.group.scale.setScalar(s);
      c.group.rotation.y = lerp(c.group.rotation.y, (smooth.x - c.group.position.x * 0.06) * 0.35 * motion + c.hover * 0.25, 0.08);
      c.group.rotation.x = lerp(c.group.rotation.x, -smooth.y * 0.3 * motion, 0.08);
      c.ring.rotation.z = Math.sin(time * 0.6 + c.phase) * 0.06 * motion;
      c.ring.material.opacity = 0.18 + 0.4 * c.hover;
      c.speed = lerp(c.speed, 1 + 2.2 * c.hover, 0.1);
    });

    // wires draw in, then pulses flow toward the director
    const wIn = easeInOutCubic(clamp01((time - 0.9) / 0.9));
    wires.forEach(w => w.mesh.geometry.setDrawRange(0, Math.floor(w.count * wIn) - (Math.floor(w.count * wIn) % 3)));
    wireMat.opacity = 0.3 + 0.08 * Math.sin(time * 1.5) * motion;
    const col = new THREE.Color();
    for (let wi = 0; wi < wires.length; wi++) {
      const c = cubes[wi];
      for (let p = 0; p < PULSES_PER_WIRE; p++) {
        const k = wi * PULSES_PER_WIRE + p;
        if (!still) pulseT[k] = (pulseT[k] + dt * 0.16 * c.speed) % 1;
        const t = pulseT[k];
        wires[wi].curve.getPointAt(t, v);
        pulsePos.set([v.x, v.y, v.z + 0.02], k * 3);
        const fade = Math.sin(Math.PI * t) * wIn * (0.55 + 0.45 * c.hover);
        col.setHex(t > 0.8 ? ORANGE_HI : 0xffc690).multiplyScalar(fade);
        pulseCol.set([col.r, col.g, col.b], k * 3);
      }
    }
    pulseGeo.attributes.position.needsUpdate = true;
    pulseGeo.attributes.color.needsUpdate = true;

    dust.rotation.y = time * 0.015 * motion;
    dust.position.y = Math.sin(time * 0.2) * 0.15 * motion;

    renderer.render(scene, camera);

    // labels follow their cubes
    cubes.forEach((c, i) => {
      placeLabel(labels[i], c.group.position, -0.98 * boxScale * (1 + 0.12 * c.hover));
      labels[i].style.opacity = String(clamp01((time - 0.8 - i * 0.12) / 0.6));
      labels[i].classList.toggle('hot', hovered === c);
    });
    placeLabel(centerLabel, burst.position, -1.75 * narrowScale);
    centerLabel.style.opacity = String(clamp01((time - 1.4) / 0.6));
  }

  function loop(now) {
    raf = 0;
    if (!visible) return;
    render(now);
    if (!still) raf = requestAnimationFrame(loop);
  }

  new ResizeObserver(() => { layout(); if (still) render(performance.now()); }).observe(stage);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
  }).observe(stage);

  layout();
  raf = requestAnimationFrame(loop);
  function setStill(v) {
    if (reduced) return true; // the OS setting always wins
    still = !!v;
    if (still) { frozenAt = (performance.now() - t0) / 1000; render(performance.now()); }
    else if (!raf && visible) raf = requestAnimationFrame(loop);
    return still;
  }
  return { renderer, scene, setStill, reduced, isStill: () => still };
}
