document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const images = [...gallery.querySelectorAll(".gallery-item")];
  const wrapper = document.createElement("div");
  wrapper.className = "gallery-items-row row";
  gallery.appendChild(wrapper);
  images.forEach((img) => {
    img.classList.add("img-fluid");

    const col = document.createElement("div");
    col.className = "item-column mb-4 col-12 col-sm-6 col-md-4";
    col.appendChild(img);
    wrapper.appendChild(col);
  });

  // Récupère tous les tags présents dans les images
  const tagSet = new Set();

  images.forEach((img) => {
    tagSet.add(img.dataset.galleryTag);
  });

  const tags = [...tagSet];

  // Crée la barre de filtres
  const tagBar = document.createElement("ul");
  tagBar.className = "my-4 tags-bar nav nav-pills";
  tagBar.innerHTML = `<li class="nav-item">
      <span class="nav-link active active-tag" data-images-toggle="all">Tous</span>
    </li>`;

  // Ajoute un bouton pour chaque tag
  tags.forEach((tag) => {
    tagBar.innerHTML += `<li class="nav-item">
        <span class="nav-link" data-images-toggle="${tag}">${tag}</span>
      </li>`;
  });

  gallery.insertBefore(tagBar, wrapper);

  // Logique de filtrage
  tagBar.querySelectorAll(".nav-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active-tag")) return;
      tagBar
        .querySelector(".active-tag")
        ?.classList.remove("active", "active-tag");
      btn.classList.add("active", "active-tag");

      const tag = btn.dataset.imagesToggle;

      // On filtre les colonnes d’images en fonction du tag
      wrapper.querySelectorAll(".item-column").forEach((col) => {
        const image = col.querySelector(".gallery-item");
        const match = tag === "all" || image.dataset.galleryTag === tag;

        col.style.display = match ? "block" : "none";
      });
    });
  });

  gallery.style.display = "block";
});
