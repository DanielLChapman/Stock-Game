import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Router from 'next/router';

const AlreadyLoggedIn = (props) => (
    <Query query={CURRENT_USER_QUERY}>
        {({data, loading, error}) => {
            if (loading) return <p>Loading</p>
            if(data.me) {
                console.log("here");
                //Need to improve this, but router isn't working correctly. 
                window.location.href = "http://localhost:7777/";
            } else {
                return props.children;
            }
        
            
        }}
    </Query>
)

export default AlreadyLoggedIn;