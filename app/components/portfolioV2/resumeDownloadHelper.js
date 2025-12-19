export default function downloadResume() {
  const a = document.createElement("a");
  a.href = "/Jared-Stoddard-Resume.pdf";
  a.download = "Jared-Stoddard-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
