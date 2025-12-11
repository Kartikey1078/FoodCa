const ReviewOrderHeader = () => {
    return (
      <div className="w-full flex justify-center mt-6">
        <div className="
          relative 
          px-8 py-4 
          rounded-3xl 
          shadow-xl 
          backdrop-blur-lg 
          bg-white/90 
          border border-[#0c322e]/20
        ">
          
          {/* Glow Behind */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ff7733]/40 to-[#0c322e]/40 blur-xl -z-10 opacity-40"></div>
  
          {/* Review Order Text */}
          <h2
            className="
              text-2xl 
              font-extrabold 
              tracking-wide 
              bg-gradient-to-r from-[#ff7733] to-[#0c322e] 
              bg-clip-text 
              text-transparent
            "
          >
            Review Order
          </h2>
  
          {/* Cute underline bar */}
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-[#ff7733] to-[#0c322e]"></div>
        </div>
      </div>
    );
  };
  
  export default ReviewOrderHeader;
  