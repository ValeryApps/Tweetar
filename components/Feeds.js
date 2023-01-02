import { SparklesIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Input } from './Input'
import { Post } from './Post'
import {posts} from '../data/posts'

export const Feeds = () => {

  return (
    <div className='xl:ml-[370px] border-l-2 border-r-2 min-w-[576px] sm:ml-[76px] flex-grow max-w-xl'>
      <div className="flex justify-between items-center px-3 py-2 sticky top-0 z-50 bg-white border-b-2 border-gray-200">
         <div className="text-lg sm:text-xl font-bold cursor-pointer">Home</div>
         <div className="hover-effet flex items-center justify-center px-0 w-9 h-9">
            <SparklesIcon className='h-7'/>
           
         </div>
      </div>
      <Input />
      {
         posts.map(post=>(
            <div key={post.id} className="mx-1">
               <Post post = {post}/>
            </div>
         ))
      }
    </div>
  )
}
