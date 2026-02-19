const panes = document.querySelectorAll(".pane");

let z = 1;
panes.forEach((pane) => {
  const title = pane.querySelector(".title");
  const corner = pane.querySelector(".corner");

  pane.addEventListener("mousedown", () => {
    z++;
    pane.style.zIndex = z;
  });

  title.addEventListener("mousedown", (event) => {
    pane.classList.add("is-dragging");

    const l = pane.offsetLeft;
    const t = pane.offsetTop;
    const startX = event.pageX;
    const startY = event.pageY;

    const drag = (event) => {
      event.preventDefault();
      pane.style.left = l + (event.pageX - startX) + "px";
      pane.style.top = t + (event.pageY - startY) + "px";
    };
    const mouseup = () => {
      pane.classList.remove("is-dragging");

      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", mouseup);
  });

  corner.addEventListener("mousedown", (event) => {
    const w = pane.clientWidth;
    const h = pane.clientHeight;
    const startX = event.pageX;
    const startY = event.pageY;

    const resize = (event) => {
      event.preventDefault();
      pane.style.width = w + (event.pageX - startX) + "px";
      pane.style.height = h + (event.pageY - startY) + "px";
    };
    const mouseup = () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", mouseup);
  });
});
