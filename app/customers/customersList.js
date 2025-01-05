import { db } from "@/firebase/FireConfig";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { getTotalCount } from "../functions/listingFunctions";


export const handleResetFiltersSort = (setPage, setOrderByAttr, setOrderByType, setFilterByValues) => {
  setPage(0);
  setOrderByAttr('index');
  setOrderByType(false);
  setFilterByValues({
    index: null,
    image: null,
    email: null,
    firstSignInDate: null,
    lastBuyDate: null
  });  
}

let pages = [];
// pages used to store lateset two pages clicked from pagination bar, used where clicked page before current page or previos page after||before current by higher than one
let startAfterValue = null;
// startAfterValue used to store previos item for 1st item in current page, used as firestore query startAfter method value, used where not sort by index(id)

export const getCustomers = async (setRowData, page, pageSize, orderByAttr, orderByType, filterByValues, setCount) => {
  const orderByTypeVar = orderByType == true ? "desc" : "asc";
  const orderByAttrVar = orderByAttr||"index";    

  /* prevDataCount used to 
  set query limit to return list has startAfter item at it's end,
  using previos items count for 1st item in current page*/
  const prevDataCount = (filterByValues['index'] > 0 && orderByTypeVar == "asc") ? (page * pageSize) + filterByValues['index'] : (page * pageSize);  

  pages.push(page);    

  // handleClausesArray : used to wrap query clauses
  const handleClausesArray = (orderByAttr) => {    
    const clausesArray = [];
    filterByValues['email']?.length > 0 ? clausesArray.push(where('email', '==', filterByValues['email'])) : null;
    filterByValues['firstSignInDate']?.length > 0 ? clausesArray.push(where('firstSignIn', '==', filterByValues['firstSignInDate'])) : null;
    filterByValues['lastBuyDate']?.length > 0 ? clausesArray.push(where('lastBuy', '==', filterByValues['lastBuyDate'])) : null;
    orderByAttr ? clausesArray.push(orderBy(orderByAttr, orderByTypeVar)) : clausesArray.push(orderBy(orderByAttrVar, orderByTypeVar));
    (filterByValues['email']?.length > 0 && orderByAttrVar == 'index') ? clausesArray.push(orderBy('email', 'asc')) : null;
    filterByValues['firstSignInDate']?.length > 0 ? clausesArray.push(orderBy('firstSignIn', 'asc')) : null;
    filterByValues['lastBuyDate']?.length > 0 ? clausesArray.push(orderBy('lastBuy', 'asc')) : null;

    return clausesArray;
  }

  // condion used where get previos page items data or where get random page
  if((pages[pages.length -2] > page) || (Math.abs(pages[pages.length -2] - page) > 1)){    
    const bs_q = query(collection(db, "Customers"), ...handleClausesArray(orderByAttr), limit(prevDataCount <= 0 ? 1 : prevDataCount));    
    const bs_querySnapshot =  await getDocs(bs_q);
            
    startAfterValue = bs_querySnapshot.docs[bs_querySnapshot.docs.length - 1];    
    pages = [pages[pages.length - 1]];    
  }
  
  let q;  
  const handleQuery = () => {    
    const clausesArray = [];    
    if(parseInt(filterByValues['index']) > 0){      
      clausesArray.push(where('index', '==', parseInt(filterByValues['index'])));
      clausesArray.push(orderBy(orderByAttrVar, orderByTypeVar));
    }

    // condition where current page not 1st page visited and not page number one
    if(startAfterValue && page > 0){
      // condition because where filter by index || id not allow to filter by other and not need call handleClausesArray
      if(parseInt(filterByValues['index']) > 0){
        q = query(collection(db, "Customers"), ...clausesArray, startAfter(startAfterValue), limit(pageSize));
      }else{          
        q = query(collection(db, "Customers"), ...handleClausesArray(), startAfter(startAfterValue), limit(pageSize));
      }
    }else{
      if(parseInt(filterByValues['index']) > 0){
        q = query(collection(db, "Customers"), ...clausesArray, limit(pageSize));
        setCount(pageSize);
      }else{
        q = query(collection(db, "Customers"), ...handleClausesArray(), limit(pageSize));          
        
        const totalCountQuery = query(collection(db, "Customers"), ...handleClausesArray())
        getTotalCount("Customers", setCount, totalCountQuery)
      }
    }  
  }
  
  handleQuery();  
  const querySnapshot =  await getDocs(q);
  
  setRowData(querySnapshot.docs.map( doc => ({
    id: doc.data().index,
    name: doc.data().name || doc.data().email.slice(0, doc.data().email.indexOf("@")).replace(/[0-9@:%._\+~#=]/g, ''),
    image: doc.data().image,
    email: doc.data().email,
    firstSignInDate: doc.data().firstSignIn,
    lastBuyDate: doc.data().lastBuy,
    docId: doc.id
  })));

  startAfterValue = querySnapshot.docs[querySnapshot.docs.length - 1];  
}


export const getCustomerCart = async (setCustomerHistory, uEmail) => {
  const q = query(collection(db, `User-${uEmail}`), orderBy('createdAt', 'desc'));
  const querySnapshot =  await getDocs(q);

  setCustomerHistory(querySnapshot.docs.map( doc => ({
    index: doc.data().totId,
    name: doc.data().name,
    date: doc.data().createdAt,
    cost: parseInt(doc.data().amount) * parseInt(doc.data().price.replaceAll(/[a-zA-Z]/g,'')),
    image: doc.data().image,
  })));
}