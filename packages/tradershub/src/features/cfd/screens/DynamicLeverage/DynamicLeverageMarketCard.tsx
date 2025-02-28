import React from 'react';
import { CaptionText, Text } from '@deriv/quill-design';
import { THooks } from '../../../../types';
import { DynamicLeverageTableColumnHeader } from './DynamicLeverageTableColumnHeader';

type TDynamicLeverageMarketCardProps = {
    data: THooks.DynamicLeverage[keyof THooks.DynamicLeverage]['volume']['data'];
    displayName: string;
    instruments: string[];
    max: number;
    min: number;
};

export const DynamicLeverageMarketCard = ({
    data,
    displayName,
    instruments,
    max,
    min,
}: TDynamicLeverageMarketCardProps) => (
    <div className='overflow-hidden border-75 border-solid rounded-400 border-system-light-less-prominent-text h-[248px] bg-system-light-hover-background'>
        <div className='flex flex-col pt-500 h-3500 bg-system-light-secondary-background'>
            <Text align='center' bold size='sm'>
                {displayName}
            </Text>
            {!!instruments.length && (
                <CaptionText align='center' className='text-[10px]' italic>
                    {`(${instruments.join(', ')})`}
                </CaptionText>
            )}
            <CaptionText align='center' className='text-status-light-danger'>
                {`Up to ${min}:${max}`}
            </CaptionText>
        </div>
        <div className='pb-500'>
            <div className='grid grid-cols-[1fr_0.5fr_1.25fr] justify-items-center border-b-50 py-200 bg-system-light-hover-background'>
                <DynamicLeverageTableColumnHeader subtitle='(lots)' title='From' />
                <DynamicLeverageTableColumnHeader subtitle='(lots)' title='to' />
                <DynamicLeverageTableColumnHeader subtitle='(1:x)' title='Leverage' />
            </div>
            <div>
                {data?.map(columns => (
                    <div
                        className='grid grid-cols-[1fr_0.5fr_1.25fr] justify-items-center border-b-50 py-200 even:bg-system-light-hover-background odd:bg-system-light-secondary-background'
                        key={`${columns.from}-${columns.to}-${columns.leverage}`}
                    >
                        {Object.entries(columns).map(([columnKey, value]) => (
                            <div key={`${displayName}_${columnKey}_${value}`}>
                                <Text align='center' size='sm'>
                                    {value}
                                </Text>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
);
