export default function downloadResume() {
  const a = document.createElement("a");
  a.href = "/Jared-Stoddard-Resume-2026.pdf";
  a.download = "Jared-Stoddard-Resume-2026.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
