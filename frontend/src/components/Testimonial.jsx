import React from 'react';

const Testimonial = ({ profilePic, name, description, rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <div className="testimonial-card border border-[#C4C4C4] p-4 rounded-[24px] w-[270px] h-auto lg:w-[479px] lg:h-[235px] bg-white text-black">
      {/* Profile Section */}
      <div className="flex items-start mb-2">
        {/* Profile Picture */}
        <img
          src={profilePic}
          alt={name}
          className="w-10 h-10 lg:w-16 lg:h-16 rounded-full object-cover mr-4"
        />

        <div>
          {/* Name */}
          <h3 className="font-redHatDisplay text-[12px] lg:text-[20px] font-bold">{name}</h3>

          {/* Stars below the name */}
          <div className="flex mt-1">
            {stars.map((star, index) => (
              <svg
                key={index}
                className={`w-2 h-2 lg:w-4 lg:h-4 ${star ? 'text-yellow-500' : 'text-gray-400'}`}
                style={{ color: '#D9A709' }}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <p className="font-redHatDisplay text-[10px] lg:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Testimonial;
