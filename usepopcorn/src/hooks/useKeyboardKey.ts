import { useEffect } from "react";

export function useKeyboardKey(key: string, action: () => void) {
  useEffect(
    function () {
      function callbackFn(e: KeyboardEvent) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callbackFn);
      return function () {
        document.removeEventListener("keydown", callbackFn);
      };
    },
    [action, key],
  );
}
