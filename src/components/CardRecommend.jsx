export default function CardRecommend(props) {
  return (
    <div className="w-350px bg-light d-flex flex-shrink-0 me-r3">
      <img src={props.productImgUrl} alt={props.productImgUrl} />
      <div className="px-4 py-3 flex-grow-1">
        <div className="d-flex mb-2">
          <img className="me-2 w-40px h-40px"
            src={props.personImgUrl}  alt={props.personImgUrl} />
          <div>
            <h3 className="fs-5">{props.name}</h3>
            <p className="text-primary-100 fs-6">{props.product}</p>
          </div>
        </div>
        <p>{props.comment}</p>
      </div>
    </div>
  )
}
