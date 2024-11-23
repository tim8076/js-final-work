import { useContext, createContext, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Toast, DeleteConfirm } from '../tools/SweetAlert.js';
import {
  adminGetOrders,
  adminDeleteOrder,
  adminDeleteAllOrders,
  adminModifyOrderStatus,
} from "../connection/connection.js";

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
      const res = await adminGetOrders();
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
        const res = await adminDeleteOrder(id);
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
        const res = await adminDeleteAllOrders();
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
    try {
      setIsLoading(true);
      const res = await adminModifyOrderStatus({
        data: {
          id,
          paid: isPaid,
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