const CustomerPage = async ({ params }) => {
  return (
    <div className='containter mx-auto'>
      <p>
        This is the page for a customer detail page with customer ID @{' '}
        {params.id}
      </p>
    </div>
  )
}

export default CustomerPage
