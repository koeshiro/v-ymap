import ymaps3 from "@yandex/ymaps3-types/index";
declare global {
  interface Window {
    ymaps3: typeof ymaps3;
  }
}