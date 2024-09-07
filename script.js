document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");
  
    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;
  
    let isDragging = false,
        startX,
        startScrollLeft;
  
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
        if (!isDragging) return;
  
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
  
        if (newScrollLeft <= 0 || newScrollLeft >=
            carousel.scrollWidth - carousel.offsetWidth) {
            isDragging = false;
            return;
        }
  
        carousel.scrollLeft = newScrollLeft;
    };
  
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
        checkButtons();
    };
  
    const checkButtons = () => {
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        if (carousel.scrollLeft <= 0) {
            arrowBtns[0].classList.add('disabled');
        } else {
            arrowBtns[0].classList.remove('disabled');
        }
        if (carousel.scrollLeft >= maxScrollLeft) {
            arrowBtns[1].classList.add('disabled');
        } else {
            arrowBtns[1].classList.remove('disabled');
        }
    };
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (!btn.classList.contains('disabled')) {
                let scrollAmount = firstCardWidth * (window.innerWidth <= 480 ? 1 : 2);
                carousel.scrollLeft += btn.id === "left" ? -scrollAmount : scrollAmount;
                checkButtons();
            }
        });
    });
  
    checkButtons();
});
