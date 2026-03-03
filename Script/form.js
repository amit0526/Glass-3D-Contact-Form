// ================= 3D BACKGROUND =================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Particles
const particlesCount = 1500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 30;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.08,
  transparent: true,
  opacity: 0.8,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0003;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================= FORM VALIDATION =================

function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => (e.innerText = ""));
  document.getElementById("successMsg").innerText = "";
}

function validateForm() {
  clearErrors();

  let valid = true;

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const gender = document.querySelector('input[name="gender"]:checked');

  // First Name
  if (fname === "") {
    document.getElementById("fnameError").innerText = "First name required";
    valid = false;
  }

  // Last Name
  if (lname === "") {
    document.getElementById("lnameError").innerText = "Last name required";
    valid = false;
  }

  // Email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    document.getElementById("emailError").innerText = "Invalid email format";
    valid = false;
  }

  // Phone
  const phonePattern = /^[0-9]{10}$/;
  if (!phone.match(phonePattern)) {
    document.getElementById("phoneError").innerText = "Phone must be 10 digits";
    valid = false;
  }

  // Date of Birth
  if (date === "") {
    document.getElementById("dateError").innerText = "Date required";
    valid = false;
  } else {
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate > today) {
      document.getElementById("dateError").innerText =
        "Future date not allowed";
      valid = false;
    }
  }

  // Gender
  if (!gender) {
    document.getElementById("genderError").innerText = "Select gender";
    valid = false;
  }

  if (valid) {
    document.getElementById("successMsg").innerText =
      "Form submitted successfully!";
  }
}
