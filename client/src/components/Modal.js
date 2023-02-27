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
                  <img src="https://wallet-dev.polygon.technology/assets/img/logout-sure.svg"></img>
                  <div className="flex text-lg text-zinc-600 mb-10" >Are you sure you want to logout?</div>
                  <div className="flex">
                      <button onClick={handleCancelClick} className="rounded px-4 py-2 ml-4 border border-gray-200 text-black bg-white">Cancel</button>
                      <button onClick={handleOKClick} className=" rounded px-4 py-2 text-white bg-green">Yes, logout</button>
                  </div>

              </div>
          </div>
      </div>

  );
}

export default Modal

