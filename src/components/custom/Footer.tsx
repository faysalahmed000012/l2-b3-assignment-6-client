export const Footer = () => (
  <footer className="bg-gray-100 mt-16">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold text-orange-500">Crunch Social</h3>
          <p className="text-gray-600">Connect through culinary creations</p>
        </div>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-orange-500">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 hover:text-orange-500">
            Contact Us
          </a>
        </nav>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Crunch Social. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
