import React from 'react'

export const SideBarMenuItem = ({text, Icon, active}) => {
  return (
    <div className='hover-effet flex items-center justify-center xl:justify-start gap-3 '>
   <Icon className='h-7'/>
     <span className={`${active&&'font-bold'} text-gray-700 hidden xl:inline`}>{text}</span> 
    </div>
  )
}
