import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {BsFillCartFill , BsFillHeartFill} from 'react-icons/bs';
import {FaFilter} from 'react-icons/fa';
import './ProductsPage.css';

const ProductList = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [results, setResults] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate  = useNavigate();
    const { pettype } = useParams();
    const { category } = useParams();
    const { search } = useParams();
    //const [currentPage, setCurrentPage] = useState(1);
    //const productsPerPage = 8;

    const [filters, setFilters] = useState({
        productcategory: '|All Products',
        subcategory: '|All',
        pettype: '|All',
    });

    const [isAllProductsFiltered, setIsAllProductsFiltered] = useState(true);
        const [isAllSubcategoriesFiltered, setIsAllSubcategoriesFiltered] = useState(true);

    const [isFoodAndNutritionFiltered, setIsFoodAndNutritionFiltered] = useState(false);
        const [isFoodFiltered, setIsFoodFiltered] = useState(false);
        const [isTreatsFiltered, setIsTreatsFiltered] = useState(false);
        const [isSupplementsFiltered, setIsSupplementsFiltered] = useState(false);
    
    const [isToysAndEnrichmentFiltered, setIsToysAndEnrichmentFiltered] = useState(false);
        const [isToysFiltered, setIsToysFiltered] = useState(false);
    
    const [isCareAndWellBeingFiltered, setIsCareAndWellBeingFiltered] = useState(false);
        const [isGroomingToolsFiltered, setIsGroomingToolsFiltered] = useState(false);
        const [isBeddingFiltered, setIsBeddingFiltered] = useState(false);
        const [isLeashesAndCollarFiltered, setIsLeashesAndCollarFiltered] = useState(false);
        const [isAccessoriesFiltered, setIsAccessoriesFiltered] = useState(false);
        const [isAquariumFiltered, setIsAquariumFiltered] = useState(false);

    const [isAllPetTypesFiltered, setIsAllPetTypesFiltered] = useState(true);
        const [isDogFiltered, setIsDogFiltered] = useState(false);
        const [isCatFiltered, setIsCatFiltered] = useState(false);
        const [isBirdFiltered, setIsBirdFiltered] = useState(false);
        const [isFishFiltered, setIsFishFiltered] = useState(false);
        const [isReptileFiltered, setIsReptileFiltered] = useState(false);
        const [isSmallAnimalsFiltered, setIsSmallAnimalsFiltered] = useState(false);

    useEffect(() => {
        /* if "All Products" is true*/
        if(isAllProductsFiltered){
            setIsFoodAndNutritionFiltered(false);
            setIsToysAndEnrichmentFiltered(false);
            setIsCareAndWellBeingFiltered(false);
            setIsAllSubcategoriesFiltered(true);
        }
        if( !isFoodAndNutritionFiltered &&
            !isToysAndEnrichmentFiltered &&
            !isCareAndWellBeingFiltered &&
            !isFoodFiltered &&
            !isTreatsFiltered &&
            !isSupplementsFiltered &&
            !isToysFiltered &&
            !isGroomingToolsFiltered &&
            !isBeddingFiltered &&
            !isLeashesAndCollarFiltered &&
            !isAccessoriesFiltered &&
            !isAquariumFiltered){
            setIsAllProductsFiltered(true);
        }
        handleFilterChange('productcategory', '');
    }, [isAllProductsFiltered , isAccessoriesFiltered , isAquariumFiltered , isBeddingFiltered, isCareAndWellBeingFiltered ,  isCareAndWellBeingFiltered , isFoodAndNutritionFiltered , isFoodFiltered , isGroomingToolsFiltered , isLeashesAndCollarFiltered , isSupplementsFiltered , isToysAndEnrichmentFiltered , isToysFiltered , isTreatsFiltered]);

    useEffect(() => {
        if( isFoodAndNutritionFiltered || 
            isToysAndEnrichmentFiltered || 
            isCareAndWellBeingFiltered ||
            isFoodAndNutritionFiltered ||
            isToysAndEnrichmentFiltered ||
            isCareAndWellBeingFiltered ||
            isFoodFiltered ||
            isTreatsFiltered ||
            isSupplementsFiltered ||
            isToysFiltered ||
            isGroomingToolsFiltered ||
            isBeddingFiltered ||
            isLeashesAndCollarFiltered ||
            isAccessoriesFiltered ||
            isAquariumFiltered){
            setIsAllProductsFiltered(false);
        }
        if( !isFoodAndNutritionFiltered &&
            !isToysAndEnrichmentFiltered &&
            !isCareAndWellBeingFiltered &&
            !isFoodFiltered &&
            !isTreatsFiltered &&
            !isSupplementsFiltered &&
            !isToysFiltered &&
            !isGroomingToolsFiltered &&
            !isBeddingFiltered &&
            !isLeashesAndCollarFiltered &&
            !isAccessoriesFiltered &&
            !isAquariumFiltered){
            setIsAllProductsFiltered(true);
        }
        handleFilterChange('productcategory', '');
    }, [isFoodAndNutritionFiltered,
        isToysAndEnrichmentFiltered,
        isCareAndWellBeingFiltered,
        isFoodFiltered,
        isTreatsFiltered,
        isSupplementsFiltered,
        isToysFiltered,
        isGroomingToolsFiltered,
        isBeddingFiltered,
        isLeashesAndCollarFiltered,
        isAccessoriesFiltered,
        isAquariumFiltered]);

    useEffect(() => {
        if(isAllSubcategoriesFiltered){
            setIsFoodFiltered(false);
            setIsSupplementsFiltered(false);
            setIsTreatsFiltered(false);
            setIsGroomingToolsFiltered(false);
            setIsToysFiltered(false);
            setIsLeashesAndCollarFiltered(false);
            setIsBeddingFiltered(false);
            setIsAquariumFiltered(false);
            setIsAccessoriesFiltered(false);
        }
        if( !isFoodFiltered &&
            !isTreatsFiltered &&
            !isSupplementsFiltered &&
            !isToysFiltered &&
            !isGroomingToolsFiltered &&
            !isBeddingFiltered &&
            !isLeashesAndCollarFiltered &&
            !isAccessoriesFiltered &&
            !isAquariumFiltered){
            setIsAllSubcategoriesFiltered(true);
        }
        handleFilterChange('subcategory', '');
    }, [isAllSubcategoriesFiltered , isFoodAndNutritionFiltered , isToysAndEnrichmentFiltered , isCareAndWellBeingFiltered]);

    useEffect(() => {
        if( isFoodFiltered||
            isTreatsFiltered||
            isSupplementsFiltered||
            isToysFiltered||
            isGroomingToolsFiltered||
            isBeddingFiltered||
            isLeashesAndCollarFiltered||
            isAccessoriesFiltered||
            isAquariumFiltered){
            setIsAllSubcategoriesFiltered(false);
        }
        if( !isFoodFiltered &&
            !isTreatsFiltered &&
            !isSupplementsFiltered &&
            !isToysFiltered &&
            !isGroomingToolsFiltered &&
            !isBeddingFiltered &&
            !isLeashesAndCollarFiltered &&
            !isAccessoriesFiltered &&
            !isAquariumFiltered){
            setIsAllSubcategoriesFiltered(true);
        }
        handleFilterChange('subcategory', '');
    }, [isFoodFiltered,
        isTreatsFiltered,
        isSupplementsFiltered,
        isToysFiltered,
        isGroomingToolsFiltered,
        isBeddingFiltered,
        isLeashesAndCollarFiltered,
        isAccessoriesFiltered,
        isAquariumFiltered]);

    useEffect(() => {
        if(isAllPetTypesFiltered){
            setIsDogFiltered(false);
            setIsCatFiltered(false);
            setIsBirdFiltered(false);
            setIsFishFiltered(false);
            setIsReptileFiltered(false);
            setIsSmallAnimalsFiltered(false);
        }
        if( (!isDogFiltered&&
            !isCatFiltered&&
            !isBirdFiltered&&
            !isFishFiltered&&
            !isReptileFiltered&&
            !isSmallAnimalsFiltered)){
            setIsAllPetTypesFiltered(true);
        }
        handleFilterChange('pettype', '');
    }, [isAllPetTypesFiltered]);

    useEffect(() => {
        if( isDogFiltered||
            isCatFiltered||
            isBirdFiltered||
            isFishFiltered||
            isReptileFiltered||
            isSmallAnimalsFiltered){
            setIsAllPetTypesFiltered(false);
        }
        if( (!isDogFiltered&&
            !isCatFiltered&&
            !isBirdFiltered&&
            !isFishFiltered&&
            !isReptileFiltered&&
            !isSmallAnimalsFiltered)){
            setIsAllPetTypesFiltered(true);
        }
        handleFilterChange('pettype', '');
    }, [isDogFiltered,
        isCatFiltered,
        isBirdFiltered,
        isFishFiltered,
        isReptileFiltered,
        isSmallAnimalsFiltered]);

    const oneTimeFunc = () =>{
        const userInput = search;
        if (userInput) { //set SearchInput only Once
            setSearchInput(userInput);
        }
        routeUpdate();
        handleFilterChange('', '');
    };

    const routeUpdate = () => {

        if (pettype != null && pettype.trim() != "") {
            const fval = pettype;
            console.log(fval);
            let str = "Dog";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsDogFiltered(true);
            }else{
                setIsDogFiltered(false);
            }
            str = "Cat";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsCatFiltered(true);
            }else{
                setIsCatFiltered(false);
            }
            str = "Bird";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsBirdFiltered(true);
            }else{
                setIsBirdFiltered(false);
            }
            str = "Fish";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsFishFiltered(true);
            }else{
                setIsFishFiltered(false);
            }
            str = "Reptile";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsReptileFiltered(true);
            }else{
                setIsReptileFiltered(false);
            }
            str = "small animals";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsSmallAnimalsFiltered(true);
            }else{
                setIsSmallAnimalsFiltered(false);
            }
        }else{
            setIsAllPetTypesFiltered(true);
        }
        if (category != null && category.trim() != "") {
            const fval = category;
            console.log(fval);
            let str = "Food and Nutrition";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsFoodAndNutritionFiltered(true);
            }else{
                setIsFoodAndNutritionFiltered(false);
            }
            str = "Toys and Enrichment";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsToysAndEnrichmentFiltered(true);
            }else{
                setIsToysAndEnrichmentFiltered(false);
            }
            str = "Care and Well-being";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsCareAndWellBeingFiltered(true);
            }else{
                setIsCareAndWellBeingFiltered(false);
            }
            str = "All Products";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsAllProductsFiltered(true);
            }else{
                setIsAllProductsFiltered(false);
            }
            str = "All";
            if(fval.toLowerCase().includes(str.toLowerCase())){
                setIsAllPetTypesFiltered(true);
            }else{
                setIsAllPetTypesFiltered(false);
            }
        }else{
            setIsAllProductsFiltered(true);
        }
    }

    useEffect(() => {
        fetchProducts('');
    }, []);

    useEffect(() => {
        if (results){
            console.log(results);
            setFiltered(results);
        
            let filteredProducts = results;
            routeUpdate();
			if(searchInput != null && searchInput.trim() != ""){
                filteredProducts = productsFilter(filteredProducts, null, null, searchInput);
			}else
            if (search != null && search.trim() != "") {
                filteredProducts = productsFilter(filteredProducts, null, null, search);
            }
            
            console.log(filtered);
        }
        
    }, [results, pettype, category, search, searchInput]);

    

    useEffect(() => {
        if (results){

            setFiltered(results);
            let filteredProducts = results;
            if (filters.productcategory != null) {
                filteredProducts = productsFilter(filteredProducts, null,filters.productcategory);
            }
            if (filters.subcategory != null) {
                filteredProducts = productsFilter(filteredProducts, null, null,null,filters.subcategory);
            }
            if (filters.pettype != null) {
                filteredProducts = productsFilter(filteredProducts, filters.pettype);
            }
        
            handleFilterChange('', '');
        }
    }, [filters.productcategory,filters.subcategory,filters.pettype]);
    


    const fetchProducts = (userInput) => {
        let url = 'https://64803e10f061e6ec4d48e135.mockapi.io/api/v1/products';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setResults(data);
            oneTimeFunc();
        })
        .catch(error => console.log('Error fetching products:', error));
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchInput.trim() !== '') {
          const userInput = searchInput.trim();
          navigate(`/products/search/${userInput}`); // Update the URL with the new query parameter
          fetchProducts(userInput);
        }
        setSearchInput('');
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleAddToCart = (productId) => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString);
            const existingProductIndex = user.cart.findIndex(item => item.id === productId);
            if (existingProductIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                const updatedCart = [...user.cart];
                updatedCart[existingProductIndex].qty += 1;
                const updatedUser = { ...user, cart: updatedCart };
                updateUser(updatedUser);
            } else {
                // If the product is not in the cart, add it as a new object
                const newProduct = { id: productId, qty: 1 };
                const updatedUser = { ...user, cart: [...user.cart, newProduct] };
                updateUser(updatedUser);
            }
            alert("Product has been added to the cart");
        } else {
            alert("Please login to your account to add a product in the cart");
        }
    };

    const handleAddToWishlist = (productId) => {
        const userString = localStorage.getItem("user");
            if (userString) {
            const user = JSON.parse(userString);
            const existingProductIndex = user.wishlist.findIndex(item => item.id === productId);
            if (existingProductIndex !== -1) {
                // If the product already exists in the wishlist, update the quantity
                const updatedWishlist = [...user.wishlist];
                updatedWishlist[existingProductIndex].qty += 1;
                const updatedUser = { ...user, wishlist: updatedWishlist };
                updateUser(updatedUser);
            } else {
                // If the product is not in the wishlist, add it as a new object
                const newProduct = { id: productId, qty: 1 };
                const updatedUser = { ...user, wishlist: [...user.wishlist, newProduct] };
                updateUser(updatedUser);
            }
            alert("Product has been added to the wishlist");
        } else {
            alert("Please login to your account to add a product in the cart");
        }
    };

    const updateUser = (user) => {
        const userId = user.id;
        fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            // Update the local storage with the updated user data
            localStorage.setItem("user", JSON.stringify(data));
            //console.log('User updated:', data);
        })
        .catch(error => {
            //console.log('Error updating user:', error);
        });
    };

    
    const productsFilter = (toFilter = results,pettype=null,category=null,productdescription=null,subcategory=null) => {
        if(toFilter==null) return null;
        if(pettype!=null && (!pettype.toLowerCase().includes("all")||pettype.toLowerCase().includes("small"))&&!pettype.trim().replace("|","")==""){
            toFilter = toFilter.filter(prod => {
                const ptArr = pettype.toLowerCase().split("|");
                // Apply filters here
                if (!ptArr.includes(prod.pettype.toLowerCase())) {
                    return false; // Skip item if category doesn't match
                }
                // ... other filters
            
                return true; // Include item in filtered list
            });
        }

        if(category!=null && !(category.toLowerCase().includes("all")||category.trim().replace("|","")=="")){
            toFilter = toFilter.filter(prod => {
                const ctArr = category.toLowerCase().split("|");
                // Apply filters here
                if (!ctArr.includes(prod.productcategory.toLowerCase())) {
                    //console.log(prod);
                    return false; // Skip item if category doesn't match
                }
                // ... other filters
            
                return true; // Include item in filtered list
            });
        }
        if(subcategory!=null && !(subcategory.toLowerCase().includes("all")||subcategory.trim().replace("|","")=="")){
            toFilter = toFilter.filter(prod => {
                const scArr = subcategory.toLowerCase().split("|");
                    // Apply filters here
                    if (!scArr.includes(prod.subcategory.toLowerCase())) {
                        //console.log(prod);
                        return false; // Skip item if category doesn't match
                    }
                    // ... other filters
                
                    return true; // Include item in filtered list
                }
            );
        }

        if(productdescription!=null){
            toFilter = toFilter.filter(prod => {
                    // Apply filters here
                    if (!prod.productdescription.toLowerCase().includes(productdescription.toLowerCase())) {
                        return false; // Skip item if category doesn't match
                    }
                    // ... other filters
                
                    return true; // Include item in filtered list
                }
            );
        }
        setFiltered(toFilter);
        return toFilter;
    };
    
    const handleFilterChange = (filterName, value, filtersNow = filters) => {
        // if(filtersNow[filterName].toLowerCase().includes(value.toLowerCase())){//remove
        //     fval = filtersNow[filterName].replace("|"+value,"");
        // }else{//include
        //     fval = filtersNow[filterName]+"|"+value;
        // }
        
        let rawr = { ...filtersNow }; //rawr = { ...rawr, [filterName]: fval };
        if(true/* filterName.includes("productcategory") */){
            filterName = "productcategory";
            let fval = filtersNow[filterName];// = "|"+value;
            fval=("|"+fval);//format correction for noobs
            let str = "All Products";
            if(isAllProductsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Food and Nutrition";
            if(isFoodAndNutritionFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Toys and Enrichment";
            if(isToysAndEnrichmentFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Care and Well-being";
            if(isCareAndWellBeingFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            rawr = { ...rawr, [filterName]: fval.replace("||","|") };
        }
        if(true/* filterName.includes("subcategory") */){
            filterName = "subcategory";
            let fval = filtersNow[filterName];// = "|"+value;
            fval=("|"+fval);//format correction for noobs
            let str = "All";
            if(isAllSubcategoriesFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Food";
            if(isFoodFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Treats";
            if(isTreatsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Supplements";
            if(isSupplementsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Toys";
            if(isToysFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Grooming Tools";
            if(isGroomingToolsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Bedding";
            if(isBeddingFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Leashes and Collar";
            if(isLeashesAndCollarFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Accessories";
            if(isAccessoriesFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Aquarium";
            if(isAquariumFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            rawr = { ...rawr, [filterName]: fval.replace("||","|") };
        }
        if(true/* filterName.includes("pettype") */){
            filterName = "pettype";
            let fval = filtersNow[filterName];// = "|"+value;
            fval=("|"+fval);//format correction for noobs
            let str = "All";
            if(isAllPetTypesFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Dog";
            if(isDogFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Cat";
            if(isCatFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Bird";
            if(isBirdFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Fish";
            if(isFishFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "Reptile";
            if(isReptileFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            str = "small animals";
            if(isSmallAnimalsFiltered){
                if(!fval.toLowerCase().includes(str.toLowerCase())){
                    fval = fval + "|"+str;
                }
            }else{
                fval = fval.replace("|"+str,"");
            }
            rawr = { ...rawr, [filterName]: fval.replace("||","|") };
        }

        console.log("rawr");
        console.log(rawr);
        setFilters(rawr);
        return rawr;
    };

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className='products-container'>
            <div className='productspage'>
                <aside>
                    <button className='funnel icons' onClick={toggleFilter}><FaFilter/></button>
                    {showFilter && (
                    <div className='filter-collapse'>
                        <h3>Filter by:</h3>
                        <div>{/* All Categories */}
                            <label>
                                <input type="checkbox" checked={isAllProductsFiltered} onChange={(e)=>{
                                    setIsAllProductsFiltered(!isAllProductsFiltered);
                                    handleFilterChange('productcategory', 'All Products');
                                }} />
                                All Products
                            </label> {/* All Products */}
                            <label>
                                <input type="checkbox"checked={isAllSubcategoriesFiltered} onChange={(e)=>{
                                    setIsAllSubcategoriesFiltered(!isAllSubcategoriesFiltered);
                                    handleFilterChange('subcategory', 'All');
                                }} />
                                All Subcategories
                            </label>{/* All Subcategory */}
                            <div>  {/* Categories and Subcategories */}
                                <div className='filterbuttons'> {/* Food and Nutrition */}
                                    <label>
                                        <input type="checkbox" checked={isFoodAndNutritionFiltered} onChange={(e)=>{
                                            setIsFoodAndNutritionFiltered(!isFoodAndNutritionFiltered);
                                            handleFilterChange('productcategory', 'Food and Nutrition');
                                        }} />
                                        Food and Nutrition
                                    </label>
                                    <ul>
                                        <li> {/* food */}
                                            <label>
                                                <input type="checkbox" checked={isFoodFiltered} onChange={(e)=>{
                                                    setIsFoodFiltered(!isFoodFiltered);
                                                    handleFilterChange('subcategory', 'Food');
                                                }} />
                                                Food
                                            </label>
                                        </li>
                                        <li>{/* treats */}
                                            <label>
                                                <input type="checkbox" checked={isTreatsFiltered} onChange={(e)=>{
                                                    setIsTreatsFiltered(!isTreatsFiltered);
                                                    handleFilterChange('subcategory', 'Treats');
                                                }} />
                                                Treats
                                            </label>
                                        </li>
                                        <li> {/* supplements */}
                                            <label>
                                                <input type="checkbox" checked={isSupplementsFiltered} onChange={(e)=>{
                                                    setIsSupplementsFiltered(!isSupplementsFiltered);
                                                    handleFilterChange('subcategory', 'Supplements');
                                                }} />
                                                Supplements
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className='filterbuttons'> {/* Toys and Enrichment */}
                                    <label>
                                        <input type="checkbox" checked={isToysAndEnrichmentFiltered} onChange={(e)=>{
                                            setIsToysAndEnrichmentFiltered(!isToysAndEnrichmentFiltered);
                                            handleFilterChange('productcategory', 'Toys and Enrichment');
                                        }} />
                                        Toys and Enrichment
                                    </label>
                                    <ul>
                                        <li>{/* Toys */}
                                            <label>
                                                <input type="checkbox" checked={isToysFiltered} onChange={(e)=>{
                                                    setIsToysFiltered(!isToysFiltered);
                                                    handleFilterChange('subcategory', 'Toys');
                                                }} />
                                                Toys
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className='filterbuttons'> {/* Care and Well-being */}
                                    <label>
                                        <input type="checkbox" checked={isCareAndWellBeingFiltered} onChange={(e)=>{
                                            setIsCareAndWellBeingFiltered(!isCareAndWellBeingFiltered);
                                            handleFilterChange('productcategory', 'Care and Well-being');
                                        }} />
                                        Care and Well-being
                                    </label>
                                    <ul>
                                        <li>{/* Grooming Tools */}
                                            <label>
                                                <input type="checkbox" checked={isGroomingToolsFiltered} onChange={(e)=>{
                                                    setIsGroomingToolsFiltered(!isGroomingToolsFiltered);
                                                    handleFilterChange('subcategory', 'Grooming Tools');
                                                }} />
                                                Grooming Tools
                                            </label>
                                        </li>
                                        <li>{/* Bedding */}
                                            <label>
                                                <input type="checkbox" checked={isBeddingFiltered} onChange={(e)=>{
                                                    setIsBeddingFiltered(!isBeddingFiltered);
                                                    handleFilterChange('subcategory', 'Bedding');
                                                }} />
                                                Bedding
                                            </label>
                                        </li>
                                        <li>{/* Leash and Collar */}
                                            <label>
                                                <input type="checkbox" checked={isLeashesAndCollarFiltered} onChange={(e)=>{
                                                    setIsLeashesAndCollarFiltered(!isLeashesAndCollarFiltered);
                                                    handleFilterChange('subcategory', 'Leashes and Collar');
                                                }} />
                                                Leashes and Collar
                                            </label>
                                        </li>
                                        <li>{/* Accessories */}
                                            <label>
                                                <input type="checkbox" checked={isAccessoriesFiltered} onChange={(e)=>{
                                                    setIsAccessoriesFiltered(!isAccessoriesFiltered);
                                                    handleFilterChange('subcategory', 'Accessories');
                                                }} />
                                                Accessories
                                            </label>
                                        </li>
                                        <li>{/* Aquarium */}
                                            <label>
                                                <input type="checkbox" checked={isAquariumFiltered} onChange={(e)=>{
                                                    setIsAquariumFiltered(!isAquariumFiltered);
                                                    handleFilterChange('subcategory', 'Aquarium');
                                                }} />
                                                Aquarium
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>                   
                        </div>
                        <div className='filterbuttons'> {/* Pet Types */}
                            <label>{/* All Pet Types */}
                                <input type="checkbox" checked={isAllPetTypesFiltered} onChange={(e)=>{
                                    setIsAllPetTypesFiltered(!isAllPetTypesFiltered);
                                    handleFilterChange('pettype', 'All');
                                }} />
                                All Pet Types
                            </label>
                            <ul> {/* Pet Type */}
                                <li> {/* Dog */}
                                    <label>
                                        <input type="checkbox" checked={isDogFiltered} onChange={(e)=>{
                                            setIsDogFiltered(!isDogFiltered);
                                            handleFilterChange('pettype', 'Dog');
                                        }} />
                                        Dog
                                    </label>
                                </li>
                                <li>{/* Cat */}
                                    <label>
                                        <input type="checkbox" checked={isCatFiltered} onChange={(e)=>{
                                            setIsCatFiltered(!isCatFiltered);
                                            handleFilterChange('pettype', 'Cat');
                                        }} />
                                        Cat
                                    </label>
                                </li>
                                <li>{/* Bird */}
                                    <label>
                                        <input type="checkbox" checked={isBirdFiltered} onChange={(e)=>{
                                            setIsBirdFiltered(!isBirdFiltered);
                                            handleFilterChange('pettype', 'Bird');
                                        }} />
                                        Bird
                                    </label>
                                </li>
                                <li>{/* Fish */}
                                    <label>
                                        <input type="checkbox" checked={isFishFiltered} onChange={(e)=>{
                                            setIsFishFiltered(!isFishFiltered);
                                            handleFilterChange('pettype', 'Fish');
                                        }} />
                                        Fish
                                    </label>
                                </li>
                                <li>{/* Reptile */}
                                    <label>
                                        <input type="checkbox" checked={isReptileFiltered} onChange={(e)=>{
                                            setIsReptileFiltered(!isReptileFiltered);
                                            handleFilterChange('pettype', 'Reptile');
                                        }} />
                                        Reptile
                                    </label>
                                </li>
                                <li>{/* Small Animals */}
                                    <label>
                                        <input type="checkbox" checked={isSmallAnimalsFiltered} onChange={(e)=>{
                                            setIsSmallAnimalsFiltered(!isSmallAnimalsFiltered);
                                            handleFilterChange('pettype', 'small animals');
                                        }} />
                                        Small Animals
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>)}                    
                </aside>
                <div className='right'>
                    <form onSubmit={handleSearchSubmit} className='hide searchbar-products'>
                        <input
                        type="text"
                        name="search"
                        id="search1"
                        placeholder="Search for products.."
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        />
                        <button className='searchbutton' type="submit">Search</button>
                    </form>
                    <div className='products-card'>
                        <ul>
                            {	results ? ((
                                (filtered ? filtered : results)
                                .map(product => (
                                <li key={product.productid} className='cards'>
                                    <div className='productinfo-container'>
                                        <img src={product.productimage} alt={product.productname} />
                                        <h4>{product.productname}</h4>
                                        <p>Price: ${product.price}</p>
                                        <p>Stock: {product.stock}</p>
                                    </div>                                    
                                    <button onClick={() => handleAddToWishlist(product.productid)}><BsFillHeartFill/></button>
                                    <button onClick={() => handleAddToCart(product.productid)}><BsFillCartFill/></button>
                                </li>
                                ))
                                )) : "No Pets Available yet"
                            }
                        </ul>
                        <div className="pagination-buttons">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
