import { Store } from "pullstate";

interface IUIStore {
  isDarkMode: boolean;
}

const UIStore = new Store<IUIStore>({
  isDarkMode: false,
});


export function initializeDarkMode() {
  const savedState = localStorage.getItem('darkModeState');
  if (savedState) {
    const isDarkMode = JSON.parse(savedState)?.isDarkMode;
    if (typeof isDarkMode === 'boolean') {
      UIStore.update((s) => {
        return { isDarkMode };
      });
    }
  }
}

UIStore.createReaction((s) => s, (s) =>{
    localStorage.setItem('darkModeState', JSON.stringify(s));
    document.documentElement.classList.toggle('dark');

}
);
export default UIStore;
   