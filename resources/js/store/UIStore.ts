import { Store } from "pullstate";

interface IUIStore {
  isDarkMode: boolean;
}

const UIStore = new Store<IUIStore>({
  isDarkMode: false,
});

export function initializeDarkMode() {
  const savedState = localStorage.getItem("darkModeState");
  if (savedState) {
    const isDarkMode = JSON.parse(savedState)?.isDarkMode;
    if (typeof isDarkMode === "boolean") {
      UIStore.update((s) => {
        return { isDarkMode };
      });
      // Update the html tag's class on initialization
      updateHtmlClass(isDarkMode);
    }
  } else {
    // If no saved state, set the html tag's class based on default state
    updateHtmlClass(UIStore.getRawState().isDarkMode);
  }
}

// Function to update the html tag's class
function updateHtmlClass(isDarkMode: boolean) {
  if (typeof document !== "undefined") {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    // Optionally, set color-scheme for built-in UI elements
    htmlElement.style.setProperty(
      "color-scheme",
      isDarkMode ? "dark" : "light"
    );
  }
}

// Create a reaction to update localStorage and html tag when isDarkMode changes
UIStore.createReaction(
  (s) => s.isDarkMode,
  (isDarkMode) => {
    localStorage.setItem("darkModeState", JSON.stringify({ isDarkMode }));
    updateHtmlClass(isDarkMode);
  }
);

export function toggleDarkMode() {
  UIStore.update((s) => {
    return { isDarkMode: !s.isDarkMode };
  });
}
export default UIStore;
