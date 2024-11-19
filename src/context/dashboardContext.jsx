import { useContext, createContext, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const DeleteConfirm = Swal.mixin({
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#C72424",
  cancelButtonColor: "#301E5F",
  confirmButtonText: "確認刪除",
  cancelButtonText: '取消',
  reverseButtons: true
})

const apiBaseUrl = 'https://livejs-api.hexschool.io';
const apiCustomerUrl = 'api/livejs/v1/admin';
const apiPath = 'tim6029';
const token = 'q1qYVBiDx5XwAxAmz6ZK6gu5Y9Z2';

const DashboardContext = createContext({});
export function useDashboard() {
  return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // 取得訂單列表
  const [orders, setOrders] = useState([]);
  async function getOrders() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/orders`, {
        headers: {
          'Authorization': token
        }
      });
      setOrders(res.data.orders);
    } catch(err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        customClass: { confirmButton: 'bg-primary' }
      });
    } finally {
      setIsLoading(false);
    }
  }

  // 刪除單一訂單
  async function deleteOrder(id) {
    const res = await DeleteConfirm.fire({
      title: "確認刪除訂單 ?",
    })   

    if (res.isConfirmed) {
      try {
        setIsLoading(true);
        const res = await axios.delete(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/orders/${id}`, {
          headers: {
            'Authorization': token
          }
        });
        Toast.fire({
          icon: "success",
          title: "刪除訂單成功"
        });
        setOrders(res.data.orders);
      } catch(err) {
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          customClass: { confirmButton: 'bg-primary' }
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  // 刪除全部訂單
  async function deleteAllOrder() {
    const res = await DeleteConfirm.fire({
      title: "確認刪除全部訂單 ?",
    })

    if (res.isConfirmed) {
      try {
        setIsLoading(true);
        const res = await axios.delete(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/orders`, {
          headers: {
            'Authorization': token
          }
        });
        setOrders(res.data.orders);
      } catch(err) {
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          customClass: { confirmButton: 'bg-primary' }
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  // 修改訂單狀態
  async function modifyOrderStatus(id, isPaid) {
    console.log(id, isPaid)
    try {
      setIsLoading(true);
      const res = await axios.put(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/orders`, {
        data: {
          id,
          paid: isPaid,
        }
      },{
        headers: {
          'Authorization': token
        }
      });
      console.log(res.data.orders)
      setOrders(res.data.orders);
    } catch(err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        customClass: { confirmButton: 'bg-primary' }
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DashboardContext.Provider value={{
      isLoading,
      getOrders,
      orders,
      deleteOrder,
      deleteAllOrder,
      modifyOrderStatus,
    }}>
      { children }
    </DashboardContext.Provider>
  )
}