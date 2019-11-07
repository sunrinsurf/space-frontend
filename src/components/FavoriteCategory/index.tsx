import React from 'react'
import FavoriteCategoryCard from './FavoriteCategoryCard'

function FavoriteCategory() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FavoriteCategoryCard title="인력" />
            <FavoriteCategoryCard title="장소" />
        </div>
    );
}

export default FavoriteCategory;