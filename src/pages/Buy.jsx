import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Card from '../components/Card/Card'
import NamePage from '../components/NamePage'

function Buy({ items, onAddBuy, onAddLike, onDelBuy, onDelLike }) {
   const saved = useSelector(state => state.cart.saved)

   return (
      <div>
         <NamePage>Мои покупки</NamePage>
         {saved.length > 0
            ? <div className="sneakers">
               {items.map(obj => (saved.includes(obj.id) &&
                  <Card
                     key={obj.id}
                     id={obj.id}
                     name={obj.name}
                     imageUrl={obj.imageUrl}
                     price={obj.price}
                     onAddLike={onAddLike}
                     onAddBuy={onAddBuy}
                     onDelBuy={onDelBuy}
                     onDelLike={onDelLike}
                  />
               ))
               }
            </div>
            : <div className="sneakers-empty">
               <p className="sneakers-empty__emoji">😔</p>
               <h2>У вас нет заказов</h2>
               <p className="sneakers-empty__text">Вы нищеброд?<br />Оформите хотя бы один заказ.</p>
               <NavLink to='/'>
                  <button className="button-back">
                     <span>Вернуться назад</span>
                     <img src="img/arrow.svg" alt="" />
                  </button>
               </NavLink>
            </div>
         }
      </div>
   )
}

export default Buy