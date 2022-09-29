

const NoMatch = () => {
    return <div>Page not found</div>;
};
export default NoMatch;


// puis appeler avec
<Route path="*" element={<NoMatch />} />