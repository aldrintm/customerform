import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='font-sans antialiased'>
      {/* Navigation Bar - Mobile-friendly with hamburger */}
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

      {/* Hero Section - Responsive text: short on mobile, long on desktop */}
      <header className='relative h-screen md:h-[80vh]'>
        <Image
          src='https://source.unsplash.com/random/1920x1080/?luxury-kitchen-countertop'
          alt='Luxury Kitchen Countertop'
          fill
          className='object-cover brightness-90'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
          <div className='text-left text-white w-full max-w-xl md:max-w-2xl animate-fade-in-up space-y-4 md:space-y-6'>
            <div className='inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide'>
              <span className='block md:hidden'>35+ Years in Bay Area</span>
              <span className='hidden md:block'>
                Over 35 Years of Excellence in the Bay Area
              </span>
            </div>
            <h1 className='text-4xl md:text-7xl font-extrabold leading-tight'>
              <span className='block md:hidden'>
                Custom Granite & Quartz Countertops
              </span>
              <span className='hidden md:block'>
                Transform Your Home with Custom Granite & Quartz Countertops
              </span>
            </h1>
            <p className='text-lg md:text-2xl'>
              <span className='block md:hidden'>
                Durable, elegant, precise install. Stunning results that last.
              </span>
              <span className='hidden md:block'>
                Experience unmatched durability, elegance, and precision
                installation. Get a stunning kitchen or bath that lasts a
                lifetime.
              </span>
            </p>
            <div className='space-y-3'>
              <p className='text-base md:text-lg font-semibold'>
                <span className='block md:hidden'>
                  Easy Upgrade – No Full Reno!
                </span>
                <span className='hidden md:block'>
                  It's Super Easy to Upgrade – No Full Renovation Needed!
                </span>
              </p>
              <ul className='list-disc list-inside text-base md:text-lg space-y-1'>
                <li>
                  <span className='block md:hidden'>
                    Quick: Days, not months.
                  </span>
                  <span className='hidden md:block'>
                    No waiting 3 months for contractors – quick turnaround in
                    days.
                  </span>
                </li>
                <li>
                  <span className='block md:hidden'>
                    Remove old, install new, add faucet/sink, fix plumbing –
                    done!
                  </span>
                  <span className='hidden md:block'>
                    Simply remove your old counter, install the new one, add a
                    faucet and sink, settle the plumbing, and you're done!
                  </span>
                </li>
                <li>
                  <span className='block md:hidden'>No big disruption.</span>
                  <span className='hidden md:block'>
                    Seamless process without disrupting your entire space.
                  </span>
                </li>
              </ul>
            </div>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
              <Link
                href='/quote'
                className='bg-yellow-400 text-blue-900 px-6 py-3 rounded-md font-bold text-base hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg'
              >
                <span className='block md:hidden'>Free Quote</span>
                <span className='hidden md:block'>Get Free Quote Now</span>
              </Link>
              <Link
                href='/gallery'
                className='bg-transparent border-2 border-white px-6 py-3 rounded-md font-bold text-base hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105'
              >
                <span className='block md:hidden'>View Projects</span>
                <span className='hidden md:block'>Browse Our Projects</span>
              </Link>
            </div>
            <div className='flex flex-wrap items-center space-x-2 text-xs md:text-sm'>
              <span>
                <span className='block md:hidden'>1,000+ Happy Clients</span>
                <span className='hidden md:block'>
                  Trusted by 1,000+ Happy Homeowners
                </span>
              </span>
              <span>•</span>
              <span>
                <span className='block md:hidden'>Fast & Affordable</span>
                <span className='hidden md:block'>
                  Fast Turnaround & Competitive Pricing
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Reasons to Buy - Responsive text */}
      <section className='py-12 md:py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12'>
            Why Us?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            <div className='bg-white p-6 md:p-8 rounded-lg shadow-md'>
              <h3 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-600'>
                01 In-Stock Slabs
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Fast completion, more options, lower costs, better quality.
                  Renovate sooner.
                </span>
                <span className='hidden md:block'>
                  Our in-stock quartz slab selection offers the ultimate
                  convenience, providing customers with faster project
                  completion, a wider range of options, reduced costs, and
                  improved quality control. Take advantage of these benefits and
                  enjoy your renovation sooner.
                </span>
              </p>
            </div>
            <div className='bg-white p-6 md:p-8 rounded-lg shadow-md'>
              <h3 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-600'>
                02 High-End Fab
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Advanced machines for precise cuts, speed, quality,
                  durability. Satisfaction guaranteed.
                </span>
                <span className='hidden md:block'>
                  Our utilization of state-of-the-art machinery sets us apart
                  and ensures that you receive a product that is unmatched in
                  precision cuts, speed of fabrication, product quality,
                  consistency, and durability. Your satisfaction is guaranteed
                  through our commitment to utilizing only the best technology
                  and techniques in the fabrication process.
                </span>
              </p>
            </div>
            <div className='bg-white p-6 md:p-8 rounded-lg shadow-md'>
              <h3 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-600'>
                03 Expert Install
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Experienced team: detail-oriented, problem-solvers, quality
                  work. Professional results.
                </span>
                <span className='hidden md:block'>
                  Discover the difference of having a truly experienced
                  installer for your kitchen quartz and stone countertop
                  installation. Our team of experts bring their expertise,
                  attention to detail, problem-solving skills, effective time
                  management, and unwavering commitment to quality workmanship
                  to every project.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services - Responsive text */}
      <section className='py-12 md:py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12'>
            Services
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            <div className='bg-gray-100 p-5 md:p-6 rounded-lg shadow-md'>
              <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
                Estimate & Quote
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Understand pricing to fit your budget and needs.
                </span>
                <span className='hidden md:block'>
                  Price is a major decision factor when it comes to remodeling.
                  We can help you understand the different pricing options to
                  meet your budget and needs.
                </span>
              </p>
            </div>
            <div className='bg-gray-100 p-5 md:p-6 rounded-lg shadow-md'>
              <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
                Onsite Measure
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Laser precision on-site for perfect fit.
                </span>
                <span className='hidden md:block'>
                  The best way to achieve the best fit and get the actual angles
                  is to measure on the jobsite. We use the best technology and
                  precision to measure your countertops.
                </span>
              </p>
            </div>
            <div className='bg-gray-100 p-5 md:p-6 rounded-lg shadow-md'>
              <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
                High-End Fab
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Shop-made with CNCs, Waterjets, RoboSaw.
                </span>
                <span className='hidden md:block'>
                  There is no substitute other than shop manufacturing your
                  countertops. We are proud to house our CNCs, Waterjets,
                  Edgeliners and our Upgraded RoboSaw.
                </span>
              </p>
            </div>
            <div className='bg-gray-100 p-5 md:p-6 rounded-lg shadow-md'>
              <h3 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
                Pro Installs
              </h3>
              <p className='text-gray-600 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Experienced craftsmen for dream results.
                </span>
                <span className='hidden md:block'>
                  We have true and experienced craftsmen in our install teams.
                  Their attention to details and expertise contributes to the
                  success of your dream kitchen.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Responsive text */}
      <section className='py-12 md:py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12'>
            Trusted
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            <div className='bg-white p-5 md:p-6 rounded-lg'>
              <p className='text-gray-700 italic text-sm md:text-base'>
                <span className='block md:hidden'>"Amazing quality!"</span>
                <span className='hidden md:block'>
                  "Amazing quality and service!"
                </span>
              </p>
              <p className='text-right text-gray-500 text-xs md:text-sm'>
                - Happy Customer
              </p>
            </div>
            <div className='bg-white p-5 md:p-6 rounded-lg'>
              <p className='text-gray-700 italic text-sm md:text-base'>
                <span className='block md:hidden'>"Kitchen transformed."</span>
                <span className='hidden md:block'>
                  "Transformed our kitchen beautifully."
                </span>
              </p>
              <p className='text-right text-gray-500 text-xs md:text-sm'>
                - Satisfied Client
              </p>
            </div>
            <div className='bg-white p-5 md:p-6 rounded-lg'>
              <p className='text-gray-700 italic text-sm md:text-base'>
                <span className='block md:hidden'>"Highly recommend."</span>
                <span className='hidden md:block'>
                  "Professional installation, highly recommend."
                </span>
              </p>
              <p className='text-right text-gray-500 text-xs md:text-sm'>
                - Repeat Customer
              </p>
            </div>
          </div>
          <div className='mt-8 md:mt-12 text-center'>
            <p className='text-xl md:text-2xl font-semibold mb-3 md:mb-4'>
              Brands:
            </p>
            <div className='flex flex-wrap justify-center space-x-3 space-y-3'>
              <Image
                src='https://via.placeholder.com/80x40?text=Cambria'
                alt='Cambria'
                width={80}
                height={40}
              />
              <Image
                src='https://via.placeholder.com/80x40?text=Caesarstone'
                alt='Caesarstone'
                width={80}
                height={40}
              />
              <Image
                src='https://via.placeholder.com/80x40?text=Silestone'
                alt='Silestone'
                width={80}
                height={40}
              />
              <Image
                src='https://via.placeholder.com/80x40?text=Vadara'
                alt='Vadara Quartz'
                width={80}
                height={40}
              />
              <Image
                src='https://via.placeholder.com/80x40?text=LG+Viatera'
                alt='LG Viatera Quartz'
                width={80}
                height={40}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Responsive text */}
      <section className='py-12 md:py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12'>
            Why Plamar?
          </h2>
          <div className='flex flex-col md:flex-row items-center'>
            <Image
              src='https://source.unsplash.com/random/600x400/?kitchen-team-fabrication'
              alt='Our Team'
              width={600}
              height={400}
              className='w-full md:w-1/2 mb-6 md:mb-0 md:mr-8 rounded-lg'
            />
            <div>
              <p className='text-gray-700 text-sm md:text-base mb-3 md:mb-4'>
                <span className='block md:hidden'>
                  Full-service shop serving Bay Area for 35+ years. High-quality
                  granite/quartz countertops.
                </span>
                <span className='hidden md:block'>
                  Plamar USA Inc. is a Full Service Shop. We have been providing
                  granite and quartz countertops to the entire Bay Area for over
                  35 years. Our high-quality manufacturing facility can produce
                  the countertops you want.
                </span>
              </p>
              <p className='text-gray-700 text-sm md:text-base'>
                <span className='block md:hidden'>
                  Experts with top brands: Cambria, Caesarstone, Silestone,
                  Vadara, LG Viatera.
                </span>
                <span className='hidden md:block'>
                  We are experts in granite and quartz slab installations,
                  partnering with top brands like Cambria, Caesarstone,
                  Silestone, Vadara Quartz, and LG Viatera Quartz.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser - Responsive text */}
      <section className='py-12 md:py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12'>
            Insights
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            <div className='bg-white p-5 md:p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?kitchen'
                alt='Blog 1'
                width={300}
                height={200}
                className='mb-3 md:mb-4 rounded'
              />
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                <span className='block md:hidden'>Quartz Trends 2025</span>
                <span className='hidden md:block'>Top Quartz Trends 2025</span>
              </h3>
              <Link
                href='/blog/top-quartz-trends'
                className='text-blue-600 hover:underline text-sm md:text-base'
              >
                Read
              </Link>
            </div>
            <div className='bg-white p-5 md:p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?bathroom'
                alt='Blog 2'
                width={300}
                height={200}
                className='mb-3 md:mb-4 rounded'
              />
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                Granite vs Quartz
              </h3>
              <Link
                href='/blog/granite-vs-quartz'
                className='text-blue-600 hover:underline text-sm md:text-base'
              >
                Read
              </Link>
            </div>
            <div className='bg-white p-5 md:p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?stone'
                alt='Blog 3'
                width={300}
                height={200}
                className='mb-3 md:mb-4 rounded'
              />
              <h3 className='text-lg md:text-xl font-semibold mb-2'>
                <span className='block md:hidden'>Maintenance Tips</span>
                <span className='hidden md:block'>
                  Countertop Maintenance Tips
                </span>
              </h3>
              <Link
                href='/blog/countertop-maintenance'
                className='text-blue-600 hover:underline text-sm md:text-base'
              >
                Read
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Responsive text */}
      <section className='py-12 md:py-16 bg-blue-600 text-white text-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            <span className='block md:hidden'>Upgrade Now?</span>
            <span className='hidden md:block'>
              Ready to Upgrade Your Countertops?
            </span>
          </h2>
          <p className='text-lg md:text-2xl mb-6 md:mb-8'>
            <span className='block md:hidden'>Free consultation today.</span>
            <span className='hidden md:block'>
              Contact us today for a free consultation.
            </span>
          </p>
          <Link
            href='/quote'
            className='bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 text-base md:text-lg font-semibold transition-transform hover:scale-105'
          >
            <span className='block md:hidden'>Quote</span>
            <span className='hidden md:block'>Get Your Quote</span>
          </Link>
        </div>
      </section>

      {/* Footer - Responsive text */}
      <footer className='bg-gray-800 text-white py-6 md:py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8'>
            <div>
              <h4 className='font-bold mb-3 md:mb-4 text-base md:text-lg'>
                Plamar USA
              </h4>
              <p className='text-sm md:text-base'>
                <span className='block md:hidden'>
                  Premium granite/quartz installs.
                </span>
                <span className='hidden md:block'>
                  Specializing in premium granite and quartz slab installations.
                </span>
              </p>
            </div>
            <div>
              <h4 className='font-bold mb-3 md:mb-4 text-base md:text-lg'>
                Links
              </h4>
              <ul className='text-sm md:text-base'>
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
              <h4 className='font-bold mb-3 md:mb-4 text-base md:text-lg'>
                Contact
              </h4>
              <p className='text-sm md:text-base'>Email: info@plamarusa.com</p>
              <p className='text-sm md:text-base'>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h4 className='font-bold mb-3 md:mb-4 text-base md:text-lg'>
                Follow
              </h4>
              <p className='text-sm md:text-base'>Social links</p>
            </div>
          </div>
          <div className='mt-6 md:mt-8 text-center text-xs md:text-sm'>
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
