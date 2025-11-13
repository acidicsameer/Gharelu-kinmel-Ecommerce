import useStore from "../store/CartStore.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
 import notificationsound from '/sound/removedSound.wav'
function Cart() {
  const Removenotify = () =>{
    toast("Removed From cart successfully"
  , {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      color: "light",
    } 
    )
      playSound();
  }

  function playSound(){
 const audio =new Audio(notificationsound)
 audio.play();
  }
 
const Clearnotify = () =>{
    toast("All items Removed"
  , {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      color: "light",
    } 
    )
      playSound();
  }

  const { clearCart,count,removeItem, cartItems,totalCost,shippingCost} = useStore();

  return (
    <div className=" flex  flex-col-reverse  justify-center  items-center">
    <div className="  ">
      <div className="text-2xl font-bold mb-4">🛒 Your Cart</div>

      {cartItems.length === 0 ? (
        <div className=" ">
        <p className="text-gray-500 text-xl ">Cart is empty</p> 
        <Link to ="/products">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
      Buy Now
    </button></Link>
       
         
      </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((data, id) => (
            <div
              key={id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-medium text-lg">{data.title}</p>
                <p className="font-medium text-lg">{data.price}</p>

              </div>
              <button
                onClick={() => {
                  removeItem(data.id);
                  Removenotify();
                }}
             className=" bg-red-600  text-white font-semibold py-3 px-6 rounded-lg transition duration-300 "
              >
                Remove
              </button>
              
            </div>
          ))}{" "}
         <div className="flex flex-col md:flex-row gap-4 m-4">
  {/* Clear Cart Button */}
  <button
    onClick={() => {
      clearCart();
      Clearnotify();
    }}
    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
  >
    Clear All Cart
  </button>

  {/* Pay Now Button with Link */}
  <Link to="/payment">
    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
      Pay Now
    </button>
  </Link>
</div>

        </div>
      )}
    </div>
   <div className="w-full  items-center    flex  flex-col  p-5 bg-white rounded-lg   ">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Product Details</h2>
    
  <div className="space-y-2 text-gray-700">
    <p className="text-base">
      <span className="font-medium">Total Items:</span> {count}
    </p>

    <p className="text-base">
      <span className="font-medium">Shipping Cost:</span> ${shippingCost}
    </p>

    <p className="text-base">
      <span className="font-medium">Total Cost:</span> ${totalCost+shippingCost}
    </p>
  </div>
</div>
</div>


  );
}

export default Cart;
