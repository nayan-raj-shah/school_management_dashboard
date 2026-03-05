import { redirect } from "next/navigation"


const Homepage = () => {
  redirect('/admin')
  return (
    <div className=''>Homepage</div>
  )
}

export default Homepage