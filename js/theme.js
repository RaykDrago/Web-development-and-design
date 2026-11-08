const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';

const THEMES = ['auto', 'light', 'dark'];
const DENSITIES = ['normal', 'compact'];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value || fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

function normalizeTheme(value) {
  return THEMES.includes(value) ? value : 'auto';
}

function normalizeDensity(value) {
  return DENSITIES.includes(value) ? value : 'normal';
}

function applyTheme(choice) {
  const theme = normalizeTheme(choice);

  if (theme === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = theme;
  }

  if (themeSelect) {
    themeSelect.value = theme;
  }
}

function applyDensity(choice) {
  const density = normalizeDensity(choice);

  if (density === 'compact') {
    root.dataset.density = 'compact';
  } else {
    root.removeAttribute('data-density');
  }

  if (densitySelect) {
    densitySelect.value = density;
  }
}

applyTheme(readStorage(THEME_KEY, 'auto'));
applyDensity(readStorage(DENSITY_KEY, 'normal'));

if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    const choice = normalizeTheme(themeSelect.value);
    applyTheme(choice);
    writeStorage(THEME_KEY, choice);
  });
}

if (densitySelect) {
  densitySelect.addEventListener('change', () => {
    const choice = normalizeDensity(densitySelect.value);
    applyDensity(choice);
    writeStorage(DENSITY_KEY, choice);
  });
}

/* Обратная связь от кнопки */
if (demoAction && demoFeedback) {
  demoAction.addEventListener('click', () => {
    demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
  });
}