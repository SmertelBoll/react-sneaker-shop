import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Card from '../components/Card/Card'
import NamePage from '../components/NamePage'

function Buy({ onAddBuy, onAddLike, onDelBuy, onDelLike }) {
   const bought = useSelector(state => state.cart.bought)

   return (
      <div>
         <NamePage>Мої покупки</NamePage>
         {bought.length > 0
            ? <div className="sneakers justify-content-center">
               {bought.map(obj => (
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
               <h2>У вас немає покупок</h2>
               <p className="sneakers-empty__text">Ви скупердяй?<br />Оформіть хоча б одне замовлення.</p>
               <NavLink to='/'>
                  <button className="button-back">
                     <span>Повернутись назад</span>
                     <img src="img/arrow.svg" alt="" />
                  </button>
               </NavLink>
            </div>
         }
      </div>
   )
}

export default Buy