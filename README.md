# FXConvert — Currency Converter

A responsive, glassmorphism-style currency converter that fetches live FX rates and supports all currencies provided by the API.

## Features
- Live currency rates via `open.er-api.com`
- Supports all currencies returned by the API
- Swap currencies with one click
- Responsive layout with a compact mode
- Clean, modern UI inspired by finance dashboards

## Tech Stack
- HTML
- CSS
- JavaScript (vanilla)

## How To Run
1. Open `index.html` in your browser.
2. Enter an amount, choose currencies, and click **Convert**.

## Live Demo (GitHub Pages)
1. Go to your repo on GitHub.
2. Open **Settings** → **Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Save and wait 1–2 minutes.
5. Your site will be live at:
   - `https://satyam0211.github.io/Fx-Currency-Convertor/`

## Project Structure
- `index.html` — App layout
- `style.css` — Styling and animations
- `script.js` — Logic and API integration

## Notes
- Requires an internet connection to fetch live rates.
- Rates are provided by the public endpoint: `https://open.er-api.com/v6/latest/{BASE}`.

## Screenshot
Add a screenshot of your UI here if desired.
Suggested path: `assets/screenshot.png`
