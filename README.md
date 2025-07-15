# Heavenly Guide - "Interactive Simulation Engine" PoC

**Core Mission:** To create a premium travel planning tool that allows users to find and book accommodations based on optimal viewing opportunities for celestial events.

---

## About This Prototype

This repository contains a functional Proof-of-Concept (PoC) for the core feature of Heavenly Guide: the **View Simulation Engine**.

While the final product envisions a photorealistic 3D globe, this simplified prototype serves a critical purpose: **to prove that our core calculations are accurate, reliable, and dynamic.**

### What This Demo Proves:

*   **Accurate Astronomical Calculations:** It correctly calculates the sunset position for any given date and geographic location.
*   **Dynamic Location & Time:** The simulation instantly recalculates when the user changes the location (from Istanbul to Florida) or the date. This demonstrates the flexibility of our backend logic.
*   **Dynamic UI:** The horizon markers (e.g., "SW, W, NW") are not static. They intelligently adapt to the selected viewing direction, proving the UI can handle any location on Earth.

This prototype is the **technical blueprint** for a much grander vision. It's the reliable engine that will power the future, emotionally engaging user experience.

### Live Demo https://heavenly-guide-poc.onrender.com



### How to Run Locally

1.  Clone the repository: `git clone [your-repo-url]`
2.  Navigate to the project directory: `cd heavenly-guide-poc`
3.  Install dependencies: `npm install`
4.  Run the application: `npm start`