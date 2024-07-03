import React from 'react'


const Filter = () => {
  return (
   <>
   
   <aside className="w-full lg:w-1/4 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Filters</h2>
                            <form className="space-y-4">
                                {/* Form elements */}
                                <div>
                                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Title or Description</label>
                                    <input type="text" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Tag</label>
                                    <input type="text" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
                                    </div>
                                <div className="flex space-x-2">
                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Search</button>
                                    <button type="reset" className="w-full bg-zinc-500 text-white p-2 rounded-lg">Unfilter</button>
                                    </div>
                            </form>
                        </aside>
   
   </>
  )
}

export default Filter