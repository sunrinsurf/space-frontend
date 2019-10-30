import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components';
import Input, { TextArea } from '../../Form/Input';
import WritePageCategorySelect from './CategorySelect';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { shareChange, shareRoyaltySelect, shareTimeSelect, shareClearForm, sharePeriodSelect } from '../../../store/forms/Share';
import WritePageFormSelect from './Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../Form/Button';

const Section = styled.section``;
const Flex = styled.div`
    display: flex;
    & > * {
        padding: 1em;
        flex: 1;
    }
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;
function DateButton({ value, onClick }: any) {
    return (
        <Button onClick={onClick} fullWidth style={{ marginTop: '1em' }}>
            {value}
        </Button>
    )
}
function WritePageForm() {
    const { title, contents, timeToUseDate, person, periodDate } = useSelector((state: RootState) => state.Forms.Share);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(shareClearForm());
    }, [dispatch]);
    const onchange = useCallback((name) => {
        return (e: React.ChangeEvent) => {
            dispatch(shareChange({
                [name]: (e.target as any).value
            }))
        }
    }, [dispatch]);
    const onDateChange = useCallback((dataKey: string) => {
        return (date: Date) => {
            if (!date) return;
            if (date.getTime() <= Date.now()) return;
            dispatch(shareChange({
                [dataKey]: date
            }))
        }
    }, [dispatch]);

    const priceForm = (unit: string) => <div><Input type="text" onChange={onchange("royaltyPrice")} placeholder={`${unit} 가격 입력`} /></div>
    const timeToUseDatepicker = (
        <DatePicker selected={timeToUseDate} onChange={onDateChange("timeToUseDate")} minDate={new Date()} customInput={<DateButton />} />
    );
    const periodDataPicker = (
        <DatePicker selected={periodDate} onChange={onDateChange("periodDate")} minDate={new Date()} customInput={<DateButton />} />
    )

    return (
        <Flex>
            <div>
                <Section>
                    <h1>카테고리 선택</h1>
                    <WritePageCategorySelect />
                </Section>
                <Section>
                    <h1>공유 상품 제목</h1>
                    <Input value={title} onChange={onchange("title")} />
                </Section>
                <Section>
                    <h1>공유 내용</h1>
                    <TextArea value={contents} onChange={onchange("contents")} />
                </Section>
            </div>
            <div>
                <Section>
                    <h1>로열티 지불 방식</h1>
                    <WritePageFormSelect dispatcher={shareRoyaltySelect} objKey="royalty" showConditions={{
                        monthly: priceForm("월"),
                        weekly: priceForm("주")
                    }} />
                </Section>
                <Section>
                    <h1>사용 날짜/시간대</h1>
                    <WritePageFormSelect dispatcher={shareTimeSelect} objKey="timeToUse" showConditions={{
                        selectTime: timeToUseDatepicker
                    }} />
                </Section>
                <Section>
                    <h1>공유 가능 인원</h1>
                    <Input type="number" min="2" max="8" onChange={onchange("person")} value={person} />
                </Section>
                <Section>
                    <h1>공유 기간</h1>
                    <WritePageFormSelect dispatcher={sharePeriodSelect} objKey="period" showConditions={{
                        selectPeriod: periodDataPicker
                    }} />
                </Section>
            </div>
        </Flex>
    )
}


export default WritePageForm;