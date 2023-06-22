import "libs/polyfills";

startAlexaIntro();

function startAlexaIntro() {
  if (window.location.pathname.endsWith("view.html")) {
    console.log("checkmyva alexa view intro init");

    const downloads = document.querySelectorAll(
      "#dsar-page-download .dsar-request li.dsar-request__item"
    );

    const regex = /Alexa_(\d+).zip/;

    let highestIndex = 0;
    let highestElement = null;

    for (const element of downloads) {
      const match = regex.exec(element.innerHTML);

      if (match && match[1]) {
        const index = parseInt(match[1]);

        if (index > highestIndex) {
          highestIndex = index;
          highestElement = element;
        }
      }
    }

    if (highestElement) {
      const helperText = document.createElement("div");

      highestElement.style.border = "3px solid red";
      highestElement.style.padding = "7px";
      highestElement.style.margin = "0 -10px 0 -10px";

      helperText.style.color = "red";
      helperText.style.marginBottom = "10px";

      helperText.innerHTML =
        "Für CheckMyVA diesen Download starten. Der Download wird, sobald er abgeschlossen ist, automatisch ausgewertet...";
      highestElement.prepend(helperText);
    }
  }

  if (window.location.pathname.endsWith("preview.html")) {
    console.log("checkmyva alexa preview intro init");

    const categorySelect = document.querySelector(
      "#aedu-dsar-data-categories-dropdown"
    );
    const categeorySelectContainer = categorySelect.parentElement.parentElement;

    const submitButton = document.querySelector("#aedu-dsar-create-btn");
    const submitButtonContainer = submitButton.parentElement;

    const step1helper = document.createElement("div");
    const step2helper = document.createElement("div");

    categeorySelectContainer.style.border = "3px solid red";
    categeorySelectContainer.style.position = "relative";
    categeorySelectContainer.style.padding = "10px";

    submitButtonContainer.style.border = "3px solid red";
    submitButtonContainer.style.position = "relative";
    submitButtonContainer.style.padding = "10px";

    step1helper.innerHTML = "1. 'Alexa und Echo Geräte' auswählen..";
    step1helper.style.color = "red";
    step1helper.style.marginBottom = "20px";
    // step1helper.style.position = 'absolute';
    // step1helper.style.top = '-30px';
    // step1helper.style.left = 0;

    step2helper.innerHTML = "2. 'Anfrage senden' um Takeout anzufordern..";
    step2helper.style.color = "red";
    step1helper.style.marginBottom = "20px";
    step2helper.style.textAlign = "left";

    categeorySelectContainer.prepend(step1helper);
    submitButtonContainer.prepend(step2helper);
  }

  if (window.location.pathname.endsWith("create.html")) {
    console.log("checkmyva alexa create intro init");

    const container = document.querySelector("#dsar-create-page");

    const helper = document.createElement("div");

    container.style.border = "3px solid red";
    container.style.padding = "10px";

    helper.innerHTML = "Bitte lesen und den Anweisungen folgen.";
    helper.style.color = "red";
    helper.style.textAlign = "left";

    container.prepend(helper);
  }

  if (window.location.pathname.endsWith("confirm.html")) {
    console.log("checkmyva alexa confirm intro init");

    const container = document.querySelector("#dsar-confirm-page");

    const helper = document.createElement("div");

    container.style.border = "3px solid red";
    container.style.padding = "10px";

    helper.innerHTML =
      "Bitte lesen und in den nächsten Tagen auf deine Emails/SMS achten.";
    helper.style.color = "red";
    helper.style.textAlign = "left";

    container.prepend(helper);
  }

  console.log("checkmyva intro exit");
}
