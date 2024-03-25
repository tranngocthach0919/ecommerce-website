import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setSearch } from "../../redux/client/filters.slice";

const Search = () => {
    const [search, setSearchInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = () => {
        dispatch(setSearch(search));
        if (search) {
            navigate('/product')
        }
    }

    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSearch();
                }}
            >
                <div className="relative flex h-9 px-3">
                    <input
                        type="text"
                        placeholder="Enter keywords to search"
                        className="px-2 rounded-md bg-gray-100 mb-[0.2rem] focus:border-gray-100 focus:bg-white focus:ring-0 text-sm"
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="absolute w-6 h-6 mt-[0.3rem] ml-[180px] text-gray-400 cursor-pointer"
                        onClick={handleSearch}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </form>
        </>
    );
};

export default Search;
