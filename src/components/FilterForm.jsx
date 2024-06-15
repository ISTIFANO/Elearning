import React from 'react';

const FilterForm = () => {
    return (
        <form className="space-y-4" action="your_script.php" method="post">
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Title or Description</label>
                <input type="text" name="titleOrDescription" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Tag</label>
                <input type="text" name="tag" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Language</label>
                <select name="language" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                    <option>Select Language</option>
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>German</option>
                    {/* Add more languages as needed */}
                </select>
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Level</label>
                <select name="level" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                    <option>Select Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Price</label>
                <select name="price" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                    <option>Select Price</option>
                    <option>Free</option>
                    <option>$</option>
                    <option>$$</option>
                    <option>$$$</option>
                </select>
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Teacher</label>
                <input type="text" name="teacher" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                <input type="email" name="email" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white" />
            </div>
            <div>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-1">Sort By</label>
                <select name="sortBy" className="w-full p-2 border rounded-lg dark:bg-zinc-700 dark:border-zinc-600 dark:text-white">
                    <option>Top Rated</option>
                    <option>Most Popular</option>
                    <option>Fresh</option>
                </select>
            </div>
            <div className="flex space-x-2">
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Search</button>
                <button type="reset" className="w-full bg-zinc-500 text-white p-2 rounded-lg">Unfilter</button>
            </div>
        </form>
    );
};

export default FilterForm;
