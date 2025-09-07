import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ServiceNode {
  id: string;
  label: string;
  position: THREE.Vector3;
  mesh?: THREE.Mesh;
  targetPosition: THREE.Vector3;
  angle: number;
}

interface ThreeHeroProps {
  onServiceSelect: (service: string) => void;
}

export function ThreeHero({ onServiceSelect }: ThreeHeroProps) {
  const mountRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isReduced, setIsReduced] = useState(false);

  const services: Omit<ServiceNode, 'mesh' | 'targetPosition'>[] = [
    { id: 'web', label: 'Web Development', position: new THREE.Vector3(), angle: 0 },
    { id: 'app', label: 'App Development', position: new THREE.Vector3(), angle: Math.PI * 2 / 7 },
    { id: 'design', label: 'Graphic Design', position: new THREE.Vector3(), angle: Math.PI * 4 / 7 },
    { id: 'ux', label: 'UI/UX', position: new THREE.Vector3(), angle: Math.PI * 6 / 7 },
    { id: 'brand', label: 'Product Branding', position: new THREE.Vector3(), angle: Math.PI * 8 / 7 },
    { id: 'seo', label: 'SEO', position: new THREE.Vector3(), angle: Math.PI * 10 / 7 },
    { id: 'aso', label: 'ASO', position: new THREE.Vector3(), angle: Math.PI * 12 / 7 },
  ];

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mountRef.current || isReduced) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: mountRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x5AA8FF, 0.7);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Core orb
    const coreGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x5AA8FF,
      transparent: true,
      opacity: 0.8
    });
    const coreOrb = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreOrb);

    // Create service nodes
    const serviceNodes: ServiceNode[] = services.map((service, index) => {
      const geometries = [
        new THREE.TetrahedronGeometry(0.15),
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.SphereGeometry(0.15, 16, 16),
        new THREE.OctahedronGeometry(0.15),
        new THREE.DodecahedronGeometry(0.15),
        new THREE.IcosahedronGeometry(0.15),
        new THREE.ConeGeometry(0.15, 0.3, 8)
      ];

      const geometry = geometries[index % geometries.length];
      const material = new THREE.MeshStandardMaterial({ 
        color: index % 2 === 0 ? 0x5AA8FF : 0xB6FF5A,
        transparent: true,
        opacity: 0.7,
        emissive: index % 2 === 0 ? 0x1a3d66 : 0x3d6619,
        emissiveIntensity: 0.2
      });

      const mesh = new THREE.Mesh(geometry, material);
      const radius = 2.5;
      const angle = service.angle;
      
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.3) * 0.5,
        Math.sin(angle) * radius
      );

      mesh.position.copy(position);
      scene.add(mesh);

      return {
        ...service,
        mesh,
        targetPosition: position.clone(),
        position: position.clone()
      };
    });

    // Orbit lines
    const orbitGeometry = new THREE.RingGeometry(2.3, 2.7, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x5AA8FF,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitRing.rotation.x = Math.PI / 2;
    scene.add(orbitRing);

    // Particles
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0x5AA8FF,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.x = mouseRef.current.x;
      mouse.y = mouseRef.current.y;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(serviceNodes.map(node => node.mesh!));

      if (intersects.length > 0) {
        const intersectedNode = serviceNodes.find(node => node.mesh === intersects[0].object);
        if (intersectedNode) {
          setHoveredService(intersectedNode.label);
          document.body.style.cursor = 'pointer';
        }
      } else {
        setHoveredService(null);
        document.body.style.cursor = 'default';
      }
    };

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(serviceNodes.map(node => node.mesh!));

      if (intersects.length > 0) {
        const intersectedNode = serviceNodes.find(node => node.mesh === intersects[0].object);
        if (intersectedNode) {
          onServiceSelect(intersectedNode.id);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate core orb
      coreOrb.rotation.y = time * 0.5;
      coreOrb.rotation.x = time * 0.2;

      // Animate service nodes
      serviceNodes.forEach((node, index) => {
        if (!node.mesh) return;

        const radius = 2.5;
        const speed = 0.2;
        const angle = node.angle + time * speed;

        node.targetPosition.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 0.3) * 0.5 + Math.sin(time * 2 + index) * 0.1,
          Math.sin(angle) * radius
        );

        node.position.lerp(node.targetPosition, 0.02);
        node.mesh.position.copy(node.position);

        // Rotation
        node.mesh.rotation.x = time * 0.5 + index;
        node.mesh.rotation.y = time * 0.3 + index;

        // Hover effect
        if (hoveredService === node.label) {
          node.mesh.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
          (node.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
        } else {
          node.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          (node.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2;
        }
      });

      // Rotate particles
      particles.rotation.y = time * 0.1;

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (renderer) {
        renderer.dispose();
      }
      
      // Clean up geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, [onServiceSelect, hoveredService, isReduced]);

  if (isReduced) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#5AA8FF] to-[#B6FF5A] mx-auto mb-8 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl font-bold text-[#5AA8FF]">NC</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => onServiceSelect(service.id)}
                className="p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <canvas
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      {hoveredService && (
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 pointer-events-none">
          <p className="text-sm font-medium">{hoveredService}</p>
          <p className="text-xs text-muted-foreground">Click to learn more</p>
        </div>
      )}
    </>
  );
}