import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from "react-router-dom";

export default function SaleDeeds(){
    const [land, setLand] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, SetPage] = useState(1);
    const [cards, SetCards] = useState(true);
    const location = useLocation();
    const path = location?.pathname?.split("/")?.[1];


    useEffect(() => {
        fetchLandLords();
    },[])

    const fetchLandLords = async() =>{
        if (!cards || !isLoading) return;
        setIsLoading(true)
        try{
            const response = await fetch("https://prod-be.1acre.in/lands/?ordering=-updated_at&page=1&page_size=10")
            console.log(response,"respon")
            if (!response.ok){
                throw new Error('Network Error')
            }
            const data = await response.json();
            console.log(data,"data")
            if (data?.results && data?.results?.length > 0){
                setLand(prevLands => [...prevLands, ...data.results]);
                console.log(data,"data")
                SetPage(page+1);
            }else{
                SetCards(false);
            }
        }
        catch(error) {
            console.error("error:",error)
            setIsLoading(false);
        }
    }
    const handleScrolling =() =>{
        if (window.innerHeight+ document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        fetchLandLords();
    }

    useEffect(()=>{
        window.addEventListener('scroll',handleScrolling);
        return()=> window.removeEventListener('scroll',handleScrolling)
    },[])

    return(
        
        <div className="sale-deed-main">
            <div className="container">
                <div className="lands">
                    {land?.map((lands, index)=>(
                        <div className="land" key={index}>
                            <h2>{lands?.title}</h2>
                            <Carousel>
                                {lands?.images.map((image, i)=>(
                                    <Carousel.Item key={index}>
                                        <img className="d-block w-100" src={image?.url} alt="land Images"/>
                                    </Carousel.Item>
                                ))}
                                <div className="village-name">
                                    <p>{`${lands?.village_name},${lands?.mandal_name}`}</p>
                                    <p>{lands?.district_name}</p>
                                </div>
                                <div className="land-details">
                                    <p>{`${lands?.total_land_size_in_acres?.guntas} - ${lands?.total_price} ${lands?.total_land_size_in_acres?.acres}`}</p>
                                </div>
                            </Carousel>
                        </div>
                    ))}
                </div>
                {isLoading && (
                    <div className="text-center mt-3">
                        <Spinner animation="border" variant="primary" />
                    </div>
                )}
                    {!cards && <p className="sale-deed-mainpage-content-land-no">No results. </p>}
            </div>
        </div>
        
    )
}