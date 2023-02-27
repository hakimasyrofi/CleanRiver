const Modal = (props) => {

  function handleOKClick() {
      props.disconnect()
      props.setModalOn(false)
  }
  function handleCancelClick() {
      props.setModalOn(false)
  }

  return (

      <div className="fixed inset-0 bg-black bg-opacity-20 z-50">

          <div className="flex h-screen justify-center items-center ">

              <div className="flex-col justify-center bg-white py-12 px-24 rounded-xl ">
                  <img className="mx-auto mb-4 w-40" alt="" src="https://wallet-dev.polygon.technology/assets/img/logout-sure.svg"></img>
                  <div className="flex text-xl font-semibold text-black mb-10" >Are you sure you want to logout?</div>
                  <div className="flex justify-center">
                      <button onClick={handleCancelClick} className="w-32 mr-2 rounded-lg px-4 py-2 border border-gray-200 text-black bg-white hover:bg-gray-100">Cancel</button>
                      <button onClick={handleOKClick} className="w-32 ml-2 rounded-lg px-4 py-2 text-white bg-green hover:bg-green-900">Yes, logout</button>
                  </div>

              </div>
          </div>
      </div>

  );
}

export default Modal

