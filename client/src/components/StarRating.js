import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  let i = 1;

  for (i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }
  if (rating === "0") {
    return <>No reviews</>;
  }

  return <>{stars}</>;
};

export default StarRating;
