import useAjax from "./useAjax";

export const CategoryHelper = {
    /**
     * List category itmes
     * 
     * @returns 
     */
    list: () => {
        return useAjax.get("category");
    },
    /**
     * 
     * @param {string} name 
     * @returns 
     */
    getAuction : (name) =>{
        return useAjax.get(name);
    }
};