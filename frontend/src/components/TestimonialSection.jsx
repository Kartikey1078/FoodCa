import React from "react";
import Testimonial from "./Testimonial";

const reviews = [
  {
    name: "Shashi Thakur",
    review:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    image: "https://via.placeholder.com/50", // temporary placeholder
    rating: 4,
  },
  {
    name: "Rahul Sharma",
    review:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    image: "https://via.placeholder.com/50",
    rating: 5,
  },
  {
    name: "Anita Singh",
    review:
      "Making it look like readable English is a key reason designers use placeholder text.",
    image: "https://via.placeholder.com/50",
    rating: 4,
  },
];

const reviewRowStyles = {
  wrapper: "overflow-x-scroll scrollbar-hide flex space-x-2 lg:space-x-6 px-2 sm:px-4 items-center",
  card: "min-w-[280px] sm:min-w-[320px] lg:min-w-[500px] max-w-[90%] md:max-w-[300px] tracking-wide text-black rounded-lg shadow-lg px-4 sm:p-6 mb-4 sm:mb-6",
};

const ReviewsRow = ({ direction, reviews }) => (
  <div className={`${reviewRowStyles.wrapper} animate-scroll-${direction}`}>
    {reviews.map((review, index) => (
      <div key={index} className={reviewRowStyles.card}>
        <Testimonial
          profilePic={review.image}
          name={review.name}
          description={review.review}
          rating={review.rating || 5}
        />
      </div>
    ))}
  </div>
);

const TestimonialSection = () => {
  return (
    <section
      className="relative bg-cover bg-center py-2 lg:py-16 w-full h-[600px] md:h-[600px] lg:h-[900px]"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative z-1 lg:max-w-full mx-auto text-white px-4">
        <h2 className="text-2xl w-[250px] lg:w-full md:w-full py-4 sm:py-0 lg:text-[40px] md:text-[30px] sm:text-4xl text-center font-black tracking-wider font-redHatDisplay text-BM_Bars mb-6 lg:mb-14 mx-auto">
          Customer Reviews & Testimonials
        </h2>

        <div>
          <ReviewsRow direction="left" reviews={reviews} />
          <ReviewsRow direction="right" reviews={reviews} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
