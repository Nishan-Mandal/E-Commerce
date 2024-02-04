import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext } from 'react'
import myContext from '../../context/data/myContext'
import { toast } from 'react-toastify';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { deleteFromCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoutes } from '../../App.jsx';




export default function Modal({ setGrandTotal, items }) {
    const context = useContext(myContext);
    let [isOpen, setIsOpen] = useState(false)
    const { getOrderData } = context;

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handleClick() {
        if (JSON.parse(localStorage.getItem('user')) === null) {
            window.location.href = `/login`;
        } else {
            openModal();
        }
    }

    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    /************************************************** PAYMENT INTEGRATION **************************************************
     ******************************************************** RAZORPAY *******************************************************/
    const dispatch = useDispatch()
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item))
    }

    const buyNow = async () => {
        try {
            // validation 
            if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
                return toast.error("All fields are required", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
            const addressInfo = {
                name,
                address,
                pincode,
                phoneNumber
            }

                                // store in firebase 
                                const orderInfo = {
                                    items,
                                    addressInfo,
                                    date: Timestamp.now(),
                                    email: JSON.parse(localStorage.getItem("user")).user.email,
                                    userid: JSON.parse(localStorage.getItem("user")).user.uid,
                                    // paymentId
                                }
            
                                //Clearing the cart
                                const cartData = JSON.parse(localStorage.getItem('cart')) ?? [];
                                if (JSON.stringify(cartData) === JSON.stringify(items)) {
                                    items.map((item) => {
                                        deleteCart(item)
                                    })
                                }
            
                                const result = addDoc(collection(fireDB, "orders"), orderInfo)
                                toast.success('Order Placed Successfully')
                                getOrderData();
                                

            // var options = {
            //     key: "rzp_test_lQ92HU4KZ814Yp",
            //     key_secret: "dBarOeteZnveOhwD2MhYkThu",
            //     amount: parseInt(setGrandTotal * 100),
            //     currency: "INR",
            //     order_receipt: 'order_rcptid_' + name,
            //     name: "Drawt",
            //     description: "for testing purpose",
            //     handler: function (response) {

            //         toast.success('Payment Successful')

            //         const paymentId = response.razorpay_payment_id;
            //         // store in firebase 
            //         const orderInfo = {
            //             items,
            //             addressInfo,
            //             date: Timestamp.now(),
            //             email: JSON.parse(localStorage.getItem("user")).user.email,
            //             userid: JSON.parse(localStorage.getItem("user")).user.uid,
            //             paymentId
            //         }

            //         //Clearing the cart
            //         const cartData = JSON.parse(localStorage.getItem('cart')) ?? [];
            //         if (JSON.stringify(cartData) === JSON.stringify(items)) {
            //             items.map((item) => {
            //                 deleteCart(item)
            //             })
            //         }

            //         const result = addDoc(collection(fireDB, "orders"), orderInfo)
            //         getOrderData();
            //     },

            //     theme: {
            //         color: "#3399cc"
            //     }
            // };
            // var pay = new window.Razorpay(options);
            // pay.open();
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className="  text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={handleClick}
                    className="w-full  bg-violet-600 hover:bg-violet-700 py-2 text-center rounded-lg text-white font-bold"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">

                                    <section className="">
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                                            {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                                                Flowbite
                                            </a> */}
                                            <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                                                    <form className="space-y-4 md:space-y-6" action="#">
                                                        <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input value={pincode} onChange={(e) => setPincode(e.target.value)} type="text" name="pincode" id="pincode" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" name="mobileNumber" id="mobileNumber" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>

                                                        <div>
                                                        <label htmlFor="paymentmode" className="block mb-2 text-sm font-medium text-gray-900">Payment Mode</label>
                                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <input
                                                                    type="radio"
                                                                    value="cashOnDelivery"
                                                                    checked
                                                                    readOnly
                                                                />
                                                                Cash on Delivery
                                                            </label>

                                                        </div>

                                                    </form>
                                                    <button onClick={() => { buyNow(); closeModal() }} type="button" className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Order Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}