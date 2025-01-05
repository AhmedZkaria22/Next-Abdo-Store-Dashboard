'use client'
// import { useContext, useMemo, useState } from 'react'
// import { AuthContext } from '../Auth/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FireConfig';
import { useEffect, useState } from 'react';
// import { db } from './FireConfig';

function UseFirestore() {
    
    const [products, setProducts] = useState([]);
    // const [cartItems, setCartItems] = useState([]);
    // const [monthlySale, setMonthlySale] = useState([]);
    // const [newShirts, setNewShirts] = useState([]);
    
    // useEffect(() => {
        // const unSubscribe1 = db.collection('Product Items').orderBy('createdAt','desc').onSnapshot(
        // const unSubscribe1 = db.collection('Product Items').orderBy('createdAt').onSnapshot(
    // const getProducts = () => {
    //     db.collection('Product Items').orderBy('createdAt').onSnapshot(
    //         // const unSubscribe1 = db.collection('Product Items').orderBy('filter').onSnapshot(          
    //         snap => {
    //             let fetchedIt = snap.docs.map(
    //                 doc => { return { ...doc.data(), id: doc.id } }                    
    //             );
    //             return fetchedIt;
    //         }
    //     ); 
    // }

    /*async function getProducts() {        
        const collectionRef = collection(db, "Product Items");
        const productsSnap = await getDocs(collectionRef);   
        // productsSnap.forEach((doc) => {
        //     // console.log(`doc-${doc.id} =>`, doc.data());                        
        //     setClubs(prev => [...prev, {id: doc.id, ...doc.data()}])
        // });
        console.log('products', productsSnap)
        // let fetchedProducts = productsSnap.map(
        //     doc => { return { ...doc.data(), id: doc.id } }                    
        // );
        // return fetchedProducts;
    }*/

    const getProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "Product Items"))
        // setData(() => querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setProducts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // return fetchedProducts;
    }

    useEffect(() => {
        products.length === 0 && getProducts();
    },[products])
  

    // async function getCities(db) {
    //     const citiesCol = collection(db, 'cities');
    //     const citySnapshot = await getDocs(citiesCol);
    //     const cityList = citySnapshot.docs.map(doc => doc.data());
    //     return cityList;
    //   }

        // return unSubscribe1;
    // }, []);

    /*const addProduct = async(product) => {
        await db.collection('Product Items').add({...product});
    }

    // read monthly sale
    // useEffect(() => {
        // const unSubscribe = 
        db.collection('Product Items').orderBy('price','desc').limit(5).onSnapshot(
            snap => {
                let fetchedIt = snap.docs.map(
                    doc => { return { ...doc.data(), id: doc.id } }                    
                );
                setMonthlySale(fetchedIt);                
            }
        );   
        // return unSubscribe;
    // }, [])
    // read monthly sale


    // read new shirts
    // useEffect(() => {
        // const unSubscribe = 
        db.collection('Product Items').where("filter", "==", "shirt").orderBy('createdAt','desc').limit(4).onSnapshot(
            snap => {
                let fetchedIt = snap.docs.map(
                    doc => { return { ...doc.data(), id: doc.id } }                    
                );
                setNewShirts(fetchedIt);                
            }
        );     
        // return unSubscribe;
    // }, []);
    // read new shirts

    const { user } = useContext(AuthContext);  
    // useEffect(() => {
    //     const unSubscribe2 = db.collection('Cart Items').orderBy('createdAt').onSnapshot(       
    //         snap => {
    //             let fetchedCIt = snap.docs.map(
    //                 doc => { return { ...doc.data(), id: doc.id } }                    
    //             );
    //             setCartItems(fetchedCIt);                
    //         }
    //     );
    //     console.log( user );
    //     return unSubscribe2;
    // }, []);


    // const addCartItem = async(cartItem) => {
    //     await db.collection('Cart Items').add({...cartItem});
    // }
    // useEffect(() => {
        let unSubscribe2 = {};        
        ( !user ) ? 
        unSubscribe2 = db.collection('Cart Items').orderBy('createdAt').onSnapshot(       
            snap => {
                let fetchedCIt = snap.docs.map(
                    doc => { return { ...doc.data(), id: doc.id } }                    
                );
                setCartItems(fetchedCIt);                
            }
        )
        : unSubscribe2 = db.collection(`User-${user.email}`).orderBy('createdAt').onSnapshot(       
            snap => {
                let fetchedCIt = snap.docs.map(
                    doc => { return { ...doc.data(), id: doc.id } }                    
                );
                setCartItems(fetchedCIt);                
            }
        );
        // console.log( user );
        // return unSubscribe2;
        unSubscribe2;
    // }, []);


    const addCartItem = async(cartItem) => {
        await db.collection(`User-${user.email}`).add({...cartItem});
    }


    // Shoping cart delete item 
    const handelDeleteItem = (String) => { 
        db.collection(`User-${user.email}`).doc(String).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => { console.error("Error removing document: ", error); });
    }
    // Shoping cart delete item 

    // Shoping cart update item amount
    const updateDocAmount = (Number, lmt, opr, rnd) => {
        (opr === '+') ?
            db.collection(`User-${user.email}`).doc(`${rnd}`)
            .update({ amount: `${ (Number+1 >= lmt) ? lmt : Number+1 }` })
            .then(() => { console.log(`doc with id : ${rnd} updated`); })
            .catch(error => { console.log(`Error getting document : ${rnd}`, error); })
        : 
            db.collection(`User-${user.email}`).doc(`${rnd}`)
            .update({ amount: `${ (Number-1 <= lmt) ? lmt+1 : Number-1 }` })
            .then(() => { console.log(`doc with id : ${rnd} updated`); })
            .catch(error => { console.log(`Error getting document : ${rnd}`, error); });
    } 
    // Shoping cart update item amount*/

    // return [products, addProduct, cartItems, addCartItem, handelDeleteItem, updateDocAmount];
    // return [products, addProduct, monthlySale, newShirts, cartItems, addCartItem, handelDeleteItem, updateDocAmount];
    // return [getProducts];
    return [products];
}

export default UseFirestore
