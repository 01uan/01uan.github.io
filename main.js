// DMC1-style portfolio scaffold using Three.js

import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

let camera, scene, renderer
let titleMesh,
  menuItems = []
let preloadedFont
let raycaster = new THREE.Raycaster()
let pointer = new THREE.Vector2()
let hoveredItem = null

let menuShifted = false
let aboutTextMeshes = []
let aboutTargetPositions = []
let animatingMenu = false

init()
animate()

function init () {
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x0d0d0d, 500, 2000)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000
  )
  camera.position.z = 600

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.style.margin = 0
  document.body.style.overflow = 'hidden'
  document.body.appendChild(renderer.domElement)

  // Background
  const bgColor = new THREE.Color(0x050505)
  renderer.setClearColor(bgColor)

  // Font loading
  const loader = new FontLoader()
  loader.load('fonts/UnifrakturMaguntia_Book.json', font => {
    preloadedFont = font
    // Title
    const titleGeo = new TextGeometry("Gia's Portfolio", {
      font: font,
      size: 80,
      height: 10,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelSegments: 3
    })

    titleGeo.computeBoundingBox()
    titleGeo.center()

    const titleMat = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      specular: 0x555555,
      shininess: 30
    })

    titleMesh = new THREE.Mesh(titleGeo, titleMat)
    titleMesh.position.y = 300
    scene.add(titleMesh)

    // Menu items
    const labels = ['About Me', 'Projects', 'Contact']
    labels.forEach((label, i) => {
      const geo = new TextGeometry(label, {
        font: font,
        size: 40,
        height: 2,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1.5,
        bevelSegments: 3,
        depth: 10
      })

      geo.computeBoundingBox()
      geo.center()

      const mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x333333,
        shininess: 100
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.y = 50 - i * 80
      mesh.userData = { label }

      // Create a hitbox (invisible box around the text)
      const bbox = new THREE.Box3().setFromObject(mesh)
      const size = new THREE.Vector3()
      bbox.getSize(size)

      const boxGeo = new THREE.BoxGeometry(
        size.x + 20,
        size.y + 20,
        size.z + 20
      )
      const boxMat = new THREE.MeshBasicMaterial({ visible: false })
      const hitbox = new THREE.Mesh(boxGeo, boxMat)

      hitbox.position.copy(mesh.position)
      hitbox.userData = { textMesh: mesh } // Link the actual text

      scene.add(mesh)
      scene.add(hitbox)
      menuItems.push(hitbox) // Add hitbox to raycast targets

      // Preload About Me section
      const lines = [
        "BING BONG BING BONG BING BOMB",
        'ASDASD ASD ASD ASD ASD AS DSA D',
        'ASD ASD AS DASD ASD AS DAS DAS',
        'Currently making this sick portfolio.',
        'Welcome to my layer of the net.'
      ]

      lines.forEach((line, i) => {
        const geo = new TextGeometry(line, {
          font: font,
          size: 40,
          height: 3,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 2,
          bevelSegments: 2,
          depth: 3
        });
      
        geo.computeBoundingBox();
        geo.center();
      
        const mat = new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
        });
      
        const mesh = new THREE.Mesh(geo, mat);
        const posY = 100 - i * 40;
      
        mesh.position.set(800, posY, 0); // off-screen to the right
        mesh.rotation.y = -0.5; // rotated inward toward the menu
        mesh.visible = false;
      
        scene.add(mesh);
        aboutTextMeshes.push(mesh);
        aboutTargetPositions.push(new THREE.Vector3(300, posY, 0));
      });
      
    })

    window.addEventListener('pointerdown', onPointerDown)

    function onPointerDown (event) {
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(menuItems)
      if (intersects.length > 0) {
        const clicked = intersects[0].object
        const label = clicked.userData.textMesh?.userData.label
        if (label === 'About Me') {
          showAboutSection()
        }
      }
    }

    window.addEventListener('wheel', e => {
      aboutTextMeshes.forEach(mesh => {
        mesh.position.y += e.deltaY * 0.3
      })
    })
  })

  window.addEventListener('pointermove', onPointerMove)

  function onPointerMove (event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  // Resize
  window.addEventListener('resize', onWindowResize)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040) // Soft white light
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 1, 1).normalize()
  scene.add(directionalLight)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate () {
  requestAnimationFrame(animate)
  // Hover detection
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(menuItems)

  if (intersects.length > 0) {
    const first = intersects[0].object
    if (hoveredItem !== first) {
      hoveredItem = first
    }
  } else {
    hoveredItem = null
  }

  // Animate menu items
  if (animatingMenu) {
    let done = true
    menuItems.forEach(box => {
      const text = box.userData.textMesh
      const targetX = box.userData.targetX
      if (targetX !== undefined) {
        // Lerp position
        box.position.x += (targetX - box.position.x) * 0.1
        if (text) text.position.x = box.position.x

        if (Math.abs(box.position.x - targetX) > 0.5) {
          done = false
        }
      }
    })
    if (done) animatingMenu = false
  }

  // Animate About Me text sliding in
  for (let i = 0; i < aboutTextMeshes.length; i++) {
    const mesh = aboutTextMeshes[i]
    const target = aboutTargetPositions[i]
    mesh.position.lerp(target, 0.1)
  }

  // Rotate hovered text
  menuItems.forEach(box => {
    const text = box.userData.textMesh
    if (text) {
      // Spin on hover
      if (box === hoveredItem) {
        text.rotation.y += 0.05;
      } else {
        text.rotation.y *= 0.95;
      }
    
      // Lerp toward target rotation (if defined)
      const targetRotY = text.userData.targetRotY;
      if (targetRotY !== undefined) {
        text.rotation.y += (targetRotY - text.rotation.y) * 0.1;
      }
    }
    
  })

  renderer.render(scene, camera)
}

function showAboutSection () {
  if (menuShifted) return
  menuShifted = true
  animatingMenu = true

  // Animate menu items left
  menuItems.forEach(box => {
    box.userData.targetX = box.position.x - 300
    if (box.userData.textMesh) {
      box.userData.textMesh.userData.targetRotY = 1.1; 
    }
  })

  // Make about section visible
  aboutTextMeshes.forEach(mesh => {
    mesh.visible = true
  })
}
