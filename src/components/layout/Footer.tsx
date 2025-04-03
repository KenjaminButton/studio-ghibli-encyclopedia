export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Studio Ghibli Encyclopedia. All data from <a href="https://ghibliapi.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Ghibli API</a>.</p>
        <p>This is a fan-made project.</p>
      </div>
    </footer>
  );
}
