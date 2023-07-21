import ymaps3 from "@yandex/ymaps3-types/imperative";
declare global {
  interface Window {
    ymaps3: typeof ymaps3;
  }
}