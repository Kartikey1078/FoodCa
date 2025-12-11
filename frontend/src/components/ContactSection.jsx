import React from "react";


const ContactSection = () => {
 
  return (
    <div className="h-[620px] sm:h-[677px] relative mx-4 md:mx-10 md:my-20 my-10">
      <div className="absolute inset-0 w-auto rounded-3xl overflow-hidden">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093194!2d-122.41941548468255!3d37.774929279759116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064dfb8bbd9%3A0xa033f5e7ae53455b!2sBalanced%20Meal!5e0!3m2!1sen!2sus!4v1693749297400!5m2!1sen!2sus"
          className="w-full h-full rounded-3xl"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>

      {/* Query Form */}
      <div className="h-[580px] w-[320px] px-11 py-11 md:w-[400px] relative sm:absolute top-5 sm:top-1/2 left-1/2 md:left-auto md:right-8 transform -translate-x-1/2 sm:-translate-y-1/2 md:translate-x-0 max-w-[400px] bg-white p-6 shadow-lg rounded-2xl flex flex-col my-8 sm:my-0">
        <h2 className="text-[20px] sm:text-[24px] text-[#303030] font-redHatDisplay mb-2 font-extrabold sm:mb-4">
          Have a Query?
        </h2>

        <p className="text-[11px] sm:text-[12px] text-[#555555] font-bold tracking-wide font-redHatDisplay mb-8 sm:mb-6">
          We're just one click away! Join the countless others who have made the
          switch to a healthier lifestyle with Balanced Meal.
        </p>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full h-[40px] mb-5 px-3 text-[#555555] text-[11px] sm:text-[12px] font-medium rounded-md bg-[#F5F5F5]"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[40px] mb-5 px-3 text-[#555555] text-[11px] sm:text-[12px] font-medium rounded-md bg-[#F5F5F5]"
        />

        {/* Select Plan */}
        <div className="relative mb-5">
          <select
            className="w-full h-[40px] px-3 text-[#555555] text-[11px] sm:text-[12px] font-medium rounded-md bg-[#F5F5F5] appearance-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select Plan
            </option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan3">Plan 3</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#555555]">
            <svg
              className="fill-current h-3 w-3 sm:h-4 sm:w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <textarea
          placeholder="Write your message..."
          className="w-full h-[101px] mb-14 px-3 py-2 text-[#555555] text-[11px] sm:text-[12px] font-medium rounded-md bg-[#F5F5F5] resize-none"
        ></textarea>

        {/* Submit */}
        <button
          className="w-full h-[36px] sm:h-[40px] bg-[#38754E] text-white rounded-md text-[11px] sm:text-[12px] font-medium"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
   
  );
};

export default ContactSection;
