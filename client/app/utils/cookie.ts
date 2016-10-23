export function readCookie(name) {
    const nameEQ = name + "=";
    let result = null;
    const cookies = document.cookie.split(';');
    cookies.forEach((c) => {
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        result = c.substring(nameEQ.length, c.length);
      }
    });

    return result;
}
