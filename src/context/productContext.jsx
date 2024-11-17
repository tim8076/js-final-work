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
const apiCustomerUrl = 'api/livejs/v1/customer';
const apiPath = 'tim6029';

const ProductContext = createContext({});
export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  // 取得全部訂單
  const [products, setProducts] = useState([]);
  async function getProducts () {
    try {
      setIsLoading(true);
      const res = await axios.get(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/products`);
      setProducts(res.data.products)
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

  const [carts, setCarts] = useState([]);
  const [cartFinalTotal, setCartFinalTotal] = useState(0);
  async function getCarts() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/carts`);
      setCarts(res.data.carts);
      setCartFinalTotal(res.data.finalTotal)
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
  // 加入購物車
  async function addToCart (e, id) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/carts`, {
        data: {
          productId: id,
          quantity: 1,
        }
      });
      await getCarts();
      Toast.fire({
        icon: "success",
        title: "加入購物車成功"
      })
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

  // 刪除購物車
  async function deleteCartItem(e, id) {
    e.preventDefault();
    const res = await DeleteConfirm.fire({
      title: "確認刪除購物車 ?",
    })   
    if (res.isConfirmed) {     
      setIsLoading(true);
      try {
        await axios.delete(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/carts/${id}`);
        await getCarts();
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

  // 刪除全部購物車
  async function deleteAllCartItem(e) {
    e.preventDefault();
    const res = await DeleteConfirm.fire({
      title: "確認刪除全部購物車 ?",
    })
    if (res.isConfirmed) {
      setIsLoading(true);
      try {
        await axios.delete(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/carts`);
        await getCarts();
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
  // 修改購物車數量
  async function modifyCartItemNum(e, id, quantity) {
    e.preventDefault();
    const productNum = carts.find(cart => cart.id === id).quantity + quantity;
    setIsLoading(true);
    try {
      await axios.patch(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/carts`, {
        data: {
          id: id,
          quantity: productNum,
        }
      });
      await getCarts();
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

  // 送出訂單
  async function sendOrder(order) {
    console.log(order)
    setIsLoading(true);
    try {
      const res = await axios.post(`${apiBaseUrl}/${apiCustomerUrl}/${apiPath}/orders`, {
        data: {
          user: order,
        }
      });
      console.log(res.data)
      Toast.fire({
        icon: "success",
        title: "送出訂單成功"
      })
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
    <ProductContext.Provider value={{
      isLoading,
      setIsLoading,
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
    }}>
      { children }
    </ProductContext.Provider>
  )
}
