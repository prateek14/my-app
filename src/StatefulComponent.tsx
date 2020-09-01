import React, { useState, useCallback } from 'react';

export interface IStatefulComponentProps {
    message: string;
}

export interface IStatefulComponentState {
    count: number;
}

const StatefulComponent: React.SFC<IStatefulComponentProps> = (props: IStatefulComponentProps): JSX.Element => {
    const [count, setCount] = useState<number>(0);

    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <div onClick={increment}>
            {props.message} {count}!
        </div>
    );
};

export default StatefulComponent;
