import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default {
  extends: [
    "eslint:recommended", // Базовая конфигурация ESLint
    "plugin:react/recommended",
    "plugin:import/recommended",
    pluginJs.configs.recommended // Предполагаемый путь к конфигурации плагина для JavaScript
  ],
  files: ["**/*.js", "**/*.jsx"], // Применить правила ко всем JS и JSX файлам
  languageOptions: {
    globals: { ...globals.browser, ...globals.node }, // Глобальные переменные для браузера и Node.js
    parserOptions: {
      ecmaFeatures: {
        jsx: true // Включить поддержку JSX
      }
    }
  },
  rules: {
    ...fixupConfigRules(pluginReactConfig) // Добавить или переопределить правила из рекомендованных настроек React
  }
};
