import ChatContact from "./ChatContact";

export default function ChatList() {
  return (
    <section className="h-full flex items-center">
      <div className="bg-accent flex flex-col w-full rounded-lg p-3 h-full shadow-lg">
        <h2 className="text-center text-4xl font-bold text-gray-300 my-2 mx-auto">
          Contactos
        </h2>
        <hr className="mb-2" />
        <div className="overflow-auto">
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={0}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
                    <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={0}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
          <ChatContact
            avatar="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            username="Username"
            lastMessage="Last Message"
            date="23/03/2023 14:15"
            pending={1}
          />
        </div>
      </div>
    </section>
  );
}
