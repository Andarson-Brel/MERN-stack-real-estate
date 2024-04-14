import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Suspense } from "react";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ListPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://test-deployment-2-krcx.onrender.com/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading...</p>}>
                        {/* Map over the posts state */}
                        {posts.map(post => (
                            <Card key={post.id} item={post} />
                        ))}
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading...</p>}>
                    {/* Pass the posts state to the Map component */}
                    <Map items={posts} />
                </Suspense>
            </div>
        </div>
    );
}

export default ListPage;
