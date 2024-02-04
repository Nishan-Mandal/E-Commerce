import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'
import { Link } from 'react-router-dom'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ?
        (<>
          <div className="h-full pt-10 flex flex-col items-center sm:px-4">
            <h1 className="mb-10 text-center text-2xl font-bold" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>Your Orders</h1>
            {
              order.map((order) => {
                return (
                  order.items.map((item) => (
                    <div key={`${order.paymentId}-${item.id}-${order.date}`} onClick={(e) => window.location.href = `/productinfo/${item.id}`} className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white   sm:flex  sm:justify-start md:w-2/3 mb-4  overflow-y-auto max-h-[85vh] ">
                      <div className="justify-between rounded-lg bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                        <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-2">
                            <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                            <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {window.innerWidth <= 576
                                ? item.description.length > 80 ? item.description.slice(0, 80) + '...' : item.description
                                : item.description.length > 350 ? item.description.slice(0, 350) + '...' : item.description}
                            </h2>
                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              })
            }
          </div>
        </>)
        :
        (
          <div className="h-64 flex items-center justify-center" >
            <h2 className='text-center text-2xl mr-1' style={{ color: mode === 'dark' ? 'white' : '' }} >No Orders!</h2>
            <Link to={'/allproducts'} className="text-center text-2xl" style={{ color: mode === 'dark' ? 'blue' : 'blue' }}>
              Buy now
            </Link>
          </div>

        )

      }
    </Layout>
  )
}

export default Order