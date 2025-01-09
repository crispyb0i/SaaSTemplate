import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-500 text-white py-16">
          <div className="container mx-auto text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Build Faster. Grow Smarter.
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Launch your solopreneur project with a modern, reusable tech
              stack.
            </p>
            <a
              href="#features"
              className="bg-white text-blue-500 font-medium py-2 px-6 rounded-full hover:bg-gray-100"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Why Choose This Stack?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Efficient Development
                </h3>
                <p className="text-gray-600">
                  Save time with pre-configured tools and reusable components.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Scalable Design
                </h3>
                <p className="text-gray-600">
                  Tailwind and Next.js ensure your project looks great and grows
                  effortlessly.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Optimized for Success
                </h3>
                <p className="text-gray-600">
                  SEO, performance, and analytics built in from day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              What People Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-100 rounded-lg shadow">
                <p className="text-gray-700 italic mb-4">
                  This stack saved me weeks of setup and helped me launch
                  faster!
                </p>
                <h4 className="font-semibold text-gray-800">
                  - Alex, Indie Maker
                </h4>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow">
                <p className="text-gray-700 italic mb-4">
                  Everything I needed to build my MVP in one place. Highly
                  recommend!
                </p>
                <h4 className="font-semibold text-gray-800">
                  - Jamie, Solo Developer
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-blue-500 text-white py-16">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">
              Jumpstart your next project with this easy-to-use template.
            </p>
            <a
              href="#"
              className="bg-white text-blue-500 font-medium py-2 px-6 rounded-full hover:bg-gray-100"
            >
              Download Template
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
