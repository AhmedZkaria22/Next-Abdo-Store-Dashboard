import { db } from "@/firebase/FireConfig";
import { collection, getCountFromServer } from "firebase/firestore";


export const handlePageChange = (value, setPage) => {
  setPage(value);  
};

export const getTotalCount = async(collectionName, setCount, customQuery) => {
  const snapshot = await getCountFromServer(customQuery ? customQuery : collection(db, collectionName));
  setCount(snapshot?.data().count);
}

export const handleSort = (setPage, setOrderByAttr, setOrderByType, formOrderByAttr, formOrderType) => {
    setOrderByAttr(formOrderByAttr);
    setOrderByType(formOrderType);
    setPage(0);
};

export const handleFilter = (setPage, setFilterByValues, formValues) => {
    setFilterByValues(formValues);  
    setPage(0);
};
  