import React from 'react'
import FavoriteCategoryCard from './FavoriteCategoryCard'
import usePrefetch from '../../lib/usePrefetch';
import getFavoriteCategory from '../../lib/api/getFavoriteCategory';
import useLogin from '../../lib/useLogin';
import ErrorComponent from '../ErrorComponent';

function FavoriteCategory() {
    const user = useLogin();

    const [data, error] = usePrefetch('FavoriteCategory', async () => {
        if (!user) return;
        const req = await getFavoriteCategory(user.token, user.data.userId);
        return req.data.categorys;
    });
    if (error) {
        return <ErrorComponent>{error}</ErrorComponent>
    }
    if (!data) {
        return <div>로딩 중...</div>;
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {data.map((title: any) => {
                return <FavoriteCategoryCard title={title} key={title} />
            })}
        </div>
    );
}

export default FavoriteCategory;