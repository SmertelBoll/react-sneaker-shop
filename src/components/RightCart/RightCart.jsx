import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, openCart } from '../../redux/actions/cart'
import RightCartItem from './RightCartItem'

function RightCart({ items, onDelBuy, totalPrice }) {
   const cartBlackRef = useRef()
   const cartWhiteRef = useRef()
   const cartButtonBackRef = useRef()
   const cartButtonCloseRef = useRef()

   const dispatch = useDispatch()

   const saved = useSelector(state => state.cart.saved)

   const [successBuy, setSuccessBuy] = useState(false)

   const handleOutsideClick = (e) => {
      const path = e.path || (e.composedPath && e.composedPath())   // для фаєрфокса
      if (path.includes(cartBlackRef.current) &&
         (!path.includes(cartWhiteRef.current) || path.includes(cartButtonBackRef.current) || path.includes(cartButtonCloseRef.current))) {  //. !e.path.includes(sortRef.current) для хрома норм
         dispatch(openCart(false))
         document.body.style.overflow = "auto";  // додаємо загальний скрол
         setSuccessBuy(false)
      }
   }

   const addToBought = () => {
      dispatch(clearCart())
      setSuccessBuy(true)
   }

   useEffect(() => {
      document.body.addEventListener('click', handleOutsideClick)
   }, [])

   return (
      <div ref={cartBlackRef} className="overlay">
         <div ref={cartWhiteRef} className="right-cart">
            <div className="right-cart__header">
               <h2>Кошик</h2>
               <button
                  className='button-card button-card__delete'
                  ref={cartButtonCloseRef}
               >
                  <img src="img/delete.svg" alt="" />
               </button>
            </div>

            {saved.length > 0 &&
               <div className="right-cart__content">
                  {items.map(obj => (saved.includes(obj.id) &&
                     <RightCartItem
                        key={obj.id}
                        id={obj.id}
                        name={obj.name}
                        imageUrl={obj.imageUrl}
                        price={obj.price}
                        onDelBuy={onDelBuy}
                     />))
                  }
               </div>
            }
            {saved.length > 0 &&
               <footer>
                  <div className="right-cart__text">
                     <p>
                        <span>Всього:</span>
                        <b>{totalPrice} грн.</b>
                     </p>
                     <p>
                        <span>Податок 5%:</span>
                        <b>{Math.ceil(totalPrice * 0.05)} грн.</b>
                     </p>
                  </div>
                  <button
                     className="right-cart__button"
                     onClick={addToBought}
                  >
                     <span>Оформити заказ</span>
                     <img src="img/arrow.svg" alt="" />
                  </button>
               </footer>
            }
            {saved.length === 0 && !successBuy &&
               <div className="right-cart__empty-success">
                  <img width={120} height={120} src="img/emptyCart.jpg" alt="" />
                  <h3 className="right-cart__empty-h3">Кошик пустий</h3>
                  <p>Добавте хоча б одну пару кросівок, щоб зробити замовлення.</p>
                  <button
                     ref={cartButtonBackRef}
                     className="button-back"
                  >
                     <span>Повернутись назад</span>
                     <img src="img/arrow.svg" alt="" />
                  </button>
               </div>
            }
            {saved.length === 0 && successBuy &&
               <div className="right-cart__empty-success">
                  <img width={83} height={120} src="img/successBuy.jpg" alt="" />
                  <h3 className="right-cart__success-h3">Заказ оформлений!</h3>
                  <p>Ваше замовлення незабаром буде передане кур'єрській доставці</p>
                  <button
                     ref={cartButtonBackRef}
                     className="button-back"
                  >
                     <span>Повернутись назад</span>
                     <img src="img/arrow.svg" alt="" />
                  </button>

               </div>}

         </div>
      </div >
   )
}

export default RightCart