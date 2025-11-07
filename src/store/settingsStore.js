
import { create } from 'zustand';


const useSettingsStore = create((set) => ({
  textSize: 16,
  highContrast: false,
  easyReading: false,
  increaseTextSize: () => set((state) => ({ textSize: state.textSize + 2 })),
  decreaseTextSize: () => set((state) => ({ textSize: state.textSize - 2 })),
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
  toggleEasyReading: () => set((state) => ({ easyReading: !state.easyReading })),
}));

export default useSettingsStore;
