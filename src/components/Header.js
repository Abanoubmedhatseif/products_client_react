function Header({ title, button1, button2 }) {
  return (
    <div className="flex justify-between items-center p-6 bg-gray-100 border-b-2">
      <div className="text-2xl">{title}</div>
      <div className="flex gap-5">
        <span className={`bg-green-600 text-white px-4 py-2 rounded`}>
          {button1}
        </span>
        <span className={`bg-red-600 text-white px-4 py-2 rounded`}>
          {button2}
        </span>
      </div>
    </div>
  );
}

export default Header;
