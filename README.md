<<<<<<< HEAD
# AI Avatar Interview Simulation (Frontend)

A modern one-page React app with TailwindCSS, Framer Motion animations, and Three.js (react-three-fiber + drei) showing a GLTF avatar.

## Features
- Fixed glassy navbar with links: Home, About, Contact, Profile, Sign Up
- Hero with gradient CTA and animated 3D avatar
- About with modern cards and fade/slide animations
- Contact form with validation and hover effects
- Interview placeholder section with avatar and Next Question button
- Smooth scrolling between sections

## Tech
- React + Vite
- TailwindCSS
- Framer Motion
- three + @react-three/fiber + @react-three/drei

## Getting Started
1. Install Node.js LTS from https://nodejs.org
2. Install deps
   ```bash
   npm install
   ```
3. Place your GLTF model at `public/avatar.glb`
4. Run dev server
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`

## Notes
- The avatar is loaded from `/avatar.glb` (public folder).
- OrbitControls limited (no zoom/pan) to keep focus on the avatar.





=======
# InterviewAI Website

A modern, responsive website for InterviewAI - an AI-powered interview practice platform. The site includes both a home page and an about page with seamless navigation between them.

## Pages

### Home Page (`index.html`)
- **Hero Section**: Eye-catching headline with call-to-action buttons
- **Features Section**: Six feature cards highlighting platform benefits
- **How It Works**: Four-step process explanation
- **Call to Action**: Final conversion section

### About Page (`about.html`)
- **About Hero**: Mission statement and company introduction
- **Our Story**: Three-paragraph company history and vision
- **Our Values**: Four value cards (Mission-Driven, Innovation, User-Centric, Excellence)
- **Our Commitment**: Two-paragraph commitment statement
- **Call to Action**: Final conversion section

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and button animations
- **Seamless Navigation**: Easy switching between home and about pages
- **Accessibility**: Semantic HTML and proper contrast ratios
- **Performance**: Optimized CSS and JavaScript for fast loading

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## Getting Started

1. Open `index.html` in your web browser to view the home page
2. Click "About" in the navigation to view the about page
3. Use the navigation to switch between pages

## File Structure

```
├── index.html          # Home page
├── about.html          # About page
├── styles.css          # Shared CSS styles and responsive design
├── script.js           # JavaScript functionality and animations
└── README.md           # Project documentation
```

## Navigation

- **Home**: Links to `index.html` (home page)
- **About**: Links to `about.html` (about page)
- **Interview**: Placeholder link (can be connected to interview functionality)
- **Profile**: Placeholder link (can be connected to user profiles)
- **Contact**: Placeholder link (can be connected to contact form)
- **Sign In**: Button for user authentication

## Customization

- **Colors**: Modify the CSS custom properties in `styles.css`
- **Content**: Update text content in respective HTML files
- **Animations**: Adjust timing and effects in `script.js`
- **Navigation**: Add more pages by creating new HTML files and updating navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
>>>>>>> 6ad88b1b591acef16929632bd9c20f9a2a3279c0
