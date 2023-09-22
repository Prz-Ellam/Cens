function ChatMessage() {
  const message = "Hola Mundo";
  const own = true;

  return (
    <div className={`flex my-4 ${own ? "justify-end" : "justify-start"}`}>
      {!own && (
        <img
          className="rounded-full me-2 w-8 h-8"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt="Avatar"
        />
      )}
      <small
        className={`text-sm p-2 rounded-2xl overflow-aut text-white ${
          own ? "bg-purple text-right" : "bg-gray-800"
        }`}
      >
        {message}
      </small>
    </div>
  );
}

export default ChatMessage;
