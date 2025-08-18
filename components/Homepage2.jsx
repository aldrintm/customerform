import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='font-sans antialiased'>
      {/* Navigation Bar */}
      <nav className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex-shrink-0'>
              <Image
                src='https://via.placeholder.com/150x50?text=Plamar+USA+Logo'
                alt='Plamar USA Logo'
                width={150}
                height={50}
              />
            </div>
            <div className='hidden md:flex space-x-8'>
              <Link href='/' className='text-gray-700 hover:text-gray-900'>
                Home
              </Link>
              <Link href='/about' className='text-gray-700 hover:text-gray-900'>
                About
              </Link>
              <Link
                href='/services'
                className='text-gray-700 hover:text-gray-900'
              >
                Services
              </Link>
              <Link href='/blog' className='text-gray-700 hover:text-gray-900'>
                Blog
              </Link>
              <Link
                href='/contact'
                className='text-gray-700 hover:text-gray-900'
              >
                Contact
              </Link>
            </div>
            <div className='hidden md:block'>
              <Link
                href='/quote'
                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
              >
                Get a Quote
              </Link>
            </div>
            {/* Hamburger for mobile */}
            <div className='md:hidden'>
              <button className='text-gray-700'>
                {/* Icon would go here */}
                Menu
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section - More convincing with benefit-focused headline, trust signals, urgent CTA, and engaging visuals */}
      <header className='relative h-screen'>
        <Image
          src='https://source.unsplash.com/random/1920x1080/?luxury-kitchen-countertop'
          alt='Luxury Kitchen Countertop'
          fill
          className='object-cover brightness-90'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
          <div className='text-left text-white max-w-xl md:max-w-2xl animate-fade-in-up space-y-6'>
            <div className='inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide'>
              Over 35 Years of Excellence in the Bay Area
            </div>
            <h1 className='text-5xl md:text-7xl font-extrabold leading-tight'>
              Transform Your Home with Custom Granite & Quartz Countertops
            </h1>
            <p className='text-xl md:text-2xl'>
              Experience unmatched durability, elegance, and precision
              installation. Get a stunning kitchen or bath that lasts a lifetime
              – starting with your free quote today!
            </p>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
              <Link
                href='/quote'
                className='bg-yellow-400 text-blue-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg'
              >
                Get Free Quote Now
              </Link>
              <Link
                href='/gallery'
                className='bg-transparent border-2 border-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105'
              >
                Browse Our Projects
              </Link>
            </div>
            <div className='flex items-center space-x-4 text-sm'>
              <span>Trusted by 1,000+ Happy Homeowners</span>
              <span>•</span>
              <span>Fast Turnaround & Competitive Pricing</span>
            </div>
          </div>
        </div>
      </header>

      {/* Reasons to Buy from Us */}
      <section className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Reasons to Buy from Us
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-4 text-blue-600'>
                01 In Stock Slab Materials
              </h3>
              <p className='text-gray-600'>
                Our in-stock quartz slab selection offers the ultimate
                convenience, providing customers with faster project completion,
                a wider range of options, reduced costs, and improved quality
                control. Take advantage of these benefits and enjoy your
                renovation sooner.
              </p>
            </div>
            <div className='bg-white p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-4 text-blue-600'>
                02 High End Fabrication
              </h3>
              <p className='text-gray-600'>
                Our utilization of state-of-the-art machinery sets us apart and
                ensures that you receive a product that is unmatched in
                precision cuts, speed of fabrication, product quality,
                consistency, and durability. Your satisfaction is guaranteed
                through our commitment to utilizing only the best technology and
                techniques in the fabrication process. Experience the efficiency
                and benefits of our high-end machinery when fabricating your
                quartz countertops.
              </p>
            </div>
            <div className='bg-white p-8 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-4 text-blue-600'>
                03 True Craftsmanship in Installation
              </h3>
              <p className='text-gray-600'>
                Discover the difference of having a truly experienced installer
                for your kitchen quartz and stone countertop installation. Our
                team of experts bring their expertise, attention to detail,
                problem-solving skills, effective time management, and
                unwavering commitment to quality workmanship to every project.
                Trust in our experience for an organized and professional
                installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Our Main Services
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Estimate and Quote</h3>
              <p className='text-gray-600'>
                Price is a major decision factor when it comes to remodeling. We
                can help you understand the different pricing options to meet
                your budget and needs.
              </p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>
                Onsite Laser Measure
              </h3>
              <p className='text-gray-600'>
                The best way to achieve the best fit and get the actual angles
                is to measure on the jobsite. We use the best technology and
                precision to measure your countertops.
              </p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>
                High-end Fabrication
              </h3>
              <p className='text-gray-600'>
                There is no substitute other than shop manufacturing your
                countertops. We are proud to house our CNCs, Waterjets,
                Edgeliners and our Upgraded RoboSaw.
              </p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>
                Craftsmanship on Installs
              </h3>
              <p className='text-gray-600'>
                We have true and experienced craftsmen in our install teams.
                Their attention to details and expertise contributes to the
                success of your dream kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof/Trust Section */}
      <section className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Trusted by Thousands
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg'>
              <p className='text-gray-700 italic'>
                "Amazing quality and service!"
              </p>
              <p className='text-right text-gray-500'>- Happy Customer</p>
            </div>
            <div className='bg-white p-6 rounded-lg'>
              <p className='text-gray-700 italic'>
                "Transformed our kitchen beautifully."
              </p>
              <p className='text-right text-gray-500'>- Satisfied Client</p>
            </div>
            <div className='bg-white p-6 rounded-lg'>
              <p className='text-gray-700 italic'>
                "Professional installation, highly recommend."
              </p>
              <p className='text-right text-gray-500'>- Repeat Customer</p>
            </div>
          </div>
          <div className='mt-12 text-center'>
            <p className='text-2xl font-semibold mb-4'>Brands We Work With:</p>
            <div className='flex justify-center flex-wrap space-x-4 space-y-4'>
              <Image
                src='https://via.placeholder.com/100x50?text=Cambria'
                alt='Cambria'
                width={100}
                height={50}
              />
              <Image
                src='https://via.placeholder.com/100x50?text=Caesarstone'
                alt='Caesarstone'
                width={100}
                height={50}
              />
              <Image
                src='https://via.placeholder.com/100x50?text=Silestone'
                alt='Silestone'
                width={100}
                height={50}
              />
              <Image
                src='https://via.placeholder.com/100x50?text=Vadara'
                alt='Vadara Quartz'
                width={100}
                height={50}
              />
              <Image
                src='https://via.placeholder.com/100x50?text=LG+Viatera'
                alt='LG Viatera Quartz'
                width={100}
                height={50}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About/Why Us Section */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Why Choose Plamar USA?
          </h2>
          <div className='flex flex-col md:flex-row items-center'>
            <Image
              src='https://source.unsplash.com/random/600x400/?kitchen-team-fabrication'
              alt='Our Team'
              width={600}
              height={400}
              className='w-full md:w-1/2 mb-8 md:mb-0 md:mr-8 rounded-lg'
            />
            <div>
              <p className='text-gray-700 mb-4'>
                Plamar USA Inc. is a Full Service Shop. We have been providing
                granite and quartz countertops to the entire Bay Area for over
                35 years. Our high-quality manufacturing facility can produce
                the countertops you want. Our tools and teams of craftsmen can
                deliver the ultimate statement to match your kitchen design.
              </p>
              <p className='text-gray-700'>
                We are experts in granite and quartz slab installations,
                partnering with top brands like Cambria, Caesarstone, Silestone,
                Vadara Quartz, and LG Viatera Quartz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Content/Blog Teaser */}
      <section className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Latest Insights
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?kitchen'
                alt='Blog 1'
                width={300}
                height={200}
                className='mb-4 rounded'
              />
              <h3 className='text-xl font-semibold mb-2'>
                Top Quartz Trends 2025
              </h3>
              <Link
                href='/blog/top-quartz-trends'
                className='text-blue-600 hover:underline'
              >
                Read More
              </Link>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?bathroom'
                alt='Blog 2'
                width={300}
                height={200}
                className='mb-4 rounded'
              />
              <h3 className='text-xl font-semibold mb-2'>Granite vs. Quartz</h3>
              <Link
                href='/blog/granite-vs-quartz'
                className='text-blue-600 hover:underline'
              >
                Read More
              </Link>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?stone'
                alt='Blog 3'
                width={300}
                height={200}
                className='mb-4 rounded'
              />
              <h3 className='text-xl font-semibold mb-2'>
                Countertop Maintenance Tips
              </h3>
              <Link
                href='/blog/countertop-maintenance'
                className='text-blue-600 hover:underline'
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='py-16 bg-blue-600 text-white text-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold mb-4'>
            Ready to Upgrade Your Countertops?
          </h2>
          <p className='text-2xl mb-8'>
            Contact us today for a free consultation.
          </p>
          <Link
            href='/quote'
            className='bg-white text-blue-600 px-8 py-4 rounded-md hover:bg-gray-100 text-lg font-semibold transition-transform hover:scale-105'
          >
            Get Your Quote
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h4 className='font-bold mb-4'>Plamar USA</h4>
              <p>
                Specializing in premium granite and quartz slab installations.
              </p>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Links</h4>
              <ul>
                <li>
                  <Link href='/' className='hover:underline'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href='/about' className='hover:underline'>
                    About
                  </Link>
                </li>
                <li>
                  <Link href='/services' className='hover:underline'>
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Contact</h4>
              <p>Email: info@plamarusa.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Follow Us</h4>
              {/* Social icons would go here */}
              <p>Social links</p>
            </div>
          </div>
          <div className='mt-8 text-center'>
            <p>&copy; 2025 Plamar USA. All rights reserved.</p>
            <Link href='/privacy' className='hover:underline'>
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href='/terms' className='hover:underline'>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
