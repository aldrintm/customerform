'use client'

import React, { useState, useEffect } from 'react'
import {
  ChevronRight,
  Play,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
  Users,
  Award,
  Shield,
  Hammer,
  Home,
  Clock,
} from 'lucide-react'

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animatedNumbers, setAnimatedNumbers] = useState({
    years: 0,
    projects: 0,
    satisfaction: 0,
  })
  const [expandedFaq, setExpandedFaq] = useState(null)

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedNumbers({ years: 35, projects: 5000, satisfaction: 98 })
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-100 fixed w-full z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>P</span>
              </div>
              <div className='ml-3'>
                <div className='text-xl font-bold text-gray-900'>
                  Plamar USA
                </div>
                <div className='text-xs text-gray-600'>Since 1989</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center space-x-8'>
              <a
                href='#'
                className='text-gray-700 hover:text-amber-600 font-medium transition-colors'
              >
                Quartz
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-amber-600 font-medium transition-colors'
              >
                Granite
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-amber-600 font-medium transition-colors'
              >
                Services
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-amber-600 font-medium transition-colors'
              >
                Gallery
              </a>
              <a
                href='#'
                className='text-gray-700 hover:text-amber-600 font-medium transition-colors'
              >
                About
              </a>
              <button className='bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'>
                Get a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden bg-white border-t border-gray-100'>
            <div className='px-4 py-2 space-y-4'>
              <a href='#' className='block text-gray-700 font-medium py-2'>
                Quartz
              </a>
              <a href='#' className='block text-gray-700 font-medium py-2'>
                Granite
              </a>
              <a href='#' className='block text-gray-700 font-medium py-2'>
                Services
              </a>
              <a href='#' className='block text-gray-700 font-medium py-2'>
                Gallery
              </a>
              <a href='#' className='block text-gray-700 font-medium py-2'>
                About
              </a>
              <button className='w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold'>
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className='pt-20 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-gray-50 via-white to-amber-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div className='order-2 lg:order-1'>
              <div className='inline-flex items-center bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6'>
                <Star className='w-4 h-4 mr-2' />
                Northern California's Premier Fabricator Since 1989
              </div>

              <h1 className='text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                Custom Quartz & Granite
                <span className='bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent'>
                  {' '}
                  Countertops
                </span>
              </h1>

              <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
                Transform your kitchen with premium quartz and granite
                countertops. Full-service fabrication and installation by Bay
                Area craftsmen with over 35 years of expertise.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                <button className='group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center'>
                  Get a Quote
                  <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
                </button>
                <button className='group flex items-center justify-center px-8 py-4 text-gray-700 font-semibold text-lg hover:text-amber-600 transition-colors'>
                  <Play className='mr-2 w-5 h-5 text-amber-600' />
                  View Gallery
                </button>
              </div>

              <div className='flex items-center gap-6 text-sm text-gray-500'>
                <div className='flex items-center'>
                  <Check className='w-4 h-4 text-green-500 mr-2' />
                  Free estimates
                </div>
                <div className='flex items-center'>
                  <Check className='w-4 h-4 text-green-500 mr-2' />
                  In-stock slabs
                </div>
                <div className='flex items-center'>
                  <Check className='w-4 h-4 text-green-500 mr-2' />
                  Full service shop
                </div>
              </div>
            </div>

            <div className='order-1 lg:order-2'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur-3xl opacity-20'></div>
                <div className='relative bg-white p-8 rounded-2xl shadow-2xl border border-gray-100'>
                  <div className='w-full h-64 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden'>
                    {/* Marble texture pattern */}
                    <div className='absolute inset-0 opacity-30'>
                      <div className='w-full h-full bg-gradient-to-br from-gray-200 via-white to-gray-300'></div>
                      <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100 to-transparent'></div>
                    </div>
                    <div className='text-center relative z-10'>
                      <div className='w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center'>
                        <Home className='w-8 h-8 text-white' />
                      </div>
                      <p className='text-gray-600 font-medium'>
                        Premium Countertops
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-2xl font-bold text-gray-900'>
                      {animatedNumbers.years}+ Years
                    </div>
                    <div className='text-amber-600 text-sm font-medium'>
                      Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8'>
            <p className='text-gray-600 mb-6'>
              Serving the entire Bay Area with premium stone fabrication
            </p>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60'>
              {[
                'San Francisco',
                'San Jose',
                'Los Altos',
                'Fremont',
                'Santa Cruz',
                'Salinas'
              ].map((city) => (
                <div key={city} className='text-center'>
                  <div className='h-8 flex items-center justify-center'>
                    <span className='text-gray-600 font-medium text-sm'>
                      {city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-8 text-center'>
            <div className='p-6'>
              <div className='text-4xl font-bold text-amber-600 mb-2'>
                {animatedNumbers.years}+
              </div>
              <p className='text-gray-600'>Years in Business</p>
            </div>
            <div className='p-6'>
              <div className='text-4xl font-bold text-orange-600 mb-2'>
                {animatedNumbers.projects.toLocaleString()}+
              </div>
              <p className='text-gray-600'>Projects Completed</p>
            </div>
            <div className='p-6'>
              <div className='text-4xl font-bold text-green-600 mb-2'>
                {animatedNumbers.satisfaction}%
              </div>
              <p className='text-gray-600'>Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Why Choose Plamar USA for Your Countertops?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              As Northern California's premier fabricator and installer, we
              provide complete countertop solutions that other companies simply
              can't match.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Clock className='w-8 h-8 text-amber-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                In-Stock Slab Materials
              </h3>
              <p className='text-gray-600'>
                Our extensive in-stock quartz selection offers faster project
                completion, wider options, reduced costs, and superior quality
                control for your renovation.
              </p>
            </div>

            <div className='text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Award className='w-8 h-8 text-orange-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                High-End Fabrication
              </h3>
              <p className='text-gray-600'>
                State-of-the-art machinery ensures unmatched precision cuts,
                fabrication speed, product quality, consistency, and durability
                for your countertops.
              </p>
            </div>

            <div className='text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Hammer className='w-8 h-8 text-green-600' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                True Craftsmanship Installation
              </h3>
              <p className='text-gray-600'>
                Experienced installers bring expertise, attention to detail,
                problem-solving skills, and unwavering commitment to quality
                workmanship on every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='space-y-20'>
            {/* Service 1 */}
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h3 className='text-3xl font-bold text-gray-900 mb-6'>
                  Kitchen Countertops
                </h3>
                <ul className='space-y-4 mb-6'>
                  <li className='flex items-start'>
                    <Check className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>
                      Premium quartz and granite slab materials
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <Check className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>
                      Custom fabrication to match your kitchen design
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <Check className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>
                      Professional installation by experienced craftsmen
                    </span>
                  </li>
                </ul>
                <button className='text-amber-600 font-semibold flex items-center group'>
                  View Kitchen Gallery
                  <ChevronRight className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
              <div className='bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl'>
                <div className='w-full h-64 bg-white rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200'></div>
                  <div className='absolute inset-0 bg-gradient-to-tr from-amber-100/30 to-orange-100/30'></div>
                  <div className='text-center relative z-10'>
                    <Home className='w-16 h-16 text-amber-600 mx-auto mb-4' />
                    <p className='text-gray-600'>Kitchen Countertops</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div className='order-2 lg:order-1 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl'>
                <div className='w-full h-64 bg-white rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200'></div>
                  <div className='absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-indigo-100/30'></div>
                  <div className='text-center relative z-10'>
                    <Shield className='w-16 h-16 text-blue-600 mx-auto mb-4' />
                    <p className='text-gray-600'>Complete Services</p>
                  </div>
                </div>
              </div>
              <div className='order-1 lg:order-2'>
                <h3 className='text-3xl font-bold text-gray-900 mb-6'>
                  Full Service Solutions
                </h3>
                <ul className='space-y-4 mb-6'>
                  <li className='flex items-start'>
                    <Check className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>
                      Bath vanities and shower walls
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <Check className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>
                      Fireplaces and outdoor BBQ counters
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <Check className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-600'>
                      Stairs and flooring applications
                    </span>
                  </li>
                </ul>
                <button className='text-blue-600 font-semibold flex items-center group'>
                  See All Services
                  <ChevronRight className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Our 3-Step Process
            </h2>
            <p className='text-xl text-gray-600'>
              From consultation to installation - we handle everything
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 relative'>
            {/* Connecting line */}
            <div className='hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600'></div>

            <div className='text-center relative'>
              <div className='w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative z-10'>
                01
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                In-Stock Slab Materials
              </h3>
              <p className='text-gray-600'>
                Our in-stock quartz slab selection offers the ultimate
                convenience, providing customers with faster project completion,
                a wider range of options, reduced costs, and improved quality
                control. Take advantage of these benefits and enjoy your
                renovation sooner.
              </p>
            </div>

            <div className='text-center relative'>
              <div className='w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative z-10'>
                02
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                High-End Fabrication
              </h3>
              <p className='text-gray-600'>
                Our utilization of state-of-the-art machinery sets us apart and
                ensures that you receive a product that is unmatched in
                precision cuts, speed of fabrication, product quality,
                consistency, and durability. Your satisfaction is guaranteed
                through our commitment to utilizing only the best technology.
              </p>
            </div>

            <div className='text-center relative'>
              <div className='w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 relative z-10'>
                03
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                True Craftsmanship in Installation
              </h3>
              <p className='text-gray-600'>
                Discover the difference of having a truly experienced installer
                for your kitchen quartz and stone countertop installation. Our
                team of experts bring their expertise, attention to detail,
                problem-solving skills, effective time management, and
                unwavering commitment to quality workmanship to every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              What Our Bay Area Customers Say
            </h2>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-8 rounded-xl'>
              <div className='flex mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <p className='text-gray-700 mb-6'>
                "Plamar USA transformed our kitchen with beautiful quartz
                countertops. The craftsmanship is exceptional and the
                installation was flawless. Highly recommend their expertise!"
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  S
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>Sarah Martinez</p>
                  <p className='text-gray-600 text-sm'>San Jose Homeowner</p>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-8 rounded-xl'>
              <div className='flex mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <p className='text-gray-700 mb-6'>
                "35 years of experience really shows. Professional service from
                start to finish, beautiful granite countertops, and completed on
                schedule. Thank you Plamar!"
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  M
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>Mike Chen</p>
                  <p className='text-gray-600 text-sm'>Fremont Homeowner</p>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-8 rounded-xl'>
              <div className='flex mb-4'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <p className='text-gray-700 mb-6'>
                "Outstanding quality and service! They helped us choose the
                perfect quartz for our bathroom vanity. The installation team
                was professional and cleaned up perfectly."
              </p>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  L
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>Lisa Thompson</p>
                  <p className='text-gray-600 text-sm'>Palo Alto Homeowner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className='py-20 bg-gradient-to-r from-amber-600 to-orange-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
          <h2 className='text-3xl lg:text-4xl font-bold mb-6'>
            Ready for Your Dream Countertops?
          </h2>
          <p className='text-xl mb-8 opacity-90'>
            Join thousands of satisfied Bay Area homeowners who trust Plamar USA
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
            <button className='bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center'>
              Get a Quote
              <ArrowRight className='ml-2 w-5 h-5' />
            </button>
            <button className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300'>
              Visit Showroom
            </button>
          </div>

          <div className='flex justify-center items-center gap-8 text-sm opacity-80'>
            <div className='flex items-center'>
              <Check className='w-4 h-4 mr-2' />
              Free estimates
            </div>
            <div className='flex items-center'>
              <Check className='w-4 h-4 mr-2' />
              Licensed & insured
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
              Frequently Asked Questions
            </h2>
          </div>

          <div className='space-y-4'>
            {[
              {
                question:
                  'How long does a typical countertop installation take?',
                answer:
                  'Most installations are completed in 1-2 days, depending on the size and complexity of your project. We provide a detailed timeline during your consultation.',
              },
              {
                question: 'Do you offer free estimates?',
                answer:
                  'Yes! We provide free, no-obligation estimates for all countertop projects. Our team will visit your home to measure and discuss your options.',
              },
              {
                question: 'What materials do you work with?',
                answer:
                  'We specialize in premium quartz and granite slabs for kitchen countertops, bath vanities, shower walls, fireplaces, outdoor BBQ counters, stairs, and flooring applications.',
              },
              {
                question: 'Are you licensed and insured?',
                answer:
                  'Absolutely. Plamar USA is fully licensed and insured with over 35 years of experience serving the Bay Area. Your project is protected from start to finish.',
              },
              {
                question: 'Do you have slabs in stock?',
                answer:
                  'Yes! Our extensive in-stock slab selection allows for faster project completion and gives you a wider range of options to choose from.',
              },
            ].map((faq, index) => (
              <div key={index} className='bg-white rounded-lg shadow-sm'>
                <button
                  className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors'
                  onClick={() => toggleFaq(index)}
                >
                  <span className='font-semibold text-gray-900'>
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className='px-6 pb-4'>
                    <p className='text-gray-600'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='text-center mt-12'>
            <p className='text-gray-600 mb-4'>Have more questions?</p>
            <button className='text-amber-600 font-semibold hover:text-amber-700 transition-colors'>
              Contact us today →
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-6'>
            Transform Your Home with Premium Countertops
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Experience the Plamar USA difference - 35+ years of craftsmanship
            and quality
          </p>

          <button className='bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto'>
            Get a Quote
            <ArrowRight className='ml-2 w-5 h-5' />
          </button>

          <div className='flex justify-center items-center gap-6 mt-8 text-sm text-gray-500'>
            <div className='flex items-center'>
              <Shield className='w-4 h-4 mr-2' />
              Licensed & Insured
            </div>
            <div className='flex items-center'>
              <Users className='w-4 h-4 mr-2' />
              5000+ Projects
            </div>
            <div className='flex items-center'>
              <Star className='w-4 h-4 mr-2' />
              Since 1989
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8 mb-8'>
            <div>
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>P</span>
                </div>
                <div className='ml-3'>
                  <div className='text-xl font-bold'>Plamar USA</div>
                  <div className='text-xs text-gray-400'>Since 1989</div>
                </div>
              </div>
              <p className='text-gray-400 mb-4'>
                Northern California's premier custom fabricator and installer of
                granite and quartz countertops.
              </p>
              <div className='flex space-x-4'>
                <div className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-sm hover:bg-amber-600 transition-colors cursor-pointer'>
                  f
                </div>
                <div className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-sm hover:bg-amber-600 transition-colors cursor-pointer'>
                  ig
                </div>
                <div className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-sm hover:bg-amber-600 transition-colors cursor-pointer'>
                  yt
                </div>
              </div>
            </div>

            <div>
              <h4 className='font-semibold mb-4'>Services</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Kitchen Countertops
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Bath Vanities
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Shower Walls
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Outdoor Counters
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold mb-4'>Materials</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Quartz Slabs
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Granite Slabs
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Natural Stone
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Engineered Stone
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-semibold mb-4'>Contact</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>Bay Area, California</li>
                <li>
                  <a href='tel:' className='hover:text-white transition-colors'>
                    (555) 123-4567
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:'
                    className='hover:text-white transition-colors'
                  >
                    info@plamarusa.com
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white transition-colors'>
                    Free Estimate
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-800 pt-8'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <p className='text-gray-400 text-sm mb-4 md:mb-0'>
                © 2025 Plamar USA Inc. All rights reserved. Licensed & Insured.
              </p>
              <div className='flex space-x-6 text-sm text-gray-400'>
                <a href='#' className='hover:text-white transition-colors'>
                  Privacy Policy
                </a>
                <a href='#' className='hover:text-white transition-colors'>
                  Terms of Service
                </a>
                <a href='#' className='hover:text-white transition-colors'>
                  Licensing
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage
