import React, { useState, useCallback } from 'react'
import styled from 'styled-components';

import Input from '../../Form/Input';
import Button from '../../Form/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { shareSetTag } from '../../../store/forms/Share';

const Wrap = styled.div`
    .insertTag {
        display: flex;
        align-items: center;
        button {
            margin-left: 10px;
        }
    }
    .tags {
        display: flex;
        flex-wrap: wrap;
        min-height: 70px;
    }
`;
const Tag = styled.div`
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cecece;

    .delete {
        display: inline;
        cursor: pointer;
    }
`;
function TagWrite() {
    const { tags } = useSelector((state: RootState) => state.Forms.Share);
    const dispatch = useDispatch();
    const [tag, setTag] = useState('');

    const setTags = useCallback((data: (tags: string[]) => string[] | string[]) => {
        if (typeof data === 'function') {
            dispatch(shareSetTag(data(tags)));
            return;
        }
        dispatch(data);
    }, [dispatch, tags]);
    const addTag = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!tag) return;
        if (tags.includes(tag)) return;
        setTags(tags => [...tags, tag]);
        setTag('');
    }, [tag, tags, setTags]);
    const deleteTag = useCallback((idx: number) => {
        return () => setTags(tags => tags.filter((_, i) => i !== idx));
    }, [setTags]);
    return (
        <Wrap>
            <div className="tags">
                {tags.map((value, index) => <Tag key={index}># {value} <div onClick={deleteTag(index)} className="delete" role="button" aria-label="Remove tag">&times;</div></Tag>)}
            </div>
            <form className="insertTag" onSubmit={addTag}>
                <Input type="text" placeholder="태그 입력" value={tag} onChange={e => setTag(e.target.value)} />
                <Button>추가</Button>
            </form>
        </Wrap>
    )
}

export default TagWrite;