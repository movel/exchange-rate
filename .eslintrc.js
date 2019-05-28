module.exports = {
  extends: "react-app",
  rules: {
    "jsx-a11y/anchor-is-valid": false,
    "react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
    "react-hooks/exhaustive-deps": "warn" // Проверяем зависимости эффекта
  },
  plugins: [
    "react-hooks"
  ],
}