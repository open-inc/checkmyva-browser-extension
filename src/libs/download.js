export async function download(name, str) {
  const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(str);
  const element = document.createElement("a");

  element.setAttribute("href", dataStr);
  element.setAttribute("download", name);
  element.click();
}
