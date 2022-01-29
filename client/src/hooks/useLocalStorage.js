import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * When `data` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 */

function useLocalStorage(key, value = null) {
    const initialValue = localStorage.getItem(key) || value;

    const [data, setData] = useState(initialValue);

    useEffect(() => {
        if (data === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, data);
        }
    }, [data, setData]);

    return [data, setData];
}

export default useLocalStorage;
