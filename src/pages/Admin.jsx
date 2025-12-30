import React from 'react'
import { Header } from '../components/Header'
import { Pedidos } from './Pedidos'

export const Admin = ({ isToggleOpen, setIsToggleOpen, isAdmin }) => {
    return (
        <div className='p-6'>
            <Header isVisible={true} isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen} isAdmin={isAdmin} />
            <Pedidos />
        </div>
    )
}
