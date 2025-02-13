import connectDB from '@/config/db'
import Customer from '@/models/Customer'
import Project from '@/models/Project'

import { convertToSerializeableObject } from '@/utils/convertToObject'
import PrintWindow from '@/components/PrintWindow'

export default async function PrintCustomerPage({ params }) {
  const { id } = params
  await connectDB()

  // Fetch the customer document
  const customerDoc = await Customer.findById(id).lean()
  const customer = convertToSerializeableObject(customerDoc)

  // Fetch projects for this customer (if there could be more than one, use .find())
  const projectDocs = await Project.find({ customer: id }).lean()
  const projects = projectDocs.map(convertToSerializeableObject)

  return (
    <div className='print-page'>
      {/* Optionally include your header or sidebar if desired */}

      <PrintWindow>
        <div
          className='print-content'
          style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}
        >
          <h1>Customer Printout</h1>
          <h2>Customer Information</h2>
          <p>
            <strong>First Name:</strong> {customer.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {customer.lastName}
          </p>
          <p>
            <strong>Address:</strong> {customer.address.street},{' '}
            {customer.address.city}, {customer.address.state}{' '}
            {customer.address.zipcode}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <p>
            <strong>Contractor:</strong> {customer.contractorName} (
            {customer.contractorPhone})
          </p>
          <hr />
          <h2>Project Information</h2>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} style={{ marginBottom: '1rem' }}>
                <p>
                  <strong>Description:</strong> {project.description}
                </p>
                <p>
                  <strong>Customer Type:</strong> {project.customerType}
                </p>
                <p>
                  <strong>Material Thickness:</strong>{' '}
                  {project.materialThickness}
                </p>
                <p>
                  <strong>Material Color:</strong> {project.materialColor}
                </p>
                <p>
                  <strong>Material Brand:</strong> {project.materialBrand}
                </p>
                <p>
                  <strong>Splash:</strong> {project.splash}
                </p>
                {/* Add any other fields you want printed */}
                <hr />
              </div>
            ))
          ) : (
            <p>No project data available.</p>
          )}
        </div>
      </PrintWindow>
    </div>
  )
}
