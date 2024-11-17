import { Link } from "react-router-dom"
export default function TheHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-md bg-light py-md-6 py-lg-9">
        <div className="container">
          <Link className="navbar-brand fs-4 fs-lg-3 fw-bold py-md-0" to="/">
            WOWOROOM
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-md-auto">
              <li className="nav-item me-md-8 text-center text-md-start">
                <Link className="nav-link fs-lg-4 py-md-0" to="/">
                  床墊優勢
                </Link>
              </li>
              <li className="nav-item me-md-8 text-center text-md-start">
                <Link className="nav-link fs-lg-4 py-md-0" to="/">
                  好評推薦
                </Link>
              </li>
              <li className="nav-item me-md-8 text-center text-md-start">
                <Link className="nav-link fs-lg-4 py-md-0" to="/">
                  運送方式
                </Link>
              </li>
              <li className="nav-item text-center text-md-start">
                <Link className="nav-link fs-lg-4 py-md-0 text-primary-100" to="/">
                  立即預訂
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
