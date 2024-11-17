export default function CardProduct({ id, images, title, origin_price, price, category, addToCart }) {
  return (
    <div className="position-relative">
      <img src={images} alt="" 
        className="h-302px w-100 object-fit-cover"/>
      <a href="#"
        className="btn btn-dark w-100 rounded-0 fs-4 mb-2 bg-primary-hover"
        onClick={(e) => addToCart(e, id)}>
        加入購物車
      </a>
      <h3 className="fs-4 mb-2">{ title }</h3>
      <p className="text-decoration-line-through">NT${origin_price}</p>
      <p className="fs-2">NT${price}</p>
      <div className="position-absolute top-8px end-n6px py-2 px-6 bg-dark text-light">
        { category }
      </div>
    </div>
  )
}
