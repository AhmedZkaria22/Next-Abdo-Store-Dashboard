import { db } from "@/firebase/FireConfig";
import { collection, getCountFromServer, getDocs, limit, orderBy, query, where } from "firebase/firestore";


export const getAllProductsLength = async(setCountState) => {
  const snapshot = await getCountFromServer(collection(db, "Product Items"));
  setCountState(prev => ({...prev , products: snapshot?.data().count}));
  // console.log(snapshot?.data().count);
}


const handleClausesArray = (ProductType, ProductGender) => {
    const clausesArray = [];
    ProductType?.length > 0 ? clausesArray.push(where('filter', '==', ProductType)) : null;
    ProductGender?.length > 0 ? clausesArray.push(where('gender', '==', ProductGender)) : null;
    clausesArray.push(orderBy('index', 'asc'));
    ProductType?.length > 0 ? clausesArray.push(orderBy('filter', 'asc')) : null;
    ProductGender?.length > 0 ? clausesArray.push(orderBy('gender', 'asc')) : null;

    return clausesArray;
}


export const getProductsTypeGenderLength = async(setCountState, ProductType, ProductGender, clause) => {
    const snapshot = await getCountFromServer(query(collection(db, "Product Items"), ...handleClausesArray(ProductType, ProductGender)));
    setCountState(prev => ({...prev , [clause]: snapshot?.data().count}));
    // console.log(snapshot?.data().count, ProductType, ProductGender);
}


  
export const getOldestCustomers = async (setOldestCustomers) => {
  const q = query(collection(db, "Customers"), orderBy('firstSignIn', 'asc'), limit(5));    
  const querySnapshot =  await getDocs(q);

  setOldestCustomers(querySnapshot.docs.map( (doc, ndx) => ({
    id: doc.data().index,
    name: doc.data().name || doc.data().email.slice(0, doc.data().email.indexOf("@")).replace(/[0-9@:%._\+~#=]/g, ''),
    image: doc.data().image,
  })));  
}


export const getLatestCustomers = async (setLatestCustomers) => {
  const q = query(collection(db, "Customers"), where('lastBuy', '!=', 'Invalid Date'), orderBy('lastBuy', 'desc'), limit(5));    
  const querySnapshot =  await getDocs(q);

  setLatestCustomers(querySnapshot.docs.map( (doc, ndx) => ({
    id: doc.data().index,
    name: doc.data().name || doc.data().email.slice(0, doc.data().email.indexOf("@")).replace(/[0-9@:%._\+~#=]/g, ''),
    image: doc.data().image,
    lastBuyDate: doc.data().lastBuy,
  })));
}
