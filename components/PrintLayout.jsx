'use client'

const PrintLayout = ({ customer, schedules }) => {
  return (
    <div className='print-only hidden print:block'>
      {/* Company Header */}
      <div className='text-center mb-8'>
        <h1 className='text-2xl font-bold'>Plamar USA</h1>
        <p>33100 Transit Ave., Union City Ca 94587</p>
        <p>Main: (510) 475 2650</p>
        <p>Web: www.plamarusa.com</p>
      </div>

      {/* Customer Info */}
      <div className='border-b pb-4 mb-4'>
        <h2 className='text-xl font-semibold mb-2'>Customer Information</h2>
        <div className='grid grid-cols-2'>
          <div>
            <p>
              Name: {customer.firstName} {customer.lastName}
            </p>
            <p>Phone: {customer.phone}</p>
            <p>Email: {customer.email}</p>
          </div>
          <div>
            <p>Address: {customer.address.street}</p>
            <p>
              {customer.address.city}, {customer.address.state}{' '}
              {customer.address.zipcode}
            </p>
            <p>Contractor: {customer.contractorName}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      {customer.projects?.map((project, index) => (
        <div key={index} className='mb-6'>
          <h2 className='text-xl font-semibold mb-2'>Project Details</h2>
          <div className='grid grid-cols-2 gap-4'>
            <p>
              <strong>Material:</strong> {project.materialType}{' '}
              {project.materialColor}
            </p>
            <p>
              <strong>Edge:</strong> {project.edge}
            </p>
            <p>
              <strong>Sink:</strong> {project.sinkType}
            </p>
            <p>
              <strong>Splash:</strong> {project.splash}
            </p>
          </div>
        </div>
      ))}

      {/* Schedule Information */}
      {schedules?.map((schedule, index) => (
        <div key={index} className='mb-6'>
          <h3 className='font-semibold mb-2'>Schedule Information</h3>
          <div className='grid grid-cols-2 gap-4'>
            <p>
              <strong>Template Date:</strong> {schedule.measureDate}
            </p>
            <p>
              <strong>Install Date:</strong> {schedule.installDate}
            </p>
            <p>
              <strong>Template By:</strong> {schedule.measureBy}
            </p>
            <p>
              <strong>Install By:</strong> {schedule.installBy}
            </p>
          </div>
        </div>
      ))}

      {/* Signature Section */}
      <div className='mt-12 pt-8 border-t'>
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <p className='border-t border-black mt-8 pt-2'>
              Customer Signature
            </p>
          </div>
          <div>
            <p className='border-t border-black mt-8 pt-2'>Date</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintLayout
