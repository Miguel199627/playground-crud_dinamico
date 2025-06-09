import "./Loader.css";

export function Loader({ loading }) {
  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader-bar-container">
            <div className="loader-bar"></div>
          </div>
        </div>
      )}
    </>
  );
}
