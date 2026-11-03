/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./script.js"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "canvas-base": "#F7F6F2",
                "canvas-elevated": "#FFFFFF",
                "surface": "#FAF9F5",
                "surface-container-lowest": "#FFFFFF",
                "surface-container-low": "#F5F4F0",
                "surface-container": "#EFEEEA",
                "surface-container-high": "#E9E8E4",
                "surface-container-highest": "#E3E2DF",
                "text-primary": "#111111",
                "text-secondary": "#63635E",
                "text-muted": "#6B6B66",
                "hairline-border": "#E5E5E0",
                "hairline-dark": "#D1D1CB",
                "primary": "#0028C2",
                "primary-container": "#0038FF",
                "electric-accent": "#0038FF",
                "terminal-green": "#2E9F6E",
                "alert-crimson": "#FF3333"
            },
            fontFamily: {
                "headline-lg": ["Space Grotesk", "sans-serif"],
                "headline-md": ["Space Grotesk", "sans-serif"],
                "headline-sm": ["Space Grotesk", "sans-serif"],
                "display-hero": ["Space Grotesk", "sans-serif"],
                "display-hero-mobile": ["Space Grotesk", "sans-serif"],
                "body-lg": ["Geist", "sans-serif"],
                "body-md": ["Geist", "sans-serif"],
                "caption": ["Geist", "sans-serif"],
                "label-code": ["JetBrains Mono", "monospace"],
                "index-numeral": ["JetBrains Mono", "monospace"]
            },
            fontSize: {
                "headline-lg": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "600" }],
                "headline-md": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
                "headline-sm": ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" }],
                "display-hero": ["4.5rem", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "700" }],
                "display-hero-mobile": ["2.5rem", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" }],
                "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.01em", fontWeight: "400" }],
                "body-md": ["0.9375rem", { lineHeight: "1.5", letterSpacing: "-0.005em", fontWeight: "400" }],
                "caption": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "400" }],
                "label-code": ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "500" }],
                "index-numeral": ["0.75rem", { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "600" }]
            }
        }
    }
};
