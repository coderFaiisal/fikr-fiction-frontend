const Books = () => {
  return (
    <div>
      <fieldset className="form-control w-80">
        <div className="relative">
          <input
            type="text"
            placeholder="Search book..."
            className="input input-bordered w-full pr-16"
          />
          <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default Books;
