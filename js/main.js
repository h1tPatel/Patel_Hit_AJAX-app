
(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const spinnerCon = document.createElement("div");
  spinnerCon.id = "spinner-con";

  let spinner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g transform="translate(50 50)">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0;45" keyTimes="0;1" dur="0.2s" repeatCount="indefinite"></animateTransform>
        <path d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20" fill="#e15b64"></path>
      </g>
    </g>
  </svg>`;

  // Functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function showSpinner() {
    spinnerCon.innerHTML = spinner;
    document.body.appendChild(spinnerCon);
  }

  function hideSpinner() {
    spinnerCon.innerHTML = "";
  }

  function loadInfoBoxes() {
    showSpinner();

    fetch('https://swiftpixel.com/earbud/api/infoboxes')
      .then(response => response.json())
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const headingElement = document.createElement('h3');
          headingElement.textContent = infoBox.heading;

          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = infoBox.description;

          const imageElement = document.createElement('img');
          const thumbnailNumber = index + 1;
          imageElement.src = `./images/thumbnail_${thumbnailNumber}.jpg`;

          selected.appendChild(imageElement);
          selected.appendChild(headingElement);
          selected.appendChild(descriptionElement);
        });

        hideSpinner();
      })
      .catch(error => {
        console.error('Error loading infoboxes:', error);
        hideSpinner();
      });
  }

  function loadMaterialInfo() {
    showSpinner();

    // Fetch API to load materials data
    fetch('https://swiftpixel.com/earbud/api/materials')
      .then(response => response.json())
      .then(materialListData => {
        materialListData.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

        hideSpinner();
      })
      .catch(error => {
        console.error('Error:', error);
        hideSpinner();
      });
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }

  // Event Listeners
  model.addEventListener("load", modelLoaded);
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Load data
  loadInfoBoxes();
  loadMaterialInfo();
})();
