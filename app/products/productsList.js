import { db } from "@/firebase/FireConfig";
import { addDoc, collection, deleteDoc, doc, getCountFromServer, getDocs, limit, orderBy, query, runTransaction, startAfter, where, writeBatch } from "firebase/firestore";


export const handlePageChange = (value, setPage) => {
  setPage(value);  
};


export const getTotalCount = async(setCount, customQuery) => {
  const snapshot = await getCountFromServer(customQuery ? customQuery : collection(db, "Product Items"));
  setCount(snapshot?.data().count);
}

// handleResetFiltersSort : to reset filters & sort & get full pure data
export const handleResetFiltersSort = (setPage, setOrderByAttr, setOrderByType, setFilterByValues) => {
  setPage(0);
  setOrderByAttr('index');
  setOrderByType(false);
  setFilterByValues({
    index: null,
    name: null,
    colors: null,
    createdAt: null,
    filter: null,
    sizes: [],
    gender: null,
    price: null
  });  
}


let pages = [];
// pages used to store lateset two pages clicked from pagination bar, used where clicked page before current page or previos page after||before current by higher than one
let startAfterValue = null;
// startAfterValue used to store previos item for 1st item in current page, used as firestore query startAfter method value, used where not sort by index(id)

export const getProducts = async (setRowData, page, pageSize, orderByAttr, orderByType, filterByValues, setCount, count) => {
  const orderByTypeVar = orderByType == true ? "desc" : "asc";
  const orderByAttrVar = orderByAttr||"index";    

  /* prevDataCount used to 
  set query limit to return list has startAfter item at it's end,
  using previos items count for 1st item in current page*/
  const prevDataCount = (filterByValues['index'] > 0 && orderByTypeVar == "asc") ? (page * pageSize) + filterByValues['index'] : (page * pageSize);  

  pages.push(page);  
  
  const priceInt = Number.isInteger(parseFloat(filterByValues['price']))

  // handleClausesArray : used to wrap query clauses
  const handleClausesArray = (orderByAttr) => {
    const clausesArray = [];
    filterByValues['name']?.length > 0 ? clausesArray.push(where('title', '==', filterByValues['name'])) : null;
    filterByValues['createdAt']?.length > 0 ? clausesArray.push(where('createdAt', '==', filterByValues['createdAt'])) : null;
    filterByValues['filter']?.length > 0 ? clausesArray.push(where('filter', '==', filterByValues['filter'])) : null;
    filterByValues['gender']?.length > 0 ? clausesArray.push(where('gender', '==', filterByValues['gender'])) : null;
    filterByValues['colors']?.length > 0 ? clausesArray.push(where('colors', 'array-contains-any', filterByValues['colors'].replaceAll(" ", "").split(","))) : null;
    filterByValues['sizes']?.length > 0 ? clausesArray.push(where('sizesFound', '==', filterByValues['sizes']?.sort().join('_'))) : null;
    filterByValues['price']?.length > 0 ? clausesArray.push(where('price', '==', priceInt ? `${filterByValues['price']}.00` : filterByValues['price'])) : null;
    orderByAttr ? clausesArray.push(orderBy(orderByAttr, orderByTypeVar)) : clausesArray.push(orderBy(orderByAttrVar, orderByTypeVar));
    (filterByValues['name']?.length > 0 && orderByAttrVar == 'index') ? clausesArray.push(orderBy('title', orderByTypeVar)) : null;
    filterByValues['createdAt']?.length > 0 ? clausesArray.push(orderBy('createdAt', 'desc')) : null;
    filterByValues['filter']?.length > 0 ? clausesArray.push(orderBy('filter', 'asc')) : null;
    filterByValues['gender']?.length > 0 ? clausesArray.push(orderBy('gender', 'asc')) : null;
    filterByValues['colors']?.length > 0 ? clausesArray.push(orderBy('colors', 'asc')) : null;
    filterByValues['sizes']?.length > 0 ? clausesArray.push(orderBy('sizesFound', 'asc')) : null;
    filterByValues['price']?.length > 0 ? clausesArray.push(orderBy('price', 'asc')) : null;

    return clausesArray;
  }

  // condion used where get previos page items data or where get random page
  if((pages[pages.length -2] > page) || (Math.abs(pages[pages.length -2] - page) > 1)){    
    const bs_q = query(collection(db, "Product Items"), ...handleClausesArray(orderByAttr), limit(prevDataCount <= 0 ? 1 : prevDataCount));    
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
        q = query(collection(db, "Product Items"), ...clausesArray, startAfter(startAfterValue), limit(pageSize));
      }else{          
        q = query(collection(db, "Product Items"), ...handleClausesArray(), startAfter(startAfterValue), limit(pageSize));
      }
    }else{
      if(parseInt(filterByValues['index']) > 0){
        q = query(collection(db, "Product Items"), ...clausesArray, limit(pageSize));
        setCount(pageSize);
      }else{
        q = query(collection(db, "Product Items"), ...handleClausesArray(), limit(pageSize));
        
        const totalCountQuery = query(collection(db, "Product Items"), ...handleClausesArray())
        getTotalCount(setCount, totalCountQuery)
      }
    }  
  }
  
  handleQuery();  
  // const querySnapshot =  await getDocs(q);
  const querySnapshot =  await getDocs(q).catch((error)=>{
    // handle create firebase indexs error link in toatify (following err var)
    const err = `${error}`;
    console.log('handle error', err.slice(err.indexOf('https'), err.length-1));
  });

  setRowData(querySnapshot?.docs.map( doc => ({
    id: doc.data().index +1,
    image: doc.data().images[0],
    name: doc.data().title,
    PriceBeforeDescount: doc.data().PriceBeforeDescount,
    colors: doc.data().colors,
    createdAt: doc.data().createdAt,
    type: doc.data().filter,
    sizes: doc.data().sizes,
    gender: doc.data().gender,
    price: doc.data().price,
    desc: doc.data().desc,
    images: doc.data().images,
    sizesFound: doc.data().sizesFound,
    docId: doc.id
  })));

  startAfterValue = querySnapshot.docs[querySnapshot.docs.length - 1];
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


export const handleAdd = async(setPage, setOrderByAttr, setOrderByType, setFilterByValues, formValues) => {
  const collectionRef = collection(db, "Product Items");
  
  await addDoc(collectionRef, formValues);
  
  handleResetFiltersSort(setPage, setOrderByAttr, setOrderByType, setFilterByValues);
};

export const handleEdit = async(setPage, setOrderByAttr, setOrderByType, setFilterByValues, formValues, id) => {
  const docRef = doc(db, "Product Items", id);

  await runTransaction(db, async (transaction) => {
    const wantedDoc = await transaction.get(docRef);
    if (!wantedDoc.exists()) {
      throw "Document does not exist!";
    }

    transaction.update(docRef, formValues);
  });

  handleResetFiltersSort(setPage, setOrderByAttr, setOrderByType, setFilterByValues);
};

export const handleDelete = async(setPage, id) => {  
  const docRef = doc(db, "Product Items", id);
  
  await deleteDoc(docRef);
  
  // reset all indexs to make it organized one after other, may deleted item from middle or any and that will effect on sort and change pages
  let index = 0;
  const batch = writeBatch(db);

  const querySnapshot = (await getDocs(query(collection(db, "Product Items"), orderBy('index', 'asc'))));
  querySnapshot.docs.forEach(docItem => {
    const docRef = doc(db, "Product Items", docItem.id);
    batch.update(docRef, { index: index++ });
  });
  await batch.commit();


  setPage(0);
};