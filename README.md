# Heavenly Guide - "Interactive Simulation Engine" PoC

**Core Mission:** To create a premium travel planning tool that allows users to find and book accommodations based on optimal viewing opportunities for celestial events-sunrises or susshines, red moon, parad planet, launches of rockets etc..   We are not just selling hotel rooms; we are selling exclusive, awe-inspiring experiences.

---

### ► [View the Live Demo Here](https://heavenly-guide-poc.onrender.com)
Video: https://youtu.be/Inw_UohRVHs
---

## About This Prototype

This repository contains a functional Proof-of-Concept (PoC) for the core feature of Heavenly Guide: the **Interactive View Simulation Engine**.

While the final product envisions a photorealistic 3D globe, this simplified prototype serves a critical purpose: **to prove that our core calculations are accurate, reliable, and dynamic.** It is the solid, technical foundation upon which the entire user experience will be built.

### What This Demo Proves:

*   **✅ Accurate Astronomical Calculations:** It correctly calculates the sunset position for any given date and geographic location using established astronomical libraries.

*   **✅ Dynamic Location & Time:** The simulation instantly recalculates when the user changes the location (from Istanbul to Florida) or the date. This demonstrates the flexibility of our backend logic.

*   **✅ Dynamic UI:** The horizon markers (e.g., "SW, W, NW" for a westward view) are not static. They intelligently adapt to the selected viewing direction, proving the UI can handle any location and orientation on Earth.

---

## From Prototype to Vision

This PoC intentionally uses a simplified 2D visualization to focus on the reliability of the core astronomical and geographical calculations. The next stage of "Heavenly Guide" will evolve this engine into a fully immersive experience:

*   **🌎 Interactive 3D Globe:** Replacing the 2D view with a cinematic 3D Earth, where users can see animated eclipse shadows moving across continents and visualize rocket launch trajectories in real-time.

*   **✨ Photorealistic Sky Simulation:** Leveraging technologies like Three.js or Babylon.js to render beautiful, physically accurate sunsets, planetary alignments, and meteor showers as seen from a specific hotel window.

*   **🏨 Booking Integration & Monetization:** Connecting our "View Simulation Engine" directly with hotel booking APIs to offer users curated "Sky View" rooms. This creates a new, high-value monetization channel for the travel industry by turning a simple room with a view into a bookable celestial experience.

This prototype is the **validated engine** that will power this exciting vision.

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/aura-emowise/heavenly-guide-poc.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd heavenly-guide-poc
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the application:
    ```bash
    npm start
    ```
