 import React from 'react'

 import Loginimg from '../assets/Loginimg.jpg'
import { Link } from 'react-router-dom'

function Login() {

return (
   
  <>

<div class="flex bg-white">
	<div class="md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden">
		<div class="mx-auto py-10">
			<h1 class="text-2xl font-bold mb-10 cursor-pointer text-[#219ebc] duration-150">Manhaj</h1>
			<ul>
				<li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					<span class="font-semibold">Home</span>
				</li>
				<li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span class="font-semibold">All Courses</span>
				</li>
				<li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path d="M12 14l9-5-9-5-9 5 9 5z" />
						<path
							d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
					</svg>
					<span class="font-semibold">My Course</span>
				</li>
				<li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
					<span class="font-semibold">Profile</span>
				</li>
				<li class="flex space-x-2 mt-10 cursor-pointer hover:text-[#219ebc] duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
					<span class="font-semibold">Setthing</span>
				</li>
				<button class="w-full mt-10 bg-[#219ebc] rounded-full py-1.5 text-white">Learn</button>
			</ul>
		</div>
	</div>
	<div class="min-h-screen w-full bg-white border-l">
		<nav class="flex items-center justify-between px-10 bg-white py-6 border-b">
			<div class="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-96">
				<input type="text" placeholder="search" class="bg-gray-100 outline-none w-full" />
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer text-gray-500" fill="none"
					viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<div class="flex items-center space-x-4">
				<img class="w-8 rounded-full" src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg" alt="Elon Musk" />
				<p class="hidden md:block">Aamir  El amiri</p>
			</div>
		</nav>
		<div class="mx-6">
			<h1 class="my-6 text-3xl">All Courses</h1>
			
		</div>
		<div class="mx-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-10">
			<div class="shadow-lg rounded-t-md overflow-hidden ">
				<div class="">
					<img class="w-sm" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
					<div class="p-2 relative">
						<p class="text-lg mt-6 font-semibold">REACT JS COURS </p>
						<p>53K views • 2 weeks ago</p>
						<img class="h-12 w-12 rounded-full absolute -top-6 p-0.5 border-2 right-6" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
      </div>
					</div>
				</div>
				<div class="shadow-lg rounded-t-md overflow-hidden">
					<div class="">
						<img class="w-sm" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
						<div class="p-2 relative">
							<p class="text-lg mt-6 font-semibold">REACT JS COURS </p>
							<p>53K views • 2 weeks ago</p>
							<img class="h-12 w-12 rounded-full absolute -top-6 p-0.5 border-2 right-6" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
      </div>
						</div>
					</div>
					<div class="shadow-lg rounded-t-md overflow-hidden ">
						<div class="">
							<img class="w-sm" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
							<div class="p-2 relative">
								<p class="text-lg mt-6 font-semibold">REACT JS COURS </p>
								<p>53K views • 2 weeks ago</p>
								<img class="h-12 w-12 rounded-full absolute -top-6 p-0.5 border-2 right-6" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
      </div>
							</div>
						</div>
						<div class="shadow-lg rounded-t-md overflow-hidden ">
							<div class="">
								<img class="w-sm" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="" />
								<div class="p-2 relative">
									<p class="text-lg mt-6 font-semibold">REACT JS COURS 
									</p>
									<p>53K views • 2 weeks ago</p>
									<img class="h-12 w-12 rounded-full absolute -top-6 p-0.5 border-2 right-6" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                  </div>
								</div>
							</div>
						</div>
					</div>
					<footer class="text-center py-6 mt-4">
					
					</footer>
          </div>

  </>



)}
export default Login