import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="px-4 py-20 max-w-3xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-black font-redHatDisplay text-BM_Green">
        404
      </h1>
      <p className="text-base text-gray-600 font-redHatDisplay">
        The page you are looking for does not exist yet. Please head back home.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-BM_Green text-white font-redHatDisplay"
      >
        Return Home
      </Link>
    </section>
  );
};

export default NotFoundPage;

