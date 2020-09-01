import React from 'react';

const PageTitle: React.SFC<{ text: string }> = (props: { text: string }): JSX.Element => {
    return <h2>{props.text}</h2>;
};

export default PageTitle;
