import { Bloc } from '@felangel/bloc';
import * as React from 'react';
export declare type BlocBuilderCondition<S> = (previous: S, current: S) => boolean;
export declare type BlocElementBuilder<S> = (state: S) => JSX.Element;
export declare type BlocBuilderProps<B extends Bloc<any, S>, S> = {
    bloc: B;
    builder: BlocElementBuilder<S>;
    condition?: BlocBuilderCondition<S>;
};
export declare type BlocStateType<S> = {
    blocState: S;
};
export declare class BlocBuilder<B extends Bloc<any, S>, S> extends React.Component<
    BlocBuilderProps<B, S>,
    BlocStateType<S>
> {
    private bloc;
    private previousState;
    private subscription;
    private condition;
    private builder;
    constructor(props: BlocBuilderProps<B, S>);
    private subscribe;
    private unsubscribe;
    componentDidUpdate(prevProps: BlocBuilderProps<B, S>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
