import "libs/polyfills";

startGoogleIntro();

function startGoogleIntro() {
  console.log("checkmyva google intro init");

  // Download Button:

  // const downloadButton = document.querySelectorAll("a[href^='takeout/download?']");
  // const downloadButtonContainer = downloadButton.parentElement;

  // downloadButtonContainer.style.border = '3px solid red';
  // downloadButtonContainer.style.position = 'relative';
  // downloadButtonContainer.style.padding = '10px';

  // const downloadButtonHelper = document.createElement('div');

  // downloadButtonHelper.innerHTML = "1. 'Alexa und Echo Geräte' auswählen..";
  // downloadButtonHelper.style.color = 'red';
  // downloadButtonHelper.style.marginBottom = '20px';

  // downloadButtonContainer.prepend(downloadButtonHelper);

  // Deselect Button:

  const deselectButton = document.querySelector(
    "button[aria-label='Auswahl aufheben']"
  );
  const deselectButtonContainer = deselectButton.parentElement;

  deselectButtonContainer.style.border = "3px solid red";
  deselectButtonContainer.style.position = "relative";
  deselectButtonContainer.style.padding = "10px";

  const deselectButtonHelper = document.createElement("div");

  deselectButtonHelper.innerHTML = "1. 'Auswahl aufheben' auswählen..";
  deselectButtonHelper.style.color = "red";
  deselectButtonHelper.style.marginBottom = "20px";

  deselectButtonContainer.prepend(deselectButtonHelper);

  // My Activity Section:

  const myActivitySection = document.querySelector(
    "div[data-id='my_activity']"
  );
  const myActivitySectionContainer = myActivitySection;

  myActivitySectionContainer.style.border = "3px solid red";
  myActivitySectionContainer.style.position = "relative";
  myActivitySectionContainer.style.padding = "10px";

  const myActivitySectionHelper = document.createElement("div");

  myActivitySectionHelper.innerHTML = "2. 'Meine Aktivitäten' auswählen..";
  myActivitySectionHelper.style.color = "red";
  myActivitySectionHelper.style.marginBottom = "20px";

  const myActivitySectionHelper2 = document.createElement("div");

  myActivitySectionHelper2.innerHTML =
    "3. 'Mehrere Formate' auf 'JSON Format' ändern..";
  myActivitySectionHelper2.style.color = "red";
  myActivitySectionHelper2.style.marginBottom = "20px";

  myActivitySectionContainer.prepend(myActivitySectionHelper2);
  myActivitySectionContainer.prepend(myActivitySectionHelper);

  // Scroll:
  deselectButton.onclick = () => {
    myActivitySection.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Next step button

  const nextButton = document.querySelector(
    "button[aria-label='Nächster Schritt']"
  );
  const nextButtonContainer = nextButton.parentElement;

  nextButtonContainer.style.border = "3px solid red";
  nextButtonContainer.style.position = "relative";
  nextButtonContainer.style.padding = "10px";
  nextButtonContainer.style.display = "block";
  nextButtonContainer.style.textAlign = "right";

  const nextButtonHelper = document.createElement("div");

  nextButtonHelper.innerHTML = "4. 'Nächster Schritt' auswählen..";
  nextButtonHelper.style.color = "red";
  nextButtonHelper.style.marginBottom = "20px";

  nextButtonContainer.prepend(nextButtonHelper);

  // Next step button

  const exportButton = Array.from(
    document.querySelectorAll("button")
  ).find((node) => node.textContent.includes("Export erstellen"));

  const exportButtonContainer = exportButton.parentElement;

  exportButtonContainer.style.border = "3px solid red";
  exportButtonContainer.style.position = "relative";
  exportButtonContainer.style.padding = "10px";
  exportButtonContainer.style.display = "block";
  exportButtonContainer.style.textAlign = "right";

  const exportButtonHelper = document.createElement("div");

  exportButtonHelper.innerHTML =
    "5. Standard Einstellungen beibehalten und 'Export erstellen' auswählen..";
  exportButtonHelper.style.color = "red";
  exportButtonHelper.style.marginBottom = "20px";

  exportButtonContainer.prepend(exportButtonHelper);
}
