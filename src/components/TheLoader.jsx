import BeatLoader from "react-spinners/BeatLoader";
export default function TheLoader({ isLoading }) {
  const displayClass = isLoading ? 'd-block' : 'd-none';
  return (
    <div className={`position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center z-3 ${displayClass}`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, .3)',
      }}>
      <BeatLoader
        loading={isLoading}
        size={25}
        color="#6A33FF"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
