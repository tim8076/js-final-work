import TheHeader from "../components/TheHeader";
import TheLoader from "../components/TheLoader";
import CardRecommend from "../components/CardRecommend";
import CardProduct from "../components/CardProduct";
import { recommendationLsit, recommendationLsit2 } from "../data/home";
import adventageImage1 from '../assets/images/advantages/advantages-1.png';
import adventageImage2 from '../assets/images/advantages/advantages-4.png';
import adventageImage3 from '../assets/images/advantages/advantages-2.png';
import adventageImage4 from '../assets/images/advantages/advantages-3.png';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { filterProducts } from "../tools/toolFuncs";
import { useProduct } from "../context/productContext";

export default function Home() {
  const {
    isLoading,
    products,
    getProducts,
    carts,
    cartFinalTotal,
    getCarts,
    addToCart,
    deleteCartItem,
    deleteAllCartItem,
    modifyCartItemNum,
    sendOrder,
  } = useProduct();

  // 商品類別篩選
  const productsCategories = [...new Set(products?.map(product => product.category))];
  const [productFilter, setProductFilter] = useState('全部');
  const filteredProducts = filterProducts(products, productFilter);

  // 元件載入初始化
  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      await getCarts();
    };
    fetchData();
  }, []);
  
  // 送出訂單
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    const order = {
      name: data.username.trim(),
      tel: data.phone.trim(),
      email: data.email.trim(),
      address: data.address.trim(),
      payment: data.payment.trim(),
    }
    await sendOrder(order);
    await getCarts();
    reset();
  }
  return (
    <>
      <TheLoader isLoading={isLoading}/>
      <TheHeader />
      <main>
        <section>
          <div className="container py-4 pt-md-8 pb-md-15">
            <div className="mb-6 mb-md-15">
              <div
                className="h-240px h-md-420px bg-cover p-6 px-md-13 py-md-12 d-flex"
                style={{
                  backgroundImage: `url(${adventageImage1})`
                }}>
                <h1 className="fs-2 fs-md-1 text-light fw-medium mt-auto">
                  窩窩家居<br /> 跟您一起品味生活
                </h1>
              </div>
            </div>
            <h2 className="fs-4 fs-md-2 text-center mb-7">床墊優勢</h2>
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <img className="mb-2 img-fluid w-100" src={adventageImage2} alt="原木料環保" />
                <h3 className="fs-4 text-center">原木料環保</h3>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <img className="mb-2 img-fluid w-100" src={adventageImage3} alt="好收納" />
                <h3 className="fs-4 text-center">好收納</h3>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <img className="mb-2 img-fluid w-100" src={adventageImage4} alt="好組裝" />
                <h3 className="fs-4 text-center">好組裝</h3>
              </div>
            </div>
          </div>
        </section>
        <section className="py-6 py-md-12 bg-gray-100">
          <h2 className="fs-4 fs-md-2 text-center mb-8">家具比較</h2>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="table-responsive">
                  <table className="table bg-transparent align-middle text-center">
                    <thead>
                      <tr className="fs-md-4">
                        <th scope="col"></th>
                        <th scope="col" className="fw-normal">窩窩系統模組家具</th>
                        <th scope="col" className="fw-normal text-gray-200">組合式家具</th>
                        <th scope="col" className="fw-normal text-gray-200">實木家具</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" className="fs-md-4 fw-normal text-start">可單人自行組裝</th>
                        <td>
                          <i className="bi bi-check2 icon-font-size text-primary-100"></i>
                        </td>
                        <td className="text-gray-200">不一定</td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row" className="fs-md-4 fw-normal text-start">可多次重複拆裝</th>
                        <td>
                          <i className="bi bi-check2 icon-font-size text-primary-100"></i>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row" className="fs-md-4 fw-normal text-start">床墊規格彈性大</th>
                        <td>
                          <i className="bi bi-check2 icon-font-size text-primary-100"></i>
                        </td>
                        <td className="text-gray-200">不一定</td>
                        <td className="text-gray-200">不一定</td>
                      </tr>
                      <tr>
                        <th scope="row" className="fs-md-4 fw-normal text-start">材質可長久使用</th>
                        <td>
                          <i className="bi bi-check2 icon-font-size text-primary-100"></i>
                        </td>
                        <td></td>
                        <td className="text-gray-200">
                          <i className="bi bi-check2 icon-font-size text-primary-100"></i>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="fs-md-4 fw-normal text-start">小客車即可搬運</th>
                        <td>
                          <i className="bi bi-check2 icon-font-size text-primary-100"></i>
                        </td>
                        <td></td>
                        <td>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-6 py-md-15 bg-primary">
          <h2 className="fs-4 fs-md-2 text-center mb-8 text-light">好評推薦</h2>
          <div className="container">
            <div className="overflow-x-scroll custom-scrollbar">
              <div className="d-flex ps-24 mb-5">
                {
                  recommendationLsit.map(comment => {
                    return <CardRecommend {...comment} key={comment.id}/>
                  })
                }
              </div>
              <div className="d-flex">
                {
                  recommendationLsit2.map(comment => {
                    return <CardRecommend {...comment} key={comment.id}/>
                  })
                }
              </div>
            </div>
          </div>
        </section>
        <section className="py-6 pt-md-8 pb-md-18">
          <h2 className="fs-4 fs-md-2 text-center mb-8">運送方式</h2>
          <div className="d-flex flex-column align-items-center flex-lg-row justify-content-lg-center align-items-lg-start">
            <div className="d-flex flex-column align-items-center mb-6 mb-lg-0">
              <div className="w-115px h-115px rounded-circle border border-3 border-dark d-flex justify-content-center align-items-center mb-2">
                 <i className="bi bi-cart-fill icon-font-size"></i>
              </div>
              <p className="fs-4">STEP.1</p>
              <p>選購商品</p>
            </div>
            <div className="mb-6 mb-lg-0 mx-lg-8 mt-lg-8">
              <i className="bi bi-caret-down-fill fs-1 d-lg-none"></i>
              <i className="bi bi-caret-right-fill fs-1 d-none d-lg-block"></i>
            </div>
            <div className="d-flex flex-column align-items-center mb-6 mb-lg-0">
              <div className="w-115px h-115px rounded-circle border border-3 border-dark d-flex justify-content-center align-items-center mb-2">
                 <i className="bi bi-list-ul icon-font-size"></i>
              </div>
              <p className="fs-4">STEP.2</p>
              <p>填寫預定資料</p>
            </div>
            <div className="mb-6 mb-lg-0 mx-lg-8 mt-lg-8">
              <i className="bi bi-caret-down-fill fs-1 d-lg-none"></i>
              <i className="bi bi-caret-right-fill fs-1 d-none d-lg-block"></i>
            </div>
            <div className="d-flex flex-column align-items-center mb-6 mb-lg-0">
              <div className="w-115px h-115px rounded-circle border border-3 border-dark d-flex justify-content-center align-items-center mb-2">
                 <i className="bi bi-check2 icon-font-size"></i>
              </div>
              <p className="fs-4">STEP.3</p>
              <p>預定成功</p>
            </div>
            <div className="mb-6 mb-lg-0 mx-lg-8 mt-lg-8">
              <i className="bi bi-caret-down-fill fs-1 d-lg-none"></i>
              <i className="bi bi-caret-right-fill fs-1 d-none d-lg-block"></i>
            </div>
            <div className="d-flex flex-column align-items-center mb-6 mb-lg-0">
              <div className="w-115px h-115px rounded-circle border border-3 border-dark d-flex justify-content-center align-items-center mb-2">
                 <i className="bi bi-envelope icon-font-size"></i>
              </div>
              <p className="fs-4">STEP.4</p>
              <p>Email 付款資訊</p>
            </div>
          </div>
        </section>
        <section className="pb-6 pb-md-15">
          <div className="container">
            <div className="row mb-8">
              <div className="col-8 col-md-3">
                <select className="form-select"
                  defaultValue="全部"
                  onChange={e => setProductFilter(e.target.value)}>
                  <option value="全部">全部</option>
                  {
                    productsCategories?.map(category => 
                      <option value={category}
                        key={category}>
                        {category}
                      </option>
                    )
                  }
                </select>
              </div>
            </div>
            <div className="row gy-7 justify-content-center justify-content-md-start">
              {
                filteredProducts?.map(product => {
                  return (
                    <div className="col-10 col-md-6 col-lg-3"
                      key={product.id}>
                      <CardProduct
                        id={product.id}
                        images={product.images}
                        title={product.title}
                        price={product.price}
                        category={product.category}
                        origin_price={product.origin_price}
                        addToCart={addToCart}/>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
        <section className="py-6 pt-md-12 pb-md-18 bg-gray-100">
          <h2 className="fs-4 fs-md-2 text-center mb-8">我的購物車</h2>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                {
                  carts.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead className="fs-4">
                          <tr>
                            <th scope="col" className="fw-normal">品項</th>
                            <th scope="col" className="fw-normal">單價</th>
                            <th scope="col" className="fw-normal">數量</th>
                            <th scope="col" className="fw-normal" colSpan={2}>金額</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            carts.map(({id, product, quantity}) => {
                              return (
                                <tr key={id}>
                                  <th scope="row" className="py-5 d-flex align-items-center">
                                    <img className="me-4 w-80px h-80px"
                                      src={product.images}
                                      alt={product.title} />
                                    <p className="fs-4 fw-normal">{product.title}</p>
                                  </th>
                                  <td className="fs-4">NT${product.price}</td>
                                  <td className="fs-4">
                                    <a href="#" className={`btn btn-primary-100 py-0 px-1 ${quantity === 1 ? 'pe-none disabled': ''}`}
                                      onClick={(e) => modifyCartItemNum(e, id, -1)}>
                                      <i className="bi bi-dash-lg"></i>
                                    </a>
                                    <span className="mx-2">{quantity}</span>
                                    <a href="#" className="btn btn-primary-100 py-0 px-1"
                                      onClick={(e) => modifyCartItemNum(e, id, 1)}>
                                      <i className="bi bi-plus-lg"></i>
                                    </a>
                                  </td>
                                  <td className="fs-4">NT${product.price * quantity}</td>
                                  <td className="text-end">
                                    <a href="#"
                                      className="text-primary-100-hover me-6"
                                      onClick={e => deleteCartItem(e, id)}>
                                      <i className="bi bi-x-lg fs-1"></i>
                                    </a>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                        <tfoot>
                          <tr>
                            <th scope="col" colSpan={3}>
                              <a href="#" className="btn btn-outline-dark"
                                onClick={e => deleteAllCartItem(e)}>
                                刪除所有品項
                              </a>
                            </th>
                            <td className="fs-4">總金額</td>
                            <td className="fs-2">NT${cartFinalTotal}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center text-primary fs-3">購物車無商品</p>
                  )
                }
              </div>
            </div>
          </div>
        </section>
        <section className="py-6 pt-md-15 pb-md-20">
          <h2 className="fs-4 fs-md-2 text-center mb-8">填寫預訂資料</h2>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-4">
                <form action=""
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column">
                  <div className="mb-3 mb-md-5">
                    <label htmlFor="username"
                      className="form-label">
                      姓名
                    </label>
                    <input type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      id="username"
                      { ...register('username', {
                        required: {
                          value: true,
                          message: '姓名 為必填'
                        }
                      })}
                      placeholder="請輸入姓名" />
                    {
                      errors.username && <div className="invalid-feedback">
                        {errors?.username?.message}
                      </div>
                    }
                  </div>
                  <div className="mb-3 mb-md-5">
                    <label htmlFor="phone"
                      className="form-label">
                      電話
                    </label>
                    <input type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      { ...register('phone', {
                        required: {
                          value: true,
                          message: '電話 為必填'
                        },
                        minLength: {
                          value: 8,
                          message: '電話長度低於8碼'
                        },
                        maxLength: {
                          value: 10,
                          message: '電話長度超過10碼'
                        }
                      })}
                      placeholder="請輸入電話" />
                    {
                      errors.phone && <div className="invalid-feedback">
                        {errors?.phone?.message}
                      </div>
                    }
                  </div>
                  <div className="mb-3 mb-md-5">
                    <label htmlFor="email"
                      className="form-label">
                      Email
                    </label>
                    <input type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      { ...register('email', {
                        required: {
                          value: true,
                          message: 'Email 為必填'
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email 格式錯誤'
                        }
                      })}
                      placeholder="請輸入Email" />
                    {
                      errors.email && <div className="invalid-feedback">
                        {errors?.email?.message}
                      </div>
                    }
                  </div>
                  <div className="mb-3 mb-md-5">
                    <label htmlFor="address"
                      className="form-label">
                      寄送地址
                    </label>
                    <input type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      id="address"
                      { ...register('address', {
                        required: {
                          value: true,
                          message: '寄送地址 為必填'
                        }
                      })}
                      placeholder="請輸入寄送地址" />
                    {
                      errors.address && <div className="invalid-feedback">
                        {errors?.address?.message}
                      </div>
                    }
                  </div>
                  <div className="mb-8 mb-md-12">
                    <label htmlFor="payment"
                      className="form-label">
                      付款方式
                    </label>
                    <select className="form-select"
                      defaultValue="ATM"
                      { ...register('payment') }
                      id="payment">
                      <option value="ATM">ATM</option>
                      <option value="信用卡">信用卡</option>
                      <option value="超商付款">超商付款</option>
                    </select>
                  </div>
                  <button type='submit'
                    className="btn btn-dark py-r1 px-17 align-self-center">
                    送出預定資料
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
