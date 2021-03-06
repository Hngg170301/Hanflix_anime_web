import React, { PropsWithChildren, useCallback, useState } from "react";
import Slider, { Settings } from "react-slick";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";

interface CarouselProps {
  settings?: Settings;
}

interface ArrowButtonProps {
  onClick?: () => void;
}

function NextArrow(props: ArrowButtonProps) {
  const { onClick } = props;
  return (
    <div
      className={classNames(
        "bg-black absolute -right-0 transform -translate-y-1/2 top-1/2 p-3 cursor-pointer z-10"
      )}
      style={{ borderRadius: "50%" }}
      onClick={onClick}
    >
      <BsChevronRight size={20} className="text-white" />
    </div>
  );
}

function PrevArrow(props: ArrowButtonProps) {
  const { onClick } = props;
  return (
    <div
      className={classNames(
        "bg-black absolute left-0 transform -translate-y-1/2 top-1/2 p-3 cursor-pointer z-10"
      )}
      style={{ borderRadius: "50%" }}
      onClick={onClick}
    >
      <BsChevronLeft size={20} className="text-white" />
    </div>
  );
}

const defaultSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Carousel = (props: PropsWithChildren<CarouselProps>) => {
  const [swiped, setSwiped] = useState(false);

  const handleSwiped = useCallback(() => {
    setSwiped(true);
  }, [setSwiped]);

  const handleOnItemClick = useCallback(
    (e: any) => {
      if (swiped) {
        e.stopPropagation();
        e.preventDefault();
        setSwiped(false);
      }
    },
    [swiped]
  );

  const settings = { ...defaultSettings, ...props.settings };

  return (
    <Slider {...settings}>
      {React.Children.map(props.children, (child) => (
        <div>{child}</div>
      ))}
    </Slider>
  );
};

export default Carousel;
