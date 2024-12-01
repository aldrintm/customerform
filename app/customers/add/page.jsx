import addCustomer from '@/app/actions/addCustomer'
import NewCustomerForm from '@/components/CustomerForm'
import Header from '@/components/Header'

const AddCustomer = () => {
  return (
    <section>
      <Header />
      <NewCustomerForm />
    </section>
  )
}
export default AddCustomer
