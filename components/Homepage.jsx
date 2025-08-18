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
                src='https://source.unsplash.com/photos/white-suv-on-green-grass-field-under-blue-sky-during-daytime-DEqXvbK2zX8'
                alt='QuartzCo Logo'
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

      {/* Hero Section */}
      <header className='relative h-screen'>
        <Image
          src='https://source.unsplash.com/photos/white-suv-on-green-grass-field-under-blue-sky-during-daytime-DEqXvbK2zX8'
          alt='Quartz Countertop'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
          <div className='text-center text-white'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              Elevate Your Space with Premium Quartz Countertops
            </h1>
            <p className='text-xl md:text-2xl mb-8'>
              Specializing in Quartz, Porcelain, and Stone Slab Installations
            </p>
            <div className='space-x-4'>
              <Link
                href='/get-started'
                className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700'
              >
                Get Started
              </Link>
              <Link
                href='/learn-more'
                className='bg-transparent border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600'
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Core Offerings/Features */}
      <section className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Our Premium Offerings
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?quartz'
                alt='Quartz'
                width={300}
                height={200}
                className='mb-4'
              />
              <h3 className='text-xl font-semibold mb-2'>Quartz Slabs</h3>
              <p className='text-gray-600'>
                Durable and elegant quartz options for modern kitchens and
                baths.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?porcelain'
                alt='Porcelain'
                width={300}
                height={200}
                className='mb-4'
              />
              <h3 className='text-xl font-semibold mb-2'>Porcelain Surfaces</h3>
              <p className='text-gray-600'>
                Heat-resistant and low-maintenance porcelain for versatile
                applications.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?stone'
                alt='Stone'
                width={300}
                height={200}
                className='mb-4'
              />
              <h3 className='text-xl font-semibold mb-2'>
                Stone Installations
              </h3>
              <p className='text-gray-600'>
                Natural stone slabs expertly installed for timeless beauty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof/Trust Section */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Trusted by Thousands
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-100 p-6 rounded-lg'>
              <p className='text-gray-700 italic'>
                "Amazing quality and service!"
              </p>
              <p className='text-right text-gray-500'>- Happy Customer</p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg'>
              <p className='text-gray-700 italic'>
                "Transformed our kitchen beautifully."
              </p>
              <p className='text-right text-gray-500'>- Satisfied Client</p>
            </div>
            <div className='bg-gray-100 p-6 rounded-lg'>
              <p className='text-gray-700 italic'>
                "Professional installation, highly recommend."
              </p>
              <p className='text-right text-gray-500'>- Repeat Customer</p>
            </div>
          </div>
          <div className='mt-12 text-center'>
            <p className='text-xl font-semibold'>Brands We Work With:</p>
            <div className='flex justify-center space-x-4 mt-4'>
              <Image
                src='https://source.unsplash.com/100x50/?cambria'
                alt='Cambria'
                width={100}
                height={50}
              />
              <Image
                src='https://source.unsplash.com/100x50/?caesarstone'
                alt='Caesarstone'
                width={100}
                height={50}
              />
              <Image
                src='https://source.unsplash.com/photos/white-suv-on-green-grass-field-under-blue-sky-during-daytime-DEqXvbK2zX8'
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
      <section className='py-16 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Why Choose Us?
          </h2>
          <div className='flex flex-col md:flex-row items-center'>
            <Image
              src='https://source.unsplash.com/random/600x400/?team'
              alt='Our Team'
              width={600}
              height={400}
              className='w-full md:w-1/2 mb-8 md:mb-0 md:mr-8'
            />
            <div>
              <p className='text-gray-700 mb-4'>
                We are experts in quartz, porcelain, and stone slab
                installations, partnering with top brands like Cambria,
                Caesarstone, Silestone, Vadara Quartz, and LG Viatera Quartz.
              </p>
              <p className='text-gray-700'>
                Our mission is to deliver high-quality, durable surfaces that
                enhance your home or business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Content/Blog Teaser */}
      <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Latest Insights
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <Image
                src='https://source.unsplash.com/random/300x200/?kitchen'
                alt='Blog 1'
                width={300}
                height={200}
                className='mb-4'
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
                className='mb-4'
              />
              <h3 className='text-xl font-semibold mb-2'>
                Porcelain vs. Quartz
              </h3>
              <Link
                href='/blog/porcelain-vs-quartz'
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
                className='mb-4'
              />
              <h3 className='text-xl font-semibold mb-2'>
                Stone Maintenance Tips
              </h3>
              <Link
                href='/blog/stone-maintenance'
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
          <h2 className='text-3xl font-bold mb-4'>
            Ready to Upgrade Your Countertops?
          </h2>
          <p className='text-xl mb-8'>
            Contact us today for a free consultation.
          </p>
          <Link
            href='/quote'
            className='bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100'
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
              <h4 className='font-bold mb-4'>QuartzCo</h4>
              <p>Specializing in premium slab installations.</p>
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
              <p>Email: info@quartzco.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h4 className='font-bold mb-4'>Follow Us</h4>
              {/* Social icons would go here */}
              <p>Social links</p>
            </div>
          </div>
          <div className='mt-8 text-center'>
            <p>&copy; 2025 QuartzCo. All rights reserved.</p>
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
