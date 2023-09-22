import ChatList from "../components/ChatList";
import ChatMessage from "../components/ChatMessage";

// eslint-disable-next-line react/prop-types
export default function Chat({ className }) {
  const isChatDrawerFocus = true;
  return (
    <section className={className}>
      <div className="h-full container mx-auto">
        <div className="flex h-full gap-3">
          <div
            className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/4 ${
              isChatDrawerFocus ? "block" : "hidden"
            }`}
          >
            <ChatList />
          </div>

          <div className={`w-full`}>
            <div className="h-full flex md:flex-row items-center px-3 md:px-0 md:pe-3 overflow-hidden">
              <div className="bg-accent flex flex-col w-full rounded-lg p-3 h-95 shadow-lg">
                <div className="flex justify-between items-center my-2 ">
                  <div className="flex items-center">
                    <button className="btn border-0 px-1 md:px-2 md:hidden block">
                      <i className="bi fa-solid fa-chevron-left"></i>
                    </button>
                    <img
                      className="h-10 w-10 img-fluid rounded-full ms-3"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                      alt="Perfil"
                    />
                    <span className="text-xl md:text-lg ms-3 text-gray-300 font-bold">
                      Jan Ochoa
                    </span>
                    <i className="bx bxs-send"></i>
                  </div>
                </div>
                <hr className="mx-3" />
                <div
                  className="overflow-auto px-4 py-2 h-full chat"
                  id="message-box"
                >
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                  <ChatMessage />
                </div>

                <hr className="my-3" />

                <div className="relative mb-4 flex flex-wrap items-stretch">
                  <input
                    type="text"
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <button className="flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
