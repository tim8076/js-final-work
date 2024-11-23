import { useContext, createContext, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Toast, DeleteConfirm } from '../tools/SweetAlert.js';
import {
  customerGetProducts,
  customerGetCarts,
  customerPostCarts,
  customerDeleteCart,
  customerDeleteAllCart,
  customerModifyCartNum,
  customerSendOrder,
} from "../connection/connection";

const ProductContext = createContext({});
export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  // 取得全部商品列表
  const [products, setProducts] = useState([]);
  async function getProducts () {
    try {
      setIsLoading(true);
      const res = await customerGetProducts();
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
      const res = await customerGetCarts();
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
      await customerPostCarts({
        data: {
          productId: id,
          quantity: 1,
        }
      })
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
        await customerDeleteCart(id);
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
        await customerDeleteAllCart();
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
      await customerModifyCartNum({
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
    setIsLoading(true);
    try {
      await customerSendOrder({
        data: {
          user: order,
        }
      })
      Toast.fire({
        icon: "success",
        title: "送出訂單成功"
      });
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
