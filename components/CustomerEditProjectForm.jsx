import updateProject from '@/app/actions/updateProject'
import customerWithCapitalizedNames from '@/app/actions/customerWithCapitalizedNames'
import Link from 'next/link'

const CustomerEditProjectForm = ({ customer }) => {
  const project = customer.projects[0]
  const updateProjectById = updateProject.bind(null, customer._id, project._id)

  const formattedDates = project?.purchaseOrders?.map((po) => {
    if (!po.purchaseOrderDate) return ''
    const date = new Date(po.purchaseOrderDate)
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0]
  })

  const formattedDate1 = formattedDates[0] || ''
  const formattedDate2 = formattedDates[1] || ''
  const formattedDate3 = formattedDates[2] || ''

  const singlePo = project?.purchaseOrders?.map((po) => po.purchaseOrderNumber)
  const singlePo1 = singlePo[0] || ''
  const singlePo2 = singlePo[1] || ''
  const singlePo3 = singlePo[2] || ''

  const squareFeet = project?.purchaseOrders?.map((po) => po.squareFeet)
  const sqft1 = squareFeet[0] || ''
  const sqft2 = squareFeet[1] || ''
  const sqft3 = squareFeet[2] || ''

  const poAmount = project?.purchaseOrders?.map((po) => po.purchaseOrderAmount)
  const poAmount1 = poAmount[0] || ''
  const poAmount2 = poAmount[1] || ''
  const poAmount3 = poAmount[2] || ''

  console.log('Project ID:', project._id)
  console.log('Customer ID:', customer._id)

  return (
    <section className='bg-white'>
      <div className='container max-w-5xl mx-auto px-15 md:rounded-2xl'>
        <div className='mx-auto text-left py-2 pl-1 text-sm md:text-md text-blue-500 font-bold'>
          Editing Project Form for{' '}
          {customerWithCapitalizedNames(customer.firstName)}{' '}
          {customerWithCapitalizedNames(customer.lastName)}
        </div>

        <div className='isolate px-4 sm:pb-2 lg:px-0'>
          {/* Form Starts Here */}
          <form
            action={updateProjectById}
            className='container mx-auto my-4 justify-center'
          >
            <div className='grid grid-cols-1 gap-4 lg:gap-6 pb-2'>
              {/* Break */}

              {/* Form */}
              <div className='grid grid-cols-1 gap-4 lg:grid-rows-auto lg:gap-4 bg-white p-4 md:border md:rounded-md border-gray-300'>
                {/* Extracting customer._id and project._id as Hidden Inputs */}
                <input type='hidden' name='customerId' value={customer._id} />
                <input type='hidden' name='projectId' value={project._id} />
                {/* Purchase Order + Store ID */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 py-2 lg:gap-x-6'>
                  {/* Customer Type */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='storeName'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Customer Type:
                    </label>

                    <select
                      name='storeName'
                      id='storeName'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project.customerType}
                    >
                      <option value='DEFAULT' disabled>
                        Choose ...
                      </option>
                      <option value='Home Depot'>Home Depot</option>
                      <option value='HDI'>HDI</option>
                      <option value='HD Pro'>HD Pro</option>
                      <option value='Direct'>Direct</option>
                      <option value='Builder'>Builders</option>
                      <option value='Kitchen + Bath'>Kitchen and Bath</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>
                  {/* Store ID */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='storeId'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Store ID:
                    </label>

                    <input
                      type='text'
                      id='storeId'
                      name='storeId'
                      placeholder='Store Id'
                      defaultValue={project.storeId}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Project Status */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='status'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Project Status:
                    </label>

                    <select
                      name='status'
                      id='status'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm text-gray-500 bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project.status}
                    >
                      <option value=''>Choose ...</option>
                      <option value='will call'>will call</option>
                      <option value='for template'>for template</option>
                      <option value='material order'>material order</option>
                      <option value='need additional'>need additional</option>
                      <option value='seam diagram'>seam diagram</option>
                      <option value='in fabrication'>in fabrication</option>
                      <option value='hold'>hold</option>
                      <option value='for install'>for install</option>
                      <option value='completed'>completed</option>
                      <option value='service'>service</option>
                    </select>
                  </div>
                </div>

                {/* PO Numbers, PO Date, PO Cost etc */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 pt-2 lg:gap-x-6'>
                  {/* Purchase Order 1 */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='purchaseOrderNumber'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase Order No:
                    </label>

                    <input
                      type='text'
                      id='purchaseOrderNumber1'
                      name='purchaseOrderNumber1'
                      placeholder='Purchase Order #'
                      defaultValue={singlePo1}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Purchase Order Date */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='purchaseOrderDate'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Date paid:
                    </label>

                    <input
                      type='date'
                      id='purchaseOrderDate1'
                      name='purchaseOrderDate1'
                      placeholder='Purchase order date'
                      defaultValue={formattedDate1}
                      className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* {project?.purchaseOrders?.map((po, index) => {
                    const formattedDate = new Date(po.purchaseOrderDate)
                      .toISOString()
                      .split('T')[0] // "yyyy-MM-dd"
                    return (
                      <div key={index}>
                        <label htmlFor={`purchaseOrderDate-${index}`}>
                          Purchase Order Date {index + 1}:
                        </label>
                        <input
                          type='date'
                          id={`purchaseOrderDate-${index}`}
                          name={`purchaseOrderDate-${index}`}
                          defaultValue={formattedDate}
                          className='mt-1 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                        />
                      </div>
                    )
                  })} */}
                  {/* Square Feet */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='squareFeet'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Paid sq ft.
                    </label>

                    <input
                      type='number'
                      id='squareFeet1'
                      name='squareFeet1'
                      placeholder='How many sqft?'
                      defaultValue={sqft1}
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Purchase Order Amount */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='purchaseOrderAmount'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Purchase amount
                    </label>

                    <input
                      type='number'
                      name='purchaseOrderAmount1'
                      id='purchaseOrderAmount1'
                      placeholder='0.00'
                      min='0'
                      step='0.01'
                      defaultValue={poAmount1}
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                    />
                  </div>
                </div>

                {/* Repeat --- PO Numbers, PO Date, PO Cost etc */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 py-0 lg:gap-x-6'>
                  {/* Purchase Order */}
                  <div className='col-span-3'>
                    <input
                      type='text'
                      id='purchaseOrderNumber2'
                      name='purchaseOrderNumber2'
                      placeholder='Purchase Order #'
                      defaultValue={singlePo2}
                      className='mt-0 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Purchase Order Date */}
                  <div className='col-span-3'>
                    <input
                      type='date'
                      id='purchaseOrderDate2'
                      name='purchaseOrderDate2'
                      placeholder='Purchase order date'
                      defaultValue={formattedDate2}
                      className='mt-0 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Square Feet */}
                  <div className='col-span-3'>
                    <input
                      type='number'
                      id='squareFeet2'
                      name='squareFeet2'
                      placeholder='How many sqft?'
                      defaultValue={sqft2}
                      className='mt-0 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Purchase Order Amount */}
                  <div className='col-span-3'>
                    <input
                      type='number'
                      name='purchaseOrderAmount2'
                      id='purchaseOrderAmount2'
                      placeholder='0.00'
                      min='0'
                      step='0.01'
                      defaultValue={poAmount2}
                      className='mt-0 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                    />
                  </div>
                </div>

                {/* Repeat --- PO Numbers, PO Date, PO Cost etc */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 py-0 lg:gap-x-6'>
                  {/* Purchase Order */}
                  <div className='col-span-3'>
                    <input
                      type='text'
                      id='purchaseOrderNumber3'
                      name='purchaseOrderNumber3'
                      placeholder='Purchase Order #'
                      defaultValue={singlePo3}
                      className='mt-0 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Purchase Order Date */}
                  <div className='col-span-3'>
                    <input
                      type='date'
                      id='purchaseOrderDate3'
                      name='purchaseOrderDate3'
                      placeholder='Purchase order date'
                      defaultValue={formattedDate3}
                      className='mt-0 w-full rounded-md border-gray-200 text-gray-500 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Square Feet */}
                  <div className='col-span-3'>
                    <input
                      type='number'
                      id='squareFeet3'
                      name='squareFeet3'
                      placeholder='How many sqft?'
                      defaultValue={sqft3}
                      className='mt-0 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                  {/* Purchase Order Amount */}
                  <div className='col-span-3'>
                    <input
                      type='number'
                      name='purchaseOrderAmount3'
                      id='purchaseOrderAmount3'
                      placeholder='0.00'
                      min='0'
                      step='0.01'
                      defaultValue={poAmount3}
                      className='mt-0 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                    />
                  </div>
                </div>
                {/* Project Info - Description */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 md:pt-2 px-4 py-0 lg:gap-x-6'>
                  {/* Description */}
                  <div className='col-span-6'>
                    <label
                      htmlFor='description'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Description:
                    </label>

                    <input
                      type='text'
                      id='description'
                      name='description'
                      placeholder='What is this project for?'
                      defaultValue={project?.description || ''}
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>
                </div>

                {/* Project Info Material Brand + Thickness + Color */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-12 px-4 py-2 lg:gap-x-6'>
                  {/* Material Type */}
                  <div className='lg:col-span-2'>
                    <label
                      htmlFor='materialType'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Type
                    </label>

                    <select
                      id='materialType'
                      name='materialType'
                      defaultValue={project?.materialType || ''}
                      className='mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-sky-50'
                    >
                      <option value=' '></option>
                      <option value='Quartz'>Quartz</option>
                      <option value='Granite'>Granite</option>
                      <option value='SolidSurface'>Solid Surface</option>
                      <option value='Porcelain'>Porcelain</option>
                      <option value='Marble'>Marble</option>
                      <option value='Limestone'>Limestone</option>
                      <option value='Travertine'>Travertine</option>
                      <option value='PreFab'>PreFab</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Material Thickness */}
                  <div className='lg:col-span-2'>
                    <label
                      htmlFor='materialThickness'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Thickness
                    </label>

                    <select
                      name='materialThickness'
                      id='materialThickness'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project?.materialThickness || ''}
                    >
                      <option value=' '></option>
                      <option value='2cm'>2cm</option>
                      <option value='3cm'>3cm</option>
                      <option value='.5inch'>1/2"</option>
                      <option value='1cm'>1cm</option>
                      <option value='12mm'>12mm</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Material Brand */}
                  <div className='lg:col-span-3'>
                    <label
                      htmlFor='materialBrand'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Brand
                    </label>

                    <select
                      name='materialBrand'
                      id='materialBrand'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project?.materialBrand || ''}
                    >
                      <option value=' '></option>
                      <option value='Plamar Stock'>Plamar Stock</option>
                      <option value='Daltile'>Daltile</option>
                      <option value='Dellaterra'>Arizona Tile</option>
                      <option value='MSI'>MSI</option>
                      <option value='Cambria'>Cambria</option>
                      <option value='Caesarstone'>Caesarstone</option>
                      <option value='Viatera'>LG Viatera</option>
                      <option value='Silestone'>Silestone</option>
                      <option value='Vadara'>Vadara</option>
                      <option value='Corianquartz'>Corian Quartz</option>
                      <option value='Wilsonartquartz'>Wilsonart Quartz</option>
                      <option value='Wilsonart'>Wilsonart Solid Surface</option>
                      <option value='Corian'>Corian Solid Surface</option>
                      <option value='Hi-macs'>LG Hi-Macs</option>
                      <option value='Neolith'>Neolith</option>
                      <option value='Dekton'>Dekton</option>
                      <option value='Hanstone'>Hanstone</option>
                      <option value='Level'>Level Porcelain</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  {/* Material Name */}
                  <div className='lg:col-span-3'>
                    <label
                      htmlFor='materialColor'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Color
                    </label>

                    <input
                      type='text'
                      id='materialColor'
                      name='materialColor'
                      placeholder='Color name'
                      defaultValue={project?.materialColor || ''}
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                    />
                  </div>

                  {/* Material Surface Finish */}
                  <div className='lg:col-span-2'>
                    <label
                      htmlFor='materialColor'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Finish
                    </label>

                    <select
                      name='materialFinish'
                      id='materialFinish'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project?.materialFinish || ''}
                    >
                      <option value=''></option>
                      <option value='Polished'>Polished</option>
                      <option value='Honed'>Honed</option>
                      <option value='Matte'>Matte</option>
                      <option value='Suede'>Suede</option>
                      <option value='Leather'>Leather</option>
                      <option value='Concrete'>Concrete</option>
                      <option value='Rough'>Rough</option>
                      <option value='Ultra Rough'>Ultra Rough</option>
                      <option value='Natural'>Natural</option>
                      <option value='Satin'>Satin</option>
                      <option value='Silk'>Silk</option>
                      <option value='Decor'>Decor</option>
                      <option value='UltraSoft'>UltraSoft</option>
                      <option value='Luxe'>Luxe</option>
                      <option value='XGloss'>XGloss</option>
                    </select>
                  </div>
                </div>

                {/* Edges + Sink Info */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 py-2 lg:gap-x-6'>
                  {/* Edge Input */}
                  <div className='col-span-4'>
                    <label
                      htmlFor='purchaseOrderNumber'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Edges:
                    </label>

                    <input
                      type='text'
                      id='edge'
                      name='edge'
                      placeholder='Edge'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                      defaultValue={project?.edge || ''}
                    />
                  </div>
                  {/* Sink */}
                  <div className='col-span-2'>
                    <label
                      htmlFor='sinkType'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Sink Type:
                    </label>

                    <select
                      name='sinkType'
                      id='sinkType'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project?.sinkType || ''}
                    >
                      <option value=' '></option>
                      <option value='Undermount'>Undermount</option>
                      <option value='Topmount'>Topmount</option>
                      <option value='Farm'>Farm/Apron</option>
                      <option value='Vessel'>Vessel</option>
                      <option value='Integrated'>Integrated</option>
                    </select>
                  </div>
                  <div className='col-span-1'>
                    <label
                      htmlFor='sinkQuantity'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Qty:
                    </label>

                    <select
                      name='sinkQuantity'
                      id='sinkQuantity'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project?.sinkQuantity || ''}
                    >
                      <option value='0'> </option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='sinkLocation'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Location:
                    </label>

                    <select
                      name='sinkLocation'
                      id='sinkLocation'
                      className='mt-1 w-full rounded-md shadow-sm sm:text-sm bg-sky-50 border-gray-200 focus-bg-white'
                      defaultValue={project?.sinkLocation || ' '}
                    >
                      <option value=' '></option>
                      <option value='@ House'>House</option>
                      <option value='@ Shop'>Shop</option>
                    </select>
                  </div>
                  {/* Sink Info */}
                  <div className='col-span-3'>
                    <label
                      htmlFor='sinkInfo'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Sink Info/Model:
                    </label>

                    <input
                      type='text'
                      id='sinkInfo'
                      name='sinkInfo'
                      placeholder='Sink Model'
                      className='mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm bg-sky-50'
                      defaultValue={project?.sinkInfo || ''}
                    />
                  </div>
                </div>

                {/* Splash, Stove and Other Info */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-12 px-4 pt-2 lg:gap-x-6'>
                  {/* Splash Info */}
                  <div className='col-span-6'>
                    <label
                      htmlFor='splash'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      Splash Info:
                    </label>

                    <input
                      type='text'
                      id='splash'
                      name='splash'
                      placeholder='Enter all splashes info here'
                      className='block mt-1 w-full rounded-md border-gray-200 focus-bg-white shadow-sm sm:text-sm bg-sky-50'
                      defaultValue={project?.splash || ''}
                    />
                  </div>
                  {/* Checkbox Container */}
                  <div className='col-span-6 flex items-center'>
                    {/* Slide-in Range Checkbox */}
                    <div className='flex items-center mr-4'>
                      <label
                        htmlFor='stove'
                        className='inline-flex items-center text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        <input
                          type='checkbox'
                          id='stove'
                          name='stove'
                          className='rounded border-gray-200 shadow-sm bg-sky-50 text-blue-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50'
                          defaultChecked={project?.stove || false}
                        />
                        <span className='ml-2 items-center'>
                          Slide-in Range
                        </span>
                      </label>
                    </div>

                    {/* Cooktop Checkbox */}
                    <div className='flex items-center'>
                      <label
                        htmlFor='cooktop'
                        className='inline-flex items-center text-xs md:text-sm pl-1 font-semibold text-gray-500'
                      >
                        <input
                          type='checkbox'
                          id='cooktop'
                          name='cooktop'
                          className='rounded border-gray-200 shadow-sm bg-sky-50 text-blue-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50'
                          defaultChecked={project?.cooktop || false}
                        />
                        <span className='ml-2 items-center'>Cooktop</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Textarea for Notes */}
                <div className='grid grid-cols-1 lg:grid-cols-1 px-4 py-2'>
                  {/* Text Area for Special Notes with Customer */}
                  <div className=''>
                    <label
                      htmlFor='notes'
                      className='block text-xs md:text-sm pl-1 font-semibold text-gray-500'
                    >
                      {' '}
                      Special Notes{' '}
                    </label>

                    <textarea
                      id='notes'
                      name='notes'
                      rows='3'
                      className='mt-1 w-full rounded-md py-4 border-gray-200 shadow-sm sm:text-sm'
                      placeholder='Enter any additional order notes...'
                      defaultValue={project?.notes || ''}
                    ></textarea>
                  </div>
                  {/* col-span-2 */}
                  <div className='lg:col-span-2 content-end py-4'>
                    <span>
                      <button
                        className='w-full items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-8 py-2 text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
                        type='submit'
                      >
                        Submit
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Break */}
            {/* Break */}
            {/* Break */}
          </form>
        </div>
      </div>
    </section>
  )
}
export default CustomerEditProjectForm
