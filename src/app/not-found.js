import Link from "next/link";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          Oops! That page doesn&apos;t seem to exist.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-10">
        <Image
          src="/vercel.svg" // Replace with your own 404 image path
          alt="404 Page Not Found"
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}
