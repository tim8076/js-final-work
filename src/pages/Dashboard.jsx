import { useEffect, useState } from "react";
import DashboardHeader from '../components/DashboardHeader';
import TheLoader from "../components/TheLoader";
import C3PieChart from "../components/C3PieChart";
import { useDashboard } from "../context/dashboardContext";
import {
  calcRevenueProportion,
  calcProductCategoryRevenueProportion,
  sortOrdersDecending
} from "../tools/toolFuncs";
import { formatDate } from '../tools/dataFormat';
export default function DashBoard() {
  const {
    isLoading,
    getOrders,
    orders,
    deleteOrder,
    deleteAllOrder,
    modifyOrderStatus,
  } = useDashboard();

  const [chartDataCategory, setChartDataCategory] = useState('全品項營收比重');

  let c3Data = [];
  if (chartDataCategory === '全品項營收比重') {
    c3Data = calcRevenueProportion(orders);
  } else if (chartDataCategory === '全產品類別營收比重') {
    c3Data = calcProductCategoryRevenueProportion(orders);
  }

  const sortedOrders = sortOrdersDecending(orders);

  useEffect(() => {
    const fetchData = async () => {
      await getOrders();
    };
    fetchData();
  }, []);
  return (
    <>
      <TheLoader isLoading={isLoading}/>
      <DashboardHeader />
      <main>
        <section className="py-6 py-md-15">
          <div className="container position-relative mb-10 mb-md-24 d-flex flex-column align-items-center">
            <h1 className="text-center fs-2 mb-3">{chartDataCategory}</h1>
            <select className="form-select position-md-absolute top-md-50 start-md-0 translate-middle-md-y w-auto"
              value={chartDataCategory}
              onChange={e => setChartDataCategory(e.target.value)}>
              <option value="全品項營收比重">全品項營收比重</option>
              <option value="全產品類別營收比重">全產品類別營收比重</option>
            </select>
          </div>
          {
            sortedOrders.length > 0 ? (
              <div className="container">
                <div className="d-flex justify-content-center mb-6 mb-md-14">
                  <C3PieChart data={c3Data}/>
                </div>
                <div className="row justify-content-end mb-3">
                  <div className="col-md-2 d-flex justify-content-end">
                    <button type="button"
                      className="btn btn-outline-dark"
                      onClick={deleteAllOrder}>
                      清除全部訂單
                    </button>
                  </div>
                </div>
                <div className="table-responsive-lg">
                  <table className="table table-bordered align-middle">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3 px-4 fw-normal">訂單編號</th>
                        <th scope="col" className="py-3 px-4 fw-normal">聯絡人</th>
                        <th scope="col" className="py-3 px-4 fw-normal">聯絡地址</th>
                        <th scope="col" className="py-3 px-4 fw-normal">電子郵件</th>
                        <th scope="col" className="py-3 px-4 fw-normal">訂單品項</th>
                        <th scope="col" className="py-3 px-4 fw-normal">訂單日期</th>
                        <th scope="col" className="py-3 px-4 fw-normal">訂單狀態</th>
                        <th scope="col" className="py-3 px-4 fw-normal">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        sortedOrders.map(order => {
                          return (
                            <tr key={order.id}>
                              <th scope="row">{order.id}</th>
                              <td>{order.user.name}<br /> {order.user.tel}</td>
                              <td>{order.user.address}</td>
                              <td>{order.user.email}</td>
                              <td>{order.products.map(product => {
                                return <p className="fs-6 mb-1" key={product.title}>{product.title}</p>
                              })}</td>
                              <td>{ formatDate(order.createdAt) }</td>
                              <td className="w-115px">
                                {
                                  order.paid ? (
                                    <a href="#" className="text-success"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        modifyOrderStatus(order.id, false);
                                      }}>
                                      已付款
                                    </a>
                                  ) : (
                                    <a href="#" className="text-danger"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        modifyOrderStatus(order.id, true);
                                      }}>
                                      未付款
                                    </a>
                                  )
                                }                   
                              </td>
                              <td className="w-80px">
                                <a href="#" className="btn btn-danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteOrder(order.id);
                                  }}>
                                  刪除
                                </a>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="fs-3 text-center">目前沒有訂單</p>
            )
          }
        </section>
      </main>
    </>
  )
}
