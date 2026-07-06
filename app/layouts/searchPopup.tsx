// components/PopupSearch.tsx

"use client";

type PopupSearchProps = {
  searchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
};

export default function PopupSearch({
  searchOpen,
  setSearchOpen,
}: PopupSearchProps) {
  return (
    <>
      {/* Start Popup Search Box */}
      <div
        id="popup_searchbox"
        className={`popup_searchbox_wrapper ${
          searchOpen ? "popupsbox_active" : ""
        }`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setSearchOpen(false);
          }
        }}
      >
        <div className="searchbox_drawer position-relative">
          
          {/* Close Button */}
          <button
            type="button"
            className="popup_close border-0 bg-transparent"
            onClick={() => setSearchOpen(false)}
          >
            <i className="bx bx-x"></i>
          </button>

          <div className="popup_searchform text-center">
            <div className="col-lg-7 mx-auto">
              <form
                action="#"
                className="position-relative"
                method="get"
              >
                <input
                  type="text"
                  placeholder="What are you looking For?"
                />

                <button type="submit">
                  <i className="ph ph-magnifying-glass"></i> Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Popup Search Box */}
    </>
  );
}