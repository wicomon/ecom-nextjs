import { useEffect, useRef } from "react";

const Main = () => {
  const slider = useRef();
  let index = 0;

  useEffect(() => {
    if (slider) {
      // console.log(slider.current);
      // console.log(slider.current.children.length);
    }
  }, [slider]);

  const prev = () => {
    slider.current.children[index].classList.remove("active");
    index =
      (index - 1 + slider.current.children.length) %
      slider.current.children.length;
    slider.current.children[index].classList.add("active");
  };
  const next = () => {
    slider.current.children[index].classList.remove("active");
    index = (index + 1) % slider.current.children.length;
    slider.current.children[index].classList.add("active");
  };

  // let slides = document.querySelectorAll('.home .slides-container .slide');
  return (
    <section className="home">
      <div className="slides-container" ref={slider}>
        <div
          className="slide active "
          // ref={slider}
        >
          <div className="content">
            <span>fresh and organic</span>
            <h3>upto 50% off</h3>
            <a href="#" className="btn">
              shop now
            </a>
          </div>
          <div className="image">
            <img src="image/home-img-1.png" alt="" />
          </div>
        </div>

        <div
          className="slide"
          // ref={slider}
        >
          <div className="content">
            <span>fresh and organic</span>
            <h3>upto 50% off</h3>
            <a href="#" className="btn">
              shop now
            </a>
          </div>
          <div className="image">
            <img src="image/home-img-2.png" alt="" />
          </div>
        </div>

        <div
          className="slide"
          // ref={slider}
        >
          <div className="content">
            <span>fresh and organic</span>
            <h3>upto 50% off</h3>
            <a href="#" className="btn">
              shop now
            </a>
          </div>
          <div className="image">
            <img src="image/home-img-3.png" alt="" />
          </div>
        </div>
      </div>

      <div
        id="next-slide"
        className="fas fa-angle-right"
        onClick={() => prev()}
      ></div>
      <div
        id="prev-slide"
        className="fas fa-angle-left"
        onClick={() => next()}
      ></div>
    </section>
  );
};

export default Main;
