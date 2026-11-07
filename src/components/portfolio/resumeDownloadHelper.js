const RESUME_FILE = "Jared-Stoddard-Resume-2026.pdf";

export default function downloadResume(buttonLocation = "unknown") {
  const fileUrl = `/${RESUME_FILE}`;

  if (typeof window.gtag === "function") {
    window.gtag("event", "download_resume", {
      file_name: RESUME_FILE,
      file_extension: "pdf",
      link_url: fileUrl,
      link_text: "Download Resume",
      button_location: buttonLocation,
    });
  }

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = RESUME_FILE;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
