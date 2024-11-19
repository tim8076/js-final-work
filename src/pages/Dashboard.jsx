import { useEffect } from "react";
import DashboardHeader from '../components/DashboardHeader';
import TheLoader from "../components/TheLoader";
import C3PieChart from "../components/C3PieChart";
import { useDashboard } from "../context/dashboardContext";
import { calcRevenueProportion } from "../tools/toolFuncs";
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

  const revenueProportion = calcRevenueProportion(orders);

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
          <h1 className="text-center fs-2 mb-10 mb-md-24">全品項營收比重</h1>
          {
            orders.length > 0 ? (
              <div className="container">
                <div className="d-flex justify-content-center mb-6 mb-md-14">
                  <C3PieChart data={revenueProportion}/>
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
                        orders.map(order => {
                          return (
                            <tr key={order.id}>
                              <th scope="row">{order.id}</th>
                              <td>{order.user.name}<br /> {order.user.tel}</td>
                              <td>{order.user.address}</td>
                              <td>{order.user.email}</td>
                              <td>{order.products[0].title}</td>
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
                                    <a href="#" className="text-success"
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
